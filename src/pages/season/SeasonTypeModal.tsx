import React from 'react';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';

export const SeasonTypeModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-4)' }}>
          <h2 className="text-section-title">Add Season Type</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)' }}>&times;</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Season Type Name" required>
              <Input placeholder="e.g. Low Season" />
            </FormField>
            <FormField label="Display Label">
              <Input placeholder="e.g. Low" />
            </FormField>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Sort Order">
              <Input type="number" placeholder="1-99" />
            </FormField>
          
          <FormField label="Color Tag" required>
            <Select 
              options={[
                { value: 'success', label: 'Green (Low)' },
                { value: 'warning', label: 'Yellow (Medium)' },
                { value: 'danger', label: 'Red (Peak)' },
                { value: 'primary', label: 'Blue (Custom)' }
              ]} 
              value="success" 
              onChange={() => {}} 
            />
          </FormField>
          </div>

          <FormField label="Status" required>
            <Select 
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' }
              ]} 
              value="active" 
              onChange={() => {}} 
            />
          </FormField>
          
          <FormField label="Description">
            <textarea 
              className="input-field" 
              rows={3} 
              placeholder="Internal explanation..."
              style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-input)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)' }}
            />
          </FormField>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Save Season Type</Button>
        </div>
        
      </div>
    </div>
  );
};
