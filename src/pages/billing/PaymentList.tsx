import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Download, TrendingUp, AlertTriangle, CheckCircle, Clock, Percent, Eye, ChevronRight } from 'lucide-react';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';

export const PaymentList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

  // Mock Data
  const paymentList = [
  {
    "id": "pay_1",
    "invoiceId": "INV-2026-001",
    "agency": "Global Travel Agency",
    "packageName": "Standard Safar Package",
    "amount": 6500,
    "method": "Credit Card",
    "status": "Success",
    "date": "11 Nov 2026"
  },
  {
    "id": "pay_2",
    "invoiceId": "INV-2026-002",
    "agency": "Zamzam Travels",
    "packageName": "Standard Safar Package",
    "amount": 8000,
    "method": "FPX",
    "status": "Success",
    "date": "12 Nov 2026"
  },
  {
    "id": "pay_3",
    "invoiceId": "INV-2026-003",
    "agency": "Global Travel Agency",
    "packageName": "VIP Gold Umrah",
    "amount": 9500,
    "method": "Bank Transfer",
    "status": "Success",
    "date": "13 Nov 2026"
  },
  {
    "id": "pay_4",
    "invoiceId": "INV-2026-004",
    "agency": "Zamzam Travels",
    "packageName": "Standard Safar Package",
    "amount": 11000,
    "method": "Credit Card",
    "status": "Failed",
    "date": "14 Nov 2026"
  },
  {
    "id": "pay_5",
    "invoiceId": "INV-2026-005",
    "agency": "Global Travel Agency",
    "packageName": "Standard Safar Package",
    "amount": 12500,
    "method": "FPX",
    "status": "Refunded",
    "date": "15 Nov 2026"
  },
  {
    "id": "pay_6",
    "invoiceId": "INV-2026-006",
    "agency": "Zamzam Travels",
    "packageName": "VIP Gold Umrah",
    "amount": 14000,
    "method": "Bank Transfer",
    "status": "Success",
    "date": "16 Nov 2026"
  },
  {
    "id": "pay_7",
    "invoiceId": "INV-2026-007",
    "agency": "Global Travel Agency",
    "packageName": "Standard Safar Package",
    "amount": 15500,
    "method": "Credit Card",
    "status": "Success",
    "date": "17 Nov 2026"
  },
  {
    "id": "pay_8",
    "invoiceId": "INV-2026-008",
    "agency": "Zamzam Travels",
    "packageName": "Standard Safar Package",
    "amount": 17000,
    "method": "FPX",
    "status": "Failed",
    "date": "18 Nov 2026"
  },
  {
    "id": "pay_9",
    "invoiceId": "INV-2026-009",
    "agency": "Global Travel Agency",
    "packageName": "VIP Gold Umrah",
    "amount": 18500,
    "method": "Bank Transfer",
    "status": "Success",
    "date": "19 Nov 2026"
  },
  {
    "id": "pay_10",
    "invoiceId": "INV-2026-010",
    "agency": "Zamzam Travels",
    "packageName": "Standard Safar Package",
    "amount": 20000,
    "method": "Credit Card",
    "status": "Refunded",
    "date": "20 Nov 2026"
  },
  {
    "id": "pay_11",
    "invoiceId": "INV-2026-011",
    "agency": "Global Travel Agency",
    "packageName": "Standard Safar Package",
    "amount": 21500,
    "method": "FPX",
    "status": "Success",
    "date": "21 Nov 2026"
  },
  {
    "id": "pay_12",
    "invoiceId": "INV-2026-012",
    "agency": "Zamzam Travels",
    "packageName": "VIP Gold Umrah",
    "amount": 23000,
    "method": "Bank Transfer",
    "status": "Failed",
    "date": "22 Nov 2026"
  },
  {
    "id": "pay_13",
    "invoiceId": "INV-2026-013",
    "agency": "Global Travel Agency",
    "packageName": "Standard Safar Package",
    "amount": 24500,
    "method": "Credit Card",
    "status": "Success",
    "date": "23 Nov 2026"
  },
  {
    "id": "pay_14",
    "invoiceId": "INV-2026-014",
    "agency": "Zamzam Travels",
    "packageName": "Standard Safar Package",
    "amount": 26000,
    "method": "FPX",
    "status": "Success",
    "date": "24 Nov 2026"
  },
  {
    "id": "pay_15",
    "invoiceId": "INV-2026-015",
    "agency": "Global Travel Agency",
    "packageName": "VIP Gold Umrah",
    "amount": 27500,
    "method": "Bank Transfer",
    "status": "Refunded",
    "date": "25 Nov 2026"
  },
  {
    "id": "pay_16",
    "invoiceId": "INV-2026-016",
    "agency": "Zamzam Travels",
    "packageName": "Standard Safar Package",
    "amount": 29000,
    "method": "Credit Card",
    "status": "Failed",
    "date": "26 Nov 2026"
  },
  {
    "id": "pay_17",
    "invoiceId": "INV-2026-017",
    "agency": "Global Travel Agency",
    "packageName": "Standard Safar Package",
    "amount": 30500,
    "method": "FPX",
    "status": "Success",
    "date": "27 Nov 2026"
  },
  {
    "id": "pay_18",
    "invoiceId": "INV-2026-018",
    "agency": "Zamzam Travels",
    "packageName": "VIP Gold Umrah",
    "amount": 32000,
    "method": "Bank Transfer",
    "status": "Success",
    "date": "28 Nov 2026"
  }
];

  const columns = [
    { header: 'Payment ID', accessor: 'id' as const, sortable: true },
    { header: 'Invoice ID', accessor: 'invoiceId' as const, sortable: true },
    { header: 'Travel Agency', accessor: 'agency' as const, sortable: true },
    { header: 'Package Name', accessor: 'packageName' as const, sortable: true },
    { 
      header: 'Amount', 
      accessor: (row: typeof paymentList[0]) => (
        <span>RM {row.amount.toLocaleString()}</span>
      ),
      sortable: true
    },
    { header: 'Payment Method', accessor: 'method' as const, sortable: true },
    { 
      header: 'Status', 
      accessor: (row: typeof paymentList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Success') variant = 'success';
        if (row.status === 'Refunded') variant = 'warning';
        if (row.status === 'Failed') variant = 'danger';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    { header: 'Date', accessor: 'date' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: typeof paymentList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => console.log('View', row.id) },
            { id: 'invoice', label: 'View Invoice', icon: <Eye size={16} />, onClick: () => navigate('invoice-details', { id: row.invoiceId }) }
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
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export List</Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('invoice-create')}>Create Invoice</Button>
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
