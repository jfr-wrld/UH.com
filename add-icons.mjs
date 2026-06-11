import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, 'src');

const iconMapping = {
  'view details': 'Eye',
  'view': 'Eye',
  'edit user': 'Edit',
  'edit role': 'Edit',
  'edit type': 'Edit',
  'edit period': 'Edit',
  'edit': 'Edit',
  'delete': 'Trash2',
  'archive type': 'Archive',
  'archive': 'Archive',
  'approve': 'CheckCircle',
  'reject': 'XCircle',
  'assign reviewer': 'UserPlus',
  'export application': 'Download',
  'export': 'Download',
  'download pdf': 'Download',
  'download': 'Download',
  'deactivate': 'PowerOff',
  'activate': 'Power',
  'suspend': 'Ban',
  'reactivate': 'RefreshCw',
  'start review': 'FileText',
  'request revision': 'RefreshCw',
  'view revision notes': 'FileText',
  'send reminder': 'Bell',
  'mark as resubmitted': 'CheckCircle',
  'view agency profile': 'Building2',
  'view rejection reason': 'AlertCircle',
  'reopen application': 'RefreshCw',
  'cancel': 'XCircle',
  'process refund': 'CheckCircle',
  'refund': 'RefreshCcw',
  'mark as paid': 'CheckCircle',
  'retry payment': 'RefreshCw',
  'view invoice': 'FileText',
  'resend invoice': 'Mail',
  'print receipt': 'Printer',
  'print': 'Printer',
  'manage members': 'Users',
  'duplicate': 'Copy',
  'add period': 'Plus',
  'view usage': 'BarChart',
  'publish': 'UploadCloud',
  'unpublish': 'CloudOff',
  'reset password': 'Key',
  'send invitation': 'Mail',
  'view itinerary': 'Map',
  'view participants': 'Users',
  'view room manifest': 'Bed',
  'assign mutawwif': 'UserPlus',
  'view manifest': 'Users',
  'view documents': 'FileText',
  'view report': 'FileText',
  'resolve': 'CheckCircle',
  'add note': 'MessageSquare',
  'view related booking': 'Calendar',
  'view booking details': 'Eye',
  'view payment details': 'CreditCard'
};

function getIconForLabel(label) {
  const l = label.toLowerCase();
  for (const [key, value] of Object.entries(iconMapping)) {
    if (l === key || l.includes(key)) {
      return value;
    }
  }
  return 'ChevronRight'; // default
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Find occurrences of DropdownMenu arrays.
  // Regex looks for: id: '...', label: '...'
  const itemRegex = /{\s*id:\s*['"][^'"]+['"]\s*,\s*label:\s*['"]([^'"]+)['"]([^}]*)}/g;
  
  let modified = false;
  let iconsNeeded = new Set();

  content = content.replace(itemRegex, (match, label, rest) => {
    // If it already has an icon, skip
    if (match.includes('icon:')) {
      const iconMatch = match.match(/icon:\s*<([A-Z][a-zA-Z0-9]+)/);
      if (iconMatch) {
        iconsNeeded.add(iconMatch[1]);
      }
      return match;
    }

    const iconName = getIconForLabel(label);
    iconsNeeded.add(iconName);
    
    // Insert icon after label
    const newMatch = match.replace(
      /label:\s*(['"][^'"]+['"])/,
      `label: $1, icon: <${iconName} size={16} />`
    );
    modified = true;
    return newMatch;
  });

  if (modified) {
    if (iconsNeeded.size > 0) {
      const importRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"];?/;
      const match = content.match(importRegex);
      
      if (match) {
        const existingImports = match[1].split(',').map(s => s.trim());
        const newImports = new Set([...existingImports, ...Array.from(iconsNeeded)]);
        content = content.replace(importRegex, `import { ${Array.from(newImports).join(', ')} } from 'lucide-react';`);
      } else {
        const lastImportIndex = content.lastIndexOf('import ');
        if (lastImportIndex !== -1) {
          const endOfLastImport = content.indexOf('\n', lastImportIndex);
          const insertPos = endOfLastImport !== -1 ? endOfLastImport + 1 : content.length;
          const importStmt = `import { ${Array.from(iconsNeeded).join(', ')} } from 'lucide-react';\n`;
          content = content.slice(0, insertPos) + importStmt + content.slice(insertPos);
        } else {
          content = `import { ${Array.from(iconsNeeded).join(', ')} } from 'lucide-react';\n` + content;
        }
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  });
}

walkDir(directoryPath);
console.log('Done!');
