const fs = require('fs');
const path = require('path');
const root = __dirname;
const dist = path.join(root, 'dist');
const files = [
  'index.html', 'gracias.html', 'app.html', 'app.js', 'civil-comercial.html',
  'chat.js', 'Hero.jpg', 'manifest.json', 'service-worker.js', 'stylus.css',
  'css/stylus.css', 'css/normalize.css'
];
fs.rmSync(dist, { recursive: true, force: true });
for (const file of files) {
  const source = path.join(root, file);
  if (!fs.existsSync(source)) continue;
  const destination = path.join(dist, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}
console.log('Sitio generado en dist/');
