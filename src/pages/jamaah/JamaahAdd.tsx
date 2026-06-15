import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Edit, UserPlus, Search } from 'lucide-react';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const JamaahAdd: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
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

  const validateForm = () => {
    if (source === 'new') {
      if (!formData.name || !formData.email || !formData.phone || !formData.gender || !formData.country) return false;
    } else {
      if (!formData.existingUserId) return false;
    }
    if (!formData.agency) return false;
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
        finalName = 'Muhammad Al Fatih';
        finalEmail = 'm.alfatih@example.com';
        finalPhone = '+62 8123456789';
      } else if (formData.existingUserId === 'u2') {
        finalName = 'Siti Aminah';
        finalEmail = 'siti@example.com';
        finalPhone = '+62 987654321';
      }
    }

    const agencyLabel = formData.agency === 'zamzam' ? 'Zamzam Travels' : (formData.agency || 'Zamzam Travels');

    (create as any)({
      code: `JAM-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: finalName || 'New Jamaah',
      phone: finalPhone,
      email: finalEmail || '-',
      passport: '-',
      agency: agencyLabel,
      status: 'Active',
      type: 'Standard',
      lastUpdated: new Date().toLocaleDateString('en-CA')
    });
    if(showToast) showToast('Success', 'Jamaah added successfully', 'success');
    navigate('jamaah-list');
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title="Add Jamaah"
        subtitle="Register a new Jamaah or assign an existing user to a group trip."
        breadcrumbs={[{ label: 'Home' }, { label: 'Jamaah List', onClick: () => navigate('jamaah-list') }, { label: 'Add Jamaah' }]}
        actions={
          <Button variant="secondary" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        {/* Section 1: Identity & Contact */}
        <section>
          <div style={{ display: 'flex', backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-1)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)' }}>
            {[
              { id: 'new', label: 'Create New User', icon: <UserPlus size={16} /> },
              { id: 'existing', label: 'Add Existing User', icon: <Search size={16} /> }
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

          {source === 'new' ? (
            <>
              <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Jamaah Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Full Name" required error={showErrors && !formData.name ? 'Wajib diisi' : undefined}>
                  <Input placeholder="Enter full name according to passport" value={formData.name} onChange={e => updateForm('name', e.target.value)} />
                </FormField>
                <FormField label="Email Address" required helperText="An invitation will be sent to this email to complete their profile." error={showErrors && !formData.email ? 'Wajib diisi' : undefined}>
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
                      {
                        value: 'u1', 
                        label: 'Muhammad Al Fatih (m.alfatih@example.com)',
                        icon: <img src="https://ui-avatars.com/api/?name=Muhammad+Al+Fatih&background=random&color=fff&size=24" alt="M" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
                      },
                      {
                        value: 'u2', 
                        label: 'Siti Aminah (siti@example.com)',
                        icon: <img src="https://ui-avatars.com/api/?name=Siti+Aminah&background=random&color=fff&size=24" alt="S" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
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

        {/* Section 2: Assignments */}
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

        {/* Section 3: Invitation Settings */}
        <section>
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

      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'flex-end', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="ghost" onClick={() => navigate('jamaah-list')}>Cancel</Button>
          <Button onClick={handleSave}>Save & Submit</Button>
        </div>
      </div>
    </div>
  );
};

