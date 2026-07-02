import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Badge } from '../../components/data-display/Badge';
import { Stepper } from '../../components/navigation/Stepper';
import { ChevronLeft, Save, Wand2, CheckCircle, Users, Package, Calendar, CreditCard, FileText, Eye, UserPlus, Trash2, Upload, Building, User, Baby, BedDouble, Crown, Star } from 'lucide-react';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const TABookingCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success' | 'error' | 'warning' | 'info') => void }> = ({ navigate, showToast }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [draftTime, setDraftTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  // Step 1: Package & Schedule
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [bookingType, setBookingType] = useState('Individual');
  const [salesStaff, setSalesStaff] = useState('current');
  const [sourceChannel, setSourceChannel] = useState('walk-in');
  const [internalRef, setInternalRef] = useState('');

  // Step 2: Booker
  const [bookerSource, setBookerSource] = useState('existing');
  const [bookerName, setBookerName] = useState('');
  const [bookerEmail, setBookerEmail] = useState('');
  const [bookerPhone, setBookerPhone] = useState('');
  const [bookerIsParticipant, setBookerIsParticipant] = useState(true);

  // Step 3: Participants
  const [participants, setParticipants] = useState<Array<{ name: string; email: string; phone: string; relationship: string; paxCategory: string; roomType: string }>>([]);

  // Step 4: Room & Pricing (derived from participants)
  // Step 5: Invoice & Payment
  const [invoiceAction, setInvoiceAction] = useState('generate');
  const [paymentType, setPaymentType] = useState('deposit');
  const [depositAmount, setDepositAmount] = useState('5000');
  const [dueDate, setDueDate] = useState('');
  const [paymentMethods, setPaymentMethods] = useState('bank');
  const [customerNote, setCustomerNote] = useState('');
  const [internalNote, setInternalNote] = useState('');

  const { create } = useLocalStorageCrud('ta-booking');

  const packages: Record<string, any> = {
    pkg1: { name: 'Umrah Reguler 9 Hari', schedule: '15 Dec 2026', duration: '9 Days', locations: 'Makkah & Madinah', hotel: '4 Star', price: 7890 },
    pkg2: { name: 'Umrah Plus Turki 12 Hari', schedule: '20 Jan 2027', duration: '12 Days', locations: 'Makkah, Madinah & Istanbul', hotel: '5 Star', price: 10500 },
    pkg3: { name: 'Umrah Ramadhan Akhir', schedule: '10 Mar 2027', duration: '14 Days', locations: 'Makkah & Madinah', hotel: '5 Star', price: 12000 },
    pkg4: { name: 'Haji Furoda 2026', schedule: '01 Jun 2027', duration: '40 Days', locations: 'Makkah & Madinah', hotel: '5 Star VIP', price: 75000 },
  };

  const schedules: Record<string, string[]> = {
    pkg1: ['15 Dec 2026 - 24 Dec 2026', '05 Jan 2027 - 14 Jan 2027', '15 Feb 2027 - 24 Feb 2027'],
    pkg2: ['20 Jan 2027 - 01 Feb 2027', '10 Mar 2027 - 22 Mar 2027'],
    pkg3: ['10 Mar 2027 - 24 Mar 2027', '20 Mar 2027 - 03 Apr 2027'],
    pkg4: ['01 Jun 2027 - 10 Jul 2027'],
  };

  const steps = [
    { id: '1', label: 'Package & Schedule' },
    { id: '2', label: 'Booker Info' },
    { id: '3', label: 'Participants' },
    { id: '4', label: 'Room & Pricing' },
    { id: '5', label: 'Invoice & Payment' },
    { id: '6', label: 'Documents Summary' },
    { id: '7', label: 'Review & Confirm' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const addParticipant = () => {
    setParticipants([...participants, { name: '', email: '', phone: '', relationship: bookingType === 'Family' ? 'Spouse' : 'Member', paxCategory: 'Adult', roomType: 'Double' }]);
  };

  const removeParticipant = (idx: number) => {
    setParticipants(participants.filter((_, i) => i !== idx));
  };

  const updateParticipant = (idx: number, field: string, value: string) => {
    const updated = [...participants];
    (updated[idx] as any)[field] = value;
    setParticipants(updated);
  };

  const allParticipants = [
    ...(bookerIsParticipant ? [{ name: bookerName || 'Primary Booker', email: bookerEmail, phone: bookerPhone, relationship: 'Self (Booker)', paxCategory: 'Adult', roomType: 'Double' }] : []),
    ...participants
  ];

  const calculateTotal = () => {
    const pkg = packages[selectedPackage];
    if (!pkg) return 0;
    return allParticipants.reduce((sum, p) => {
      const roomMultiplier: Record<string, number> = { 'Quad': 0.85, 'Triple': 0.92, 'Double': 1, 'Single': 1.3 };
      const paxMultiplier: Record<string, number> = { 'Adult': 1, 'Child': 0.75, 'Child Without Bed': 0.6, 'Infant': 0.2 };
      return sum + Math.round(pkg.price * (roomMultiplier[p.roomType] || 1) * (paxMultiplier[p.paxCategory] || 1));
    }, 0);
  };

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    setDraftTime('just now');
    const total = calculateTotal();
    create({
      code: `BK-AH-D${Math.floor(Math.random() * 1000)}`,
      bookerName: bookerName || 'Unnamed Draft',
      bookerEmail: bookerEmail,
      bookerPhone: bookerPhone,
      package: packages[selectedPackage]?.name || 'Unknown Package',
      schedule: selectedSchedule || '-',
      participants: allParticipants.length,
      bookingType,
      roomType: 'Double',
      totalAmount: `RM ${total.toLocaleString()}`,
      paidAmount: 'RM 0',
      balance: `RM ${total.toLocaleString()}`,
      status: 'Draft',
      payment: 'Not Invoiced',
      allocation: 'Unallocated',
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      agency: 'Al-Hijrah Travel'
    });
    if (showToast) showToast('Draft Saved', 'Your progress has been saved as a draft.', 'info');
  };

  const handleSubmit = () => {
    if (!confirmed) {
      if (showToast) showToast('Confirmation Required', 'Please check the confirmation box before submitting.', 'warning');
      return;
    }
    if (!bookerName) {
      if (showToast) showToast('Booker Required', 'Primary Booker name is required.', 'warning');
      return;
    }
    const total = calculateTotal();
    create({
      code: `BK-AH-${Math.floor(1000 + Math.random() * 9000)}`,
      bookerName,
      bookerEmail,
      bookerPhone,
      package: packages[selectedPackage]?.name || 'Unknown Package',
      schedule: selectedSchedule || packages[selectedPackage]?.schedule || '-',
      participants: allParticipants.length,
      bookingType,
      roomType: allParticipants[0]?.roomType || 'Double',
      totalAmount: `RM ${total.toLocaleString()}`,
      paidAmount: paymentType === 'full' ? `RM ${total.toLocaleString()}` : paymentType === 'deposit' ? `RM ${parseInt(depositAmount || '0').toLocaleString()}` : 'RM 0',
      balance: paymentType === 'full' ? 'RM 0' : paymentType === 'deposit' ? `RM ${(total - parseInt(depositAmount || '0')).toLocaleString()}` : `RM ${total.toLocaleString()}`,
      status: paymentType === 'full' ? 'Confirmed' : 'Pending Payment',
      payment: paymentType === 'full' ? 'Paid' : paymentType === 'deposit' ? 'Deposit Paid' : 'Unpaid',
      allocation: 'Unallocated',
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      agency: 'Al-Hijrah Travel'
    });
    if (showToast) showToast('Booking Created', 'Booking has been submitted successfully.', 'success');
    navigate('ta-booking-list');
  };

  const fillExample = () => {
    setSelectedPackage('pkg2');
    setSelectedSchedule('20 Jan 2027 - 01 Feb 2027');
    setBookingType('Family');
    setSalesStaff('current');
    setSourceChannel('whatsapp');
    setBookerName('Siti Fatimah binti Ahmad');
    setBookerEmail('siti.fatimah@gmail.com');
    setBookerPhone('+60 12-345-6789');
    setBookerIsParticipant(true);
    setParticipants([
      { name: 'Ahmad Razak bin Ismail', email: 'ahmad.razak@gmail.com', phone: '+60 13-456-7890', relationship: 'Spouse', paxCategory: 'Adult', roomType: 'Double' },
      { name: 'Nurul Aisyah binti Ahmad', email: '', phone: '', relationship: 'Child', paxCategory: 'Child', roomType: 'Triple' },
    ]);
    setInvoiceAction('generate');
    setPaymentType('deposit');
    setDepositAmount('10000');
    setDueDate('2026-12-01');
    setCurrentStep(steps.length - 1);
    if (showToast) showToast('Example Data Filled', 'Form populated with sample data.', 'success');
  };

  const pkg = packages[selectedPackage];
  const total = calculateTotal();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: '100%' }}>
      <PageHeader
        title="Create Booking"
        breadcrumbs={[{ label: 'Home' }, { label: 'Bookings', onClick: () => navigate('ta-booking-list') }, { label: 'Create Booking' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="outline" size="sm" leftIcon={<Wand2 size={16} />} onClick={fillExample}>Fill Example</Button>
          </div>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={(i: number) => setCurrentStep(i)} />

        {/* Step 1: Package & Schedule */}
        {currentStep === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <Package size={20} className="text-primary" />
                <h2 className="text-section-title">Select Package & Schedule</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                {Object.entries(packages).map(([key, p]) => (
                  <div key={key} onClick={() => setSelectedPackage(key)} style={{
                    position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer',
                    border: selectedPackage === key ? '2px solid var(--color-primary)' : '2px solid var(--border-default)',
                    boxShadow: selectedPackage === key ? '0 0 0 3px rgba(16,185,129,0.15)' : 'none',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ height: '120px', background: `linear-gradient(135deg, ${key === 'pkg4' ? '#1e3a5f, #0d1b2a' : key === 'pkg3' ? '#7c3aed, #4c1d95' : key === 'pkg2' ? '#0891b2, #164e63' : '#059669, #064e3b'})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ textAlign: 'center', color: 'white' }}>
                        {key === 'pkg4' ? <Crown size={32} /> : key === 'pkg3' ? <Star size={32} /> : <Package size={32} />}
                        <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.8 }}>{p.duration}</div>
                      </div>
                      {selectedPackage === key && (
                        <div style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CheckCircle size={16} style={{ color: 'white' }} />
                        </div>
                      )}
                    </div>
                    <div style={{ padding: 'var(--space-3)' }}>
                      <div className="text-body-bold" style={{ marginBottom: '4px' }}>{p.name}</div>
                      <div className="text-caption text-muted">{p.locations} • {p.hotel}</div>
                      <div className="text-body-bold" style={{ color: 'var(--color-primary)', marginTop: '4px' }}>From RM {p.price.toLocaleString()}/pax</div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedPackage && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
                  <FormField label="Select Schedule">
                    <Select options={[{ value: '', label: 'Choose a schedule...' }, ...(schedules[selectedPackage] || []).map(s => ({ value: s, label: s }))]} value={selectedSchedule} onChange={(e) => setSelectedSchedule(e.target.value)} />
                  </FormField>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                    <FormField label="Booking Type">
                      <Select options={[{ value: 'Individual', label: 'Individual' }, { value: 'Family', label: 'Family' }, { value: 'Group', label: 'Group' }]} value={bookingType} onChange={(e) => setBookingType(e.target.value)} />
                    </FormField>
                    <FormField label="Sales Staff">
                      <Select options={[{ value: 'current', label: 'Current User (Admin)' }, { value: 'staff1', label: 'Ahmad Faizal' }, { value: 'staff2', label: 'Siti Nora' }]} value={salesStaff} onChange={(e) => setSalesStaff(e.target.value)} />
                    </FormField>
                    <FormField label="Source Channel">
                      <Select options={[{ value: 'walk-in', label: 'Walk-in' }, { value: 'phone', label: 'Phone' }, { value: 'whatsapp', label: 'WhatsApp' }, { value: 'website', label: 'Website' }, { value: 'referral', label: 'Referral' }]} value={sourceChannel} onChange={(e) => setSourceChannel(e.target.value)} />
                    </FormField>
                  </div>
                  <FormField label="Internal Reference (Optional)">
                    <Input placeholder="e.g. Agency internal reference number" value={internalRef} onChange={(e) => setInternalRef(e.target.value)} />
                  </FormField>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Step 2: Booker Information */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <User size={20} className="text-primary" />
                <h2 className="text-section-title">Primary Booker</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Booker Source">
                  <Select options={[{ value: 'existing', label: 'Existing Jamaah' }, { value: 'new', label: 'Invite New Jamaah' }, { value: 'manual', label: 'Manual Contact' }]} value={bookerSource} onChange={(e) => setBookerSource(e.target.value)} />
                </FormField>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Full Name" required>
                    <Input placeholder="e.g. Ahmad Faizal bin Ismail" value={bookerName} onChange={(e) => setBookerName(e.target.value)} />
                  </FormField>
                  <FormField label="Email" required={bookerSource === 'new'}>
                    <Input type="email" placeholder="e.g. ahmad@gmail.com" value={bookerEmail} onChange={(e) => setBookerEmail(e.target.value)} />
                  </FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Phone Number" required>
                    <Input placeholder="+60 12-345-6789" value={bookerPhone} onChange={(e) => setBookerPhone(e.target.value)} />
                  </FormField>
                  <FormField label="Booker is also a participant?">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="radio" checked={bookerIsParticipant} onChange={() => setBookerIsParticipant(true)} /> Yes
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <input type="radio" checked={!bookerIsParticipant} onChange={() => setBookerIsParticipant(false)} /> No
                      </label>
                    </div>
                  </FormField>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Step 3: Participants */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Users size={20} className="text-primary" />
                  <h2 className="text-section-title">Participants ({allParticipants.length})</h2>
                </div>
                <Button variant="secondary" leftIcon={<UserPlus size={16} />} onClick={addParticipant}>Add Participant</Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {bookerIsParticipant && (
                  <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                      <Badge variant="info" size="sm">Primary Booker</Badge>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'var(--space-3)' }}>
                      <div><span className="text-caption text-muted" style={{ display: 'block' }}>Name</span><span className="text-body-bold">{bookerName || '(Not set)'}</span></div>
                      <div><span className="text-caption text-muted" style={{ display: 'block' }}>Email</span><span className="text-body">{bookerEmail || '-'}</span></div>
                      <div><span className="text-caption text-muted" style={{ display: 'block' }}>Category</span><span className="text-body">Adult</span></div>
                      <div><span className="text-caption text-muted" style={{ display: 'block' }}>Room</span><span className="text-body">Double</span></div>
                    </div>
                  </div>
                )}

                {participants.map((p, idx) => (
                  <div key={idx} style={{ padding: 'var(--space-4)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                      <span className="text-body-bold">Participant {idx + (bookerIsParticipant ? 2 : 1)}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeParticipant(idx)} style={{ color: 'var(--color-danger)' }}><Trash2 size={14} /></Button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                      <FormField label="Full Name" required>
                        <Input placeholder="Full name" value={p.name} onChange={(e) => updateParticipant(idx, 'name', e.target.value)} />
                      </FormField>
                      <FormField label="Email">
                        <Input placeholder="Email" value={p.email} onChange={(e) => updateParticipant(idx, 'email', e.target.value)} />
                      </FormField>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
                      <FormField label="Relationship / Role">
                        <Select options={[{ value: 'Spouse', label: 'Spouse' }, { value: 'Child', label: 'Child' }, { value: 'Parent', label: 'Parent' }, { value: 'Sibling', label: 'Sibling' }, { value: 'Member', label: 'Group Member' }]} value={p.relationship} onChange={(e) => updateParticipant(idx, 'relationship', e.target.value)} />
                      </FormField>
                      <FormField label="Pax Category">
                        <Select options={[{ value: 'Adult', label: 'Adult' }, { value: 'Child', label: 'Child' }, { value: 'Child Without Bed', label: 'Child Without Bed' }, { value: 'Infant', label: 'Infant' }]} value={p.paxCategory} onChange={(e) => updateParticipant(idx, 'paxCategory', e.target.value)} />
                      </FormField>
                      <FormField label="Room Type">
                        <Select options={[{ value: 'Single', label: 'Single' }, { value: 'Double', label: 'Double' }, { value: 'Triple', label: 'Triple' }, { value: 'Quad', label: 'Quad' }]} value={p.roomType} onChange={(e) => updateParticipant(idx, 'roomType', e.target.value)} />
                      </FormField>
                    </div>
                  </div>
                ))}

                {participants.length === 0 && !bookerIsParticipant && (
                  <div style={{ padding: 'var(--space-8)', textAlign: 'center', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                    <Users size={40} style={{ color: 'var(--gray-400)', marginBottom: 'var(--space-3)' }} />
                    <p className="text-body text-muted">No participants added yet. Click "Add Participant" to start.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* Step 4: Room & Pricing */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <BedDouble size={20} className="text-primary" />
                <h2 className="text-section-title">Room & Pricing</h2>
              </div>

              <div className="data-table-container">
                <table className="data-table text-body">
                  <thead>
                    <tr>
                      <th>Participant</th>
                      <th>Pax Category</th>
                      <th>Room Type</th>
                      <th>Base Price</th>
                      <th>Multiplier</th>
                      <th>Final Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allParticipants.map((p, idx) => {
                      const basePrice = pkg?.price || 0;
                      const roomMult: Record<string, number> = { 'Quad': 0.85, 'Triple': 0.92, 'Double': 1, 'Single': 1.3 };
                      const paxMult: Record<string, number> = { 'Adult': 1, 'Child': 0.75, 'Child Without Bed': 0.6, 'Infant': 0.2 };
                      const finalPrice = Math.round(basePrice * (roomMult[p.roomType] || 1) * (paxMult[p.paxCategory] || 1));
                      return (
                        <tr key={idx}>
                          <td><span className="text-body-bold">{p.name || `Participant ${idx + 1}`}</span>{idx === 0 && bookerIsParticipant && <Badge variant="info" size="sm" style={{ marginLeft: '8px' }}>Booker</Badge>}</td>
                          <td><Badge variant={p.paxCategory === 'Adult' ? 'neutral' : 'info'} size="sm">{p.paxCategory}</Badge></td>
                          <td>{p.roomType}</td>
                          <td>RM {basePrice.toLocaleString()}</td>
                          <td>x{((roomMult[p.roomType] || 1) * (paxMult[p.paxCategory] || 1)).toFixed(2)}</td>
                          <td><span className="text-body-bold">RM {finalPrice.toLocaleString()}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'right' }}><span className="text-body-bold">Total</span></td>
                      <td><span className="text-body-bold" style={{ color: 'var(--color-primary)', fontSize: '16px' }}>RM {total.toLocaleString()}</span></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* Step 5: Invoice & Payment */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <CreditCard size={20} className="text-primary" />
                <h2 className="text-section-title">Invoice & Payment</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Invoice Action">
                    <Select options={[{ value: 'draft', label: 'Save as Draft' }, { value: 'generate', label: 'Generate Invoice' }, { value: 'send', label: 'Generate & Send Invoice' }]} value={invoiceAction} onChange={(e) => setInvoiceAction(e.target.value)} />
                  </FormField>
                  <FormField label="Payment Type">
                    <Select options={[{ value: 'full', label: 'Full Payment' }, { value: 'deposit', label: 'Deposit' }, { value: 'installment', label: 'Installment' }]} value={paymentType} onChange={(e) => setPaymentType(e.target.value)} />
                  </FormField>
                </div>

                {paymentType === 'deposit' && (
                  <FormField label="Deposit Amount">
                    <Input type="number" placeholder="e.g. 5000" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                  </FormField>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Due Date">
                    <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                  </FormField>
                  <FormField label="Accepted Payment Method">
                    <Select options={[{ value: 'bank', label: 'Bank Transfer' }, { value: 'fpx', label: 'FPX' }, { value: 'ewallet', label: 'E-Wallet' }, { value: 'card', label: 'Card' }, { value: 'cash', label: 'Cash' }]} value={paymentMethods} onChange={(e) => setPaymentMethods(e.target.value)} />
                  </FormField>
                </div>

                <FormField label="Customer Note (visible on invoice)">
                  <Input placeholder="e.g. Thank you for choosing Al-Hijrah Travel" value={customerNote} onChange={(e) => setCustomerNote(e.target.value)} />
                </FormField>
                <FormField label="Internal Note (agency only)">
                  <Input placeholder="Internal booking note..." value={internalNote} onChange={(e) => setInternalNote(e.target.value)} />
                </FormField>

                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}><span className="text-body text-muted">Booking Total</span><span className="text-body-bold">RM {total.toLocaleString()}</span></div>
                  {paymentType === 'deposit' && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}><span className="text-body text-muted">Deposit Required</span><span className="text-body-bold">RM {parseInt(depositAmount || '0').toLocaleString()}</span></div>}
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-2) 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>{paymentType === 'full' ? 'Amount Due' : 'Remaining Balance'}</span><span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>RM {paymentType === 'full' ? total.toLocaleString() : (total - parseInt(depositAmount || '0')).toLocaleString()}</span></div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Step 6: Documents Summary */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <FileText size={20} className="text-primary" />
                <h2 className="text-section-title">Documents Summary</h2>
              </div>
              <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>Summary of required documents for all participants. Full document management is handled in Jamaah Management.</p>

              <div className="data-table-container">
                <table className="data-table text-body">
                  <thead>
                    <tr>
                      <th>Participant</th>
                      <th>IC / Identity</th>
                      <th>Passport</th>
                      <th>Profile Photo</th>
                      <th>Vaccination</th>
                      <th>Overall</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allParticipants.map((p, idx) => (
                      <tr key={idx}>
                        <td><span className="text-body-bold">{p.name || `Participant ${idx + 1}`}</span></td>
                        <td><Badge variant="warning" size="sm">Pending</Badge></td>
                        <td><Badge variant="warning" size="sm">Pending</Badge></td>
                        <td><Badge variant="warning" size="sm">Pending</Badge></td>
                        <td><Badge variant="neutral" size="sm">N/A</Badge></td>
                        <td><Badge variant="warning" size="sm">Incomplete</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: 'var(--space-3)', backgroundColor: '#FEF3C7', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                <FileText size={16} style={{ color: '#D97706' }} />
                <span className="text-body" style={{ color: '#92400E' }}>Documents can be collected after booking creation. Participants will be able to upload documents via the Jamaah portal.</span>
              </div>
            </section>
          </div>
        )}

        {/* Step 7: Review & Confirm */}
        {currentStep === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <Eye size={20} className="text-primary" />
                <h2 className="text-section-title">Review & Confirm</h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-3)' }}>Package & Schedule</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Package</span><span className="text-body-bold">{pkg?.name || '-'}</span></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Schedule</span><span className="text-body">{selectedSchedule || '-'}</span></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Booking Type</span><Badge variant="neutral" size="sm">{bookingType}</Badge></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Source</span><span className="text-body">{sourceChannel}</span></div>
                  </div>
                </div>

                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-3)' }}>Primary Booker</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(bookerName || 'U')}&background=random&color=fff&size=40`} alt="" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                    <div>
                      <span className="text-body-bold" style={{ display: 'block' }}>{bookerName || '-'}</span>
                      <span className="text-caption text-muted">{bookerEmail || '-'}</span>
                    </div>
                  </div>
                  <div><span className="text-caption text-muted" style={{ display: 'block' }}>Phone</span><span className="text-body">{bookerPhone || '-'}</span></div>
                  <div><span className="text-caption text-muted" style={{ display: 'block' }}>Is Participant</span><span className="text-body">{bookerIsParticipant ? 'Yes' : 'No'}</span></div>
                </div>
              </div>

              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-4)' }}>
                <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-3)' }}>Participants ({allParticipants.length})</h4>
                <div className="data-table-container">
                  <table className="data-table text-body">
                    <thead><tr><th>Name</th><th>Relationship</th><th>Category</th><th>Room</th><th>Price</th></tr></thead>
                    <tbody>
                      {allParticipants.map((p, idx) => {
                        const basePrice = pkg?.price || 0;
                        const rm: Record<string, number> = { 'Quad': 0.85, 'Triple': 0.92, 'Double': 1, 'Single': 1.3 };
                        const pm: Record<string, number> = { 'Adult': 1, 'Child': 0.75, 'Child Without Bed': 0.6, 'Infant': 0.2 };
                        const fp = Math.round(basePrice * (rm[p.roomType] || 1) * (pm[p.paxCategory] || 1));
                        return (
                          <tr key={idx}>
                            <td><span className="text-body-bold">{p.name || `Participant ${idx + 1}`}</span></td>
                            <td>{p.relationship}</td>
                            <td>{p.paxCategory}</td>
                            <td>{p.roomType}</td>
                            <td>RM {fp.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-4)' }}>
                <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-3)', color: 'var(--color-primary-dark)' }}>Payment Summary</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}><span className="text-body">Total Amount</span><span className="text-body-bold">RM {total.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}><span className="text-body">Payment Type</span><span className="text-body">{paymentType === 'full' ? 'Full Payment' : paymentType === 'deposit' ? 'Deposit' : 'Installment'}</span></div>
                {paymentType === 'deposit' && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}><span className="text-body">Deposit Amount</span><span className="text-body-bold">RM {parseInt(depositAmount || '0').toLocaleString()}</span></div>}
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: 'var(--space-2) 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>Amount Due Now</span><span className="text-body-bold" style={{ color: 'var(--color-primary-dark)', fontSize: '18px' }}>RM {paymentType === 'full' ? total.toLocaleString() : parseInt(depositAmount || '0').toLocaleString()}</span></div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', cursor: 'pointer', marginTop: 'var(--space-4)' }}>
                <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} style={{ width: 18, height: 18 }} />
                <span className="text-body">I confirm that all booking details are correct and the booking can be submitted for processing.</span>
              </label>
            </section>
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '0', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, boxShadow: 'var(--shadow-sm)' }}>
        <Button 
          variant="secondary" 
          disabled={currentStep === 0}
          onClick={handlePrev}
          leftIcon={<ChevronLeft size={16} />}
        >
          Previous
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {isDraftSaved && <span className="text-caption text-muted">Draft saved {draftTime}</span>}
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('ta-booking-list')}>Cancel</Button>
            <Button variant="secondary" leftIcon={<Save size={16} />} onClick={handleSaveDraft}>Save as Draft</Button>
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} leftIcon={<CheckCircle size={16} />}>Submit Booking</Button>
            ) : (
              <Button onClick={handleNext}>Next Step</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
