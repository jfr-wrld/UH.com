import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Package, Users, BedDouble, CreditCard, ChevronDown, ChevronRight, Check, UserPlus } from 'lucide-react';

export const BookingCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    package: true,
    participants: false,
    pricing: false,
    payment: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const SectionHeader = ({ id, title, icon: Icon, isComplete = false }: any) => (
    <div 
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md) var(--radius-md) 0 0', cursor: 'pointer', borderBottom: openSections[id] ? '1px solid var(--border-default)' : 'none' }}
      onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); toggleSection(id)}}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{ color: isComplete ? 'var(--color-success)' : 'var(--text-muted)' }}>
          {isComplete ? <Check size={20} /> : <Icon size={20} />}
        </div>
        <span className="text-body-bold">{title}</span>
      </div>
      {openSections[id] ? <ChevronDown size={20} className="text-muted" /> : <ChevronRight size={20} className="text-muted" />}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Create Package Booking"
        breadcrumbs={[{ label: 'Home' }, { label: 'Bookings', onClick: () => navigate('booking-list') }, { label: 'Create' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('booking-list')}>Cancel</Button>
            <Button variant="secondary" onClick={() => navigate('booking-list')}>Save as Draft</Button>
            <Button onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success');  navigate('booking-list'); }}>Submit Booking</Button>
          </div>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        
        {/* Section 1: Package & Schedule */}
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', overflow: 'hidden' }}>
          <SectionHeader id="package" title="1. Package & Schedule Selection" icon={Package} isComplete={true} />
          {openSections.package && (
            <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Travel Agency" required>
                  <Select options={[{value: 'zamzam', label: 'Zamzam Travels'}]} value="zamzam" onChange={() => {}} />
                </FormField>
                <FormField label="Booking Source" required>
                  <Select options={[{value: 'admin', label: 'Admin Assisted'}]} value="admin" onChange={() => {}} />
                </FormField>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Package Selection" required>
                  <Select options={[{value: 'pkg1', label: 'Premium Umrah Safar (v2.1)'}]} value="pkg1" onChange={() => {}} />
                </FormField>
                <FormField label="Schedule Selection" required>
                  <Select options={[{value: 'sch1', label: '15 Dec 2026 - 26 Dec 2026 (Available: 45)'}]} value="sch1" onChange={() => {}} />
                </FormField>
              </div>

              <FormField label="Booking Notes">
                <textarea 
                  className="text-body" 
                  rows={2} 
                  placeholder="Internal notes or customer requests..."
                  style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-input)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}
                />
              </FormField>
              
            </div>
          )}
        </div>

        {/* Section 2: Booker & Participants */}
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', overflow: 'hidden' }}>
          <SectionHeader id="participants" title="2. Primary Booker & Participants" icon={Users} />
          {openSections.participants && (
            <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
              
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <h3 className="text-subsection-title">Primary Booker</h3>
                  <Button variant="secondary" size="sm" leftIcon={<UserPlus size={16} />}>Search / Invite Booker</Button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Full Name"><Input value="Ahmad Hassan" disabled /></FormField>
                  <FormField label="Email"><Input value="ahmad.h@example.com" disabled /></FormField>
                  <FormField label="Phone Number"><Input value="+60123456789" disabled /></FormField>
                </div>
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <FormField label="Family / Group Name (Optional)">
                    <Input placeholder="e.g. Keluarga Haji Ahmad" />
                  </FormField>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <h3 className="text-subsection-title">Booking Participants</h3>
                  <Button variant="secondary" size="sm" leftIcon={<UserPlus size={16} />}>Add Participant</Button>
                </div>
                <div className="data-table-container">
                  <table className="data-table text-body">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Relationship</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span className="text-body-bold">Ahmad Hassan (Booker)</span></td>
                        <td><Select options={[{value: 'adult', label: 'Adult'}]} value="adult" onChange={() => {}} /></td>
                        <td><Input value="Self" disabled /></td>
                        <td><Button variant="ghost" size="sm">Remove</Button></td>
                      </tr>
                      <tr>
                        <td><span className="text-body-bold">Siti Aminah</span></td>
                        <td><Select options={[{value: 'adult', label: 'Adult'}]} value="adult" onChange={() => {}} /></td>
                        <td><Select options={[{value: 'spouse', label: 'Spouse'}]} value="spouse" onChange={() => {}} /></td>
                        <td><Button variant="ghost" size="sm">Remove</Button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Room & Pricing */}
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', overflow: 'hidden' }}>
          <SectionHeader id="pricing" title="3. Room Selection & Pricing Snapshot" icon={BedDouble} />
          {openSections.pricing && (
            <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
              <p className="text-body text-muted">Assign room types to participants to lock in the package price snapshot.</p>
              
              <div className="data-table-container" style={{ overflowX: 'auto' }}>
                <table className="data-table text-body">
                  <thead>
                    <tr>
                      <th>Participant</th>
                      <th>Room Type Selection</th>
                      <th>Base Price (RM)</th>
                      <th>Discount (RM)</th>
                      <th>Final Price (RM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ahmad Hassan</td>
                      <td><Select options={[{value: 'double', label: 'Double Room'}]} value="double" onChange={() => {}} /></td>
                      <td>12,000</td>
                      <td><Input type="number" defaultValue="0" style={{ width: '100px' }} /></td>
                      <td><span className="text-body-bold">12,000</span></td>
                    </tr>
                    <tr>
                      <td>Siti Aminah</td>
                      <td><Select options={[{value: 'double', label: 'Double Room'}]} value="double" onChange={() => {}} /></td>
                      <td>12,000</td>
                      <td><Input type="number" defaultValue="0" style={{ width: '100px' }} /></td>
                      <td><span className="text-body-bold">12,000</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-4)' }}>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', width: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <span className="text-body text-muted">Subtotal</span>
                    <span className="text-body">RM 24,000</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-2)' }}>
                    <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>Total Amount</span>
                    <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>RM 24,000</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Section 4: Payment */}
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', overflow: 'hidden' }}>
          <SectionHeader id="payment" title="4. Payment Options" icon={CreditCard} />
          {openSections.payment && (
            <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Payment Option" required>
                  <Select options={[{value: 'deposit', label: 'Deposit Payment'}, {value: 'full', label: 'Full Payment'}]} value="deposit" onChange={() => {}} />
                </FormField>
                <FormField label="Deposit Amount (RM)" required>
                  <Input type="number" defaultValue="2000" />
                </FormField>
              </div>
              <p className="text-caption text-muted">Submitting the booking will create an invoice reference. Actual payment verification happens in the Billing & Payment module or via manual Finance review in the Booking Details page.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
