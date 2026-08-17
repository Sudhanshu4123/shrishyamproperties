const { Client } = require('ssh2');

const conn = new Client();

conn.on('ready', () => {
  console.log('SSH Connection Established successfully to Hostinger VPS!');
  conn.exec('uname -a && uptime && lsb_release -a', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Command exited with code: ' + code);
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT:\n' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR:\n' + data);
    });
  });
}).on('error', (err) => {
  console.error('SSH Error:', err);
}).connect({
  host: '187.127.134.114',
  port: 22,
  username: 'root',
  password: 'Shrishyam@2026#'
});
