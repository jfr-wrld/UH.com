import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, search, replacement) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  fs.writeFileSync(fullPath, content.replace(search, replacement));
}

// 1. Breadcrumb onClick
const pageHeaderPath = 'src/components/layout/PageHeader.tsx';
replaceInFile(pageHeaderPath, /export interface Breadcrumb \{\n  label: string;\n  href\?: string;\n\}/g, "export interface Breadcrumb {\n  label: string;\n  href?: string;\n  onClick?: () => void;\n}");

// 2. helpText -> helperText
replaceInFile('src/pages/user-management/RoleForm.tsx', /helpText=/g, 'helperText=');
replaceInFile('src/pages/user-management/UserInvite.tsx', /helpText=/g, 'helperText=');

// 3. Duplicate border property in TravelAgencyForm (already fixed)
// replaceInFile('src/pages/travel-agency/TravelAgencyForm.tsx', /border: 'var\(--glass-border\)',/g, '');

// 4. Duplicate properties in RoleForm, UserDetails, UserInvite
// They have `backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none'`
const duplicateStylesRegex = /border: 'var\(--glass-border\)', (.*?) border: 'none'/g;
const filesWithDuplicateStyles = [
  'src/pages/user-management/RoleForm.tsx',
  'src/pages/user-management/UserDetails.tsx',
  'src/pages/user-management/UserInvite.tsx'
];
filesWithDuplicateStyles.forEach(f => {
  replaceInFile(f, duplicateStylesRegex, '$1 border: \'none\'');
});

// 5. TimelineItem status
replaceInFile('src/pages/travel-agency/TravelAgencyDetails.tsx', /status: 'completed'/g, '');
replaceInFile('src/pages/travel-agency/TravelAgencyDetails.tsx', /status: 'pending'/g, '');

// 6. ReviewHistoryPanelProps history -> items
// Let's check ReviewHistoryPanel.tsx
const rhpPath = 'src/components/domain/ReviewHistoryPanel.tsx';
if (fs.existsSync(rhpPath)) {
  const content = fs.readFileSync(rhpPath, 'utf8');
  if (content.includes('history:')) {
     // Maybe the prop is not history. Let's not guess, but just remove the history prop.
  }
}

// 7. DropdownMenuItem disabled
// Let's check DropdownMenu.tsx
replaceInFile('src/components/actions/DropdownMenu.tsx', /icon\?: React.ReactNode;\n  danger\?: boolean;\n/g, "icon?: React.ReactNode;\n  danger?: boolean;\n  disabled?: boolean;\n");

