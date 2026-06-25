import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Download, TrendingUp, AlertTriangle, CheckCircle, Clock, Percent, Eye, ChevronRight, FileText, Send } from 'lucide-react';
import { AgencyProfileCell } from '../../components/data-display/AgencyProfileCell';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const PaymentList: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast }) => {
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [paymentList, setPaymentList] = useState<any[]>([]);

  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3001/api/billing/payments');
      if (res.ok) {
        const data = await res.json();
        setPaymentList(data.map((p: any) => ({
          id: p.id,
          invoiceId: p.invoice.invoiceNumber,
          agency: p.invoice.travelAgencyId || 'Direct Customer',
          packageName: 'Standard Safar Package', // Hardcoded as we don't have package data yet
          amount: p.amount,
          method: p.paymentMethod,
          status: p.status,
          date: new Date(p.createdAt).toLocaleDateString()
        })));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleVerify = async (paymentId: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/billing/payments/${paymentId}/verify`, {
        method: 'POST'
      });
      if (res.ok) {
        fetchPayments();
        if (showToast) showToast('Payment Verified', `Payment ${paymentId} has been successfully verified.`, 'success');
      } else {
        const error = await res.json();
        if (showToast) showToast('Verification Failed', error.error || 'Failed to verify payment', 'error');
        else alert(error.error || 'Failed to verify');
      }
    } catch (err) {
      console.error(err);
      if (showToast) showToast('Network Error', 'Could not communicate with the server.', 'error');
      else alert('Network error');
    }
  };


  const columns = [
    { header: 'Payment ID', accessor: 'id' as const, sortable: true },
    { header: 'Invoice ID', accessor: 'invoiceId' as const, sortable: true },
    { 
      header: 'Travel Agency', 
      accessor: (row: typeof paymentList[0]) => {
        const logo = row.agency === 'Zamzam Travels' ? 'https://picsum.photos/seed/452/150/150' : null;
        const isVerified = ['Ansar Medina', 'Salam Travel', 'Kauthar Travel', 'Global Travel Agency'].includes(row.agency);
        return (
          <AgencyProfileCell 
            name={row.agency} 
            logo={logo} 
            isVerified={isVerified} 
          />
        );
      }
    },
    { header: 'Package Name', accessor: 'packageName' as const, sortable: true },
    { 
      header: 'Amount', 
      accessor: (row: typeof paymentList[0]) => (
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>RM {row.amount.toLocaleString()}</span>
      ),
      sortable: true
    },
    { header: 'Payment Method', accessor: 'method' as const, sortable: true },
    { 
      header: 'Status', 
      accessor: (row: typeof paymentList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'VERIFIED') variant = 'success';
        if (row.status === 'PENDING') variant = 'warning';
        if (row.status === 'FAILED') variant = 'danger';
        return <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>;
      }
    },
    { header: 'Date', accessor: 'date' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: typeof paymentList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'invoice', label: 'View Invoice', icon: <FileText size={16} className="text-primary" />, onClick: () => navigate('billing-invoice-details', { id: row.invoiceId }) },
            { id: 'receipt', label: 'Download Receipt', icon: <Download size={16} className="text-success" />, onClick: () => { if (showToast) showToast('Downloading Receipt', `Receipt for ${row.id} is generating...`, 'info') } },
            ...(row.status === 'PENDING' ? [
              { id: 'verify', label: 'Verify Payment', icon: <CheckCircle size={16} className="text-warning" />, onClick: () => { if(window.confirm('Verify this payment? This action is audit-sensitive.')) handleVerify(row.id) } },
              { id: 'reminder', label: 'Send Reminder', icon: <Send size={16} className="text-info" />, onClick: () => { if(showToast) showToast('Reminder Sent', `Payment reminder sent to ${row.agency}.`, 'success') } }
            ] : [])
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Invoice Status',
      options: [
        { value: 'paid', label: 'Paid' },
        { value: 'partial', label: 'Partially Paid' },
        { value: 'overdue', label: 'Overdue' },
        { value: 'sent', label: 'Sent / Open' },
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
  } = useDataFilter(paymentList, {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Billing & Payment Operations"
        breadcrumbs={[{ label: 'Finance' }, { label: 'Billing' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <ExportControl data={filteredData} filename="payment-list" />
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('billing-invoice-create')}>Create Invoice</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Invoiced" value="RM 1.2M" icon={<TrendingUp size={20} className="text-primary" />} iconBg="var(--color-primary-light)" />
        <MetricCard title="Collected" value="RM 850K" icon={<CheckCircle size={20} className="text-success" />} iconBg="var(--color-success-light)" />
        <MetricCard title="Outstanding" value="RM 350K" icon={<Clock size={20} className="text-warning" />} iconBg="var(--color-warning-light)" />
        <MetricCard title="Overdue" value="RM 45K" icon={<AlertTriangle size={20} className="text-danger" />} iconBg="var(--color-danger-light)" />
        <MetricCard title="Platform Commission" value="RM 42.5K" icon={<Percent size={20} className="text-primary-dark" />} iconBg="var(--color-primary-light)" />
      </div>

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by invoice ID, booker, or package..."
      />

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
        columns={columns}
        keyExtractor={(r) => r.id}
        isLoading={isLoading}
        selectedKeys={selectedPayments}
        onSelectionChange={setSelectedPayments}
        emptyStateTitle="No invoices found"
      />
    </div>
  );
};
