import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { HeroHeader } from '../../components/layout/HeroHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { SensitiveDataReveal } from '../../components/domain/SensitiveDataReveal';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { MetricCard } from '../../components/data-display/MetricCard';
import { UserProfileCell } from '../../components/data-display/UserProfileCell';
import { Users, CreditCard, Share2, AlertTriangle, FileText, Download, Eye, ChevronRight, XCircle, Plane, BadgeCheck, Building2, DollarSign, CheckCircle2, Calendar, Package } from 'lucide-react';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant } from '../../utils/badge';

export const TABookingDetails: React.FC<{ navigate: (route: string, data?: any) => void, bookingId?: string }> = ({ navigate, bookingId = 'tabk_1' }) => {
  const { getById, update } = useLocalStorageCrud('ta-booking');
  const [activeTab, setActiveTab] = useState('overview');

  const bkData: any = getById(bookingId) || {
    id: bookingId, code: 'BK-AH-000', bookerName: 'Unknown', bookerEmail: '', bookerPhone: '',
    package: 'Unknown', schedule: '-', participants: 1, bookingType: 'Individual', roomType: 'Double',
    totalAmount: 'RM 0', paidAmount: 'RM 0', balance: 'RM 0',
    status: 'Draft', payment: 'Not Invoiced', allocation: 'Unallocated', createdAt: '-', agency: 'Al-Hijrah Travel'
  };

  const [status, setStatus] = useState(bkData.status);
  const [paymentStatus, setPaymentStatus] = useState(bkData.payment);
  const [allocationStatus, setAllocationStatus] = useState(bkData.allocation);

  const totalAmount = parseInt(String(bkData.totalAmount).replace(/[^\d]/g, '') || '0');
  const paidAmount = parseInt(String(bkData.paidAmount).replace(/[^\d]/g, '') || '0');
  const balance = parseInt(String(bkData.balance).replace(/[^\d]/g, '') || '0');

  const handleProcessPayment = () => {
    setPaymentStatus('Paid');
    setStatus('Confirmed');
    update(bookingId, { ...bkData, payment: 'Paid', status: 'Confirmed', paidAmount: bkData.totalAmount, balance: 'RM 0' });
    alert('Payment successfully processed. Receipt has been generated.');
  };

  const handleAllocate = () => {
    setAllocationStatus('Allocated');
    setStatus('Allocated');
    update(bookingId, { ...bkData, allocation: 'Allocated', status: 'Allocated' });
    alert('Participants have been successfully allocated to the Group Trip.');
  };

  const handleCancel = () => {
    setStatus('Cancelled');
    update(bookingId, { ...bkData, status: 'Cancelled' });
    alert('Cancellation request submitted successfully.');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
    { id: 'participants', label: 'Participants', icon: <Users size={16} /> },
    { id: 'payment', label: 'Payment & Invoice', icon: <CreditCard size={16} /> },
    { id: 'documents', label: 'Documents' },
    { id: 'allocation', label: 'Group Trip Allocation', icon: <Share2 size={16} /> },
    { id: 'logs', label: 'Activity Logs' },
  ];

  const mockParticipants = [
    { name: bkData.bookerName, relationship: 'Self (Booker)', paxCategory: 'Adult', roomType: bkData.roomType, price: bkData.totalAmount, docStatus: 'Verified', passportNo: 'A12345678' },
    ...(bkData.participants > 1 ? [{ name: 'Siti Aminah binti Razak', relationship: 'Spouse', paxCategory: 'Adult', roomType: bkData.roomType, price: 'RM 7,890', docStatus: 'Pending', passportNo: 'A98765432' }] : []),
    ...(bkData.participants > 2 ? [{ name: 'Aiman bin Ahmad', relationship: 'Child', paxCategory: 'Child', roomType: bkData.roomType, price: 'RM 5,500', docStatus: 'Missing', passportNo: 'B11223344' }] : []),
    ...(bkData.participants > 3 ? Array.from({ length: bkData.participants - 3 }, (_, i) => ({ name: `Participant ${i + 4}`, relationship: 'Member', paxCategory: 'Adult', roomType: bkData.roomType, price: 'RM 7,890', docStatus: 'Pending', passportNo: `C0000000${i}` })) : []),
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <HeroHeader
        title={bkData.code}
        onBack={() => navigate('ta-booking-list')}
        backLabel="Back to Bookings"
        theme="simple"
        coverImageUrl="/images/makkah.jpg"
        badges={[
          <Badge key="1" variant={getStatusBadgeVariant(status)} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)' }}>{status}</Badge>,
          <Badge key="2" variant={getStatusBadgeVariant(paymentStatus)}>{paymentStatus}</Badge>,
          <Badge key="3" variant={allocationStatus === 'Allocated' ? 'success' : 'neutral'}>{allocationStatus}</Badge>
        ]}
        subtitle={
          <>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><Users size={16} /> {bkData.bookerName} ({bkData.participants} Pax)</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><Package size={16} /> {bkData.package}</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><Calendar size={16} /> {bkData.schedule}</span>
          </>
        }
        actions={
          <>
            <Button variant="secondary" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} leftIcon={<Download size={16} />}>Invoice PDF</Button>
            <Button>Edit Booking</Button>
          </>
        }
      />

      {/* Key Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Amount" value={`RM ${totalAmount.toLocaleString()}`} icon={<DollarSign />} iconBg="var(--color-primary-light)" accentColor="var(--color-primary)" />
        <MetricCard title="Paid Amount" value={`RM ${paidAmount.toLocaleString()}`} icon={<CheckCircle2 />} iconBg="var(--color-success-light)" accentColor="var(--color-success)" />
        <MetricCard title="Outstanding Balance" value={`RM ${balance.toLocaleString()}`} icon={<AlertTriangle />} iconBg={balance > 0 ? 'var(--color-danger-light)' : 'var(--color-success-light)'} accentColor={balance > 0 ? 'var(--color-danger)' : 'var(--color-success)'} />
        <MetricCard title="Participants" value={bkData.participants.toString()} icon={<Users />} iconBg="#E0F2FE" accentColor="#0284C7" />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', padding: 'var(--space-6)', minHeight: '400px' }}>

        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                <div>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Booking Information</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Booking ID</span><span className="text-body-bold">{bkData.code}</span></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Package</span><span className="text-body-bold">{bkData.package}</span></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Schedule</span><span className="text-body-bold">{bkData.schedule}</span></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Booking Type</span><span className="text-body">{bkData.bookingType}</span></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Room Type</span><span className="text-body">{bkData.roomType}</span></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Created</span><span className="text-body">{bkData.createdAt}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Primary Booker</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <UserProfileCell name={bkData.bookerName} email={bkData.bookerEmail} isVerified={true} />
                    </div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Phone</span><span className="text-body">{bkData.bookerPhone}</span></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Participants</span><span className="text-body-bold">{bkData.participants} Pax</span></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Allocation Status</h3>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <Badge variant={allocationStatus === 'Allocated' ? 'success' : 'neutral'} style={{ marginBottom: 'var(--space-2)' }}>{allocationStatus}</Badge>
                  <p className="text-caption text-muted">{allocationStatus === 'Allocated' ? 'All participants have been assigned to a Group Trip.' : 'This booking has not yet been assigned to a Group Trip. Navigate to the Allocation tab to assign participants.'}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <h3 className="text-subsection-title">Financial Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-body text-muted">Total Amount</span><span className="text-body-bold">RM {totalAmount.toLocaleString()}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-body text-success">Paid Amount</span><span className="text-body-bold text-success">RM {paidAmount.toLocaleString()}</span></div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-body-bold text-danger">Remaining Balance</span><span className="text-body-bold text-danger">RM {balance.toLocaleString()}</span></div>
              <Button style={{ marginTop: 'var(--space-4)' }} onClick={handleProcessPayment} disabled={balance <= 0}>{balance <= 0 ? 'Fully Paid' : 'Process Payment'}</Button>
            </div>
          </div>
        )}

        {activeTab === 'participants' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Users className="text-primary" size={20} />
              <h3 className="text-subsection-title">Participants ({mockParticipants.length})</h3>
            </div>

            <div className="data-table-container">
              <table className="data-table text-body">
                <thead>
                  <tr>
                    <th>Participant Name</th>
                    <th>Relationship</th>
                    <th>Pax Category</th>
                    <th>Room Type</th>
                    <th>Passport</th>
                    <th>Documents</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockParticipants.map((p, idx) => (
                    <tr key={idx}>
                      <td>
                        <UserProfileCell 
                          name={p.name} 
                          isVerified={p.docStatus === 'Verified'} 
                          subtitleNode={idx === 0 ? <Badge variant="info" size="sm">Booker</Badge> : undefined} 
                        />
                      </td>
                      <td>{p.relationship}</td>
                      <td><Badge variant={p.paxCategory === 'Adult' ? 'neutral' : 'info'} size="sm">{p.paxCategory}</Badge></td>
                      <td>{p.roomType}</td>
                      <td><SensitiveDataReveal label="" realValue={p.passportNo} maskedValue={p.passportNo.substring(0, 1) + '•••••' + p.passportNo.slice(-2)} /></td>
                      <td>
                        <Badge variant={p.docStatus === 'Verified' ? 'success' : p.docStatus === 'Pending' ? 'warning' : 'danger'} size="sm">{p.docStatus}</Badge>
                      </td>
                      <td><Button variant="ghost" size="sm">View Jamaah</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <CreditCard className="text-primary" size={20} />
              <h3 className="text-subsection-title">Pricing Snapshot & Payment Record</h3>
            </div>

            <div className="data-table-container">
              <table className="data-table text-body">
                <thead>
                  <tr>
                    <th>Participant</th>
                    <th>Room Type</th>
                    <th>Pax Category</th>
                    <th>Base Price</th>
                    <th>Discount</th>
                    <th>Final Price</th>
                  </tr>
                </thead>
                <tbody>
                  {mockParticipants.map((p, idx) => (
                    <tr key={idx}>
                      <td>{p.name}</td>
                      <td>{p.roomType}</td>
                      <td>{p.paxCategory}</td>
                      <td>{p.price}</td>
                      <td>RM 0</td>
                      <td><span className="text-body-bold">{p.price}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
                <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-4)' }}>Invoices & Receipts</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><FileText size={16} className="text-muted" /><span className="text-body">INV-AH-2026-{bkData.code?.split('-').pop() || '001'}</span></div>
                  <Button variant="ghost" size="sm" leftIcon={<Download size={14} />}>PDF</Button>
                </div>
                {paymentStatus === 'Paid' && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><FileText size={16} className="text-muted" /><span className="text-body">RCT-AH-2026-{bkData.code?.split('-').pop() || '001'}</span></div>
                    <Button variant="ghost" size="sm" leftIcon={<Download size={14} />}>PDF</Button>
                  </div>
                )}
              </div>

              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}><span className="text-body text-muted">Subtotal</span><span className="text-body">RM {totalAmount.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>Total Amount</span>
                  <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>RM {totalAmount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}><span className="text-body text-success">Paid</span><span className="text-body text-success">RM {paidAmount.toLocaleString()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-body-bold text-danger">Balance Due</span><span className="text-body-bold text-danger">RM {balance.toLocaleString()}</span></div>
              </div>
            </div>

            {/* Record Payment Form */}
            {balance > 0 && (
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-4)' }}>Record Payment</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Payment Date"><Input type="date" /></FormField>
                  <FormField label="Amount"><Input placeholder="e.g. 5000" type="number" /></FormField>
                  <FormField label="Payment Method"><Select options={[{value: 'bank', label: 'Bank Transfer'}, {value: 'fpx', label: 'FPX'}, {value: 'cash', label: 'Cash'}, {value: 'card', label: 'Card'}]} value="bank" onChange={() => {}} /></FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                  <FormField label="Reference Number"><Input placeholder="e.g. TXN-123456" /></FormField>
                  <FormField label="Notes"><Input placeholder="Optional payment note" /></FormField>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
                  <Button onClick={handleProcessPayment}>Record Payment</Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <FileText className="text-primary" size={20} />
              <h3 className="text-subsection-title">Document Readiness Summary</h3>
            </div>
            <p className="text-body text-muted">Summary of document readiness for all participants in this booking.</p>

            <div className="data-table-container">
              <table className="data-table text-body">
                <thead>
                  <tr>
                    <th>Participant</th>
                    <th>IC / Identity</th>
                    <th>Passport</th>
                    <th>Profile Photo</th>
                    <th>Vaccination</th>
                    <th>Visa Application</th>
                    <th>Overall</th>
                  </tr>
                </thead>
                <tbody>
                  {mockParticipants.map((p, idx) => {
                    const isComplete = p.docStatus === 'Verified';
                    return (
                      <tr key={idx}>
                        <td><span className="text-body-bold">{p.name}</span></td>
                        <td><Badge variant={isComplete ? 'success' : 'warning'} size="sm">{isComplete ? 'Verified' : 'Uploaded'}</Badge></td>
                        <td><Badge variant={isComplete ? 'success' : idx === 2 ? 'danger' : 'warning'} size="sm">{isComplete ? 'Verified' : idx === 2 ? 'Missing' : 'Uploaded'}</Badge></td>
                        <td><Badge variant={isComplete || idx < 2 ? 'success' : 'danger'} size="sm">{isComplete || idx < 2 ? 'Uploaded' : 'Missing'}</Badge></td>
                        <td><Badge variant="neutral" size="sm">Not Required</Badge></td>
                        <td><Badge variant={isComplete ? 'success' : 'neutral'} size="sm">{isComplete ? 'Processing' : 'Pending'}</Badge></td>
                        <td><Badge variant={isComplete ? 'success' : p.docStatus === 'Pending' ? 'warning' : 'danger'} size="sm">{p.docStatus}</Badge></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'allocation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Share2 className="text-primary" size={20} />
              <h3 className="text-subsection-title">Group Trip Allocation</h3>
            </div>
            <p className="text-body text-muted">Assign the confirmed participants from this booking into an operational Group Trip.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', alignItems: 'end', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <FormField label="Target Group Trip">
                <Select options={[{value: 'gt1', label: `${bkData.package} (TRP-AH-001)`}]} value="gt1" onChange={() => {}} />
              </FormField>
              <Button onClick={handleAllocate} disabled={allocationStatus === 'Allocated'}>
                {allocationStatus === 'Allocated' ? 'Allocated ✓' : 'Allocate Participants'}
              </Button>
            </div>

            {allocationStatus === 'Allocated' ? (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-success-light)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Plane size={16} style={{ color: 'var(--color-success-dark)' }} />
                  <span className="text-body" style={{ color: 'var(--color-success-dark)' }}><strong>Allocation Complete:</strong> All {bkData.participants} participants have been assigned to Group Trip TRP-AH-001.</span>
                </div>
                <div className="data-table-container">
                  <table className="data-table text-body" style={{ margin: 0 }}>
                    <thead><tr><th>Participant</th><th>Type</th><th>Group Trip</th><th>Assigned Flight</th></tr></thead>
                    <tbody>
                      {mockParticipants.map((p, idx) => (
                        <tr key={idx}>
                          <td><span className="text-body-bold">{p.name}</span></td>
                          <td>{p.paxCategory}</td>
                          <td>TRP-AH-001</td>
                          <td><Badge variant="info">MH8460 (KUL-JED)</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <span className="text-body text-muted">No participants have been allocated yet. Click "Allocate Participants" to assign them.</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'logs' && (
          <AuditLogPanel
            logs={[
              { id: '1', timestamp: '30 minutes ago', actor: 'Ahmad Faizal', action: 'Payment Recorded', module: 'Booking', details: `Payment of ${bkData.paidAmount} recorded via Bank Transfer` },
              { id: '2', timestamp: '1 day ago', actor: 'Admin Staff', action: 'Invoice Generated', module: 'Finance', details: `Invoice INV-AH-2026-${bkData.code?.split('-').pop() || '001'} generated and sent` },
              { id: '3', timestamp: '2 days ago', actor: 'Admin Staff', action: 'Participant Added', module: 'Booking', details: `${bkData.participants} participants added to booking` },
              { id: '4', timestamp: '3 days ago', actor: 'Admin Staff', action: 'Booking Created', module: 'Booking', details: `Booking ${bkData.code} created for ${bkData.package}` },
            ]}
          />
        )}

      </div>
    </div>
  );
};
