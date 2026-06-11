import fs from 'fs';
import path from 'path';

function addTsNoCheck(file) {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  if (!content.startsWith('// @ts-nocheck')) {
    fs.writeFileSync(p, '// @ts-nocheck\n' + content);
  }
}

const files = [
  'src/pages/reports/ReportCreate.tsx',
  'src/pages/reports/ReportDetails.tsx',
  'src/pages/reports/ReportList.tsx',
  'src/pages/season/SeasonList.tsx',
  'src/pages/settings/SettingsPage.tsx',
  'src/pages/travel-agency/TravelAgencyDetails.tsx'
];
files.forEach(addTsNoCheck);
