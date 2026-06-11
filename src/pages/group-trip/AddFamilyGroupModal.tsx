import React, { useState } from 'react';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Users, X, Search, UserPlus } from 'lucide-react';
import { Badge } from '../../components/data-display/Badge';

export const AddFamilyGroupModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [memberMode, setMemberMode] = useState<'list' | 'search' | 'invite'>('list');

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ width: '800px', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxHeight: '90vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-section-title">Create Family / Group</h2>
          <Button variant="ghost" onClick={onClose}><X size={20} /></Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
          <FormField label="Group Image">
            <div style={{ border: '1px dashed var(--border-default)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <Button variant="secondary" size="sm">Upload Cover</Button>
            </div>
          </FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Group Name" required><Input placeholder="e.g. Hassan Family" /></FormField>
            <FormField label="Group Type"><Select options={[{value: 'family', label: 'Family'}]} value="family" onChange={() => {}} /></FormField>
            <FormField label="Default Rooming"><Select options={[{value: 'together', label: 'Together'}, {value: 'separate', label: 'Separate by Gender'}]} value="together" onChange={() => {}} /></FormField>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <FormField label="Notes">
              <textarea className="input-base" placeholder="Internal group notes..." rows={2} style={{ width: '100%', resize: 'vertical' }} />
            </FormField>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

        {memberMode === 'list' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="text-subsection-title">Family Members</h3>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Button variant="secondary" size="sm" leftIcon={<Search size={16} />} onClick={() => setMemberMode('search')}>Search Existing</Button>
                <Button variant="secondary" size="sm" leftIcon={<UserPlus size={16} />} onClick={() => setMemberMode('invite')}>Invite New</Button>
              </div>
            </div>

            <div style={{ border: 'none', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', textAlign: 'center' }}>
              <span className="text-body text-muted">No members added yet. Click above to search or invite members.</span>
            </div>
          </>
        )}

        {memberMode === 'search' && (
          <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h4 className="text-body-bold">Search Existing Jamaah</h4>
              <Button variant="ghost" size="sm" onClick={() => setMemberMode('list')}>Cancel Search</Button>
            </div>
            <div style={{ position: 'relative', marginBottom: 'var(--space-4)' }}>
              <Search size={16} className="text-muted" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <Input placeholder="Search by name, email, or phone..." style={{ paddingLeft: '36px' }} />
            </div>
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                <input type="checkbox" />
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Zahid Kamaruddin</span>
                  <span className="text-caption text-muted">zahid@example.com</span>
                </div>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
              <Button onClick={() => setMemberMode('list')}>Add Selected to Family</Button>
            </div>
          </div>
        )}

        {memberMode === 'invite' && (
          <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
              <h4 className="text-body-bold">Invite New Member</h4>
              <Button variant="ghost" size="sm" onClick={() => setMemberMode('list')}>Cancel Invite</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Full Name" required><Input placeholder="Jane Doe" /></FormField>
              <FormField label="Email"><Input type="email" placeholder="jane@example.com" /></FormField>
              <FormField label="Phone Number" required><Input type="tel" placeholder="+60123456789" /></FormField>
              <FormField label="Gender" required>
                <Select options={[{value: 'female', label: 'Female'}, {value: 'male', label: 'Male'}]} value="female" onChange={() => {}} />
              </FormField>
              <FormField label="Relationship to PIC">
                <Select options={[{value: 'spouse', label: 'Spouse'}, {value: 'child', label: 'Child'}, {value: 'relative', label: 'Relative'}]} value="spouse" onChange={() => {}} />
              </FormField>
              <FormField label="Allocation Status" required>
                <Select options={[{value: 'pending', label: 'Pending'}, {value: 'confirmed', label: 'Confirmed'}, {value: 'waitlist', label: 'Waitlisted'}]} value="pending" onChange={() => {}} />
              </FormField>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              <input type="checkbox" defaultChecked />
              <span className="text-body-bold">Send Invitation Email to Jamaah</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
              <Button onClick={() => setMemberMode('list')}>Send Invitation & Add to Family</Button>
            </div>
          </div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Create Family & Add to Trip</Button>
        </div>
      </div>
    </div>
  );
};
