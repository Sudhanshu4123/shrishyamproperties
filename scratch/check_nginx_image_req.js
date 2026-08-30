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
    echo "=== DIRECT CURL TO /uploads FILE ==="
    curl -i https://shrishyamassociate.com/uploads/prop_1788080449024_whatsapp_image_2026_05_04_at_5.07.46_am.jpeg
    echo ""
    echo "=== NGINX ACCESS / ERROR LOGS ==="
    tail -n 20 /var/log/nginx/error.log
  `, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.on('close', () => conn.end());
  });
}).connect(SSH_CONFIG);
