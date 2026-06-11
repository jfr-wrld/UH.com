import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, search, replacement) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  fs.writeFileSync(fullPath, content.replace(search, replacement));
}

// 1. TravelAgencyDetails.tsx
replaceInFile('src/pages/travel-agency/TravelAgencyDetails.tsx', 
  /history=\{reviewHistory\}/g, 
  'reviews={reviewHistory.map(h => ({ id: h.id, actor: h.reviewer, decision: h.status as any, timestamp: h.date, note: h.notes }))}'
);

// 2. UserDetails.tsx
replaceInFile('src/pages/user-management/UserDetails.tsx',
  /history=\{reviewHistory\}/g,
  'reviews={reviewHistory.map(h => ({ id: h.id, actor: h.reviewer, decision: h.status as any, timestamp: h.date, note: h.notes }))}'
);

// Let's run build and catch errors dynamically to ensure we fix all of them!
import { execSync } from 'child_process';
try {
  console.log('Running tsc...');
  execSync('npx tsc --noEmit -p tsconfig.app.json', { encoding: 'utf8' });
  console.log('TSC passed!');
} catch (e) {
  console.log('Errors:');
  console.log(e.stdout);
}
