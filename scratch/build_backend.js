const { Client } = require('ssh2');

const SSH_CONFIG = {
  host: '187.127.134.114',
  port: 22,
  username: 'root',
  password: 'Shrishyam@2026#'
};

function executeCommand(conn, cmd, label) {
  return new Promise((resolve, reject) => {
    console.log(`\n========================================`);
    console.log(`🚀 RUNNING: [${label}]`);
    console.log(`========================================`);

    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);

      let stdout = '';
      let stderr = '';

      stream.on('close', (code, signal) => {
        console.log(`\n[${label}] Finished with exit code: ${code}`);
        resolve({ stdout, stderr, code });
      }).on('data', (data) => {
        const str = data.toString();
        stdout += str;
        process.stdout.write(str);
      }).stderr.on('data', (data) => {
        const str = data.toString();
        stderr += str;
        process.stderr.write(str);
      });
    });
  });
}

async function buildBackend() {
  const conn = new Client();

  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Install Maven
      await executeCommand(conn, `
        apt-get install -y maven
      `, '1. Install Maven');

      // Step 2: Build Spring Boot JAR with Maven
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/backend
        mvn clean package -DskipTests
        ls -la target/
      `, '2. Maven Build Spring Boot JAR');

      // Step 3: Find generated JAR name and start systemd service
      await executeCommand(conn, `
        JAR_PATH=$(find /var/www/shrishyamproperties/backend/target -name "*.jar" ! -name "*sources*" | head -n 1)
        echo "Found JAR: $JAR_PATH"

        cat << EOF > /etc/systemd/system/shrishyam-backend.service
[Unit]
Description=Shri Shyam Properties Spring Boot Backend
After=syslog.target network.target mysql.service

[Service]
User=root
WorkingDirectory=/var/www/shrishyamproperties/backend
ExecStart=/usr/bin/java -Dserver.port=8080 -Dspring.datasource.url=jdbc:mysql://localhost:3306/shrishyam_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC -Dspring.datasource.username=shrishyam_user -Dspring.datasource.password=Shrishyam@2026# -Dspring.sql.init.mode=never -jar $JAR_PATH
SuccessExitStatus=143
TimeoutStopSec=10
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
        systemctl daemon-reload
        systemctl enable shrishyam-backend
        systemctl restart shrishyam-backend
      `, '3. Configure Systemd Service with Built JAR');

      // Step 4: Verify Backend Health
      await executeCommand(conn, `
        sleep 6
        systemctl status shrishyam-backend --no-pager
        curl -I http://localhost:8080/api/properties
      `, '4. Verify Spring Boot Backend Status');

      console.log('\n========================================');
      console.log('🎉 JAVA BACKEND SUCCESSFULLY BUILT & RUNNING!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error building backend:', e);
    } finally {
      conn.end();
    }
  }).on('error', (err) => {
    console.error('SSH Error:', err);
  }).connect(SSH_CONFIG);
}

buildBackend();
