import React from 'react';
import { FormField } from '../../../components/inputs/FormField';
import { Input } from '../../../components/inputs/Input';
import { Select } from '../../../components/inputs/Select';
import { Button } from '../../../components/actions/Button';
import { Landmark, AlertTriangle } from 'lucide-react';

export function TABankSettlementForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
          <Landmark size={20} />
        </div>
        <div>
          <h3 className="text-subsection-title" style={{ margin: 0 }}>Bank &amp; Settlement Information</h3>
          <p className="text-caption text-muted" style={{ margin: 0 }}>Configure the bank account for payouts and settlement.</p>
        </div>
      </div>

      {/* Warning Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-3)',
        padding: 'var(--space-4)',
        backgroundColor: 'var(--color-warning-light)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-warning)',
      }}>
        <AlertTriangle size={20} style={{ color: 'var(--color-warning-dark)', flexShrink: 0, marginTop: '1px' }} />
        <div>
          <span className="text-body-bold" style={{ color: 'var(--color-warning-dark)', display: 'block' }}>Verification Required</span>
          <span className="text-caption" style={{ color: 'var(--color-warning-dark)' }}>Any changes to bank information will require Admin review before it can be used for settlement payouts.</span>
        </div>
      </div>

      {/* Bank Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        <FormField label="Bank Country" required>
          <Select defaultValue="id">
            <option value="id">Indonesia</option>
            <option value="my">Malaysia</option>
          </Select>
        </FormField>
        <FormField label="Bank Name" required>
          <Select defaultValue="bca">
            <option value="bca">Bank Central Asia (BCA)</option>
            <option value="mandiri">Bank Mandiri</option>
            <option value="bsi">Bank Syariah Indonesia</option>
          </Select>
        </FormField>
        <FormField label="Account Holder Name" required helperText="Must match agency or authorized party.">
          <Input defaultValue="PT Al-Hijrah Travel Indonesia" />
        </FormField>
        <FormField label="Account Number" required>
          <Input defaultValue="**** **** 1234" />
        </FormField>
        <FormField label="SWIFT/BIC Code">
          <Input placeholder="Optional for domestic" />
        </FormField>
        <FormField label="Settlement Currency" required>
          <Select defaultValue="idr">
            <option value="idr">IDR - Indonesian Rupiah</option>
            <option value="myr">MYR - Malaysian Ringgit</option>
            <option value="usd">USD - US Dollar</option>
          </Select>
        </FormField>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit Change Request</Button>
      </div>
    </div>
  );
}
