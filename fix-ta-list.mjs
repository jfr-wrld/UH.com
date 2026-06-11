import fs from 'fs';
import path from 'path';

let file = 'src/pages/travel-agency/TravelAgencyList.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add `isVerified` to mock data randomly or specifically for some.
content = content.replace(/"status": "Active",/g, '"status": "Active",\n    "isVerified": true,');
content = content.replace(/"status": "Suspended",/g, '"status": "Suspended",\n    "isVerified": false,');
content = content.replace(/"status": "Inactive",/g, '"status": "Inactive",\n    "isVerified": false,');

// 2. Import BadgeCheck from lucide-react
if (!content.includes('BadgeCheck')) {
  content = content.replace('Plus, Building2, Eye, Edit, ChevronRight, RefreshCw, Ban', 'Plus, Building2, Eye, Edit, ChevronRight, RefreshCw, Ban, BadgeCheck');
}

// 3. Fix the render accessor to include the verified icon
const oldAccessor = `          <div>
            <div className="text-body-bold">{row.name}</div>
            <div className="text-caption text-muted">{row.id}</div>
          </div>`;

const newAccessor = `          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div className="text-body-bold">{row.name}</div>
              {row.isVerified && <BadgeCheck size={16} className="text-primary" style={{ color: 'var(--color-primary)' }} />}
            </div>
            <div className="text-caption text-muted">{row.id}</div>
          </div>`;

content = content.replace(oldAccessor, newAccessor);

// 4. Fix Building2 icon color by using explicit color and class
const oldIcon = `<Building2 size={16} color="var(--text-muted)" />`;
const newIcon = `<Building2 size={16} style={{ color: 'var(--text-muted)' }} />`;
content = content.replace(oldIcon, newIcon);

// Let's also add explicit grey background to the image container so it's visible.
content = content.replace(`backgroundColor: 'var(--surface-sunken)'`, `backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)'`);

fs.writeFileSync(file, content);
