import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Edit } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

export const RoleForm: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void, roleId?: string }> = ({ navigate, showToast, roleId  }) => {
  const [roleName, setRoleName] = useState('');
  const [portalScope, setPortalScope] = useState('admin');
  const [dataScope, setDataScope] = useState('global');

  const modules = [
    'Travel Agency Management',
    'Jamaah Management',
    'Mutawwif Management',
    'Package Management',
    'Group Trip Management',
    'Finance & Billing',
    'User Management'
  ];

  const actions = ['View', 'Create', 'Update', 'Delete', 'Verify/Approve'];
  
  const handleFillExample = () => {
    setRoleName('Compliance Officer');
    setPortalScope('admin');
    setDataScope('global');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title={roleId ? 'Edit Role' : 'Create Role'}
        breadcrumbs={[{ label: 'Settings' }, { label: 'Roles', onClick: () => navigate('um-roles') }, { label: roleId ? 'Edit' : 'Create' }]}
        actions={
          <Button variant="outline" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        
        {/* Basic Info */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Role Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <FormField label="Role Name" required>
              <Input placeholder="e.g., Compliance Officer" value={roleName} onChange={e => setRoleName(e.target.value)} />
            </FormField>
            
            <FormField label="Portal Scope" required>
              <Select 
                options={[{value: 'admin', label: 'Admin Panel'}, {value: 'agency', label: 'Travel Agency Portal'}]} 
                value={portalScope} 
                onChange={setPortalScope} 
              />
            </FormField>

            <FormField label="Data Scope" required helperText="Determines which records users with this role can see.">
              <Select 
                options={[
                  {value: 'global', label: 'Global (All Records)'}, 
                  {value: 'assigned', label: 'Assigned Only'},
                  {value: 'agency', label: 'Agency Scoped (Own Agency)'}
                ]} 
                value={dataScope} 
                onChange={setDataScope} 
              />
            </FormField>
          </div>
        </section>

        {/* Permission Matrix */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Permission Matrix</h2>
          
          <div style={{ overflowX: 'auto' }}>
            <div className="data-table-container">
              <table className="data-table text-body">
                <thead>
                  <tr>
                    <th>Module</th>
                    {actions.map(a => <th key={a} style={{ textAlign: 'center' }}>{a}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {modules.map((mod) => (
                    <tr key={mod}>
                      <td style={{ fontWeight: '500' }}>{mod}</td>
                      {actions.map(a => (
                        <td key={a} style={{ textAlign: 'center' }}>
                          <input type="checkbox" style={{ width: '18px', height: '18px' }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', zIndex: 10 }}>
        <Button variant="ghost" onClick={() => navigate('um-roles')}>Cancel</Button>
        <Button onClick={() => { if(showToast) showToast('Success', 'Role saved successfully', 'success'); navigate('um-roles'); }}>Save Role</Button>
      </div>
    </div>
  );
};
