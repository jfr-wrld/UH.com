import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { SearchInput } from '../../components/inputs/SearchInput';
import { Select } from '../../components/inputs/Select';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Button } from '../../components/actions/Button';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { Plus, Megaphone, Send, Clock, AlertTriangle, Eye, Edit, Copy, Archive } from 'lucide-react';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const AnnouncementList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);


  const mockAnnouncements = [
  {
    "id": "ANN-001",
    "title": "System Broadcast Alert 1",
    "type": "Compliance Notice",
    "audience": "All Jamaah (3,500)",
    "channels": [
      "In-App"
    ],
    "status": "Scheduled",
    "date": "11 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-002",
    "title": "System Broadcast Alert 2",
    "type": "Finance Reminder",
    "audience": "Specific Jamaah (45)",
    "channels": [
      "In-App",
      "Email",
      "Push"
    ],
    "status": "Sent",
    "date": "12 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-003",
    "title": "System Broadcast Alert 3",
    "type": "Group Trip Update",
    "audience": "Group Trip Members (45)",
    "channels": [
      "In-App"
    ],
    "status": "Sent",
    "date": "13 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-004",
    "title": "System Broadcast Alert 4",
    "type": "Platform Notice",
    "audience": "All Travel Agencies (150)",
    "channels": [
      "In-App",
      "Email",
      "Push"
    ],
    "status": "Draft",
    "date": "14 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-005",
    "title": "System Broadcast Alert 5",
    "type": "Compliance Notice",
    "audience": "All Jamaah (3,500)",
    "channels": [
      "In-App"
    ],
    "status": "Scheduled",
    "date": "15 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-006",
    "title": "System Broadcast Alert 6",
    "type": "Finance Reminder",
    "audience": "Specific Jamaah (45)",
    "channels": [
      "In-App",
      "Email",
      "Push"
    ],
    "status": "Sent",
    "date": "16 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-007",
    "title": "System Broadcast Alert 7",
    "type": "Group Trip Update",
    "audience": "Group Trip Members (45)",
    "channels": [
      "In-App"
    ],
    "status": "Sent",
    "date": "17 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-008",
    "title": "System Broadcast Alert 8",
    "type": "Platform Notice",
    "audience": "All Travel Agencies (150)",
    "channels": [
      "In-App",
      "Email",
      "Push"
    ],
    "status": "Draft",
    "date": "18 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-009",
    "title": "System Broadcast Alert 9",
    "type": "Compliance Notice",
    "audience": "All Jamaah (3,500)",
    "channels": [
      "In-App"
    ],
    "status": "Scheduled",
    "date": "19 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-010",
    "title": "System Broadcast Alert 10",
    "type": "Finance Reminder",
    "audience": "Specific Jamaah (45)",
    "channels": [
      "In-App",
      "Email",
      "Push"
    ],
    "status": "Sent",
    "date": "20 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-011",
    "title": "System Broadcast Alert 11",
    "type": "Group Trip Update",
    "audience": "Group Trip Members (45)",
    "channels": [
      "In-App"
    ],
    "status": "Sent",
    "date": "21 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-012",
    "title": "System Broadcast Alert 12",
    "type": "Platform Notice",
    "audience": "All Travel Agencies (150)",
    "channels": [
      "In-App",
      "Email",
      "Push"
    ],
    "status": "Draft",
    "date": "22 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-013",
    "title": "System Broadcast Alert 13",
    "type": "Compliance Notice",
    "audience": "All Jamaah (3,500)",
    "channels": [
      "In-App"
    ],
    "status": "Scheduled",
    "date": "23 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-014",
    "title": "System Broadcast Alert 14",
    "type": "Finance Reminder",
    "audience": "Specific Jamaah (45)",
    "channels": [
      "In-App",
      "Email",
      "Push"
    ],
    "status": "Sent",
    "date": "24 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-015",
    "title": "System Broadcast Alert 15",
    "type": "Group Trip Update",
    "audience": "Group Trip Members (45)",
    "channels": [
      "In-App"
    ],
    "status": "Sent",
    "date": "25 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-016",
    "title": "System Broadcast Alert 16",
    "type": "Platform Notice",
    "audience": "All Travel Agencies (150)",
    "channels": [
      "In-App",
      "Email",
      "Push"
    ],
    "status": "Draft",
    "date": "26 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-017",
    "title": "System Broadcast Alert 17",
    "type": "Compliance Notice",
    "audience": "All Jamaah (3,500)",
    "channels": [
      "In-App"
    ],
    "status": "Scheduled",
    "date": "27 Nov 2026 10:00 AM",
    "author": "System Admin"
  },
  {
    "id": "ANN-018",
    "title": "System Broadcast Alert 18",
    "type": "Finance Reminder",
    "audience": "Specific Jamaah (45)",
    "channels": [
      "In-App",
      "Email",
      "Push"
    ],
    "status": "Sent",
    "date": "28 Nov 2026 10:00 AM",
    "author": "System Admin"
  }
];

  const columns = [
    {
      header: 'Announcement',
      accessor: (row: typeof mockAnnouncements[0]) => (
        <div>
          <div className="text-body-bold">{row.title}</div>
          <div className="text-caption text-muted">{row.type}</div>
        </div>
      )
    },
    {
      header: 'Audience',
      accessor: 'audience' as const
    },
    {
      header: 'Channels',
      accessor: (row: typeof mockAnnouncements[0]) => (
        <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
          {row.channels.map(ch => <Badge key={ch} variant="neutral">{ch}</Badge>)}
        </div>
      )
    },
    {
      header: 'Author',
      accessor: (row: typeof mockAnnouncements[0]) => (
        <UserProfileCell 
          name={row.author} 
          isVerified={true} 
        />
      )
    },
    {
      header: 'Status',
      accessor: (row: typeof mockAnnouncements[0]) => {
        let variant: any = 'neutral';
        if (row.status === 'Sent') variant = 'success';
        if (row.status === 'Scheduled') variant = 'info';
        if (row.status === 'Partially Sent') variant = 'warning';
        if (row.status === 'Failed') variant = 'danger';
        return <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>;
      }
    },
    {
      header: 'Date',
      accessor: (row: typeof mockAnnouncements[0]) => <span className="text-caption text-muted">{row.date}</span>
    },
    {
      header: '',
      accessor: (row: typeof mockAnnouncements[0]) => (
        <DropdownMenu 
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('announcement-details', { id: row.id }) },
            { id: 'edit', label: 'Edit', icon: <Edit size={16} />, onClick: () => navigate('announcement-create', { id: row.id }), disabled: row.status !== 'Draft' && row.status !== 'Scheduled' },
            { id: 'duplicate', label: 'Duplicate', icon: <Copy size={16} />, onClick: () => console.log('Duplicate', row.id) },
            { id: 'archive', label: 'Archive', icon: <Archive size={16} />, onClick: () => console.log('Archive', row.id) },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];
  const filterGroups: FilterGroup[] = [
    {
      id: 'type',
      label: 'Type',
      options: [
        { value: 'platform', label: 'Platform Notice' },
        { value: 'trip', label: 'Group Trip Update' },
        { value: 'finance', label: 'Finance Reminder' },
        { value: 'compliance', label: 'Compliance Notice' }
      ]
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'sent', label: 'Sent' }
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
  } = useDataFilter(mockAnnouncements, {
    defaultSort: { key: 'lastUpdated', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

  return (
    <div>
      <PageHeader 
        title="Announcement Management" 
        breadcrumbs={[
          { label: 'Dashboard', onClick: () => navigate('dashboard') },
          { label: 'Announcements' }
        ]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <ExportControl data={filteredData} filename="announcements" />
            <Button variant="primary" leftIcon={<Plus size={16} />} onClick={() => navigate('announcement-create')}>
              Create Announcement
            </Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <MetricCard title="Total (This Month)" value="42" icon={<Megaphone size={20} className="text-primary" />} iconBg="var(--color-primary-light)" trend="up" trendValue="+12" />
        <MetricCard title="Sent" value="28" icon={<Send size={20} className="text-success" />} iconBg="var(--color-success-light)" trend="up" trendValue="+5" />
        <MetricCard title="Scheduled" value="10" icon={<Clock size={20} className="text-info" />} iconBg="var(--surface-info)" />
        <MetricCard title="Delivery Issues" value="4" icon={<AlertTriangle size={20} className="text-danger" />} iconBg="var(--color-danger-light)" trend="down" trendValue="-2" />
      </div>

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <FilterBar 
          groups={filterGroups}
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
          onSearch={setSearchQuery}
          searchValue={searchQuery}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          searchPlaceholder="Search announcements..."
        />
      </div>

      <DataTable
        onRowClick={(row: any) => navigate('announcement-details', { id: row.id })} 
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
       isLoading={isLoading} />
    </div>
  );
};
