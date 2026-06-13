import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { MetricCard } from '../../components/data-display/MetricCard';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { Plus, Download, DollarSign, Clock, CheckCircle, Send, AlertCircle, FileText, Eye, ChevronRight } from 'lucide-react';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const AllowanceList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedAllowances, setSelectedAllowances] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
  }, []);

const initialAllowanceList = [
  {
    "id": "all_mut_1",
    "mutawwif": "Ustaz Don Daniyal",
    "trip": "TRP-1001",
    "role": "Lead Mutawwif",
    "allowance": 2200,
    "payout": "Cash / Bank Transfer",
    "status": "Processing"
  },
  {
    "id": "all_mut_2",
    "mutawwif": "Ustaz Kazim Elias",
    "trip": "TRP-1002",
    "role": "Lead Mutawwif",
    "allowance": 2400,
    "payout": "Cash / Bank Transfer",
    "status": "Pending"
  },
  {
    "id": "all_mut_3",
    "mutawwif": "Ustaz Abdul Somad",
    "trip": "TRP-1003",
    "role": "Assistant Leader",
    "allowance": 2600,
    "payout": "Cash / Bank Transfer",
    "status": "Paid"
  },
  {
    "id": "all_mut_4",
    "mutawwif": "Ustaz Azhar Idrus",
    "trip": "TRP-1004",
    "role": "Lead Mutawwif",
    "allowance": 2800,
    "payout": "Cash / Bank Transfer",
    "status": "Processing"
  },
  {
    "id": "all_mut_5",
    "mutawwif": "Ustaz Don Daniyal",
    "trip": "TRP-1005",
    "role": "Lead Mutawwif",
    "allowance": 3000,
    "payout": "Cash / Bank Transfer",
    "status": "Pending"
  },
  {
    "id": "all_mut_6",
    "mutawwif": "Ustaz Kazim Elias",
    "trip": "TRP-1006",
    "role": "Assistant Leader",
    "allowance": 3200,
    "payout": "Cash / Bank Transfer",
    "status": "Paid"
  },
  {
    "id": "all_mut_7",
    "mutawwif": "Ustaz Abdul Somad",
    "trip": "TRP-1007",
    "role": "Lead Mutawwif",
    "allowance": 3400,
    "payout": "Cash / Bank Transfer",
    "status": "Processing"
  },
  {
    "id": "all_mut_8",
    "mutawwif": "Ustaz Azhar Idrus",
    "trip": "TRP-1008",
    "role": "Lead Mutawwif",
    "allowance": 3600,
    "payout": "Cash / Bank Transfer",
    "status": "Pending"
  },
  {
    "id": "all_mut_9",
    "mutawwif": "Ustaz Don Daniyal",
    "trip": "TRP-1009",
    "role": "Assistant Leader",
    "allowance": 3800,
    "payout": "Cash / Bank Transfer",
    "status": "Paid"
  },
  {
    "id": "all_mut_10",
    "mutawwif": "Ustaz Kazim Elias",
    "trip": "TRP-1010",
    "role": "Lead Mutawwif",
    "allowance": 4000,
    "payout": "Cash / Bank Transfer",
    "status": "Processing"
  },
  {
    "id": "all_mut_11",
    "mutawwif": "Ustaz Abdul Somad",
    "trip": "TRP-1011",
    "role": "Lead Mutawwif",
    "allowance": 4200,
    "payout": "Cash / Bank Transfer",
    "status": "Pending"
  },
  {
    "id": "all_mut_12",
    "mutawwif": "Ustaz Azhar Idrus",
    "trip": "TRP-1012",
    "role": "Assistant Leader",
    "allowance": 4400,
    "payout": "Cash / Bank Transfer",
    "status": "Paid"
  },
  {
    "id": "all_mut_13",
    "mutawwif": "Ustaz Don Daniyal",
    "trip": "TRP-1013",
    "role": "Lead Mutawwif",
    "allowance": 4600,
    "payout": "Cash / Bank Transfer",
    "status": "Processing"
  },
  {
    "id": "all_mut_14",
    "mutawwif": "Ustaz Kazim Elias",
    "trip": "TRP-1014",
    "role": "Lead Mutawwif",
    "allowance": 4800,
    "payout": "Cash / Bank Transfer",
    "status": "Pending"
  },
  {
    "id": "all_mut_15",
    "mutawwif": "Ustaz Abdul Somad",
    "trip": "TRP-1015",
    "role": "Assistant Leader",
    "allowance": 5000,
    "payout": "Cash / Bank Transfer",
    "status": "Paid"
  },
  {
    "id": "all_mut_16",
    "mutawwif": "Ustaz Azhar Idrus",
    "trip": "TRP-1016",
    "role": "Lead Mutawwif",
    "allowance": 5200,
    "payout": "Cash / Bank Transfer",
    "status": "Processing"
  },
  {
    "id": "all_mut_17",
    "mutawwif": "Ustaz Don Daniyal",
    "trip": "TRP-1017",
    "role": "Lead Mutawwif",
    "allowance": 5400,
    "payout": "Cash / Bank Transfer",
    "status": "Pending"
  },
  {
    "id": "all_mut_18",
    "mutawwif": "Ustaz Kazim Elias",
    "trip": "TRP-1018",
    "role": "Assistant Leader",
    "allowance": 5600,
    "payout": "Cash / Bank Transfer",
    "status": "Paid"
  }
];

  const { data: allowanceList, remove } = useLocalStorageCrud('allowance', initialAllowanceList);

  const columns = [
    { header: 'Allowance ID', accessor: 'id' as const, sortable: true },
    { 
      header: 'Mutawwif', 
      accessor: (row: typeof allowanceList[0]) => (
        <UserProfileCell 
          name={row.mutawwif} 
          isVerified={true} 
        />
      )
    },
    { header: 'Trip Code', accessor: 'trip' as const, sortable: true },
    { header: 'Role', accessor: 'role' as const, sortable: true },
    { 
      header: 'Allowance', 
      accessor: (row: typeof allowanceList[0]) => (
        <span>RM {row.allowance.toLocaleString()}</span>
      ),
      sortable: true
    },
    { header: 'Payout Method', accessor: 'payout' as const },
    { 
      header: 'Status', 
      accessor: (row: typeof allowanceList[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Paid') variant = 'success';
        if (row.status === 'Processing') variant = 'warning';
        if (row.status === 'Pending') variant = 'neutral';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    {
      header: 'Actions',
      accessor: (row: typeof allowanceList[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('allowance-details', { id: row.id }) },
            { id: 'approve', label: 'Approve Payout', icon: <CheckCircle size={16} />, onClick: () => console.log('Approve', row.id) },
            { id: 'disburse', label: 'Disburse Funds', onClick: () => console.log('Disburse', row.id) },
            { id: 'delete', label: 'Delete', icon: <AlertCircle size={16} />, danger: true, onClick: () => { if(window.confirm('Are you sure?')) remove(row.id) } }
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Allowance Status',
      options: [
        { value: 'pending', label: 'Pending Approval' },
        { value: 'approved', label: 'Approved' },
        { value: 'disbursed', label: 'Disbursed' },
        { value: 'settlement-pending', label: 'Settlement Pending' },
        { value: 'settled', label: 'Settled' },
      ]
    },
    {
      id: 'type',
      label: 'Allowance Type',
      options: [
        { value: 'meal', label: 'Meal Budget' },
        { value: 'transport', label: 'Transport' },
        { value: 'mutawwif', label: 'Mutawwif Allowance' },
        { value: 'emergency', label: 'Emergency Fund' },
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
  } = useDataFilter(allowanceList, {
    defaultSort: { key: 'requestDate', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Allowance Management"
        breadcrumbs={[{ label: 'Finance' }, { label: 'Allowances' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export</Button>
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('fin-allowance-create')}>Request Allowance</Button>
          </div>
        }
      />

      {/* KPI Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Allowance" value="MYR 184K" icon={<DollarSign size={20} className="text-muted" />} iconBg="var(--gray-100)" />
        <MetricCard title="Pending Approval" value="12" icon={<Clock size={20} className="text-warning" />} iconBg="var(--color-warning-light)" />
        <MetricCard title="Approved" value="8" icon={<CheckCircle size={20} className="text-primary" />} iconBg="var(--color-primary-light)" />
        <MetricCard title="Disbursed" value="MYR 120K" icon={<Send size={20} className="text-success" />} iconBg="var(--color-success-light)" />
        <MetricCard title="Settlement Pending" value="5" icon={<FileText size={20} className="text-warning" />} iconBg="var(--color-warning-light)" />
        <MetricCard title="Overdue Settlement" value="2" icon={<AlertCircle size={20} className="text-danger" />} iconBg="var(--color-danger-light)" className="text-danger" />
      </div>

      <FilterBar 
        groups={filterGroups}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        onSearch={setSearchQuery}
        searchValue={searchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        searchPlaceholder="Search by ID, Related Record..."
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
        selectedKeys={selectedAllowances}
        onSelectionChange={setSelectedAllowances}
        emptyStateTitle="No allowances found"
      />
    </div>
  );
};
