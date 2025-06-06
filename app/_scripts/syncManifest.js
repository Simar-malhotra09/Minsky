const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '../../public/manifest.json');
const source = path.resolve(__dirname, '../../extension/manifest.json');

fs.copyFileSync(source, target);
console.log('✅ Initial manifest.json synced. Watching for changes...');

chokidar.watch(source).on('change', () => {
  fs.copyFile(source, target, (err) => {
    if (err) return console.error('❌ Sync failed:', err);
    console.log('🔄 manifest.json updated and synced to /extension.');
  });
});
