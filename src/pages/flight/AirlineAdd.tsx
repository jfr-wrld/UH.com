import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { FileUploader } from '../../components/inputs/FileUploader';

export const AirlineAdd: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Add Airline"
        breadcrumbs={[{ label: 'Home' }, { label: 'Flight Catalog', onClick: () => navigate('flight-list') }, { label: 'Add Airline' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('flight-list'); }}>Cancel</Button>
            <Button variant="secondary" onClick={() => navigate('flight-list')}>Save as Draft</Button>
            <Button onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success');  navigate('flight-list'); }}>Publish Airline</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 800px)', gap: 'var(--space-6)' }}>
        
        {/* Airline Profile */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Airline Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <FormField label="Airline Name" required>
              <Input placeholder="Enter official airline name" />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="IATA Airline Code" required helpText="2 alphanumeric characters (e.g. MH, SV)">
                <Input placeholder="IATA Code" maxLength={2} />
              </FormField>
              <FormField label="ICAO Airline Code" helpText="3 letters (e.g. MAS, SVA)">
                <Input placeholder="ICAO Code" maxLength={3} />
              </FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Airline Country">
                <Select options={[{value: 'sa', label: 'Saudi Arabia'}, {value: 'my', label: 'Malaysia'}, {value: 'id', label: 'Indonesia'}]} placeholder="Select Country" value="" onChange={() => {}} />
              </FormField>
              <FormField label="Website">
                <Input type="url" placeholder="https://..." />
              </FormField>
            </div>
            <FormField label="Internal Notes">
              <textarea 
                placeholder="Optional internal reference notes" 
                style={{ width: '100%', minHeight: '100px', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: 'none', fontFamily: 'inherit', resize: 'vertical' }}
              />
            </FormField>
          </div>
        </section>

        {/* Airline Logo */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Airline Logo</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span className="text-body text-muted">Upload a clear, optimized logo (SVG, PNG, WebP) under 512KB.</span>
            <FileUploader 
              onFileSelect={(f) => console.log(f)}
              accept=".svg,.png,.webp"
              maxSizeMB={0.5}
            />
          </div>
        </section>

        {/* Visibility */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Status & Visibility</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <FormField label="Status" required>
              <Select options={[{value: 'draft', label: 'Draft'}, {value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}]} value="draft" onChange={() => {}} />
            </FormField>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <div>
                <span className="text-body-bold" style={{ display: 'block' }}>Available for Package</span>
                <span className="text-caption text-muted">Allow this airline to be used by Travel Agencies when creating packages.</span>
              </div>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <div>
                <span className="text-body-bold" style={{ display: 'block' }}>Customer Visible</span>
                <span className="text-caption text-muted">Show this airline name and logo in customer-facing package previews.</span>
              </div>
            </label>
          </div>
        </section>

      </div>
    </div>
  );
};
