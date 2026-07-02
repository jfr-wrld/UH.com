import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { DataTable } from '../../../components/data-display/DataTable';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { FilterBar } from '../../../components/inputs/FilterBar';
import { Download, CheckCircle, FileText, MoreVertical, Eye } from 'lucide-react';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';

export const AdminPayoutList: React.FC<{ navigate: (path: string, state?: any) => void }> = ({ navigate }) => {
  const [settlements, setSettlements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSettlements();
  }, []);

  const fetchSettlements = () => {
    setLoading(true);
    // Mock data for MVP Phase 1
    setTimeout(() => {
      setSettlements([
        {
          id: 'STL-2026-06-001',
          period: 'June 2026',
          grossCollected: 155000,
          refunds: 0,
          platformCommission: 7750,
          adjustments: 0,
          netSettlement: 147250,
          status: 'completed',
          createdAt: '2026-07-01T09:00:00Z',
          bankAccount: 'Maybank Islamic Berhad (**** 1234)'
        },
        {
          id: 'STL-2026-07-PREP',
          period: 'July 2026 (MTD)',
          grossCollected: 45000,
          refunds: 2000,
          platformCommission: 2250,
          adjustments: -100,
          netSettlement: 40650,
          status: 'ready',
          createdAt: '2026-07-15T14:30:00Z',
          bankAccount: 'Maybank Islamic Berhad (**** 1234)'
        }
      ]);
      setLoading(false);
    }, 800);
  };

  const columns = [
    { accessor: (row: any) => row.id, header: 'Settlement Ref', sortable: true },
    { accessor: (row: any) => row.travelAgencyId || 'Direct Customer', header: 'Travel Agency', sortable: true },
    { accessor: (row: any) => row.period, header: 'Period' },
    { accessor: (row: any) => `RM ${row.grossCollected.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, header: 'Gross Collected' },
    { accessor: (row: any) => `RM ${row.platformCommission.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, header: 'Platform Fee' },
    { 
      accessor: (row: any) => (
        <span className="text-body-bold">
          RM {row.netSettlement.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      ), 
      header: 'Net Payout' 
    },
    { 
      accessor: (row: any) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' | 'info' = 'neutral';
        if (row.status === 'completed' || row.status === 'prepared') variant = 'success';
        if (row.status === 'ready' || row.status === 'processing') variant = 'warning';
        if (row.status === 'failed' || row.status === 'on_hold') variant = 'danger';
        return <Badge variant={variant} className="capitalize">{row.status.replace('_', ' ')}</Badge>;
      },
      header: 'Status'
    },
    { 
      accessor: (row: any) => (
        <DropdownMenu
          variant="ghost"
          iconOnly
          items={[
            { id: 'view_details', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('admin-finance-payout-details', { id: row.id }) },
            { id: 'download_report', label: 'Download Statement', icon: <Download size={16} />, disabled: row.status !== 'completed', onClick: () => {} }
          ]}
        />
      ),
      header: '', 
      width: '60px'
    }
  ];

  const filterGroups = [
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'ready', label: 'Ready' },
        { value: 'prepared', label: 'Prepared' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' }
      ]
    }
  ];

  const filteredSettlements = settlements.filter(stl => {
    if (search && !stl.id?.toLowerCase().includes(search.toLowerCase()) && !stl.period?.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilters.status && activeFilters.status !== stl.status && activeFilters.status !== 'all') return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader 
        title="Payout Management"
        subtitle="Manage payouts and settlement records."
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export List</Button>
          </div>
        }
      />

      <FilterBar
        onSearch={setSearch}
        searchPlaceholder="Search by reference or period..."
        groups={filterGroups}
        activeFilters={activeFilters}
        onFilterChange={(groupId, value) => setActiveFilters(prev => ({ ...prev, [groupId]: value }))}
      />

      <DataTable
        columns={columns}
        data={filteredSettlements}
        isLoading={loading}
        emptyStateTitle="No settlements found"
        emptyStateDescription="Try adjusting your filters or search terms."
      />
    </div>
  );
}
