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

async function fixBackend() {
  const conn = new Client();

  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: PM2 delete backend process to avoid conflicts
      await executeCommand(conn, `
        pm2 delete shrishyam-backend || true
        pm2 save
      `, '1. Delete PM2 Java Backend');

      // Step 2: Create Systemd Service for Java Spring Boot Backend
      await executeCommand(conn, `
        cat << 'EOF' > /etc/systemd/system/shrishyam-backend.service
[Unit]
Description=Shri Shyam Properties Spring Boot Backend
After=syslog.target network.target mysql.service

[Service]
User=root
WorkingDirectory=/var/www/shrishyamproperties/backend
ExecStart=/usr/bin/java -Dserver.port=8080 -Dspring.datasource.url=jdbc:mysql://localhost:3306/shrishyam_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC -Dspring.datasource.username=shrishyam_user -Dspring.datasource.password=Shrishyam@2026# -Dspring.sql.init.mode=never -jar /var/www/shrishyamproperties/backend/target/properties-backend-1.0.0.jar
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
      `, '2. Create & Start Systemd Service');

      // Step 3: Wait 5 seconds and check systemctl status & curl port 8080
      await executeCommand(conn, `
        sleep 5
        systemctl status shrishyam-backend --no-pager
        curl -I http://localhost:8080/api/properties
      `, '3. Verify Java Backend Status');

      console.log('\n========================================');
      console.log('🎉 JAVA BACKEND SYSTEMD SERVICE LAUNCHED SUCCESSFULLY!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error fixing backend:', e);
    } finally {
      conn.end();
    }
  }).on('error', (err) => {
    console.error('SSH Error:', err);
  }).connect(SSH_CONFIG);
}

fixBackend();
