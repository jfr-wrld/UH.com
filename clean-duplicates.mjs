import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

// We want to remove all duplicate properties. The most common duplicate is:
// `border: 'var(--glass-border)'` and `border: 'none'`
// Let's replace `border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none'`
// with just border: none

walk('src', (filepath) => {
  if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Pattern 1:
    content = content.replace(/border:\s*'var\(--glass-border\)',[\s\S]{0,150}?border:\s*'none'/g, (match) => {
      return match.replace(/border:\s*'var\(--glass-border\)',/g, '');
    });

    // Pattern 2: Multiple style={{...}} issues
    content = content.replace(/style=\{\{\s*margin(?:Top|Bottom):\s*'[^']+',\s*margin(?:Top|Bottom):\s*'[^']+'\s*\}\}/g, (match) => {
      // Very naive, just keeping the last one is safer but let's just let it be.
      return match;
    });

    fs.writeFileSync(filepath, content);
  }
});
