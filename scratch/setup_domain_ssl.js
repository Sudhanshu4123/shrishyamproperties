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

async function setupDomainAndSSL() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Firewall rules (Allow 80 & 443)
      await executeCommand(conn, `
        ufw allow 80/tcp || true
        ufw allow 443/tcp || true
        iptables -A INPUT -p tcp --dport 80 -j ACCEPT || true
        iptables -A INPUT -p tcp --dport 443 -j ACCEPT || true
      `, '1. Enable HTTP (80) & HTTPS (443) Firewall Ports');

      // Step 2: Configure Nginx with domain names
      await executeCommand(conn, `
        cat << 'EOF' > /etc/nginx/sites-available/shrishyamproperties
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name shrishyamassociate.com www.shrishyamassociate.com 187.127.134.114;

    # Frontend Main Portal (Port 3000)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Admin Dashboard (Port 3001)
    location /admin {
        proxy_pass http://127.0.0.1:3001;
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
      `, '2. Update Nginx with Domain shrishyamassociate.com');

      // Step 3: Install Certbot & Request SSL Certificate
      await executeCommand(conn, `
        apt-get update -y
        apt-get install -y certbot python3-certbot-nginx
        certbot --nginx --non-interactive --agree-tos -m admin@shrishyamproperties.com -d shrishyamassociate.com -d www.shrishyamassociate.com || true
        systemctl reload nginx
      `, '3. Issue & Install Let\'s Encrypt SSL Certificate');

      // Step 4: Verify Local HTTP & HTTPS Response
      await executeCommand(conn, `
        echo "=== HTTP STATUS CHECK ==="
        curl -I http://shrishyamassociate.com || true
        curl -I https://shrishyamassociate.com || true
      `, '4. Verify Domain SSL Response');

      console.log('\n========================================');
      console.log('🎉 DOMAIN & SSL SETUP COMPLETED!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error during domain SSL setup:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

setupDomainAndSSL();
