import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

let count = 0;
walk('src', (filepath) => {
  if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
    let content = fs.readFileSync(filepath, 'utf8');
    let modified = false;

    // Replace all unsplash URLs
    // Pattern: https://images.unsplash.com/photo-[a-zA-Z0-9\-]+?w=150&h=150&fit=crop
    // Or just https://images.unsplash.com/...
    
    // Some urls might not have w and h explicitly.
    const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+(?:\?w=(\d+)&h=(\d+)&fit=crop)?/g;
    
    content = content.replace(regex, (match, w, h) => {
      modified = true;
      count++;
      let width = w || '400';
      let height = h || '400';
      // To keep them somewhat distinct, use a seed
      let seed = Math.floor(Math.random() * 1000);
      return `https://picsum.photos/seed/${seed}/${width}/${height}`;
    });

    if (modified) {
      fs.writeFileSync(filepath, content);
    }
  }
});
console.log(`Replaced ${count} broken Unsplash images!`);
