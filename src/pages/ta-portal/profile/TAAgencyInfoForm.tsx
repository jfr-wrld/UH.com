import React from 'react';
import { FormField } from '../../../components/inputs/FormField';
import { Input } from '../../../components/inputs/Input';
import { Select } from '../../../components/inputs/Select';
import { Button } from '../../../components/actions/Button';
import { ImageUploader } from '../../../components/inputs/ImageUploader';
import { Building2 } from 'lucide-react';

export function TAAgencyInfoForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
          <Building2 size={20} />
        </div>
        <div>
          <h3 className="text-subsection-title" style={{ margin: 0 }}>Agency Information</h3>
          <p className="text-caption text-muted" style={{ margin: 0 }}>Manage your official business identity and details.</p>
        </div>
      </div>

      {/* Logo + Fields */}
      <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'flex-start' }}>
        {/* Logo Upload */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
          <ImageUploader shape="square" size={140} />
          <span className="text-caption text-muted" style={{ textAlign: 'center', maxWidth: '140px' }}>Upload agency logo. 512×512px, max 2MB.</span>
        </div>

        {/* Form Fields */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
          <FormField label="Agency Name" required>
            <Input defaultValue="Al-Hijrah Travel" />
          </FormField>
          <FormField label="Registration Number" required>
            <Input defaultValue="REG-123456" />
          </FormField>
          <FormField label="Travel License Number">
            <Input defaultValue="LIC-987654" />
          </FormField>
          <FormField label="Agency Type" required>
            <Select defaultValue="umrah_hajj">
              <option value="umrah">Umrah</option>
              <option value="hajj">Hajj</option>
              <option value="umrah_hajj">Umrah &amp; Hajj</option>
              <option value="general">General Travel</option>
            </Select>
          </FormField>
          <FormField label="Country" required>
            <Select defaultValue="id">
              <option value="id">Indonesia</option>
              <option value="my">Malaysia</option>
              <option value="sg">Singapore</option>
            </Select>
          </FormField>
          <FormField label="Website">
            <Input placeholder="https://..." defaultValue="https://alhijrah.example.com" />
          </FormField>
          <div style={{ gridColumn: '1 / -1' }}>
            <FormField label="Description">
              <textarea
                className="form-textarea"
                rows={4}
                defaultValue="Trusted travel agency for Umrah and Hajj since 2010."
                style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: 'var(--border-default)', fontSize: '14px', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}
