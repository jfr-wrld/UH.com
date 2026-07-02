import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { DataTable } from '../../../components/data-display/DataTable';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { FilterBar } from '../../../components/inputs/FilterBar';
import { Download, CheckCircle, FileText, MoreVertical, Plus } from 'lucide-react';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';
import { RecordPaymentModal } from '../../../components/finance/RecordPaymentModal';

export const TAPaymentList: React.FC<{ navigate: (path: string, state?: any) => void }> = ({ navigate }) => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/ta/finance/payments');
      setPayments(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { accessor: (row: any) => row.paymentReference, header: 'Payment Ref', sortable: true },
    { 
      accessor: (row: any) => row.invoice?.invoiceNumber || '-',
      header: 'Invoice'
    },
    { accessor: (row: any) => `RM ${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, header: 'Amount' },
    { 
      accessor: (row: any) => <span className="capitalize">{row.paymentMethod?.replace('_', ' ')}</span>,
      header: 'Method'
    },
    { 
      accessor: (row: any) => row.paidAt ? new Date(row.paidAt).toLocaleDateString() : '-',
      header: 'Payment Date'
    },
    { 
      accessor: (row: any) => (
        <Badge variant={row.status === 'verified' ? 'success' : 'warning'} className="capitalize">
          {row.status}
        </Badge>
      ),
      header: 'Status'
    },
    { 
      accessor: (row: any) => (
        <DropdownMenu
          variant="ghost"
          iconOnly
          items={[
            { id: 'view_invoice', label: 'View Invoice', icon: <FileText size={16} />, onClick: () => navigate('ta-finance-invoice-details', { id: row.invoiceId }) },
            { id: 'verify', label: 'Verify Payment', icon: <CheckCircle size={16} />, disabled: row.status === 'verified', onClick: () => {} }
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
        { label: 'Verified', value: 'verified' },
        { label: 'Pending Review', value: 'pending_review' },
        { label: 'Rejected', value: 'rejected' }
      ]
    },
    {
      id: 'method',
      label: 'Payment Method',
      options: [
        { label: 'Bank Transfer', value: 'bank_transfer' },
        { label: 'FPX', value: 'fpx' },
        { label: 'Cash', value: 'cash' },
        { label: 'Card', value: 'card' }
      ]
    }
  ];

  const filteredPayments = payments.filter(pay => {
    if (search && !pay.paymentReference?.toLowerCase().includes(search.toLowerCase()) && !pay.invoice?.invoiceNumber.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilters.status && activeFilters.status !== pay.status && activeFilters.status !== 'all') return false;
    if (activeFilters.method && activeFilters.method !== pay.paymentMethod && activeFilters.method !== 'all') return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Payments" 
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export List</Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => setIsPaymentModalOpen(true)}>Record Payment</Button>
          </div>
        }
      />

      <FilterBar
        onSearch={setSearch}
        searchPlaceholder="Search by reference or invoice..."
        groups={filterGroups}
        activeFilters={activeFilters}
        onFilterChange={(groupId, value) => setActiveFilters(prev => ({ ...prev, [groupId]: value }))}
      />

      <DataTable
        columns={columns}
        data={filteredPayments}
        isLoading={loading}
        keyExtractor={(row) => row.id}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        emptyStateTitle="No payments found"
        emptyStateDescription="Try adjusting your filters or search terms."
      />
      
      <RecordPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={() => {
          // Refetch payments or show success message
        }}
      />
    </div>
  );
};
