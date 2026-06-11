import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { DataTable } from '../../components/data-display/DataTable';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { IconButton } from '../../components/actions/IconButton';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { ExportControl } from '../../components/domain/ExportControl';
import { useDataFilter } from '../../hooks/useDataFilter';

export const RoleList: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Mock Data
  const roles = [
    { id: 'r1', name: 'Super Admin', portal: 'Admin Panel', users: 3, type: 'Built-in', status: 'Active' },
    { id: 'r2', name: 'Finance Admin', portal: 'Admin Panel', users: 5, type: 'Custom', status: 'Active' },
    { id: 'r3', name: 'Operations Staff', portal: 'Admin Panel', users: 12, type: 'Custom', status: 'Active' },
    { id: 'r4', name: 'Agency Admin', portal: 'Travel Agency Portal', users: 45, type: 'Built-in', status: 'Active' },
    { id: 'r5', name: 'Agency Staff', portal: 'Travel Agency Portal', users: 120, type: 'Built-in', status: 'Active' },
    { id: 'r6', name: 'Support Intern', portal: 'Admin Panel', users: 0, type: 'Custom', status: 'Inactive' },
  ];

  const columns = [
    { 
      header: 'Role Name', 
      accessor: (row: typeof roles[0]) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-body-bold">{row.name}</span>
          <span className="text-caption text-muted">{row.type}</span>
        </div>
      ) 
    },
    { 
      header: 'Portal', 
      accessor: (row: typeof roles[0]) => <Badge variant="neutral">{row.portal}</Badge> 
    },
    { 
      header: 'Active Users', 
      accessor: 'users' as const 
    },
    { 
      header: 'Status', 
      accessor: (row: typeof roles[0]) => <Badge variant={row.status === 'Active' ? 'success' : 'neutral'}>{row.status}</Badge> 
    },
    {
      header: 'Action',
      accessor: (row: typeof roles[0]) => (
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <IconButton size="sm" onClick={() => navigate('um-role-form', { id: row.id })}><Edit2 size={16} /></IconButton>
          <IconButton size="sm" className="text-danger" disabled={row.type === 'Built-in' || row.users > 0}><Trash2 size={16} /></IconButton>
        </div>
      ),
      align: 'right' as const
    }
  ];
  


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Roles & Permissions"
        breadcrumbs={[{ label: 'Settings' }, { label: 'Roles' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <ExportControl onExport={(f) => console.log(f)} />
            <Button leftIcon={<Plus size={16} />} onClick={() => navigate('um-role-form')}>
            Create Role
          </Button>
          </div>
        }
      />

      <DataTable 
        data={roles}
        columns={columns}
        keyExtractor={(r) => r.id}
        isLoading={isLoading}
      />
    </div>
  );
};
