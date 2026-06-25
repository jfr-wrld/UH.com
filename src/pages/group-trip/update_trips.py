import re

file_path = '/Users/user/Documents/UH/src/pages/group-trip/GroupTripList.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# Replace mock data
def repl(m):
    pkg_str = m.group(1)
    agency_str = m.group(2)
    trip_type = "Hajj" if "Hajj" in pkg_str else "Umrah"
    return f'{pkg_str},\n    "type": "{trip_type}",\n    "packageImage": "https://picsum.photos/seed/pkg1/150/150",\n{agency_str}'

content = re.sub(r'("package": ".*?"\s*),\n(\s*"agency")', repl, content)

# Change Upcoming to Active
content = content.replace('"status": "Upcoming"', '"status": "Active"')

# Replace column header
pkg_col_old = "{ header: 'Package', accessor: 'package' as const, sortable: true },"
pkg_col_new = """{ 
      header: 'Package', 
      accessor: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <img src={row.packageImage} alt={row.package} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="text-body-bold">{row.package}</span>
            <span className="text-caption text-muted">{row.type}</span>
          </div>
        </div>
      )
    },"""

content = content.replace(pkg_col_old, pkg_col_new)

content = content.replace("header: 'Seats (Booked/Total)'", "header: 'Member Count'")
content = content.replace("value={tripList.filter(t => t.status === 'Upcoming').length.toString()}", "value={tripList.filter(t => t.status === 'Active').length.toString()}")
content = content.replace('title="Upcoming Trips"', 'title="Active Trips"')
content = content.replace("if (row.status === 'Upcoming') variant = 'warning';", "if (row.status === 'Active') variant = 'success';")
content = content.replace("if (row.status === 'Completed') variant = 'success';", "if (row.status === 'Completed') variant = 'neutral';")

with open(file_path, 'w') as f:
    f.write(content)

print('Success')
