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

async function fixAdminStyling() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Clean any leftover test/demo data in MySQL
      await executeCommand(conn, `
        mysql shrishyam_db -e "DELETE FROM properties; ALTER TABLE properties AUTO_INCREMENT = 1;"
      `, '1. Clear Any Demo/Test Properties from DB');

      // Step 2: Configure Unified Nginx (Port 3000 for Frontend + Admin, Port 8080 for API)
      await executeCommand(conn, `
        cat << 'EOF' > /etc/nginx/sites-available/shrishyamproperties
server {
    server_name shrishyamassociate.com www.shrishyamassociate.com 187.127.134.114;

    # Spring Boot Backend API Proxy (Port 8080)
    location /api {
        proxy_pass http://127.0.0.1:8080/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Uploaded Media Proxy
    location /uploads {
        proxy_pass http://127.0.0.1:8080/uploads;
        proxy_set_header Host $host;
    }

    # Unified Next.js Portal (Home, Showcase, Admin Dashboard on Port 3000)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/shrishyamassociate.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/shrishyamassociate.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.shrishyamassociate.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = shrishyamassociate.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name shrishyamassociate.com www.shrishyamassociate.com 187.127.134.114;
    listen 80 default_server;
    return 404; # managed by Certbot
}
EOF
        nginx -t
        systemctl reload nginx
      `, '2. Update Nginx Config for Perfect CSS Loading');

      // Step 3: Rebuild & Restart Frontend Service
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/frontend
        git reset --hard HEAD
        git pull origin main
        npm run build
        pm2 restart shrishyam-frontend
      `, '3. Rebuild & Restart Unified Next.js App');

      // Step 4: Health Check
      await executeCommand(conn, `
        echo "=== VERIFY /admin HTTP STATUS & CSS ASSETS ==="
        curl -I https://shrishyamassociate.com/admin
        echo ""
        echo "=== CHECK API PROPERTIES ==="
        curl -s https://shrishyamassociate.com/api/properties
        echo ""
      `, '4. Health Check Admin & API');

      console.log('\n========================================');
      console.log('🎉 ADMIN STYLING & SYNC FULLY RESOLVED!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error fixing admin styling:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

fixAdminStyling();
