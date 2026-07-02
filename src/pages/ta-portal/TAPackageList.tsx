import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Plus, Edit2, Eye, Trash2, Package, CheckCircle, FileText, AlertCircle } from 'lucide-react';
import { IconButton } from '../../components/actions/IconButton';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

interface TAPackageListProps {
  navigate: (path: string, state?: any) => void;
}

const initialPackages = [
  { id: 'PKG-001', name: 'Umrah Reguler 9 Hari', type: 'Umrah', duration: '9 Days', quota: '45/50', price: 'RM 7,890', status: 'active', agency: 'Al-Hijrah Travel' },
  { id: 'PKG-002', name: 'Umrah Plus Turki 12 Hari', type: 'Umrah Plus', duration: '12 Days', quota: '20/40', price: 'RM 10,500', status: 'active', agency: 'Al-Hijrah Travel' },
  { id: 'PKG-003', name: 'Haji Furoda 2026', type: 'Haji', duration: '25 Days', quota: '5/10', price: 'RM 75,000', status: 'draft', agency: 'Al-Hijrah Travel' },
  { id: 'PKG-004', name: 'Umrah Ramadhan Akhir', type: 'Umrah', duration: '15 Days', quota: '50/50', price: 'RM 12,000', status: 'inactive', agency: 'Al-Hijrah Travel' },
];

export const TAPackageList: React.FC<TAPackageListProps> = ({ navigate }) => {
  const { data: packageList, remove } = useLocalStorageCrud<any>('package', initialPackages);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Advanced filters state
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    category: '',
    type: '',
    status: ''
  });

  // Dynamically seed Al-Hijrah packages if storage was already populated by Admin panel packages
  useEffect(() => {
    const stored = localStorage.getItem('package');
    if (stored) {
      const list = JSON.parse(stored);
      const hasAlHijrah = list.some((p: any) => p.agency === 'Al-Hijrah Travel');
      if (!hasAlHijrah) {
        const seededList = [...initialPackages, ...list];
        localStorage.setItem('package', JSON.stringify(seededList));
        window.location.reload();
      }
    }
  }, []);

  // Filter package list by current Travel Agency ("Al-Hijrah Travel") and selected filters
  const agencyPackages = packageList.filter((p: any) => {
    // Agency match
    const isAgency = p.agency === 'Al-Hijrah Travel' || !p.agency;
    if (!isAgency) return false;

    // Search query match
    if (searchValue.trim()) {
      const q = searchValue.toLowerCase();
      const matchName = p.name?.toLowerCase().includes(q);
      const matchId = p.id?.toLowerCase().includes(q);
      if (!matchName && !matchId) return false;
    }

    // Category / Type filter
    if (activeFilters.category) {
      const cat = activeFilters.category.toLowerCase();
      const pType = p.type?.toLowerCase() || '';
      if (cat === 'umrah' && !pType.includes('umrah')) return false;
      if (cat === 'haji' && !pType.includes('haji')) return false;
    }

    // Status filter
    if (activeFilters.status) {
      const activeStat = activeFilters.status.toLowerCase();
      const pStat = p.status?.toLowerCase() || '';
      if (activeStat === 'active' && pStat !== 'active' && pStat !== 'published') return false;
      if (activeStat === 'draft' && pStat !== 'draft') return false;
      if (activeStat === 'inactive' && pStat !== 'inactive' && pStat !== 'unpublished') return false;
    }

    return true;
  });

  // Statistics calculations (scoped to all Al-Hijrah packages)
  const allAlHijrah = packageList.filter((p: any) => p.agency === 'Al-Hijrah Travel' || !p.agency);
  const totalCount = allAlHijrah.length;
  const activeCount = allAlHijrah.filter((p: any) => p.status === 'active' || p.status === 'Published').length;
  const draftCount = allAlHijrah.filter((p: any) => p.status === 'draft' || p.status === 'Draft').length;
  const inactiveCount = allAlHijrah.filter((p: any) => p.status === 'inactive' || p.status === 'Inactive' || p.status === 'Unpublished').length;

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'active' || s === 'published') {
      return <Badge variant="success">Active</Badge>;
    } else if (s === 'inactive' || s === 'unpublished') {
      return <Badge variant="warning">Inactive</Badge>;
    } else {
      return <Badge variant="neutral">Draft</Badge>;
    }
  };

  const filterGroups: FilterGroup[] = [
    {
      id: 'category',
      label: 'Category',
      options: [
        { value: 'umrah', label: 'Umrah' },
        { value: 'haji', label: 'Hajj' },
      ]
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active / Published' },
        { value: 'draft', label: 'Draft' },
        { value: 'inactive', label: 'Inactive / Unpublished' }
      ]
    }
  ];

  const columns = [
    { 
      header: 'Package ID', 
      accessor: (row: any) => (
        <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{row.id || 'TBD'}</span>
      )
    },
    { 
      header: 'Package Name', 
      accessor: (row: any) => (
        <span className="text-body-bold" style={{ color: 'var(--color-text-neutral)' }}>{row.name}</span>
      )
    },
    { header: 'Type', accessor: 'type' as const },
    { header: 'Duration', accessor: 'duration' as const },
    { 
      header: 'Quota (Filled/Total)', 
      accessor: (row: any) => (
        <span className="text-body">{row.quota || '0/50'}</span>
      )
    },
    { 
      header: 'Price (Base)', 
      accessor: (row: any) => (
        <span className="text-body-bold" style={{ color: 'var(--color-text-neutral)' }}>{row.price}</span>
      )
    },
    { header: 'Status', accessor: (row: any) => getStatusBadge(row.status) },
    {
      header: 'Actions',
      accessor: (row: any) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('ta-package-details', { id: row.id }) },
            { id: 'edit', label: 'Edit', icon: <Edit2 size={16} />, onClick: () => navigate('ta-package-create', { id: row.id }) },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, onClick: () => { if(window.confirm('Are you sure you want to delete this package?')) remove(row.id) }, danger: true },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Package Management" 
        actions={
          <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => navigate('ta-package-create')}>
            Create Package
          </Button>
        }
      />

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Packages" 
          value={String(totalCount)} 
          icon={<Package size={20} style={{ color: 'var(--color-primary)' }} />} 
          iconBg="var(--color-primary-light)" 
        />
        <MetricCard 
          title="Active / Published" 
          value={String(activeCount)} 
          icon={<CheckCircle size={20} style={{ color: 'var(--color-success)' }} />} 
          iconBg="var(--color-success-light)" 
        />
        <MetricCard 
          title="Draft Packages" 
          value={String(draftCount)} 
          icon={<FileText size={20} style={{ color: 'var(--color-warning)' }} />} 
          iconBg="var(--color-warning-light)" 
        />
        <MetricCard 
          title="Inactive / Unpublished" 
          value={String(inactiveCount)} 
          icon={<AlertCircle size={20} style={{ color: 'var(--gray-500)' }} />} 
          iconBg="var(--gray-100)" 
        />
      </div>

      <FilterBar 
        groups={filterGroups}
        onFilterChange={(groupId, value) => setActiveFilters(prev => ({ ...prev, [groupId]: value }))}
        activeFilters={activeFilters}
        onSearch={setSearchValue}
        searchValue={searchValue}
        onClearFilters={() => {
          setSearchValue('');
          setActiveFilters({ category: '', type: '', status: '' });
        }}
        hasActiveFilters={searchValue.length > 0 || Object.values(activeFilters).some(v => v !== '')}
        searchPlaceholder="Search packages by name, ID..."
      />

      {/* Data Table */}
      <DataTable 
        data={agencyPackages}
        columns={columns}
        keyExtractor={(row) => row.id}
        selectedKeys={selectedRows}
        onSelectionChange={setSelectedRows}
        onRowClick={(row) => navigate('ta-package-details', { id: row.id })}
        emptyStateTitle="No packages found"
        emptyStateDescription="Try adjusting your filters or search terms."
      />
    </div>
  );
};
