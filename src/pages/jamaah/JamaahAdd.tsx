import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';

export const JamaahAdd: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [source, setSource] = useState<'new' | 'existing'>('new');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Add Jamaah"
        breadcrumbs={[{ label: 'Home' }, { label: 'Jamaah List', onClick: () => navigate('jamaah-list') }, { label: 'Add Jamaah' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('jamaah-list'); }}>Cancel</Button>
            <Button onClick={() => navigate('jamaah-list')}>Save Jamaah</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 800px)', gap: 'var(--space-6)' }}>
        
        {/* Source Selection */}
        <div style={{ display: 'flex', backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-1)', borderRadius: 'var(--radius-md)', width: 'fit-content' }}>
          <button 
            onClick={() => setSource('new')}
            style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: source === 'new' ? 'var(--surface-base)' : 'transparent', color: source === 'new' ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: source === 'new' ? '600' : '500', cursor: 'pointer', boxShadow: source === 'new' ? 'var(--shadow-sm)' : 'none' }}
          >
            Create New User
          </button>
          <button 
            onClick={() => setSource('existing')}
            style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: source === 'existing' ? 'var(--surface-base)' : 'transparent', color: source === 'existing' ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: source === 'existing' ? '600' : '500', cursor: 'pointer', boxShadow: source === 'existing' ? 'var(--shadow-sm)' : 'none' }}
          >
            Add Existing User
          </button>
        </div>

        {source === 'new' ? (
          <>
            {/* Create New User Form */}
            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Jamaah Identity & Contact</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Full Name" required>
                  <Input placeholder="Enter full name according to passport" />
                </FormField>
                <FormField label="Email Address" required helpText="Used for login and invitation. Must be unique.">
                  <Input type="email" placeholder="email@domain.com" />
                </FormField>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--space-3)' }}>
                  <FormField label="Code" required>
                    <Select options={[{value: '+62', label: '+62 (ID)'}, {value: '+60', label: '+60 (MY)'}]} value="+62" onChange={() => {}} />
                  </FormField>
                  <FormField label="Phone Number" required>
                    <Input placeholder="8123456789" />
                  </FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Gender" required>
                    <Select options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}]} placeholder="Select gender" value="" onChange={() => {}} />
                  </FormField>
                  <FormField label="Country" required>
                    <Select options={[{value: 'id', label: 'Indonesia'}, {value: 'my', label: 'Malaysia'}]} value="id" onChange={() => {}} />
                  </FormField>
                </div>
              </div>
            </section>

            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Assignments</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Travel Agency">
                  <Select options={[{value: 'zamzam', label: 'Zamzam Travels'}, {value: 'makkah', label: 'Makkah Tours'}]} placeholder="Select Travel Agency" value="" onChange={() => {}} />
                </FormField>
                <FormField label="Package">
                  <Select options={[{value: 'umrah', label: 'Umrah Premium'}]} placeholder="Select Package (Optional)" value="" onChange={() => {}} />
                </FormField>
                <FormField label="Group Trip">
                  <Select options={[{value: 'trp1', label: 'TRP-1001 (Dec 10)'}]} placeholder="Select Group Trip (Optional)" value="" onChange={() => {}} />
                </FormField>
              </div>
            </section>

            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Invitation Settings</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', alignItems: 'start' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                  <div>
                    <span className="text-body-bold" style={{ display: 'block' }}>Send Invitation Email</span>
                    <span className="text-caption text-muted">Sends a secure, single-use activation link to the jamaah's email.</span>
                  </div>
                </label>
                <FormField label="Invitation Language">
                  <Select options={[{value: 'en', label: 'English'}, {value: 'id', label: 'Bahasa Indonesia'}, {value: 'ms', label: 'Bahasa Melayu'}, {value: 'ar', label: 'Arabic'}]} value="en" onChange={() => {}} />
                </FormField>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Add Existing User Form */}
            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Search Existing User</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <FormField label="Search Platform Users" required helpText="Search by name, email, or phone number.">
                  <Input placeholder="Search..." />
                </FormField>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                      M
                    </div>
                    <div>
                      <span className="text-body-bold" style={{ display: 'block' }}>Muhammad Al Fatih</span>
                      <span className="text-caption text-muted">m.alfatih@example.com • +62 812 3456 7890</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              </div>
            </section>
            
            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Assignments</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Travel Agency">
                  <Select options={[{value: 'zamzam', label: 'Zamzam Travels'}, {value: 'makkah', label: 'Makkah Tours'}]} placeholder="Select Travel Agency" value="" onChange={() => {}} />
                </FormField>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Package">
                    <Select options={[{value: 'umrah', label: 'Umrah Premium'}]} placeholder="Select Package (Optional)" value="" onChange={() => {}} />
                  </FormField>
                  <FormField label="Group Trip">
                    <Select options={[{value: 'trp1', label: 'TRP-1001 (Dec 10)'}]} placeholder="Select Group Trip (Optional)" value="" onChange={() => {}} />
                  </FormField>
                </div>
              </div>
            </section>

            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Role & Notifications</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                  <div>
                    <span className="text-body-bold" style={{ display: 'block' }}>Add as Jamaah Role</span>
                    <span className="text-caption text-muted">Grants the user access to the Jamaah Portal.</span>
                  </div>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                  <div>
                    <span className="text-body-bold" style={{ display: 'block' }}>Send Notification</span>
                    <span className="text-caption text-muted">Notifies the user they have been added to a group trip or agency.</span>
                  </div>
                </label>
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
};
