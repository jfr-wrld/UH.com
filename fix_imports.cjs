const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/ta-portal/TABookingDetails.tsx',
  'src/pages/ta-portal/TAPackageDetails.tsx',
];

files.forEach(f => {
  const filePath = path.join('/Users/user/Documents/UH', f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\.\.\/\.\.\/\.\.\/components/g, '../../components');
    fs.writeFileSync(filePath, content);
    console.log('Fixed imports in', f);
  }
});
