import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { HeroHeader } from '../../components/layout/HeroHeader';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { Edit2, Copy, FileText, CheckCircle2, ChevronLeft, MapPin, ShieldCheck, Mail, BadgeCheck, Plane, Building, Calendar, Users, DollarSign, Download, Clock } from 'lucide-react';

interface TAPackageDetailsProps {
  navigate: (path: string, state?: any) => void;
  packageId?: string;
}

const initialPackages = [
  { id: 'PKG-001', name: 'Umrah Reguler 9 Hari', type: 'Umrah', duration: '9 Days', quota: '45/50', price: 'RM 7,890', status: 'active', agency: 'Al-Hijrah Travel' },
  { id: 'PKG-002', name: 'Umrah Plus Turki 12 Hari', type: 'Umrah Plus', duration: '12 Days', quota: '20/40', price: 'RM 10,500', status: 'active', agency: 'Al-Hijrah Travel' },
  { id: 'PKG-003', name: 'Haji Furoda 2026', type: 'Haji', duration: '25 Days', quota: '5/10', price: 'RM 75,000', status: 'draft', agency: 'Al-Hijrah Travel' },
  { id: 'PKG-004', name: 'Umrah Ramadhan Akhir', type: 'Umrah', duration: '15 Days', quota: '50/50', price: 'RM 12,000', status: 'inactive', agency: 'Al-Hijrah Travel' },
];

export const TAPackageDetails: React.FC<TAPackageDetailsProps> = ({ navigate, packageId = 'PKG-001' }) => {
  const { data: packageList } = useLocalStorageCrud<any>('package', initialPackages);
  const [activeTab, setActiveTab] = useState('overview');
  const [pkg, setPkg] = useState<any>(null);

  // Dynamically seed Al-Hijrah packages if storage was already populated by Admin panel packages
  useEffect(() => {
    const stored = localStorage.getItem('package');
    if (stored) {
      const list = JSON.parse(stored);
      const hasAlHijrah = list.some((p: any) => p.agency === 'Al-Hijrah Travel');
      if (!hasAlHijrah) {
        const seededList = [...initialPackages, ...list];
        localStorage.setItem('package', JSON.stringify(seededList));
        window.location.reload();
      }
    }
  }, []);

  useEffect(() => {
    const found = packageList.find(p => p.id === packageId);
    if (found) {
      setPkg(found);
    } else {
      // fallback to first package
      setPkg(packageList[0]);
    }
  }, [packageId, packageList]);

  if (!pkg) {
    return <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading package details...</div>;
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'pricing', label: 'Rooms & Pricing' },
    { id: 'media', label: 'Gallery & Media' },
    { id: 'audit', label: 'Activity Log' },
  ];

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'active' || s === 'published') return 'success';
    if (s === 'inactive' || s === 'unpublished') return 'warning';
    return 'neutral';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <HeroHeader
        title={pkg.name}
        onBack={() => navigate('ta-package-list')}
        backLabel="Back to Packages"
        theme="gradient"
        avatarComponent={
          <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', backgroundColor: 'white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white', flexShrink: 0 }}>
            <img src={pkg.thumbnailUrl || "https://picsum.photos/seed/details/150/150"} alt="Package Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        }
        badges={[
          <Badge key="1" variant={getStatusColor(pkg.status)}>{pkg.status.toUpperCase()}</Badge>,
          <Badge key="2" variant="primary">{pkg.type}</Badge>
        ]}
        subtitle={
          <>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><Calendar size={16} /> {pkg.departureDate || '15 Aug 2026'}</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
              <Building size={16} /> {pkg.makkahHotel === 'swiss' ? 'Swissotel Makkah' : 'Olayan Ajyad'}
            </span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
              <Plane size={16} /> {pkg.airline === 'mh' ? 'Malaysia Airlines (MH)' : 'Saudia (SV)'}
            </span>
          </>
        }
        actions={
          <>
            <Button variant="secondary" leftIcon={<Copy size={18} />}>Duplicate</Button>
            <Button variant="primary" leftIcon={<Edit2 size={18} />} onClick={() => navigate('ta-package-create', { id: pkg.id })}>Edit Package</Button>
          </>
        }
      />

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: 'var(--space-4) 0',
                borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Glass Card Content */}
      <div style={{ 
        backgroundColor: 'var(--surface-base)', 
        backdropFilter: 'var(--glass-blur)', 
        WebkitBackdropFilter: 'var(--glass-blur)', 
        boxShadow: 'var(--glass-shadow)', 
        borderRadius: 'var(--radius-card)', 
        border: 'none', 
        padding: 'var(--space-6)',
        minHeight: '400px'
      }}>
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Quick Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', border: 'var(--border-default)' }}>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: '4px' }}>Departure Date</span>
                <span className="text-body-bold" style={{ fontSize: '16px', color: 'var(--color-text-neutral)' }}>{pkg.departureDate || '15 Aug 2026'}</span>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', border: 'var(--border-default)' }}>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: '4px' }}>Base Price (Double)</span>
                <span className="text-body-bold" style={{ fontSize: '16px', color: 'var(--color-text-neutral)' }}>{pkg.price || 'RM 7,890'}</span>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', border: 'var(--border-default)' }}>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: '4px' }}>Duration Days</span>
                <span className="text-body-bold" style={{ fontSize: '16px', color: 'var(--color-text-neutral)' }}>{pkg.duration || '9 Days'}</span>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', border: 'var(--border-default)' }}>
                <span className="text-caption text-muted" style={{ display: 'block', marginBottom: '4px' }}>Booking Quota Tracker</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span className="text-body-bold" style={{ fontSize: '16px', color: 'var(--color-text-neutral)' }}>{pkg.quota || '45 / 50'}</span>
                  <Badge variant="warning" style={{ fontSize: '10px' }}>Almost Full</Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Package Overview</h3>
              <p className="text-body" style={{ color: 'var(--color-text-neutral)', lineHeight: 1.6, margin: 0 }}>
                {pkg.description || 'Experience an unforgettable spiritual journey with our Premium Safar VIP package. Enjoy 5-star accommodations right at the doorstep of the Haram, guided by experienced Mutawwifs.'}
              </p>
            </div>

            {/* Features & Inclusions List */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-5)' }}>
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Key Features Highlight</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(pkg.features || ['Mutawwif Guide', '24/7 Support']).map((feat: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-neutral)' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
                      <span className="text-body">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Inclusions Asset</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(pkg.inclusions || ['Flight Tickets', 'Hotel Stay', 'Visa Processing']).map((inc: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-neutral)' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--color-primary)' }} />
                      <span className="text-body">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ITINERARY */}
        {activeTab === 'itinerary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Itinerary Day-by-Day Planning</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', border: 'var(--border-default)' }}>
                <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: 'var(--space-2)' }}>Day 1: Departure &amp; Flight</span>
                <p className="text-body" style={{ margin: 0, color: 'var(--color-text-neutral)' }}>Gathering at KLIA Terminal 1. Flight check-in and luggage drop-off. Departure to King Abdulaziz Airport (Jeddah).</p>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', border: 'var(--border-default)' }}>
                <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: 'var(--space-2)' }}>Day 2: Arrival &amp; Umrah</span>
                <p className="text-body" style={{ margin: 0, color: 'var(--color-text-neutral)' }}>Arrival in Jeddah, immigration clearance, bus transit to Makkah. Hotel check-in, performance of first Umrah under guidance of Mutawwif.</p>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', border: 'var(--border-default)' }}>
                <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)', display: 'block', marginBottom: 'var(--space-2)' }}>Day 3: Holy Site Visit</span>
                <p className="text-body" style={{ margin: 0, color: 'var(--color-text-neutral)' }}>Morning prayers. Ziyarah to Jabal Thawr, Jabal Arafat, and Mina historical sites. Evening spiritual class at hotel.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRICING */}
        {activeTab === 'pricing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Room Pricing Configuration</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: 'var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--surface-sunken)', borderBottom: 'var(--border-default)' }}>
                    <th style={{ textAlign: 'left', padding: 'var(--space-3)', fontSize: '13px', color: 'var(--color-text-muted)' }}>Room Type</th>
                    <th style={{ textAlign: 'left', padding: 'var(--space-3)', fontSize: '13px', color: 'var(--color-text-muted)' }}>Adult Price</th>
                    <th style={{ textAlign: 'left', padding: 'var(--space-3)', fontSize: '13px', color: 'var(--color-text-muted)' }}>Child Price</th>
                    <th style={{ textAlign: 'left', padding: 'var(--space-3)', fontSize: '13px', color: 'var(--color-text-muted)' }}>Infant Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', fontWeight: 600 }}>Double Room (Default)</td>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', color: 'var(--color-text-neutral)' }}>{pkg.price || 'RM 7,890'}</td>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', color: 'var(--color-text-neutral)' }}>RM 6,000</td>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', color: 'var(--color-text-neutral)' }}>RM 2,500</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', fontWeight: 600 }}>Triple Room</td>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', color: 'var(--color-text-neutral)' }}>RM 7,290</td>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', color: 'var(--color-text-neutral)' }}>RM 5,500</td>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', color: 'var(--color-text-neutral)' }}>RM 2,500</td>
                  </tr>
                  <tr style={{ borderBottom: 'none' }}>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', fontWeight: 600 }}>Quad Room</td>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', color: 'var(--color-text-neutral)' }}>RM 6,890</td>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', color: 'var(--color-text-neutral)' }}>RM 5,200</td>
                    <td style={{ padding: 'var(--space-3)', fontSize: '14px', color: 'var(--color-text-neutral)' }}>RM 2,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Booking Deposit</h3>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-primary)' }}>
                  <span className="text-body-bold" style={{ fontSize: '15px', display: 'block' }}>Mandatory Booking Deposit: {pkg.depositAmount || 'RM 1,500'}</span>
                  <span className="text-caption" style={{ opacity: 0.85, marginTop: '2px', display: 'block' }}>Due immediately upon registration to secure airline seat allocation.</span>
                </div>
              </div>
              <div>
                <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Sales Agent Payout Commission</h3>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-lg)', border: 'var(--border-default)' }}>
                  <span className="text-body-bold" style={{ fontSize: '15px', color: 'var(--color-text-neutral)', display: 'block' }}>Commission Rate: {pkg.agentCommission || 'RM 500'}</span>
                  <span className="text-caption text-muted" style={{ marginTop: '2px', display: 'block' }}>Paid to affiliate sales agent per confirmed pilgrim reservation.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY & MEDIA */}
        {activeTab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Gallery Images</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
                <div style={{ height: '120px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: 'var(--border-default)' }}>
                  <img src={pkg.thumbnailUrl || "https://picsum.photos/seed/gal1/300/200"} alt="Gallery 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ height: '120px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: 'var(--border-default)' }}>
                  <img src="https://picsum.photos/seed/gal2/300/200" alt="Gallery 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ height: '120px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: 'var(--border-default)' }}>
                  <img src="https://picsum.photos/seed/gal3/300/200" alt="Gallery 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-4)' }}>
              <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-2)' }}>Brochures &amp; Documents</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: 'var(--border-default)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <FileText size={24} style={{ color: 'var(--color-primary)' }} />
                  <div>
                    <span className="text-body-bold" style={{ display: 'block' }}>Official Itinerary Brochure.pdf</span>
                    <span className="text-caption text-muted">2.4 MB • PDF Document</span>
                  </div>
                </div>
                <Button variant="secondary" size="sm" leftIcon={<Download size={14} />}>Download</Button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ACTIVITY LOG */}
        {activeTab === 'audit' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Version History &amp; Activity Log</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <div style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)', color: 'var(--color-success)', marginTop: '2px' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <span className="text-body-bold" style={{ display: 'block', fontSize: '13px' }}>Package Published</span>
                  <span className="text-caption text-muted" style={{ display: 'block', marginTop: '2px' }}>Changed status from draft to active. Reason: Initial configurations complete.</span>
                  <span className="text-caption text-muted" style={{ display: 'block', fontSize: '10px', marginTop: '2px' }}>By Ahmad Abdullah (Agency Owner) • 15 Jun 2026, 10:30 AM</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <div style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', marginTop: '2px' }}>
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-body-bold" style={{ display: 'block', fontSize: '13px' }}>Package Initialized</span>
                  <span className="text-caption text-muted" style={{ display: 'block', marginTop: '2px' }}>Created basic records. Assigned double/triple/quad room pricing.</span>
                  <span className="text-caption text-muted" style={{ display: 'block', fontSize: '10px', marginTop: '2px' }}>By Ahmad Abdullah (Agency Owner) • 12 Jun 2026, 09:15 AM</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
