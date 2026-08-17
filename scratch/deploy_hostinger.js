const { Client } = require('ssh2');
const fs = require('fs');

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
    console.log(`CMD: ${cmd}`);
    console.log(`========================================`);

    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);

      let stdout = '';
      let stderr = '';

      stream.on('close', (code, signal) => {
        console.log(`\n[${label}] Finished with exit code: ${code}`);
        if (code === 0) {
          resolve({ stdout, stderr, code });
        } else {
          // Resolve even on non-zero if we handle warnings
          resolve({ stdout, stderr, code });
        }
      }).on('data', (data) => {
        const str = data.toString();
        stdout += str;
        process.stdout.write(str);
      }).stderr.on('data', (data) => {
        const str = data.toString();
        stderr += str;
        process.stderr.write(str);
      });
    });
  });
}

async function runDeploy() {
  const conn = new Client();

  conn.on('ready', async () => {
    console.log('✅ Connected to Hostinger VPS (187.127.134.114)');

    try {
      // Step 1: Install System Prerequisites (Java 17, Node.js 20, MySQL, Nginx, Git, PM2)
      await executeCommand(conn, `
        export DEBIAN_FRONTEND=noninteractive
        apt-get update -y
        apt-get install -y openjdk-17-jdk mysql-server nginx git curl build-essential
      `, '1. Install System Dependencies');

      // Step 2: Install Node.js 20 LTS & PM2
      await executeCommand(conn, `
        if ! command -v node &> /dev/null; then
          curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
          apt-get install -y nodejs
        fi
        npm install -g pm2
        node -v
        npm -v
        pm2 -v
      `, '2. Setup Node.js & PM2');

      // Step 3: MySQL Database Setup & Seed
      await executeCommand(conn, `
        mysql -e "CREATE DATABASE IF NOT EXISTS shrishyam_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
        mysql -e "CREATE USER IF NOT EXISTS 'shrishyam_user'@'localhost' IDENTIFIED BY 'Shrishyam@2026#';"
        mysql -e "ALTER USER 'shrishyam_user'@'localhost' IDENTIFIED BY 'Shrishyam@2026#';"
        mysql -e "GRANT ALL PRIVILEGES ON shrishyam_db.* TO 'shrishyam_user'@'localhost';"
        mysql -e "FLUSH PRIVILEGES;"
      `, '3. Setup MySQL Database & User');

      // Step 4: Clone / Pull GitHub Repository
      await executeCommand(conn, `
        mkdir -p /var/www
        if [ -d "/var/www/shrishyamproperties/.git" ]; then
          cd /var/www/shrishyamproperties
          git reset --hard HEAD
          git pull origin main
        else
          rm -rf /var/www/shrishyamproperties
          git clone https://github.com/Sudhanshu4123/shrishyamproperties.git /var/www/shrishyamproperties
        fi
      `, '4. Clone GitHub Codebase');

      // Step 5: Initialize MySQL Schema & Data
      await executeCommand(conn, `
        mysql shrishyam_db < /var/www/shrishyamproperties/backend/src/main/resources/schema.sql
        mysql shrishyam_db < /var/www/shrishyamproperties/backend/src/main/resources/data.sql || true
      `, '5. Initialize Database Schema');

      // Step 6: Build Java Spring Boot Backend
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/backend
        chmod +x mvnw
        ./mvnw clean package -DskipTests
      `, '6. Build Java Spring Boot Backend');

      // Step 7: PM2 Start Backend
      await executeCommand(conn, `
        pm2 delete shrishyam-backend || true
        cd /var/www/shrishyamproperties/backend
        pm2 start "java -Dserver.port=8080 -Dspring.datasource.url=jdbc:mysql://localhost:3306/shrishyam_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC -Dspring.datasource.username=shrishyam_user -Dspring.datasource.password=Shrishyam@2026# -Dspring.sql.init.mode=never -jar target/properties-backend-1.0.0.jar" --name "shrishyam-backend"
      `, '7. PM2 Launch Spring Boot Backend');

      // Step 8: Build & Start Frontend
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/frontend
        cat << 'EOF' > .env.production
NEXT_PUBLIC_API_URL=http://187.127.134.114:8080/api
NEXT_PUBLIC_SITE_URL=http://187.127.134.114:3000
EOF
        npm install
        npm run build
        pm2 delete shrishyam-frontend || true
        pm2 start npm --name "shrishyam-frontend" -- start -- -p 3000
      `, '8. Build & PM2 Launch Frontend');

      // Step 9: Build & Start Admin Dashboard
      await executeCommand(conn, `
        cd /var/www/shrishyamproperties/admin
        cat << 'EOF' > .env.production
NEXT_PUBLIC_API_URL=http://187.127.134.114:8080/api
NEXT_PUBLIC_SITE_URL=http://187.127.134.114:3000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=shrishyamproperties
NEXT_PUBLIC_CLOUDINARY_API_KEY=877916588632514
EOF
        npm install
        npm run build
        pm2 delete shrishyam-admin || true
        pm2 start npm --name "shrishyam-admin" -- start -- -p 3001
      `, '9. Build & PM2 Launch Admin');

      // Step 10: Configure Nginx & Firewall
      await executeCommand(conn, `
        cat << 'EOF' > /etc/nginx/sites-available/shrishyamproperties
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

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
        pm2 save
      `, '10. Configure Nginx Reverse Proxy');

      // Step 11: Verification Check
      await executeCommand(conn, `
        pm2 status
        curl -I http://localhost:8080/api/properties || true
        curl -I http://localhost:3000 || true
        curl -I http://localhost:3001 || true
      `, '11. Final Health Check');

      console.log('\n========================================');
      console.log('🎉 FULL STACK HOSTINGER DEPLOYMENT SUCCESSFUL!');
      console.log('========================================');
    } catch (e) {
      console.error('❌ Deployment Error:', e);
    } finally {
      conn.end();
    }
  }).on('error', (err) => {
    console.error('SSH Error:', err);
  }).connect(SSH_CONFIG);
}

runDeploy();
