import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { DataTable } from '../../components/data-display/DataTable';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { FilterBar } from '../../components/inputs/FilterBar';
import { SensitiveDataReveal } from '../../components/domain/SensitiveDataReveal';
import { Download, CheckCircle, CreditCard, CheckCircle2, ChevronRight, Clock, FileText, Send } from 'lucide-react';
import { MetricCard } from '../../components/data-display/MetricCard';
import { useDataFilter } from '../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const PayoutPreparation: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('mutawwif');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const initialMutawwifPayouts = [
  {
    "id": "po_m_1",
    "recipient": "Ustaz Don Daniyal",
    "bankRef": "CIMB 098765401",
    "source": "Trip TRP-1001 Completed",
    "amount": 3100,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "11 Nov 2026"
  },
  {
    "id": "po_m_2",
    "recipient": "Ustaz Kazim Elias",
    "bankRef": "Maybank 123456702",
    "source": "Trip TRP-1002 Completed",
    "amount": 3200,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "12 Nov 2026"
  },
  {
    "id": "po_m_3",
    "recipient": "Ustaz Abdul Somad",
    "bankRef": "CIMB 098765403",
    "source": "Trip TRP-1003 Completed",
    "amount": 3300,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "13 Nov 2026"
  },
  {
    "id": "po_m_4",
    "recipient": "Ustaz Azhar Idrus",
    "bankRef": "Maybank 123456704",
    "source": "Trip TRP-1004 Completed",
    "amount": 3400,
    "currency": "MYR",
    "status": "On Hold",
    "dateReady": "14 Nov 2026"
  },
  {
    "id": "po_m_5",
    "recipient": "Ustaz Don Daniyal",
    "bankRef": "CIMB 098765405",
    "source": "Trip TRP-1005 Completed",
    "amount": 3500,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "15 Nov 2026"
  },
  {
    "id": "po_m_6",
    "recipient": "Ustaz Kazim Elias",
    "bankRef": "Maybank 123456706",
    "source": "Trip TRP-1006 Completed",
    "amount": 3600,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "16 Nov 2026"
  },
  {
    "id": "po_m_7",
    "recipient": "Ustaz Abdul Somad",
    "bankRef": "CIMB 098765407",
    "source": "Trip TRP-1007 Completed",
    "amount": 3700,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "17 Nov 2026"
  },
  {
    "id": "po_m_8",
    "recipient": "Ustaz Azhar Idrus",
    "bankRef": "Maybank 123456708",
    "source": "Trip TRP-1008 Completed",
    "amount": 3800,
    "currency": "MYR",
    "status": "On Hold",
    "dateReady": "18 Nov 2026"
  },
  {
    "id": "po_m_9",
    "recipient": "Ustaz Don Daniyal",
    "bankRef": "CIMB 098765409",
    "source": "Trip TRP-1009 Completed",
    "amount": 3900,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "19 Nov 2026"
  },
  {
    "id": "po_m_10",
    "recipient": "Ustaz Kazim Elias",
    "bankRef": "Maybank 123456710",
    "source": "Trip TRP-1010 Completed",
    "amount": 4000,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "20 Nov 2026"
  },
  {
    "id": "po_m_11",
    "recipient": "Ustaz Abdul Somad",
    "bankRef": "CIMB 098765411",
    "source": "Trip TRP-1011 Completed",
    "amount": 4100,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "21 Nov 2026"
  },
  {
    "id": "po_m_12",
    "recipient": "Ustaz Azhar Idrus",
    "bankRef": "Maybank 123456712",
    "source": "Trip TRP-1012 Completed",
    "amount": 4200,
    "currency": "MYR",
    "status": "On Hold",
    "dateReady": "22 Nov 2026"
  },
  {
    "id": "po_m_13",
    "recipient": "Ustaz Don Daniyal",
    "bankRef": "CIMB 098765413",
    "source": "Trip TRP-1013 Completed",
    "amount": 4300,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "23 Nov 2026"
  },
  {
    "id": "po_m_14",
    "recipient": "Ustaz Kazim Elias",
    "bankRef": "Maybank 123456714",
    "source": "Trip TRP-1014 Completed",
    "amount": 4400,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "24 Nov 2026"
  },
  {
    "id": "po_m_15",
    "recipient": "Ustaz Abdul Somad",
    "bankRef": "CIMB 098765415",
    "source": "Trip TRP-1015 Completed",
    "amount": 4500,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "25 Nov 2026"
  },
  {
    "id": "po_m_16",
    "recipient": "Ustaz Azhar Idrus",
    "bankRef": "Maybank 123456716",
    "source": "Trip TRP-1016 Completed",
    "amount": 4600,
    "currency": "MYR",
    "status": "On Hold",
    "dateReady": "26 Nov 2026"
  },
  {
    "id": "po_m_17",
    "recipient": "Ustaz Don Daniyal",
    "bankRef": "CIMB 098765417",
    "source": "Trip TRP-1017 Completed",
    "amount": 4700,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "27 Nov 2026"
  },
  {
    "id": "po_m_18",
    "recipient": "Ustaz Kazim Elias",
    "bankRef": "Maybank 123456718",
    "source": "Trip TRP-1018 Completed",
    "amount": 4800,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "28 Nov 2026"
  }
];

  const initialAgentPayouts = [
  {
    "id": "po_a_1",
    "recipient": "Agent Partner 1",
    "bankRef": "RHB 1122334401",
    "source": "Commission: INV-2026-001",
    "amount": 550,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "11 Nov 2026"
  },
  {
    "id": "po_a_2",
    "recipient": "Agent Partner 2",
    "bankRef": "RHB 1122334402",
    "source": "Commission: INV-2026-002",
    "amount": 600,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "12 Nov 2026"
  },
  {
    "id": "po_a_3",
    "recipient": "Agent Partner 3",
    "bankRef": "RHB 1122334403",
    "source": "Commission: INV-2026-003",
    "amount": 650,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "13 Nov 2026"
  },
  {
    "id": "po_a_4",
    "recipient": "Agent Partner 4",
    "bankRef": "RHB 1122334404",
    "source": "Commission: INV-2026-004",
    "amount": 700,
    "currency": "MYR",
    "status": "Paid",
    "dateReady": "14 Nov 2026"
  },
  {
    "id": "po_a_5",
    "recipient": "Agent Partner 5",
    "bankRef": "RHB 1122334405",
    "source": "Commission: INV-2026-005",
    "amount": 750,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "15 Nov 2026"
  },
  {
    "id": "po_a_6",
    "recipient": "Agent Partner 6",
    "bankRef": "RHB 1122334406",
    "source": "Commission: INV-2026-006",
    "amount": 800,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "16 Nov 2026"
  },
  {
    "id": "po_a_7",
    "recipient": "Agent Partner 7",
    "bankRef": "RHB 1122334407",
    "source": "Commission: INV-2026-007",
    "amount": 850,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "17 Nov 2026"
  },
  {
    "id": "po_a_8",
    "recipient": "Agent Partner 8",
    "bankRef": "RHB 1122334408",
    "source": "Commission: INV-2026-008",
    "amount": 900,
    "currency": "MYR",
    "status": "Paid",
    "dateReady": "18 Nov 2026"
  },
  {
    "id": "po_a_9",
    "recipient": "Agent Partner 9",
    "bankRef": "RHB 1122334409",
    "source": "Commission: INV-2026-009",
    "amount": 950,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "19 Nov 2026"
  },
  {
    "id": "po_a_10",
    "recipient": "Agent Partner 10",
    "bankRef": "RHB 1122334410",
    "source": "Commission: INV-2026-010",
    "amount": 1000,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "20 Nov 2026"
  },
  {
    "id": "po_a_11",
    "recipient": "Agent Partner 11",
    "bankRef": "RHB 1122334411",
    "source": "Commission: INV-2026-011",
    "amount": 1050,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "21 Nov 2026"
  },
  {
    "id": "po_a_12",
    "recipient": "Agent Partner 12",
    "bankRef": "RHB 1122334412",
    "source": "Commission: INV-2026-012",
    "amount": 1100,
    "currency": "MYR",
    "status": "Paid",
    "dateReady": "22 Nov 2026"
  },
  {
    "id": "po_a_13",
    "recipient": "Agent Partner 13",
    "bankRef": "RHB 1122334413",
    "source": "Commission: INV-2026-013",
    "amount": 1150,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "23 Nov 2026"
  },
  {
    "id": "po_a_14",
    "recipient": "Agent Partner 14",
    "bankRef": "RHB 1122334414",
    "source": "Commission: INV-2026-014",
    "amount": 1200,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "24 Nov 2026"
  },
  {
    "id": "po_a_15",
    "recipient": "Agent Partner 15",
    "bankRef": "RHB 1122334415",
    "source": "Commission: INV-2026-015",
    "amount": 1250,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "25 Nov 2026"
  },
  {
    "id": "po_a_16",
    "recipient": "Agent Partner 16",
    "bankRef": "RHB 1122334416",
    "source": "Commission: INV-2026-016",
    "amount": 1300,
    "currency": "MYR",
    "status": "Paid",
    "dateReady": "26 Nov 2026"
  },
  {
    "id": "po_a_17",
    "recipient": "Agent Partner 17",
    "bankRef": "RHB 1122334417",
    "source": "Commission: INV-2026-017",
    "amount": 1350,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "27 Nov 2026"
  },
  {
    "id": "po_a_18",
    "recipient": "Agent Partner 18",
    "bankRef": "RHB 1122334418",
    "source": "Commission: INV-2026-018",
    "amount": 1400,
    "currency": "MYR",
    "status": "Ready",
    "dateReady": "28 Nov 2026"
  }
];

  const { data: mutawwifPayouts } = useLocalStorageCrud('payout-mutawwif', initialMutawwifPayouts);
  const { data: agentPayouts } = useLocalStorageCrud('payout-agent', initialAgentPayouts);

  const columns = [
    {
      header: 'Recipient',
      accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.recipient}</span>
          <span className="text-caption text-muted">
            {row.bankRef.split(' ')[0]} {/* Bank Name */}
            <SensitiveDataReveal 
              label="" 
              realValue={row.bankRef.substring(row.bankRef.indexOf(' ') + 1)} 
              maskedValue={`••••${row.bankRef.slice(-4)}`} 
            />
          </span>
        </div>
      )
    },
    {
      header: 'Source / Reference',
      accessor: (row: any) => (
        <span className="text-body">{row.source}</span>
      )
    },
    {
      header: 'Amount',
      accessor: (row: any) => (
        <span className="text-body-bold">{row.currency} {row.amount.toLocaleString()}</span>
      )
    },
    {
      header: 'Date Ready',
      accessor: (row: any) => (
        <span className="text-body">{row.dateReady}</span>
      )
    },
    {
      header: 'Status',
      accessor: (row: any) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Ready') variant = 'success';
        if (row.status === 'On Hold') variant = 'warning';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    }
  ];

  const tabs = [
    { id: 'mutawwif', label: 'Mutawwif Payouts (2)' },
    { id: 'commission', label: 'Agent Commissions (1)' },
    { id: 'agency', label: 'Agency Settlements (0)' }
  ];

  const currentData = activeTab === 'mutawwif' ? mutawwifPayouts : activeTab === 'commission' ? agentPayouts : [];
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
  } = useDataFilter(mutawwifPayouts, {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Payout Preparation"
        breadcrumbs={[{ label: 'Finance' }, { label: 'Payouts' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<Download size={16} />}>Export Bank File</Button>
          </div>
        }
      />

      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: 'none' }}>
        <p className="text-body">This workspace gathers confirmed payables (like completed Mutawwif trips or earned commissions) that are ready to be transferred. Select items below to mark them as paid after you complete the manual bank transfers.</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={(t) => { setActiveTab(t); setSelectedItems([]); }} />

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Payouts Ready" 
          value="15" 
          trend="up" 
          trendValue="RM 85,400" 
          icon={<FileText />} 
          iconBg="var(--color-primary-light)" 
          accentColor="var(--color-primary)" 
        />
        <MetricCard 
          title="Mutawwif Fees" 
          value="12" 
          trend="up" 
          trendValue="RM 42,500" 
          icon={<CreditCard />} 
          iconBg="var(--color-info-light)" 
          accentColor="var(--color-info)" 
        />
        <MetricCard 
          title="Agency Commissions" 
          value="3" 
          trend="neutral" 
          trendValue="RM 42,900" 
          icon={<Clock />} 
          iconBg="var(--color-warning-light)" 
          accentColor="var(--color-warning)" 
        />
        <MetricCard 
          title="Processed Today" 
          value="5" 
          trend="up" 
          trendValue="RM 12,000" 
          icon={<Send />} 
          iconBg="var(--color-success-light)" 
          accentColor="var(--color-success)" 
        />
      </div>

      {selectedItems.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedItems.length} records selected for payout</span>
          <Button leftIcon={<CheckCircle size={16} />}>Mark Selected as Paid</Button>
        </div>
      )}

      <DataTable 
        data={currentData}
        columns={columns}
        keyExtractor={(r) => r.id}
        isLoading={false}
        selectedKeys={selectedItems}
        onSelectionChange={setSelectedItems}
        emptyStateTitle="No pending payouts in this category"
      />
    </div>
  );
};
