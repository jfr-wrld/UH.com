import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { ApprovalDecisionBar } from '../../components/domain/ApprovalDecisionBar';
import { Package, Map, Calendar, BedDouble, Plane, DollarSign, Image as ImageIcon, Users, Eye, ChevronRight } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

export const PackageDetails: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: any, packageId?: string }> = ({ navigate, showToast, packageId = 'pkg_1' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [status, setStatus] = useState('Pending Approval');

  // Mock Data
  const pkg = {
    id: packageId,
    code: 'PKG-UMR-26-001',
    name: 'Premium Umrah Safar 2026',
    agency: 'Zamzam Travels',
    category: 'Umrah',
    type: 'Premium',
    status: status,
    visibility: 'Public',
    availability: 'Open',
    promoLabels: ['Best Offer', 'High Season'],
    description: 'An exclusive 11-day Premium Umrah package featuring stays at the Swissotel Makkah and Pullman Zamzam Madinah. Includes full board meals and private transportation.',
    features: ['Mutawwif Guide', '24/7 Support', 'VIP Transport'],
    inclusions: ['Flight Tickets', 'Hotel Stay', 'Visa Processing', 'Daily Breakfast', 'Zam-zam Water'],
    thumbnail: 'https://images.unsplash.com/photo-1565552643952-b13c8f8cd83b?w=600&h=400&fit=crop',
    cancellationPolicy: 'Cancellations made 45 days prior to departure will receive a full refund minus a RM 500 processing fee.',
    refundPolicy: 'Refunds are processed within 14-21 working days after approval.',
    amendmentPolicy: 'Name changes are allowed up to 30 days prior to departure subject to airline policies.'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
    { id: 'pricing', label: 'Pricing' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'logistics', label: 'Hotel & Flight' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'media', label: 'Media' },
    { id: 'usage', label: 'Usage' },
    { id: 'logs', label: 'Activity Logs' },
    { id: 'terms', label: 'Terms' },
    { id: 'versions', label: 'Versions' },
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
          <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: 'var(--surface-sunken)' }}>
            <img src={pkg.thumbnail} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <h1 className="text-page-title">{pkg.name}</h1>
              <StatusTransitionMenu 
                currentStatus={status}
                allowedTransitions={['Draft', 'Pending Approval', 'Published', 'Archived']}
                onTransition={setStatus}
              />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <span className="text-body text-muted">{pkg.code}</span>
              <span className="text-caption text-muted">•</span>
              <span className="text-body text-muted">{pkg.agency}</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="ghost" onClick={() => navigate('package-list')}>Back to List</Button>
          <Button onClick={() => navigate('package-create', { id: packageId })}>Edit Package</Button>
        </div>
      </div>

      {status === 'Pending Approval' && (
        <ApprovalDecisionBar 
          onApprove={() => { setStatus('Published'); if(showToast) showToast('Approved', 'Package published successfully.', 'success'); }}
          onReject={() => { setStatus('Draft'); if(showToast) showToast('Rejected', 'Package returned to draft.', 'error'); }}
          onRevise={() => { setStatus('Draft'); if(showToast) showToast('Revision Requested', 'Sent revision notes to agency.', 'warning'); }}
        />
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Package Description</h3>
                <p className="text-body" style={{ lineHeight: '1.6' }}>{pkg.description}</p>
              </div>
              
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Key Features</h3>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  {pkg.features.map(f => <Badge key={f} variant="primary">{f}</Badge>)}
                </div>
              </div>

              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Package Inclusions</h3>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {pkg.inclusions.map(i => <div key={i} className="text-body" style={{ padding: '4px 12px', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-full)', border: 'none' }}>✓ {i}</div>)}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <h3 className="text-subsection-title">Configuration</h3>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Visibility</span>
                <span className="text-body-bold">{pkg.visibility}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Booking Availability</span>
                <span className="text-body-bold text-success">{pkg.availability}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Promo Labels</span>
                <div style={{ display: 'flex', gap: 'var(--space-1)', marginTop: 'var(--space-1)' }}>
                  {pkg.promoLabels.map(label => (
                    <Badge key={label} variant="primary" style={{ fontSize: '0.6rem', padding: '2px 4px' }}>{label}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Creation Source</span>
                <span className="text-body">Travel Agency</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Terms Status</span>
                <span className="text-body text-success">Completed</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <DollarSign className="text-primary" size={20} />
              <h3 className="text-subsection-title">Room Pricing</h3>
            </div>
            <div className="data-table-container">
              <table className="data-table text-body">
                <thead>
                  <tr>
                    <th>Room Type</th>
                    <th>Adult Price</th>
                    <th>Child Price</th>
                    <th>Infant Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ backgroundColor: 'var(--color-primary-light)' }}>
                    <td><span className="text-body-bold">Double (Default)</span></td>
                    <td><span className="text-body">RM 8,500</span></td>
                    <td><span className="text-body">RM 6,000</span></td>
                    <td><span className="text-body">RM 2,500</span></td>
                  </tr>
                  <tr>
                    <td><span className="text-body-bold">Triple</span></td>
                    <td><span className="text-body">RM 8,200</span></td>
                    <td><span className="text-body">-</span></td>
                    <td><span className="text-body">-</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Payment</span>
                <span className="text-body">Deposit Required: <strong>RM 1,500</strong></span>
              </div>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Commission</span>
                <span className="text-body">Agent Commission: <strong>RM 500 / pax</strong></span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Calendar className="text-primary" size={20} />
              <h3 className="text-subsection-title">Trip Schedules</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <span className="text-body-bold">15 Dec 2026 - 26 Dec 2026 (11 Days)</span>
                  <span className="text-caption text-muted">Season: High Season - Dec 2026</span>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <span className="text-body-bold">20 Jan 2027 - 31 Jan 2027 (11 Days)</span>
                  <span className="text-caption text-muted">Season: Low Season - Winter 2027</span>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logistics' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Plane className="text-primary" size={20} />
                <h3 className="text-subsection-title">Flight Details</h3>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Saudi Airlines (SV)</span>
                <span className="text-body" style={{ display: 'block' }}>Departure: KUL ➔ JED</span>
                <span className="text-body" style={{ display: 'block' }}>Return: MED ➔ KUL</span>
                <Badge variant="success" style={{ marginTop: 'var(--space-3)' }}>Confirmed</Badge>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <BedDouble className="text-primary" size={20} />
                <h3 className="text-subsection-title">Hotel Details</h3>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Makkah (7 Nights)</span>
                  <span className="text-body-bold">Swissotel Makkah</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Madinah (4 Nights)</span>
                  <span className="text-body-bold">Pullman Zamzam Madinah</span>
                </div>
                <Badge variant="success" style={{ width: 'fit-content', marginTop: 'var(--space-2)' }}>Confirmed</Badge>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Map className="text-primary" size={20} />
              <h3 className="text-subsection-title">Itinerary Reference</h3>
            </div>
            <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
              <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Standard 12 Days Umrah Template</span>
              <span className="text-body text-muted">This package inherits the standard Umrah operational itinerary. Days will map exactly to the selected schedule dates when a Group Trip is created.</span>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <ImageIcon className="text-primary" size={20} />
              <h3 className="text-subsection-title">Media</h3>
            </div>
            <div style={{ width: '300px', height: '200px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <img src={pkg.thumbnail} alt="Package" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Users className="text-primary" size={20} />
              <h3 className="text-subsection-title">Group Trip Usage</h3>
            </div>
            <p className="text-body text-muted">The following group trips have been spawned from this package.</p>
            <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="text-body-bold">TRP-1001: Premium Umrah (Dec 26)</span>
                <span className="text-caption text-muted">45 Pax • Departing 15 Dec 2026</span>
              </div>
              <Button variant="secondary" size="sm">View Trip</Button>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '1 day ago', actor: 'Agency Admin', action: 'Published Package', module: 'Package', details: 'Status changed to Published' },
                { id: '2', timestamp: '2 days ago', actor: 'Agency Admin', action: 'Updated Pricing', module: 'Package', details: 'Changed Adult Price from RM 8000 to RM 8500' },
                { id: '3', timestamp: '1 week ago', actor: 'Agency Admin', action: 'Created Package', module: 'Package', details: 'Draft created' }
              ]}
            />
          </div>
        )}

        {activeTab === 'terms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Cancellation Policy</h3>
              <p className="text-body">{pkg.cancellationPolicy}</p>
            </div>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Refund Policy</h3>
              <p className="text-body">{pkg.refundPolicy}</p>
            </div>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Amendment Policy</h3>
              <p className="text-body">{pkg.amendmentPolicy}</p>
            </div>
          </div>
        )}

        {activeTab === 'versions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h3 className="text-subsection-title">Package Versions</h3>
            <p className="text-body text-muted">Version history for audit and snapshot tracking.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-primary)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span className="text-body-bold">Version 2.0</span>
                    <Badge variant="success">Current Published</Badge>
                  </div>
                  <span className="text-caption text-muted">Published on 15 Jun 2026 by Agency Admin</span>
                </div>
                <Button variant="secondary" size="sm">View</Button>
              </div>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span className="text-body-bold">Version 1.0</span>
                    <Badge variant="neutral">Archived</Badge>
                  </div>
                  <span className="text-caption text-muted">Published on 01 Jun 2026 by Agency Admin</span>
                </div>
                <Button variant="secondary" size="sm">View</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
