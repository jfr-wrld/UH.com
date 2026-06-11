import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { FileUploader } from '../../components/inputs/FileUploader';
import { Stepper } from '../../components/navigation/Stepper';
import { useDataFilter } from '../../hooks/useDataFilter';

export const TravelAgencyForm: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void, agencyId?: string }> = ({ navigate, showToast, agencyId  }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Agency Info' },
    { label: 'Address & PIC' },
    { label: 'Legal Docs' },
    { label: 'Settlement' },
    { label: 'Review' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit form
      if (showToast) showToast('Success', 'Action completed successfully.', 'success');
    navigate('ta-list');
    }
  };

  const renderAgencyInfo = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '800px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="Travel Agency Name" required>
          <Input placeholder="Enter official name" />
        </FormField>
        <FormField label="Agency Type" required>
          <Select options={[
            { value: 'travel_agency', label: 'Travel Agency' },
            { value: 'tour_operator', label: 'Tour Operator' },
            { value: 'branch_office', label: 'Branch Office' }
          ]} />
        </FormField>
        <FormField label="License Category" required>
          <Select options={[
            { value: 'umrah', label: 'Umrah/Ziarah' },
            { value: 'inbound', label: 'Inbound' },
            { value: 'outbound', label: 'Outbound' }
          ]} />
        </FormField>
        <FormField label="Office Type" required>
          <Select options={[
            { value: 'head', label: 'Head Office' },
            { value: 'branch', label: 'Branch' }
          ]} />
        </FormField>
        <FormField label="SSM Registration Number" required>
          <Input placeholder="e.g. 202301004567" />
        </FormField>
        <FormField label="MOTAC License Number" required>
          <Input placeholder="e.g. KPK/LN: 12345" />
        </FormField>
        <FormField label="License Validity Period" required>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Input type="date" />
            <Input type="date" />
          </div>
        </FormField>
        <FormField label="Status" required>
          <Select options={[
            { value: 'active', label: 'Active' },
            { value: 'pending', label: 'Pending Verification' },
            { value: 'inactive', label: 'Inactive' }
          ]} />
        </FormField>
        <FormField label="Main Email" required>
          <Input type="email" placeholder="contact@agency.com" />
        </FormField>
        <FormField label="Main Phone Number" required>
          <Input type="tel" placeholder="+60 12 345 6789" />
        </FormField>
      </div>
      
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Social Media (Optional)</h3>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '800px' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Agency Address</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Country" required><Select options={[{ value: 'MY', label: 'Malaysia' }]} /></FormField>
          <FormField label="State" required><Input placeholder="e.g. Selangor" /></FormField>
          <FormField label="City" required><Input placeholder="e.g. Shah Alam" /></FormField>
          <FormField label="Postal Code" required><Input placeholder="e.g. 40000" /></FormField>
          <div style={{ gridColumn: '1 / -1' }}>
            <FormField label="Street Address" required><Input placeholder="Full office address" /></FormField>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>PIC Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Full Name" required><Input placeholder="PIC Name" /></FormField>
          <FormField label="Position" required><Input placeholder="e.g. Director" /></FormField>
          <FormField label="Email" required><Input type="email" placeholder="pic@agency.com" /></FormField>
          <FormField label="Phone" required><Input type="tel" placeholder="+60..." /></FormField>
        </div>
      </section>
    </div>
  );

  const renderLegalDocs = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '800px' }}>
      <FormField label="SSM Certificate" required>
        <FileUploader id="ssm-upload" accept=".pdf,.jpg,.png" maxSize={5} onUpload={async (files) => console.log(files)} />
      </FormField>
      <FormField label="MOTAC License" required>
        <FileUploader id="motac-upload" accept=".pdf,.jpg,.png" maxSize={5} onUpload={async (files) => console.log(files)} />
      </FormField>
      <FormField label="Umrah/Ziarah Authorization">
        <FileUploader id="umrah-auth-upload" accept=".pdf,.jpg,.png" maxSize={5} onUpload={async (files) => console.log(files)} />
      </FormField>
      <FormField label="PJH Certificate (If applicable)">
        <FileUploader id="pjh-upload" accept=".pdf,.jpg,.png" maxSize={5} onUpload={async (files) => console.log(files)} />
      </FormField>
    </div>
  );

  const renderSettlement = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: '800px' }}>
      <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Settlement & Bank Details</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="Bank Country" required><Select options={[{ value: 'MY', label: 'Malaysia' }]} /></FormField>
        <FormField label="Bank Name" required><Input placeholder="e.g. Maybank" /></FormField>
        <FormField label="Account Holder Name" required><Input placeholder="Must match agency official name" /></FormField>
        <FormField label="Bank Account Number" required><Input placeholder="e.g. 114400..." /></FormField>
        <FormField label="Payout Currency" required><Select options={[{ value: 'MYR', label: 'MYR' }]} /></FormField>
        <FormField label="Tax / SST Number"><Input placeholder="Optional" /></FormField>
      </div>
      <FormField label="Bank Statement (Proof of Account)">
        <FileUploader id="bank-statement-upload" accept=".pdf,.jpg,.png" maxSize={5} onUpload={async (files) => console.log(files)} />
      </FormField>
    </div>
  );

  const renderSummary = () => (
    <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', maxWidth: '800px' }}>
      <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Review Data</h3>
      <p className="text-body text-muted">Please review all information before submitting. Once submitted, critical fields will require Admin re-verification if edited.</p>
    </div>
  );
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(steps);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title={agencyId ? 'Edit Travel Agency' : 'Add Travel Agency'} 
        breadcrumbs={[
          { label: 'Travel Agency Management' }, 
          { label: 'List', onClick: () => navigate('ta-list') },
          { label: agencyId ? 'Edit' : 'Add' }
        ]}
      />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
        <Stepper steps={steps} currentStep={currentStep} />

        <div style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
          {currentStep === 0 && renderAgencyInfo()}
          {currentStep === 1 && renderAddressAndPIC()}
          {currentStep === 2 && renderLegalDocs()}
          {currentStep === 3 && renderSettlement()}
          {currentStep === 4 && renderSummary()}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-4)' }}>
          <Button 
            variant="ghost" 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
          >
            Back
          </Button>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('ta-list')}>Cancel</Button>
            <Button variant="primary" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Submit Agency' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
