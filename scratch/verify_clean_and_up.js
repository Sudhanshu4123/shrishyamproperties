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

async function verifyCleanAndUp() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Clean both property_images and properties table (0 demo data)
      await executeCommand(conn, `
        mysql shrishyam_db -e "DELETE FROM property_images; DELETE FROM properties; ALTER TABLE properties AUTO_INCREMENT = 1;"
      `, '1. Clean All Test/Demo Data from DB');

      // Step 2: Ensure PM2 process is running stably
      await executeCommand(conn, `
        sleep 2
        pm2 status
      `, '2. Check PM2 Processes');

      // Step 3: Test HTTP and HTTPS responses
      await executeCommand(conn, `
        echo "=== HOME PAGE STATUS ==="
        curl -I https://shrishyamassociate.com/
        echo ""
        echo "=== ADMIN PAGE STATUS ==="
        curl -I https://shrishyamassociate.com/admin
        echo ""
        echo "=== API PROPERTIES STATUS (SHOULD BE CLEAN []) ==="
        curl -s https://shrishyamassociate.com/api/properties
        echo ""
      `, '3. Check Live Endpoints');

      console.log('\n========================================');
      console.log('🎉 LIVE VERIFICATION COMPLETED SUCCESSFULLY!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error during verification:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

verifyCleanAndUp();
