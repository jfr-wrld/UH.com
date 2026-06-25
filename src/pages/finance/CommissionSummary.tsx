import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { AgencyProfileCell } from '../../components/data-display/AgencyProfileCell';
import { TrendingUp, Users, Building, Package, Download, Eye, Percent, CheckCircle, ChevronRight } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

// PRD Section 12: Commission Summary

export const CommissionSummary: React.FC<{ navigate: (route: string, data?: any) => void; showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

  // PRD: Commission Types — Platform, Agent, Public, Travel Agency
  // PRD: Commission Status — Pending, Earned, Reversed, Settlement Ready, Settled
const initialCommissionList = [
  {
    "id": "comm_1",
    "bookingId": "BK-1001",
    "agency": "Global Travel Agency",
    "packageName": "Standard Haji Package",
    "totalPrice": 16500,
    "commissionRate": "5%",
    "commissionAmount": 825,
    "payoutStatus": "Processing",
    "date": "11 Nov 2026"
  },
  {
    "id": "comm_2",
    "bookingId": "BK-1002",
    "agency": "Zamzam Travels",
    "packageName": "Standard Haji Package",
    "totalPrice": 18000,
    "commissionRate": "5%",
    "commissionAmount": 900,
    "payoutStatus": "Pending",
    "date": "12 Nov 2026"
  },
  {
    "id": "comm_3",
    "bookingId": "BK-1003",
    "agency": "Global Travel Agency",
    "packageName": "Premium Umrah Safar",
    "totalPrice": 19500,
    "commissionRate": "5%",
    "commissionAmount": 975,
    "payoutStatus": "Paid",
    "date": "13 Nov 2026"
  },
  {
    "id": "comm_4",
    "bookingId": "BK-1004",
    "agency": "Zamzam Travels",
    "packageName": "Standard Haji Package",
    "totalPrice": 21000,
    "commissionRate": "5%",
    "commissionAmount": 1050,
    "payoutStatus": "Processing",
    "date": "14 Nov 2026"
  },
  {
    "id": "comm_5",
    "bookingId": "BK-1005",
    "agency": "Global Travel Agency",
    "packageName": "Standard Haji Package",
    "totalPrice": 22500,
    "commissionRate": "5%",
    "commissionAmount": 1125,
    "payoutStatus": "Pending",
    "date": "15 Nov 2026"
  },
  {
    "id": "comm_6",
    "bookingId": "BK-1006",
    "agency": "Zamzam Travels",
    "packageName": "Premium Umrah Safar",
    "totalPrice": 24000,
    "commissionRate": "5%",
    "commissionAmount": 1200,
    "payoutStatus": "Paid",
    "date": "16 Nov 2026"
  },
  {
    "id": "comm_7",
    "bookingId": "BK-1007",
    "agency": "Global Travel Agency",
    "packageName": "Standard Haji Package",
    "totalPrice": 25500,
    "commissionRate": "5%",
    "commissionAmount": 1275,
    "payoutStatus": "Processing",
    "date": "17 Nov 2026"
  },
  {
    "id": "comm_8",
    "bookingId": "BK-1008",
    "agency": "Zamzam Travels",
    "packageName": "Standard Haji Package",
    "totalPrice": 27000,
    "commissionRate": "5%",
    "commissionAmount": 1350,
    "payoutStatus": "Pending",
    "date": "18 Nov 2026"
  },
  {
    "id": "comm_9",
    "bookingId": "BK-1009",
    "agency": "Global Travel Agency",
    "packageName": "Premium Umrah Safar",
    "totalPrice": 28500,
    "commissionRate": "5%",
    "commissionAmount": 1425,
    "payoutStatus": "Paid",
    "date": "19 Nov 2026"
  },
  {
    "id": "comm_10",
    "bookingId": "BK-1010",
    "agency": "Zamzam Travels",
    "packageName": "Standard Haji Package",
    "totalPrice": 30000,
    "commissionRate": "5%",
    "commissionAmount": 1500,
    "payoutStatus": "Processing",
    "date": "20 Nov 2026"
  },
  {
    "id": "comm_11",
    "bookingId": "BK-1011",
    "agency": "Global Travel Agency",
    "packageName": "Standard Haji Package",
    "totalPrice": 31500,
    "commissionRate": "5%",
    "commissionAmount": 1575,
    "payoutStatus": "Pending",
    "date": "21 Nov 2026"
  },
  {
    "id": "comm_12",
    "bookingId": "BK-1012",
    "agency": "Zamzam Travels",
    "packageName": "Premium Umrah Safar",
    "totalPrice": 33000,
    "commissionRate": "5%",
    "commissionAmount": 1650,
    "payoutStatus": "Paid",
    "date": "22 Nov 2026"
  },
  {
    "id": "comm_13",
    "bookingId": "BK-1013",
    "agency": "Global Travel Agency",
    "packageName": "Standard Haji Package",
    "totalPrice": 34500,
    "commissionRate": "5%",
    "commissionAmount": 1725,
    "payoutStatus": "Processing",
    "date": "23 Nov 2026"
  },
  {
    "id": "comm_14",
    "bookingId": "BK-1014",
    "agency": "Zamzam Travels",
    "packageName": "Standard Haji Package",
    "totalPrice": 36000,
    "commissionRate": "5%",
    "commissionAmount": 1800,
    "payoutStatus": "Pending",
    "date": "24 Nov 2026"
  },
  {
    "id": "comm_15",
    "bookingId": "BK-1015",
    "agency": "Global Travel Agency",
    "packageName": "Premium Umrah Safar",
    "totalPrice": 37500,
    "commissionRate": "5%",
    "commissionAmount": 1875,
    "payoutStatus": "Paid",
    "date": "25 Nov 2026"
  },
  {
    "id": "comm_16",
    "bookingId": "BK-1016",
    "agency": "Zamzam Travels",
    "packageName": "Standard Haji Package",
    "totalPrice": 39000,
    "commissionRate": "5%",
    "commissionAmount": 1950,
    "payoutStatus": "Processing",
    "date": "26 Nov 2026"
  },
  {
    "id": "comm_17",
    "bookingId": "BK-1017",
    "agency": "Global Travel Agency",
    "packageName": "Standard Haji Package",
    "totalPrice": 40500,
    "commissionRate": "5%",
    "commissionAmount": 2025,
    "payoutStatus": "Pending",
    "date": "27 Nov 2026"
  },
  {
    "id": "comm_18",
    "bookingId": "BK-1018",
    "agency": "Zamzam Travels",
    "packageName": "Premium Umrah Safar",
    "totalPrice": 42000,
    "commissionRate": "5%",
    "commissionAmount": 2100,
    "payoutStatus": "Paid",
    "date": "28 Nov 2026"
  }
];

  const { data: commissionList, remove } = useLocalStorageCrud('commission', initialCommissionList);

  const columns = [
    { header: 'Commission ID', accessor: 'id' as const, sortable: true },
    { header: 'Booking ID', accessor: 'bookingId' as const, sortable: true },
    { 
      header: 'Travel Agency', 
      accessor: (row: typeof commissionList[0]) => {
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
      header: 'Total Price', 
      accessor: (row: typeof commissionList[0]) => (
        <span>RM {row.totalPrice.toLocaleString()}</span>
      ),
      sortable: true
    },
    { header: 'Rate', accessor: 'commissionRate' as const },
    { 
      header: 'Commission Amount', 
      accessor: (row: typeof commissionList[0]) => (
        <span>RM {row.commissionAmount.toLocaleString()}</span>
      ),
      sortable: true
    },
    { 
      header: 'Payout Status', 
      accessor: (row: typeof commissionList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.payoutStatus === 'Paid') variant = 'success';
        if (row.payoutStatus === 'Processing') variant = 'warning';
        if (row.payoutStatus === 'Pending') variant = 'neutral';
        return <Badge variant={getStatusBadgeVariant(row.payoutStatus)}>{row.payoutStatus}</Badge>;
      }
    },
    { header: 'Date', accessor: 'date' as const, sortable: true },
    {
      header: 'Actions',
      accessor: (row: typeof commissionList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => console.log('View', row.id) },
            { id: 'approve', label: 'Approve Payout', icon: <CheckCircle size={16} />, onClick: () => console.log('Approve', row.id) },
            { id: 'delete', label: 'Delete', icon: <Percent size={16} />, onClick: () => { if(window.confirm('Are you sure?')) remove(row.id) }, danger: true }
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'type',
      label: 'Commission Type',
      options: [
        { value: 'platform', label: 'Platform Commission' },
        { value: 'agent', label: 'Agent Commission' },
        { value: 'public', label: 'Public Commission' },
        { value: 'ta', label: 'Travel Agency Commission' },
      ]
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'earned', label: 'Earned' },
        { value: 'reversed', label: 'Reversed' },
        { value: 'settlement-ready', label: 'Settlement Ready' },
        { value: 'settled', label: 'Settled' },
      ]
    }
  ];

  // Summary calculations
  const totalEarned = commissionList.filter(c => c.payoutStatus === 'Earned' || c.payoutStatus === 'Settlement Ready' || c.payoutStatus === 'Settled' || c.payoutStatus === 'Paid').reduce((s, c) => s + c.commissionAmount, 0);
  const totalPending = commissionList.filter(c => c.payoutStatus === 'Pending' || c.payoutStatus === 'Processing').reduce((s, c) => s + c.commissionAmount, 0);
  const totalReversed = commissionList.filter(c => c.payoutStatus === 'Reversed').reduce((s, c) => s + c.commissionAmount, 0);
  const totalSettlementReady = commissionList.filter(c => c.payoutStatus === 'Settlement Ready').reduce((s, c) => s + c.commissionAmount, 0);
  // Using a dummy condition for platform vs agent since type is missing from mock
  const platformCount = commissionList.filter(c => c.agency === 'Global Travel Agency').length;
  const agentCount = commissionList.filter(c => c.agency !== 'Global Travel Agency').length;
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
  } = useDataFilter(commissionList, {
    defaultSort: { key: 'period', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Commission Summary"
        breadcrumbs={[{ label: 'Finance Management' }, { label: 'Commission Summary' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export Report</Button>
          </div>
        }
      />

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Earned" value={`RM ${totalEarned.toLocaleString()}`} icon={<TrendingUp size={20} className="text-success" />} iconBg="var(--color-success-light)" trend="neutral" trendValue={`${commissionList.filter(c => ['Earned','Settlement Ready','Settled', 'Paid'].includes(c.payoutStatus)).length} commissions`} />
        <MetricCard title="Pending Verification" value={`RM ${totalPending.toLocaleString()}`} icon={<Percent size={20} className="text-warning" />} iconBg="var(--color-warning-light)" trend="neutral" trendValue="Awaiting payment verification" />
        <MetricCard title="Settlement Ready" value={`RM ${totalSettlementReady.toLocaleString()}`} icon={<Eye size={20} className="text-primary" />} iconBg="var(--color-primary-light)" trend="neutral" trendValue="Ready for finance processing" />
        <MetricCard title="Reversed" value={`RM ${totalReversed.toLocaleString()}`} icon={<Building size={20} className="text-danger" />} iconBg="var(--color-danger-light)" className="text-danger" />
        <div className="metric-card" style={{ backgroundColor: 'var(--color-primary-light)', border: '1px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span className="text-caption" style={{ color: 'var(--color-primary-dark)', fontWeight: 600 }}>Commission Split</span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'baseline', marginTop: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)', fontSize: '24px', lineHeight: 1 }}>{platformCount}</span>
              <span className="text-caption" style={{ color: 'var(--color-primary-dark)', marginTop: '4px' }}>Platform</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)', fontSize: '24px', lineHeight: 1 }}>{agentCount}</span>
              <span className="text-caption" style={{ color: 'var(--color-primary-dark)', marginTop: '4px' }}>Agent/Other</span>
            </div>
          </div>
        </div>
      </div>

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by commission ID, agency, or package..."
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
        emptyStateTitle="No commission records found"
      />
    </div>
  );
};
