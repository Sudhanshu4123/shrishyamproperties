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
        process.stdout.write(data.toString());
      }).stderr.on('data', (data) => {
        process.stderr.write(data.toString());
      });
    });
  });
}

async function deployFix() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Pull latest changes
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties
        git reset --hard HEAD
        git pull origin main
      `, '1. Pull GitHub Code');

      // Step 2: Build Admin Dashboard
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/admin
        npm install
        npm run build
      `, '2. Build Admin Dashboard');

      // Step 3: Restart PM2 and Reload Nginx
      await executeCommand(conn, `
        pm2 restart shrishyam-admin
        systemctl reload nginx
        pm2 status
      `, '3. Restart PM2 & Reload Nginx');

      // Step 4: Health Check
      await executeCommand(conn, `
        echo "=== VERIFYING /admin HTTP STATUS ==="
        curl -I http://localhost/admin
        curl -I http://localhost/admin/
        curl -I http://187.127.134.114/admin
      `, '4. Verify Admin Route');

      console.log('\n🎉 ADMIN DASHBOARD DEPLOYMENT FIXED SUCCESSFULLY!');
    } catch (e) {
      console.error('❌ Error during fix deployment:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

deployFix();
