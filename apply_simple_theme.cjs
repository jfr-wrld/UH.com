const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const filesToKeepGradient = [
  'TravelAgencyDetails.tsx',
  'TAProfile.tsx',
  'TAJamaahDetails.tsx',
  'JamaahDetails.tsx',
  'MutawwifDetails.tsx',
  'TAMutawwifDetails.tsx',
  'UserDetails.tsx',
  'TAStaffDetail.tsx',
];

walk('/Users/user/Documents/UH/src/pages', (filePath) => {
  if (!filePath.endsWith('.tsx')) return;
  const fileName = path.basename(filePath);
  if (filesToKeepGradient.includes(fileName)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('<HeroHeader')) {
    // If it already has a theme, skip (unless it's already simple, which means we skip)
    if (!content.includes('theme=')) {
        content = content.replace(/<HeroHeader/g, '<HeroHeader\n        theme="simple"');
        fs.writeFileSync(filePath, content);
        console.log('Applied simple theme to', fileName);
    }
  }
});
