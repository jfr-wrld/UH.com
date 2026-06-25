import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { ApprovalDecisionBar } from '../../components/domain/ApprovalDecisionBar';
import { Package, Map, Calendar, BedDouble, Plane, DollarSign, Image as ImageIcon, Users, Eye, ChevronRight, BadgeCheck } from 'lucide-react';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const PackageDetails: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: any, packageId?: string }> = ({ navigate, showToast, packageId = 'pkg_1' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { getById, update } = useLocalStorageCrud('package');

  // Real Data fetch
  const pkgData: any = getById(packageId);

  if (!pkgData || !pkgData.id) {
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
    thumbnail: pkgData.thumbnailUrl || '/images/makkah.jpg',
    gallery: pkgData.gallery || ['/images/makkah.jpg', '/images/makkah.jpg', '/images/makkah.jpg'],
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
    status: pkgData.status || 'Draft',
    createdBy: pkgData.createdBy || 'System Admin',
    lastUpdatedBy: pkgData.lastUpdatedBy || 'TA PIC',
    readinessScore: pkgData.readinessScore || '100%',
    basePrice: pkgData.basePrice || pkgData.price || 'RM 8,500',
    version: pkgData.version || '1.0'
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
      {/* Back Button */}
      <div style={{ marginBottom: '-16px' }}>
        <button 
          onClick={() => navigate('package-list')}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'none', border: 'none', color: 'var(--color-text-neutral)', cursor: 'pointer', padding: 0, fontWeight: 500 }}
          className="text-body"
        >
          <ChevronRight style={{ transform: 'rotate(180deg)' }} size={16} /> Back to Packages
        </button>
      </div>

      {/* Hero Header Section */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '280px', 
        borderRadius: 'var(--radius-lg)', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'var(--space-6)',
        boxShadow: 'var(--glass-shadow)',
        marginTop: 'var(--space-2)'
      }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={pkg.thumbnail} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/images/makkah.jpg'; }} />
        </div>
        {/* Dark Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)' }} />
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: 'white' }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <Badge variant={getCategoryBadgeVariant(pkg.category)}>{pkg.category}</Badge>
              <Badge variant={getStatusBadgeVariant(pkg.status)}>{pkg.status}</Badge>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>{pkg.name}</h1>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', opacity: 0.9, marginTop: 'var(--space-1)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><Package size={16} /> {pkg.code}</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={`https://picsum.photos/seed/${pkg.agency.length * 10}/150/150`} alt={pkg.agency} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {pkg.agency}
                <BadgeCheck size={16} style={{ color: '#0ea5e9' }} />
              </span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', color: 'var(--color-success-light)' }}><DollarSign size={16} /> Starting from {pkg.basePrice}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button onClick={() => navigate('package-create', { id: packageId })}>Edit Package</Button>
          </div>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
                  <Package size={24} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="text-caption text-muted">Package Type</span>
                  <span className="text-body-bold" style={{ fontSize: '16px' }}>{pkg.type}</span>
                </div>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success-dark)' }}>
                  <Calendar size={24} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="text-caption text-muted">Booking Status</span>
                  <span className="text-body-bold" style={{ textTransform: 'capitalize', fontSize: '16px' }}>{pkg.availability.replace('_', ' ')}</span>
                </div>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)' }}>
                  <Eye size={24} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="text-caption text-muted">Visibility</span>
                  <span className="text-body-bold" style={{ textTransform: 'capitalize', fontSize: '16px' }}>{pkg.visibility}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <div>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Package Description</h3>
                  <p className="text-body" style={{ lineHeight: '1.7', color: 'var(--color-text-neutral)' }}>{pkg.description}</p>
                </div>
                
                <div>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Package Inclusions</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                    {pkg.inclusions.map((i: string) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-success-light)', padding: '4px', borderRadius: '50%' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
                        <span className="text-body" style={{ fontWeight: '500' }}>{i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)' }}>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-4)' }}>Key Features</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {pkg.features.map((f: string) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div style={{ color: 'var(--color-primary)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                        <span className="text-body">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {pkg.promoLabels.length > 0 && (
                  <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-lg)' }}>
                    <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)', color: 'var(--color-primary-dark)' }}>Promo Labels</h3>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                      {pkg.promoLabels.map((label: string) => (
                        <Badge key={label} variant="primary" style={{ padding: '6px 12px', fontSize: '13px' }}>{label}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-5)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)' }}>
                  <h3 className="text-subsection-title">Metadata & Audit</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-2)' }}>
                    <span className="text-caption text-muted">Created By</span>
                    <span className="text-body-bold">{pkg.createdBy || 'System'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-2)' }}>
                    <span className="text-caption text-muted">Last Updated</span>
                    <span className="text-body-bold">{pkg.lastUpdatedBy || '-'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 'var(--space-2)' }}>
                    <span className="text-caption text-muted">Readiness Score</span>
                    <Badge variant={getStatusBadgeVariant(pkg.readinessScore || 'N/A')}>{pkg.readinessScore || 'N/A'}</Badge>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-caption text-muted">Current Version</span>
                    <span className="text-body-bold">v{pkg.version || '1.0'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
                <DollarSign size={20} />
              </div>
              <h3 className="text-subsection-title">Room Pricing & Comm</h3>
            </div>
            <div className="data-table-container" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
              <table className="data-table text-body" style={{ margin: 0 }}>
                <thead style={{ backgroundColor: 'var(--surface-sunken)' }}>
                  <tr>
                    <th style={{ padding: 'var(--space-3)' }}>Room Type</th>
                    <th style={{ padding: 'var(--space-3)' }}>Adult Price</th>
                    <th style={{ padding: 'var(--space-3)' }}>Child Price</th>
                    <th style={{ padding: 'var(--space-3)' }}>Child (w/o Bed)</th>
                    <th style={{ padding: 'var(--space-3)' }}>Infant Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.roomPrices.map((room: any, idx: number) => (
                    <tr key={idx} style={room.isDefault ? { backgroundColor: 'var(--color-primary-light)' } : { borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: 'var(--space-3)' }}><span className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>{room.type} {room.isDefault && <Badge variant={getStatusBadgeVariant("Default")} style={{ padding: '2px 6px', fontSize: '10px' }}>Default</Badge>}</span></td>
                      <td style={{ padding: 'var(--space-3)' }}><span className="text-body">{room.adult || '-'}</span></td>
                      <td style={{ padding: 'var(--space-3)' }}><span className="text-body">{room.child || '-'}</span></td>
                      <td style={{ padding: 'var(--space-3)' }}><span className="text-body">{room.childNoBed || '-'}</span></td>
                      <td style={{ padding: 'var(--space-3)' }}><span className="text-body">{room.infant || '-'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
              <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <span className="text-caption text-muted">Required Deposit</span>
                <span className="text-page-title" style={{ color: 'var(--color-primary)' }}>{pkg.depositAmount}</span>
              </div>
              <div style={{ padding: 'var(--space-5)', backgroundColor: 'var(--color-success-light)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <span className="text-caption" style={{ color: 'var(--color-success-dark)' }}>Agent Commission</span>
                <span className="text-page-title" style={{ color: 'var(--color-success-dark)' }}>{pkg.agentCommission}</span>
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
                  <Badge variant={getStatusBadgeVariant(sched.flightStatus)}>Flight: {sched.flightStatus || 'pending'}</Badge>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
                <ImageIcon size={20} />
              </div>
              <h3 className="text-subsection-title">Media & Assets</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <h4 className="text-body-bold">Thumbnail (Cover Image)</h4>
              <div style={{ width: '100%', maxWidth: '600px', height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--glass-shadow)', border: '1px solid var(--border-subtle)' }}>
                <img src={pkg.thumbnail} alt="Cover Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/images/makkah.jpg'; }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
              <h4 className="text-body-bold">Gallery Images</h4>
              {pkg.gallery && pkg.gallery.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
                  {pkg.gallery.map((img: string, idx: number) => (
                    <div key={idx} style={{ width: '100%', height: '200px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)', position: 'relative' }}>
                      <img src={img} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/images/makkah.jpg'; }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                  <ImageIcon size={32} className="text-muted" style={{ margin: '0 auto var(--space-3)' }} />
                  <span className="text-body text-muted">No gallery images uploaded for this package.</span>
                </div>
              )}
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
                    <Badge variant={getStatusBadgeVariant("Current Published")}>Current Published</Badge>
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
