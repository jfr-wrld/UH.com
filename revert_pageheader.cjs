const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('/Users/user/Documents/UH/src/pages', (filePath) => {
  if (!filePath.endsWith('.tsx')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('<PageHeader') && content.includes('onBack={')) {
    content = content.replace(/<PageHeader/g, '<HeroHeader');
    content = content.replace(/<\/PageHeader>/g, '</HeroHeader>');
    
    // Add import HeroHeader if not exists
    if (!content.includes('import { HeroHeader }')) {
      if (content.includes('import { PageHeader } from \'../../../components/layout/PageHeader\';')) {
          content = content.replace('import { PageHeader } from \'../../../components/layout/PageHeader\';', 
                                    'import { PageHeader } from \'../../../components/layout/PageHeader\';\nimport { HeroHeader } from \'../../../components/layout/HeroHeader\';');
      } else if (content.includes('import { PageHeader } from \'../../components/layout/PageHeader\';')) {
          content = content.replace('import { PageHeader } from \'../../components/layout/PageHeader\';', 
                                    'import { PageHeader } from \'../../components/layout/PageHeader\';\nimport { HeroHeader } from \'../../components/layout/HeroHeader\';');
      }
    }
    
    fs.writeFileSync(filePath, content);
    console.log('Reverted to HeroHeader in', path.basename(filePath));
  }
});
