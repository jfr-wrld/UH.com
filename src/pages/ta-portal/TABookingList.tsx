import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { MetricCard } from '../../components/data-display/MetricCard';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { Plus, Download, Eye, Edit, XCircle, FileText, CheckCircle2, CreditCard, Send, Users, DollarSign, Calendar, Archive } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

const initialBookings = [
  {
    id: 'tabk_1', code: 'BK-AH-001', bookerName: 'Ahmad Faizal bin Ismail', bookerEmail: 'ahmad.faizal@gmail.com', bookerPhone: '+60 12-345-6789',
    package: 'Umrah Reguler 9 Hari', schedule: '15 Dec 2026', participants: 2, bookingType: 'Family', roomType: 'Double',
    totalAmount: 'RM 15,780', paidAmount: 'RM 15,780', balance: 'RM 0',
    status: 'Confirmed', payment: 'Paid', allocation: 'Allocated', createdAt: '01 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_2', code: 'BK-AH-002', bookerName: 'Siti Nurhaliza binti Abdullah', bookerEmail: 'siti.nurhaliza@gmail.com', bookerPhone: '+60 13-456-7890',
    package: 'Umrah Plus Turki 12 Hari', schedule: '20 Jan 2027', participants: 4, bookingType: 'Family', roomType: 'Quad',
    totalAmount: 'RM 42,000', paidAmount: 'RM 20,000', balance: 'RM 22,000',
    status: 'Partially Paid', payment: 'Partial', allocation: 'Unallocated', createdAt: '05 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_3', code: 'BK-AH-003', bookerName: 'Mohammad Rizal bin Yusof', bookerEmail: 'rizal.yusof@yahoo.com', bookerPhone: '+60 11-234-5678',
    package: 'Haji Furoda 2026', schedule: '01 Jun 2027', participants: 1, bookingType: 'Individual', roomType: 'Double',
    totalAmount: 'RM 75,000', paidAmount: 'RM 0', balance: 'RM 75,000',
    status: 'Pending Payment', payment: 'Unpaid', allocation: 'Unallocated', createdAt: '10 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_4', code: 'BK-AH-004', bookerName: 'Fatimah binti Hassan', bookerEmail: 'fatimah.hassan@gmail.com', bookerPhone: '+60 19-876-5432',
    package: 'Umrah Ramadhan Akhir', schedule: '10 Mar 2027', participants: 3, bookingType: 'Family', roomType: 'Triple',
    totalAmount: 'RM 36,000', paidAmount: 'RM 36,000', balance: 'RM 0',
    status: 'Confirmed', payment: 'Paid', allocation: 'Allocated', createdAt: '12 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_5', code: 'BK-AH-005', bookerName: 'Zulkifli bin Osman', bookerEmail: 'zulkifli.osman@hotmail.com', bookerPhone: '+60 17-654-3210',
    package: 'Umrah Reguler 9 Hari', schedule: '15 Dec 2026', participants: 6, bookingType: 'Group', roomType: 'Quad',
    totalAmount: 'RM 47,340', paidAmount: 'RM 10,000', balance: 'RM 37,340',
    status: 'Partially Paid', payment: 'Partial', allocation: 'Unallocated', createdAt: '15 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_6', code: 'BK-AH-006', bookerName: 'Nurul Ain binti Razak', bookerEmail: 'nurul.ain@gmail.com', bookerPhone: '+60 16-543-2109',
    package: 'Umrah Plus Turki 12 Hari', schedule: '20 Jan 2027', participants: 2, bookingType: 'Family', roomType: 'Double',
    totalAmount: 'RM 21,000', paidAmount: 'RM 21,000', balance: 'RM 0',
    status: 'Confirmed', payment: 'Paid', allocation: 'Unallocated', createdAt: '18 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_7', code: 'BK-AH-007', bookerName: 'Hasan bin Abdul Rahman', bookerEmail: 'hasan.ar@gmail.com', bookerPhone: '+60 14-321-0987',
    package: 'Umrah Reguler 9 Hari', schedule: '15 Dec 2026', participants: 1, bookingType: 'Individual', roomType: 'Triple',
    totalAmount: 'RM 7,290', paidAmount: 'RM 0', balance: 'RM 7,290',
    status: 'Draft', payment: 'Not Invoiced', allocation: 'Unallocated', createdAt: '20 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_8', code: 'BK-AH-008', bookerName: 'Kartini binti Mohamad', bookerEmail: 'kartini.m@yahoo.com', bookerPhone: '+60 18-210-9876',
    package: 'Umrah Ramadhan Akhir', schedule: '10 Mar 2027', participants: 2, bookingType: 'Family', roomType: 'Double',
    totalAmount: 'RM 24,000', paidAmount: 'RM 24,000', balance: 'RM 0',
    status: 'Cancelled', payment: 'Refunded', allocation: 'Unallocated', createdAt: '22 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_9', code: 'BK-AH-009', bookerName: 'Adi Putra bin Zainal', bookerEmail: 'adi.putra@gmail.com', bookerPhone: '+60 15-109-8765',
    package: 'Haji Furoda 2026', schedule: '01 Jun 2027', participants: 2, bookingType: 'Family', roomType: 'Double',
    totalAmount: 'RM 150,000', paidAmount: 'RM 50,000', balance: 'RM 100,000',
    status: 'Pending Payment', payment: 'Partial', allocation: 'Unallocated', createdAt: '25 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_10', code: 'BK-AH-010', bookerName: 'Wan Azizah binti Wan Ibrahim', bookerEmail: 'wan.azizah@gmail.com', bookerPhone: '+60 12-098-7654',
    package: 'Umrah Reguler 9 Hari', schedule: '15 Dec 2026', participants: 5, bookingType: 'Group', roomType: 'Quad',
    totalAmount: 'RM 39,450', paidAmount: 'RM 39,450', balance: 'RM 0',
    status: 'Confirmed', payment: 'Paid', allocation: 'Allocated', createdAt: '27 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_11', code: 'BK-AH-011', bookerName: 'Ismail bin Bakar', bookerEmail: 'ismail.bakar@hotmail.com', bookerPhone: '+60 13-987-6543',
    package: 'Umrah Reguler 9 Hari', schedule: '15 Dec 2026', participants: 1, bookingType: 'Individual', roomType: 'Quad',
    totalAmount: 'RM 6,890', paidAmount: 'RM 1,500', balance: 'RM 5,390',
    status: 'Pending Payment', payment: 'Deposit Paid', allocation: 'Unallocated', createdAt: '28 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tabk_12', code: 'BK-AH-012', bookerName: 'Rohana binti Sulaiman', bookerEmail: 'rohana.s@gmail.com', bookerPhone: '+60 11-876-5432',
    package: 'Umrah Plus Turki 12 Hari', schedule: '20 Jan 2027', participants: 3, bookingType: 'Family', roomType: 'Triple',
    totalAmount: 'RM 31,500', paidAmount: 'RM 0', balance: 'RM 31,500',
    status: 'Cancel Requested', payment: 'Unpaid', allocation: 'Unallocated', createdAt: '29 Jun 2026', agency: 'Al-Hijrah Travel'
  }
];

export const TABookingList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const { data: bookingList, remove } = useLocalStorageCrud('ta-booking', initialBookings);

  const columns = [
    { header: 'Booking ID', accessor: 'code' as const, sortable: true },
    {
      header: 'Primary Booker',
      accessor: (row: any) => (
        <UserProfileCell name={row.bookerName} email={row.bookerEmail} isVerified={row.status === 'Confirmed' || row.status === 'Allocated'} />
      )
    },
    { header: 'Package', accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-medium">{row.package}</span>
          <span className="text-caption text-muted" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={11} /> {row.schedule}</span>
        </div>
      )
    },
    {
      header: 'Pax',
      accessor: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Users size={14} style={{ color: 'var(--gray-500)' }} />
          <span>{row.participants}</span>
          <Badge variant="neutral">{row.bookingType}</Badge>
        </div>
      )
    },
    { header: 'Room', accessor: 'roomType' as const },
    { header: 'Total', accessor: 'totalAmount' as const, sortable: true },
    {
      header: 'Paid / Balance',
      accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: '13px' }}>
          <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>{row.paidAmount}</span>
          {row.balance !== 'RM 0' && <span style={{ color: 'var(--color-danger)', fontSize: '12px' }}>{row.balance} due</span>}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (row: any) => {
        const map: Record<string, 'success' | 'warning' | 'danger' | 'neutral' | 'info'> = {
          'Confirmed': 'success', 'Allocated': 'success', 'Partially Paid': 'warning',
          'Pending Payment': 'warning', 'Draft': 'neutral', 'Cancelled': 'danger',
          'Cancel Requested': 'danger', 'Refunded': 'info'
        };
        return <Badge variant={map[row.status] || 'neutral'}>{row.status}</Badge>;
      }
    },
    {
      header: 'Payment',
      accessor: (row: any) => {
        const map: Record<string, 'success' | 'warning' | 'danger' | 'neutral' | 'info'> = {
          'Paid': 'success', 'Partial': 'warning', 'Deposit Paid': 'warning',
          'Unpaid': 'danger', 'Overdue': 'danger', 'Not Invoiced': 'neutral', 'Refunded': 'info'
        };
        return <Badge variant={map[row.payment] || 'neutral'}>{row.payment}</Badge>;
      }
    },
    {
      header: 'Allocation',
      accessor: (row: any) => (
        <Badge variant={row.allocation === 'Allocated' ? 'success' : 'neutral'}>{row.allocation}</Badge>
      )
    },
    { header: 'Created', accessor: 'createdAt' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: any) => (
        <DropdownMenu
          variant="ghost"
          iconOnly
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('ta-booking-details', { id: row.id }) },
            { id: 'edit', label: 'Edit Booking', icon: <Edit size={16} />, onClick: () => {} },
            { id: 'invoice', label: 'Generate Invoice', icon: <FileText size={16} />, onClick: () => {} },
            { id: 'remind', label: 'Send Reminder', icon: <Send size={16} />, onClick: () => {} },
            { id: 'cancel', label: 'Cancel Booking', icon: <XCircle size={16} />, onClick: () => { if(window.confirm('Cancel this booking?')) remove(row.id); }, danger: true },
            { id: 'archive', label: 'Archive', icon: <Archive size={16} />, onClick: () => {} },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status', label: 'Booking Status',
      options: [
        { value: 'Draft', label: 'Draft' },
        { value: 'Pending Payment', label: 'Pending Payment' },
        { value: 'Partially Paid', label: 'Partially Paid' },
        { value: 'Confirmed', label: 'Confirmed' },
        { value: 'Allocated', label: 'Allocated' },
        { value: 'Cancel Requested', label: 'Cancel Requested' },
        { value: 'Cancelled', label: 'Cancelled' },
      ]
    },
    {
      id: 'payment', label: 'Payment Status',
      options: [
        { value: 'Paid', label: 'Paid' },
        { value: 'Partial', label: 'Partially Paid' },
        { value: 'Deposit Paid', label: 'Deposit Paid' },
        { value: 'Unpaid', label: 'Unpaid' },
        { value: 'Not Invoiced', label: 'Not Invoiced' },
        { value: 'Refunded', label: 'Refunded' },
      ]
    },
    {
      id: 'bookingType', label: 'Booking Type',
      options: [
        { value: 'Individual', label: 'Individual' },
        { value: 'Family', label: 'Family' },
        { value: 'Group', label: 'Group' },
      ]
    }
  ];

  const {
    searchQuery, setSearchQuery, activeFilters, handleFilterChange,
    clearFilters, hasActiveFilters, filteredData, totalItems,
    currentPage, totalPages, rowsPerPage, onPageChange, onRowsPerPageChange,
    sortKey, sortOrder, onSort
  } = useDataFilter(bookingList, {
    defaultSort: { key: 'createdAt', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: false
  });

  const totalBookings = bookingList.length;
  const confirmedCount = bookingList.filter((b: any) => b.status === 'Confirmed' || b.status === 'Allocated').length;
  const pendingPaymentCount = bookingList.filter((b: any) => b.status === 'Pending Payment' || b.status === 'Partially Paid').length;
  const cancelCount = bookingList.filter((b: any) => b.status === 'Cancelled' || b.status === 'Cancel Requested').length;
  const outstandingTotal = bookingList.reduce((sum: number, b: any) => {
    const bal = parseInt(String(b.balance).replace(/[^\d]/g, '') || '0');
    return sum + bal;
  }, 0);

  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader
        title="Booking Management"
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export</Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('ta-booking-create')}>Create Booking</Button>
          </div>
        }
      />

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Bookings" value={totalBookings.toString()} trend="up" trendValue="+8%" icon={<FileText />} iconBg="var(--color-primary-light)" accentColor="var(--color-primary)" />
        <MetricCard title="Confirmed" value={confirmedCount.toString()} trend="up" trendValue="+12%" icon={<CheckCircle2 />} iconBg="var(--color-success-light)" accentColor="var(--color-success)" />
        <MetricCard title="Pending Payment" value={pendingPaymentCount.toString()} trend="down" trendValue="-3%" icon={<CreditCard />} iconBg="var(--color-warning-light)" accentColor="var(--color-warning)" />
        <MetricCard title="Outstanding Balance" value={`RM ${outstandingTotal.toLocaleString()}`} trend="neutral" trendValue="" icon={<DollarSign />} iconBg="#FEF3C7" accentColor="#D97706" />
        <MetricCard title="Cancel / Refund" value={cancelCount.toString()} trend="neutral" trendValue="0" icon={<XCircle />} iconBg="var(--color-danger-light)" accentColor="var(--color-danger)" />
      </div>

      <FilterBar
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by booking ID, booker name, or package..."
      />

      {selectedBookings.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedBookings.length} bookings selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm">Export Selected</Button>
            <Button variant="secondary" size="sm">Send Reminder</Button>
          </div>
        </div>
      )}

      <DataTable
        onRowClick={(row: any) => navigate('ta-booking-details', { id: row.id })}
        data={filteredData}
        sort={{ key: sortKey, order: sortOrder, onSort }}
        pagination={{ currentPage, totalPages, rowsPerPage, totalItems, onPageChange, onRowsPerPageChange }}
        columns={columns}
        keyExtractor={(r: any) => r.id}
        isLoading={isLoading}
        selectedKeys={selectedBookings}
        onSelectionChange={setSelectedBookings}
        emptyStateTitle="No bookings found"
        emptyStateDescription="Create your first booking to get started."
      />
    </div>
  );
};
