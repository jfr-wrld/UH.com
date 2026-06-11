import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { Tabs } from '../../components/navigation/Tabs';
import { DataTable } from '../../components/data-display/DataTable';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Plus, CalendarDays, BarChart, Settings, Users, Activity, ChevronDown, ChevronRight, Edit, Eye, Archive, PowerOff } from 'lucide-react';
import { SeasonTypeModal } from './SeasonTypeModal';
import { SeasonPeriodModal } from './SeasonPeriodModal';
import { ConfirmationDialog } from '../../components/feedback/ConfirmationDialog';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';

export const SeasonList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('types');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isPeriodModalOpen, setIsPeriodModalOpen] = useState(false);
  const [expandedTypes, setExpandedTypes] = useState<string[]>(['st_1']);
  const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const toggleExpand = (id: string) => {
    setExpandedTypes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  // Mock Data
  const seasonTypes = [
  {
    "id": "st_1",
    "name": "Peak Season 2026",
    "status": "Active",
    "periodCount": 1,
    "createdDate": "15 Jan 2026",
    "usageCount": 15,
    "color": "var(--color-danger)",
    "periods": [
      {
        "id": "sp_1",
        "name": "Period 1",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_2",
    "name": "School Holiday 2026",
    "status": "Active",
    "periodCount": 2,
    "createdDate": "15 Jan 2026",
    "usageCount": 20,
    "color": "var(--color-warning)",
    "periods": [
      {
        "id": "sp_2",
        "name": "Period 2",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_3",
    "name": "Ramadan Peak 2026",
    "status": "Active",
    "periodCount": 0,
    "createdDate": "15 Jan 2026",
    "usageCount": 25,
    "color": "var(--color-primary)",
    "periods": []
  },
  {
    "id": "st_4",
    "name": "Rabiul Awwal Special 2026",
    "status": "Active",
    "periodCount": 1,
    "createdDate": "15 Jan 2026",
    "usageCount": 30,
    "color": "var(--color-success)",
    "periods": [
      {
        "id": "sp_4",
        "name": "Period 4",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_5",
    "name": "Hajj Premium Period 2026",
    "status": "Inactive",
    "periodCount": 2,
    "createdDate": "15 Jan 2026",
    "usageCount": 35,
    "color": "var(--color-danger)",
    "periods": [
      {
        "id": "sp_5",
        "name": "Period 5",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_6",
    "name": "Low Season 2027",
    "status": "Active",
    "periodCount": 0,
    "createdDate": "15 Jan 2026",
    "usageCount": 40,
    "color": "var(--color-warning)",
    "periods": []
  },
  {
    "id": "st_7",
    "name": "Peak Season 2027",
    "status": "Active",
    "periodCount": 1,
    "createdDate": "15 Jan 2026",
    "usageCount": 45,
    "color": "var(--color-primary)",
    "periods": [
      {
        "id": "sp_7",
        "name": "Period 7",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_8",
    "name": "School Holiday 2027",
    "status": "Active",
    "periodCount": 2,
    "createdDate": "15 Jan 2026",
    "usageCount": 50,
    "color": "var(--color-success)",
    "periods": [
      {
        "id": "sp_8",
        "name": "Period 8",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_9",
    "name": "Ramadan Peak 2027",
    "status": "Active",
    "periodCount": 0,
    "createdDate": "15 Jan 2026",
    "usageCount": 55,
    "color": "var(--color-danger)",
    "periods": []
  },
  {
    "id": "st_10",
    "name": "Rabiul Awwal Special 2027",
    "status": "Inactive",
    "periodCount": 1,
    "createdDate": "15 Jan 2026",
    "usageCount": 60,
    "color": "var(--color-warning)",
    "periods": [
      {
        "id": "sp_10",
        "name": "Period 10",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_11",
    "name": "Hajj Premium Period 2027",
    "status": "Active",
    "periodCount": 2,
    "createdDate": "15 Jan 2026",
    "usageCount": 65,
    "color": "var(--color-primary)",
    "periods": [
      {
        "id": "sp_11",
        "name": "Period 11",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_12",
    "name": "Low Season 2028",
    "status": "Active",
    "periodCount": 0,
    "createdDate": "15 Jan 2026",
    "usageCount": 70,
    "color": "var(--color-success)",
    "periods": []
  },
  {
    "id": "st_13",
    "name": "Peak Season 2028",
    "status": "Active",
    "periodCount": 1,
    "createdDate": "15 Jan 2026",
    "usageCount": 75,
    "color": "var(--color-danger)",
    "periods": [
      {
        "id": "sp_13",
        "name": "Period 13",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_14",
    "name": "School Holiday 2028",
    "status": "Active",
    "periodCount": 2,
    "createdDate": "15 Jan 2026",
    "usageCount": 80,
    "color": "var(--color-warning)",
    "periods": [
      {
        "id": "sp_14",
        "name": "Period 14",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_15",
    "name": "Ramadan Peak 2028",
    "status": "Inactive",
    "periodCount": 0,
    "createdDate": "15 Jan 2026",
    "usageCount": 85,
    "color": "var(--color-primary)",
    "periods": []
  },
  {
    "id": "st_16",
    "name": "Rabiul Awwal Special 2028",
    "status": "Active",
    "periodCount": 1,
    "createdDate": "15 Jan 2026",
    "usageCount": 90,
    "color": "var(--color-success)",
    "periods": [
      {
        "id": "sp_16",
        "name": "Period 16",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_17",
    "name": "Hajj Premium Period 2028",
    "status": "Active",
    "periodCount": 2,
    "createdDate": "15 Jan 2026",
    "usageCount": 95,
    "color": "var(--color-danger)",
    "periods": [
      {
        "id": "sp_17",
        "name": "Period 17",
        "startDate": "01 Nov 2026",
        "endDate": "30 Nov 2026",
        "duration": 30,
        "status": "Active",
        "lastUpdated": "10 Feb 2026"
      }
    ]
  },
  {
    "id": "st_18",
    "name": "Low Season 2029",
    "status": "Active",
    "periodCount": 0,
    "createdDate": "15 Jan 2026",
    "usageCount": 100,
    "color": "var(--color-warning)",
    "periods": []
  }
];

  const usageReference = [
    { id: 'u_1', type: 'Package', agency: 'Global', record: 'Premium Umrah Dec', date: '15 Dec 2026', snapshot: 'Low Season', status: 'Active', lastUpdated: '20 Feb 2026' },
    { id: 'u_2', type: 'Group Trip', agency: 'Zamzam Travels', record: 'TRP-1001', date: '01 Mar 2026', snapshot: 'Peak Season', status: 'Upcoming', lastUpdated: '22 Feb 2026' },
  ];

  const renderSummaryCards = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
      <MetricCard title="Total Season Types" value="3" icon={<Settings size={20} className="text-primary" />} iconBg="var(--color-primary-light)" />
      <MetricCard title="Active Seasons" value="2" icon={<Activity size={20} className="text-success" />} iconBg="var(--color-success-light)" />
      <MetricCard title="Total Periods" value="3" icon={<CalendarDays size={20} className="text-warning" />} iconBg="var(--color-warning-light)" />
      <MetricCard title="Travel Agencies Using" value="165" icon={<Users size={20} className="text-danger" />} iconBg="var(--color-danger-light)" />
    </div>
  );
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
  } = useDataFilter(seasonTypes, {
    defaultSort: { key: 'startDate', order: 'asc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Season Management"
        breadcrumbs={[{ label: 'Home' }, { label: 'Season Management' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<BarChart size={16} />} onClick={() => setActiveTab('usage')}>
              Usage Reference
            </Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => setIsTypeModalOpen(true)}>
              Add Season Type
            </Button>
          </div>
        }
      />

      {renderSummaryCards()}

      <FilterBar 
        searchPlaceholder="Search seasons, agencies, or packages..."
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        filterGroups={[
          {
            id: 'status',
            label: 'Status',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'archived', label: 'Archived' }
            ]
          },
          {
            id: 'type',
            label: 'Season Type',
            options: [
              { value: 'low', label: 'Low Season' },
              { value: 'medium', label: 'Medium Season' },
              { value: 'peak', label: 'Peak Season' },
              { value: 'custom', label: 'Custom' }
            ]
          },
          {
            id: 'usage',
            label: 'Usage',
            options: [
              { value: 'used', label: 'Used' },
              { value: 'not_used', label: 'Not Used' }
            ]
          },
          {
            id: 'category',
            label: 'Package Category',
            options: [
              { value: 'umrah', label: 'Umrah' },
              { value: 'hajj', label: 'Hajj' },
              { value: 'custom', label: 'Custom' }
            ]
          }
        ]}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
      />

      <Tabs 
        tabs={[
          { id: 'types', label: 'Season Types & Periods' },
          { id: 'usage', label: 'Usage Reference' }
        ]} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />

      {activeTab === 'types' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {seasonTypes.map(type => (
            <div key={type.id} style={{ backgroundColor: 'var(--surface-base)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              {/* Type Header */}
              <div 
                style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', backgroundColor: expandedTypes.includes(type.id) ? 'var(--surface-base)' : 'var(--surface-base)', borderBottom: expandedTypes.includes(type.id) ? '1px solid var(--color-border)' : 'none' }}
                onClick={() => toggleExpand(type.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  {expandedTypes.includes(type.id) ? <ChevronDown size={20} className="text-muted" /> : <ChevronRight size={20} className="text-muted" />}
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: type.color }}></div>
                  <span className="text-subsection-title">{type.name}</span>
                  <Badge variant={type.status === 'Active' ? 'success' : 'neutral'}>{type.status}</Badge>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span className="text-body-bold">{type.periodCount}</span>
                    <span className="text-caption text-muted">Periods</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span className="text-body-bold">{type.usageCount}</span>
                    <span className="text-caption text-muted">Usage</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span className="text-body-bold">{type.createdDate}</span>
                    <span className="text-caption text-muted">Created</span>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu
                      triggerLabel=""
                      items={[
                        { id: 'add_period', label: 'Add Period', icon: <Plus size={16} />, onClick: () => setIsPeriodModalOpen(true) },
                        { id: 'edit', label: 'Edit Type', icon: <Edit size={16} />, onClick: () => setIsTypeModalOpen(true) },
                        { id: 'view_usage', label: 'View Usage', icon: <Eye size={16} />, onClick: () => setActiveTab('usage') },
                        { id: 'archive', label: 'Archive Type', icon: <Archive size={16} />, disabled: type.usageCount > 0, danger: true, onClick: () => setConfirmDialog({ isOpen: true, title: 'Archive Season Type', message: `Are you sure you want to archive "${type.name}"? This will make it unavailable for new package pricing.`, onConfirm: () => setConfirmDialog(prev => ({ ...prev, isOpen: false })) }) },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Nested Periods */}
              {expandedTypes.includes(type.id) && (
                <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border-default)' }}>
                  {type.periods.length === 0 ? (
                    <div style={{ padding: 'var(--space-6)', textAlign: 'center', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-sm)' }}>
                      <p className="text-body text-muted" style={{ marginBottom: 'var(--space-3)' }}>No periods configured for this season type.</p>
                      <Button variant="secondary" size="sm" onClick={() => setIsPeriodModalOpen(true)}>Add Period</Button>
                    </div>
                  ) : (
                    <DataTable
                      data={type.periods}
                      columns={[
                        { header: 'Period Name', accessor: (row) => <span className="text-body-bold">{row.name}</span> },
                        { header: 'Start Date', accessor: (row) => <span className="text-body">{row.startDate}</span> },
                        { header: 'End Date', accessor: (row) => <span className="text-body">{row.endDate}</span> },
                        { header: 'Duration', accessor: (row) => <span className="text-body">{row.duration} Days</span> },
                        { header: 'Status', accessor: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'neutral'}>{row.status}</Badge> },
                        { header: 'Last Updated', accessor: (row) => <span className="text-body">{row.lastUpdated}</span> },
                        { header: 'Action', align: 'right', accessor: (row) => (
                          <DropdownMenu
                            triggerLabel=""
                            items={[
                              { id: 'edit', label: 'Edit Period', icon: <Edit size={16} />, onClick: () => setIsPeriodModalOpen(true) },
                              { id: 'deactivate', label: 'Deactivate', icon: <PowerOff size={16} />, onClick: () => {} },
                              { id: 'archive', label: 'Archive', icon: <Archive size={16} />, danger: true, onClick: () => {} },
                            ]}
                          />
                        )}
                      ]}
                      keyExtractor={(row) => row.id}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'usage' && (
        <div style={{ backgroundColor: 'var(--surface-base)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Usage Reference</h2>
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
            columns={[
              { header: 'Usage Type', accessor: (row) => <span className="text-body-bold">{row.type}</span> },
              { header: 'Agency', accessor: (row) => <span className="text-body">{row.agency}</span> },
              { header: 'Related Record', accessor: (row) => <span className="text-body">{row.record}</span> },
              { header: 'Departure', accessor: (row) => <span className="text-body">{row.date}</span> },
              { header: 'Snapshot', accessor: (row) => <Badge variant="primary">{row.snapshot}</Badge> },
              { header: 'Status', accessor: (row) => <Badge variant="neutral">{row.status}</Badge> },
              { header: 'Last Updated', accessor: (row) => <span className="text-body">{row.lastUpdated}</span> },
              { header: 'Action', align: 'right', accessor: (row) => <Button variant="ghost" size="sm">View Record</Button> }
            ]}
            keyExtractor={(row) => row.id}
          />
        </div>
      )}

      {/* Modals */}
      {isTypeModalOpen && <SeasonTypeModal onClose={() => setIsTypeModalOpen(false)} />}
      {isPeriodModalOpen && <SeasonPeriodModal onClose={() => setIsPeriodModalOpen(false)} />}
    </div>
  );
};
