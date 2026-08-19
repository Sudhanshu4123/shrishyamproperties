const { Client } = require('ssh2');

const SSH_CONFIG = {
  host: '187.127.134.114',
  port: 22,
  username: 'root',
  password: 'Shrishyam@2026#'
};

const conn = new Client();
conn.on('ready', () => {
  const cmd = `
    echo "=== PM2 STATUS ==="
    pm2 status
    echo "=== DIRECTORY LISTING /var/www/shrishyamproperties ==="
    ls -la /var/www/shrishyamproperties
    echo "=== GIT STATUS ON SERVER ==="
    cd /var/www/shrishyamproperties && git status && git log -n 3 --oneline
    echo "=== NGINX CONFIG ==="
    cat /etc/nginx/sites-available/shrishyamproperties 2>/dev/null || cat /etc/nginx/sites-enabled/default 2>/dev/null || echo "No nginx config found"
    echo "=== CURL ADMIN ON SERVER ==="
    curl -I http://localhost:3001 || echo "Port 3001 connection failed"
    curl -I http://localhost/admin || echo "Port 80 /admin connection failed"
  `;
  conn.exec(cmd, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.stderr.on('data', (d) => process.stderr.write(d.toString()));
    stream.on('close', () => conn.end());
  });
}).on('error', (err) => {
  console.error('SSH Error:', err);
}).connect(SSH_CONFIG);
