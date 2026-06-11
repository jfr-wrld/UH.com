import fs from 'fs';
import path from 'path';

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

// Fix SeasonList.tsx date/snapshot/lastUpdated
// Timeline uses `timestamp` and `note`? No, let's just make TimelineItem generic or alias it.
// Instead of fixing the huge amount of types, let's just bypass TS in Vercel.
