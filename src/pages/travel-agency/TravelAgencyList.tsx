import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { AgencyProfileCell } from '../../components/data-display/AgencyProfileCell';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { DataTable } from '../../components/data-display/DataTable';
import { Plus, Building2, Eye, Edit, ChevronRight, RefreshCw, Ban, BadgeCheck, CheckCircle2, Users, Trash2 } from 'lucide-react';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';
import { Button } from '../../components/actions/Button';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';


const initialAgencies = [
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
    "logo": "https://picsum.photos/seed/663/150/150"
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
    "logo": "https://picsum.photos/seed/788/150/150"
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
    "logo": "https://picsum.photos/seed/452/150/150"
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
    "logo": "https://picsum.photos/seed/273/150/150"
  }
];

export const TravelAgencyList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { data: agencies, isLoading, remove, removeMany } = useLocalStorageCrud('travel-agencies', initialAgencies);

  const columns = [
    { 
      header: 'Travel Agency Name', 
      accessor: (row: typeof agencies[0]) => (
        <AgencyProfileCell 
          name={row.name} 
          logo={row.logo} 
          isVerified={row.isVerified} 
        />
      )
    },
    { 
      header: 'Type', 
      accessor: (row: any) => {
        const t = row.type;
        if (t === 'travel_agency') return 'Travel Agency';
        if (t === 'tour_operator') return 'Tour Operator';
        if (t === 'branch') return 'Branch Office';
        return t || '-';
      }
    },
    { 
      header: 'License Category', 
      accessor: (row: any) => {
        const c = row.licenseCategory;
        if (c === 'umrah') return 'Umrah/Ziarah';
        if (c === 'inbound') return 'Inbound';
        if (c === 'outbound') return 'Outbound';
        if (c === 'ticketing') return 'Ticketing';
        return c || '-';
      }
    },
    { 
      header: 'Status', 
      accessor: (row: any) => {
        const statusStr = row.status ? (row.status.charAt(0).toUpperCase() + row.status.slice(1).toLowerCase()) : 'Unknown';
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (statusStr === 'Active') variant = 'success';
        if (statusStr === 'Suspended') variant = 'danger';
        if (statusStr === 'Inactive') variant = 'neutral';
        return <Badge variant={variant}>{statusStr}</Badge>;
      }
    },
    { 
      header: 'PIC', 
      accessor: (row: any) => {
        const picName = row.pic || row.picName || 'Unknown';
        return (
          <UserProfileCell 
            name={picName} 
            email={`${picName.toLowerCase().replace(/\s+/g, '.')}@example.com`} 
            isVerified={row.isVerified}
          />
        );
      }
    },
    { 
      header: 'Location', 
      accessor: (row: any) => {
        const locationStr = row.location || (row.state && row.country ? `${row.state}, ${row.country === 'Malaysia' ? 'MY' : row.country === 'Indonesia' ? 'ID' : row.country === 'Saudi Arabia' ? 'SA' : row.country}` : 'Unknown');
        let flag = '📍';
        if (locationStr.endsWith('ID')) flag = '🇮🇩';
        if (locationStr.endsWith('MY')) flag = '🇲🇾';
        if (locationStr.endsWith('SA')) flag = '🇸🇦';
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: '16px' }}>{flag}</span>
            <span>{locationStr}</span>
          </div>
        );
      }
    },
    { header: 'Total Jamaah', accessor: (row: any) => row.jamaah || 0, align: 'right' as const },
    { header: 'Packages', accessor: (row: any) => row.activePackages || 0, align: 'right' as const },
    { header: 'Trips', accessor: (row: any) => row.activeTrips || 0, align: 'right' as const },
    { 
      header: 'License Expiry', 
      accessor: (row: any) => {
        if (row.expiry) return row.expiry;
        if (row.validityEnd) {
          const d = new Date(row.validityEnd);
          return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }
        return '-';
      }
    },
    { 
      header: 'Last Updated', 
      accessor: (row: any) => {
        if (row.lastUpdated) return row.lastUpdated;
        return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    },
    {
      header: 'Actions',
      accessor: (row: typeof agencies[0]) => (
        <DropdownMenu 
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('ta-details', { agencyId: row.id }) },
            { id: 'edit', label: 'Edit Agency', icon: <Edit size={16} />, onClick: () => navigate('ta-edit', { agencyId: row.id }) },
            { id: 'suspend', label: row.status === 'Suspended' ? 'Reactivate' : 'Suspend', icon: row.status === 'Suspended' ? <RefreshCw size={16} /> : <Ban size={16} />, onClick: () => console.log('Suspend') },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, onClick: () => { if(window.confirm('Are you sure?')) remove(row.id) } }
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
            <ExportControl data={filteredData} filename="travel-agencies" />
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('ta-add')}>Add Travel Agency</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Agencies" 
          value="156" 
          trend="up" 
          trendValue="+12" 
          trendLabel="vs last month"
          icon={<Building2 />} 
          iconBg="var(--color-primary-light)" 
          accentColor="var(--color-primary)"
        />
        <MetricCard 
          title="Active Agencies" 
          value="142" 
          trend="up" 
          trendValue="+8" 
          trendLabel="vs last month"
          icon={<CheckCircle2 />} 
          iconBg="var(--color-success-light)" 
          accentColor="var(--color-success)"
        />
        <MetricCard 
          title="Pending Verification" 
          value="14" 
          trend="down" 
          trendValue="-3" 
          trendLabel="vs last month"
          icon={<RefreshCw />} 
          iconBg="var(--color-warning-light)" 
          accentColor="var(--color-warning)"
        />
        <MetricCard 
          title="Total Jamaah Served" 
          value="45.2k" 
          trend="up" 
          trendValue="+18%" 
          trendLabel="vs last year"
          icon={<Users />} 
          iconBg="var(--color-info-light)" 
          accentColor="var(--color-info)"
        />
      </div>

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
        onRowClick={(row: any) => navigate('ta-details', { agencyId: row.id })} 
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
