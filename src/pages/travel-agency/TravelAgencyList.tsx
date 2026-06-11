import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { Plus, Building2, Eye, Edit, ChevronRight, RefreshCw, Ban, BadgeCheck } from 'lucide-react';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';

export const TravelAgencyList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

  
  const agencies = [
  {
    "id": "TA-001",
    "name": "Makkah Tours",
    "type": "Travel Agency",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Active",
    "isVerified": true,
    "pic": "Siti Aminah",
    "location": "Selangor, MY",
    "jamaah": 215,
    "activePackages": 2,
    "activeTrips": 6,
    "expiry": "31 Dec 2028",
    "lastUpdated": "11 Nov 2026",
    "logo": "https://images.unsplash.com/photo-1549488344-c6aeb21a8cc6?w=150&h=150&fit=crop"
  },
  {
    "id": "TA-002",
    "name": "Safir Travel",
    "type": "Travel Agency",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Active",
    "isVerified": true,
    "pic": "Mohammad Ali",
    "location": "Johor, MY",
    "jamaah": 310,
    "activePackages": 3,
    "activeTrips": 10,
    "expiry": "31 Dec 2029",
    "lastUpdated": "12 Nov 2026",
    "logo": "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=150&h=150&fit=crop"
  },
  {
    "id": "TA-003",
    "name": "Nusantara Umrah",
    "type": "Tour Operator",
    "licenseCategory": "Ticketing",
    "status": "Active",
    "isVerified": true,
    "pic": "Budi Santoso",
    "location": "Jakarta, ID",
    "jamaah": 405,
    "activePackages": 4,
    "activeTrips": 2,
    "expiry": "31 Dec 2027",
    "lastUpdated": "13 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-004",
    "name": "Al-Haramain Tours",
    "type": "Branch Office",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Active",
    "isVerified": true,
    "pic": "Fatimah Zahra",
    "location": "Surabaya, ID",
    "jamaah": 500,
    "activePackages": 1,
    "activeTrips": 6,
    "expiry": "31 Dec 2028",
    "lastUpdated": "14 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-005",
    "name": "Darul Iman Travel",
    "type": "Travel Agency",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Suspended",
    "isVerified": false,
    "pic": "Zulkifli Harun",
    "location": "Bandung, ID",
    "jamaah": 595,
    "activePackages": 0,
    "activeTrips": 0,
    "expiry": "31 Dec 2029",
    "lastUpdated": "15 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-006",
    "name": "Barakah Travel",
    "type": "Tour Operator",
    "licenseCategory": "Ticketing",
    "status": "Inactive",
    "isVerified": false,
    "pic": "Nurul Aini",
    "location": "Medan, ID",
    "jamaah": 690,
    "activePackages": 3,
    "activeTrips": 2,
    "expiry": "31 Dec 2027",
    "lastUpdated": "16 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-007",
    "name": "Medina Express",
    "type": "Travel Agency",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Active",
    "isVerified": true,
    "pic": "Adi Wijaya",
    "location": "Penang, MY",
    "jamaah": 785,
    "activePackages": 4,
    "activeTrips": 6,
    "expiry": "31 Dec 2028",
    "lastUpdated": "17 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-008",
    "name": "Safa Marwa Tours",
    "type": "Branch Office",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Active",
    "isVerified": true,
    "pic": "Kartika Sari",
    "location": "Kedah, MY",
    "jamaah": 880,
    "activePackages": 1,
    "activeTrips": 10,
    "expiry": "31 Dec 2029",
    "lastUpdated": "18 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-009",
    "name": "Arafah Travel",
    "type": "Tour Operator",
    "licenseCategory": "Ticketing",
    "status": "Active",
    "isVerified": true,
    "pic": "Hendra Setiawan",
    "location": "Melaka, MY",
    "jamaah": 975,
    "activePackages": 2,
    "activeTrips": 2,
    "expiry": "31 Dec 2027",
    "lastUpdated": "19 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-010",
    "name": "Mina Operations",
    "type": "Travel Agency",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Suspended",
    "isVerified": false,
    "pic": "Ahmad Abdullah",
    "location": "Kuala Lumpur, MY",
    "jamaah": 1070,
    "activePackages": 0,
    "activeTrips": 0,
    "expiry": "31 Dec 2028",
    "lastUpdated": "20 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-011",
    "name": "Quba Ziyarah Co",
    "type": "Travel Agency",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Active",
    "isVerified": true,
    "pic": "Siti Aminah",
    "location": "Selangor, MY",
    "jamaah": 1165,
    "activePackages": 4,
    "activeTrips": 10,
    "expiry": "31 Dec 2029",
    "lastUpdated": "21 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-012",
    "name": "Raudhah Travel",
    "type": "Tour Operator",
    "licenseCategory": "Ticketing",
    "status": "Inactive",
    "isVerified": false,
    "pic": "Mohammad Ali",
    "location": "Johor, MY",
    "jamaah": 1260,
    "activePackages": 1,
    "activeTrips": 2,
    "expiry": "31 Dec 2027",
    "lastUpdated": "22 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-013",
    "name": "Baitullah Tours",
    "type": "Travel Agency",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Active",
    "isVerified": true,
    "pic": "Budi Santoso",
    "location": "Jakarta, ID",
    "jamaah": 1355,
    "activePackages": 2,
    "activeTrips": 6,
    "expiry": "31 Dec 2028",
    "lastUpdated": "23 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-014",
    "name": "Kauthar Travel",
    "type": "Travel Agency",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Active",
    "isVerified": true,
    "pic": "Fatimah Zahra",
    "location": "Surabaya, ID",
    "jamaah": 1450,
    "activePackages": 3,
    "activeTrips": 10,
    "expiry": "31 Dec 2029",
    "lastUpdated": "24 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-015",
    "name": "Hikmah Tours",
    "type": "Tour Operator",
    "licenseCategory": "Ticketing",
    "status": "Suspended",
    "isVerified": false,
    "pic": "Zulkifli Harun",
    "location": "Bandung, ID",
    "jamaah": 1545,
    "activePackages": 0,
    "activeTrips": 0,
    "expiry": "31 Dec 2027",
    "lastUpdated": "25 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-016",
    "name": "Salam Travel",
    "type": "Branch Office",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Active",
    "isVerified": true,
    "pic": "Nurul Aini",
    "location": "Medan, ID",
    "jamaah": 1640,
    "activePackages": 1,
    "activeTrips": 6,
    "expiry": "31 Dec 2028",
    "lastUpdated": "26 Nov 2026",
    "logo": ""
  },
  {
    "id": "TA-017",
    "name": "Ansar Medina",
    "type": "Travel Agency",
    "licenseCategory": "Umrah/Ziarah",
    "status": "Active",
    "isVerified": true,
    "pic": "Adi Wijaya",
    "location": "Penang, MY",
    "jamaah": 1735,
    "activePackages": 2,
    "activeTrips": 10,
    "expiry": "31 Dec 2029",
    "lastUpdated": "27 Nov 2026",
    "logo": "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=150&h=150&fit=crop"
  },
  {
    "id": "TA-018",
    "name": "Zamzam Travels",
    "type": "Tour Operator",
    "licenseCategory": "Ticketing",
    "status": "Inactive",
    "isVerified": false,
    "pic": "Kartika Sari",
    "location": "Kedah, MY",
    "jamaah": 1830,
    "activePackages": 3,
    "activeTrips": 2,
    "expiry": "31 Dec 2027",
    "lastUpdated": "28 Nov 2026",
    "logo": "https://images.unsplash.com/photo-1549488344-c6aeb21a8cc6?w=150&h=150&fit=crop"
  }
];

  const columns = [
    { 
      header: 'Travel Agency Name', 
      accessor: (row: typeof agencies[0]) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-full)', backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {row.logo ? (
              <img src={row.logo} alt={row.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Building2 size={16} style={{ color: 'var(--text-muted)' }} />
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div className="text-body-bold">{row.name}</div>
              {row.isVerified && <BadgeCheck size={16} className="text-primary" style={{ color: 'var(--color-primary)' }} />}
            </div>
            <div className="text-caption text-muted">{row.id}</div>
          </div>
        </div>
      )
    },
    { header: 'Type', accessor: 'type' as const },
    { header: 'License Category', accessor: 'licenseCategory' as const },
    { 
      header: 'Status', 
      accessor: (row: typeof agencies[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Active') variant = 'success';
        if (row.status === 'Suspended') variant = 'danger';
        if (row.status === 'Inactive') variant = 'neutral';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    { header: 'PIC', accessor: 'pic' as const },
    { header: 'Location', accessor: 'location' as const },
    { header: 'Total Jamaah', accessor: 'jamaah' as const, align: 'right' as const },
    { header: 'Packages', accessor: 'activePackages' as const, align: 'right' as const },
    { header: 'Trips', accessor: 'activeTrips' as const, align: 'right' as const },
    { header: 'License Expiry', accessor: 'expiry' as const },
    { header: 'Last Updated', accessor: 'lastUpdated' as const },
    {
      header: 'Actions',
      accessor: (row: typeof agencies[0]) => (
        <DropdownMenu 
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('ta-details', { agencyId: row.id }) },
            { id: 'edit', label: 'Edit Agency', icon: <Edit size={16} />, onClick: () => navigate('ta-edit', { agencyId: row.id }) },
            { id: 'suspend', label: row.status === 'Suspended' ? 'Reactivate' : 'Suspend', icon: row.status === 'Suspended' ? <RefreshCw size={16} /> : <Ban size={16} />, onClick: () => console.log('Suspend') }
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'suspended', label: 'Suspended' },
        { value: 'inactive', label: 'Inactive' },
      ]
    },
    {
      id: 'type',
      label: 'Agency Type',
      options: [
        { value: 'travel_agency', label: 'Travel Agency' },
        { value: 'tour_operator', label: 'Tour Operator' },
        { value: 'branch', label: 'Branch Office' }
      ]
    },
    {
      id: 'license',
      label: 'License Category',
      options: [
        { value: 'umrah', label: 'Umrah/Ziarah' },
        { value: 'inbound', label: 'Inbound' },
        { value: 'outbound', label: 'Outbound' },
        { value: 'ticketing', label: 'Ticketing' }
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
  } = useDataFilter(agencies, {
    defaultSort: { key: 'lastUpdated', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Travel Agency List" 
        breadcrumbs={[{ label: 'Travel Agency Management' }, { label: 'List' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <ExportControl onExport={(f) => console.log(f)} />
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('ta-add')}>Add Travel Agency</Button>
          </div>
        }
      />

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search agency name, PIC, ID, or License No..."
      />

      <DataTable 
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
        isLoading={isLoading}
        selectedKeys={selectedItems}
        onSelectionChange={setSelectedItems}
        emptyStateTitle="No Travel Agencies Found"
      />
    </div>
  );
};
