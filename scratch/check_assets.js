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
    echo "=== FETCHING HOMEPAGE HTML OF /admin ==="
    curl -s http://localhost/admin | grep -o 'src="/admin/_next/static/[^"]*"' | head -n 3
    echo "=== TESTING FIRST ASSET LINK ==="
    ASSET=$(curl -s http://localhost/admin | grep -o '/admin/_next/static/[^"]*\.js' | head -n 1)
    echo "Asset URL: $ASSET"
    curl -I "http://localhost$ASSET"
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
