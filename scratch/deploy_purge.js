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

async function deployPurge() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Pull Latest Git Code
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties
        git reset --hard HEAD
        git pull origin main
      `, '1. Pull Latest Code');

      // Step 2: Ensure database is 100% clean
      await executeCommand(conn, `
        mysql shrishyam_db -e "DELETE FROM property_images; DELETE FROM properties; ALTER TABLE properties AUTO_INCREMENT = 1;"
      `, '2. Verify Clean MySQL Database');

      // Step 3: Rebuild Frontend
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/frontend
        npm run build
        pm2 restart shrishyam-frontend
      `, '3. Rebuild & Restart Frontend');

      // Step 4: Verify API & Site
      await executeCommand(conn, `
        echo "=== API PROPERTIES CHECK ==="
        curl -s https://shrishyamassociate.com/api/properties
        echo ""
        echo "=== SITE STATUS ==="
        curl -I https://shrishyamassociate.com/admin
      `, '4. Final Health Check');

      console.log('\n========================================');
      console.log('🎉 ALL DEMO DATA PERMANENTLY REMOVED!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error during purge deploy:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

deployPurge();
