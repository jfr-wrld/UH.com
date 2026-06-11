import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to find { id: ..., label: ... } that DOES NOT have icon:
  // We need to be careful to only look at places that look like menu items
  const itemRegex = /{\s*id:\s*['"][^'"]+['"]\s*,\s*label:\s*['"]([^'"]+)['"]([^}]*)}/g;
  
  let match;
  while ((match = itemRegex.exec(content)) !== null) {
    const label = match[1];
    const rest = match[2];
    if (!rest.includes('icon:')) {
      console.log(`Missing icon in ${filePath} -> Label: "${label}"`);
    }
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

walkDir(directoryPath);
