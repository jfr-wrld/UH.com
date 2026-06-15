import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { MetricCard } from '../../components/data-display/MetricCard';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Filter, FileSpreadsheet, Eye, Edit, Trash2, Copy, Send, ChevronRight, FileText, CheckCircle2, Clock } from 'lucide-react';
import { AgencyProfileCell } from '../../components/data-display/AgencyProfileCell';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';

export const ItineraryList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedItinerary, setSelectedItinerary] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

  // Mock Data
  const itineraryList = [
  {
    "id": "iti_1",
    "name": "Standard Haji 15 Days",
    "agency": "Global Travel Agency",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Active",
    "lastUpdated": "2026-06-11",
    "version": "v1.1"
  },
  {
    "id": "iti_2",
    "name": "Standard Haji 16 Days",
    "agency": "Zamzam Travels",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Active",
    "lastUpdated": "2026-06-12",
    "version": "v1.2"
  },
  {
    "id": "iti_3",
    "name": "Premium Umrah 12 Days",
    "agency": "Global Travel Agency",
    "days": 9,
    "destinations": [
      "Makkah",
      "Madinah"
    ],
    "activities": 12,
    "status": "Active",
    "lastUpdated": "2026-06-13",
    "version": "v1.0"
  },
  {
    "id": "iti_4",
    "name": "Standard Haji 18 Days",
    "agency": "Zamzam Travels",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Active",
    "lastUpdated": "2026-06-14",
    "version": "v1.1"
  },
  {
    "id": "iti_5",
    "name": "Standard Haji 19 Days",
    "agency": "Global Travel Agency",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Draft",
    "lastUpdated": "2026-06-15",
    "version": "v1.2"
  },
  {
    "id": "iti_6",
    "name": "Premium Umrah 15 Days",
    "agency": "Zamzam Travels",
    "days": 9,
    "destinations": [
      "Makkah",
      "Madinah"
    ],
    "activities": 12,
    "status": "Active",
    "lastUpdated": "2026-06-16",
    "version": "v1.0"
  },
  {
    "id": "iti_7",
    "name": "Standard Haji 21 Days",
    "agency": "Global Travel Agency",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Active",
    "lastUpdated": "2026-06-17",
    "version": "v1.1"
  },
  {
    "id": "iti_8",
    "name": "Standard Haji 22 Days",
    "agency": "Zamzam Travels",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Active",
    "lastUpdated": "2026-06-18",
    "version": "v1.2"
  },
  {
    "id": "iti_9",
    "name": "Premium Umrah 18 Days",
    "agency": "Global Travel Agency",
    "days": 9,
    "destinations": [
      "Makkah",
      "Madinah"
    ],
    "activities": 12,
    "status": "Active",
    "lastUpdated": "2026-06-19",
    "version": "v1.0"
  },
  {
    "id": "iti_10",
    "name": "Standard Haji 24 Days",
    "agency": "Zamzam Travels",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Draft",
    "lastUpdated": "2026-06-20",
    "version": "v1.1"
  },
  {
    "id": "iti_11",
    "name": "Standard Haji 25 Days",
    "agency": "Global Travel Agency",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Active",
    "lastUpdated": "2026-06-21",
    "version": "v1.2"
  },
  {
    "id": "iti_12",
    "name": "Premium Umrah 21 Days",
    "agency": "Zamzam Travels",
    "days": 9,
    "destinations": [
      "Makkah",
      "Madinah"
    ],
    "activities": 12,
    "status": "Active",
    "lastUpdated": "2026-06-22",
    "version": "v1.0"
  },
  {
    "id": "iti_13",
    "name": "Standard Haji 27 Days",
    "agency": "Global Travel Agency",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Active",
    "lastUpdated": "2026-06-23",
    "version": "v1.1"
  },
  {
    "id": "iti_14",
    "name": "Standard Haji 28 Days",
    "agency": "Zamzam Travels",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Active",
    "lastUpdated": "2026-06-24",
    "version": "v1.2"
  },
  {
    "id": "iti_15",
    "name": "Premium Umrah 24 Days",
    "agency": "Global Travel Agency",
    "days": 9,
    "destinations": [
      "Makkah",
      "Madinah"
    ],
    "activities": 12,
    "status": "Draft",
    "lastUpdated": "2026-06-25",
    "version": "v1.0"
  },
  {
    "id": "iti_16",
    "name": "Standard Haji 30 Days",
    "agency": "Zamzam Travels",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Active",
    "lastUpdated": "2026-06-26",
    "version": "v1.1"
  },
  {
    "id": "iti_17",
    "name": "Standard Haji 31 Days",
    "agency": "Global Travel Agency",
    "days": 14,
    "destinations": [
      "Makkah",
      "Madinah",
      "Arafah",
      "Mina"
    ],
    "activities": 24,
    "status": "Active",
    "lastUpdated": "2026-06-27",
    "version": "v1.2"
  },
  {
    "id": "iti_18",
    "name": "Premium Umrah 27 Days",
    "agency": "Zamzam Travels",
    "days": 9,
    "destinations": [
      "Makkah",
      "Madinah"
    ],
    "activities": 12,
    "status": "Active",
    "lastUpdated": "2026-06-28",
    "version": "v1.0"
  }
];

  const columns = [
    { header: 'Itinerary ID', accessor: 'id' as const, sortable: true },
    { 
      header: 'Name', 
      accessor: (row: typeof itineraryList[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.name}</span>
          <span className="text-caption text-muted">Version: {row.version}</span>
        </div>
      )
    },
    { 
      header: 'Travel Agency', 
      accessor: (row: typeof itineraryList[0]) => {
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
    { header: 'Duration (Days)', accessor: 'days' as const, sortable: true },
    { 
      header: 'Destinations', 
      accessor: (row: typeof itineraryList[0]) => (
        <span>{row.destinations.join(', ')}</span>
      )
    },
    { header: 'Activities', accessor: 'activities' as const, sortable: true },
    { 
      header: 'Status', 
      accessor: (row: typeof itineraryList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Active') variant = 'success';
        if (row.status === 'Draft') variant = 'neutral';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    { header: 'Last Updated', accessor: 'lastUpdated' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: typeof itineraryList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('itinerary-details', { id: row.id }) },
            { id: 'edit', label: 'Edit', icon: <Edit size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, danger: true, onClick: () => console.log('Delete', row.id) }
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
        { value: 'draft', label: 'Draft' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'archived', label: 'Archived' },
      ]
    },
    {
      id: 'type',
      label: 'Type',
      options: [
        { value: 'umrah', label: 'Umrah' },
        { value: 'haji', label: 'Haji' },
        { value: 'custom', label: 'Custom' },
      ]
    },
    {
      id: 'owner',
      label: 'Owner Scope',
      options: [
        { value: 'global', label: 'Global' },
        { value: 'agency', label: 'Travel Agency' },
      ]
    },
    {
      id: 'ownerAgency',
      label: 'Owner Agency',
      options: [
        { value: 'a1', label: 'Travel Agency A' },
        { value: 'a2', label: 'Travel Agency B' },
      ]
    },
    {
      id: 'visibility',
      label: 'Visibility',
      options: [
        { value: 'private', label: 'Private Draft' },
        { value: 'internal', label: 'Internal' },
        { value: 'available', label: 'Available for Package' },
      ]
    },
    {
      id: 'duration',
      label: 'Duration',
      options: [
        { value: '5d3n', label: '5D / 3N' },
        { value: '7d5n', label: '7D / 5N' },
        { value: '10d8n', label: '10D / 8N' },
        { value: '12d10n', label: '12D / 10N' },
        { value: '14d12n', label: '14D / 12N' },
        { value: '16d14n', label: '16D / 14N' },
      ]
    },
    {
      id: 'timeZone',
      label: 'Time Zone',
      options: [
        { value: 'my', label: 'Malaysia GMT+8' },
        { value: 'sa', label: 'Saudi Arabia GMT+3' },
        { value: 'id_wib', label: 'Indonesia GMT+7' },
      ]
    },
    {
      id: 'feedback',
      label: 'Feedback Settings',
      options: [
        { value: 'enabled', label: 'Feedback Enabled' },
        { value: 'disabled', label: 'Feedback Disabled' },
        { value: 'anonymous', label: 'Anonymous Enabled' },
      ]
    },
    {
      id: 'usedIn',
      label: 'Used In',
      options: [
        { value: 'not_used', label: 'Not Used' },
        { value: 'package', label: 'Used in Package' },
        { value: 'group_trip', label: 'Used in Group Trip' }
      ]
    },
    {
      id: 'date',
      label: 'Date Created',
      options: [
        { value: 'today', label: 'Today' },
        { value: 'this_week', label: 'This Week' },
        { value: 'this_month', label: 'This Month' }
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
  } = useDataFilter(itineraryList, {
    defaultSort: { key: 'lastUpdated', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Itinerary Templates"
        breadcrumbs={[{ label: 'Home' }, { label: 'Itineraries' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <ExportControl data={filteredData} filename="itineraries" />
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('itinerary-add')}>
            Create Itinerary
          </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Templates" 
          value={itineraryList.length.toString()} 
          trend="up" 
          trendValue="+2" 
          icon={<FileText />} 
          iconBg="var(--color-primary-light)" 
          accentColor="var(--color-primary)" 
        />
        <MetricCard 
          title="Published Templates" 
          value={itineraryList.filter(i => i.status === 'Published').length.toString()} 
          trend="up" 
          trendValue="+1" 
          icon={<CheckCircle2 />} 
          iconBg="var(--color-success-light)" 
          accentColor="var(--color-success)" 
        />
        <MetricCard 
          title="Draft Templates" 
          value={itineraryList.filter(i => i.status === 'Draft').length.toString()} 
          trend="neutral" 
          trendValue="0" 
          icon={<Clock />} 
          iconBg="var(--color-warning-light)" 
          accentColor="var(--color-warning)" 
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
        searchPlaceholder="Search by itinerary name, activity, or location..."
      />

      {selectedItinerary.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedItinerary.length} templates selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={() => console.log('Change Status')}>Change Status</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Archive')}>Archive Selected</Button>
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
        selectedKeys={selectedItinerary}
        onSelectionChange={setSelectedItinerary}
        emptyStateTitle="No itinerary templates found"
        emptyStateDescription="Try adjusting your search or filters."
      />
    </div>
  );
};
