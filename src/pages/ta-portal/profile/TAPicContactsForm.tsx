import React from 'react';
import { FormField } from '../../../components/inputs/FormField';
import { Input } from '../../../components/inputs/Input';
import { Button } from '../../../components/actions/Button';
import { User, Headphones } from 'lucide-react';

export function TAPicContactsForm() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Section Header - PIC */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
          <User size={20} />
        </div>
        <div>
          <h3 className="text-subsection-title" style={{ margin: 0 }}>Person In Charge (PIC)</h3>
          <p className="text-caption text-muted" style={{ margin: 0 }}>Main accountable person for this agency.</p>
        </div>
      </div>

      {/* PIC Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        <FormField label="PIC Full Name" required>
          <Input defaultValue="Ahmad Abdullah" />
        </FormField>
        <FormField label="PIC Position" required>
          <Input defaultValue="Director" />
        </FormField>
        <FormField label="PIC Email" required>
          <Input type="email" defaultValue="ahmad@alhijrah.example.com" />
        </FormField>
        <FormField label="PIC Phone Number" required>
          <Input type="tel" defaultValue="+628123456789" />
        </FormField>
      </div>

      {/* Section Header - Support */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success-dark)' }}>
          <Headphones size={20} />
        </div>
        <div>
          <h3 className="text-subsection-title" style={{ margin: 0 }}>Support &amp; Operational Contacts</h3>
          <p className="text-caption text-muted" style={{ margin: 0 }}>Used for customer support and finance notifications.</p>
        </div>
      </div>

      {/* Support Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        <FormField label="Support Email">
          <Input type="email" defaultValue="support@alhijrah.example.com" />
        </FormField>
        <FormField label="Support Phone">
          <Input type="tel" defaultValue="+6281299998888" />
        </FormField>
        <FormField label="Finance Email">
          <Input type="email" defaultValue="finance@alhijrah.example.com" />
        </FormField>
        <FormField label="Emergency Contact">
          <Input type="tel" placeholder="+62..." />
        </FormField>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-5)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
}
