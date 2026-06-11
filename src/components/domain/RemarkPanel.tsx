import React, { useState } from 'react';
import { FormField } from '../inputs/FormField';
import { Input } from '../inputs/Input';
import { Select } from '../inputs/Select';
import { Button } from '../actions/Button';
import { Badge } from '../data-display/Badge';
import { classNames } from '../../lib/utils';
import { Send } from 'lucide-react';

export interface Remark {
  id: string;
  author: string;
  timestamp: string;
  content: string;
  priority: 'low' | 'normal' | 'high';
  category?: string;
}

export interface RemarkPanelProps {
  remarks: Remark[];
  onAddRemark: (content: string, priority: string, category: string) => void;
}

export const RemarkPanel: React.FC<RemarkPanelProps> = ({ remarks, onAddRemark }) => {
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('normal');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddRemark(content, priority, category);
      setContent('');
      setPriority('normal');
      setCategory('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--space-4)',
        padding: 'var(--space-4)',
        backgroundColor: 'var(--surface-sunken)',
        borderRadius: 'var(--radius-lg)',
        border: 'none'
      }}>
        <h4 className="text-body-medium">Add Internal Remark</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Priority">
            <Select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'High' }
              ]}
            />
          </FormField>
          <FormField label="Category">
            <Select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: '', label: 'General' },
                { value: 'finance', label: 'Finance' },
                { value: 'compliance', label: 'Compliance' },
                { value: 'operations', label: 'Operations' }
              ]}
            />
          </FormField>
        </div>

        <FormField label="Remark" required>
          <Input 
            value={content} 
            onChange={setContent} 
            placeholder="Type internal note here..." 
          />
        </FormField>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="primary" leftIcon={<Send size={16} />} disabled={!content.trim()}>
            Post Remark
          </Button>
        </div>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h4 className="text-body-medium">Previous Remarks</h4>
        {remarks.length === 0 ? (
          <p className="text-body text-muted">No internal remarks yet.</p>
        ) : (
          remarks.map(remark => (
            <div key={remark.id} style={{ 
              padding: 'var(--space-4)', 
              backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', 
              borderRadius: 'var(--radius-md)',
              border: 'none',
              borderLeft: `4px solid ${
                remark.priority === 'high' ? 'var(--color-danger)' : 
                remark.priority === 'low' ? 'var(--color-info)' : 'var(--color-primary)'
              }`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                  <span className="text-body-medium">{remark.author}</span>
                  {remark.category && <Badge variant="neutral">{remark.category}</Badge>}
                </div>
                <span className="text-caption text-muted">{remark.timestamp}</span>
              </div>
              <p className="text-body">{remark.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
