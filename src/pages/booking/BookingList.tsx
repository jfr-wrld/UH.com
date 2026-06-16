import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Filter, FileSpreadsheet, Edit, Trash2, Eye, FileText, Send, XCircle, Download, CheckCircle2, CreditCard, Archive } from 'lucide-react';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { AgencyProfileCell } from '../../components/data-display/AgencyProfileCell';
import { MetricCard } from '../../components/data-display/MetricCard';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const BookingList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

const initialBookingList = [
  {
    "id": "bk_1",
    "code": "BK-1001",
    "customer": "Siti Aminah (Family of 2)",
    "agency": "Global Travel Agency",
    "package": "Standard Safar Package",
    "price": "RM 17000",
    "status": "Confirmed",
    "payment": "Partial",
    "date": "11 Nov 2026"
  },
  {
    "id": "bk_2",
    "code": "BK-1002",
    "customer": "Mohammad Ali (Family of 3)",
    "agency": "Zamzam Travels",
    "package": "Standard Safar Package",
    "price": "RM 19000",
    "status": "Confirmed",
    "payment": "Paid",
    "date": "12 Nov 2026"
  },
  {
    "id": "bk_3",
    "code": "BK-1003",
    "customer": "Budi Santoso (Family of 4)",
    "agency": "Global Travel Agency",
    "package": "VIP Gold Umrah 2026",
    "price": "RM 21000",
    "status": "Confirmed",
    "payment": "Unpaid",
    "date": "13 Nov 2026"
  },
  {
    "id": "bk_4",
    "code": "BK-1004",
    "customer": "Fatimah Zahra (Family of 1)",
    "agency": "Zamzam Travels",
    "package": "Standard Safar Package",
    "price": "RM 23000",
    "status": "Cancelled",
    "payment": "Partial",
    "date": "14 Nov 2026"
  },
  {
    "id": "bk_5",
    "code": "BK-1005",
    "customer": "Zulkifli Harun (Family of 2)",
    "agency": "Global Travel Agency",
    "package": "Standard Safar Package",
    "price": "RM 25000",
    "status": "Pending Payment",
    "payment": "Paid",
    "date": "15 Nov 2026"
  },
  {
    "id": "bk_6",
    "code": "BK-1006",
    "customer": "Nurul Aini (Family of 3)",
    "agency": "Zamzam Travels",
    "package": "VIP Gold Umrah 2026",
    "price": "RM 27000",
    "status": "Confirmed",
    "payment": "Unpaid",
    "date": "16 Nov 2026"
  },
  {
    "id": "bk_7",
    "code": "BK-1007",
    "customer": "Adi Wijaya (Family of 4)",
    "agency": "Global Travel Agency",
    "package": "Standard Safar Package",
    "price": "RM 29000",
    "status": "Confirmed",
    "payment": "Partial",
    "date": "17 Nov 2026"
  },
  {
    "id": "bk_8",
    "code": "BK-1008",
    "customer": "Kartika Sari (Family of 1)",
    "agency": "Zamzam Travels",
    "package": "Standard Safar Package",
    "price": "RM 31000",
    "status": "Cancelled",
    "payment": "Paid",
    "date": "18 Nov 2026"
  },
  {
    "id": "bk_9",
    "code": "BK-1009",
    "customer": "Hendra Setiawan (Family of 2)",
    "agency": "Global Travel Agency",
    "package": "VIP Gold Umrah 2026",
    "price": "RM 33000",
    "status": "Confirmed",
    "payment": "Unpaid",
    "date": "19 Nov 2026"
  },
  {
    "id": "bk_10",
    "code": "BK-1010",
    "customer": "Ahmad Abdullah (Family of 3)",
    "agency": "Zamzam Travels",
    "package": "Standard Safar Package",
    "price": "RM 35000",
    "status": "Pending Payment",
    "payment": "Partial",
    "date": "20 Nov 2026"
  },
  {
    "id": "bk_11",
    "code": "BK-1011",
    "customer": "Siti Aminah (Family of 4)",
    "agency": "Global Travel Agency",
    "package": "Standard Safar Package",
    "price": "RM 37000",
    "status": "Confirmed",
    "payment": "Paid",
    "date": "21 Nov 2026"
  },
  {
    "id": "bk_12",
    "code": "BK-1012",
    "customer": "Mohammad Ali (Family of 1)",
    "agency": "Zamzam Travels",
    "package": "VIP Gold Umrah 2026",
    "price": "RM 39000",
    "status": "Cancelled",
    "payment": "Unpaid",
    "date": "22 Nov 2026"
  },
  {
    "id": "bk_13",
    "code": "BK-1013",
    "customer": "Budi Santoso (Family of 2)",
    "agency": "Global Travel Agency",
    "package": "Standard Safar Package",
    "price": "RM 41000",
    "status": "Confirmed",
    "payment": "Partial",
    "date": "23 Nov 2026"
  },
  {
    "id": "bk_14",
    "code": "BK-1014",
    "customer": "Fatimah Zahra (Family of 3)",
    "agency": "Zamzam Travels",
    "package": "Standard Safar Package",
    "price": "RM 43000",
    "status": "Confirmed",
    "payment": "Paid",
    "date": "24 Nov 2026"
  },
  {
    "id": "bk_15",
    "code": "BK-1015",
    "customer": "Zulkifli Harun (Family of 4)",
    "agency": "Global Travel Agency",
    "package": "VIP Gold Umrah 2026",
    "price": "RM 45000",
    "status": "Pending Payment",
    "payment": "Unpaid",
    "date": "25 Nov 2026"
  },
  {
    "id": "bk_16",
    "code": "BK-1016",
    "customer": "Nurul Aini (Family of 1)",
    "agency": "Zamzam Travels",
    "package": "Standard Safar Package",
    "price": "RM 47000",
    "status": "Cancelled",
    "payment": "Partial",
    "date": "26 Nov 2026"
  },
  {
    "id": "bk_17",
    "code": "BK-1017",
    "customer": "Adi Wijaya (Family of 2)",
    "agency": "Global Travel Agency",
    "package": "Standard Safar Package",
    "price": "RM 49000",
    "status": "Confirmed",
    "payment": "Paid",
    "date": "27 Nov 2026"
  },
  {
    "id": "bk_18",
    "code": "BK-1018",
    "customer": "Kartika Sari (Family of 3)",
    "agency": "Zamzam Travels",
    "package": "VIP Gold Umrah 2026",
    "price": "RM 51000",
    "status": "Confirmed",
    "payment": "Unpaid",
    "date": "28 Nov 2026"
  }
];

  const { data: bookingList, remove } = useLocalStorageCrud('booking', initialBookingList);

  const columns = [
    { header: 'Booking ID', accessor: 'code' as const, sortable: true },
    { 
      header: 'Customer', 
      accessor: (row: typeof bookingList[0]) => (
        <UserProfileCell 
          name={row.customer} 
          isVerified={true} 
        />
      )
    },
    { 
      header: 'Travel Agency', 
      accessor: (row: typeof bookingList[0]) => {
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
    { header: 'Package', accessor: 'package' as const, sortable: true },
    { header: 'Price', accessor: 'price' as const, sortable: true },
    {
      header: 'Status',
      accessor: (row: typeof bookingList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Confirmed') variant = 'success';
        if (row.status === 'Pending Payment') variant = 'warning';
        if (row.status === 'Cancelled') variant = 'danger';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    {
      header: 'Payment',
      accessor: (row: typeof bookingList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.payment === 'Paid') variant = 'success';
        if (row.payment === 'Partial') variant = 'warning';
        if (row.payment === 'Unpaid') variant = 'danger';
        return <Badge variant={variant}>{row.payment}</Badge>;
      }
    },
    {
      header: 'Allocation',
      accessor: (row: typeof bookingList[0]) => {
        // Mock allocation status based on status for now
        const isAllocated = row.status === 'Confirmed' && row.payment === 'Paid';
        return <Badge variant={isAllocated ? 'success' : 'neutral'}>{isAllocated ? 'Allocated' : 'Unallocated'}</Badge>;
      }
    },
    { header: 'Date', accessor: 'date' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: typeof bookingList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Booking Details', icon: <Eye size={16} />, onClick: () => navigate('booking-details', { id: row.id }) },
            { id: 'edit', label: 'Edit Booking', icon: <Edit size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'allocate', label: 'Allocate to Group Trip', onClick: () => console.log('Allocate', row.id) },
            { id: 'cancel', label: 'Delete Booking', icon: <XCircle size={16} />, onClick: () => { if(window.confirm('Are you sure?')) remove(row.id) }, variant: 'danger' },
            { id: 'archive', label: 'Archive Booking', icon: <Archive size={16} />, onClick: () => console.log('Archive', row.id) },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Booking Status',
      options: [
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'pending_payment', label: 'Pending Payment' },
        { value: 'allocated', label: 'Allocated' },
        { value: 'cancelled', label: 'Cancelled' },
      ]
    },
    {
      id: 'payment',
      label: 'Payment Status',
      options: [
        { value: 'paid', label: 'Paid' },
        { value: 'partial', label: 'Partially Paid' },
        { value: 'unpaid', label: 'Unpaid' },
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
  } = useDataFilter(bookingList, {
    defaultSort: { key: 'createdAt', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Booking Management"
        breadcrumbs={[{ label: 'Home' }, { label: 'Bookings' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export List</Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('booking-create')}>Create Booking</Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Bookings" 
          value={bookingList.length.toString()} 
          trend="up" 
          trendValue="+15%" 
          icon={<FileText />} 
          iconBg="var(--color-primary-light)" 
          accentColor="var(--color-primary)" 
        />
        <MetricCard 
          title="Confirmed" 
          value={bookingList.filter(b => b.status === 'Confirmed').length.toString()} 
          trend="up" 
          trendValue="+5%" 
          icon={<CheckCircle2 />} 
          iconBg="var(--color-success-light)" 
          accentColor="var(--color-success)" 
        />
        <MetricCard 
          title="Pending Payment" 
          value={bookingList.filter(b => b.status === 'Pending Payment').length.toString()} 
          trend="down" 
          trendValue="-2%" 
          icon={<CreditCard />} 
          iconBg="var(--color-warning-light)" 
          accentColor="var(--color-warning)" 
        />
        <MetricCard 
          title="Cancelled" 
          value={bookingList.filter(b => b.status === 'Cancelled').length.toString()} 
          trend="neutral" 
          trendValue="0" 
          icon={<XCircle />} 
          iconBg="var(--color-danger-light)" 
          accentColor="var(--color-danger)" 
        />
      </div>

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by booking ID, booker, or package..."
      />

      {selectedBookings.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedBookings.length} bookings selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={() => console.log('Export')}>Export Selected</Button>
          </div>
        </div>
      )}

      <DataTable
        onRowClick={(row: any) => navigate('booking-details', { id: row.id })} 
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
        selectedKeys={selectedBookings}
        onSelectionChange={setSelectedBookings}
        emptyStateTitle="No bookings found"
      />
    </div>
  );
};
