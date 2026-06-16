import React, { useState, useEffect } from 'react';
import { MetricCard } from '../../components/data-display/MetricCard';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Edit, Eye, Filter, Plus, FileSpreadsheet, MapPin, Building2, BadgeCheck, Users, UserCheck, UserX, UserPlus, Trash2 } from 'lucide-react';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { AgencyProfileCell } from '../../components/data-display/AgencyProfileCell';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const JamaahList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedJamaah, setSelectedJamaah] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

const initialJamaahList = [
  {
    "id": "jam_1",
    "code": "JAM-2026-001",
    "name": "Siti Fatimah",
    "phone": "+60176543201",
    "email": "sitifatimah@gmail.com",
    "passport": "MYP8877601",
    "agency": "Global Travel Agency",
    "status": "Active",
    "type": "Standard",
    "lastUpdated": "2026-06-11"
  },
  {
    "id": "jam_2",
    "code": "JAM-2026-002",
    "name": "Bambang Utomo",
    "phone": "+60176543202",
    "email": "bambangutomo@gmail.com",
    "passport": "MYP8877602",
    "agency": "Zamzam Travels",
    "status": "Active",
    "type": "Standard",
    "lastUpdated": "2026-06-12"
  },
  {
    "id": "jam_3",
    "code": "JAM-2026-003",
    "name": "Nurul Huda",
    "phone": "+60176543203",
    "email": "nurulhuda@gmail.com",
    "passport": "MYP8877603",
    "agency": "Global Travel Agency",
    "status": "Inactive",
    "type": "VIP",
    "lastUpdated": "2026-06-13"
  },
  {
    "id": "jam_4",
    "code": "JAM-2026-004",
    "name": "Zulkifli Ahmad",
    "phone": "+60176543204",
    "email": "zulkifliahmad@gmail.com",
    "passport": "MYP8877604",
    "agency": "Zamzam Travels",
    "status": "Active",
    "type": "Premium",
    "lastUpdated": "2026-06-14"
  },
  {
    "id": "jam_5",
    "code": "JAM-2026-005",
    "name": "Dewi Lestari",
    "phone": "+60176543205",
    "email": "dewilestari@gmail.com",
    "passport": "MYP8877605",
    "agency": "Global Travel Agency",
    "status": "Active",
    "type": "Standard",
    "lastUpdated": "2026-06-15"
  },
  {
    "id": "jam_6",
    "code": "JAM-2026-006",
    "name": "Joko Widodo",
    "phone": "+60176543206",
    "email": "jokowidodo@gmail.com",
    "passport": "MYP8877606",
    "agency": "Zamzam Travels",
    "status": "Inactive",
    "type": "VIP",
    "lastUpdated": "2026-06-16"
  },
  {
    "id": "jam_7",
    "code": "JAM-2026-007",
    "name": "Fatimah Zahra",
    "phone": "+60176543207",
    "email": "fatimahzahra@gmail.com",
    "passport": "MYP8877607",
    "agency": "Global Travel Agency",
    "status": "Active",
    "type": "Standard",
    "lastUpdated": "2026-06-17"
  },
  {
    "id": "jam_8",
    "code": "JAM-2026-008",
    "name": "Hendra Wijaya",
    "phone": "+60176543208",
    "email": "hendrawijaya@gmail.com",
    "passport": "MYP8877608",
    "agency": "Zamzam Travels",
    "status": "Active",
    "type": "Premium",
    "lastUpdated": "2026-06-18"
  },
  {
    "id": "jam_9",
    "code": "JAM-2026-009",
    "name": "Mega Rahayu",
    "phone": "+60176543209",
    "email": "megarahayu@gmail.com",
    "passport": "MYP8877609",
    "agency": "Global Travel Agency",
    "status": "Inactive",
    "type": "VIP",
    "lastUpdated": "2026-06-19"
  },
  {
    "id": "jam_10",
    "code": "JAM-2026-010",
    "name": "Adi Wibowo",
    "phone": "+60176543210",
    "email": "adiwibowo@gmail.com",
    "passport": "MYP8877610",
    "agency": "Zamzam Travels",
    "status": "Active",
    "type": "Standard",
    "lastUpdated": "2026-06-20"
  },
  {
    "id": "jam_11",
    "code": "JAM-2026-011",
    "name": "Kartika Sari",
    "phone": "+60176543211",
    "email": "kartikasari@gmail.com",
    "passport": "MYP8877611",
    "agency": "Global Travel Agency",
    "status": "Active",
    "type": "Standard",
    "lastUpdated": "2026-06-21"
  },
  {
    "id": "jam_12",
    "code": "JAM-2026-012",
    "name": "Rahmat Hidayat",
    "phone": "+60176543212",
    "email": "rahmathidayat@gmail.com",
    "passport": "MYP8877612",
    "agency": "Zamzam Travels",
    "status": "Inactive",
    "type": "VIP",
    "lastUpdated": "2026-06-22"
  },
  {
    "id": "jam_13",
    "code": "JAM-2026-013",
    "name": "Indah Permata",
    "phone": "+60176543213",
    "email": "indahpermata@gmail.com",
    "passport": "MYP8877613",
    "agency": "Global Travel Agency",
    "status": "Active",
    "type": "Standard",
    "lastUpdated": "2026-06-23"
  },
  {
    "id": "jam_14",
    "code": "JAM-2026-014",
    "name": "Yusof Ishak",
    "phone": "+60176543214",
    "email": "yusofishak@gmail.com",
    "passport": "MYP8877614",
    "agency": "Zamzam Travels",
    "status": "Active",
    "type": "Standard",
    "lastUpdated": "2026-06-24"
  },
  {
    "id": "jam_15",
    "code": "JAM-2026-015",
    "name": "Rina Marlina",
    "phone": "+60176543215",
    "email": "rinamarlina@gmail.com",
    "passport": "MYP8877615",
    "agency": "Global Travel Agency",
    "status": "Inactive",
    "type": "VIP",
    "lastUpdated": "2026-06-25"
  },
  {
    "id": "jam_16",
    "code": "JAM-2026-016",
    "name": "Anwar Ibrahim",
    "phone": "+60176543216",
    "email": "anwaribrahim@gmail.com",
    "passport": "MYP8877616",
    "agency": "Zamzam Travels",
    "status": "Active",
    "type": "Premium",
    "lastUpdated": "2026-06-26"
  },
  {
    "id": "jam_17",
    "code": "JAM-2026-017",
    "name": "Halimah Yacob",
    "phone": "+60176543217",
    "email": "halimahyacob@gmail.com",
    "passport": "MYP8877617",
    "agency": "Global Travel Agency",
    "status": "Active",
    "type": "Standard",
    "lastUpdated": "2026-06-27"
  },
  {
    "id": "jam_18",
    "code": "JAM-2026-018",
    "name": "Ahmad Fauzi",
    "phone": "+60176543218",
    "email": "ahmadfauzi@gmail.com",
    "passport": "MYP8877618",
    "agency": "Zamzam Travels",
    "status": "Inactive",
    "type": "VIP",
    "lastUpdated": "2026-06-28"
  }
];

  const { data: jamaahList, remove, removeMany } = useLocalStorageCrud('jamaah', initialJamaahList);
  const columns = [
    { header: 'Jamaah ID', accessor: 'code' as const, sortable: true },
    { 
      header: 'Jamaah Profile', 
      accessor: (row: typeof jamaahList[0]) => (
        <UserProfileCell 
          name={row.name} 
          email={row.email} 
        />
      )
    },
    { header: 'Passport', accessor: 'passport' as const, sortable: true },
    { 
      header: 'Travel Agency', 
      accessor: (row: typeof jamaahList[0]) => {
        const logo = row.agency === 'Zamzam Travels' ? 'https://picsum.photos/seed/452/150/150' : null;
        const isVerified = ['Ansar Medina', 'Salam Travel', 'Kauthar Travel', 'Global Travel Agency'].includes(row.agency);
        return (
          <AgencyProfileCell 
            name={row.agency} 
            logo={logo} 
            isVerified={isVerified} 
          />
        );
      }
    },
    { header: 'Phone', accessor: 'phone' as const },
    { 
      header: 'Status', 
      accessor: (row: typeof jamaahList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Active') variant = 'success';
        if (row.status === 'Inactive') variant = 'neutral';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    { header: 'Last Updated', accessor: 'lastUpdated' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: typeof jamaahList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('jamaah-details', { id: row.id }) },
            { id: 'edit', label: 'Edit', icon: <Edit size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, danger: true, onClick: () => { if(window.confirm('Are you sure?')) remove(row.id) } }
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'sort',
      label: 'Sort By',
      options: [
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'name_asc', label: 'Name A-Z' },
        { value: 'name_desc', label: 'Name Z-A' },
      ]
    },
    {
      id: 'agency',
      label: 'Travel Agency',
      options: [
        { value: 'zamzam', label: 'Zamzam Travels' },
        { value: 'makkah', label: 'Makkah Tours' },
        { value: 'safir', label: 'Safir Travel' },
      ]
    },
    {
      id: 'package',
      label: 'Package',
      options: [
        { value: 'umrah_premium', label: 'Umrah Premium' },
        { value: 'hajj_plus', label: 'Hajj Plus' },
      ]
    },
    {
      id: 'trip',
      label: 'Group Trip',
      options: [
        { value: 'trp1001', label: 'TRP-1001 (Dec)' },
        { value: 'trp1002', label: 'TRP-1002 (Jan)' },
      ]
    },
    {
      id: 'status',
      label: 'Jamaah Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'pending_doc', label: 'Pending Document' },
        { value: 'ready', label: 'Ready for Departure' },
        { value: 'departed', label: 'Departed' },
      ]
    },
    {
      id: 'invitation',
      label: 'Invitation Status',
      options: [
        { value: 'not_sent', label: 'Not Sent' },
        { value: 'pending', label: 'Pending' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'expired', label: 'Expired' },
      ]
    },
    {
      id: 'country',
      label: 'Country',
      options: [
        { value: 'id', label: 'Indonesia' },
        { value: 'my', label: 'Malaysia' },
        { value: 'sg', label: 'Singapore' },
      ]
    },
    {
      id: 'gender',
      label: 'Gender',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ]
    },
    {
      id: 'payment',
      label: 'Payment Status',
      options: [
        { value: 'paid', label: 'Paid' },
        { value: 'partial', label: 'Partial Paid' },
        { value: 'unpaid', label: 'Unpaid' },
      ]
    },
    {
      id: 'doc_status',
      label: 'Document Status',
      options: [
        { value: 'verified', label: 'Verified' },
        { value: 'pending', label: 'Pending Verification' },
        { value: 'incomplete', label: 'Incomplete' },
      ]
    },
    {
      id: 'date',
      label: 'Date Created',
      options: [
        { value: 'today', label: 'Today' },
        { value: 'this_week', label: 'This Week' },
        { value: 'this_month', label: 'This Month' },
      ]
    }
  ];
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData,
    totalItems,
    currentPage,
    totalPages,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    sortKey,
    sortOrder,
    onSort
  } = useDataFilter(jamaahList, {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

  const totalJamaah = jamaahList.length;
  const activeJamaah = jamaahList.filter(j => j.status === 'Active').length;
  const inactiveJamaah = jamaahList.filter(j => j.status === 'Inactive').length;
  const newThisMonth = Math.floor(totalJamaah * 0.15);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Jamaah Management"
        breadcrumbs={[{ label: 'Home' }, { label: 'Jamaah List' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <ExportControl data={filteredData} filename="jamaah" />
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('jamaah-add')}>
            Add Jamaah
          </Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Jamaah" value={totalJamaah} trend="up" trendValue="+12%" icon={<Users />} />
        <MetricCard title="Active Jamaah" value={activeJamaah} trend="up" trendValue="+5%" icon={<UserCheck />} iconBg="var(--color-success-light)" accentColor="var(--color-success)" />
        <MetricCard title="Inactive Jamaah" value={inactiveJamaah} trend="down" trendValue="-2%" icon={<UserX />} iconBg="var(--color-danger-light)" accentColor="var(--color-danger)" />
        <MetricCard title="New This Month" value={newThisMonth} trend="up" trendValue="+8%" icon={<UserPlus />} iconBg="var(--color-warning-light)" accentColor="var(--color-warning)" />
      </div>

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by name, email, phone, or passport..."
      />

      {selectedJamaah.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedJamaah.length} jamaah selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={() => console.log('Export')}>Export Selected</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Assign')}>Assign to Group Trip</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Send Invite')}>Send Invitations</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Resend Invite')}>Resend Invitations</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Change Status')}>Change Status</Button>
          </div>
        </div>
      )}

      <DataTable
        onRowClick={(row: any) => navigate('jamaah-details', { id: row.id })} 
        data={filteredData}
          sort={{
            key: sortKey,
            order: sortOrder,
            onSort
          }}
          pagination={{
            currentPage,
            totalPages,
            rowsPerPage,
            totalItems,
            onPageChange,
            onRowsPerPageChange
          }}
        columns={columns}
        keyExtractor={(r) => r.id}
        isLoading={isLoading}
        selectedKeys={selectedJamaah}
        onSelectionChange={setSelectedJamaah}
        emptyStateTitle="No jamaah found"
        emptyStateDescription="Try adjusting your search or filters."
      />
    </div>
  );
};
