import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Stepper } from '../../components/navigation/Stepper';
import { Plus, Trash2, Calendar, Edit, Link, Search, FileText, Calculator, Paperclip, CreditCard, User, Box, Send, AlertCircle, FileCheck, Save, CheckCircle } from 'lucide-react';

export const InvoiceCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);

  const steps = [
    { id: '1', label: 'Basic Setup' },
    { id: '2', label: 'Bill To Info' },
    { id: '3', label: 'Invoice Items' },
    { id: '4', label: 'Payment Options' },
    { id: '5', label: 'Terms & Config' },
    { id: '6', label: 'Review & Issue' }
  ];

  const [formData, setFormData] = useState({
    creationSource: 'manual',
    bookingRef: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    currency: 'MYR',
    invoicePrefix: 'INV',
    agency: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    items: [
      { id: 'item_1', type: 'Package', description: '', qty: 1, unitPrice: 0, taxable: false }
    ],
    discountType: 'amount',
    discountAmount: 0,
    taxRate: 0,
    serviceFee: 0,
    paymentTerms: 'due14',
    depositAmount: 0,
    generateLink: true,
    customerNotes: 'Thank you for your business. Please arrange payment before the due date.',
    termsAndConditions: '1. All payments are strictly non-refundable.\n2. Please refer to our main cancellation policy.',
    automatedReminders: true
  });

  const handleFillExample = () => {
    setFormData({
      creationSource: 'booking',
      bookingRef: 'BKG-2026-045',
      issueDate: '2026-10-12',
      dueDate: '2026-10-26',
      currency: 'MYR',
      invoicePrefix: 'INV',
      agency: 'zamzam',
      customerName: 'Ahmad Hassan',
      customerEmail: 'ahmad.hassan@example.com',
      customerPhone: '+60123456789',
      customerAddress: '123 Jalan Ampang, Kuala Lumpur, 50450, Malaysia',
      items: [
        { id: 'item_1', type: 'Package', description: 'Premium Umrah Safar (Adult)', qty: 2, unitPrice: 12000, taxable: false },
        { id: 'item_2', type: 'Add-on', description: 'Wheelchair Assistance', qty: 1, unitPrice: 500, taxable: true },
        { id: 'item_3', type: 'Service', description: 'Visa Processing Expedite', qty: 2, unitPrice: 150, taxable: true }
      ],
      discountType: 'amount',
      discountAmount: 500,
      taxRate: 0,
      serviceFee: 100,
      paymentTerms: 'deposit',
      depositAmount: 5000,
      generateLink: true,
      customerNotes: 'Thank you for choosing Zamzam Travels. Your flight itinerary will be released 14 days before departure.',
      termsAndConditions: '1. Deposit is required to secure your seat.\n2. Full payment must be cleared 45 days prior to departure.',
      automatedReminders: true
    });
    if (showToast) showToast('Filled', 'Example data has been filled', 'info');
  };

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    const newId = `item_${Math.random().toString(36).substring(2, 9)}`;
    updateForm('items', [...formData.items, { id: newId, type: 'Package', description: '', qty: 1, unitPrice: 0, taxable: false }]);
  };

  const removeItem = (id: string) => {
    updateForm('items', formData.items.filter((item: any) => item.id !== id));
  };

  const updateItem = (id: string, field: string, value: any) => {
    updateForm('items', formData.items.map((item: any) => item.id === id ? { ...item, [field]: value } : item));
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((acc: number, item: any) => acc + (item.qty * item.unitPrice), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    let discount = 0;
    if (formData.discountType === 'amount') discount = formData.discountAmount;
    else if (formData.discountType === 'percentage') discount = subtotal * (formData.discountAmount / 100);
    
    const taxableAmount = formData.items.filter((i: any) => i.taxable).reduce((acc: number, item: any) => acc + (item.qty * item.unitPrice), 0);
    const tax = taxableAmount * (formData.taxRate / 100);
    
    return subtotal - discount + tax + Number(formData.serviceFee || 0);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-MY', { style: 'currency', currency: formData.currency }).format(val);
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleIssue = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/billing/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          agency: formData.agency,
          items: formData.items,
          subtotal: calculateSubtotal(),
          taxAmount: calculateSubtotal() * (formData.taxRate / 100),
          discountAmount: formData.discountType === 'amount' ? formData.discountAmount : calculateSubtotal() * (formData.discountAmount / 100),
          totalAmount: calculateTotal(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        })
      });
      if (res.ok) {
        if (showToast) showToast('Invoice Issued', 'Invoice generated and sent to customer', 'success');
        navigate('billing-list');
      } else {
        if (showToast) showToast('Error', 'Failed to issue invoice', 'error');
      }
    } catch (err) {
      if (showToast) showToast('Network Error', 'Could not communicate with the server', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title="Create Invoice"
        breadcrumbs={[{ label: 'Finance' }, { label: 'Payments', onClick: () => navigate('billing-list') }, { label: 'Create Invoice' }]}
        actions={
          <Button variant="secondary" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={setCurrentStep} />

        {currentStep === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <FileText size={20} className="text-primary" />
                <h2 className="text-section-title">Invoice Source & Setup</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', alignItems: 'end' }}>
                  <FormField label="Generate From">
                    <Select options={[{value: 'booking', label: 'Existing Booking'}, {value: 'manual', label: 'Manual Entry'}]} value={formData.creationSource} onChange={(e) => updateForm('creationSource', e.target.value)} />
                  </FormField>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                      <FormField label="Search Booking Reference (Optional)">
                        <div style={{ position: 'relative' }}>
                          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                          <Input placeholder="Enter BKG- ID..." style={{ paddingLeft: '36px' }} value={formData.bookingRef} onChange={e => updateForm('bookingRef', e.target.value)} disabled={formData.creationSource === 'manual'} />
                        </div>
                      </FormField>
                    </div>
                    <Button variant="secondary" leftIcon={<Link size={16} />} disabled={formData.creationSource === 'manual'}>Load</Button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                  <FormField label="Issue Date" required>
                    <Input type="date" value={formData.issueDate} onChange={(e) => updateForm('issueDate', e.target.value)} />
                  </FormField>
                  <FormField label="Due Date" required>
                    <Input type="date" value={formData.dueDate} onChange={(e) => updateForm('dueDate', e.target.value)} />
                  </FormField>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Currency">
                    <Select options={[{value: 'MYR', label: 'MYR - Malaysian Ringgit'}, {value: 'SAR', label: 'SAR - Saudi Riyal'}, {value: 'IDR', label: 'IDR - Indonesian Rupiah'}]} value={formData.currency} onChange={(e) => updateForm('currency', e.target.value)} />
                  </FormField>
                  <FormField label="Invoice Prefix">
                    <Input value={formData.invoicePrefix} onChange={(e) => updateForm('invoicePrefix', e.target.value)} />
                  </FormField>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <User size={20} className="text-primary" />
                <h2 className="text-section-title">Bill To Information</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <FormField label="Travel Agency Context" required error={showErrors && !formData.agency ? 'Required' : undefined}>
                    <Select options={[{value: '', label: 'Select Agency...'}, {value: 'zamzam', label: 'Zamzam Travels'}, {value: 'nur', label: 'Nur Hidayah Travel'}]} value={formData.agency} onChange={(e) => updateForm('agency', e.target.value)} />
                  </FormField>
                </div>
                <FormField label="Customer / Jamaah Name" required error={showErrors && !formData.customerName ? 'Required' : undefined}>
                  <Input placeholder="Full Name" value={formData.customerName} onChange={e => updateForm('customerName', e.target.value)} />
                </FormField>
                <FormField label="Email Address" required error={showErrors && !formData.customerEmail ? 'Required' : undefined}>
                  <Input type="email" placeholder="email@example.com" value={formData.customerEmail} onChange={e => updateForm('customerEmail', e.target.value)} />
                </FormField>
                <div style={{ gridColumn: 'span 2' }}>
                  <FormField label="Phone Number">
                    <Input placeholder="+60123456789" value={formData.customerPhone} onChange={e => updateForm('customerPhone', e.target.value)} />
                  </FormField>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <FormField label="Billing Address">
                    <textarea className="input-base" rows={3} value={formData.customerAddress} onChange={(e) => updateForm('customerAddress', e.target.value)} placeholder="Full billing address..." style={{ width: '100%', minWidth: '100%', resize: 'vertical' }} />
                  </FormField>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <Box size={20} className="text-primary" />
                <h2 className="text-section-title">Invoice Items</h2>
              </div>
              
              <div style={{ overflowX: 'auto', marginBottom: 'var(--space-6)' }}>
                <table className="data-table text-body" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '120px' }}>Type</th>
                      <th>Description</th>
                      <th style={{ width: '80px', textAlign: 'center' }}>Taxable</th>
                      <th style={{ width: '80px', textAlign: 'right' }}>Qty</th>
                      <th style={{ width: '140px', textAlign: 'right' }}>Unit Price</th>
                      <th style={{ width: '140px', textAlign: 'right' }}>Total</th>
                      <th style={{ width: '50px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item: any) => (
                      <tr key={item.id}>
                        <td>
                          <Select options={[{value: 'Package', label: 'Package'}, {value: 'Add-on', label: 'Add-on'}, {value: 'Service', label: 'Service'}, {value: 'Custom', label: 'Custom'}, {value: 'Adjustment', label: 'Adjustment'}]} value={item.type} onChange={(e) => updateItem(item.id, 'type', e.target.value)} />
                        </td>
                        <td><Input value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} placeholder="Item details" /></td>
                        <td style={{ textAlign: 'center' }}><input type="checkbox" checked={item.taxable} onChange={(e) => updateItem(item.id, 'taxable', e.target.checked)} /></td>
                        <td><Input type="number" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)} style={{ textAlign: 'right' }} /></td>
                        <td><Input type="number" value={item.unitPrice} onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)} style={{ textAlign: 'right' }} /></td>
                        <td style={{ textAlign: 'right', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                          {formatCurrency(item.qty * item.unitPrice)}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <Trash2 size={16} className="text-danger" style={{ cursor: 'pointer' }} onClick={() => removeItem(item.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button variant="secondary" size="sm" leftIcon={<Plus size={16} />} onClick={addItem}>Add Line Item</Button>

              <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-2)' }}>
                    <FormField label="Discount Type"><Select options={[{value: 'amount', label: 'Fixed Amount'}, {value: 'percentage', label: 'Percentage (%)'}]} value={formData.discountType} onChange={(e) => updateForm('discountType', e.target.value)} /></FormField>
                    <FormField label="Discount Value"><Input type="number" value={formData.discountAmount} onChange={(e) => updateForm('discountAmount', parseFloat(e.target.value) || 0)} /></FormField>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                    <FormField label="Tax Rate (%)"><Input type="number" value={formData.taxRate} onChange={(e) => updateForm('taxRate', parseFloat(e.target.value) || 0)} /></FormField>
                    <FormField label="Service Fee"><Input type="number" value={formData.serviceFee} onChange={(e) => updateForm('serviceFee', parseFloat(e.target.value) || 0)} /></FormField>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <CreditCard size={20} className="text-primary" />
                <h2 className="text-section-title">Payment Options</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <FormField label="Payment Terms">
                    <Select options={[{value: 'deposit', label: 'Deposit First'}, {value: 'full', label: 'Full Payment'}, {value: 'due14', label: 'Net 14'}, {value: 'due30', label: 'Net 30'}]} value={formData.paymentTerms} onChange={(e) => updateForm('paymentTerms', e.target.value)} />
                  </FormField>
                  {formData.paymentTerms === 'deposit' && (
                    <FormField label="Amount Due Now (Deposit)">
                      <Input type="number" value={formData.depositAmount} onChange={(e) => updateForm('depositAmount', parseFloat(e.target.value) || 0)} />
                    </FormField>
                  )}
                </div>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Payment Link Generation</h3>
                  <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-4)' }}>Generate a secure, trackable payment link powered by your configured gateway. Allows Jamaah to pay via FPX, Credit Card, or E-wallet.</p>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.generateLink} onChange={(e) => updateForm('generateLink', e.target.checked)} />
                    <span className="text-body-bold">Generate Gateway Link</span>
                  </label>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <Paperclip size={20} className="text-primary" />
                <h2 className="text-section-title">Terms, Notes & Configuration</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <FormField label="Customer Notes">
                  <textarea className="input-base" rows={3} value={formData.customerNotes} onChange={(e) => updateForm('customerNotes', e.target.value)} placeholder="Visible on invoice..." style={{ width: '100%', minWidth: '100%', resize: 'vertical' }} />
                </FormField>
                <FormField label="Terms & Conditions">
                  <textarea className="input-base" rows={4} value={formData.termsAndConditions} onChange={(e) => updateForm('termsAndConditions', e.target.value)} placeholder="Legal terms visible on invoice..." style={{ width: '100%', minWidth: '100%', resize: 'vertical' }} />
                </FormField>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Automated Reminders</h3>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formData.automatedReminders} onChange={(e) => updateForm('automatedReminders', e.target.checked)} />
                    <span className="text-body">Send automated email/SMS reminders before due date</span>
                  </label>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <FileCheck size={20} className="text-primary" />
                <h2 className="text-section-title">Preview & Issue</h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
                {/* Mock Invoice Preview */}
                <div style={{ padding: 'var(--space-6)', backgroundColor: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
                    <div>
                      <img src="/brand/logo-full.svg" alt="UmrahHaji.com" style={{ height: 32, marginBottom: 'var(--space-2)' }} />
                      <h1 className="text-h2" style={{ color: 'var(--color-primary-dark)', marginBottom: 'var(--space-1)' }}>INVOICE</h1>
                      <div className="text-body text-muted">{formData.invoicePrefix}-2026-0001</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="text-body-bold">{formData.agency === 'zamzam' ? 'Zamzam Travels' : (formData.agency === 'nur' ? 'Nur Hidayah Travel' : 'Your Agency')}</div>
                      <div className="text-caption text-muted">Kuala Lumpur, Malaysia</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <div className="text-caption text-muted">Bill To</div>
                      <div className="text-body-bold">{formData.customerName || 'Customer Name'}</div>
                      <div className="text-caption">{formData.customerEmail || 'email@example.com'}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'flex-end' }}>
                        <div>
                          <div className="text-caption text-muted">Issue Date</div>
                          <div className="text-body-bold">{formData.issueDate}</div>
                        </div>
                        <div>
                          <div className="text-caption text-muted">Due Date</div>
                          <div className="text-body-bold">{formData.dueDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <table style={{ width: '100%', marginBottom: 'var(--space-6)', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-default)' }}>
                        <th style={{ textAlign: 'left', padding: 'var(--space-2) 0', color: 'var(--color-text-muted)' }}>Description</th>
                        <th style={{ textAlign: 'right', padding: 'var(--space-2) 0', color: 'var(--color-text-muted)' }}>Qty</th>
                        <th style={{ textAlign: 'right', padding: 'var(--space-2) 0', color: 'var(--color-text-muted)' }}>Price</th>
                        <th style={{ textAlign: 'right', padding: 'var(--space-2) 0', color: 'var(--color-text-muted)' }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item: any) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: 'var(--space-3) 0' }}>{item.description || 'Unnamed Item'}</td>
                          <td style={{ textAlign: 'right', padding: 'var(--space-3) 0' }}>{item.qty}</td>
                          <td style={{ textAlign: 'right', padding: 'var(--space-3) 0' }}>{formatCurrency(item.unitPrice)}</td>
                          <td style={{ textAlign: 'right', padding: 'var(--space-3) 0' }}>{formatCurrency(item.qty * item.unitPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                    <div style={{ flex: 1 }}>
                      {formData.customerNotes && (
                        <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                          <div className="text-body-bold" style={{ marginBottom: 'var(--space-2)' }}>Notes</div>
                          <div className="text-caption text-muted" style={{ whiteSpace: 'pre-wrap' }}>{formData.customerNotes}</div>
                        </div>
                      )}
                    </div>
                    <div style={{ width: '250px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--space-2)' }}>
                        <span className="text-muted">Subtotal</span>
                        <span>{formatCurrency(calculateSubtotal())}</span>
                      </div>
                      {(formData.discountAmount > 0) && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--space-2)' }}>
                          <span className="text-muted">Discount</span>
                          <span className="text-danger">-{formData.discountType === 'amount' ? formatCurrency(formData.discountAmount) : `${formData.discountAmount}%`}</span>
                        </div>
                      )}
                      {(formData.taxRate > 0) && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--space-2)' }}>
                          <span className="text-muted">Tax ({formData.taxRate}%)</span>
                          <span>{formatCurrency(formData.items.filter((i: any) => i.taxable).reduce((acc: number, item: any) => acc + (item.qty * item.unitPrice), 0) * (formData.taxRate / 100))}</span>
                        </div>
                      )}
                      {(formData.serviceFee > 0) && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--space-2)' }}>
                          <span className="text-muted">Service Fee</span>
                          <span>{formatCurrency(formData.serviceFee)}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--space-2)', borderTop: '2px solid var(--border-default)', marginTop: 'var(--space-2)' }}>
                        <span className="text-body-bold">Total Due</span>
                        <span className="text-h3" style={{ color: 'var(--color-primary-dark)' }}>{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>

                  {formData.generateLink && (
                    <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-success-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <Link size={20} className="text-success" />
                      <div>
                        <div className="text-body-bold" style={{ color: 'var(--color-success-dark)' }}>Payment Link will be generated</div>
                        <div className="text-caption" style={{ color: 'var(--color-success-dark)' }}>A secure link will be sent to the customer for online payment.</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-subtle)' }}>
                    <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Readiness Check</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        {formData.customerName && formData.customerEmail ? <CheckCircle size={16} className="text-success" /> : <AlertCircle size={16} className="text-danger" />}
                        <span className="text-body">Customer details</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        {formData.items.length > 0 && formData.items[0].description ? <CheckCircle size={16} className="text-success" /> : <AlertCircle size={16} className="text-danger" />}
                        <span className="text-body">Invoice items</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        {formData.agency ? <CheckCircle size={16} className="text-success" /> : <AlertCircle size={16} className="text-danger" />}
                        <span className="text-body">Agency context</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', zIndex: 10, boxShadow: 'var(--shadow-sm)' }}>
        <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0}>Back</Button>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="ghost" onClick={() => navigate('billing-list')}>Cancel</Button>
          <Button variant="secondary" leftIcon={<Save size={16} />} onClick={() => { if(showToast) showToast('Saved', 'Invoice saved as draft', 'info'); navigate('billing-list'); }}>Save as Draft</Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Next Step</Button>
          ) : (
            <Button onClick={handleIssue} leftIcon={<Send size={16} />} disabled={!formData.customerName || !formData.customerEmail || !formData.agency || formData.items.length === 0}>Issue Invoice</Button>
          )}
        </div>
      </div>
    </div>
  );
};
