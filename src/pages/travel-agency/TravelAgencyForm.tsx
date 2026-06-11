import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { FileUploader } from '../../components/inputs/FileUploader';
import { Stepper } from '../../components/navigation/Stepper';
import { Edit, CheckCircle } from 'lucide-react';

export const TravelAgencyForm: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void, agencyId?: string }> = ({ navigate, showToast, agencyId  }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [draftTime, setDraftTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
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
    phone: '',
    country: 'Malaysia',
    state: '',
    city: '',
    postalCode: '',
    street: '',
    picName: '',
    picPosition: '',
    picEmail: '',
    picPhone: '',
    bankCountry: 'Malaysia',
    bankName: '',
    accountName: '',
    accountNumber: '',
    currency: 'MYR',
    sst: ''
  });

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { id: '1', label: 'Agency Info' },
    { id: '2', label: 'Address & PIC' },
    { id: '3', label: 'Legal Docs' },
    { id: '4', label: 'Settlement' },
    { id: '5', label: 'Review' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      if (showToast) showToast('Success', 'Travel Agency submitted successfully.', 'success');
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
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Basic Information</h3>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <FormField label="Agency Logo / Profile Image">
            <FileUploader id="logo-upload" accept=".jpg,.png,.jpeg" maxSizeMB={2} />
          </FormField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Travel Agency Name" required>
            <Input placeholder="Enter official name" value={formData.name} onChange={e => updateForm('name', e.target.value)} />
          </FormField>
          <FormField label="Agency Type" required>
            <Select options={[
              { value: 'travel_agency', label: 'Travel Agency' },
              { value: 'tour_operator', label: 'Tour Operator' },
              { value: 'branch_office', label: 'Branch Office' }
            ]} value={formData.type} onChange={e => updateForm('type', e.target.value)} />
          </FormField>
        </div>
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>License Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="License Category" required>
            <Select options={[
              { value: 'umrah', label: 'Umrah/Ziarah' },
              { value: 'inbound', label: 'Inbound' },
              { value: 'outbound', label: 'Outbound' }
            ]} value={formData.licenseCategory} onChange={e => updateForm('licenseCategory', e.target.value)} />
          </FormField>
          <FormField label="Office Type" required>
            <Select options={[
              { value: 'head', label: 'Head Office' },
              { value: 'branch', label: 'Branch' }
            ]} value={formData.officeType} onChange={e => updateForm('officeType', e.target.value)} />
          </FormField>
          <FormField label="SSM Registration Number" required helperText="Enter the official company registration number.">
            <Input placeholder="e.g. 202301004567" value={formData.ssm} onChange={e => updateForm('ssm', e.target.value)} />
          </FormField>
          <FormField label="MOTAC License Number" required helperText="Must match the uploaded MOTAC license document.">
            <Input placeholder="e.g. KPK/LN: 12345" value={formData.motac} onChange={e => updateForm('motac', e.target.value)} />
          </FormField>
          <FormField label="License Validity Period" required>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Input type="date" value={formData.validityStart} onChange={e => updateForm('validityStart', e.target.value)} />
              <Input type="date" value={formData.validityEnd} onChange={e => updateForm('validityEnd', e.target.value)} />
            </div>
          </FormField>
          <FormField label="Status" required>
            <Select options={[
              { value: 'active', label: 'Active' },
              { value: 'pending', label: 'Pending Verification' },
              { value: 'inactive', label: 'Inactive' }
            ]} value={formData.status} onChange={e => updateForm('status', e.target.value)} />
          </FormField>
        </div>
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Contact Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Main Email" required>
            <Input type="email" placeholder="contact@agency.com" value={formData.email} onChange={e => updateForm('email', e.target.value)} />
          </FormField>
          <FormField label="Main Phone Number" required>
            <Input type="tel" placeholder="+60 12 345 6789" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} />
          </FormField>
        </div>
      </section>
      
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Online Presence (Optional)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Website"><Input placeholder="https://" /></FormField>
          <FormField label="WhatsApp"><Input placeholder="+60..." /></FormField>
          <FormField label="Instagram"><Input placeholder="@username" /></FormField>
          <FormField label="Facebook"><Input placeholder="Page URL" /></FormField>
        </div>
      </section>
    </div>
  );

  const renderAddressAndPIC = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Agency Address</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Country" required><Select options={[{ value: 'Malaysia', label: 'Malaysia' }]} value={formData.country} onChange={e => updateForm('country', e.target.value)} /></FormField>
          <FormField label="State" required><Input placeholder="e.g. Selangor" value={formData.state} onChange={e => updateForm('state', e.target.value)} /></FormField>
          <FormField label="City" required><Input placeholder="e.g. Shah Alam" value={formData.city} onChange={e => updateForm('city', e.target.value)} /></FormField>
          <FormField label="Postal Code" required><Input placeholder="e.g. 40000" value={formData.postalCode} onChange={e => updateForm('postalCode', e.target.value)} /></FormField>
          <div style={{ gridColumn: '1 / -1' }}>
            <FormField label="Street Address" required><Input placeholder="Full office address" value={formData.street} onChange={e => updateForm('street', e.target.value)} /></FormField>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>PIC Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Full Name" required><Input placeholder="PIC Name" value={formData.picName} onChange={e => updateForm('picName', e.target.value)} /></FormField>
          <FormField label="Position" required><Input placeholder="e.g. Director" value={formData.picPosition} onChange={e => updateForm('picPosition', e.target.value)} /></FormField>
          <FormField label="Email" required><Input type="email" placeholder="pic@agency.com" value={formData.picEmail} onChange={e => updateForm('picEmail', e.target.value)} /></FormField>
          <FormField label="Phone" required><Input type="tel" placeholder="+60..." value={formData.picPhone} onChange={e => updateForm('picPhone', e.target.value)} /></FormField>
        </div>
      </section>
    </div>
  );

  const renderLegalDocs = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <FormField label="SSM Certificate" required>
        <FileUploader id="ssm-upload" accept=".pdf,.jpg,.png" maxSizeMB={5} required />
      </FormField>
      <FormField label="MOTAC License" required>
        <FileUploader id="motac-upload" accept=".pdf,.jpg,.png" maxSizeMB={5} required />
      </FormField>
      <FormField label="Umrah/Ziarah Authorization">
        <FileUploader id="umrah-auth-upload" accept=".pdf,.jpg,.png" maxSizeMB={5} />
      </FormField>
      <FormField label="PJH Certificate (If applicable)">
        <FileUploader id="pjh-upload" accept=".pdf,.jpg,.png" maxSizeMB={5} />
      </FormField>
    </div>
  );

  const renderSettlement = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Bank Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Bank Country" required><Select options={[{ value: 'Malaysia', label: 'Malaysia' }]} value={formData.bankCountry} onChange={e => updateForm('bankCountry', e.target.value)} /></FormField>
          <FormField label="Bank Name" required><Input placeholder="e.g. Maybank" value={formData.bankName} onChange={e => updateForm('bankName', e.target.value)} /></FormField>
          <FormField label="Account Holder Name" required helperText="Must match the registered agency/company name.">
            <Input placeholder="Official Name" value={formData.accountName} onChange={e => updateForm('accountName', e.target.value)} />
          </FormField>
          <FormField label="Bank Account Number" required><Input placeholder="e.g. 114400..." value={formData.accountNumber} onChange={e => updateForm('accountNumber', e.target.value)} /></FormField>
          <FormField label="Payout Currency" required helperText="Settlement details will be used for payout processing.">
            <Select options={[{ value: 'MYR', label: 'MYR' }]} value={formData.currency} onChange={e => updateForm('currency', e.target.value)} />
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

  const renderSummary = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      
      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Agency Information</h4>
          <div className="text-caption text-muted">Basic profile and license details</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(0)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        <div><span className="text-caption text-muted">Agency Name</span><div className="text-body-medium">{formData.name || '-'}</div></div>
        <div><span className="text-caption text-muted">Agency Type</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.type.replace('_', ' ')}</div></div>
        <div><span className="text-caption text-muted">License Category</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.licenseCategory}</div></div>
        <div><span className="text-caption text-muted">Office Type</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.officeType}</div></div>
        <div><span className="text-caption text-muted">SSM Number</span><div className="text-body-medium">{formData.ssm || '-'}</div></div>
        <div><span className="text-caption text-muted">MOTAC License Number</span><div className="text-body-medium">{formData.motac || '-'}</div></div>
        <div><span className="text-caption text-muted">License Validity</span><div className="text-body-medium">{formData.validityStart ? `${formData.validityStart} to ${formData.validityEnd}` : '-'}</div></div>
        <div><span className="text-caption text-muted">Status</span><div className="text-body-medium" style={{ textTransform: 'capitalize' }}>{formData.status}</div></div>
        <div><span className="text-caption text-muted">Main Email</span><div className="text-body-medium">{formData.email || '-'}</div></div>
        <div><span className="text-caption text-muted">Main Phone</span><div className="text-body-medium">{formData.phone || '-'}</div></div>
      </div>

      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Address & PIC</h4>
          <div className="text-caption text-muted">Location and person in charge</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(1)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        <div><span className="text-caption text-muted">Country</span><div className="text-body-medium">{formData.country}</div></div>
        <div><span className="text-caption text-muted">State</span><div className="text-body-medium">{formData.state || '-'}</div></div>
        <div><span className="text-caption text-muted">City</span><div className="text-body-medium">{formData.city || '-'}</div></div>
        <div><span className="text-caption text-muted">Postal Code</span><div className="text-body-medium">{formData.postalCode || '-'}</div></div>
        <div style={{ gridColumn: '1 / -1' }}><span className="text-caption text-muted">Street Address</span><div className="text-body-medium">{formData.street || '-'}</div></div>
        <div><span className="text-caption text-muted">PIC Name</span><div className="text-body-medium">{formData.picName || '-'}</div></div>
        <div><span className="text-caption text-muted">PIC Position</span><div className="text-body-medium">{formData.picPosition || '-'}</div></div>
        <div><span className="text-caption text-muted">PIC Email</span><div className="text-body-medium">{formData.picEmail || '-'}</div></div>
        <div><span className="text-caption text-muted">PIC Phone</span><div className="text-body-medium">{formData.picPhone || '-'}</div></div>
      </div>

      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Legal Documents</h4>
          <div className="text-caption text-muted">Uploaded certificates and licenses</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(2)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><CheckCircle size={16} className="text-success" /><span className="text-body-medium">SSM Certificate: Uploaded</span></div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><CheckCircle size={16} className="text-success" /><span className="text-body-medium">MOTAC License: Uploaded</span></div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><CheckCircle size={16} className="text-muted" /><span className="text-body-medium text-muted">Umrah/Ziarah: Not provided</span></div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><CheckCircle size={16} className="text-muted" /><span className="text-body-medium text-muted">PJH Certificate: Not applicable</span></div>
      </div>

      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 className="text-body-bold" style={{ marginBottom: '4px' }}>Settlement</h4>
          <div className="text-caption text-muted">Bank and tax details</div>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />} onClick={() => setCurrentStep(3)}>Edit</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
        <div><span className="text-caption text-muted">Bank Country</span><div className="text-body-medium">{formData.bankCountry}</div></div>
        <div><span className="text-caption text-muted">Bank Name</span><div className="text-body-medium">{formData.bankName || '-'}</div></div>
        <div><span className="text-caption text-muted">Account Holder</span><div className="text-body-medium">{formData.accountName || '-'}</div></div>
        <div><span className="text-caption text-muted">Account Number</span><div className="text-body-medium">{formData.accountNumber ? `•••• •••• ${formData.accountNumber.slice(-4)}` : '-'}</div></div>
        <div><span className="text-caption text-muted">Payout Currency</span><div className="text-body-medium">{formData.currency}</div></div>
        <div><span className="text-caption text-muted">SST Number</span><div className="text-body-medium">{formData.sst || '-'}</div></div>
      </div>

      <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-warning)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warning)' }}>
        <label style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input type="checkbox" style={{ marginTop: '4px' }} checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
          <span className="text-body">I confirm that the information provided is accurate and ready for submission. I understand that critical fields will require Admin re-verification if edited later.</span>
        </label>
      </div>
    </div>
  );
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: '120px' }}>
      <PageHeader 
        title={agencyId ? 'Edit Travel Agency' : 'Add Travel Agency'} 
        subtitle={agencyId ? 'Modify an existing travel agency profile.' : 'Create a new agency profile, verify legal documents, and set settlement details.'}
        breadcrumbs={[
          { label: 'Travel Agency Management' }, 
          { label: 'List', onClick: () => navigate('ta-list') },
          { label: agencyId ? 'Edit' : 'Add' }
        ]}
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <Stepper steps={steps} currentStepIndex={currentStep} />

        <div style={{ marginTop: 'var(--space-8)' }}>
          {currentStep === 0 && renderAgencyInfo()}
          {currentStep === 1 && renderAddressAndPIC()}
          {currentStep === 2 && renderLegalDocs()}
          {currentStep === 3 && renderSettlement()}
          {currentStep === 4 && renderSummary()}
        </div>
      </div>

      {/* Sticky Footer */}
      <div style={{ position: 'fixed', bottom: 0, left: '260px', right: 0, backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <Button 
          variant="outline" 
          disabled={currentStep === 0}
          onClick={() => { setCurrentStep(prev => prev - 1); window.scrollTo(0, 0); }}
        >
          Back
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {isDraftSaved && <span className="text-caption text-muted">Draft saved {draftTime}</span>}
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('ta-list')}>Cancel</Button>
            <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
            <Button variant="primary" onClick={handleNext} disabled={currentStep === steps.length - 1 && !confirmed}>
              {currentStep === steps.length - 1 ? 'Submit Agency' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
