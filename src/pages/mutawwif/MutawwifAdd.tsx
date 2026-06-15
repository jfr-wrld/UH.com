import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Edit, Mail, FileText, Search } from 'lucide-react';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const MutawwifAdd: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
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

  const validateForm = () => {
    if (source === 'existing') {
      if (!formData.existingUserId) return false;
      if (!formData.jobType) return false;
    } else {
      if (!formData.name || !formData.email || !formData.phone) return false;
      if (source === 'invite') {
        if (!formData.jobType || !formData.country || !formData.gender) return false;
      }
      if (source === 'full') {
        if (!formData.jobType || !formData.language) return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) {
      setShowErrors(true);
      if (showToast) showToast('Validasi Gagal', 'Harap lengkapi semua field wajib.', 'error');
      window.scrollTo(0, 0);
      return;
    }

    let finalName = formData.name;
    let finalEmail = formData.email;
    let finalPhone = formData.phone ? `${formData.phoneCode} ${formData.phone}` : '-';

    if (source === 'existing' && formData.existingUserId) {
      if (formData.existingUserId === 'u1') {
        finalName = 'Tariq Ali';
        finalEmail = 'tariq@example.com';
        finalPhone = '+966 501234567';
      } else if (formData.existingUserId === 'u2') {
        finalName = 'Hassan';
        finalEmail = 'hassan@example.com';
        finalPhone = '+966 598765432';
      }
    }

    (create as any)({
      name: finalName || 'New Mutawwif',
      phone: finalPhone,
      email: finalEmail || '-',
      rating: 0,
      tripsCount: 0,
      status: 'Active',
      lastUpdated: new Date().toLocaleDateString('en-CA'),
      languages: formData.language ? [formData.language] : ['Malay', 'Arabic']
    });
    if(showToast) showToast('Success', 'Mutawwif added successfully', 'success');
    navigate('mutawwif-list');
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title="Add Mutawwif"
        subtitle="Register a new Mutawwif or assign an existing user as a Mutawwif."
        breadcrumbs={[{ label: 'Home' }, { label: 'Mutawwif List', onClick: () => navigate('mutawwif-list') }, { label: 'Add Mutawwif' }]}
        actions={
          <Button variant="secondary" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        {/* Section 1: Identity & Contact */}
        <section>
          <div style={{ display: 'flex', backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-1)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)' }}>
            {[
              { id: 'invite', label: 'By Invitation', icon: <Mail size={16} /> },
              { id: 'full', label: 'Full Profile', icon: <FileText size={16} /> },
              { id: 'existing', label: 'Existing User', icon: <Search size={16} /> }
            ].map((option) => (
              <div 
                key={option.id}
                onClick={() => setSource(option.id as any)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-4)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: source === option.id ? 'var(--surface-base)' : 'transparent',
                  boxShadow: source === option.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  color: source === option.id ? 'var(--color-primary-dark)' : 'var(--text-muted)',
                  fontWeight: source === option.id ? '600' : '500',
                  transition: 'all 0.2s ease'
                }}
              >
                {option.icon}
                <span style={{ fontSize: '14px' }}>{option.label}</span>
              </div>
            ))}
          </div>

          {source === 'existing' ? (
            <>
              <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Search Existing User</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <FormField label="Search Platform Users" required helpText="Search by name, email, or phone number." error={showErrors && !formData.existingUserId ? 'Wajib diisi' : undefined}>
                  <Select 
                    options={[
                      {
                        value: 'u1', 
                        label: 'Tariq Ali (tariq@example.com)',
                        icon: <img src="https://ui-avatars.com/api/?name=Tariq+Ali&background=random&color=fff&size=24" alt="T" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
                      },
                      {
                        value: 'u2', 
                        label: 'Hassan (hassan@example.com)',
                        icon: <img src="https://ui-avatars.com/api/?name=Hassan&background=random&color=fff&size=24" alt="H" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
                      }
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
                <FormField label="Email Address" required helperText="An invitation will be sent to this email to complete their profile." error={showErrors && !formData.email ? 'Wajib diisi' : undefined}>
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

        {/* Section 2: Professional Settings */}
        <section>
          <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Professional Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            
            {source !== 'existing' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Gender" required error={showErrors && !formData.gender ? 'Wajib diisi' : undefined}>
                  <Select options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}]} placeholder="Select gender" value={formData.gender} onChange={e => updateForm('gender', e.target.value)} />
                </FormField>
                <FormField label="Operating Country" required error={showErrors && !formData.country ? 'Wajib diisi' : undefined}>
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

        {/* Section 3: Invitation Settings */}
        <section>
          <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Invitation Settings</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
            <input type="checkbox" checked={formData.sendInvite} onChange={e => updateForm('sendInvite', e.target.checked)} style={{ width: '18px', height: '18px' }} />
            <div>
              <span className="text-body-bold" style={{ display: 'block' }}>Send Notification/Invitation</span>
              <span className="text-caption text-muted">Notifies the mutawwif about their account registration.</span>
            </div>
          </label>
        </section>

      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'flex-end', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="ghost" onClick={() => navigate('mutawwif-list')}>Cancel</Button>
          <Button onClick={handleSave}>Save & Submit</Button>
        </div>
      </div>
    </div>
  );
};
