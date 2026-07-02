import React, { useState } from 'react';
import { Modal } from '../feedback/Modal';
import { FormField } from '../inputs/FormField';
import { Input } from '../inputs/Input';
import { Select } from '../inputs/Select';
import { Button } from '../actions/Button';
import { UploadCloud, File, X, CheckCircle } from 'lucide-react';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId?: string;
  defaultAmount?: number;
  onSuccess?: () => void;
}

export function RecordPaymentModal({ isOpen, onClose, invoiceId, defaultAmount, onSuccess }: RecordPaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    paymentDate: new Date().toISOString().split('T')[0],
    paymentAmount: defaultAmount || 0,
    paymentMethod: 'bank_transfer',
    paymentReference: '',
    internalNote: '',
    notifyCustomer: true
  });

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (onSuccess) onSuccess();
      onClose();
    }, 1000);
  };

  const renderContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="Invoice Reference" required>
          <Input value={invoiceId || 'INV-2026-0001'} disabled />
        </FormField>
        <FormField label="Payment Date" required>
          <Input type="date" value={formData.paymentDate} onChange={(e) => updateForm('paymentDate', e.target.value)} />
        </FormField>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="Payment Amount (RM)" required>
          <Input type="number" value={formData.paymentAmount} onChange={(e) => updateForm('paymentAmount', Number(e.target.value))} />
        </FormField>
        <FormField label="Payment Method" required>
          <Select 
            value={formData.paymentMethod} 
            onChange={(e) => updateForm('paymentMethod', e.target.value)}
            options={[
              { value: 'bank_transfer', label: 'Bank Transfer / FPX' },
              { value: 'cash', label: 'Cash' },
              { value: 'cheque', label: 'Cheque' },
              { value: 'card', label: 'Credit / Debit Card' },
              { value: 'manual', label: 'Manual Adjustment' }
            ]}
          />
        </FormField>
      </div>

      <FormField label="Payment Reference" required={formData.paymentMethod !== 'cash'}>
        <Input placeholder="e.g. Transaction ID, Cheque Number" value={formData.paymentReference} onChange={(e) => updateForm('paymentReference', e.target.value)} />
      </FormField>

      <FormField label="Payment Proof (Receipt / Transfer Slip)">
        {!uploadedFile ? (
          <div style={{ border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', textAlign: 'center', backgroundColor: 'var(--surface-sunken)' }}>
            <UploadCloud size={24} className="text-muted" style={{ margin: '0 auto var(--space-2)' }} />
            <p className="text-body text-muted" style={{ marginBottom: 'var(--space-3)' }}>Upload receipt image or PDF</p>
            <Button variant="secondary" size="sm" onClick={() => document.getElementById('payment-proof-upload')?.click()}>Browse Files</Button>
            <input id="payment-proof-upload" type="file" style={{ display: 'none' }} accept="image/*,.pdf" onChange={handleFileUpload} />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <File size={20} className="text-primary" />
              <div>
                <div className="text-body-bold">{uploadedFile.name}</div>
                <div className="text-caption text-muted">{(uploadedFile.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
            <Button variant="ghost" leftIcon={<X size={16} />} onClick={() => setUploadedFile(null)} />
          </div>
        )}
      </FormField>

      <FormField label="Internal Note">
        <Input placeholder="Add any notes for finance team..." value={formData.internalNote} onChange={(e) => updateForm('internalNote', e.target.value)} />
      </FormField>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
        <input 
          type="checkbox" 
          id="notifyCustomer" 
          checked={formData.notifyCustomer} 
          onChange={(e) => updateForm('notifyCustomer', e.target.checked)} 
          style={{ width: '16px', height: '16px' }}
        />
        <label htmlFor="notifyCustomer" className="text-body" style={{ cursor: 'pointer' }}>Send payment receipt to customer</label>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Manual Payment"
      size="md"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', width: '100%' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button leftIcon={<CheckCircle size={16} />} onClick={handleSubmit} isLoading={loading} disabled={!formData.paymentAmount || (formData.paymentMethod !== 'cash' && !formData.paymentReference)}>
            Record Payment
          </Button>
        </div>
      }
    >
      {renderContent()}
    </Modal>
  );
}
