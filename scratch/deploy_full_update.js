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

async function runFullUpdate() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // 1. Pull Latest GitHub Code
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties
        git reset --hard HEAD
        git pull origin main
      `, '1. Pull Latest Code');

      // 2. Build Frontend
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/frontend
        npm install
        npm run build
      `, '2. Build Frontend App');

      // 3. Build Admin Panel
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/admin
        npm install
        npm run build
      `, '3. Build Admin Panel');

      // 4. Restart PM2 Services & Reload Nginx
      await executeCommand(conn, `
        pm2 restart shrishyam-frontend || pm2 start npm --name "shrishyam-frontend" -- start -- -p 3000
        pm2 restart shrishyam-admin || pm2 start npm --name "shrishyam-admin" -- start -- -p 3001
        systemctl reload nginx
        pm2 status
      `, '4. Restart PM2 Services');

      // 5. Check Domain & Nginx Configuration
      await executeCommand(conn, `
        echo "=== NGINX CONFIGURATION ==="
        cat /etc/nginx/sites-enabled/*
        echo "=== NGINX STATUS ==="
        systemctl status nginx --no-pager
      `, '5. Inspect Nginx Domain Settings');

      console.log('\n========================================');
      console.log('🎉 SERVER DEPLOYMENT & VERIFICATION COMPLETE!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error during full update deployment:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

runFullUpdate();
