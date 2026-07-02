import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { DataTable } from '../../../components/data-display/DataTable';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { FilterBar } from '../../../components/inputs/FilterBar';
import { Download, CheckCircle, FileText, MoreVertical, Ban } from 'lucide-react';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';

export const TARefundList: React.FC<{ navigate: (path: string, state?: any) => void }> = ({ navigate }) => {
  const [refunds, setRefunds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/ta/finance/refunds');
      setRefunds(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      accessor: (row: any) => row.invoice?.invoiceNumber || '-',
      header: 'Original Invoice'
    },
    { accessor: (row: any) => `RM ${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, header: 'Refund Amount' },
    { accessor: (row: any) => <span className="text-sm text-gray-600">{row.reason || '-'}</span>, header: 'Reason' },
    { 
      accessor: (row: any) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-',
      header: 'Requested At'
    },
    { 
      accessor: (row: any) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' | 'info' = 'neutral';
        if (row.status === 'completed') variant = 'success';
        if (row.status === 'refund_pending') variant = 'warning';
        if (row.status === 'rejected') variant = 'danger';
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
            { id: 'view_invoice', label: 'View Invoice', icon: <FileText size={16} />, onClick: () => navigate('ta-finance-invoice-details', { id: row.invoiceId }) },
            { id: 'approve', label: 'Approve Refund', icon: <CheckCircle size={16} />, disabled: row.status !== 'pending', onClick: () => {} },
            { id: 'reject', label: 'Reject Refund', icon: <Ban size={16} />, disabled: row.status !== 'pending', onClick: () => {} }
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
        { label: 'Completed', value: 'completed' },
        { label: 'Pending', value: 'refund_pending' },
        { label: 'Rejected', value: 'rejected' }
      ]
    }
  ];

  const filteredRefunds = refunds.filter(ref => {
    if (search && !ref.invoice?.invoiceNumber.toLowerCase().includes(search.toLowerCase()) && !ref.reason?.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilters.status && activeFilters.status !== ref.status && activeFilters.status !== 'all') return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Refunds & Adjustments" 
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export</Button>
            <Button variant="primary">Process Refund</Button>
          </div>
        }
      />

      <FilterBar
        onSearch={setSearch}
        searchPlaceholder="Search by invoice or reason..."
        groups={filterGroups}
        activeFilters={activeFilters}
        onFilterChange={(groupId, value) => setActiveFilters(prev => ({ ...prev, [groupId]: value }))}
      />

      <DataTable
        columns={columns}
        data={filteredRefunds}
        isLoading={loading}
        keyExtractor={(row) => row.id}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        emptyStateTitle="No refund requests found"
        emptyStateDescription="Try adjusting your filters or search terms."
      />
    </div>
  );
};
