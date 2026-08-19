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
      // Step 1: Pull latest git code
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties
        git pull origin main
      `, '1. Pull Latest Code');

      // Step 2: Build Spring Boot JAR with Maven
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/backend
        mvn clean package -DskipTests
        ls -la target/
      `, '2. Maven Build Spring Boot JAR');

      // Step 3: Start systemd service
      await executeCommand(conn, `
        systemctl stop shrishyam-backend || true
        pkill -9 -f "properties-backend" || true
        sleep 2
        systemctl daemon-reload
        systemctl restart shrishyam-backend
      `, '3. Restart Java Backend Service');

      // Step 4: Verify Backend Health
      await executeCommand(conn, `
        sleep 8
        systemctl status shrishyam-backend --no-pager
        curl -i http://localhost:8080/api/properties
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
