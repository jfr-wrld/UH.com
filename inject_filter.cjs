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
  let modifiedCount = 0;

  for (const file of tsxFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if it uses FilterBar and DataTable
    if (!content.includes('<FilterBar') || !content.includes('<DataTable')) continue;

    // Find the data variable used in DataTable
    const dataMatch = content.match(/<DataTable[^>]*\bdata=\{([A-Za-z0-9_]+)\}/);
    if (!dataMatch) {
        console.log('Could not find data prop in DataTable for', file);
        continue;
    }
    const dataVar = dataMatch[1];
    
    // Skip if already applied
    if (content.includes('useDataFilter')) continue;

    console.log(`Processing ${path.basename(file)} with data var: ${dataVar}`);

    // Add import
    const importStatement = `import { useDataFilter } from '../../hooks/useDataFilter';\n`;
    // find last import
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.substring(0, endOfLastImport + 1) + importStatement + content.substring(endOfLastImport + 1);

    // Inject hook call right before return
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

  return (`;
    // find return (
    content = content.replace(/\n\s*return\s*\(/g, hookCall);

    // Update FilterBar props
    // We'll replace the existing FilterBar tag
    // Since props might be multi-line, we'll do a regex replacement for specific props
    content = content.replace(/onFilterChange=\{[^}]+\}/, `onFilterChange={handleFilterChange}\n        activeFilters={activeFilters}`);
    content = content.replace(/onSearch=\{[^}]+\}/, `onSearch={setSearchQuery}\n        searchValue={searchQuery}\n        onClearFilters={clearFilters}\n        hasActiveFilters={hasActiveFilters}`);
    
    // In case there's no onSearch but there is onFilterChange
    if (!content.includes('searchValue={searchQuery}') && content.includes('<FilterBar')) {
        // Just inject everything into the FilterBar start tag
        // Actually, let's just do a clean replacement
    }

    // Update DataTable data prop
    // We replace data={dataVar} with data={filteredData}
    // But be careful not to replace it if we couldn't inject properly
    const dataRegex = new RegExp(`data=\\{${dataVar}\\}`, 'g');
    content = content.replace(dataRegex, `data={filteredData}`);

    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
  
  console.log(`Modified ${modifiedCount} files.`);
});
