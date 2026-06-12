import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Stepper } from '../../components/navigation/Stepper';
import { Edit } from 'lucide-react';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const JamaahAdd: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [source, setSource] = useState<'new' | 'existing'>('new');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneCode: '+62',
    phone: '',
    gender: '',
    country: 'id',
    agency: '',
    package: '',
    groupTrip: '',
    inviteLang: 'en',
    sendInvite: true,
    existingUserId: '' // used if source is 'existing'
  });

  const [showErrors, setShowErrors] = useState(false);
  const { create } = useLocalStorageCrud('jamaah');

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { id: '1', label: 'Identity & Contact' },
    { id: '2', label: 'Assignments' },
    { id: '3', label: 'Review & Invite' }
  ];

  const validateStep = (step: number) => {
    if (step === 0) {
      if (source === 'new') {
        return formData.name !== '' && formData.email !== '' && formData.phone !== '' && formData.gender !== '' && formData.country !== '';
      } else {
        return formData.existingUserId !== '';
      }
    }
    if (step === 1) {
      // Assignments can be optional, but let's make agency required just for example
      return formData.agency !== '';
    }
    return true;
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (!validateStep(currentStep)) {
        setShowErrors(true);
        if (showToast) showToast('Perhatian', 'Ada field wajib yang belum diisi.', 'warning');
      }
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      let allValid = true;
      for (let i = 0; i < steps.length - 1; i++) {
        if (!validateStep(i)) {
          allValid = false;
          setShowErrors(true);
          if (showToast) showToast('Validasi Gagal', `Harap lengkapi semua field wajib di step ${i + 1}.`, 'error');
          setCurrentStep(i);
          window.scrollTo(0, 0);
          break;
        }
      }

      if (!allValid) return;

      create({
        code: `JAM-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        name: formData.name || 'Existing Jamaah',
        phone: formData.phone ? `${formData.phoneCode} ${formData.phone}` : '-',
        email: formData.email || '-',
        passport: '-',
        agency: formData.agency || 'Zamzam Travels',
        status: 'Active',
        type: 'Standard',
        lastUpdated: new Date().toLocaleDateString('en-CA')
      });
      if(showToast) showToast('Success', 'Jamaah added successfully', 'success');
      navigate('jamaah-list');
    }
  };

  const handleFillExample = () => {
    setSource('new');
    setFormData({
      name: 'Ahmad Faiz',
      email: 'ahmad.faiz@example.com',
      phoneCode: '+62',
      phone: '81234567890',
      gender: 'male',
      country: 'id',
      agency: 'zamzam',
      package: 'umrah',
      groupTrip: 'trp1',
      inviteLang: 'id',
      sendInvite: true,
      existingUserId: ''
    });
  };

  const renderIdentityAndContact = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="radio" checked={source === 'new'} onChange={() => setSource('new')} />
            <span className="text-body-medium">Create New User</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="radio" checked={source === 'existing'} onChange={() => setSource('existing')} />
            <span className="text-body-medium">Add Existing User</span>
          </label>
        </div>

        {source === 'new' ? (
          <>
            <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Jamaah Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
              <FormField label="Full Name" required error={showErrors && !formData.name ? 'Wajib diisi' : undefined}>
                <Input placeholder="Enter full name according to passport" value={formData.name} onChange={e => updateForm('name', e.target.value)} />
              </FormField>
              <FormField label="Email Address" required helpText="Used for login and invitation. Must be unique." error={showErrors && !formData.email ? 'Wajib diisi' : undefined}>
                <Input type="email" placeholder="email@domain.com" value={formData.email} onChange={e => updateForm('email', e.target.value)} />
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--space-3)' }}>
                <FormField label="Code" required>
                  <Select options={[{value: '+62', label: '+62 (ID)'}, {value: '+60', label: '+60 (MY)'}]} value={formData.phoneCode} onChange={e => updateForm('phoneCode', e.target.value)} />
                </FormField>
                <FormField label="Phone Number" required error={showErrors && !formData.phone ? 'Wajib diisi' : undefined}>
                  <Input placeholder="8123456789" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} />
                </FormField>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Gender" required error={showErrors && !formData.gender ? 'Wajib diisi' : undefined}>
                  <Select options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}]} placeholder="Select gender" value={formData.gender} onChange={e => updateForm('gender', e.target.value)} />
                </FormField>
                <FormField label="Country" required error={showErrors && !formData.country ? 'Wajib diisi' : undefined}>
                  <Select options={[{value: 'id', label: 'Indonesia'}, {value: 'my', label: 'Malaysia'}]} value={formData.country} onChange={e => updateForm('country', e.target.value)} />
                </FormField>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Search Existing User</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <FormField label="Search Platform Users" required helpText="Search by name, email, or phone number." error={showErrors && !formData.existingUserId ? 'Wajib diisi' : undefined}>
                <Select 
                  options={[
                    {value: 'u1', label: 'Muhammad Al Fatih (m.alfatih@example.com)'},
                    {value: 'u2', label: 'Siti Aminah (siti@example.com)'}
                  ]} 
                  value={formData.existingUserId} 
                  onChange={e => updateForm('existingUserId', e.target.value)} 
                  placeholder="Select a user"
                />
              </FormField>
              {formData.existingUserId && (
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>
                      {formData.existingUserId === 'u1' ? 'M' : 'S'}
                    </div>
                    <div>
                      <span className="text-body-bold" style={{ display: 'block' }}>{formData.existingUserId === 'u1' ? 'Muhammad Al Fatih' : 'Siti Aminah'}</span>
                      <span className="text-caption text-muted">{formData.existingUserId === 'u1' ? 'm.alfatih@example.com' : 'siti@example.com'}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => updateForm('existingUserId', '')}>Remove</Button>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );

  const renderAssignments = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Assignments</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
          <FormField label="Travel Agency" required error={showErrors && !formData.agency ? 'Wajib diisi' : undefined}>
            <Select options={[{value: 'zamzam', label: 'Zamzam Travels'}, {value: 'makkah', label: 'Makkah Tours'}, {value: 'ansar', label: 'Ansar Medina'}]} placeholder="Select Travel Agency" value={formData.agency} onChange={e => updateForm('agency', e.target.value)} />
          </FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Package">
              <Select options={[{value: 'umrah', label: 'Umrah Premium'}]} placeholder="Select Package (Optional)" value={formData.package} onChange={e => updateForm('package', e.target.value)} />
            </FormField>
            <FormField label="Group Trip">
              <Select options={[{value: 'trp1', label: 'TRP-1001 (Dec 10)'}]} placeholder="Select Group Trip (Optional)" value={formData.groupTrip} onChange={e => updateForm('groupTrip', e.target.value)} />
            </FormField>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSummary = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      
      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Identity & Contact</h4>
          <div className="text-caption text-muted">Jamaah profile details</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(0)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        {source === 'new' ? (
          <>
            <div><span className="text-caption text-muted">Full Name</span><div className="text-body-medium">{formData.name || '-'}</div></div>
            <div><span className="text-caption text-muted">Email</span><div className="text-body-medium">{formData.email || '-'}</div></div>
            <div><span className="text-caption text-muted">Phone</span><div className="text-body-medium">{formData.phone ? `${formData.phoneCode} ${formData.phone}` : '-'}</div></div>
            <div><span className="text-caption text-muted">Gender</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.gender || '-'}</div></div>
            <div><span className="text-caption text-muted">Country</span><div className="text-body-medium">{formData.country.toUpperCase() || '-'}</div></div>
          </>
        ) : (
          <div><span className="text-caption text-muted">Selected User</span><div className="text-body-medium">{formData.existingUserId ? 'Existing User Selected' : '-'}</div></div>
        )}
      </div>

      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Assignments</h4>
          <div className="text-caption text-muted">Agency and trips</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(1)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        <div><span className="text-caption text-muted">Travel Agency</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.agency || '-'}</div></div>
        <div><span className="text-caption text-muted">Package</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.package || '-'}</div></div>
        <div><span className="text-caption text-muted">Group Trip</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.groupTrip || '-'}</div></div>
      </div>

      <section style={{ marginTop: 'var(--space-2)' }}>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Invitation Settings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', alignItems: 'start' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
            <input type="checkbox" checked={formData.sendInvite} onChange={e => updateForm('sendInvite', e.target.checked)} style={{ width: '18px', height: '18px' }} />
            <div>
              <span className="text-body-bold" style={{ display: 'block' }}>Send Invitation Email</span>
              <span className="text-caption text-muted">Sends a secure, single-use activation link to the jamaah's email.</span>
            </div>
          </label>
          <FormField label="Invitation Language">
            <Select options={[{value: 'en', label: 'English'}, {value: 'id', label: 'Bahasa Indonesia'}, {value: 'ms', label: 'Bahasa Melayu'}, {value: 'ar', label: 'Arabic'}]} value={formData.inviteLang} onChange={e => updateForm('inviteLang', e.target.value)} />
          </FormField>
        </div>
      </section>

      {/* Confirmation Checklist */}
      <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        <label style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input type="checkbox" defaultChecked style={{ marginTop: '4px' }} />
          <span className="text-body">I confirm that the information provided is accurate and ready for submission.</span>
        </label>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title="Add Jamaah"
        subtitle="Register a new Jamaah or assign an existing user to a group trip."
        breadcrumbs={[{ label: 'Home' }, { label: 'Jamaah List', onClick: () => navigate('jamaah-list') }, { label: 'Add Jamaah' }]}
        actions={
          <Button variant="outline" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={handleStepClick} />

        <div style={{ marginTop: 'var(--space-8)' }}>
          {currentStep === 0 && renderIdentityAndContact()}
          {currentStep === 1 && renderAssignments()}
          {currentStep === 2 && renderSummary()}
        </div>
      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <Button 
          variant="outline" 
          disabled={currentStep === 0}
          onClick={() => { setCurrentStep(prev => prev - 1); window.scrollTo(0, 0); }}
        >
          Previous
        </Button>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="ghost" onClick={() => navigate('jamaah-list')}>Cancel</Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Next Step</Button>
          ) : (
            <Button onClick={handleNext}>Save & Submit</Button>
          )}
        </div>
      </div>
    </div>
  );
};
