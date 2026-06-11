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
    
    // We already removed the hooks in script 2. 
    // Now we just need to re-inject them!
    
    // The problem is we need the original data variable name.
    // Wait! Since we removed the hook call in script 2, we lost `originalDataVar`!!
    // We need to find the data var name by looking at the variable defined above `return (`!
    // Almost all these files define a mock array: `const somethingList = [`
    // Let's find `const ([a-zA-Z0-9_]+List|applications|agencies|users|usageReference|endTripData) = \[`
    const mockVarMatch = content.match(/const\s+([a-zA-Z0-9_]+)\s*=\s*\[/);
    if (!mockVarMatch) {
      console.log('Could not guess mock array for', file);
      continue;
    }
    const dataVar = mockVarMatch[1];
    
    // Let's make sure it's the right one. The ones we know:
    // applications, agencies, users, usageReference, endTripData, and things ending in List.
    
    const importStatement = `import { useDataFilter } from '../../hooks/useDataFilter';\n`;
    if (!content.includes('useDataFilter')) {
      const lastImportIndex = content.lastIndexOf('import ');
      const endOfLastImport = content.indexOf('\n', lastImportIndex);
      content = content.substring(0, endOfLastImport + 1) + importStatement + content.substring(endOfLastImport + 1);
    }

    const hookCall = `
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(${dataVar});
`;

    let replaced = false;
    content = content.replace(/(\n\s*return\s*\(\s*<[a-zA-Z]+[ \n>])/m, (match) => {
      replaced = true;
      return hookCall + match;
    });

    if (!replaced) {
      console.log('Could not find main return in', file);
    }

    fs.writeFileSync(file, content, 'utf8');
  }
  console.log('Injected hook calls safely.');
});
