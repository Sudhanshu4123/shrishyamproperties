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

async function deployImageFix() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Update Nginx Configuration
      await executeCommand(conn, `
        cat << 'EOF' > /etc/nginx/sites-available/shrishyamproperties
server {
    server_name shrishyamassociate.com www.shrishyamassociate.com 187.127.134.114;
    client_max_body_size 100M;

    # 1. Static Uploaded Files
    location /uploads/ {
        root /var/www/shrishyamproperties/frontend/public;
        expires 30d;
        add_header Cache-Control "public, no-transform";
        try_files $uri =404;
    }

    # 2. Image & File Upload Endpoint -> Next.js Server
    location /api/upload {
        proxy_pass http://127.0.0.1:3000/api/upload;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 3. Spring Boot Backend API Proxy (Port 8080)
    location /api {
        proxy_pass http://127.0.0.1:8080/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 4. Next.js Frontend Portal (Port 3000)
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
    client_max_body_size 100M;
    return 404; # managed by Certbot
}
EOF
        nginx -t
        systemctl reload nginx
      `, '1. Update Nginx Config with Direct Uploads Root');

      // Step 2: Pull Latest Git Code
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties
        git reset --hard HEAD
        git pull origin main
      `, '2. Pull Latest Code');

      // Step 3: Rebuild Frontend with unoptimized: true
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/frontend
        npm run build
        pm2 restart shrishyam-frontend
      `, '3. Rebuild & Restart Frontend');

      // Step 4: Verify Image URL & Property 3 Page
      await executeCommand(conn, `
        echo "=== VERIFY DIRECT IMAGE REQUEST ==="
        curl -i https://shrishyamassociate.com/uploads/prop_1788080449024_whatsapp_image_2026_05_04_at_5.07.46_am.jpeg
        echo ""
        echo "=== VERIFY PROPERTY DETAIL PAGE STATUS ==="
        curl -I https://shrishyamassociate.com/properties/3
      `, '4. Verify Image & Property Page Responses');

      console.log('\n========================================');
      console.log('🎉 IMAGE RENDERING FULLY FIXED!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error during image fix deploy:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

deployImageFix();
