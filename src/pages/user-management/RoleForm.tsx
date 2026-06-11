import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { useDataFilter } from '../../hooks/useDataFilter';

export const RoleForm: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void, roleId?: string }> = ({ navigate, showToast, roleId  }) => {
  
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
  


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title={roleId ? 'Edit Role' : 'Create Role'}
        breadcrumbs={[{ label: 'Settings' }, { label: 'Roles', onClick: () => navigate('um-roles') }, { label: roleId ? 'Edit' : 'Create' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('um-roles'); }}>Cancel</Button>
            <Button onClick={() => navigate('um-roles')}>Save Role</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 800px)', gap: 'var(--space-6)' }}>
        
        {/* Basic Info */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Role Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <FormField label="Role Name" required>
              <Input placeholder="e.g., Compliance Officer" />
            </FormField>
            
            <FormField label="Portal Scope" required>
              <Select 
                options={[{value: 'admin', label: 'Admin Panel'}, {value: 'agency', label: 'Travel Agency Portal'}]} 
                value="admin" 
                onChange={() => {}} 
              />
            </FormField>

            <FormField label="Data Scope" required helperText="Determines which records users with this role can see.">
              <Select 
                options={[
                  {value: 'global', label: 'Global (All Records)'}, 
                  {value: 'assigned', label: 'Assigned Only'},
                  {value: 'agency', label: 'Agency Scoped (Own Agency)'}
                ]} 
                value="global" 
                onChange={() => {}} 
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
    </div>
  );
};
