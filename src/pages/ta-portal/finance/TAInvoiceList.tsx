import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { DataTable } from '../../../components/data-display/DataTable';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { FilterBar } from '../../../components/inputs/FilterBar';
import { Plus, Download, FileText, Share2, MoreVertical } from 'lucide-react';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';

export const TAInvoiceList: React.FC<{ navigate: (path: string, state?: any) => void }> = ({ navigate }) => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/ta/finance/invoices');
      setInvoices(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { accessor: (row: any) => row.invoiceNumber, header: 'Invoice Number', sortable: true },
    { accessor: (row: any) => <span className="capitalize">{row.invoiceType?.replace('_', ' ')}</span>, header: 'Type' },
    { accessor: (row: any) => `RM ${row.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, header: 'Total Amount' },
    { accessor: (row: any) => `RM ${row.paidAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, header: 'Paid Amount' },
    { accessor: (row: any) => <span className={row.outstandingAmount > 0 ? 'text-danger font-medium' : ''}>RM {row.outstandingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>, header: 'Outstanding' },
    { 
      accessor: (row: any) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' | 'info' = 'neutral';
        if (row.status === 'paid') variant = 'success';
        if (row.status === 'partial') variant = 'info';
        if (row.status === 'overdue') variant = 'danger';
        if (row.status === 'sent') variant = 'warning';
        return <Badge variant={variant} className="capitalize">{row.status}</Badge>;
      },
      header: 'Status'
    },
    { 
      accessor: (row: any) => (
        <DropdownMenu
          variant="ghost"
          iconOnly
          items={[
            { id: 'view', label: 'View Details', icon: <FileText size={16} />, onClick: () => navigate('ta-finance-invoice-details', { id: row.id }) },
            { id: 'send', label: 'Send to Customer', icon: <Share2 size={16} />, onClick: () => {} }
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
        { label: 'Paid', value: 'paid' },
        { label: 'Partial', value: 'partial' },
        { label: 'Sent', value: 'sent' },
        { label: 'Overdue', value: 'overdue' },
        { label: 'Draft', value: 'draft' }
      ]
    },
    {
      id: 'type',
      label: 'Invoice Type',
      options: [
        { label: 'Booking', value: 'booking_invoice' },
        { label: 'Manual', value: 'manual_invoice' }
      ]
    }
  ];

  const filteredInvoices = invoices.filter(inv => {
    if (search && !inv.invoiceNumber.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilters.status && activeFilters.status !== inv.status && activeFilters.status !== 'all') return false;
    if (activeFilters.type && activeFilters.type !== inv.invoiceType && activeFilters.type !== 'all') return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Invoices" 
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export List</Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('ta-finance-invoice-create')}>Create Invoice</Button>
          </div>
        }
      />

      <FilterBar
        onSearch={setSearch}
        searchPlaceholder="Search by invoice number or customer..."
        groups={filterGroups}
        activeFilters={activeFilters}
        onFilterChange={(groupId, value) => setActiveFilters(prev => ({ ...prev, [groupId]: value }))}
      />

      <DataTable
        columns={columns}
        data={filteredInvoices}
        isLoading={loading}
        keyExtractor={(row) => row.id}
        onRowClick={(row) => navigate('ta-finance-invoice-details', { id: row.id })}
        emptyStateTitle="No invoices found"
        emptyStateDescription="Try adjusting your filters or search terms."
      />
    </div>
  );
};
