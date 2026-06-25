import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { MetricCard } from '../../components/data-display/MetricCard';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Users, Download, Link as LinkIcon, Star, Plane, FileText, Eye, Edit, Trash2, ChevronRight, Navigation, CheckCircle2 } from 'lucide-react';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { AgencyProfileCell } from '../../components/data-display/AgencyProfileCell';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const GroupTripList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedTrips, setSelectedTrips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

const initialTripList = [
  {
    "id": "trp_1",
    "code": "TRP-1001",
    "name": "Umrah Group Flight Batch 1",
    "package": "Standard Umrah Ramadhan",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Global Travel Agency",
    "mutawwif": "Ustaz Don Daniyal",
    "dates": "11 Nov - 21 Nov 2026",
    "seats": 45,
    "booked": 22,
    "status": "Active"
  },
  {
    "id": "trp_2",
    "code": "TRP-1002",
    "name": "Umrah Group Flight Batch 2",
    "package": "VIP Hajj Package",
    "type": "Hajj",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Kazim Elias",
    "dates": "12 Nov - 22 Nov 2026",
    "seats": 45,
    "booked": 24,
    "status": "Active"
  },
  {
    "id": "trp_3",
    "code": "TRP-1003",
    "name": "Umrah Group Flight Batch 3",
    "package": "Economy Umrah Safar",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Global Travel Agency",
    "mutawwif": "Ustaz Abdul Somad",
    "dates": "13 Nov - 23 Nov 2026",
    "seats": 45,
    "booked": 26,
    "status": "Active"
  },
  {
    "id": "trp_4",
    "code": "TRP-1004",
    "name": "Umrah Group Flight Batch 4",
    "package": "Premium Umrah Dec 2026",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Azhar Idrus",
    "dates": "14 Nov - 24 Nov 2026",
    "seats": 45,
    "booked": 28,
    "status": "Completed"
  },
  {
    "id": "trp_5",
    "code": "TRP-1005",
    "name": "Umrah Group Flight Batch 5",
    "package": "Standard Umrah Ramadhan",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Global Travel Agency",
    "mutawwif": "Ustaz Don Daniyal",
    "dates": "15 Nov - 25 Nov 2026",
    "seats": 45,
    "booked": 30,
    "status": "Draft"
  },
  {
    "id": "trp_6",
    "code": "TRP-1006",
    "name": "Umrah Group Flight Batch 6",
    "package": "VIP Hajj Package",
    "type": "Hajj",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Kazim Elias",
    "dates": "16 Nov - 26 Nov 2026",
    "seats": 45,
    "booked": 32,
    "status": "Active"
  },
  {
    "id": "trp_7",
    "code": "TRP-1007",
    "name": "Umrah Group Flight Batch 7",
    "package": "Economy Umrah Safar",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Global Travel Agency",
    "mutawwif": "Ustaz Abdul Somad",
    "dates": "17 Nov - 27 Nov 2026",
    "seats": 45,
    "booked": 34,
    "status": "Active"
  },
  {
    "id": "trp_8",
    "code": "TRP-1008",
    "name": "Umrah Group Flight Batch 8",
    "package": "Premium Umrah Dec 2026",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Azhar Idrus",
    "dates": "18 Nov - 28 Nov 2026",
    "seats": 45,
    "booked": 36,
    "status": "Completed"
  },
  {
    "id": "trp_9",
    "code": "TRP-1009",
    "name": "Umrah Group Flight Batch 9",
    "package": "Standard Umrah Ramadhan",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Global Travel Agency",
    "mutawwif": "Ustaz Don Daniyal",
    "dates": "19 Nov - 29 Nov 2026",
    "seats": 45,
    "booked": 38,
    "status": "Active"
  },
  {
    "id": "trp_10",
    "code": "TRP-1010",
    "name": "Umrah Group Flight Batch 10",
    "package": "VIP Hajj Package",
    "type": "Hajj",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Kazim Elias",
    "dates": "20 Nov - 30 Nov 2026",
    "seats": 45,
    "booked": 40,
    "status": "Draft"
  },
  {
    "id": "trp_11",
    "code": "TRP-1011",
    "name": "Umrah Group Flight Batch 11",
    "package": "Economy Umrah Safar",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Global Travel Agency",
    "mutawwif": "Ustaz Abdul Somad",
    "dates": "21 Nov - 31 Nov 2026",
    "seats": 45,
    "booked": 42,
    "status": "Active"
  },
  {
    "id": "trp_12",
    "code": "TRP-1012",
    "name": "Umrah Group Flight Batch 12",
    "package": "Premium Umrah Dec 2026",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Azhar Idrus",
    "dates": "22 Nov - 32 Nov 2026",
    "seats": 45,
    "booked": 44,
    "status": "Completed"
  },
  {
    "id": "trp_13",
    "code": "TRP-1013",
    "name": "Umrah Group Flight Batch 13",
    "package": "Standard Umrah Ramadhan",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Global Travel Agency",
    "mutawwif": "Ustaz Don Daniyal",
    "dates": "23 Nov - 33 Nov 2026",
    "seats": 45,
    "booked": 21,
    "status": "Active"
  },
  {
    "id": "trp_14",
    "code": "TRP-1014",
    "name": "Umrah Group Flight Batch 14",
    "package": "VIP Hajj Package",
    "type": "Hajj",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Kazim Elias",
    "dates": "24 Nov - 34 Nov 2026",
    "seats": 45,
    "booked": 23,
    "status": "Active"
  },
  {
    "id": "trp_15",
    "code": "TRP-1015",
    "name": "Umrah Group Flight Batch 15",
    "package": "Economy Umrah Safar",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Global Travel Agency",
    "mutawwif": "Ustaz Abdul Somad",
    "dates": "25 Nov - 35 Nov 2026",
    "seats": 45,
    "booked": 25,
    "status": "Draft"
  },
  {
    "id": "trp_16",
    "code": "TRP-1016",
    "name": "Umrah Group Flight Batch 16",
    "package": "Premium Umrah Dec 2026",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Azhar Idrus",
    "dates": "26 Nov - 36 Nov 2026",
    "seats": 45,
    "booked": 27,
    "status": "Completed"
  },
  {
    "id": "trp_17",
    "code": "TRP-1017",
    "name": "Umrah Group Flight Batch 17",
    "package": "Standard Umrah Ramadhan",
    "type": "Umrah",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Global Travel Agency",
    "mutawwif": "Ustaz Don Daniyal",
    "dates": "27 Nov - 37 Nov 2026",
    "seats": 45,
    "booked": 29,
    "status": "Active"
  },
  {
    "id": "trp_18",
    "code": "TRP-1018",
    "name": "Umrah Group Flight Batch 18",
    "package": "VIP Hajj Package",
    "type": "Hajj",
    "packageImage": "https://picsum.photos/seed/pkg1/150/150",
    "agency": "Zamzam Travels",
    "mutawwif": "Ustaz Kazim Elias",
    "dates": "28 Nov - 38 Nov 2026",
    "seats": 45,
    "booked": 31,
    "status": "Active"
  }
];

  const { data: tripList, remove } = useLocalStorageCrud('group-trip-v2', initialTripList);

  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData,
    sortKey,
    sortOrder,
    onSort,
    currentPage,
    totalPages,
    rowsPerPage,
    totalItems,
    onPageChange,
    onRowsPerPageChange
  } = useDataFilter(tripList, {
    searchKeys: ['name', 'code', 'agency', 'mutawwif']
  });

  const columns = [
    { header: 'Trip ID', accessor: 'code' as const, sortable: true },
    { 
      header: 'Trip Name', 
      accessor: (row: typeof tripList[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.name}</span>
          <span className="text-caption text-muted">{row.dates}</span>
        </div>
      )
    },
    { 
      header: 'Package', 
      accessor: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <img src={row.packageImage} alt={row.package} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-1)' }}>
            <span className="text-body-bold">{row.package}</span>
            <Badge variant={getCategoryBadgeVariant(row.type)}>{row.type}</Badge>
          </div>
        </div>
      )
    },
    { 
      header: 'Travel Agency', 
      accessor: (row: typeof tripList[0]) => {
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
    { 
      header: 'Mutawwif', 
      accessor: (row: typeof tripList[0]) => (
        <UserProfileCell 
          name={row.mutawwif} 
          isVerified={true} 
        />
      )
    },
    { 
      header: 'Member Count', 
      accessor: (row: typeof tripList[0]) => (
        <span>{row.booked} / {row.seats}</span>
      )
    },
    { 
      header: 'Status', 
      accessor: (row: typeof tripList[0]) => (
        <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>
      )
    },
    {
      header: 'Actions',
      accessor: (row: typeof tripList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('group-trip-details', { id: row.id }) },
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
      id: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'departed', label: 'Departed' },
        { value: 'pending', label: 'Pending Approval' },
        { value: 'completed', label: 'Completed' },
      ]
    },
    {
      id: 'agency',
      label: 'Travel Agency',
      options: [
        { value: 'zamzam', label: 'Zamzam Travels' },
        { value: 'global', label: 'Global Travel' },
      ]
    },
    {
      id: 'mutawwif',
      label: 'Mutawwif',
      options: [
        { value: 'ahmad', label: 'Ustaz Ahmad' },
        { value: 'karim', label: 'Ustaz Karim' },
        { value: 'unassigned', label: 'Unassigned' },
      ]
    },
    {
      id: 'schedule',
      label: 'Schedule',
      options: [
        { value: 'this_month', label: 'This Month' },
        { value: 'next_month', label: 'Next Month' },
        { value: 'this_year', label: 'This Year' },
      ]
    },
    {
      id: 'airport',
      label: 'Airport',
      options: [
        { value: 'kul', label: 'KUL (Departure)' },
        { value: 'jed', label: 'JED (Arrival)' },
        { value: 'med', label: 'MED (Arrival)' },
      ]
    },
    {
      id: 'hotel',
      label: 'Hotel',
      options: [
        { value: 'makkah', label: 'Makkah Hotel' },
        { value: 'madinah', label: 'Madinah Hotel' },
      ]
    },
    {
      id: 'type',
      label: 'Trip Type',
      options: [
        { value: 'umrah', label: 'Umrah' },
        { value: 'hajj', label: 'Hajj' },
        { value: 'custom', label: 'Custom' },
      ]
    },
    {
      id: 'source',
      label: 'Creation Source',
      options: [
        { value: 'package', label: 'From Package' },
        { value: 'admin', label: 'Admin Manual' },
        { value: 'agency', label: 'Agency Manual' },
      ]
    },
    {
      id: 'docStatus',
      label: 'Document Status',
      options: [
        { value: 'complete', label: 'Complete' },
        { value: 'pending', label: 'Pending' },
        { value: 'issue', label: 'Issue' },
      ]
    },
    {
      id: 'svcStatus',
      label: 'Service Status',
      options: [
        { value: 'complete', label: 'Complete' },
        { value: 'pending', label: 'Pending' },
        { value: 'issue', label: 'Issue' },
      ]
    }
  ];
return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Group Trip Operations"
        breadcrumbs={[{ label: 'Home' }, { label: 'Group Trips' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export List</Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('group-trip-create')}>Create Group Trip</Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Group Trips" 
          value={tripList.length.toString()} 
          trend="up" 
          trendValue="+3" 
          icon={<Plane />} 
          iconBg="var(--color-primary-light)" 
          accentColor="var(--color-primary)" 
        />
        <MetricCard 
          title="Active Trips" 
          value={tripList.filter(t => t.status === 'Active').length.toString()} 
          trend="up" 
          trendValue="+1" 
          icon={<Navigation />} 
          iconBg="var(--color-warning-light)" 
          accentColor="var(--color-warning)" 
        />
        <MetricCard 
          title="Completed Trips" 
          value={tripList.filter(t => t.status === 'Completed').length.toString()} 
          trend="neutral" 
          trendValue="0" 
          icon={<CheckCircle2 />} 
          iconBg="var(--color-success-light)" 
          accentColor="var(--color-success)" 
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
        searchPlaceholder="Search by trip name, code, agency, or mutawwif..."
      />

      {selectedTrips.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedTrips.length} trips selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={() => console.log('Export')}>Export Selected to PDF</Button>
          </div>
        </div>
      )}

      <DataTable
        onRowClick={(row: any) => navigate('group-trip-details', { id: row.id })} 
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
        selectedKeys={selectedTrips}
        onSelectionChange={setSelectedTrips}
        emptyStateTitle="No group trips found"
      />
    </div>
  );
};
