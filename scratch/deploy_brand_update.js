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

async function deployBrandUpdate() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Pull latest changes
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties
        git reset --hard HEAD
        git pull origin main
      `, '1. Pull Latest Code from GitHub');

      // Step 2: Rebuild Frontend
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/frontend
        npm run build
      `, '2. Rebuild Frontend');

      // Step 3: Rebuild Admin
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/admin
        npm run build
      `, '3. Rebuild Admin Dashboard');

      // Step 4: Restart PM2 Services
      await executeCommand(conn, `
        pm2 restart all
        systemctl reload nginx
        pm2 status
      `, '4. Restart Services & Reload Nginx');

      console.log('\n🎉 SHRI SHYAM ASSOCIATE BRAND UPDATE DEPLOYED TO SERVER SUCCESSFULLY!');
    } catch (e) {
      console.error('❌ Error during brand update deployment:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

deployBrandUpdate();
