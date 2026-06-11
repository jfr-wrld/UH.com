const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk(srcDir, (err, files) => {
  if (err) throw err;
  
  const tsxFiles = files.filter(f => f.endsWith('.tsx'));

  for (const file of tsxFiles) {
    if (file.includes('ReportList.tsx')) continue; // ReportList was manually fixed correctly

    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('<FilterBar') || !content.includes('<DataTable')) continue;

    // Extract the ORIGINAL dataVar from the hook call before we delete it!
    const hookMatch = content.match(/useDataFilter\(([^)]+)\)/);
    if (!hookMatch) continue; // Not injected yet?

    const originalDataVar = hookMatch[1];
    
    // Cleanup bad hooks and imports
    const hookRegex = /^[ \t]*const \{\s*searchQuery,\s*setSearchQuery,\s*activeFilters,\s*handleFilterChange,\s*clearFilters,\s*hasActiveFilters,\s*filteredData\s*\} = useDataFilter\([^)]+\);\s*/gm;
    content = content.replace(hookRegex, '');
    
    content = content.replace(/import \{ useDataFilter \} from '\.\.\/\.\.\/hooks\/useDataFilter';\n/g, '');

    // Now inject it correctly!
    const importStatement = `import { useDataFilter } from '../../hooks/useDataFilter';\n`;
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.substring(0, endOfLastImport + 1) + importStatement + content.substring(endOfLastImport + 1);

    const hookCall = `
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(${originalDataVar});

  return (`;

    // Only replace the MAIN return!
    // The main return usually has 2 spaces indentation: /^  return \(/m
    // But sometimes it might be `return (` without exactly two spaces if it was formatted differently.
    // Let's use `\n  return \(`
    
    let replaced = false;
    content = content.replace(/\n  return \(/, (match) => {
      replaced = true;
      return '\n' + hookCall;
    });

    if (!replaced) {
      console.log('Could not find main return in', file);
    }

    fs.writeFileSync(file, content, 'utf8');
  }
  console.log('Fixed hook injections.');
});
