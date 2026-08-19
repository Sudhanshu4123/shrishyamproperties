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
    echo "=== TESTING 187.127.134.114:3000 ==="
    curl -sI http://localhost:3000 | head -n 5
    echo "=== TESTING 187.127.134.114:3001 ==="
    curl -sI http://localhost:3001 | head -n 5
    echo "=== TESTING /admin ==="
    curl -sI http://localhost/admin | head -n 5
    echo "=== TESTING /admin/ ==="
    curl -sI http://localhost/admin/ | head -n 5
    echo "=== NGINX ACCESS LOGS (LAST 10) ==="
    tail -n 10 /var/log/nginx/access.log 2>/dev/null || true
    echo "=== NGINX ERROR LOGS (LAST 10) ==="
    tail -n 10 /var/log/nginx/error.log 2>/dev/null || true
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
