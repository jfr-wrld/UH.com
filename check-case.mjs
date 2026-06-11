import fs from 'fs';
import path from 'path';

let hasErrors = false;

function checkImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      checkImports(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const importRegex = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (importPath.startsWith('.')) {
          // Resolve relative path
          const resolvedPath = path.resolve(path.dirname(fullPath), importPath);
          
          // Try with various extensions
          const extensions = ['', '.tsx', '.ts', '.css', '/index.tsx', '/index.ts'];
          let foundExact = false;
          let matchedExt = '';

          for (const ext of extensions) {
            if (fs.existsSync(resolvedPath + ext)) {
              // Exists, but is the casing exactly correct?
              const dirname = path.dirname(resolvedPath + ext);
              const basename = path.basename(resolvedPath + ext);
              
              if (fs.existsSync(dirname)) {
                const actualFiles = fs.readdirSync(dirname);
                if (actualFiles.includes(basename)) {
                  foundExact = true;
                  break;
                }
              }
            }
          }
          
          if (!foundExact) {
            // It could be an alias or missing file, but since it works locally, 
            // it means it exists with WRONG casing!
            // Let's verify if it exists case-insensitively.
            for (const ext of extensions) {
               const p = resolvedPath + ext;
               const dirname = path.dirname(p);
               const basename = path.basename(p);
               if (fs.existsSync(dirname)) { // Mac is case-insensitive, so this works
                 const actualFiles = fs.readdirSync(dirname);
                 const lowercaseFiles = actualFiles.map(f => f.toLowerCase());
                 if (lowercaseFiles.includes(basename.toLowerCase())) {
                   console.log(`CASE ERROR in ${fullPath}: Import '${importPath}' matches file '${actualFiles[lowercaseFiles.indexOf(basename.toLowerCase())]}' but casing is wrong!`);
                   hasErrors = true;
                 }
               }
            }
          }
        }
      }
    }
  }
}

checkImports(path.resolve('src'));
if (!hasErrors) console.log("No case sensitivity errors found.");
