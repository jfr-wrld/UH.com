import React, { useState } from 'react';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Search, UserPlus, X } from 'lucide-react';
import { Select } from '../../components/inputs/Select';

export const AddJamaahModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'search' | 'invite'>('search');
  
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ width: '600px', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxHeight: '90vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-section-title">Add Jamaah</h2>
          <Button variant="ghost" onClick={onClose}><X size={20} /></Button>
        </div>

        <div style={{ display: 'flex', backgroundColor: 'var(--surface-sunken)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
          <Button variant={mode === 'search' ? 'primary' : 'ghost'} style={{ flex: 1 }} onClick={() => setMode('search')}>Search Existing Users</Button>
          <Button variant={mode === 'invite' ? 'primary' : 'ghost'} style={{ flex: 1 }} onClick={() => setMode('invite')}>Invite New User</Button>
        </div>

        {mode === 'search' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} className="text-muted" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <Input placeholder="Search by name, email, or phone..." style={{ paddingLeft: '36px' }} />
            </div>
            
            <div style={{ border: 'none', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <input type="checkbox" />
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span className="text-caption-bold">AH</span></div>
                  <div>
                    <span className="text-body-bold" style={{ display: 'block' }}>Ahmad Hassan</span>
                    <span className="text-caption text-muted">ahmad.h@example.com</span>
                  </div>
                </div>
                <span className="text-caption text-success">Active</span>
              </div>
            </div>
          </div>
        )}

        {mode === 'invite' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Full Name" required><Input placeholder="John Doe" /></FormField>
              <FormField label="Email" required><Input type="email" placeholder="john@example.com" /></FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Phone Number" required><Input type="tel" placeholder="+60123456789" /></FormField>
              <FormField label="Gender" required>
                <Select options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}]} value="male" onChange={() => {}} />
              </FormField>
              <FormField label="Date of Birth"><Input type="date" /></FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Nationality" required><Input defaultValue="Malaysian" /></FormField>
              <FormField label="Passport Number"><Input placeholder="A12345678" /></FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Allocation Status" required>
                <Select options={[{value: 'confirmed', label: 'Confirmed'}, {value: 'pending', label: 'Pending'}, {value: 'waitlist', label: 'Waitlisted'}]} value="pending" onChange={() => {}} />
              </FormField>
              <FormField label="Family / Group">
                <Select options={[{value: 'none', label: 'None (Individual)'}, {value: 'g1', label: 'Hassan Family'}]} value="none" onChange={() => {}} />
              </FormField>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <input type="checkbox" defaultChecked />
              <span className="text-body-bold">Send Invitation Email to Jamaah</span>
            </div>
            <Button leftIcon={<UserPlus size={16} />} style={{ marginTop: 'var(--space-2)' }}>Save & Add to Selected</Button>
          </div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Add Selected Users (0)</Button>
        </div>
      </div>
    </div>
  );
};
