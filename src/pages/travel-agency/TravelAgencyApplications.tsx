import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { MetricCard } from '../../components/data-display/MetricCard';
import { FileText, AlertCircle, RefreshCw, CheckCircle, Download, Plus, Building2, Eye, UserPlus, XCircle, Bell, ChevronRight } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';
import { ExportControl } from '../../components/domain/ExportControl';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const TravelAgencyApplications: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
    
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);

  const applications = [
  {
    "id": "APP-2026-001",
    "name": "Barakah Tours",
    "email": "contact@barakahtours.com",
    "submittedDate": "11 Jun 2026",
    "picName": "Fatimah Zahra",
    "picPhone": "+60123456701",
    "picEmail": "fatimahzahra@gmail.com",
    "status": "Approved"
  },
  {
    "id": "APP-2026-002",
    "name": "Kauthar Ziyarah",
    "email": "contact@kautharziyarah.com",
    "submittedDate": "12 Jun 2026",
    "picName": "Zulkifli Harun",
    "picPhone": "+60123456702",
    "picEmail": "zulkifliharun@gmail.com",
    "status": "Approved"
  },
  {
    "id": "APP-2026-003",
    "name": "Safir Medina",
    "email": "contact@safirmedina.com",
    "submittedDate": "13 Jun 2026",
    "picName": "Nurul Aini",
    "picPhone": "+60123456703",
    "picEmail": "nurulaini@gmail.com",
    "status": "Approved"
  },
  {
    "id": "APP-2026-004",
    "name": "Haramain Express",
    "email": "contact@haramainexpress.com",
    "submittedDate": "14 Jun 2026",
    "picName": "Mohammad Ali",
    "picPhone": "+60123456704",
    "picEmail": "mohammadali@gmail.com",
    "status": "Pending"
  },
  {
    "id": "APP-2026-005",
    "name": "Nusantara Haji",
    "email": "contact@nusantarahaji.com",
    "submittedDate": "15 Jun 2026",
    "picName": "Siti Aminah",
    "picPhone": "+60123456705",
    "picEmail": "sitiaminah@gmail.com",
    "status": "Revision"
  },
  {
    "id": "APP-2026-006",
    "name": "Safa Marwah Travel",
    "email": "contact@safamarwahtravel.com",
    "submittedDate": "16 Jun 2026",
    "picName": "Hendra Setiawan",
    "picPhone": "+60123456706",
    "picEmail": "hendrasetiawan@gmail.com",
    "status": "Approved"
  },
  {
    "id": "APP-2026-007",
    "name": "Quba Heritage",
    "email": "contact@qubaheritage.com",
    "submittedDate": "17 Jun 2026",
    "picName": "Kartika Sari",
    "picPhone": "+60123456707",
    "picEmail": "kartikasari@gmail.com",
    "status": "Approved"
  },
  {
    "id": "APP-2026-008",
    "name": "Raudhah Operations",
    "email": "contact@raudhahoperations.com",
    "submittedDate": "18 Jun 2026",
    "picName": "Adi Wijaya",
    "picPhone": "+60123456708",
    "picEmail": "adiwijaya@gmail.com",
    "status": "Pending"
  },
  {
    "id": "APP-2026-009",
    "name": "Baitullah Tours",
    "email": "contact@baitullahtours.com",
    "submittedDate": "19 Jun 2026",
    "picName": "Budi Santoso",
    "picPhone": "+60123456709",
    "picEmail": "budisantoso@gmail.com",
    "status": "Approved"
  },
  {
    "id": "APP-2026-010",
    "name": "Mina Travels",
    "email": "contact@minatravels.com",
    "submittedDate": "20 Jun 2026",
    "picName": "Ahmad Syakir",
    "picPhone": "+60123456710",
    "picEmail": "ahmadsyakir@gmail.com",
    "status": "Revision"
  },
  {
    "id": "APP-2026-011",
    "name": "Arafah Agency",
    "email": "contact@arafahagency.com",
    "submittedDate": "21 Jun 2026",
    "picName": "Fatimah Zahra",
    "picPhone": "+60123456711",
    "picEmail": "fatimahzahra@gmail.com",
    "status": "Approved"
  },
  {
    "id": "APP-2026-012",
    "name": "Darul Iman Tours",
    "email": "contact@darulimantours.com",
    "submittedDate": "22 Jun 2026",
    "picName": "Zulkifli Harun",
    "picPhone": "+60123456712",
    "picEmail": "zulkifliharun@gmail.com",
    "status": "Pending"
  },
  {
    "id": "APP-2026-013",
    "name": "Zamzam Medina",
    "email": "contact@zamzammedina.com",
    "submittedDate": "23 Jun 2026",
    "picName": "Nurul Aini",
    "picPhone": "+60123456713",
    "picEmail": "nurulaini@gmail.com",
    "status": "Approved"
  },
  {
    "id": "APP-2026-014",
    "name": "Darul Salam Travels",
    "email": "contact@darulsalamtravels.com",
    "submittedDate": "24 Jun 2026",
    "picName": "Mohammad Ali",
    "picPhone": "+60123456714",
    "picEmail": "mohammadali@gmail.com",
    "status": "Approved"
  },
  {
    "id": "APP-2026-015",
    "name": "Ansar Travel",
    "email": "contact@ansartravel.com",
    "submittedDate": "25 Jun 2026",
    "picName": "Siti Aminah",
    "picPhone": "+60123456715",
    "picEmail": "sitiaminah@gmail.com",
    "status": "Revision"
  },
  {
    "id": "APP-2026-016",
    "name": "Muhajirin Tours",
    "email": "contact@muhajirintours.com",
    "submittedDate": "26 Jun 2026",
    "picName": "Hendra Setiawan",
    "picPhone": "+60123456716",
    "picEmail": "hendrasetiawan@gmail.com",
    "status": "Pending"
  },
  {
    "id": "APP-2026-017",
    "name": "Sunnah Travel",
    "email": "contact@sunnahtravel.com",
    "submittedDate": "27 Jun 2026",
    "picName": "Kartika Sari",
    "picPhone": "+60123456717",
    "picEmail": "kartikasari@gmail.com",
    "status": "Approved"
  },
  {
    "id": "APP-2026-018",
    "name": "Al-Hikmah Travel",
    "email": "contact@alhikmahtravel.com",
    "submittedDate": "28 Jun 2026",
    "picName": "Adi Wijaya",
    "picPhone": "+60123456718",
    "picEmail": "adiwijaya@gmail.com",
    "status": "Approved"
  }
];

  const columns = [
    { header: 'App ID', accessor: 'id' as const, sortable: true },
    { 
      header: 'Agency Information', 
      accessor: (row: typeof applications[0]) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {(row as any).logo ? (
              <img src={(row as any).logo} alt={row.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <Building2 size={20} className="text-primary" />
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="text-body-bold">{row.name}</span>
            <a href={`mailto:${row.email}`} onClick={(e) => e.stopPropagation()} className="text-caption text-muted" style={{ textDecoration: 'none' }}>{row.email}</a>
          </div>
        </div>
      )
    },
    {
      header: 'PIC Details',
      accessor: (row: typeof applications[0]) => (
        <UserProfileCell 
          name={row.picName} 
          email={row.picEmail} 
          phone={row.picPhone} 
          isVerified={row.status === 'Approved'} 
        />
      )
    },
    { header: 'Submitted', accessor: 'submittedDate' as const, sortable: true },
    { 
      header: 'Verification Status', 
      accessor: (row: typeof applications[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Approved') variant = 'success';
        if (row.status === 'Pending') variant = 'warning';
        if (row.status === 'Revision') variant = 'danger';
        return <Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge>;
      }
    },
    {
      header: 'Doc Status',
      accessor: (row: typeof applications[0]) => (
        <Badge variant={row.status === 'Revision' ? 'warning' : 'success'}>
          {row.status === 'Revision' ? 'Incomplete' : 'Complete'}
        </Badge>
      )
    },
    {
      header: 'Actions',
      accessor: (row: typeof applications[0]) => {
        let actionItems = [];
        if (row.status === 'Pending') {
          actionItems = [
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('ta-review', { applicationId: row.id }) },
            { id: 'start_review', label: 'Start Review', icon: <FileText size={16} />, onClick: () => {} },
            { id: 'assign', label: 'Assign Reviewer', icon: <UserPlus size={16} />, onClick: () => {} },
            { id: 'approve', label: 'Approve', icon: <CheckCircle size={16} />, onClick: () => {} },
            { id: 'request_rev', label: 'Request Revision', icon: <RefreshCw size={16} />, onClick: () => {} },
            { id: 'reject', label: 'Reject', icon: <XCircle size={16} />, danger: true, onClick: () => {} }
          ];
        } else if (row.status === 'Revision') {
          actionItems = [
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('ta-review', { applicationId: row.id }) },
            { id: 'view_notes', label: 'View Revision Notes', icon: <FileText size={16} />, onClick: () => {} },
            { id: 'reminder', label: 'Send Reminder', icon: <Bell size={16} />, onClick: () => {} },
            { id: 'mark_resubmitted', label: 'Mark as Resubmitted', icon: <CheckCircle size={16} />, onClick: () => {} }
          ];
        } else if (row.status === 'Approved') {
          actionItems = [
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('ta-review', { applicationId: row.id }) },
            { id: 'view_profile', label: 'View Agency Profile', icon: <Building2 size={16} />, onClick: () => navigate('ta-details', { agencyId: row.id }) },
            { id: 'export', label: 'Export Application', icon: <Download size={16} />, onClick: () => {} }
          ];
        } else {
          actionItems = [
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('ta-review', { applicationId: row.id }) },
            { id: 'view_rejection', label: 'View Rejection Reason', icon: <AlertCircle size={16} />, onClick: () => {} },
            { id: 'reopen', label: 'Reopen Application', icon: <RefreshCw size={16} />, onClick: () => {} }
          ];
        }
        
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu triggerLabel="" items={actionItems} />
          </div>
        );
      },
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Verification Status',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'revision', label: 'Needs Revision' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
      ]
    },
    {
      id: 'doc',
      label: 'Doc Status',
      options: [
        { value: 'complete', label: 'Complete' },
        { value: 'incomplete', label: 'Incomplete' },
        { value: 'revision', label: 'Needs Revision' },
        { value: 'expired', label: 'Expired' },
      ]
    },
    {
      id: 'date',
      label: 'Submitted Date',
      options: [
        { value: 'today', label: 'Today' },
        { value: '7days', label: 'Last 7 Days' },
        { value: '30days', label: 'Last 30 Days' },
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
  } = useDataFilter(applications, {
    defaultSort: { key: 'submittedDate', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Travel Agency Applications" 
        subtitle="Review, verify, and manage travel agency registration requests."
        breadcrumbs={[{ label: 'Travel Agency' }, { label: 'Applications' }]}
        actions={
          <>
            <ExportControl data={filteredData} filename="travel-agency-applications" />
            <Button variant="primary" leftIcon={<Plus size={16} />}>Add Travel Agency</Button>
          </>
        }
      />

      {/* 4 Compact Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Applications" 
          value="128" 
          trendLabel="All submitted agencies"
          icon={<FileText size={20} className="text-primary" />}
          iconBg="var(--color-primary-light)"
        />
        <MetricCard 
          title="Pending Review" 
          value="12" 
          trendLabel="Requires admin action"
          icon={<AlertCircle size={20} color="var(--color-warning)" />}
          iconBg="var(--color-warning-light)"
          accentColor="var(--color-warning)"
        />
        <MetricCard 
          title="Needs Revision" 
          value="5" 
          trendLabel="Waiting for agency update"
          icon={<RefreshCw size={20} color="var(--color-danger)" />}
          iconBg="var(--color-danger-light)"
        />
        <MetricCard 
          title="Approved This Month" 
          value="24" 
          trendLabel="Successfully verified"
          icon={<CheckCircle size={20} color="var(--color-success)" />}
          iconBg="var(--color-success-light)"
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <FilterBar 
          groups={filterGroups}
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
          onSearch={setSearchQuery}
          searchValue={searchQuery}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          searchPlaceholder="Search by App ID or Agency Name..."
        />

        
        <DataTable 
          data={filteredData}
          sort={{
            key: sortKey,
            order: sortOrder,
            onSort
          }}
          columns={columns}
          isLoading={isLoading}
          selectedKeys={selectedItems}
          onSelectionChange={setSelectedItems}
          onRowClick={(row) => navigate('ta-review', { applicationId: row.id })}
          emptyStateTitle="No Applications Found"
          pagination={{
            currentPage,
            totalPages,
            rowsPerPage,
            totalItems,
            onPageChange,
            onRowsPerPageChange
          }}
        />
      </div>
    </div>
  );
};
