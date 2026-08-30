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
    echo "=== TEST IMAGE UPLOAD TO /api/upload ==="
    echo "test image sample payload" > /tmp/sample_house.jpg
    RESPONSE=$(curl -s -X POST https://shrishyamassociate.com/api/upload -F "file=@/tmp/sample_house.jpg")
    echo "Upload API Response: $RESPONSE"
    
    FILENAME=$(echo $RESPONSE | grep -o 'prop_[^"]*')
    echo "Extracted Filename: $FILENAME"
    
    echo "=== TEST DIRECT GET OF UPLOADED FILE VIA HTTPS ==="
    curl -i https://shrishyamassociate.com/uploads/$FILENAME
  `, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.on('close', () => conn.end());
  });
}).connect(SSH_CONFIG);
