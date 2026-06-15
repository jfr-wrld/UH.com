import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { ApprovalDecisionBar } from '../../components/domain/ApprovalDecisionBar';
import { Package, Map, Calendar, BedDouble, Plane, DollarSign, Image as ImageIcon, Users, Eye, ChevronRight } from 'lucide-react';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const PackageDetails: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: any, packageId?: string }> = ({ navigate, showToast, packageId = 'pkg_1' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { getById, update } = useLocalStorageCrud('package');

  // Real Data fetch
  const pkgData = getById(packageId);

  if (!pkgData) {
    return (
      <div style={{ padding: 'var(--space-6)' }}>
        <PageHeader title="Package Not Found" breadcrumbs={[{ label: 'Home' }, { label: 'Packages', onClick: () => navigate('package-list') }]} />
        <p className="text-body text-muted">The package you are looking for does not exist or has been deleted.</p>
        <Button onClick={() => navigate('package-list')} style={{ marginTop: 'var(--space-4)' }}>Back to Packages</Button>
      </div>
    );
  }

  // Fallbacks for older dummy packages
  const pkg = {
    ...pkgData,
    visibility: pkgData.visibility || 'Public',
    availability: pkgData.availability || 'Open',
    promoLabels: pkgData.labels || [],
    description: pkgData.description || 'An exclusive Umrah package.',
    features: pkgData.features || ['Mutawwif Guide', '24/7 Support'],
    inclusions: pkgData.inclusions || ['Flight Tickets', 'Hotel Stay', 'Visa Processing'],
    thumbnail: pkgData.thumbnailUrl || 'https://picsum.photos/seed/479/600/400',
    cancellationPolicy: pkgData.cancellationPolicy || 'Standard cancellation policy applies.',
    refundPolicy: pkgData.refundPolicy || 'Refunds processed within 14-21 days.',
    amendmentPolicy: pkgData.amendmentPolicy || 'Name changes allowed up to 30 days prior.',
    disclaimers: pkgData.disclaimers || 'Terms and conditions apply.',
    roomPrices: pkgData.roomPrices || [
      { type: 'Double', adult: pkgData.price || 'RM 8500', child: 'RM 6000', childNoBed: 'RM 5500', infant: 'RM 2500' }
    ],
    schedules: pkgData.schedules || [
      { id: '1', departureDate: pkgData.schedule || 'TBD', returnDate: 'TBD', visibility: 'visible' }
    ],
    airline: pkgData.airline || 'mh',
    flight: pkgData.flight || 'Malaysia Airlines (MH)',
    depAirport: pkgData.depAirport || 'KUL',
    arrAirport: pkgData.arrAirport || 'JED',
    retDepAirport: pkgData.retDepAirport || 'MED',
    retArrAirport: pkgData.retArrAirport || 'KUL',
    hotel: pkgData.hotel || 'Swissotel Makkah',
    makkahHotel: pkgData.makkahHotel || pkgData.hotel || 'Swissotel Makkah',
    madinahHotel: pkgData.madinahHotel || 'Pullman Zamzam Madinah',
    depositAmount: pkgData.depositAmount || 'RM 1500',
    agentCommission: pkgData.agentCommission || pkgData.commission || 'RM 500',
    status: pkgData.status || 'Draft'
  };

  const handleStatusChange = (newStatus: string) => {
    update(pkg.id, { ...pkgData, status: newStatus });
    if(showToast) showToast('Status Updated', `Package status changed to ${newStatus}`, 'success');
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
                currentStatus={pkg.status}
                allowedTransitions={['Draft', 'Pending Approval', 'Published', 'Archived']}
                onTransition={handleStatusChange}
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

      {pkg.status === 'Pending Approval' && (
        <ApprovalDecisionBar 
          onApprove={() => handleStatusChange('Published')}
          onReject={() => handleStatusChange('Draft')}
          onRevise={() => handleStatusChange('Draft')}
        />
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Package Description</h3>
                <p className="text-body" style={{ lineHeight: '1.6' }}>{pkg.description}</p>
              </div>
              
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Key Features</h3>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {pkg.features.map((f: string) => <Badge key={f} variant="primary">{f}</Badge>)}
                </div>
              </div>

              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Package Inclusions</h3>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {pkg.inclusions.map((i: string) => <div key={i} className="text-body" style={{ padding: '4px 12px', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-pill)', border: 'none' }}>✓ {i}</div>)}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <h3 className="text-subsection-title">Configuration</h3>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Category & Type</span>
                <span className="text-body-bold">{pkg.category} • {pkg.type}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Visibility</span>
                <span className="text-body-bold" style={{ textTransform: 'capitalize' }}>{pkg.visibility}</span>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Booking Availability</span>
                <span className="text-body-bold text-success" style={{ textTransform: 'capitalize' }}>{pkg.availability.replace('_', ' ')}</span>
              </div>
              {pkg.promoLabels.length > 0 && (
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Promo Labels</span>
                  <div style={{ display: 'flex', gap: 'var(--space-1)', marginTop: 'var(--space-1)' }}>
                    {pkg.promoLabels.map((label: string) => (
                      <Badge key={label} variant="primary" style={{ fontSize: '0.6rem', padding: '2px 4px' }}>{label}</Badge>
                    ))}
                  </div>
                </div>
              )}
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
                    <th>Child (w/o Bed)</th>
                    <th>Infant Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.roomPrices.map((room: any, idx: number) => (
                    <tr key={idx} style={room.isDefault ? { backgroundColor: 'var(--color-primary-light)' } : {}}>
                      <td><span className="text-body-bold">{room.type} {room.isDefault ? '(Default)' : ''}</span></td>
                      <td><span className="text-body">{room.adult || '-'}</span></td>
                      <td><span className="text-body">{room.child || '-'}</span></td>
                      <td><span className="text-body">{room.childNoBed || '-'}</span></td>
                      <td><span className="text-body">{room.infant || '-'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Payment</span>
                <span className="text-body">Deposit Required: <strong>{pkg.depositAmount}</strong></span>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Commission</span>
                <span className="text-body">Agent Commission: <strong>{pkg.agentCommission}</strong></span>
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
              {pkg.schedules.map((sched: any, idx: number) => (
                <div key={idx} style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                    <span className="text-body-bold">
                      {sched.departureDate ? new Date(sched.departureDate).toLocaleDateString('en-GB') : 'TBD'} 
                      {sched.returnDate ? ` - ${new Date(sched.returnDate).toLocaleDateString('en-GB')}` : ''}
                    </span>
                    <span className="text-caption text-muted">Visibility: <span style={{ textTransform: 'capitalize' }}>{sched.visibility}</span> • Capacity: {sched.capacity || 45} Pax</span>
                  </div>
                  <Badge variant={sched.flightStatus === 'confirmed' ? 'success' : 'warning'}>Flight: {sched.flightStatus || 'pending'}</Badge>
                </div>
              ))}
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
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>{pkg.flight}</span>
                <span className="text-body" style={{ display: 'block', textTransform: 'uppercase' }}>Departure: {pkg.depAirport} ➔ {pkg.arrAirport}</span>
                <span className="text-body" style={{ display: 'block', textTransform: 'uppercase' }}>Return: {pkg.retDepAirport} ➔ {pkg.retArrAirport}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <BedDouble className="text-primary" size={20} />
                <h3 className="text-subsection-title">Hotel Details</h3>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Makkah Hotel</span>
                  <span className="text-body-bold">{pkg.makkahHotel === 'swiss' ? 'Swissotel Makkah' : pkg.makkahHotel}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Madinah Hotel</span>
                  <span className="text-body-bold">{pkg.madinahHotel === 'pullman' ? 'Pullman Zamzam Madinah' : pkg.madinahHotel}</span>
                </div>
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
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
              <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Template: {pkg.itineraryTemplate || 'Standard 12 Days Umrah Template'}</span>
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
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                { id: '1', timestamp: 'Just now', actor: 'System', action: 'Viewed', module: 'Package', details: 'Viewed details' }
              ]}
            />
          </div>
        )}

        {activeTab === 'terms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Cancellation Policy</h3>
              <p className="text-body" style={{ whiteSpace: 'pre-wrap' }}>{pkg.cancellationPolicy}</p>
            </div>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Refund Policy</h3>
              <p className="text-body" style={{ whiteSpace: 'pre-wrap' }}>{pkg.refundPolicy}</p>
            </div>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Amendment Policy</h3>
              <p className="text-body" style={{ whiteSpace: 'pre-wrap' }}>{pkg.amendmentPolicy}</p>
            </div>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Disclaimers</h3>
              <p className="text-body" style={{ whiteSpace: 'pre-wrap' }}>{pkg.disclaimers}</p>
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
                    <span className="text-body-bold">Version 1.0</span>
                    <Badge variant="success">Current Published</Badge>
                  </div>
                  <span className="text-caption text-muted">Published by Admin</span>
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
