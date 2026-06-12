import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Stepper } from '../../components/navigation/Stepper';
import { Edit } from 'lucide-react';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const MutawwifAdd: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [source, setSource] = useState<'invite' | 'full' | 'existing'>('invite');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneCode: '+966',
    phone: '',
    jobType: '',
    country: 'sa',
    gender: '',
    language: '',
    specialization: '',
    sendInvite: true,
    existingUserId: ''
  });

  const [showErrors, setShowErrors] = useState(false);
  const { create } = useLocalStorageCrud('mutawwif');

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { id: '1', label: 'Identity & Contact' },
    { id: '2', label: 'Professional Info' },
    { id: '3', label: 'Review & Invite' }
  ];

  const validateStep = (step: number) => {
    if (step === 0) {
      if (source === 'existing') {
        return formData.existingUserId !== '';
      }
      return formData.name !== '' && formData.email !== '' && formData.phone !== '';
    }
    if (step === 1) {
      if (source === 'existing') {
        return formData.jobType !== '';
      }
      if (source === 'invite') {
        return formData.jobType !== '' && formData.country !== '' && formData.gender !== '';
      }
      if (source === 'full') {
        return formData.jobType !== '' && formData.language !== '';
      }
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
        name: formData.name || 'New Mutawwif',
        phone: formData.phone ? `${formData.phoneCode} ${formData.phone}` : '-',
        email: formData.email || '-',
        rating: 0,
        tripsCount: 0,
        status: 'Active',
        lastUpdated: new Date().toLocaleDateString('en-CA'),
        languages: formData.language ? [formData.language] : ['Malay', 'Arabic']
      });
      if(showToast) showToast('Success', 'Mutawwif added successfully', 'success');
      navigate('mutawwif-list');
    }
  };

  const handleFillExample = () => {
    setSource('full');
    setFormData({
      name: 'Ustadz Abdul Somad',
      email: 'abdul.somad@example.com',
      phoneCode: '+966',
      phone: '501234567',
      jobType: 'full_time',
      country: 'sa',
      gender: 'male',
      language: 'id',
      specialization: 'umrah',
      sendInvite: true,
      existingUserId: ''
    });
  };

  const renderIdentityAndContact = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="radio" checked={source === 'invite'} onChange={() => setSource('invite')} />
            <span className="text-body-medium">By Invitation</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="radio" checked={source === 'full'} onChange={() => setSource('full')} />
            <span className="text-body-medium">Create Full Profile</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="radio" checked={source === 'existing'} onChange={() => setSource('existing')} />
            <span className="text-body-medium">Add Existing User</span>
          </label>
        </div>

        {source === 'existing' ? (
          <>
            <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Search Existing User</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <FormField label="Search Platform Users" required helpText="Search by name, email, or phone number." error={showErrors && !formData.existingUserId ? 'Wajib diisi' : undefined}>
                <Select 
                  options={[
                    {value: 'u1', label: 'Tariq Ali (tariq@example.com)'},
                    {value: 'u2', label: 'Hassan (hassan@example.com)'}
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
                      {formData.existingUserId === 'u1' ? 'T' : 'H'}
                    </div>
                    <div>
                      <span className="text-body-bold" style={{ display: 'block' }}>{formData.existingUserId === 'u1' ? 'Tariq Ali' : 'Hassan'}</span>
                      <span className="text-caption text-muted">{formData.existingUserId === 'u1' ? 'tariq@example.com' : 'hassan@example.com'}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => updateForm('existingUserId', '')}>Remove</Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Mutawwif Identity</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
              <FormField label="Full Name" required error={showErrors && !formData.name ? 'Wajib diisi' : undefined}>
                <Input placeholder="Enter mutawwif's full name" value={formData.name} onChange={e => updateForm('name', e.target.value)} />
              </FormField>
              <FormField label="Email Address" required helpText="An invitation will be sent to this email to complete their profile." error={showErrors && !formData.email ? 'Wajib diisi' : undefined}>
                <Input type="email" placeholder="email@domain.com" value={formData.email} onChange={e => updateForm('email', e.target.value)} />
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--space-3)' }}>
                <FormField label="Code" required>
                  <Select options={[{value: '+966', label: '+966 (SA)'}, {value: '+62', label: '+62 (ID)'}]} value={formData.phoneCode} onChange={e => updateForm('phoneCode', e.target.value)} />
                </FormField>
                <FormField label="Phone Number" required error={showErrors && !formData.phone ? 'Wajib diisi' : undefined}>
                  <Input placeholder="501234567" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} />
                </FormField>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Professional Settings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
          
          {source !== 'existing' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Gender" required error={showErrors && source !== 'existing' && !formData.gender ? 'Wajib diisi' : undefined}>
                <Select options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}]} placeholder="Select gender" value={formData.gender} onChange={e => updateForm('gender', e.target.value)} />
              </FormField>
              <FormField label="Operating Country" required error={showErrors && source !== 'existing' && !formData.country ? 'Wajib diisi' : undefined}>
                <Select options={[{value: 'sa', label: 'Saudi Arabia'}, {value: 'id', label: 'Indonesia'}]} value={formData.country} onChange={e => updateForm('country', e.target.value)} />
              </FormField>
            </div>
          )}

          <FormField label="Job Type" required error={showErrors && !formData.jobType ? 'Wajib diisi' : undefined}>
            <Select options={[
              {value: 'full_time', label: 'Full Time'},
              {value: 'part_time', label: 'Part Time'},
              {value: 'freelance', label: 'Freelance'},
              {value: 'seasonal', label: 'Seasonal'}
            ]} placeholder="Select Job Type" value={formData.jobType} onChange={e => updateForm('jobType', e.target.value)} />
          </FormField>

          {source === 'full' && (
            <>
              <FormField label="Primary Language" required error={showErrors && source === 'full' && !formData.language ? 'Wajib diisi' : undefined}>
                <Select options={[
                  {value: 'ar', label: 'Arabic'},
                  {value: 'id', label: 'Indonesian'},
                  {value: 'en', label: 'English'},
                  {value: 'ur', label: 'Urdu'}
                ]} placeholder="Select Language" value={formData.language} onChange={e => updateForm('language', e.target.value)} />
              </FormField>

              <FormField label="Specialization">
                <Select options={[
                  {value: 'umrah', label: 'Umrah Guide'},
                  {value: 'hajj', label: 'Hajj Guide'},
                  {value: 'ziarah', label: 'Ziarah / City Tour'},
                  {value: 'elderly', label: 'Elderly Support'}
                ]} placeholder="Select Specialization" value={formData.specialization} onChange={e => updateForm('specialization', e.target.value)} />
              </FormField>
            </>
          )}

        </div>
      </section>
    </div>
  );

  const renderSummary = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      
      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Identity & Contact</h4>
          <div className="text-caption text-muted">Mutawwif profile details</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(0)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        {source === 'existing' ? (
          <div><span className="text-caption text-muted">Selected User</span><div className="text-body-medium">{formData.existingUserId ? 'Existing User Selected' : '-'}</div></div>
        ) : (
          <>
            <div><span className="text-caption text-muted">Full Name</span><div className="text-body-medium">{formData.name || '-'}</div></div>
            <div><span className="text-caption text-muted">Email</span><div className="text-body-medium">{formData.email || '-'}</div></div>
            <div><span className="text-caption text-muted">Phone</span><div className="text-body-medium">{formData.phone ? `${formData.phoneCode} ${formData.phone}` : '-'}</div></div>
          </>
        )}
      </div>

      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Professional Info</h4>
          <div className="text-caption text-muted">Roles and capabilities</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(1)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        {source !== 'existing' && (
          <>
            <div><span className="text-caption text-muted">Gender</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.gender || '-'}</div></div>
            <div><span className="text-caption text-muted">Country</span><div className="text-body-medium">{formData.country.toUpperCase() || '-'}</div></div>
          </>
        )}
        <div><span className="text-caption text-muted">Job Type</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.jobType.replace('_', ' ') || '-'}</div></div>
        {source === 'full' && (
          <>
            <div><span className="text-caption text-muted">Language</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.language || '-'}</div></div>
            <div><span className="text-caption text-muted">Specialization</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.specialization || '-'}</div></div>
          </>
        )}
      </div>

      <section style={{ marginTop: 'var(--space-2)' }}>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Invitation Settings</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
          <input type="checkbox" checked={formData.sendInvite} onChange={e => updateForm('sendInvite', e.target.checked)} style={{ width: '18px', height: '18px' }} />
          <div>
            <span className="text-body-bold" style={{ display: 'block' }}>Send Notification/Invitation</span>
            <span className="text-caption text-muted">Notifies the mutawwif about their account registration.</span>
          </div>
        </label>
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
        title="Add Mutawwif"
        subtitle="Register a new Mutawwif or assign an existing user as a Mutawwif."
        breadcrumbs={[{ label: 'Home' }, { label: 'Mutawwif List', onClick: () => navigate('mutawwif-list') }, { label: 'Add Mutawwif' }]}
        actions={
          <Button variant="outline" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={handleStepClick} />

        <div style={{ marginTop: 'var(--space-8)' }}>
          {currentStep === 0 && renderIdentityAndContact()}
          {currentStep === 1 && renderProfessionalInfo()}
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
          <Button variant="ghost" onClick={() => navigate('mutawwif-list')}>Cancel</Button>
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
