const fs = require('fs');
const file = '/Users/user/Documents/UH/src/pages/group-trip/GroupTripList.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/("package": ".*?"),\n(\s*"agency")/g, (match, p1, p2) => {
  const isHajj = p1.includes('Hajj');
  const type = isHajj ? 'Hajj' : 'Umrah';
  return `${p1},\n    "type": "${type}",\n    "packageImage": "https://picsum.photos/seed/pkg1/150/150",\n${p2}`;
});

content = content.replace(/"status": "Upcoming"/g, '"status": "Active"');

content = content.replace(/{ header: 'Package', accessor: 'package' as const, sortable: true },/g, `{ 
      header: 'Package', 
      accessor: (row: typeof tripList[0]) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <img src={row.packageImage} alt={row.package} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="text-body-bold">{row.package}</span>
            <span className="text-caption text-muted">{row.type}</span>
          </div>
        </div>
      )
    },`);

content = content.replace(/header: 'Seats \(Booked\/Total\)'/g, "header: 'Member Count'");
content = content.replace(/value=\{tripList\.filter\(t => t\.status === 'Upcoming'\)\.length\.toString\(\)\}/g, "value={tripList.filter(t => t.status === 'Active').length.toString()}");
content = content.replace(/title="Upcoming Trips"/g, 'title="Active Trips"');
content = content.replace(/if \(row\.status === 'Upcoming'\) variant = 'warning';/g, "if (row.status === 'Active') variant = 'success';");
content = content.replace(/if \(row\.status === 'Completed'\) variant = 'success';/g, "if (row.status === 'Completed') variant = 'neutral';");

fs.writeFileSync(file, content);
console.log('GroupTripList updated successfully');
