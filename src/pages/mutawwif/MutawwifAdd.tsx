import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';

export const MutawwifAdd: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [source, setSource] = useState<'invite' | 'full' | 'existing'>('invite');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Add Mutawwif"
        breadcrumbs={[{ label: 'Home' }, { label: 'Mutawwif List', onClick: () => navigate('mutawwif-list') }, { label: 'Add Mutawwif' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('mutawwif-list'); }}>Cancel</Button>
            <Button onClick={() => navigate('mutawwif-list')}>Save Mutawwif</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 800px)', gap: 'var(--space-6)' }}>
        
        {/* Source Selection */}
        <div style={{ display: 'flex', backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-1)', borderRadius: 'var(--radius-md)', width: 'fit-content' }}>
          <button 
            onClick={() => setSource('invite')}
            style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: source === 'invite' ? 'var(--surface-base)' : 'transparent', color: source === 'invite' ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: source === 'invite' ? '600' : '500', cursor: 'pointer', boxShadow: source === 'invite' ? 'var(--shadow-sm)' : 'none' }}
          >
            By Invitation
          </button>
          <button 
            onClick={() => setSource('full')}
            style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: source === 'full' ? 'var(--surface-base)' : 'transparent', color: source === 'full' ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: source === 'full' ? '600' : '500', cursor: 'pointer', boxShadow: source === 'full' ? 'var(--shadow-sm)' : 'none' }}
          >
            Create Full Profile
          </button>
          <button 
            onClick={() => setSource('existing')}
            style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: source === 'existing' ? 'var(--surface-base)' : 'transparent', color: source === 'existing' ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: source === 'existing' ? '600' : '500', cursor: 'pointer', boxShadow: source === 'existing' ? 'var(--shadow-sm)' : 'none' }}
          >
            Add Existing User
          </button>
        </div>

        {source === 'invite' && (
          <>
            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Invitation Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Full Name" required>
                  <Input placeholder="Enter mutawwif's full name" />
                </FormField>
                <FormField label="Email Address" required helpText="An invitation will be sent to this email to complete their profile.">
                  <Input type="email" placeholder="email@domain.com" />
                </FormField>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--space-3)' }}>
                  <FormField label="Code" required>
                    <Select options={[{value: '+966', label: '+966 (SA)'}, {value: '+62', label: '+62 (ID)'}]} value="+966" onChange={() => {}} />
                  </FormField>
                  <FormField label="Phone Number" required>
                    <Input placeholder="501234567" />
                  </FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Job Type" required>
                    <Select options={[
                      {value: 'full_time', label: 'Full Time'},
                      {value: 'part_time', label: 'Part Time'},
                      {value: 'freelance', label: 'Freelance'},
                      {value: 'seasonal', label: 'Seasonal'}
                    ]} placeholder="Select Job Type" value="" onChange={() => {}} />
                  </FormField>
                  <FormField label="Operating Country" required>
                    <Select options={[{value: 'sa', label: 'Saudi Arabia'}, {value: 'id', label: 'Indonesia'}]} value="sa" onChange={() => {}} />
                  </FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Gender" required>
                    <Select options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}]} placeholder="Select gender" value="" onChange={() => {}} />
                  </FormField>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer', marginTop: 'var(--space-5)' }}>
                      <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                      <span className="text-body-bold">Send Invitation Email</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {source === 'full' && (
          <>
            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Identity & Contact</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Full Name" required>
                  <Input placeholder="Enter mutawwif's full name" />
                </FormField>
                <FormField label="Email Address" required helpText="Used for login and receiving the invitation link.">
                  <Input type="email" placeholder="email@domain.com" />
                </FormField>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--space-3)' }}>
                  <FormField label="Code" required>
                    <Select options={[{value: '+966', label: '+966 (SA)'}, {value: '+62', label: '+62 (ID)'}]} value="+966" onChange={() => {}} />
                  </FormField>
                  <FormField label="Phone Number" required>
                    <Input placeholder="501234567" />
                  </FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Gender" required>
                    <Select options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}]} placeholder="Select gender" value="" onChange={() => {}} />
                  </FormField>
                  <FormField label="Operating Country" required>
                    <Select options={[{value: 'sa', label: 'Saudi Arabia'}, {value: 'id', label: 'Indonesia'}]} value="sa" onChange={() => {}} />
                  </FormField>
                </div>
              </div>
            </section>

            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Professional Info</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Job Type" required>
                  <Select options={[
                    {value: 'full_time', label: 'Full Time'},
                    {value: 'part_time', label: 'Part Time'},
                    {value: 'freelance', label: 'Freelance'},
                    {value: 'seasonal', label: 'Seasonal'}
                  ]} placeholder="Select Job Type" value="" onChange={() => {}} />
                </FormField>
                
                <FormField label="Primary Language" required>
                  <Select options={[
                    {value: 'ar', label: 'Arabic'},
                    {value: 'id', label: 'Indonesian'},
                    {value: 'en', label: 'English'},
                    {value: 'ur', label: 'Urdu'}
                  ]} placeholder="Select Language" value="" onChange={() => {}} />
                </FormField>

                <FormField label="Specialization">
                  <Select options={[
                    {value: 'umrah', label: 'Umrah Guide'},
                    {value: 'hajj', label: 'Hajj Guide'},
                    {value: 'ziarah', label: 'Ziarah / City Tour'},
                    {value: 'elderly', label: 'Elderly Support'}
                  ]} placeholder="Select Specialization" value="" onChange={() => {}} />
                </FormField>
              </div>
            </section>
            
            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Invitation Settings</h2>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Send Invitation Email</span>
                  <span className="text-caption text-muted">Sends a secure, single-use activation link to the mutawwif.</span>
                </div>
              </label>
            </section>
          </>
        )}

        {source === 'existing' && (
          <>
            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Search Existing User</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <FormField label="Search Platform Users" required helpText="Search by name, email, or phone number.">
                  <Input placeholder="Search..." />
                </FormField>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-default)', textAlign: 'center' }}>
                  <span className="text-body text-muted">Search for a user to link them to a Mutawwif profile.</span>
                </div>
              </div>
            </section>

            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Professional Settings</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Job Type" required>
                  <Select options={[
                    {value: 'full_time', label: 'Full Time'},
                    {value: 'freelance', label: 'Freelance'}
                  ]} placeholder="Select Job Type" value="" onChange={() => {}} />
                </FormField>
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                  <div>
                    <span className="text-body-bold" style={{ display: 'block' }}>Send Notification</span>
                    <span className="text-caption text-muted">Notify user that they have been assigned a Mutawwif profile.</span>
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
