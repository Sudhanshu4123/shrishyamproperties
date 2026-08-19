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

async function fixNginxAdminCSS() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Re-configure Nginx to route / and /admin cleanly to Port 3000
      await executeCommand(conn, `
        cat << 'EOF' > /etc/nginx/sites-available/shrishyamproperties
server {
    server_name shrishyamassociate.com www.shrishyamassociate.com 187.127.134.114;

    # Unified Frontend & Admin Portal (Port 3000)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API (Port 8080)
    location /api/ {
        proxy_pass http://127.0.0.1:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
        rm -f /etc/nginx/sites-enabled/default
        ln -sf /etc/nginx/sites-available/shrishyamproperties /etc/nginx/sites-enabled/
        nginx -t
        systemctl reload nginx
      `, '1. Update Nginx Configuration for Unified Routing');

      // Step 2: Re-apply Certbot SSL setup to ensure HTTPS works with the new Nginx config
      await executeCommand(conn, `
        certbot --nginx --non-interactive --agree-tos -m admin@shrishyamproperties.com -d shrishyamassociate.com -d www.shrishyamassociate.com || true
        systemctl reload nginx
      `, '2. Re-apply Let\'s Encrypt SSL');

      // Step 3: Restart PM2 services
      await executeCommand(conn, `
        pm2 restart shrishyam-frontend
        pm2 status
      `, '3. Restart PM2 Frontend Service');

      // Step 4: Verify Response
      await executeCommand(conn, `
        echo "=== VERIFYING /admin HTTP & HTTPS ==="
        curl -I http://shrishyamassociate.com/admin
        curl -I https://shrishyamassociate.com/admin
      `, '4. Verify Admin Route Responses');

      console.log('\n========================================');
      console.log('🎉 NGINX ADMIN STYLING FIXED SUCCESSFULLY!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error during Nginx admin CSS fix:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

fixNginxAdminCSS();
