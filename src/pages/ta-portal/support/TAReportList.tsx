import React, { useState, useEffect } from 'react';
import { useDataFilter } from '../../../hooks/useDataFilter';
import { PageHeader } from '../../../components/layout/PageHeader';
import { MetricCard } from '../../../components/data-display/MetricCard';
import { Badge } from '../../../components/data-display/Badge';
import { DataTable } from '../../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../../components/inputs/FilterBar';
import { Tabs } from '../../../components/navigation/Tabs';
import { Button } from '../../../components/actions/Button';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';
import { Plus, Eye, MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';
import { getStatusBadgeVariant } from '../../../utils/badge';

export const TAReportList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock Data for Tickets
  const ticketList = [
    {
      id: "TKT-1001",
      subject: "Visa Processing Delay for Family Ahmad",
      category: "Visas & Documents",
      priority: "Important",
      status: "Open",
      lastUpdated: "Today, 10:30 AM"
    },
    {
      id: "TKT-1002",
      subject: "Hotel Upgrade Request - TRP-2023",
      category: "Accommodation",
      priority: "Normal",
      status: "Waiting Agency Response",
      lastUpdated: "Yesterday, 2:15 PM"
    },
    {
      id: "TKT-1003",
      subject: "Payment Failure Error 500",
      category: "Finance & Payments",
      priority: "Urgent",
      status: "In Progress",
      lastUpdated: "15 Nov 2026"
    },
    {
      id: "TKT-1004",
      subject: "Feedback Escalation: Bus Breakdown",
      category: "Operations",
      priority: "Important",
      status: "Resolved",
      lastUpdated: "12 Nov 2026"
    }
  ];

  const columns = [
    {
      header: 'Ticket ID',
      sortKey: 'id',
      accessor: (row: any) => <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{row.id}</span>
    },
    {
      header: 'Subject & Category',
      sortKey: 'subject',
      accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.subject}</span>
          <span className="text-caption text-muted">{row.category}</span>
        </div>
      )
    },
    {
      header: 'Priority',
      sortKey: 'priority',
      accessor: (row: any) => {
        let variant: 'danger' | 'warning' | 'neutral' = 'neutral';
        if (row.priority === 'Urgent') variant = 'danger';
        if (row.priority === 'Important') variant = 'warning';
        return <Badge variant={variant}>{row.priority}</Badge>;
      }
    },
    {
      header: 'Status',
      sortKey: 'status',
      accessor: (row: any) => {
        let variant: 'success' | 'warning' | 'danger' | 'primary' | 'neutral' = 'neutral';
        if (row.status === 'Resolved') variant = 'success';
        if (row.status === 'Open') variant = 'primary';
        if (row.status === 'Waiting Agency Response') variant = 'warning';
        if (row.status === 'In Progress') variant = 'neutral';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    {
      header: 'Last Updated',
      sortKey: 'lastUpdated',
      accessor: (row: any) => <span className="text-body text-muted">{row.lastUpdated}</span>
    },
    {
      header: 'Action',
      align: 'right' as const,
      accessor: (row: any) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Ticket', icon: <Eye size={16} />, onClick: () => navigate('ta-report-details', { id: row.id }) }
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
        { value: 'Open', label: 'Open' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Waiting Agency Response', label: 'Waiting on Us' },
        { value: 'Resolved', label: 'Resolved' },
      ]
    },
    {
      id: 'priority',
      label: 'Priority',
      options: [
        { value: 'Urgent', label: 'Urgent' },
        { value: 'Important', label: 'Important' },
        { value: 'Normal', label: 'Normal' },
      ]
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Tickets' },
    { id: 'action-needed', label: 'Action Needed' },
    { id: 'resolved', label: 'Resolved' },
  ];

  const getTabFilteredData = () => {
    let data = ticketList;
    if (activeTab === 'action-needed') return data.filter(d => d.status === 'Waiting Agency Response');
    if (activeTab === 'resolved') return data.filter(d => d.status === 'Resolved');
    return data;
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
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader 
        title="Support Tickets"
        subtitle="Manage communication and issues with the platform administrators."
        actions={
          <Button onClick={() => navigate('ta-report-create')} leftIcon={<Plus size={16} />}>Create Ticket</Button>
        }
      />

      {/* Overview Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Open Tickets" 
          value="3" 
          icon={<MessageSquare size={20} className="text-primary" />} 
          iconBg="var(--color-primary-light)" 
        />
        <MetricCard 
          title="Action Needed" 
          value="1" 
          icon={<AlertTriangle size={20} className="text-warning" />} 
          iconBg="var(--color-warning-light)" 
        />
        <MetricCard 
          title="Resolved (30d)" 
          value="12" 
          icon={<CheckCircle size={20} className="text-success" />} 
          iconBg="var(--color-success-light)" 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        
        <FilterBar 
          hasActiveFilters={hasActiveFilters} 
          onClearFilters={clearFilters}
          filters={filterGroups}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          searchValue={searchQuery}
          onSearch={setSearchQuery}
          searchPlaceholder="Search tickets by ID or Subject..."
        />

        <DataTable 
          data={filteredData} 
          columns={columns} 
          keyExtractor={(row) => row.id}
          isLoading={isLoading}
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={onSort}
          selectedKeys={selectedItems}
          onSelectionChange={setSelectedItems}
          onRowClick={(row) => navigate('ta-report-details', { id: row.id })}
        />
      </div>
    </div>
  );
};
