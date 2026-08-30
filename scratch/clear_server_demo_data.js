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

async function clearDemoData() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Clean MySQL properties table
      await executeCommand(conn, `
        mysql shrishyam_db -e "DELETE FROM properties; ALTER TABLE properties AUTO_INCREMENT = 1;"
      `, '1. Clear MySQL Properties Table');

      // Step 2: Pull Latest Code from GitHub
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties
        git reset --hard HEAD
        git pull origin main
      `, '2. Pull Latest Git Code');

      // Step 3: Rebuild and Restart Frontend
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/frontend
        npm run build
        pm2 restart shrishyam-frontend
      `, '3. Rebuild & Restart Frontend');

      // Step 4: Rebuild and Restart Admin
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/admin
        npm run build
        pm2 restart shrishyam-admin
      `, '4. Rebuild & Restart Admin');

      // Step 5: Verify Empty/Clean API
      await executeCommand(conn, `
        echo "=== CHECK API PROPERTIES ==="
        curl -s http://localhost:8080/api/properties
        echo ""
      `, '5. Verify Clean API State');

      console.log('\n========================================');
      console.log('🎉 ALL DEMO PROPERTIES CLEARED SUCCESSFULLY!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error clearing demo data:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

clearDemoData();
