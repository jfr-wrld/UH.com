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
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the imported hook
    content = content.replace(/import \{ useDataFilter \} from '\.\.\/\.\.\/hooks\/useDataFilter';\n/, '');

    // Remove the injected hook calls
    const hookRegex = /^[ \t]*const \{\s*searchQuery,\s*setSearchQuery,\s*activeFilters,\s*handleFilterChange,\s*clearFilters,\s*hasActiveFilters,\s*filteredData\s*\} = useDataFilter\([^)]+\);\s*return \(/gm;
    content = content.replace(hookRegex, 'return (');

    // Restore FilterBar
    // This might be tricky because of the indentation, let's just do a rough replace
    content = content.replace(/onFilterChange=\{handleFilterChange\}\s*activeFilters=\{activeFilters\}/g, 'onFilterChange={(g, v) => console.log(g, v)}');
    content = content.replace(/onSearch=\{setSearchQuery\}\s*searchValue=\{searchQuery\}\s*onClearFilters=\{clearFilters\}\s*hasActiveFilters=\{hasActiveFilters\}/g, 'onSearch={(q) => console.log(q)}');
    
    // Restore DataTable
    // Wait, replacing `data={filteredData}` with `data={DATA_VAR}`. 
    // We can't know DATA_VAR easily unless we parse it again, but if we remove useDataFilter, data={filteredData} will throw an error, 
    // Actually, I can just leave it for now and re-run the fixed injection script! 
    // If I re-run the fixed injection script, I don't need to revert FilterBar and DataTable, I only need to fix the duplicate hook injections!

    fs.writeFileSync(file, content, 'utf8');
  }
  console.log('Cleaned up hook calls.');
});
