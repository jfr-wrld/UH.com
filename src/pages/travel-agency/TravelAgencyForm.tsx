import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { FileUploader } from '../../components/inputs/FileUploader';
import { ImageUploader } from '../../components/inputs/ImageUploader';
import { Stepper } from '../../components/navigation/Stepper';
import { Edit, CheckCircle, Globe, Phone, Link, Building2, Trash2, Plus, ChevronLeft, ChevronRight, Save } from 'lucide-react';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

const locationData: Record<string, Record<string, string[]>> = {
  'Malaysia': {
    'Selangor': ['Shah Alam', 'Petaling Jaya', 'Subang Jaya'],
    'Kuala Lumpur': ['Bukit Bintang', 'Cheras', 'Kepong'],
    'Johor': ['Johor Bahru', 'Batu Pahat', 'Muar']
  },
  'Indonesia': {
    'Jakarta': ['Central Jakarta', 'South Jakarta'],
    'Bali': ['Denpasar', 'Kuta']
  },
  'Saudi Arabia': {
    'Makkah': ['Mecca City', 'Mina'],
    'Madinah': ['Medina City', 'Quba']
  }
};

const bankData: Record<string, { value: string, label: string, icon?: React.ReactNode }[]> = {
  'Malaysia': [
    { value: 'Maybank', label: 'Maybank', icon: <div style={{width: 20, height: 20, backgroundColor: '#FFD100', borderRadius: '50%'}}></div> },
    { value: 'CIMB Bank', label: 'CIMB Bank', icon: <div style={{width: 20, height: 20, backgroundColor: '#E2002A', borderRadius: '50%'}}></div> },
    { value: 'RHB Bank', label: 'RHB Bank', icon: <div style={{width: 20, height: 20, backgroundColor: '#0067B1', borderRadius: '50%'}}></div> },
    { value: 'Public Bank', label: 'Public Bank', icon: <div style={{width: 20, height: 20, backgroundColor: '#EB2A24', borderRadius: '50%'}}></div> },
    { value: 'Other', label: 'Other Bank' }
  ],
  'Indonesia': [
    { value: 'BCA', label: 'Bank Central Asia (BCA)', icon: <div style={{width: 20, height: 20, backgroundColor: '#0066AE', borderRadius: '50%'}}></div> },
    { value: 'Mandiri', label: 'Bank Mandiri', icon: <div style={{width: 20, height: 20, backgroundColor: '#FBBF24', borderRadius: '50%'}}></div> },
    { value: 'BNI', label: 'Bank Negara Indonesia (BNI)', icon: <div style={{width: 20, height: 20, backgroundColor: '#F15A23', borderRadius: '50%'}}></div> },
    { value: 'BRI', label: 'Bank Rakyat Indonesia (BRI)', icon: <div style={{width: 20, height: 20, backgroundColor: '#035397', borderRadius: '50%'}}></div> },
    { value: 'BSI', label: 'Bank Syariah Indonesia (BSI)', icon: <div style={{width: 20, height: 20, backgroundColor: '#00A39E', borderRadius: '50%'}}></div> },
    { value: 'Other', label: 'Other Bank' }
  ],
  'Saudi Arabia': [
    { value: 'Al Rajhi Bank', label: 'Al Rajhi Bank', icon: <div style={{width: 20, height: 20, backgroundColor: '#005A9C', borderRadius: '50%'}}></div> },
    { value: 'SNB', label: 'Saudi National Bank', icon: <div style={{width: 20, height: 20, backgroundColor: '#006738', borderRadius: '50%'}}></div> },
    { value: 'Other', label: 'Other Bank' }
  ]
};

const currencyMap: Record<string, string> = {
  'Malaysia': 'MYR',
  'Indonesia': 'IDR',
  'Saudi Arabia': 'SAR'
};

const mockUsers = [
  { id: 'u1', name: 'Ahmad Ali', email: 'ahmad@example.com', phone: '123456789', phoneCode: '+60', position: 'Manager' },
  { id: 'u2', name: 'Siti Sarah', email: 'siti@example.com', phone: '198765432', phoneCode: '+60', position: 'Director' }
];

export const TravelAgencyForm: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void, agencyId?: string }> = ({ navigate, showToast, agencyId  }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [draftTime, setDraftTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  
  const [picType, setPicType] = useState<'new'|'existing'>('new');
  const [selectedExistingUserId, setSelectedExistingUserId] = useState('');

  const { getById, create, update } = useLocalStorageCrud('travel-agencies');

  // Form State
  const [formData, setFormData] = useState({
    profileImage: '',
    name: '',
    type: 'travel_agency',
    licenseCategory: 'umrah',
    officeType: 'head',
    ssm: '',
    motac: '',
    validityStart: '',
    validityEnd: '',
    status: 'active',
    email: '',
    phoneCode: '+60',
    phone: '',
    website: '',
    socialMedia: [{ platform: 'WhatsApp', url: '', isPublic: true }],
    country: '',
    state: '',
    city: '',
    postalCode: '',
    street: '',
    googleMapsLink: '',
    businessPremiseLicense: '',
    picName: '',
    picPosition: '',
    picEmail: '',
    picPhoneCode: '+60',
    picPhone: '',
    picAccessLevel: 'PIC',
    picPassport: '',
    bankCountry: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    currency: 'MYR',
    sst: '',
    financeEmail: '',
    financePhone: '',
    internalNotes: ''
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    ssm: false,
    motac: false,
    umrah: false,
    pjh: false
  });

  const [showErrors, setShowErrors] = useState(false);

  const handleFillExample = () => {
    const names = ['Nusantara Travel', 'Cahaya Umrah', 'Mekkah Indah', 'Berkah Safar', 'Ziarah Suci'];
    const types = ['travel_agency', 'tour_operator', 'branch'];
    const licenseCategories = ['umrah', 'inbound', 'outbound'];
    const officeTypes = ['head', 'branch'];
    const countries = ['Malaysia', 'Indonesia', 'Saudi Arabia'];
    const picNames = ['Ahmad Faiz', 'Budi Santoso', 'Siti Aminah', 'Dewi Lestari', 'Abdullah'];
    const picPositions = ['Managing Director', 'Operational Manager', 'CEO', 'Branch Head'];
    const accessLevels = ['PIC', 'Admin', 'Staff'];

    const randomPick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
    
    const pickedName = randomPick(names);
    const pickedCountry = randomPick(countries);
    const states = Object.keys(locationData[pickedCountry] || {});
    const pickedState = states.length > 0 ? randomPick(states) : '';
    const cities = pickedState ? locationData[pickedCountry][pickedState] : [];
    const pickedCity = cities.length > 0 ? randomPick(cities) : '';
    const phoneCode = pickedCountry === 'Malaysia' ? '+60' : pickedCountry === 'Indonesia' ? '+62' : '+966';
    const currency = pickedCountry === 'Malaysia' ? 'MYR' : pickedCountry === 'Indonesia' ? 'IDR' : 'SAR';
    
    const banks = bankData[pickedCountry] ? bankData[pickedCountry].map((b: any) => b.value) : ['Other'];
    const pickedBank = randomPick(banks.filter((b: string) => b !== 'Other'));
    
    const picName = randomPick(picNames);
    const emailPrefix = pickedName.toLowerCase().replace(/\s+/g, '');

    setFormData({
      name: pickedName,
      type: randomPick(types),
      profileImage: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/150/150`,
      licenseCategory: randomPick(licenseCategories),
      officeType: randomPick(officeTypes),
      ssm: `${Math.floor(100000 + Math.random() * 900000)}-X`,
      motac: `KPK/LN ${Math.floor(1000 + Math.random() * 9000)}`,
      validityStart: '2024-01-01',
      validityEnd: '2025-12-31',
      status: 'active',
      email: `info@${emailPrefix}.com`,
      phoneCode: phoneCode,
      phone: `${Math.floor(100000000 + Math.random() * 900000000)}`,
      website: `www.${emailPrefix}.com`,
      socialMedia: [{ platform: 'WhatsApp', url: `https://wa.me/${phoneCode.replace('+','')}${Math.floor(100000000 + Math.random() * 900000000)}`, isPublic: true }],
      country: pickedCountry,
      state: pickedState,
      city: pickedCity,
      postalCode: `${Math.floor(10000 + Math.random() * 90000)}`,
      street: `Jalan Utama ${Math.floor(1 + Math.random() * 99)}`,
      googleMapsLink: 'https://maps.google.com/?q=office',
      businessPremiseLicense: `BP-${Math.floor(1000 + Math.random() * 9000)}`,
      picName: picName,
      picPosition: randomPick(picPositions),
      picEmail: `${picName.toLowerCase().replace(/\s+/g, '.')}@${emailPrefix}.com`,
      picPhoneCode: phoneCode,
      picPhone: `${Math.floor(100000000 + Math.random() * 900000000)}`,
      picAccessLevel: randomPick(accessLevels),
      picPassport: `P${Math.floor(10000000 + Math.random() * 90000000)}`,
      bankCountry: pickedCountry,
      bankName: pickedBank || 'Other',
      accountName: pickedName,
      accountNumber: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      currency: currency,
      sst: `SST-${Math.floor(100000 + Math.random() * 900000)}`,
      financeEmail: `finance@${emailPrefix}.com`,
      financePhone: `${Math.floor(100000000 + Math.random() * 900000000)}`,
      internalNotes: 'Auto-generated example data.'
    });
    setUploadedDocs({
      ssm: true,
      motac: true,
      umrah: true,
      pjh: true
    });
  };

  const addSocialMedia = () => {
    setFormData(prev => ({
      ...prev,
      socialMedia: [...prev.socialMedia, { platform: 'Instagram', url: '', isPublic: true }]
    }));
  };

  const updateSocialMedia = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => {
      const newSm = [...prev.socialMedia];
      newSm[index] = { ...newSm[index], [field]: value };
      return { ...prev, socialMedia: newSm };
    });
  };

  const removeSocialMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    if (agencyId) {
      const existing = getById(agencyId);
      if (existing) {
        setFormData({ ...formData, ...existing });
      }
    }
  }, [agencyId]);

  const updateForm = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-update dependent fields
      if (field === 'country') {
        newData.state = '';
        newData.city = '';
      }
      if (field === 'state') {
        newData.city = '';
      }
      if (field === 'bankCountry') {
        newData.bankName = '';
        newData.currency = currencyMap[value] || 'MYR';
      }
      return newData;
    });
  };

  const steps = [
    { id: '1', label: 'Agency Info' },
    { id: '2', label: 'Address & PIC' },
    { id: '3', label: 'Legal Docs' },
    { id: '4', label: 'Settlement' },
    { id: '5', label: 'Review' }
  ];

  // Simple validation per step
  const validateStep = (step: number) => {
    if (step === 0) {
      return formData.name !== '' && formData.ssm !== '' && formData.motac !== '' && formData.email !== '' && formData.phone !== '';
    }
    if (step === 1) {
      const addressValid = formData.country !== '' && formData.state !== '' && formData.city !== '' && formData.postalCode !== '' && formData.street !== '';
      const picValid = picType === 'existing' 
        ? selectedExistingUserId !== '' 
        : (formData.picName !== '' && formData.picEmail !== '' && formData.picPhone !== '');
      return addressValid && picValid;
    }
    if (step === 2) {
      return true; // Skipping rigorous file validation for mock
    }
    if (step === 3) {
      return formData.bankCountry !== '' && formData.bankName !== '' && formData.accountName !== '' && formData.accountNumber !== '' && formData.currency !== '' && formData.financeEmail !== '';
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
        if (showToast) {
          showToast('Perhatian', 'Ada field wajib yang belum diisi. Anda tetap bisa lanjut, namun jangan lupa melengkapinya nanti.', 'warning');
        } else {
          alert('Ada field wajib yang belum diisi. Anda tetap bisa lanjut, namun jangan lupa melengkapinya nanti.');
        }
      }
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Final submission validation
      let allValid = true;
      for (let i = 0; i < steps.length - 1; i++) {
        if (!validateStep(i)) {
          allValid = false;
          setShowErrors(true);
          if (showToast) {
            showToast('Validasi Gagal', `Harap lengkapi semua field wajib di step ${i + 1}.`, 'error');
          } else {
            alert(`Harap lengkapi semua field wajib di step ${i + 1} sebelum submit.`);
          }
          setCurrentStep(i);
          window.scrollTo(0, 0);
          break;
        }
      }

      if (!allValid) return;

      if (agencyId) {
        update(agencyId, { ...formData, lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) });
        if (showToast) showToast('Success', 'Travel Agency updated successfully.', 'success');
      } else {
        create({ ...formData, isVerified: false, jamaah: 0, activePackages: 0, activeTrips: 0, lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) });
        if (showToast) showToast('Success', 'Travel Agency created successfully.', 'success');
      }
      navigate('ta-list');
    }
  };

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    setDraftTime('just now');
    if (showToast) showToast('Draft Saved', 'Your progress has been saved as a draft.', 'info');
    setTimeout(() => {
      setDraftTime('1 minute ago');
    }, 60000);
  };

  const renderAgencyInfo = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Basic Profile</h3>
        <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
          <div style={{ width: '120px', flexShrink: 0 }}>
            <ImageUploader id="profile-image" label="Agency Logo" aspectRatio="1:1" maxSizeMB={2} />
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="Agency Name" required error={showErrors && !formData.name ? 'Wajib diisi' : undefined}><Input placeholder="Full registered name" value={formData.name} onChange={e => updateForm('name', e.target.value)} /></FormField>
            </div>
            <FormField label="Agency Type" required error={showErrors && !formData.type ? 'Wajib diisi' : undefined}>
              <Select options={[{ value: 'travel_agency', label: 'Travel Agency' }, { value: 'tour_operator', label: 'Tour Operator' }, { value: 'branch', label: 'Branch Office' }]} value={formData.type} onChange={e => updateForm('type', e.target.value)} />
            </FormField>
            <FormField label="Office Type" required error={showErrors && !formData.officeType ? 'Wajib diisi' : undefined}>
              <Select options={[{ value: 'head', label: 'Headquarters' }, { value: 'branch', label: 'Branch Office' }]} value={formData.officeType} onChange={e => updateForm('officeType', e.target.value)} />
            </FormField>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Licenses & Registration</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="License Category" required error={showErrors && !formData.licenseCategory ? 'Wajib diisi' : undefined}>
            <Select options={[{ value: 'umrah', label: 'Umrah/Ziarah' }, { value: 'inbound', label: 'Inbound' }, { value: 'outbound', label: 'Outbound' }, { value: 'ticketing', label: 'Ticketing' }]} value={formData.licenseCategory} onChange={e => updateForm('licenseCategory', e.target.value)} />
          </FormField>
          <FormField label="SSM Number" required error={showErrors && !formData.ssm ? 'Wajib diisi' : undefined}><Input placeholder="e.g. 1234567-X" value={formData.ssm} onChange={e => updateForm('ssm', e.target.value)} /></FormField>
          <FormField label="MOTAC License Number" required error={showErrors && !formData.motac ? 'Wajib diisi' : undefined}><Input placeholder="e.g. KPK/LN 1234" value={formData.motac} onChange={e => updateForm('motac', e.target.value)} /></FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <FormField label="Validity Start" required error={showErrors && !formData.validityStart ? 'Wajib diisi' : undefined}><Input type="date" value={formData.validityStart} onChange={e => updateForm('validityStart', e.target.value)} /></FormField>
            <FormField label="Validity End" required error={showErrors && !formData.validityEnd ? 'Wajib diisi' : undefined}><Input type="date" value={formData.validityEnd} onChange={e => updateForm('validityEnd', e.target.value)} /></FormField>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Contact Person (General)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="General Email" required error={showErrors && !formData.email ? 'Wajib diisi' : undefined}><Input type="email" placeholder="info@agency.com" value={formData.email} onChange={e => updateForm('email', e.target.value)} /></FormField>
          <FormField label="General Phone" required error={showErrors && !formData.phone ? 'Wajib diisi' : undefined}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Select options={[{value: '+60', label: '🇲🇾 +60'}, {value: '+62', label: '🇮🇩 +62'}, {value: '+966', label: '🇸🇦 +966'}]} value={formData.phoneCode} onChange={e => updateForm('phoneCode', e.target.value)} style={{ width: '130px' }} />
              <Input style={{ flex: 1 }} type="tel" placeholder="12 345 6789" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} />
            </div>
          </FormField>
        </div>
      </section>
      
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Online Presence (Optional)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Website"><Input leftIcon={<Globe size={16}/>} placeholder="https://" value={formData.website} onChange={e => updateForm('website', e.target.value)} /></FormField>
        </div>
        
        <div style={{ marginTop: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <label className="text-body-medium" style={{ color: 'var(--color-text)' }}>Social Media Accounts</label>
            <Button variant="outline" size="sm" onClick={addSocialMedia} type="button"><Plus size={16} style={{marginRight: '8px'}} /> Add Platform</Button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {formData.socialMedia.map((sm, index) => (
              <div key={index} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto auto', gap: 'var(--space-3)', alignItems: 'center' }}>
                <Select 
                  options={[
                    {value: 'WhatsApp', label: 'WhatsApp'}, 
                    {value: 'Instagram', label: 'Instagram'}, 
                    {value: 'Facebook', label: 'Facebook'},
                    {value: 'TikTok', label: 'TikTok'},
                    {value: 'YouTube', label: 'YouTube'}
                  ]} 
                  value={sm.platform} 
                  onChange={e => updateSocialMedia(index, 'platform', e.target.value)} 
                />
                <Input placeholder="URL or Username" value={sm.url} onChange={e => updateSocialMedia(index, 'url', e.target.value)} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                  <input type="checkbox" checked={sm.isPublic} onChange={e => updateSocialMedia(index, 'isPublic', e.target.checked)} />
                  Public
                </label>
                <button type="button" onClick={() => removeSocialMedia(index)} style={{ color: 'var(--color-danger)', padding: '8px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {formData.socialMedia.length === 0 && (
              <div style={{ padding: 'var(--space-4)', textAlign: 'center', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-muted)' }}>
                No social media added yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );

  const renderAddressAndPIC = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Agency Address</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Country" required error={showErrors && !formData.country ? 'Wajib diisi' : undefined}>
            <Select 
              options={Object.keys(locationData).map(c => ({ value: c, label: c }))} 
              value={formData.country} 
              onChange={e => updateForm('country', e.target.value)} 
              placeholder="Select country"
            />
          </FormField>
          <FormField label="State" required error={showErrors && !formData.state ? 'Wajib diisi' : undefined}>
            <Select 
              options={formData.country && locationData[formData.country] ? Object.keys(locationData[formData.country]).map(s => ({ value: s, label: s })) : []} 
              value={formData.state} 
              onChange={e => updateForm('state', e.target.value)} 
              disabled={!formData.country}
              placeholder="Select state"
            />
          </FormField>
          <FormField label="City" required error={showErrors && !formData.city ? 'Wajib diisi' : undefined}>
            <Select 
              options={formData.country && formData.state && locationData[formData.country]?.[formData.state] ? locationData[formData.country][formData.state].map(c => ({ value: c, label: c })) : []} 
              value={formData.city} 
              onChange={e => updateForm('city', e.target.value)} 
              disabled={!formData.state}
              placeholder="Select city"
            />
          </FormField>
          <FormField label="Postal Code" required error={showErrors && !formData.postalCode ? 'Wajib diisi' : undefined}><Input placeholder="Enter postal code" value={formData.postalCode} onChange={e => updateForm('postalCode', e.target.value)} /></FormField>
          <FormField label="Google Maps Link"><Input leftIcon={<Globe size={16}/>} placeholder="https://maps.google.com/..." value={formData.googleMapsLink} onChange={e => updateForm('googleMapsLink', e.target.value)} /></FormField>
          <div style={{ gridColumn: '1 / -1' }}>
            <FormField label="Street Address" required error={showErrors && !formData.street ? 'Wajib diisi' : undefined}><Input placeholder="Enter full office address" value={formData.street} onChange={e => updateForm('street', e.target.value)} /></FormField>
          </div>
          <FormField label="Business Premise License"><Input placeholder="License Number" value={formData.businessPremiseLicense} onChange={e => updateForm('businessPremiseLicense', e.target.value)} /></FormField>
        </div>
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>PIC Information</h3>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="radio" checked={picType === 'new'} onChange={() => setPicType('new')} />
            <span className="text-body-medium">Invite New User</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="radio" checked={picType === 'existing'} onChange={() => setPicType('existing')} />
            <span className="text-body-medium">Select Existing User</span>
          </label>
        </div>

        {picType === 'existing' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <FormField label="Search User" required error={showErrors && !selectedExistingUserId ? 'Wajib diisi' : undefined}>
              <Select 
                options={mockUsers.map(u => ({ 
                  value: u.id, 
                  label: `${u.name} (${u.email})`,
                  icon: <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random&color=fff&size=24`} alt={u.name.charAt(0)} style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
                }))} 
                value={selectedExistingUserId} 
                onChange={e => setSelectedExistingUserId(e.target.value)} 
                placeholder="Search by name or email"
              />
            </FormField>
            {selectedExistingUserId && (
              <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                {(() => {
                  const user = mockUsers.find(u => u.id === selectedExistingUserId);
                  return user ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="text-body-bold">{user.name}</span>
                      <span className="text-caption text-muted">{user.position} | {user.email} | {user.phoneCode}{user.phone}</span>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Full Name" required error={showErrors && !formData.picName ? 'Wajib diisi' : undefined}><Input placeholder="PIC Name" value={formData.picName} onChange={e => updateForm('picName', e.target.value)} /></FormField>
            <FormField label="Position" required error={showErrors && !formData.picPosition ? 'Wajib diisi' : undefined}><Input placeholder="e.g. Director" value={formData.picPosition} onChange={e => updateForm('picPosition', e.target.value)} /></FormField>
            <FormField label="Email" required error={showErrors && !formData.picEmail ? 'Wajib diisi' : undefined}><Input type="email" placeholder="pic@agency.com" value={formData.picEmail} onChange={e => updateForm('picEmail', e.target.value)} /></FormField>
            <FormField label="Phone" required error={showErrors && !formData.picPhone ? 'Wajib diisi' : undefined}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Select options={[{value: '+60', label: '🇲🇾 +60'}, {value: '+62', label: '🇮🇩 +62'}, {value: '+966', label: '🇸🇦 +966'}]} value={formData.picPhoneCode} onChange={e => updateForm('picPhoneCode', e.target.value)} style={{ width: '130px' }} />
                <Input style={{ flex: 1 }} type="tel" placeholder="12 345 6789" value={formData.picPhone} onChange={e => updateForm('picPhone', e.target.value)} />
              </div>
            </FormField>
            <FormField label="Access Level" required error={showErrors && !formData.picAccessLevel ? 'Wajib diisi' : undefined}>
              <Select 
                options={[{value: 'PIC', label: 'PIC (Owner/Representative)'}, {value: 'Admin', label: 'Admin'}, {value: 'Staff', label: 'Staff'}]} 
                value={formData.picAccessLevel} 
                onChange={e => updateForm('picAccessLevel', e.target.value)} 
              />
            </FormField>
            <FormField label="ID / Passport Number">
              <Input placeholder="NRIC or Passport" value={formData.picPassport} onChange={e => updateForm('picPassport', e.target.value)} />
            </FormField>
            <FormField label="Authorization Letter">
              <FileUploader id="pic-auth-upload" accept=".pdf,.jpg,.png" maxSizeMB={5} />
            </FormField>
          </div>
        )}
      </section>
    </div>
  );

  const renderLegalDocs = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <FormField label="SSM Certificate" required>
        <FileUploader id="ssm-upload" accept=".pdf,.jpg,.png" maxSizeMB={5} required onFileSelect={(files) => setUploadedDocs(prev => ({ ...prev, ssm: !!files }))} mockFile={uploadedDocs.ssm ? { name: 'SSM_Registration.pdf', size: 1250000 } : null} />
      </FormField>
      <FormField label="MOTAC License" required>
        <FileUploader id="motac-upload" accept=".pdf,.jpg,.png" maxSizeMB={5} required onFileSelect={(files) => setUploadedDocs(prev => ({ ...prev, motac: !!files }))} mockFile={uploadedDocs.motac ? { name: 'MOTAC_License.pdf', size: 850000 } : null} />
      </FormField>
      <FormField label="Umrah/Ziarah Authorization">
        <FileUploader id="umrah-auth-upload" accept=".pdf,.jpg,.png" maxSizeMB={5} onFileSelect={(files) => setUploadedDocs(prev => ({ ...prev, umrah: !!files }))} mockFile={uploadedDocs.umrah ? { name: 'Umrah_Auth.pdf', size: 1050000 } : null} />
      </FormField>
      <FormField label="PJH Certificate (If applicable)">
        <FileUploader id="pjh-upload" accept=".pdf,.jpg,.png" maxSizeMB={5} onFileSelect={(files) => setUploadedDocs(prev => ({ ...prev, pjh: !!files }))} mockFile={uploadedDocs.pjh ? { name: 'PJH_Cert.pdf', size: 950000 } : null} />
      </FormField>
      <FormField label="Supporting Documents (Optional)">
        <FileUploader id="supporting-docs-upload" accept=".pdf,.jpg,.png,.zip" maxSizeMB={10} />
      </FormField>
    </div>
  );

  const renderSettlement = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Bank Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Bank Country" required error={showErrors && !formData.bankCountry ? 'Wajib diisi' : undefined}>
            <Select 
              options={Object.keys(bankData).map(c => ({ value: c, label: c }))} 
              value={formData.bankCountry} 
              onChange={e => updateForm('bankCountry', e.target.value)} 
              placeholder="Select country"
            />
          </FormField>
          <FormField label="Finance Email" required error={showErrors && !formData.financeEmail ? 'Wajib diisi' : undefined}>
            <Input type="email" placeholder="finance@agency.com" value={formData.financeEmail} onChange={e => updateForm('financeEmail', e.target.value)} />
          </FormField>
          <FormField label="Finance Phone">
            <Input type="tel" placeholder="+60..." value={formData.financePhone} onChange={e => updateForm('financePhone', e.target.value)} />
          </FormField>
          <FormField label="Bank Name" required error={showErrors && !formData.bankName ? 'Wajib diisi' : undefined}>
            <Select 
              options={formData.bankCountry && bankData[formData.bankCountry] ? bankData[formData.bankCountry] : []} 
              value={formData.bankName} 
              onChange={e => updateForm('bankName', e.target.value)} 
              disabled={!formData.bankCountry}
              placeholder="Select bank"
            />
          </FormField>
          <FormField label="Account Holder Name" required helperText="Must match the registered agency/company name." error={showErrors && !formData.accountName ? 'Wajib diisi' : undefined}>
            <Input placeholder="Official Name" value={formData.accountName} onChange={e => updateForm('accountName', e.target.value)} />
          </FormField>
          <FormField label="Bank Account Number" required error={showErrors && !formData.accountNumber ? 'Wajib diisi' : undefined}><Input placeholder="e.g. 114400..." value={formData.accountNumber} onChange={e => updateForm('accountNumber', e.target.value)} /></FormField>
          <FormField label="Payout Currency" required helperText="Auto-selected based on Bank Country." error={showErrors && !formData.currency ? 'Wajib diisi' : undefined}>
            <Select options={[{ value: 'MYR', label: 'MYR' }, { value: 'IDR', label: 'IDR' }, { value: 'SAR', label: 'SAR' }, { value: 'USD', label: 'USD' }]} value={formData.currency} onChange={e => updateForm('currency', e.target.value)} />
          </FormField>
        </div>
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Tax Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Tax / SST Number"><Input placeholder="Optional" value={formData.sst} onChange={e => updateForm('sst', e.target.value)} /></FormField>
        </div>
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Proof of Account</h3>
        <FormField label="Bank Statement">
          <FileUploader id="bank-statement-upload" accept=".pdf,.jpg,.png" maxSizeMB={5} />
        </FormField>
      </section>
    </div>
  );

  const renderSummary = () => {
    let finalPicName = formData.picName;
    let finalPicPosition = formData.picPosition;
    let finalPicEmail = formData.picEmail;
    let finalPicPhone = formData.picPhone ? `${formData.picPhoneCode} ${formData.picPhone}` : '';

    if (picType === 'existing' && selectedExistingUserId) {
      const user = mockUsers.find(u => u.id === selectedExistingUserId);
      if (user) {
        finalPicName = user.name;
        finalPicPosition = user.position;
        finalPicEmail = user.email;
        finalPicPhone = `${user.phoneCode} ${user.phone}`;
      }
    } else {
      finalPicPhone = formData.picPhone ? `${formData.picPhoneCode} ${formData.picPhone}` : '-';
    }

    return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      
      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Agency Information</h4>
          <div className="text-caption text-muted">Basic profile and license details</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(0)}>Edit</Button>
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-6)', padding: '0 var(--space-4)' }}>
        {formData.profileImage ? (
          <div style={{ flexShrink: 0 }}>
            <span className="text-caption text-muted" style={{ display: 'block', marginBottom: '8px' }}>Logo / Profile</span>
            <img src={formData.profileImage} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-default)' }} />
          </div>
        ) : (
          <div style={{ flexShrink: 0 }}>
            <span className="text-caption text-muted" style={{ display: 'block', marginBottom: '8px' }}>Logo / Profile</span>
            <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)' }}><Building2 size={32} /></div>
          </div>
        )}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div><span className="text-caption text-muted">Agency Name</span><div className="text-body-medium">{formData.name || '-'}</div></div>
        <div><span className="text-caption text-muted">Agency Type</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.type.replace('_', ' ')}</div></div>
        <div><span className="text-caption text-muted">License Category</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.licenseCategory}</div></div>
        <div><span className="text-caption text-muted">Office Type</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.officeType}</div></div>
        <div><span className="text-caption text-muted">SSM Number</span><div className="text-body-medium">{formData.ssm || '-'}</div></div>
        <div><span className="text-caption text-muted">MOTAC License Number</span><div className="text-body-medium">{formData.motac || '-'}</div></div>
        <div><span className="text-caption text-muted">License Validity</span><div className="text-body-medium">{formData.validityStart ? `${formData.validityStart} to ${formData.validityEnd}` : '-'}</div></div>
        <div><span className="text-caption text-muted">Status</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.status}</div></div>
        <div><span className="text-caption text-muted">Main Email</span><div className="text-body-medium">{formData.email || '-'}</div></div>
        <div><span className="text-caption text-muted">Main Phone</span><div className="text-body-medium">{formData.phone ? `${formData.phoneCode} ${formData.phone}` : '-'}</div></div>
        </div>
      </div>

      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Address & PIC</h4>
          <div className="text-caption text-muted">Location and person in charge</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(1)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        <div><span className="text-caption text-muted">Country</span><div className="text-body-medium">{formData.country || '-'}</div></div>
        <div><span className="text-caption text-muted">State</span><div className="text-body-medium">{formData.state || '-'}</div></div>
        <div><span className="text-caption text-muted">City</span><div className="text-body-medium">{formData.city || '-'}</div></div>
        <div><span className="text-caption text-muted">Postal Code</span><div className="text-body-medium">{formData.postalCode || '-'}</div></div>
        <div style={{ gridColumn: '1 / -1' }}><span className="text-caption text-muted">Street Address</span><div className="text-body-medium">{formData.street || '-'}</div></div>
        <div><span className="text-caption text-muted">PIC Name</span><div className="text-body-medium">{finalPicName || '-'}</div></div>
        <div><span className="text-caption text-muted">PIC Position</span><div className="text-body-medium">{finalPicPosition || '-'}</div></div>
        <div><span className="text-caption text-muted">PIC Email</span><div className="text-body-medium">{finalPicEmail || '-'}</div></div>
        <div><span className="text-caption text-muted">PIC Phone</span><div className="text-body-medium">{finalPicPhone}</div></div>
      </div>

      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Legal Documents</h4>
          <div className="text-caption text-muted">Uploaded certificates and licenses</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(2)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <CheckCircle size={16} className={uploadedDocs.ssm ? 'text-success' : 'text-danger'} />
          <span className={`text-body-medium ${!uploadedDocs.ssm && 'text-danger'}`}>SSM Certificate: {uploadedDocs.ssm ? 'Uploaded' : 'Missing (Required)'}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <CheckCircle size={16} className={uploadedDocs.motac ? 'text-success' : 'text-danger'} />
          <span className={`text-body-medium ${!uploadedDocs.motac && 'text-danger'}`}>MOTAC License: {uploadedDocs.motac ? 'Uploaded' : 'Missing (Required)'}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <CheckCircle size={16} className={uploadedDocs.umrah ? 'text-success' : 'text-muted'} />
          <span className={`text-body-medium ${!uploadedDocs.umrah && 'text-muted'}`}>Umrah/Ziarah: {uploadedDocs.umrah ? 'Uploaded' : 'Not provided'}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <CheckCircle size={16} className={uploadedDocs.pjh ? 'text-success' : 'text-muted'} />
          <span className={`text-body-medium ${!uploadedDocs.pjh && 'text-muted'}`}>PJH Certificate: {uploadedDocs.pjh ? 'Uploaded' : 'Not provided'}</span>
        </div>
      </div>

      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Settlement</h4>
          <div className="text-caption text-muted">Bank and tax details</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(3)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        <div><span className="text-caption text-muted">Bank Name</span><div className="text-body-medium">{formData.bankName || '-'}</div></div>
        <div><span className="text-caption text-muted">Account Holder</span><div className="text-body-medium">{formData.accountName || '-'}</div></div>
        <div><span className="text-caption text-muted">Account Number</span><div className="text-body-medium">{formData.accountNumber ? `•••• •••• ${formData.accountNumber.slice(-4)}` : '-'}</div></div>
        <div><span className="text-caption text-muted">Currency</span><div className="text-body-medium">{formData.currency || '-'}</div></div>
        <div><span className="text-caption text-muted">SST Number</span><div className="text-body-medium">{formData.sst || '-'}</div></div>
      </div>

      <section style={{ marginTop: 'var(--space-6)' }}>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Admin Verification Notes</h3>
        <FormField label="Internal Notes (Visible to Admins only)">
          <textarea 
            className="input-base" 
            style={{ width: '100%', minWidth: '100%', height: '120px', resize: 'vertical' }}
            rows={4} 
            placeholder="Add any internal remarks or findings during verification..."
            value={formData.internalNotes}
            onChange={e => updateForm('internalNotes', e.target.value)}
          />
        </FormField>
      </section>

      <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-warning)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warning)' }}>
        <label style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input type="checkbox" style={{ marginTop: '4px' }} checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
          <span className="text-body">I confirm that the information provided is accurate and ready for submission. I understand that critical fields will require Admin re-verification if edited later.</span>
        </label>
      </div>
    </div>
    );
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title={agencyId ? 'Edit Travel Agency' : 'Add Travel Agency'} 
        subtitle={agencyId ? 'Modify an existing travel agency profile.' : 'Create a new agency profile, verify legal documents, and set settlement details.'}
        breadcrumbs={[
          { label: 'Travel Agency Management' }, 
          { label: 'List', onClick: () => navigate('ta-list') },
          { label: agencyId ? 'Edit' : 'Add' }
        ]}
        actions={
          <Button variant="outline" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={handleStepClick} />

        <div style={{ marginTop: 'var(--space-8)' }}>
          {currentStep === 0 && renderAgencyInfo()}
          {currentStep === 1 && renderAddressAndPIC()}
          {currentStep === 2 && renderLegalDocs()}
          {currentStep === 3 && renderSettlement()}
          {currentStep === 4 && renderSummary()}
        </div>
      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <Button 
          variant="outline" 
          disabled={currentStep === 0}
          onClick={() => { setCurrentStep(prev => prev - 1); window.scrollTo(0, 0); }}
          leftIcon={<ChevronLeft size={16} />}
        >
          Back
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {isDraftSaved && <span className="text-caption text-muted">Draft saved {draftTime}</span>}
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('ta-list')}>Cancel</Button>
            <Button variant="outline" onClick={handleSaveDraft} leftIcon={<Save size={16} />}>Save Draft</Button>
            <Button 
              variant="primary" 
              onClick={handleNext} 
              disabled={currentStep === steps.length - 1 && !confirmed}
              rightIcon={currentStep === steps.length - 1 ? undefined : <ChevronRight size={16} />}
              leftIcon={currentStep === steps.length - 1 ? <CheckCircle size={16} /> : undefined}
            >
              {currentStep === steps.length - 1 ? 'Submit Agency' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
