const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'css'), { recursive: true });
for (const file of [
  'index.html', 'civil-comercial.html', 'chat.js', 'Hero.jpg',
  'manifest.json', 'service-worker.js', 'stylus.css',
  'css/stylus.css', 'css/normalize.css'
]) {
  fs.copyFileSync(path.join(__dirname, file), path.join(dist, file));
}
