import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { SensitiveDataReveal } from '../../components/domain/SensitiveDataReveal';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { Users, CreditCard, Share2, AlertTriangle, FileText, Download, Eye, ChevronRight, XCircle } from 'lucide-react';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { useDataFilter } from '../../hooks/useDataFilter';

export const BookingDetails: React.FC<{ navigate: (route: string, data?: any) => void, bookingId?: string }> = ({ navigate, bookingId = 'bk_1' }) => {
  const [status, setStatus] = useState('Confirmed');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data
  const booking = {
    id: bookingId,
    bookingId: 'BKG-2026-001',
    agency: 'Zamzam Travels',
    source: 'Admin Assisted',
    package: 'Premium Umrah Safar (v2.1)',
    schedule: '15 Dec 2026 - 26 Dec 2026',
    booker: 'Ahmad Hassan',
    participants: 4,
    status: status,
    paymentStatus: 'Partially Paid',
    allocationStatus: 'Not Allocated',
    totalAmount: 48000,
    paidAmount: 10000,
    balance: 38000
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
    { id: 'participants', label: 'Participants' },
    { id: 'payment', label: 'Pricing & Payment' },
    { id: 'allocation', label: 'Group Trip Allocation' },
    { id: 'cancellation', label: 'Cancellation & Refund', icon: <XCircle size={16} /> },
    { id: 'logs', label: 'Activity Logs' },
  ];
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(tabs);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <h1 className="text-page-title">{booking.bookingId}</h1>
              <StatusTransitionMenu currentStatus={status} onTransition={setStatus} allowedTransitions={['Draft', 'Active', 'Archived', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'Scheduled', 'Upcoming', 'Under Review', 'Published']} />
              <Badge variant="warning">{booking.paymentStatus}</Badge>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--text-muted)' }}>
              <span className="text-body-bold">{booking.booker}</span>
              <span>•</span>
              <span className="text-body">{booking.agency}</span>
              <span>•</span>
              <span className="text-body">{booking.package}</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => navigate('booking-list')}>Back to List</Button>
          <Button>Edit Booking</Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                <div>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Booking Information</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Package Schedule</span><span className="text-body-bold">{booking.schedule}</span></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Total Participants</span><span className="text-body-bold">{booking.participants} Pax</span></div>
                    <div><span className="text-caption text-muted" style={{ display: 'block' }}>Creation Source</span><span className="text-body">{booking.source}</span></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Allocation Status</h3>
                  <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                    <Badge variant="neutral" style={{ marginBottom: 'var(--space-2)' }}>{booking.allocationStatus}</Badge>
                    <p className="text-caption text-muted">This booking has not yet been assigned to an operational Group Trip. Navigate to the Allocation tab to assign participants.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Booking Notes</h3>
                <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                  <p className="text-body text-muted">No additional notes provided by the booker.</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <h3 className="text-subsection-title">Financial Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body text-muted">Total Amount</span>
                <span className="text-body-bold">RM {booking.totalAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body text-success">Paid Amount</span>
                <span className="text-body-bold text-success">RM {booking.paidAmount.toLocaleString()}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-body-bold text-danger">Remaining Balance</span>
                <span className="text-body-bold text-danger">RM {booking.balance.toLocaleString()}</span>
              </div>
              <Button style={{ marginTop: 'var(--space-4)' }}>Process Payment</Button>
            </div>
          </div>
        )}

        {activeTab === 'participants' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Users className="text-primary" size={20} />
              <h3 className="text-subsection-title">Primary Booker & Participants</h3>
            </div>
            
            <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
              <Badge variant="primary" style={{ marginBottom: 'var(--space-2)' }}>Primary Booker</Badge>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <div><span className="text-caption text-muted" style={{ display: 'block' }}>Name</span><span className="text-body-bold">Ahmad Hassan</span></div>
                <div><span className="text-caption text-muted" style={{ display: 'block' }}>Email</span><span className="text-body">ahmad.h@example.com</span></div>
                <div><span className="text-caption text-muted" style={{ display: 'block' }}>Phone</span><span className="text-body">+60123456789</span></div>
              </div>
            </div>

            <div className="data-table-container" style={{ marginTop: 'var(--space-4)' }}>
              <table className="data-table text-body">
                <thead>
                  <tr>
                    <th>Participant Name</th>
                    <th>Type</th>
                    <th>Passport</th>
                    <th>Relationship</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="text-body-bold">Ahmad Hassan</span></td>
                    <td>Adult</td>
                    <td>
                      <SensitiveDataReveal label="" realValue="A1234567" maskedValue="A•••••67" />
                    </td>
                    <td>Self</td>
                    <td><Button variant="ghost" size="sm">View Jamaah</Button></td>
                  </tr>
                  <tr>
                    <td><span className="text-body-bold">Siti Aminah</span></td>
                    <td>Adult</td>
                    <td>
                      <SensitiveDataReveal label="" realValue="A9876543" maskedValue="A•••••43" />
                    </td>
                    <td>Spouse</td>
                    <td><Button variant="ghost" size="sm">View Jamaah</Button></td>
                  </tr>
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
                    <th>Room Type (Snapshot)</th>
                    <th>Base Price</th>
                    <th>Discount</th>
                    <th>Final Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ahmad Hassan</td>
                    <td>Double Room</td>
                    <td>RM 12,000</td>
                    <td>RM 0</td>
                    <td><span className="text-body-bold">RM 12,000</span></td>
                  </tr>
                  <tr>
                    <td>Siti Aminah</td>
                    <td>Double Room</td>
                    <td>RM 12,000</td>
                    <td>RM 0</td>
                    <td><span className="text-body-bold">RM 12,000</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-4)' }}>Invoices & Receipts</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><FileText size={16} className="text-muted" /><span className="text-body">INV-2026-001 (Deposit)</span></div>
                  <Button variant="ghost" size="sm" leftIcon={<Download size={14} />}>PDF</Button>
                </div>
              </div>
              
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body text-muted">Subtotal</span>
                  <span className="text-body">RM 24,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>Total Amount</span>
                  <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>RM 24,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body text-success">Paid (Deposit)</span>
                  <span className="text-body text-success">RM 10,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body-bold text-danger">Balance Due</span>
                  <span className="text-body-bold text-danger">RM 14,000</span>
                </div>
              </div>
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
                <Select options={[{value: 'gt1', label: 'Premium Umrah Safar (TRP-1001)'}]} value="gt1" onChange={() => {}} />
              </FormField>
              <Button>Allocate Participants</Button>
            </div>
            
            <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <span className="text-body text-muted">No participants have been allocated yet.</span>
            </div>
          </div>
        )}

        {activeTab === 'cancellation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <AlertTriangle className="text-danger" size={20} />
              <h3 className="text-subsection-title">Cancellation & Refund Request</h3>
            </div>
            <p className="text-body text-muted">Initiate a cancellation request for this booking. This will trigger a review process by the Finance team for any potential refunds.</p>
            
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Cancellation Requester">
                  <Select options={[{value: 'jamaah', label: 'Jamaah / Customer'}, {value: 'agency', label: 'Travel Agency'}, {value: 'admin', label: 'System Admin'}]} value="jamaah" onChange={() => {}} />
                </FormField>
                <FormField label="Cancellation Date">
                  <Input type="date" />
                </FormField>
              </div>
              <FormField label="Cancellation Reason"><Select options={[{value: 'personal', label: 'Personal Reason'}]} value="personal" onChange={() => {}} /></FormField>
              <FormField label="Remarks"><Input placeholder="Enter details..." /></FormField>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="danger">Request Cancellation</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '1 day ago', actor: 'Finance Admin', action: 'Payment Processed', module: 'Booking', details: 'Deposit of RM 10,000 received' },
                { id: '2', timestamp: '2 days ago', actor: 'Agency Admin', action: 'Booking Created', module: 'Booking', details: 'Booking submitted for Premium Umrah Safar' }
              ]}
            />
          </div>
        )}

      </div>
    </div>
  );
};
