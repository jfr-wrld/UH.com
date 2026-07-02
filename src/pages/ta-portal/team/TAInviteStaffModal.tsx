import React from 'react';
import { Modal } from '../../../components/feedback/Modal';
import { FormField } from '../../../components/inputs/FormField';
import { Input } from '../../../components/inputs/Input';
import { Select } from '../../../components/inputs/Select';
import { Button } from '../../../components/actions/Button';

interface TAInviteStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TAInviteStaffModal({ isOpen, onClose }: TAInviteStaffModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Staff"
      footer={
        <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Send Invitation</Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-2) 0' }}>
        <p className="text-sm text-text-secondary" style={{ margin: 0 }}>
          Enter details of the staff member to invite. They will receive an email invitation to setup their account password and access details.
        </p>

        <FormField label="Email Address" required>
          <Input type="email" placeholder="staff@example.com" />
        </FormField>
        
        <FormField label="Full Name" required>
          <Input placeholder="Staff's full name" />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-3)' }}>
          <FormField label="Code">
            <Select defaultValue="+62">
              <option value="+62">+62 (ID)</option>
              <option value="+60">+60 (MY)</option>
              <option value="+65">+65 (SG)</option>
            </Select>
          </FormField>
          <FormField label="Phone Number">
            <Input type="tel" placeholder="812345678" />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <FormField label="Role Template" required>
            <Select defaultValue="operations">
              <option value="owner">Agency Owner</option>
              <option value="admin">Agency Admin</option>
              <option value="operations">Operations Staff</option>
              <option value="sales">Sales / Booking Staff</option>
              <option value="finance">Finance Staff</option>
              <option value="cs">Customer Service Staff</option>
              <option value="marketing">Marketing Staff</option>
              <option value="auditor">Auditor / View Only</option>
            </Select>
          </FormField>

          <FormField label="Department">
            <Select defaultValue="operations">
              <option value="management">Management</option>
              <option value="operations">Operations</option>
              <option value="sales">Sales &amp; Booking</option>
              <option value="finance">Finance &amp; Accounts</option>
              <option value="cs">Customer Support</option>
              <option value="marketing">Marketing</option>
            </Select>
          </FormField>
        </div>

        <FormField label="Job Title">
          <Input placeholder="e.g. Senior Operations Officer" />
        </FormField>

        <FormField label="Personalized Invitation Message">
          <textarea
            rows={3}
            placeholder="Welcome to Al-Hijrah Travel team! Please set up your credentials..."
            style={{ 
              width: '100%', 
              padding: 'var(--space-3)', 
              borderRadius: 'var(--radius-md)', 
              border: 'var(--border-default)', 
              fontSize: '14px', 
              resize: 'vertical', 
              fontFamily: 'inherit' 
            }}
          />
        </FormField>
      </div>
    </Modal>
  );
}
