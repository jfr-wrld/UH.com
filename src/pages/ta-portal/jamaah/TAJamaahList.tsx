import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Badge } from '../../../components/data-display/Badge';
import { DataTable } from '../../../components/data-display/DataTable';
import { FilterBar, FilterGroup } from '../../../components/inputs/FilterBar';
import { Button } from '../../../components/actions/Button';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';
import { MetricCard } from '../../../components/data-display/MetricCard';
import { UserProfileCell } from '../../../components/data-display/UserProfileCell';
import { Plus, Download, Users, FileText, CheckCircle2, UserPlus, CreditCard, Send, Archive } from 'lucide-react';
import { useDataFilter } from '../../../hooks/useDataFilter';
import { useLocalStorageCrud } from '../../../hooks/useLocalStorageCrud';
import { AddJamaahModal } from './AddJamaahModal';

const initialJamaah = [
  {
    id: 'tajm_1', name: 'Ahmad Faizal bin Ismail', email: 'ahmad.faizal@gmail.com', phone: '+60 12-345-6789', passport: 'MYP1234567', gender: 'Male', country: 'Malaysia',
    booking: 'BK-AH-001', package: 'Umrah Reguler 9 Hari', groupTrip: 'GRP-UMR-001',
    docStatus: 'Verified', paymentStatus: 'Paid', status: 'Ready for Departure', joinDate: '01 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tajm_2', name: 'Siti Nurhaliza binti Abdullah', email: 'siti.nurhaliza@gmail.com', phone: '+60 13-456-7890', passport: 'MYP2345678', gender: 'Female', country: 'Malaysia',
    booking: 'BK-AH-002', package: 'Umrah Plus Turki 12 Hari', groupTrip: 'Unassigned',
    docStatus: 'Pending Review', paymentStatus: 'Partial', status: 'Pending Document', joinDate: '05 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tajm_3', name: 'Mohammad Rizal bin Yusof', email: 'rizal.yusof@yahoo.com', phone: '+60 11-234-5678', passport: 'SGP3456789', gender: 'Male', country: 'Singapore',
    booking: 'BK-AH-003', package: 'Haji Furoda 2026', groupTrip: 'Unassigned',
    docStatus: 'Incomplete', paymentStatus: 'Unpaid', status: 'Pending Profile', joinDate: '10 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tajm_4', name: 'Fatimah binti Hassan', email: 'fatimah.hassan@gmail.com', phone: '+60 19-876-5432', passport: 'MYP4567890', gender: 'Female', country: 'Malaysia',
    booking: 'BK-AH-004', package: 'Umrah Ramadhan Akhir', groupTrip: 'GRP-UMR-002',
    docStatus: 'Verified', paymentStatus: 'Paid', status: 'In Trip', joinDate: '12 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tajm_5', name: 'Zulkifli bin Osman', email: 'zulkifli.osman@hotmail.com', phone: '+60 17-654-3210', gender: 'Male', country: 'Malaysia',
    booking: 'BK-AH-005', package: 'Umrah Reguler 9 Hari', groupTrip: 'Unassigned',
    docStatus: 'Missing', paymentStatus: 'Deposit Paid', status: 'Pending Invitation', joinDate: '15 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tajm_6', name: 'Nurul Ain binti Razak', email: 'nurul.ain@gmail.com', phone: '+60 16-543-2109', gender: 'Female', country: 'Malaysia',
    booking: 'BK-AH-006', package: 'Umrah Plus Turki 12 Hari', groupTrip: 'Unassigned',
    docStatus: 'Expiring Soon', paymentStatus: 'Paid', status: 'Ready for Departure', joinDate: '18 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tajm_7', name: 'Hasan bin Abdul Rahman', email: 'hasan.ar@gmail.com', phone: '+60 14-321-0987', gender: 'Male', country: 'Brunei',
    booking: 'BK-AH-007', package: 'Umrah Reguler 9 Hari', groupTrip: 'Unassigned',
    docStatus: 'Incomplete', paymentStatus: 'Unpaid', status: 'Cancelled', joinDate: '20 Jun 2026', agency: 'Al-Hijrah Travel'
  },
  {
    id: 'tajm_8', name: 'Kartini binti Mohamad', email: 'kartini.m@yahoo.com', phone: '+60 18-210-9876', gender: 'Female', country: 'Malaysia',
    booking: 'BK-AH-008', package: 'Umrah Ramadhan Akhir', groupTrip: 'GRP-UMR-002',
    docStatus: 'Verified', paymentStatus: 'Paid', status: 'Completed', joinDate: '22 Jun 2026', agency: 'Al-Hijrah Travel'
  }
];

export const TAJamaahList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const { data: jamaahList, remove, create } = useLocalStorageCrud('ta-jamaah', initialJamaah);

  const columns = [
    {
      header: 'Jamaah',
      accessor: (row: any) => (
        <UserProfileCell name={row.name} email={row.email} isVerified={row.docStatus === 'Verified'} />
      )
    },
    { header: 'Passport', accessor: 'passport' as const, sortable: true },
    { header: 'Phone', accessor: 'phone' as const },
    { header: 'Gender', accessor: 'gender' as const },
    { header: 'Package / Booking', accessor: (row: any) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.package}</span>
          <span className="text-caption text-muted">{row.booking}</span>
        </div>
      )
    },
    {
      header: 'Document Status',
      accessor: (row: any) => {
        if (row.docStatus === 'Verified') return <Badge variant="success">Verified</Badge>;
        if (row.docStatus === 'Pending Review') return <Badge variant="info">Pending Review</Badge>;
        if (row.docStatus === 'Expiring Soon') return <Badge variant="warning">Expiring Soon</Badge>;
        if (row.docStatus === 'Incomplete') return <Badge variant="warning">Incomplete</Badge>;
        return <Badge variant="danger">Missing</Badge>;
      }
    },
    {
      header: 'Payment Status',
      accessor: (row: any) => {
        if (row.paymentStatus === 'Paid') return <Badge variant="success">Paid</Badge>;
        if (row.paymentStatus === 'Partial' || row.paymentStatus === 'Deposit Paid') return <Badge variant="warning">{row.paymentStatus}</Badge>;
        return <Badge variant="neutral">{row.paymentStatus}</Badge>;
      }
    },
    {
      header: 'Status',
      accessor: (row: any) => {
        if (row.status === 'Ready for Departure' || row.status === 'In Trip' || row.status === 'Completed') return <Badge variant="success">{row.status}</Badge>;
        if (row.status === 'Cancelled' || row.status === 'Inactive') return <Badge variant="neutral">{row.status}</Badge>;
        return <Badge variant="info">{row.status}</Badge>;
      }
    },
    {
      header: 'Actions',
      accessor: (row: any) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <FileText size={16} />, onClick: () => navigate('ta-jamaah-details', { id: row.id }) },
            { id: 'invite', label: 'Send Invitation', icon: <Send size={16} />, onClick: () => alert('Invitation reminder sent.') },
            { id: 'archive', label: 'Archive Link', icon: <Archive size={16} />, onClick: () => {
              if (confirm('Archive this Jamaah link from the agency?')) remove(row.id);
            }, danger: true }
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'status', label: 'Status',
      options: [
        { value: 'Pending Invitation', label: 'Pending Invitation' },
        { value: 'Pending Profile', label: 'Pending Profile' },
        { value: 'Pending Document', label: 'Pending Document' },
        { value: 'Ready for Departure', label: 'Ready for Departure' },
        { value: 'In Trip', label: 'In Trip' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Cancelled', label: 'Cancelled' }
      ]
    },
    {
      id: 'docStatus', label: 'Document Status',
      options: [
        { value: 'Verified', label: 'Verified' },
        { value: 'Pending Review', label: 'Pending Review' },
        { value: 'Incomplete', label: 'Incomplete' },
        { value: 'Missing', label: 'Missing' },
        { value: 'Expiring Soon', label: 'Expiring Soon' }
      ]
    },
    {
      id: 'gender', label: 'Gender',
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ]
    }
  ];

  const { filteredData, activeFilters, searchQuery, setSearchQuery, handleFilterChange, clearFilters } = useDataFilter(jamaahList, {
    searchKeys: ['name', 'email', 'phone', 'booking']
  });

  const activeJamaah = jamaahList.filter((j: any) => j.status === 'Ready for Departure' || j.status === 'In Trip').length;
  const pendingDocs = jamaahList.filter((j: any) => j.docStatus === 'Pending Review' || j.docStatus === 'Missing' || j.docStatus === 'Incomplete').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Jamaah Management"
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="outline" leftIcon={<Download size={16} />}>Export</Button>
            <Button variant="primary" leftIcon={<UserPlus size={16} />} onClick={() => setShowAddModal(true)}>Add Jamaah</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Jamaah" value={jamaahList.length.toString()} icon={<Users size={20} style={{ color: 'var(--color-primary)' }} />} iconBg="var(--color-primary-light)" />
        <MetricCard title="Active / Ready" value={activeJamaah.toString()} icon={<CheckCircle2 size={20} style={{ color: 'var(--color-success)' }} />} iconBg="var(--color-success-light)" />
        <MetricCard title="Pending Docs" value={pendingDocs.toString()} trend="needs action" trendValue={`${pendingDocs} missing`} icon={<FileText size={20} style={{ color: 'var(--color-warning)' }} />} iconBg="var(--color-warning-light)" />
        <MetricCard title="Total Bookings" value="8" icon={<CreditCard size={20} style={{ color: 'var(--color-secondary)' }} />} iconBg="var(--color-secondary-light)" />
      </div>

      <FilterBar
        searchValue={searchQuery} onSearch={setSearchQuery}
        groups={filterGroups} activeFilters={activeFilters}
        onFilterChange={handleFilterChange} onClearFilters={clearFilters}
        searchPlaceholder="Search by name, email, phone, or booking ID..."
        hasActiveFilters={Object.keys(activeFilters).length > 0}
      />

      <div className="data-table-container">
        <DataTable 
          columns={columns} 
          data={filteredData} 
          isLoading={isLoading} 
          emptyMessage="No jamaah found matching your criteria." 
          onRowClick={(row) => navigate('ta-jamaah-details', { id: row.id })} 
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        />
      </div>

      {showAddModal && <AddJamaahModal onClose={() => setShowAddModal(false)} onAdd={(newJ: any) => { create(newJ); setShowAddModal(false); }} />}
    </div>
  );
};
