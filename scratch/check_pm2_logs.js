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
    echo "=== PM2 LOGS FOR SHRISHYAM-ADMIN ==="
    pm2 logs shrishyam-admin --lines 20 --nostream
    echo "=== CHECKING PORT 3001 ==="
    curl -I http://localhost:3001/admin || echo "Failed 3001/admin"
    echo "=== CHECKING PORT 80 /admin ==="
    curl -I http://localhost/admin || echo "Failed 80/admin"
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
