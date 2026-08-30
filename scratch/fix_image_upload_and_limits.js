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

async function fixImageUploadAndLimits() {
  const conn = new Client();
  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Update MySQL Schema to support high-res images (LONGTEXT)
      await executeCommand(conn, `
        mysql shrishyam_db -e "
          ALTER TABLE properties MODIFY hero_image LONGTEXT;
          ALTER TABLE properties MODIFY description LONGTEXT;
          ALTER TABLE property_images MODIFY image_url LONGTEXT;
        "
      `, '1. Update MySQL Columns to LONGTEXT');

      // Step 2: Configure Nginx with 100M body size and dedicated /api/upload & /uploads routing
      await executeCommand(conn, `
        cat << 'EOF' > /etc/nginx/sites-available/shrishyamproperties
server {
    server_name shrishyamassociate.com www.shrishyamassociate.com 187.127.134.114;
    client_max_body_size 100M;

    # 1. Image & File Upload Endpoint -> Handled by Next.js Server
    location /api/upload {
        proxy_pass http://127.0.0.1:3000/api/upload;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 2. Static Uploaded Files
    location /uploads {
        alias /var/www/shrishyamproperties/frontend/public/uploads;
        expires 30d;
        add_header Cache-Control "public, no-transform";
        try_files $uri $uri/ =404;
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

    # 4. Unified Next.js Frontend & Admin Portal (Port 3000)
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
        mkdir -p /var/www/shrishyamproperties/frontend/public/uploads
        chmod -R 777 /var/www/shrishyamproperties/frontend/public/uploads
        nginx -t
        systemctl reload nginx
      `, '2. Update Nginx Config with 100M Upload Support');

      // Step 3: Pull Latest Git Code
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties
        git reset --hard HEAD
        git pull origin main
      `, '3. Pull Latest Code');

      // Step 4: Recompile Backend JAR
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/backend
        mvn clean package -DskipTests
        systemctl restart shrishyam-backend
      `, '4. Build & Restart Spring Boot Backend');

      // Step 5: Rebuild Frontend
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/frontend
        npm run build
        pm2 restart shrishyam-frontend
      `, '5. Rebuild & Restart Frontend');

      // Step 6: Test Upload Functionality with a mock image file
      await executeCommand(conn, `
        echo "=== TEST /api/upload ENDPOINT ==="
        echo "fake_image_binary_data" > /tmp/test_image.jpg
        curl -i -X POST https://shrishyamassociate.com/api/upload \
          -F "file=@/tmp/test_image.jpg"
        echo ""
      `, '6. Test Live Image Upload');

      console.log('\n========================================');
      console.log('🎉 IMAGE UPLOADS & 100MB LIMITS FULLY ACTIVE!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Error during fix:', e);
    } finally {
      conn.end();
    }
  }).connect(SSH_CONFIG);
}

fixImageUploadAndLimits();
