import React, { useState, useEffect } from 'react';
import { useDataFilter } from '../../hooks/useDataFilter';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Download, FolderOpen, Activity, AlertTriangle, UserMinus, Paperclip, ChevronRight } from 'lucide-react';
import { ExportControl } from '../../components/domain/ExportControl';

export const ReportList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock Data
  const reportList = [
  {
    "id": "REP-001",
    "name": "Mutawwif Incident Summary (v1)",
    "category": "Operations",
    "frequency": "Weekly",
    "lastRun": "11 Nov 2026 04:00 PM",
    "format": "PDF",
    "status": "Active"
  },
  {
    "id": "REP-002",
    "name": "Agent Payout Ledger (v2)",
    "category": "Agency Performance",
    "frequency": "Monthly",
    "lastRun": "12 Nov 2026 04:00 PM",
    "format": "PDF, XLSX",
    "status": "Active"
  },
  {
    "id": "REP-003",
    "name": "Jamaah Departure Manifest (v3)",
    "category": "Audit Log",
    "frequency": "On-Demand",
    "lastRun": "13 Nov 2026 04:00 PM",
    "format": "PDF",
    "status": "Active"
  },
  {
    "id": "REP-004",
    "name": "Monthly Revenue Report (v4)",
    "category": "Finance",
    "frequency": "Daily",
    "lastRun": "14 Nov 2026 04:00 PM",
    "format": "PDF, XLSX",
    "status": "Draft"
  },
  {
    "id": "REP-005",
    "name": "Mutawwif Incident Summary (v5)",
    "category": "Operations",
    "frequency": "Weekly",
    "lastRun": "15 Nov 2026 04:00 PM",
    "format": "PDF",
    "status": "Active"
  },
  {
    "id": "REP-006",
    "name": "Agent Payout Ledger (v6)",
    "category": "Agency Performance",
    "frequency": "Monthly",
    "lastRun": "16 Nov 2026 04:00 PM",
    "format": "PDF, XLSX",
    "status": "Active"
  },
  {
    "id": "REP-007",
    "name": "Jamaah Departure Manifest (v7)",
    "category": "Audit Log",
    "frequency": "On-Demand",
    "lastRun": "17 Nov 2026 04:00 PM",
    "format": "PDF",
    "status": "Active"
  },
  {
    "id": "REP-008",
    "name": "Monthly Revenue Report (v8)",
    "category": "Finance",
    "frequency": "Daily",
    "lastRun": "18 Nov 2026 04:00 PM",
    "format": "PDF, XLSX",
    "status": "Draft"
  },
  {
    "id": "REP-009",
    "name": "Mutawwif Incident Summary (v9)",
    "category": "Operations",
    "frequency": "Weekly",
    "lastRun": "19 Nov 2026 04:00 PM",
    "format": "PDF",
    "status": "Active"
  },
  {
    "id": "REP-010",
    "name": "Agent Payout Ledger (v10)",
    "category": "Agency Performance",
    "frequency": "Monthly",
    "lastRun": "20 Nov 2026 04:00 PM",
    "format": "PDF, XLSX",
    "status": "Active"
  },
  {
    "id": "REP-011",
    "name": "Jamaah Departure Manifest (v11)",
    "category": "Audit Log",
    "frequency": "On-Demand",
    "lastRun": "21 Nov 2026 04:00 PM",
    "format": "PDF",
    "status": "Active"
  },
  {
    "id": "REP-012",
    "name": "Monthly Revenue Report (v12)",
    "category": "Finance",
    "frequency": "Daily",
    "lastRun": "22 Nov 2026 04:00 PM",
    "format": "PDF, XLSX",
    "status": "Draft"
  },
  {
    "id": "REP-013",
    "name": "Mutawwif Incident Summary (v13)",
    "category": "Operations",
    "frequency": "Weekly",
    "lastRun": "23 Nov 2026 04:00 PM",
    "format": "PDF",
    "status": "Active"
  },
  {
    "id": "REP-014",
    "name": "Agent Payout Ledger (v14)",
    "category": "Agency Performance",
    "frequency": "Monthly",
    "lastRun": "24 Nov 2026 04:00 PM",
    "format": "PDF, XLSX",
    "status": "Active"
  },
  {
    "id": "REP-015",
    "name": "Jamaah Departure Manifest (v15)",
    "category": "Audit Log",
    "frequency": "On-Demand",
    "lastRun": "25 Nov 2026 04:00 PM",
    "format": "PDF",
    "status": "Active"
  },
  {
    "id": "REP-016",
    "name": "Monthly Revenue Report (v16)",
    "category": "Finance",
    "frequency": "Daily",
    "lastRun": "26 Nov 2026 04:00 PM",
    "format": "PDF, XLSX",
    "status": "Draft"
  },
  {
    "id": "REP-017",
    "name": "Mutawwif Incident Summary (v17)",
    "category": "Operations",
    "frequency": "Weekly",
    "lastRun": "27 Nov 2026 04:00 PM",
    "format": "PDF",
    "status": "Active"
  },
  {
    "id": "REP-018",
    "name": "Agent Payout Ledger (v18)",
    "category": "Agency Performance",
    "frequency": "Monthly",
    "lastRun": "28 Nov 2026 04:00 PM",
    "format": "PDF, XLSX",
  }
];

  const columns = [
    {
      key: 'id',
      title: 'Report ID',
      sortable: true,
      render: (val: string) => <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{val}</span>
    },
    {
      key: 'name',
      title: 'Report Name',
      sortable: true,
      render: (val: string, row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-background-alt)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-text-secondary)'
          }}>
            <Paperclip size={16} />
          </div>
          <div>
            <div style={{ fontWeight: 500, color: 'var(--color-text)' }}>{val}</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{row.category}</div>
          </div>
        </div>
      )
    },
    {
      key: 'frequency',
      title: 'Frequency',
      sortable: true
    },
    {
      key: 'lastRun',
      title: 'Last Run',
      sortable: true,
      render: (val: string) => <span style={{ color: 'var(--color-text-secondary)' }}>{val}</span>
    },
    {
      key: 'format',
      title: 'Format',
      render: (val: string) => (
        <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
          {val.split(', ').map((f, idx) => (
            <Badge key={idx} variant="outline">{f}</Badge>
          ))}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (val: string) => {
        let variant: 'success' | 'warning' | 'default' = 'default';
        if (val === 'Active') variant = 'success';
        if (val === 'Draft') variant = 'warning';
        return <Badge variant={variant}>{val}</Badge>;
      }
    },
    {
      key: 'actions',
      title: '',
      align: 'right' as const,
      render: (_: any, row: any) => (
        <DropdownMenu
          trigger={<Button variant="ghost" size="sm">...</Button>}
          items={[
            { label: 'Run Now', onClick: () => console.log('Run', row.id) },
            { label: 'Edit Schedule', onClick: () => console.log('Edit', row.id) },
            { label: 'Delete', onClick: () => console.log('Delete', row.id), danger: true }
          ]}
        />
      )
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'open', label: 'Open' },
        { value: 'progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
      ]
    },
    {
      id: 'priority',
      label: 'Priority',
      options: [
        { value: 'urgent', label: 'Urgent' },
        { value: 'important', label: 'Important' },
        { value: 'normal', label: 'Normal' },
      ]
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Reports' },
    { id: 'jamaah', label: 'Jamaah Reports' },
    { id: 'agency', label: 'Travel Agency Reports' },
    { id: 'mutawwif', label: 'Mutawwif Reports' },
  ];

  // Derive data based on active tab
  const getTabFilteredData = () => {
    if (activeTab === 'all') return reportList;
    if (activeTab === 'jamaah') return reportList.filter(r => r.senderRole === 'Jamaah');
    if (activeTab === 'agency') return reportList.filter(r => r.senderRole === 'Travel Agency');
    if (activeTab === 'mutawwif') return reportList.filter(r => r.senderRole === 'Mutawwif');
    return reportList;
  };

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
  } = useDataFilter(getTabFilteredData(), {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Issue Reports & Ticketing"
        breadcrumbs={[{ label: 'Support & Ops' }, { label: 'Reports' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export Log</Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('report-create')}>Create / Escalate Report</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard title="Open Tickets" value="12" icon={<FolderOpen size={18} className="text-primary" />} iconBg="var(--color-primary-light)" trend="up" trendValue="+2" />
        <MetricCard title="In Progress" value="8" icon={<Activity size={18} className="text-success" />} iconBg="var(--color-success-light)" trend="up" trendValue="+4" />
        <MetricCard title="Urgent Priority" value="3" icon={<AlertTriangle size={18} className="text-danger" />} iconBg="var(--color-danger-light)" trend="down" trendValue="-1" />
        <MetricCard title="Unassigned" value="5" icon={<UserMinus size={18} className="text-warning" />} iconBg="var(--color-warning-light)" />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={(t) => { setActiveTab(t); setSelectedItems(new Set()); }} />

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by ID, Subject, or Sender..."
      />

      <DataTable 
        data={filteredData}
        columns={columns}
        keyExtractor={(r) => r.id}
        isLoading={isLoading}
        selectedKeys={selectedItems}
        onSelectionChange={setSelectedItems}
        emptyStateTitle="No reports found in this view"
        pagination={{
          currentPage,
          totalPages,
          rowsPerPage,
          totalItems,
          onPageChange,
          onRowsPerPageChange
        }}
        sort={{
          key: sortKey,
          order: sortOrder,
          onSort
        }}
      />
    </div>
  );
};
