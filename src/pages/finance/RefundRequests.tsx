import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { AgencyProfileCell } from '../../components/data-display/AgencyProfileCell';
import { RotateCcw, Clock, CheckCircle, XCircle, AlertTriangle, Download, Info, Eye, RefreshCcw, ChevronRight } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

// PRD Section 11: Refund Requests

export const RefundRequests: React.FC<{ navigate: (route: string, data?: any) => void; showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

  // PRD: Reason — Cancellation, Overpayment, Service Issue, Duplicate Payment, Other

const initialRefundList = [
  {
    "id": "ref_1",
    "bookingId": "BK-1001",
    "customer": "Siti Aminah",
    "agency": "Global Travel Agency",
    "amount": "RM 1500",
    "reason": "Medical emergency",
    "status": "Rejected",
    "requestedDate": "11 Nov 2026"
  },
  {
    "id": "ref_2",
    "bookingId": "BK-1002",
    "customer": "Mohammad Ali",
    "agency": "Zamzam Travels",
    "amount": "RM 2000",
    "reason": "Visa issue",
    "status": "Pending Review",
    "requestedDate": "12 Nov 2026"
  },
  {
    "id": "ref_3",
    "bookingId": "BK-1003",
    "customer": "Budi Santoso",
    "agency": "Global Travel Agency",
    "amount": "RM 2500",
    "reason": "Personal reasons",
    "status": "Approved",
    "requestedDate": "13 Nov 2026"
  },
  {
    "id": "ref_4",
    "bookingId": "BK-1004",
    "customer": "Fatimah Zahra",
    "agency": "Zamzam Travels",
    "amount": "RM 3000",
    "reason": "Schedule change",
    "status": "Rejected",
    "requestedDate": "14 Nov 2026"
  },
  {
    "id": "ref_5",
    "bookingId": "BK-1005",
    "customer": "Zulkifli Harun",
    "agency": "Global Travel Agency",
    "amount": "RM 3500",
    "reason": "Flight cancellation",
    "status": "Pending Review",
    "requestedDate": "15 Nov 2026"
  },
  {
    "id": "ref_6",
    "bookingId": "BK-1006",
    "customer": "Ahmad Abdullah",
    "agency": "Zamzam Travels",
    "amount": "RM 4000",
    "reason": "Medical emergency",
    "status": "Approved",
    "requestedDate": "16 Nov 2026"
  },
  {
    "id": "ref_7",
    "bookingId": "BK-1007",
    "customer": "Siti Aminah",
    "agency": "Global Travel Agency",
    "amount": "RM 4500",
    "reason": "Visa issue",
    "status": "Rejected",
    "requestedDate": "17 Nov 2026"
  },
  {
    "id": "ref_8",
    "bookingId": "BK-1008",
    "customer": "Mohammad Ali",
    "agency": "Zamzam Travels",
    "amount": "RM 5000",
    "reason": "Personal reasons",
    "status": "Pending Review",
    "requestedDate": "18 Nov 2026"
  },
  {
    "id": "ref_9",
    "bookingId": "BK-1009",
    "customer": "Budi Santoso",
    "agency": "Global Travel Agency",
    "amount": "RM 5500",
    "reason": "Schedule change",
    "status": "Approved",
    "requestedDate": "19 Nov 2026"
  },
  {
    "id": "ref_10",
    "bookingId": "BK-1010",
    "customer": "Fatimah Zahra",
    "agency": "Zamzam Travels",
    "amount": "RM 6000",
    "reason": "Flight cancellation",
    "status": "Rejected",
    "requestedDate": "20 Nov 2026"
  },
  {
    "id": "ref_11",
    "bookingId": "BK-1011",
    "customer": "Zulkifli Harun",
    "agency": "Global Travel Agency",
    "amount": "RM 6500",
    "reason": "Medical emergency",
    "status": "Pending Review",
    "requestedDate": "21 Nov 2026"
  },
  {
    "id": "ref_12",
    "bookingId": "BK-1012",
    "customer": "Ahmad Abdullah",
    "agency": "Zamzam Travels",
    "amount": "RM 7000",
    "reason": "Visa issue",
    "status": "Approved",
    "requestedDate": "22 Nov 2026"
  },
  {
    "id": "ref_13",
    "bookingId": "BK-1013",
    "customer": "Siti Aminah",
    "agency": "Global Travel Agency",
    "amount": "RM 7500",
    "reason": "Personal reasons",
    "status": "Rejected",
    "requestedDate": "23 Nov 2026"
  },
  {
    "id": "ref_14",
    "bookingId": "BK-1014",
    "customer": "Mohammad Ali",
    "agency": "Zamzam Travels",
    "amount": "RM 8000",
    "reason": "Schedule change",
    "status": "Pending Review",
    "requestedDate": "24 Nov 2026"
  },
  {
    "id": "ref_15",
    "bookingId": "BK-1015",
    "customer": "Budi Santoso",
    "agency": "Global Travel Agency",
    "amount": "RM 8500",
    "reason": "Flight cancellation",
    "status": "Approved",
    "requestedDate": "25 Nov 2026"
  },
  {
    "id": "ref_16",
    "bookingId": "BK-1016",
    "customer": "Fatimah Zahra",
    "agency": "Zamzam Travels",
    "amount": "RM 9000",
    "reason": "Medical emergency",
    "status": "Rejected",
    "requestedDate": "26 Nov 2026"
  },
  {
    "id": "ref_17",
    "bookingId": "BK-1017",
    "customer": "Zulkifli Harun",
    "agency": "Global Travel Agency",
    "amount": "RM 9500",
    "reason": "Visa issue",
    "status": "Pending Review",
    "requestedDate": "27 Nov 2026"
  },
  {
    "id": "ref_18",
    "bookingId": "BK-1018",
    "customer": "Ahmad Abdullah",
    "agency": "Zamzam Travels",
    "amount": "RM 10000",
    "reason": "Personal reasons",
    "status": "Approved",
    "requestedDate": "28 Nov 2026"
  }
];

  const { data: refundList, remove } = useLocalStorageCrud('refund', initialRefundList);

  const columns = [
    { header: 'Refund ID', accessor: 'id' as const, sortable: true },
    { header: 'Booking ID', accessor: 'bookingId' as const, sortable: true },
    { 
      header: 'Customer', 
      accessor: (row: typeof refundList[0]) => (
        <UserProfileCell 
          name={row.customer} 
          isVerified={true} 
        />
      )
    },
    { 
      header: 'Travel Agency', 
      accessor: (row: typeof refundList[0]) => {
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
    { header: 'Amount', accessor: 'amount' as const, sortable: true },
    { header: 'Reason', accessor: 'reason' as const },
    { 
      header: 'Status', 
      accessor: (row: typeof refundList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Approved') variant = 'success';
        if (row.status === 'Pending Review') variant = 'warning';
        if (row.status === 'Rejected') variant = 'danger';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    { header: 'Requested Date', accessor: 'requestedDate' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: typeof refundList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => console.log('View', row.id) },
            { id: 'approve', label: 'Approve Refund', icon: <CheckCircle size={16} />, onClick: () => console.log('Approve', row.id) },
            { id: 'reject', label: 'Delete Request', icon: <XCircle size={16} />, onClick: () => { if(window.confirm('Are you sure?')) remove(row.id) }, variant: 'danger' }
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Refund Status', icon: <RefreshCcw size={16} />,
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'need-info', label: 'Need Info' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'refunded', label: 'Refunded' },
      ]
    },
    {
      id: 'reason',
      label: 'Reason',
      options: [
        { value: 'cancellation', label: 'Cancellation' },
        { value: 'overpayment', label: 'Overpayment' },
        { value: 'service-issue', label: 'Service Issue' },
        { value: 'duplicate', label: 'Duplicate Payment' },
        { value: 'other', label: 'Other' },
      ]
    },
    {
      id: 'source',
      label: 'Refund Source', icon: <RefreshCcw size={16} />,
      options: [
        { value: 'invoice', label: 'Invoice' },
        { value: 'booking', label: 'Booking' },
        { value: 'payment', label: 'Payment' },
        { value: 'manual', label: 'Manual' },
      ]
    }
  ];

  // Summary stats
  const totalPending = refundList.filter(r => r.status === 'Pending Review').length;
  const totalApproved = refundList.filter(r => r.status === 'Approved').length;
  const totalRefunded = refundList.filter(r => r.status === 'Refunded').length;
  const totalRejected = refundList.filter(r => r.status === 'Rejected').length;
  const totalPendingAmount = refundList.filter(r => r.status === 'Pending Review').reduce((sum, r) => sum + parseInt(r.amount.replace(/\\D/g, ''), 10), 0);
  const totalApprovedAmount = refundList.filter(r => r.status === 'Approved').reduce((sum, r) => sum + parseInt(r.amount.replace(/\\D/g, ''), 10), 0);
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
  } = useDataFilter(refundList, {
    defaultSort: { key: 'requestDate', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Refund Requests"
        breadcrumbs={[{ label: 'Finance Management' }, { label: 'Refund Requests' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export</Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard title="Pending Review" value={totalPending} icon={<Clock size={20} className="text-warning" />} iconBg="var(--color-warning-light)" trend="neutral" trendValue={`RM ${totalPendingAmount.toLocaleString()} total`} />
        <MetricCard title="Need Info" value={refundList.filter(r => r.status === 'Need Info').length} icon={<Info size={20} className="text-primary" />} iconBg="var(--color-primary-light)" trend="neutral" trendValue="Awaiting customer response" />
        <MetricCard title="Approved (Pending Refund)" value={totalApproved} icon={<CheckCircle size={20} className="text-success" />} iconBg="var(--color-success-light)" trend="neutral" trendValue={`RM ${totalApprovedAmount.toLocaleString()} to process`} />
        <MetricCard title="Refunded / Closed" value={totalRefunded + totalRejected} icon={<RotateCcw size={20} className="text-muted" />} iconBg="var(--gray-100)" trend="neutral" trendValue={`${totalRefunded} refunded, ${totalRejected} rejected`} />
      </div>

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by refund ID, customer, or invoice..."
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
        selectedKeys={selectedItems}
        onSelectionChange={setSelectedItems}
        emptyStateTitle="No refund requests found"
      />
    </div>
  );
};
