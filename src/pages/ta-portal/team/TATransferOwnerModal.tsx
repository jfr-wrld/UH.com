import React, { useState } from 'react';
import { Modal } from '../../../components/feedback/Modal';
import { FormField } from '../../../components/inputs/FormField';
import { Select } from '../../../components/inputs/Select';
import { Input } from '../../../components/inputs/Input';
import { Button } from '../../../components/actions/Button';

interface TATransferOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TATransferOwnerModal({ isOpen, onClose }: TATransferOwnerModalProps) {
  const [confirmPhrase, setConfirmPhrase] = useState('');
  const [keepAccess, setKeepAccess] = useState(true);
  const targetPhrase = 'TRANSFER';

  const isConfirmed = confirmPhrase.toUpperCase() === targetPhrase;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transfer Owner Access"
      footer={
        <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="danger" disabled={!isConfirmed}>Confirm Transfer</Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-2) 0' }}>
        <div style={{
          padding: 'var(--space-4)',
          backgroundColor: 'var(--color-danger-light)',
          color: 'var(--color-danger)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-danger-light)',
          fontSize: '13px',
          lineHeight: '1.4'
        }}>
          <strong>CRITICAL SECURITY WARNING:</strong> This action will transfer primary ownership of the Travel Agency account. You will no longer be able to modify roles, configure custom permission groups, or delete other owners unless access is kept.
        </div>

        <FormField label="Select New Owner" required>
          <Select defaultValue="">
            <option value="" disabled>Select active staff</option>
            <option value="2">Siti Fatima (siti@alhijrah.com) - Operations Staff</option>
            <option value="3">Budi Santoso (budi@alhijrah.com) - Finance Staff</option>
          </Select>
        </FormField>

        {/* Keep Current Owner Access Toggle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: 'var(--color-text-neutral)', padding: 'var(--space-2) 0' }}>
          <input
            type="checkbox"
            checked={keepAccess}
            onChange={(e) => setKeepAccess(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
          />
          Keep my account access as Agency Admin
        </label>
        
        {/* Security Confirmation (Phrase matching) */}
        <FormField 
          label={`Type "${targetPhrase}" to confirm`} 
          required 
          helperText="Type the confirmation phrase to prevent accidental transfer."
        >
          <Input 
            placeholder="Type TRANSFER" 
            value={confirmPhrase} 
            onChange={(e) => setConfirmPhrase(e.target.value)} 
          />
        </FormField>

        {/* Password Confirmation */}
        <FormField label="Security Confirmation" required helperText="Please enter your current account password.">
          <Input type="password" placeholder="Password" />
        </FormField>
      </div>
    </Modal>
  );
}
