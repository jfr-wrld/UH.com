import React, { useState } from 'react';
import { FormField } from '../../../components/inputs/FormField';
import { Input } from '../../../components/inputs/Input';
import { Select } from '../../../components/inputs/Select';
import { Button } from '../../../components/actions/Button';
import { MapPin, Building } from 'lucide-react';

export function TAAddressForm() {
  const [sameAsRegistered, setSameAsRegistered] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Section Header - Registered */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
          <Building size={20} />
        </div>
        <div>
          <h3 className="text-subsection-title" style={{ margin: 0 }}>Registered Address</h3>
          <p className="text-caption text-muted" style={{ margin: 0 }}>Your official company registered address.</p>
        </div>
      </div>

      {/* Registered Address Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        <FormField label="Country" required>
          <Select defaultValue="id">
            <option value="id">Indonesia</option>
            <option value="my">Malaysia</option>
          </Select>
        </FormField>
        <FormField label="State/Province" required>
          <Select defaultValue="jakarta">
            <option value="jakarta">DKI Jakarta</option>
            <option value="jabar">Jawa Barat</option>
          </Select>
        </FormField>
        <FormField label="City" required>
          <Select defaultValue="jaksel">
            <option value="jaksel">Jakarta Selatan</option>
            <option value="jakpus">Jakarta Pusat</option>
          </Select>
        </FormField>
        <FormField label="Postal Code" required>
          <Input defaultValue="12000" />
        </FormField>
        <div style={{ gridColumn: '1 / -1' }}>
          <FormField label="Full Registered Address" required>
            <textarea
              rows={3}
              defaultValue="Jl. Sudirman Kav 21, Gedung Hijrah Lt. 5"
              style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: 'var(--border-default)', fontSize: '14px', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </FormField>
        </div>
      </div>

      {/* Section Header - Operating */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success-dark)' }}>
            <MapPin size={20} />
          </div>
          <div>
            <h3 className="text-subsection-title" style={{ margin: 0 }}>Operating Address</h3>
            <p className="text-caption text-muted" style={{ margin: 0 }}>Physical location where the agency operates.</p>
          </div>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-neutral)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-sunken)' }}>
          <input
            type="checkbox"
            checked={sameAsRegistered}
            onChange={(e) => setSameAsRegistered(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
          />
          Same as registered address
        </label>
      </div>

      {/* Operating Address Section Container */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: 'var(--space-5)', 
        opacity: sameAsRegistered ? 0.7 : 1,
        transition: 'opacity 0.2s ease'
      }}>
        <FormField label="Country" required={!sameAsRegistered}>
          <Select defaultValue="id" disabled={sameAsRegistered}>
            <option value="id">Indonesia</option>
            <option value="my">Malaysia</option>
          </Select>
        </FormField>
        <FormField label="State/Province" required={!sameAsRegistered}>
          <Select defaultValue={sameAsRegistered ? "jakarta" : ""} disabled={sameAsRegistered}>
            <option value="" disabled>Select State</option>
            <option value="jakarta">DKI Jakarta</option>
            <option value="jabar">Jawa Barat</option>
          </Select>
        </FormField>
        <div style={{ gridColumn: '1 / -1' }}>
          <FormField label="Full Operating Address" required={!sameAsRegistered}>
            <textarea
              rows={3}
              disabled={sameAsRegistered}
              placeholder={sameAsRegistered ? "Same as registered address" : "Enter physical operating address..."}
              value={sameAsRegistered ? "Jl. Sudirman Kav 21, Gedung Hijrah Lt. 5" : undefined}
              style={{ 
                width: '100%', 
                padding: 'var(--space-3)', 
                borderRadius: 'var(--radius-md)', 
                border: 'var(--border-default)', 
                fontSize: '14px', 
                resize: 'vertical', 
                fontFamily: 'inherit',
                backgroundColor: sameAsRegistered ? 'var(--gray-50)' : 'var(--surface-base)'
              }}
            />
          </FormField>
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
