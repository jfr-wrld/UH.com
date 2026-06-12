import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Stepper } from '../../components/navigation/Stepper';
import { Edit } from 'lucide-react';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const UserInvite: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState('internal');
  const [portal, setPortal] = useState('admin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { create } = useLocalStorageCrud('users');

  const steps = [
    { label: 'Identity', description: 'Basic info' },
    { label: 'Access', description: 'Role & permissions' },
    { label: 'Settings', description: 'Invite preferences' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleSendInvite = () => {
    create({
      name,
      email,
      phone,
      type: userType === 'internal' ? 'Super Admin' : userType === 'agency' ? 'Travel Agency User' : userType,
      portals: [portal === 'admin' ? 'Admin Panel' : portal === 'agency' ? 'Travel Agency Portal' : 'Jamaah Portal'],
      role: 'Staff',
      linkedProfile: '',
      status: 'Invited',
      invitationStatus: 'Pending',
      lastLogin: '-',
      created: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    });
    if(showToast) showToast('Success', 'User invitation sent successfully', 'success');
    navigate('um-users');
  };

  const handleFillExample = () => {
    setName('Ahmad Reza');
    setEmail('ahmad.reza@example.com');
    setPhone('81234567890');
    setUserType('agency');
    setPortal('agency');
  };

  const renderIdentityAndContact = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
      <FormField label="Full Name" required>
        <Input placeholder="Enter user's full name" value={name} onChange={e => setName(e.target.value)} />
      </FormField>
      <FormField label="Email Address" required helperText="This will be used for login and receiving the invitation link.">
        <Input type="email" placeholder="email@domain.com" value={email} onChange={e => setEmail(e.target.value)} />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--space-3)' }}>
        <FormField label="Code">
          <Select options={[{value: '+62', label: '+62 (ID)'}, {value: '+60', label: '+60 (MY)'}]} value="+62" onChange={() => {}} />
        </FormField>
        <FormField label="Phone Number">
          <Input placeholder="8123456789" value={phone} onChange={e => setPhone(e.target.value)} />
        </FormField>
      </div>
    </div>
  );

  const renderAccessAndRole = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
      <FormField label="User Type" required>
        <Select 
          value={userType} 
          onChange={setUserType}
          options={[
            { value: 'internal', label: 'Internal Admin / Staff' },
            { value: 'agency', label: 'Travel Agency User' },
            { value: 'jamaah', label: 'Jamaah User' },
            { value: 'mutawwif', label: 'Mutawwif User' },
          ]} 
        />
      </FormField>

      <FormField label="Portal Access" required>
        <Select 
          value={portal} 
          onChange={setPortal}
          options={[
            { value: 'admin', label: 'Admin Panel' },
            { value: 'agency', label: 'Travel Agency Portal' },
            { value: 'jamaah', label: 'Jamaah Portal' },
          ]} 
        />
      </FormField>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="Role" required>
          <Select 
            value="" 
            onChange={() => {}}
            options={
              portal === 'admin' ? [
                { value: 'admin', label: 'Admin' },
                { value: 'finance', label: 'Finance Admin' },
                { value: 'ops', label: 'Operations Staff' },
                { value: 'support', label: 'Support Staff' },
              ] : [
                { value: 'agency_admin', label: 'Agency Admin' },
                { value: 'agency_staff', label: 'Agency Staff' },
              ]
            } 
            placeholder="Select a role"
          />
        </FormField>
        
        <FormField label="Permission Group (Optional)">
          <Select 
            value="" 
            onChange={() => {}}
            options={[
              { value: 'group_reporting', label: 'Reporting Access' },
              { value: 'group_billing_view', label: 'Billing Read-Only' },
            ]} 
            placeholder="Select permission group"
          />
        </FormField>
      </div>

      {userType === 'agency' && (
        <FormField label="Linked Travel Agency" required helperText="Select the travel agency this user belongs to.">
          <Select options={[{value: 'zamzam', label: 'Zamzam Travels'}, {value: 'makkah', label: 'Makkah Tours'}]} value="" onChange={() => {}} placeholder="Search agency..." />
        </FormField>
      )}
    </div>
  );

  const renderSettings = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
        <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
        <div>
          <span className="text-body-bold" style={{ display: 'block' }}>Send Invitation Email</span>
          <span className="text-caption text-muted">Sends a secure, single-use activation link to the user's email.</span>
        </div>
      </label>
      
      <FormField label="Internal Note (Optional)">
        <textarea 
          placeholder="Add a note for other admins..." 
          style={{ width: '100%', minHeight: '100px', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: 'none', fontFamily: 'inherit', resize: 'vertical' }}
        />
      </FormField>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title="Invite User"
        breadcrumbs={[{ label: 'Settings' }, { label: 'Users', onClick: () => navigate('um-users') }, { label: 'Invite User' }]}
        actions={
          <Button variant="outline" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={handleStepClick} />

        <div style={{ marginTop: 'var(--space-8)' }}>
          {currentStep === 0 && renderIdentityAndContact()}
          {currentStep === 1 && renderAccessAndRole()}
          {currentStep === 2 && renderSettings()}
        </div>
      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <Button 
          variant="outline" 
          disabled={currentStep === 0}
          onClick={handlePrev}
        >
          Previous
        </Button>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="ghost" onClick={() => navigate('um-users')}>Cancel</Button>
          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSendInvite}>Send Invitation</Button>
          ) : (
            <Button onClick={handleNext}>Next Step</Button>
          )}
        </div>
      </div>
    </div>
  );
};
