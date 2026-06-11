import fs from 'fs';
import path from 'path';

function removeDuplicateBorder(file) {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/border:\s*'var\(--glass-border\)',/g, '');
  fs.writeFileSync(p, content);
}

const files = [
  'src/pages/season/SeasonPeriodModal.tsx',
  'src/pages/season/SeasonTypeModal.tsx',
  'src/pages/settings/SettingsPage.tsx',
  'src/pages/testimonial/MutawwifReportDetails.tsx',
  'src/pages/testimonial/TestimonialDetails.tsx',
  'src/pages/travel-agency/ApplicationReview.tsx'
];
files.forEach(removeDuplicateBorder);
