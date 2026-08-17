const { Client } = require('ssh2');

const users = ['root', 'ubuntu', 'debian', 'admin'];
const passwords = ['Shrishyam@2026#', 'shrishyam@2026#', 'Shrishyam2026#'];

async function testAuth(username, password) {
  return new Promise((resolve) => {
    const conn = new Client();
    conn.on('ready', () => {
      console.log(`✅ SUCCESS! Authenticated with user: ${username}, password: ${password}`);
      conn.end();
      resolve(true);
    }).on('error', (err) => {
      // console.log(`Failed ${username} / ${password}: ${err.message}`);
      resolve(false);
    }).connect({
      host: '187.127.134.114',
      port: 22,
      username,
      password,
      readyTimeout: 5000
    });
  });
}

async function run() {
  console.log('Testing Hostinger SSH authentication...');
  for (const u of users) {
    for (const p of passwords) {
      const ok = await testAuth(u, p);
      if (ok) return;
    }
  }
  console.log('❌ All authentication variations failed. Password authentication might be disabled or password differs.');
}

run();
