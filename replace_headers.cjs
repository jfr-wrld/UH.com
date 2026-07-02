const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const filesToSkip = [
  'TravelAgencyDetails.tsx',
  'TAProfile.tsx',
  'TAJamaahDetails.tsx',
  'JamaahDetails.tsx', // Also for admin jamaah
  'MutawwifDetails.tsx',
  'TAMutawwifDetails.tsx',
  'UserDetails.tsx',
  'TAStaffDetail.tsx',
];

walk('/Users/user/Documents/UH/src/pages', (filePath) => {
  if (!filePath.endsWith('.tsx')) return;
  const fileName = path.basename(filePath);
  if (filesToSkip.includes(fileName)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('HeroHeader')) {
    // Replace HeroHeader tags with PageHeader tags
    content = content.replace(/<HeroHeader/g, '<PageHeader');
    content = content.replace(/<\/HeroHeader>/g, '</PageHeader>');
    
    // Replace import
    if (content.includes('import { PageHeader }')) {
      content = content.replace(/import\s+{\s*HeroHeader\s*}\s+from\s+['"][^'"]+HeroHeader['"];?\n?/, '');
    } else {
      content = content.replace(/HeroHeader/g, 'PageHeader');
    }
    
    fs.writeFileSync(filePath, content);
    console.log('Updated', fileName);
  }
});
