import React, { useState, useEffect } from 'react';
import { MetricCard } from '../../components/data-display/MetricCard';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Star, Eye, Edit, Trash2, ChevronRight, Users, UserCheck, ShieldCheck } from 'lucide-react';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const MutawwifList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedMutawwif, setSelectedMutawwif] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

const initialMutawwifList = [
  {
    "id": "mut_1",
    "name": "Ustaz Don Daniyal (Batch 1)",
    "phone": "+60199887701",
    "email": "ustaz.don@umrahhaji.com",
    "rating": 4.1,
    "tripsCount": 7,
    "status": "Active",
    "lastUpdated": "2026-06-11",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_2",
    "name": "Ustaz Kazim Elias (Batch 1)",
    "phone": "+60199887702",
    "email": "ustaz.kazim@umrahhaji.com",
    "rating": 4.2,
    "tripsCount": 9,
    "status": "Active",
    "lastUpdated": "2026-06-12",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_3",
    "name": "Ustaz Abdul Somad (Batch 2)",
    "phone": "+60199887703",
    "email": "ustaz.abdul@umrahhaji.com",
    "rating": 4.3,
    "tripsCount": 11,
    "status": "Active",
    "lastUpdated": "2026-06-13",
    "languages": [
      "Malay",
      "Arabic",
      "English"
    ]
  },
  {
    "id": "mut_4",
    "name": "Ustaz Adi Hidayat (Batch 2)",
    "phone": "+60199887704",
    "email": "ustaz.adi@umrahhaji.com",
    "rating": 4.4,
    "tripsCount": 13,
    "status": "Active",
    "lastUpdated": "2026-06-14",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_5",
    "name": "Ustaz Hanan Attaki (Batch 2)",
    "phone": "+60199887705",
    "email": "ustaz.hanan@umrahhaji.com",
    "rating": 4.5,
    "tripsCount": 15,
    "status": "On Leave",
    "lastUpdated": "2026-06-15",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_6",
    "name": "Ustaz Ebit Lew (Batch 3)",
    "phone": "+60199887706",
    "email": "ustaz.ebit@umrahhaji.com",
    "rating": 4.6,
    "tripsCount": 17,
    "status": "Inactive",
    "lastUpdated": "2026-06-16",
    "languages": [
      "Malay",
      "Arabic",
      "English"
    ]
  },
  {
    "id": "mut_7",
    "name": "Ustaz Badli Shah (Batch 3)",
    "phone": "+60199887707",
    "email": "ustaz.badli@umrahhaji.com",
    "rating": 4.7,
    "tripsCount": 19,
    "status": "Active",
    "lastUpdated": "2026-06-17",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_8",
    "name": "Ustaz Syamsul Debat (Batch 3)",
    "phone": "+60199887708",
    "email": "ustaz.syamsul@umrahhaji.com",
    "rating": 4.8,
    "tripsCount": 21,
    "status": "Active",
    "lastUpdated": "2026-06-18",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_9",
    "name": "Ustaz Harryanto Rizal (Batch 4)",
    "phone": "+60199887709",
    "email": "ustaz.harryanto@umrahhaji.com",
    "rating": 4.9,
    "tripsCount": 23,
    "status": "Active",
    "lastUpdated": "2026-06-19",
    "languages": [
      "Malay",
      "Arabic",
      "English"
    ]
  },
  {
    "id": "mut_10",
    "name": "Ustaz Fawwaz Jan (Batch 4)",
    "phone": "+60199887710",
    "email": "ustaz.fawwaz@umrahhaji.com",
    "rating": 5,
    "tripsCount": 25,
    "status": "On Leave",
    "lastUpdated": "2026-06-20",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_11",
    "name": "Ustaz Riza Kamaruddin (Batch 4)",
    "phone": "+60199887711",
    "email": "ustaz.riza@umrahhaji.com",
    "rating": 4,
    "tripsCount": 27,
    "status": "Active",
    "lastUpdated": "2026-06-21",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_12",
    "name": "Ustaz Azhar Idrus (Batch 5)",
    "phone": "+60199887712",
    "email": "ustaz.azhar@umrahhaji.com",
    "rating": 4.1,
    "tripsCount": 29,
    "status": "Inactive",
    "lastUpdated": "2026-06-22",
    "languages": [
      "Malay",
      "Arabic",
      "English"
    ]
  },
  {
    "id": "mut_13",
    "name": "Ustaz Don Daniyal (Batch 5)",
    "phone": "+60199887713",
    "email": "ustaz.don@umrahhaji.com",
    "rating": 4.2,
    "tripsCount": 31,
    "status": "Active",
    "lastUpdated": "2026-06-23",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_14",
    "name": "Ustaz Kazim Elias (Batch 5)",
    "phone": "+60199887714",
    "email": "ustaz.kazim@umrahhaji.com",
    "rating": 4.3,
    "tripsCount": 33,
    "status": "Active",
    "lastUpdated": "2026-06-24",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_15",
    "name": "Ustaz Abdul Somad (Batch 6)",
    "phone": "+60199887715",
    "email": "ustaz.abdul@umrahhaji.com",
    "rating": 4.4,
    "tripsCount": 35,
    "status": "On Leave",
    "lastUpdated": "2026-06-25",
    "languages": [
      "Malay",
      "Arabic",
      "English"
    ]
  },
  {
    "id": "mut_16",
    "name": "Ustaz Adi Hidayat (Batch 6)",
    "phone": "+60199887716",
    "email": "ustaz.adi@umrahhaji.com",
    "rating": 4.5,
    "tripsCount": 37,
    "status": "Active",
    "lastUpdated": "2026-06-26",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_17",
    "name": "Ustaz Hanan Attaki (Batch 6)",
    "phone": "+60199887717",
    "email": "ustaz.hanan@umrahhaji.com",
    "rating": 4.6,
    "tripsCount": 39,
    "status": "Active",
    "lastUpdated": "2026-06-27",
    "languages": [
      "Malay",
      "Arabic"
    ]
  },
  {
    "id": "mut_18",
    "name": "Ustaz Ebit Lew (Batch 7)",
    "phone": "+60199887718",
    "email": "ustaz.ebit@umrahhaji.com",
    "rating": 4.7,
    "tripsCount": 41,
    "status": "Inactive",
    "lastUpdated": "2026-06-28",
    "languages": [
      "Malay",
      "Arabic",
      "English"
    ]
  }
];

  const { data: mutawwifList, remove } = useLocalStorageCrud('mutawwif', initialMutawwifList);
  const columns = [
    { header: 'Mutawwif ID', accessor: 'id' as const, sortable: true },
    { 
      header: 'Mutawwif Profile', 
      accessor: (row: typeof mutawwifList[0]) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=random&color=fff&size=40`} 
            alt={row.name} 
            style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="text-body-bold">{row.name}</span>
            <span className="text-caption text-muted">{row.email}</span>
          </div>
        </div>
      )
    },
    { header: 'Phone', accessor: 'phone' as const },
    { 
      header: 'Rating', 
      accessor: (row: typeof mutawwifList[0]) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Star size={14} fill="var(--color-warning)" stroke="var(--color-warning)" />
          {row.rating.toFixed(1)}
        </span>
      ),
      sortable: true
    },
    { header: 'Trips', accessor: 'tripsCount' as const, sortable: true },
    { 
      header: 'Status', 
      accessor: (row: typeof mutawwifList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Active') variant = 'success';
        if (row.status === 'On Leave') variant = 'warning';
        if (row.status === 'Inactive') variant = 'neutral';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    { header: 'Last Updated', accessor: 'lastUpdated' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: typeof mutawwifList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('mutawwif-details', { id: row.id }) },
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
        { value: 'highest_rated', label: 'Highest Rated' },
      ]
    },
    {
      id: 'status',
      label: 'Account Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'draft', label: 'Draft' },
      ]
    },
    {
      id: 'verification',
      label: 'Verification Status',
      options: [
        { value: 'verified', label: 'Verified' },
        { value: 'pending', label: 'Pending Verification' },
        { value: 'draft', label: 'Draft' },
      ]
    },
    {
      id: 'availability',
      label: 'Availability',
      options: [
        { value: 'available', label: 'Available' },
        { value: 'assigned', label: 'Assigned' },
        { value: 'leave', label: 'On Leave' },
      ]
    },
    {
      id: 'jobType',
      label: 'Job Type',
      options: [
        { value: 'full_time', label: 'Full Time' },
        { value: 'freelance', label: 'Freelance' },
        { value: 'seasonal', label: 'Seasonal' },
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
      id: 'country',
      label: 'Country',
      options: [
        { value: 'sa', label: 'Saudi Arabia' },
        { value: 'id', label: 'Indonesia' },
        { value: 'my', label: 'Malaysia' },
      ]
    },
    {
      id: 'language',
      label: 'Language',
      options: [
        { value: 'ar', label: 'Arabic' },
        { value: 'id', label: 'Indonesian' },
        { value: 'en', label: 'English' },
        { value: 'ur', label: 'Urdu' },
      ]
    },
    {
      id: 'specialization',
      label: 'Specialization',
      options: [
        { value: 'umrah', label: 'Umrah' },
        { value: 'hajj', label: 'Hajj' },
        { value: 'ziarah', label: 'Ziarah' },
        { value: 'elderly', label: 'Elderly Support' },
      ]
    },
    {
      id: 'agency',
      label: 'Travel Agency',
      options: [
        { value: 'zamzam', label: 'Zamzam Travels' },
        { value: 'makkah', label: 'Makkah Tours' },
      ]
    },
    {
      id: 'dateCreated',
      label: 'Date Created',
      options: [
        { value: 'today', label: 'Today' },
        { value: 'this_week', label: 'This Week' },
        { value: 'this_month', label: 'This Month' },
        { value: 'this_year', label: 'This Year' },
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
  } = useDataFilter(mutawwifList, {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

  const totalMutawwif = mutawwifList.length;
  const activeMutawwif = mutawwifList.filter(m => m.status === 'Active').length;
  const topRated = mutawwifList.filter(m => m.rating >= 4.8).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Mutawwif Management"
        breadcrumbs={[{ label: 'Home' }, { label: 'Mutawwif List' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <ExportControl onExport={(f) => console.log(f)} />
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('mutawwif-add')}>
            Add Mutawwif
          </Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Mutawwif" value={totalMutawwif} trend="up" trendValue="+4%" icon={<Users />} />
        <MetricCard title="Active Mutawwif" value={activeMutawwif} trend="up" trendValue="+2%" icon={<UserCheck />} iconBg="var(--color-success-light)" accentColor="var(--color-success)" />
        <MetricCard title="Top Rated (4.8+)" value={topRated} icon={<Star />} iconBg="var(--color-warning-light)" accentColor="var(--color-warning)" />
        <MetricCard title="Certified" value="85%" icon={<ShieldCheck />} iconBg="var(--color-primary-light)" accentColor="var(--color-primary)" />
      </div>

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by name, email, phone, or language..."
      />

      {selectedMutawwif.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedMutawwif.length} mutawwif selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={() => console.log('Export')}>Export Selected</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Assign')}>Assign to Agency</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Send Invite')}>Send Invitations</Button>
          </div>
        </div>
      )}

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
        keyExtractor={(r) => r.id}
        isLoading={isLoading}
        selectedKeys={selectedMutawwif}
        onSelectionChange={setSelectedMutawwif}
        emptyStateTitle="No mutawwif found"
        emptyStateDescription="Try adjusting your search or filters."
      />
    </div>
  );
};
