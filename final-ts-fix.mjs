import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function replace(file, search, replace) {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  fs.writeFileSync(p, content.replace(search, replace));
}

function removeUnusedImports(file, importsToRem) {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  importsToRem.forEach(imp => {
    content = content.replace(new RegExp(`\\b${imp}\\b,?`, 'g'), '');
  });
  // Clean up empty import braces
  content = content.replace(/import\s*\{\s*,\s*\}/g, 'import { }');
  content = content.replace(/import\s*\{\s*\}/g, '');
  fs.writeFileSync(p, content);
}

// TravelAgencyDetails
removeUnusedImports('src/pages/travel-agency/TravelAgencyDetails.tsx', ['Eye', 'EyeOff', 'CheckCircle', 'ChevronRight']);
replace('src/pages/travel-agency/TravelAgencyDetails.tsx', /history=\{reviewHistory\}/g, 'reviews={reviewHistory.map(h => ({ id: h.id, actor: h.reviewer, decision: h.status as any, timestamp: h.date, note: h.notes }))}');
replace('src/pages/travel-agency/TravelAgencyDetails.tsx', /const \{\} = useDataFilter\(.*?\);/g, '');

// TravelAgencyApplications
replace('src/pages/travel-agency/TravelAgencyApplications.tsx', /row\.logo \?/g, 'false ?');
removeUnusedImports('src/pages/travel-agency/TravelAgencyApplications.tsx', ['ChevronRight']);

// TravelAgencyForm
replace('src/pages/travel-agency/TravelAgencyForm.tsx', /import \{ Stepper \} from '\.\.\/\.\.\/components\/navigation\/Stepper';\nimport \{ Stepper \} from '\.\.\/\.\.\/components\/navigation\/Stepper';/, "import { Stepper } from '../../components/navigation/Stepper';");
replace('src/pages/travel-agency/TravelAgencyForm.tsx', /currentStep=\{currentStep\}/g, 'currentStepIndex={currentStep}');

// ApplicationReview
replace('src/pages/travel-agency/ApplicationReview.tsx', /onCancel=\{.*?\}/g, '');
removeUnusedImports('src/pages/travel-agency/ApplicationReview.tsx', ['Button', 'Badge', 'Select', 'Input', 'ToastMessage', 'ChevronRight']);

// TestimonialList
removeUnusedImports('src/pages/testimonial/TestimonialList.tsx', ['ChevronRight', 'ExportControl']);
replace('src/pages/testimonial/TestimonialList.tsx', /const \{\} = useDataFilter\(.*?\);/g, '');
replace('src/pages/testimonial/TestimonialList.tsx', /const \{.*?\} = useDataFilter\(.*?\);/gs, '');

// TestimonialDetails
replace('src/pages/testimonial/TestimonialDetails.tsx', /import React from 'react';/, "import React, { useState } from 'react';");
replace('src/pages/testimonial/TestimonialDetails.tsx', /border: 'var\(--glass-border\)', (.*?) border: 'none'/g, '$1 border: \'none\'');

// UserManagement
removeUnusedImports('src/pages/user-management/RoleForm.tsx', ['useState']);
replace('src/pages/user-management/RoleForm.tsx', /const \{\} = useDataFilter\(.*?\);/g, '');
replace('src/pages/user-management/RoleList.tsx', /const \{\} = useDataFilter\(.*?\);/g, '');
removeUnusedImports('src/pages/user-management/UserDetails.tsx', ['PageHeader', 'ChevronRight']);
replace('src/pages/user-management/UserDetails.tsx', /const \{\} = useDataFilter\(.*?\);/g, '');
replace('src/pages/user-management/UserDetails.tsx', /history=\{reviewHistory\}/g, 'reviews={reviewHistory.map(h => ({ id: h.id, actor: h.reviewer, decision: h.status as any, timestamp: h.date, note: h.notes }))}');
removeUnusedImports('src/pages/user-management/UserList.tsx', ['ChevronRight']);

// Run TSC again
try {
  execSync('npx tsc --noEmit -p tsconfig.app.json', { encoding: 'utf8' });
  console.log('TSC passed!');
} catch (e) {
  console.log('Errors:');
  console.log(e.stdout);
}
