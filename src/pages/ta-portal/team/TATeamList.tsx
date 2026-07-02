import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { DataTable } from '../../../components/data-display/DataTable';
import { Badge } from '../../../components/data-display/Badge';
import { Button } from '../../../components/actions/Button';
import { SearchInput } from '../../../components/inputs/SearchInput';
import { FilterBar } from '../../../components/inputs/FilterBar';
import { IconButton } from '../../../components/actions/IconButton';
import { DropdownMenu } from '../../../components/actions/DropdownMenu';
import { MetricCard } from '../../../components/data-display/MetricCard';
import { UserProfileCell } from '../../../components/data-display/UserProfileCell';
import { Edit2, Trash2, ShieldAlert, Users, UserCheck, UserMinus, Shield, Crown, Settings, Coins, User } from 'lucide-react';
import { TAInviteStaffModal } from './TAInviteStaffModal';
import { TATransferOwnerModal } from './TATransferOwnerModal';

interface TATeamListProps {
  navigate: (route: string, state?: any) => void;
}

const mockStaffData = [
  { id: '1', name: 'Ahmad Abdullah', email: 'ahmad@alhijrah.com', role: 'Agency Owner', status: 'Active' },
  { id: '2', name: 'Siti Fatima', email: 'siti@alhijrah.com', role: 'Operations Staff', status: 'Active' },
  { id: '3', name: 'Budi Santoso', email: 'budi@alhijrah.com', role: 'Finance Staff', status: 'Invited' },
];

export function TATeamList({ navigate }: TATeamListProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Set<string>>(new Set());
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Agency Owner':
        return (
          <Badge variant="primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 'var(--space-1) var(--space-2)' }}>
            <Crown size={12} />
            {role}
          </Badge>
        );
      case 'Operations Staff':
        return (
          <Badge variant="info" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 'var(--space-1) var(--space-2)' }}>
            <Settings size={12} />
            {role}
          </Badge>
        );
      case 'Finance Staff':
        return (
          <Badge variant="success" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 'var(--space-1) var(--space-2)' }}>
            <Coins size={12} />
            {role}
          </Badge>
        );
      default:
        return (
          <Badge variant="neutral" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 'var(--space-1) var(--space-2)' }}>
            <User size={12} />
            {role}
          </Badge>
        );
    }
  };

  const columns = [
    { 
      header: 'Staff Name', 
      accessor: (row: typeof mockStaffData[0]) => (
        <UserProfileCell name={row.name} email={row.email} isVerified={row.status === 'Active'} />
      )
    },
    { 
      header: 'Role', 
      accessor: (row: typeof mockStaffData[0]) => getRoleBadge(row.role)
    },
    { 
      header: 'Status', 
      accessor: (row: typeof mockStaffData[0]) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      )
    },
    {
      header: 'Actions',
      accessor: (row: typeof mockStaffData[0]) => (
        <DropdownMenu
          triggerLabel=""
          items={[
            { id: 'edit', label: 'Edit Staff', icon: <Edit2 size={16} />, onClick: () => navigate('ta-staff-detail', { id: row.id }) },
            { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, onClick: () => alert('Delete ' + row.id), danger: true },
          ]}
        />
      ),
      align: 'right' as const
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader
        title="Agency Team"
        description="Manage your agency staff and their access roles."
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="secondary" leftIcon={<ShieldAlert size={16} />} onClick={() => setIsTransferModalOpen(true)}>Transfer Owner</Button>
            <Button variant="primary" onClick={() => setIsInviteModalOpen(true)}>Invite Staff</Button>
          </div>
        }
      />

      {/* Stat Cards Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
        <MetricCard 
          title="Total Staff" 
          value="3" 
          icon={<Users size={20} style={{ color: 'var(--color-primary)' }} />} 
          iconBg="var(--color-primary-light)" 
        />
        <MetricCard 
          title="Active Staff" 
          value="2" 
          icon={<UserCheck size={20} style={{ color: 'var(--color-success)' }} />} 
          iconBg="var(--color-success-light)" 
        />
        <MetricCard 
          title="Pending Invitations" 
          value="1" 
          icon={<UserMinus size={20} style={{ color: 'var(--color-warning)' }} />} 
          iconBg="var(--color-warning-light)" 
        />
        <MetricCard 
          title="Seat Allocation" 
          value="3 / 10" 
          icon={<Shield size={20} style={{ color: 'var(--color-info)' }} />} 
          iconBg="var(--color-info-light)" 
        />
      </div>

      <FilterBar 
        filters={[
          {
            id: 'role',
            label: 'Role',
            options: [
              { label: 'Agency Owner', value: 'owner' },
              { label: 'Operations Staff', value: 'operations' },
              { label: 'Finance Staff', value: 'finance' },
            ]
          },
          {
            id: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Invited', value: 'invited' },
              { label: 'Inactive', value: 'inactive' },
            ]
          }
        ]}
        onFilterChange={() => {}}
        searchValue={searchValue}
        onSearch={setSearchValue}
        searchPlaceholder="Search staff name, email..."
      />

      {selectedStaff.size > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
          <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{selectedStaff.size} staff selected</span>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="secondary" size="sm" onClick={() => console.log('Export')}>Export Selected</Button>
          </div>
        </div>
      )}

      {/* Data Table Container */}
      <div className="glass-panel" style={{ 
        backgroundColor: 'var(--surface-base)', 
        boxShadow: 'var(--glass-shadow)', 
        borderRadius: 'var(--radius-card)', 
        border: 'none', 
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
          <div>
            <h3 className="text-subsection-title" style={{ margin: 0 }}>Staff Directory</h3>
            <p className="text-caption text-muted" style={{ margin: 0 }}>Manage status, department, and role permissions.</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={mockStaffData}
          keyExtractor={(row) => row.id}
          selectedKeys={selectedStaff}
          onSelectionChange={setSelectedStaff}
          onRowClick={(row) => navigate('ta-staff-details', { id: row.id })}
        />
      </div>

      {/* Modals */}
      <TAInviteStaffModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
      />
      <TATransferOwnerModal 
        isOpen={isTransferModalOpen} 
        onClose={() => setIsTransferModalOpen(false)} 
      />
    </div>
  );
}
