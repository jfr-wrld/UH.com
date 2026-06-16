import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.tsx')) {
      callback(filepath);
    }
  }
}

let modifiedFiles = 0;

walk(path.join(__dirname, 'src', 'pages'), (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Find the 'view' action navigate target
  const viewActionMatch = content.match(/id:\s*'view'.*?navigate\('([^']+)'(.*?)\)/);
  if (viewActionMatch) {
    const route = viewActionMatch[1];
    const args = viewActionMatch[2]; // e.g. `, { id: row.id }`
    
    // Only apply if DataTable doesn't already have onRowClick
    if (content.includes('<DataTable') && !content.includes('onRowClick={')) {
      
      // Determine what the row variable is named in the view action
      let rowVar = 'row';
      if (args.includes('row.')) rowVar = 'row';
      else if (args.includes('record.')) rowVar = 'record';
      else if (args.includes('item.')) rowVar = 'item';
      
      const onRowClickCode = `\n        onRowClick={(${rowVar}: any) => navigate('${route}'${args})}`;
      
      // Replace `<DataTable ` with `<DataTable onRowClick={...}`
      const newContent = content.replace(/<DataTable(\s+)/g, `<DataTable${onRowClickCode}$1`);
      
      if (content !== newContent) {
        fs.writeFileSync(filepath, newContent, 'utf8');
        modifiedFiles++;
        console.log(`Updated ${path.basename(filepath)}: added onRowClick to navigate to ${route}`);
      }
    }
  }
});

console.log(`Finished! Modified ${modifiedFiles} files.`);
