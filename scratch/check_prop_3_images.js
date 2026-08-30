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
    echo "=== API PROPERTY 3 DATA ==="
    curl -s http://localhost:8080/api/properties/3
    echo ""
    echo "=== MYSQL PROPERTY 3 ROW ==="
    mysql shrishyam_db -e "SELECT id, title, hero_image FROM properties WHERE id = 3;"
    echo "=== MYSQL PROPERTY 3 IMAGES ==="
    mysql shrishyam_db -e "SELECT * FROM property_images WHERE property_id = 3;"
    echo "=== CHECK UPLOADS DIRECTORY ==="
    ls -la /var/www/shrishyamproperties/frontend/public/uploads/
  `, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.on('close', () => conn.end());
  });
}).connect(SSH_CONFIG);
