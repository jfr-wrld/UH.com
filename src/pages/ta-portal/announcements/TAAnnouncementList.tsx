import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { MetricCard } from '../../../components/data-display/MetricCard';
import { FilterBar, FilterGroup } from '../../../components/inputs/FilterBar';
import { DataTable } from '../../../components/data-display/DataTable';
import { Badge } from '../../../components/data-display/Badge';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';
import { Button } from '../../../components/actions/Button';
import { Tabs } from '../../../components/navigation/Tabs';
import { Plus, Megaphone, Send, Clock, Eye, Mailbox } from 'lucide-react';
import { ExportControl } from '../../../components/domain/ExportControl';
import { useDataFilter } from '../../../hooks/useDataFilter';
import { getStatusBadgeVariant } from '../../../utils/badge';

export const TAAnnouncementList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Mock Data for Platform Inbox
  const inboxData = [
    {
      id: "PLT-001",
      title: "New Visa Regulations for 2027 Season",
      type: "Platform Notice",
      date: "10 Nov 2026",
      status: "Unread",
      sender: "UmrahHaji Ops"
    },
    {
      id: "PLT-002",
      title: "System Maintenance Scheduled",
      type: "Technical",
      date: "05 Nov 2026",
      status: "Read",
      sender: "IT Support"
    }
  ];

  // Mock Data for Agency Announcements
  const agencyData = [
    {
      id: "ANN-001",
      title: "Reminder: Submit Passport Documents",
      type: "Document Reminder",
      audience: "TRP-1001 (45 Jamaah)",
      channels: ["In-App", "WhatsApp"],
      status: "Sent",
      date: "12 Nov 2026",
      author: "Admin Agency"
    },
    {
      id: "ANN-002",
      title: "Flight Schedule Update (SV 821)",
      type: "Trip Update",
      audience: "TRP-1002 (20 Jamaah)",
      channels: ["In-App"],
      status: "Scheduled",
      date: "15 Nov 2026",
      author: "Ops Staff"
    },
    {
      id: "ANN-003",
      title: "Welcome Briefing Makkah",
      type: "General Info",
      audience: "All Jamaah (1,200)",
      channels: ["In-App", "Email"],
      status: "Draft",
      date: "-",
      author: "Admin Agency"
    }
  ];

  const {
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortOrder,
    onSort,
    currentPage,
    totalPages,
    rowsPerPage,
    totalItems,
    onPageChange,
    onRowsPerPageChange
  } = useDataFilter((activeTab === 'inbox' ? inboxData : agencyData) as any[], {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
  });

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    clearFilters();
    setSearchQuery('');
    setIsLoading(true);
  };

  const inboxColumns = [
    {
      header: 'Announcement',
      accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold" style={{ color: row.status === 'Unread' ? 'var(--color-text-neutral)' : 'var(--color-text-muted)' }}>{row.title}</span>
          <span className="text-caption text-muted">{row.type} • From: {row.sender}</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (row: any) => <Badge variant={row.status === 'Unread' ? 'danger' : 'neutral'}>{row.status}</Badge>
    },
    {
      header: 'Date',
      accessor: (row: any) => <span className="text-body text-muted">{row.date}</span>
    },
    {
      header: 'Action',
      accessor: (row: any) => (
        <Button variant="ghost" size="sm" onClick={() => navigate('ta-announcement-details', { id: row.id, type: 'inbox' })}>Read</Button>
      ),
      align: 'right' as const
    }
  ];

  const agencyColumns = [
    {
      header: 'Title / Subject',
      accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.title}</span>
          <span className="text-caption text-muted">{row.type}</span>
        </div>
      )
    },
    {
      header: 'Target Audience',
      accessor: (row: any) => <span className="text-body">{row.audience}</span>
    },
    {
      header: 'Channels',
      accessor: (row: any) => (
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {row.channels.map((c: string) => (
            <Badge key={c} variant="neutral">{c}</Badge>
          ))}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (row: any) => {
        let v: any = 'neutral';
        if (row.status === 'Sent') v = 'success';
        if (row.status === 'Scheduled') v = 'warning';
        if (row.status === 'Draft') v = 'neutral';
        return <Badge variant={v}>{row.status}</Badge>;
      }
    },
    {
      header: 'Date',
      accessor: (row: any) => <span className="text-body">{row.date}</span>
    },
    {
      header: 'Action',
      accessor: (row: any) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('ta-announcement-details', { id: row.id, type: 'agency' }) },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const tabs = [
    { id: 'inbox', label: 'Platform Inbox (2 Unread)' },
    { id: 'agency', label: 'Agency Announcements' }
  ];

  const agencyFilterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'Sent', label: 'Sent' },
        { value: 'Scheduled', label: 'Scheduled' },
        { value: 'Draft', label: 'Draft' },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Announcements"
        subtitle="View platform notices and broadcast messages to your Jamaah and team."
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <ExportControl data={filteredData} />
            {activeTab === 'agency' && (
              <Button onClick={() => navigate('ta-announcement-create')} leftIcon={<Plus size={16} />}>
                Create Announcement
              </Button>
            )}
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Unread Platform Notices" 
          value="2" 
          icon={<Mailbox size={20} className="text-danger" />} 
          iconBg="var(--color-danger-light)" 
        />
        <MetricCard 
          title="Announcements Sent" 
          value="45" 
          icon={<Send size={20} className="text-success" />} 
          iconBg="var(--color-success-light)" 
        />
        <MetricCard 
          title="Scheduled" 
          value="3" 
          icon={<Clock size={20} className="text-warning" />} 
          iconBg="var(--color-warning-light)" 
        />
        <MetricCard 
          title="Total Audience Reach" 
          value="2.4k" 
          icon={<Megaphone size={20} className="text-primary" />} 
          iconBg="var(--color-primary-light)" 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
        
        <FilterBar 
          hasActiveFilters={hasActiveFilters} 
          onClearFilters={clearFilters}
          groups={activeTab === 'agency' ? agencyFilterGroups : undefined}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          searchPlaceholder={activeTab === 'inbox' ? "Search platform notices..." : "Search announcements by title..."}
          searchValue={searchQuery}
          onSearch={setSearchQuery}
        />

        <DataTable 
          data={filteredData} 
          columns={activeTab === 'inbox' ? inboxColumns : agencyColumns} 
          keyExtractor={(row) => row.id}
          isLoading={isLoading}
          onRowClick={(row: any) => navigate('ta-announcement-details', { id: row.id, type: activeTab })}
          sort={{ key: sortKey, order: sortOrder, onSort }}
          pagination={{ currentPage, totalPages, rowsPerPage, totalItems, onPageChange, onRowsPerPageChange }}
          emptyStateTitle={activeTab === 'inbox' ? "No inbox messages" : "No announcements found"}
        />
      </div>
    </div>
  );
};
