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
    echo "=== SITES ENABLED ==="
    ls -la /etc/nginx/sites-enabled/
    echo ""
    echo "=== ACTIVE NGINX CONFIGS ==="
    cat /etc/nginx/sites-enabled/*
  `, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.on('close', () => conn.end());
  });
}).connect(SSH_CONFIG);
