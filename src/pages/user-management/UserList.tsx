import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { MetricCard } from '../../components/data-display/MetricCard';
import { FilterBar, FilterGroup } from '../../components/inputs/FilterBar';
import { Button } from '../../components/actions/Button';
import { DropdownMenu } from '../../components/actions/DropdownMenu';
import { ConfirmationDialog } from '../../components/feedback/ConfirmationDialog';
import { FormField } from '../../components/inputs/FormField';
import { Plus, Eye, Edit, Mail, Key, ChevronRight, Lock, Unlock, ShieldOff, Power, PowerOff, Trash2, Users, CheckCircle2, UserPlus } from 'lucide-react';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const UserList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
return () => clearTimeout(timer);
  }, []);
  const [deactivateDialog, setDeactivateDialog] = useState<{ isOpen: boolean; userId: string; name: string; isDeactivating: boolean }>({ isOpen: false, userId: '', name: '', isDeactivating: true });
  const [actionReason, setActionReason] = useState('');

const initialUsers = [
  {
    "id": "usr_1",
    "name": "Siti Aminah (User 1)",
    "email": "sitiaminah1@umrahhaji.com",
    "phone": "+60123456701",
    "type": "Travel Agency User",
    "portals": [
      "Travel Agency Portal"
    ],
    "role": "Agency Admin",
    "linkedProfile": "Zamzam Travels",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "11 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_2",
    "name": "Budi Santoso (User 2)",
    "email": "budisantoso2@umrahhaji.com",
    "phone": "+60123456702",
    "type": "Super Admin",
    "portals": [
      "Admin Panel"
    ],
    "role": "Ops Admin",
    "linkedProfile": "",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "12 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_3",
    "name": "Rina Mutawwif (User 3)",
    "email": "rinamutawwif3@umrahhaji.com",
    "phone": "+60123456703",
    "type": "Travel Agency User",
    "portals": [
      "Travel Agency Portal"
    ],
    "role": "Mutawwif Leader",
    "linkedProfile": "Zamzam Travels",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "13 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_4",
    "name": "Zulkifli Harun (User 4)",
    "email": "zulkifliharun4@umrahhaji.com",
    "phone": "+60123456704",
    "type": "Super Admin",
    "portals": [
      "Admin Panel"
    ],
    "role": "Super Admin",
    "linkedProfile": "",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "14 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_5",
    "name": "Fatimah Zahra (User 5)",
    "email": "fatimahzahra5@umrahhaji.com",
    "phone": "+60123456705",
    "type": "Travel Agency User",
    "portals": [
      "Travel Agency Portal"
    ],
    "role": "Agency Admin",
    "linkedProfile": "Zamzam Travels",
    "status": "Inactive",
    "invitationStatus": "Accepted",
    "lastLogin": "15 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_6",
    "name": "Hendra Wijaya (User 6)",
    "email": "hendrawijaya6@umrahhaji.com",
    "phone": "+60123456706",
    "type": "Super Admin",
    "portals": [
      "Admin Panel"
    ],
    "role": "Ops Admin",
    "linkedProfile": "",
    "status": "Locked",
    "invitationStatus": "Pending",
    "lastLogin": "-",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_7",
    "name": "Nurul Huda (User 7)",
    "email": "nurulhuda7@umrahhaji.com",
    "phone": "+60123456707",
    "type": "Travel Agency User",
    "portals": [
      "Travel Agency Portal"
    ],
    "role": "Mutawwif Leader",
    "linkedProfile": "Zamzam Travels",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "17 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_8",
    "name": "Ahmad Ibrahim (User 8)",
    "email": "ahmadibrahim8@umrahhaji.com",
    "phone": "+60123456708",
    "type": "Super Admin",
    "portals": [
      "Admin Panel"
    ],
    "role": "Super Admin",
    "linkedProfile": "",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "18 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_9",
    "name": "Siti Aminah (User 9)",
    "email": "sitiaminah9@umrahhaji.com",
    "phone": "+60123456709",
    "type": "Travel Agency User",
    "portals": [
      "Travel Agency Portal"
    ],
    "role": "Agency Admin",
    "linkedProfile": "Zamzam Travels",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "19 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_10",
    "name": "Budi Santoso (User 10)",
    "email": "budisantoso10@umrahhaji.com",
    "phone": "+60123456710",
    "type": "Super Admin",
    "portals": [
      "Admin Panel"
    ],
    "role": "Ops Admin",
    "linkedProfile": "",
    "status": "Inactive",
    "invitationStatus": "Accepted",
    "lastLogin": "20 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_11",
    "name": "Rina Mutawwif (User 11)",
    "email": "rinamutawwif11@umrahhaji.com",
    "phone": "+60123456711",
    "type": "Travel Agency User",
    "portals": [
      "Travel Agency Portal"
    ],
    "role": "Mutawwif Leader",
    "linkedProfile": "Zamzam Travels",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "21 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_12",
    "name": "Zulkifli Harun (User 12)",
    "email": "zulkifliharun12@umrahhaji.com",
    "phone": "+60123456712",
    "type": "Super Admin",
    "portals": [
      "Admin Panel"
    ],
    "role": "Super Admin",
    "linkedProfile": "",
    "status": "Locked",
    "invitationStatus": "Pending",
    "lastLogin": "-",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_13",
    "name": "Fatimah Zahra (User 13)",
    "email": "fatimahzahra13@umrahhaji.com",
    "phone": "+60123456713",
    "type": "Travel Agency User",
    "portals": [
      "Travel Agency Portal"
    ],
    "role": "Agency Admin",
    "linkedProfile": "Zamzam Travels",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "23 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_14",
    "name": "Hendra Wijaya (User 14)",
    "email": "hendrawijaya14@umrahhaji.com",
    "phone": "+60123456714",
    "type": "Super Admin",
    "portals": [
      "Admin Panel"
    ],
    "role": "Ops Admin",
    "linkedProfile": "",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "24 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_15",
    "name": "Nurul Huda (User 15)",
    "email": "nurulhuda15@umrahhaji.com",
    "phone": "+60123456715",
    "type": "Travel Agency User",
    "portals": [
      "Travel Agency Portal"
    ],
    "role": "Mutawwif Leader",
    "linkedProfile": "Zamzam Travels",
    "status": "Inactive",
    "invitationStatus": "Accepted",
    "lastLogin": "25 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_16",
    "name": "Ahmad Ibrahim (User 16)",
    "email": "ahmadibrahim16@umrahhaji.com",
    "phone": "+60123456716",
    "type": "Super Admin",
    "portals": [
      "Admin Panel"
    ],
    "role": "Super Admin",
    "linkedProfile": "",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "26 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_17",
    "name": "Siti Aminah (User 17)",
    "email": "sitiaminah17@umrahhaji.com",
    "phone": "+60123456717",
    "type": "Travel Agency User",
    "portals": [
      "Travel Agency Portal"
    ],
    "role": "Agency Admin",
    "linkedProfile": "Zamzam Travels",
    "status": "Active",
    "invitationStatus": "Accepted",
    "lastLogin": "27 Jun 2026",
    "created": "1 Jan 2026"
  },
  {
    "id": "usr_18",
    "name": "Budi Santoso (User 18)",
    "email": "budisantoso18@umrahhaji.com",
    "phone": "+60123456718",
    "type": "Super Admin",
    "portals": [
      "Admin Panel"
    ],
    "role": "Ops Admin",
    "linkedProfile": "",
    "status": "Locked",
    "invitationStatus": "Pending",
    "lastLogin": "-",
    "created": "1 Jan 2026"
  }
];

  const { data: users, remove, isLoading: hookLoading } = useLocalStorageCrud('users', initialUsers);

  const columns = [
    { 
      header: 'User', 
      accessor: (row: typeof users[0]) => (
        <UserProfileCell 
          name={row.name} 
          email={row.email} 
          phone={row.phone} 
          isVerified={row.status === 'Active'} 
        />
      )
    },
    { header: 'Type', accessor: 'type' as const },
    { 
      header: 'Portal Access', 
      accessor: (row: typeof users[0]) => (
        <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
          {row.portals.map(p => <Badge key={p} variant="neutral">{p}</Badge>)}
        </div>
      )
    },
    { header: 'Role', accessor: 'role' as const },
    { 
      header: 'Linked Profile', 
      accessor: (row: typeof users[0]) => {
        if (!row.linkedProfile) return '-';
        return (
          <UserProfileCell 
            name={row.linkedProfile} 
            isVerified={true} 
          />
        );
      }
    },
    { 
      header: 'Account Status', 
      accessor: (row: typeof users[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.status === 'Active') variant = 'success';
        if (row.status === 'Invited') variant = 'warning';
        if (row.status === 'Inactive') variant = 'danger';
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
    { 
      header: 'Invitation', 
      accessor: (row: typeof users[0]) => {
        let variant: 'success' | 'warning' | 'danger' | 'neutral' = 'neutral';
        if (row.invitationStatus === 'Accepted') variant = 'success';
        if (row.invitationStatus === 'Pending') variant = 'warning';
        if (row.invitationStatus === 'Expired') variant = 'danger';
        return <Badge variant={variant}>{row.invitationStatus}</Badge>;
      }
    },
    { header: 'Last Login', accessor: 'lastLogin' as const },
    { header: 'Date Created', accessor: 'created' as const },
    {
      header: 'Action',
      accessor: (row: typeof users[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'view', label: 'View Details', icon: <Eye size={16} />, onClick: () => navigate('um-details', { id: row.id }) },
            { id: 'edit', label: 'Edit Access', icon: <Edit size={16} />, onClick: () => console.log('Edit', row.id) },
            { id: 'resend', label: 'Resend Invitation', icon: <Mail size={16} />, onClick: () => console.log('Resend', row.id), disabled: row.status === 'Active' },
            { id: 'reset_pwd', label: 'Reset Password', icon: <Key size={16} />, onClick: () => console.log('Reset Password', row.id), disabled: row.status !== 'Active' },
            { id: 'lock', label: row.status === 'Locked' ? 'Unlock Account' : 'Lock Account', icon: row.status === 'Locked' ? <Unlock size={16} /> : <Lock size={16} />, onClick: () => console.log('Lock Toggle', row.id) },
            { id: 'revoke', label: 'Revoke Sessions', icon: <ShieldOff size={16} />, onClick: () => console.log('Revoke Sessions', row.id), disabled: row.status !== 'Active' },
            { id: 'deactivate', label: row.status === 'Inactive' ? 'Reactivate' : 'Deactivate', icon: row.status === 'Inactive' ? <Power size={16} /> : <PowerOff size={16} />, danger: row.status !== 'Inactive', onClick: () => row.status !== 'Inactive' ? setDeactivateDialog({ isOpen: true, userId: row.id, name: row.name, isDeactivating: true }) : console.log('Reactivate', row.id) },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, danger: true, onClick: () => { if(window.confirm('Are you sure?')) remove(row.id) } },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  const filterGroups: FilterGroup[] = [
    {
      id: 'type',
      label: 'User Type',
      options: [
        { value: 'admin', label: 'Internal Admin' },
        { value: 'agency', label: 'Travel Agency User' },
        { value: 'jamaah', label: 'Jamaah User' },
      ]
    },
    {
      id: 'status',
      label: 'Account Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'invited', label: 'Invited' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'locked', label: 'Locked' },
      ]
    },
    {
      id: 'invitation',
      label: 'Invitation Status',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'expired', label: 'Expired' },
      ]
    },
    {
      id: 'role',
      label: 'Role',
      options: [
        { value: 'super_admin', label: 'Super Admin' },
        { value: 'ops_admin', label: 'Ops Admin' },
        { value: 'agency_admin', label: 'Agency Admin' },
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
  } = useDataFilter(users, {
    defaultSort: { key: 'id', order: 'desc' },
    defaultPerPage: 10,
    syncToUrl: true
  });

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="User Management"
        breadcrumbs={[{ label: 'Settings' }, { label: 'Users' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <ExportControl data={filteredData} filename="users" />
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('um-invite')}>
            Invite User
          </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Users" 
          value={totalItems.toString()} 
          trend="up" 
          trendValue="+12" 
          icon={<Users />} 
          iconBg="var(--color-primary-light)" 
          accentColor="var(--color-primary)" 
        />
        <MetricCard 
          title="Active Users" 
          value={users.filter(u => u.status === 'Active').length.toString()} 
          trend="up" 
          trendValue="+5" 
          icon={<CheckCircle2 />} 
          iconBg="var(--color-success-light)" 
          accentColor="var(--color-success)" 
        />
        <MetricCard 
          title="Pending Invites" 
          value={users.filter(u => u.status === 'Invited' || u.invitationStatus === 'Pending').length.toString()} 
          trend="neutral" 
          trendValue="0" 
          icon={<UserPlus />} 
          iconBg="var(--color-warning-light)" 
          accentColor="var(--color-warning)" 
        />
        <MetricCard 
          title="Locked Accounts" 
          value={users.filter(u => u.status === 'Locked').length.toString()} 
          trend="down" 
          trendValue="-1" 
          icon={<Lock />} 
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
        searchPlaceholder="Search by name, email, phone, or role..."
      />

      {selectedUsers.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedUsers.length} users selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={() => console.log('Export')}>Export</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Resend')}>Resend Invitations</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Assign Role')}>Assign Role</Button>
            <Button variant="secondary" size="sm" onClick={() => console.log('Revoke Sessions')}>Revoke Sessions</Button>
            <Button variant="danger" size="sm" onClick={() => console.log('Deactivate')}>Deactivate Users</Button>
          </div>
        </div>
      )}

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
        selectedKeys={selectedUsers}
        onSelectionChange={setSelectedUsers}
        emptyStateTitle="No users found"
        emptyStateDescription="Try adjusting your search or filters."
      />

      <ConfirmationDialog
        isOpen={deactivateDialog.isOpen}
        title={deactivateDialog.isDeactivating ? `Deactivate User` : `Suspend User`}
        message={`Are you sure you want to deactivate ${deactivateDialog.name}? They will lose access to all portals immediately.`}
        confirmLabel="Deactivate"
        cancelLabel="Cancel"
        isDestructive={true}
        onClose={() => { setDeactivateDialog(prev => ({ ...prev, isOpen: false })); setActionReason(''); }}
        onConfirm={() => {
          console.log('Deactivated', deactivateDialog.userId, 'Reason:', actionReason);
          setDeactivateDialog(prev => ({ ...prev, isOpen: false }));
          setActionReason('');
        }}
      >
        <FormField label="Reason for Deactivation" required>
          <textarea 
            className="text-body"
            style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: 'none', minHeight: '80px', resize: 'vertical' }}
            placeholder="Please enter the reason for audit logs..."
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
          />
        </FormField>
      </ConfirmationDialog>
    </div>
  );
};
