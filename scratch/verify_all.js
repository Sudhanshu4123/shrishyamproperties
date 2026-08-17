const { Client } = require('ssh2');

const SSH_CONFIG = {
  host: '187.127.134.114',
  port: 22,
  username: 'root',
  password: 'Shrishyam@2026#'
};

const conn = new Client();
conn.on('ready', () => {
  conn.exec(`
    echo "=== PM2 STATUS ==="
    pm2 status
    echo "=== SYSTEMD BACKEND STATUS ==="
    systemctl status shrishyam-backend --no-pager
    echo "=== PORT 8080 API CHECK ==="
    curl -i http://localhost:8080/api/properties
    echo "=== PORT 3000 FRONTEND CHECK ==="
    curl -I http://localhost:3000
    echo "=== PORT 3001 ADMIN CHECK ==="
    curl -I http://localhost:3001
  `, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.on('close', () => conn.end());
  });
}).connect(SSH_CONFIG);
