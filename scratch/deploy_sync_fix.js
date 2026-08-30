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

      stream.on('close', (code) => {
        console.log(`[${label}] Finished with exit code: ${code}`);
        resolve({ stdout, stderr, code });
      }).on('data', (data) => {
        stdout += data.toString();
        process.stdout.write(data.toString());
      }).stderr.on('data', (data) => {
        stderr += data.toString();
        process.stderr.write(data.toString());
      });
    });
  });
}

async function deploySyncFix() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Git Pull latest codebase
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties
        git reset --hard HEAD
        git pull origin main
      `, '1. Pull Latest Code');

      // Step 2: Seed Database
      await executeCommand(conn, `
        mysql shrishyam_db < /var/www/shrishyamproperties/backend/src/main/resources/data.sql || true
      `, '2. Seed Initial Database Properties');

      // Step 3: Rebuild Spring Boot Backend
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/backend
        chmod +x mvnw
        ./mvnw clean package -DskipTests
        systemctl restart shrishyam-backend
      `, '3. Rebuild & Restart Backend Service');

      // Step 4: Rebuild & Restart Frontend
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/frontend
        npm install
        npm run build
        pm2 restart shrishyam-frontend || pm2 start npm --name "shrishyam-frontend" -- start -- -p 3000
      `, '4. Build & Restart Frontend');

      // Step 5: Rebuild & Restart Admin
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/admin
        npm install
        npm run build
        pm2 restart shrishyam-admin || pm2 start npm --name "shrishyam-admin" -- start -- -p 3001
      `, '5. Build & Restart Admin');

      // Step 6: Verify Database and Endpoints
      await executeCommand(conn, `
        sleep 3
        echo "=== API GET PROPERTIES ==="
        curl -s http://localhost:8080/api/properties | cut -c 1-200
        echo ""
        echo "=== PM2 STATUS ==="
        pm2 status
      `, '6. Final Health Check');

      console.log('\n========================================');
      console.log('🎉 SYNC FIX DEPLOYED SUCCESSFULLY TO VPS!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error during sync deployment:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

deploySyncFix();
