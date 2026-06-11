import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function read(file) { return fs.readFileSync(path.resolve(file), 'utf8'); }
function write(file, content) { fs.writeFileSync(path.resolve(file), content); }
function replaceAll(file, search, replaceStr) {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  if (typeof search === 'string') {
    content = content.split(search).join(replaceStr);
  } else {
    content = content.replace(search, replaceStr);
  }
  fs.writeFileSync(p, content);
}

// 1. SeasonList.tsx
replaceAll('src/pages/season/SeasonList.tsx', 'date: s.createdDate', 'timestamp: s.createdDate as any');
replaceAll('src/pages/season/SeasonList.tsx', 'snapshot: ', 'description: ');
replaceAll('src/pages/season/SeasonList.tsx', 'lastUpdated: p.lastUpdated', 'timestamp: p.lastUpdated as any');
replaceAll('src/pages/season/SeasonList.tsx', 'snapshot: `${s.periodCount} Periods`', 'description: `${s.periodCount} Periods`');
replaceAll('src/pages/season/SeasonList.tsx', 'date:', 'timestamp:');

// 2. Duplicate properties in SeasonPeriodModal, SeasonTypeModal, SettingsPage, MutawwifReportDetails, TestimonialDetails, ApplicationReview
const dupFiles = [
  'src/pages/season/SeasonPeriodModal.tsx',
  'src/pages/season/SeasonTypeModal.tsx',
  'src/pages/settings/SettingsPage.tsx',
  'src/pages/testimonial/MutawwifReportDetails.tsx',
  'src/pages/testimonial/TestimonialDetails.tsx',
  'src/pages/travel-agency/ApplicationReview.tsx'
];
dupFiles.forEach(f => {
  replaceAll(f, /border: 'var\(--glass-border\)', boxShadow: 'var\(--glass-shadow\)', borderRadius: 'var\(--radius-lg\)', border: 'none'/g, "boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-lg)', border: 'none'");
  replaceAll(f, /border: 'var\(--glass-border\)', boxShadow: 'var\(--glass-shadow\)', padding: 'var\(--space-6\)', borderRadius: 'var\(--radius-card\)', border: 'none'/g, "boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none'");
});

// 3. SettingsPage.tsx navigate any
replaceAll('src/pages/settings/SettingsPage.tsx', 'export const SettingsPage = ({ navigate }) => {', 'export const SettingsPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {');
replaceAll('src/pages/settings/SettingsPage.tsx', "label: <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><User size={16} />Profile</div>", "id: '1', label: 'Profile'");
replaceAll('src/pages/settings/SettingsPage.tsx', "label: <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><Building size={16} />Agency</div>", "id: '2', label: 'Agency'");

// 4. TestimonialDetails.tsx useState
replaceAll('src/pages/testimonial/TestimonialDetails.tsx', "import React from 'react';", "import React, { useState } from 'react';");

// 5. TestimonialList.tsx useDataFilter position
let tlContent = read('src/pages/testimonial/TestimonialList.tsx');
// Remove useDataFilter from inside renderStars
const toRemove = `const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData,
    totalItems,
    currentPage,
    totalPages,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    sortKey,
    sortOrder,
    onSort
  } = useDataFilter(endTripData, {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });`;
tlContent = tlContent.replace(toRemove, '');
// Add it back above renderStars
tlContent = tlContent.replace('const renderStars = (rating: number) => {', toRemove + '\n\n  const renderStars = (rating: number) => {');
write('src/pages/testimonial/TestimonialList.tsx', tlContent);

// 6. TravelAgencyDetails.tsx status
replaceAll('src/pages/travel-agency/TravelAgencyDetails.tsx', "status: 'completed'", "type: 'completed' as any");
replaceAll('src/pages/travel-agency/TravelAgencyDetails.tsx', "status: 'pending'", "type: 'pending' as any");

// 7. TravelAgencyForm.tsx maxSize, currentStep
replaceAll('src/pages/travel-agency/TravelAgencyForm.tsx', 'maxSize=', 'maxSizeMB=');
replaceAll('src/pages/travel-agency/TravelAgencyForm.tsx', 'currentStep={currentStep}', 'currentStepIndex={currentStep}');

try {
  console.log('Running tsc...');
  execSync('npx tsc --noEmit -p tsconfig.app.json', { encoding: 'utf8', stdio: 'inherit' });
  console.log('TSC passed!');
} catch (e) {
  console.log('Errors remaining!');
}
