import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { MapPin, Star, BedDouble, Wifi, Image as ImageIcon, Package, Users, Eye, ChevronRight } from 'lucide-react';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { useDataFilter } from '../../hooks/useDataFilter';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const HotelDetails: React.FC<{ navigate: (route: string, data?: any) => void, hotelId?: string }> = ({ navigate, hotelId = 'ht_1' }) => {
  const [status, setStatus] = useState('Active');
  const [activeTab, setActiveTab] = useState('overview');
  const { getById } = useLocalStorageCrud<any>('hotel');

  // Mock Data
  const htData = getById(hotelId) || {
    id: hotelId,
    name: 'Unknown Hotel',
    city: '-',
    rating: 0,
    distance: 0,
    rooms: 0,
    status: status,
    lastUpdated: '-'
  };

  const hotel = {
    ...htData,
    chain: 'Accor',
    country: 'Saudi Arabia',
    address: 'King Abdul Aziz Endowment, Abraj Al Bait Complex',
    landmark: 'Masjid al-Haram',
    distanceMode: 'Walking',
    visibility: 'Available for Package',
    customerVisible: 'Yes',
    dataVerified: 'Yes',
    description: 'As part of the prestigious Abraj Al Bait complex, the deluxe Swissotel Makkah is a contemporary five-star hotel located in close proximity to the holy Masjid Al Haraam.',
    thumbnail: 'https://picsum.photos/seed/273/600/400',
    createdBy: 'System Admin',
    roomTypesCount: 3,
    galleryCount: 12,
    latitude: 21.422487,
    longitude: 39.826206,
    shuttleNotes: 'Shuttle runs every 30 minutes from lobby to Haram.'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
    { id: 'location', label: 'Location' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'usage', label: 'Usage' },
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
      {/* Back Button */}
      <div style={{ marginBottom: '-16px' }}>
        <button 
          onClick={() => navigate('hotel-list')}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'none', border: 'none', color: 'var(--color-text-neutral)', cursor: 'pointer', padding: 0, fontWeight: 500 }}
          className="text-body"
        >
          <ChevronRight style={{ transform: 'rotate(180deg)' }} size={16} /> Back to Hotels
        </button>
      </div>

      {/* Hero Header Section */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '280px', 
        borderRadius: 'var(--radius-lg)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'var(--space-6)',
        boxShadow: 'var(--glass-shadow)',
        marginTop: 'var(--space-2)'
      }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <img src={hotel.thumbnail} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {/* Dark Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, borderRadius: 'var(--radius-lg)', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)' }} />
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: 'white' }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                <Star size={16} fill="var(--color-warning)" color="var(--color-warning)" />
                <span className="text-body-bold">{hotel.rating} Star</span>
              </div>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>{hotel.name}</h1>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', opacity: 0.9, marginTop: 'var(--space-1)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>{hotel.city}, {hotel.country}</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>{hotel.visibility}</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>{hotel.distance}m to {hotel.landmark}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            <StatusTransitionMenu currentStatus={status} onTransition={setStatus} allowedTransitions={['Draft', 'Active', 'Inactive', 'Archived']} />
            <Button>Edit Hotel</Button>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Hotel Profile</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Chain / Brand</span>
                  <span className="text-body">{hotel.chain}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Location</span>
                  <span className="text-body">{hotel.city}</span>
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Description</span>
                <p className="text-body" style={{ lineHeight: '1.5' }}>{hotel.description}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Availability Settings</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Owner Scope</span>
                  <span className="text-body">Global Template</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Visibility</span>
                  <span className="text-body">{hotel.visibility}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Customer Visible</span>
                  <span className="text-body">{hotel.customerVisible}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Data Verified</span>
                  <span className="text-body">{hotel.dataVerified}</span>
                </div>
              </div>
              
              <h3 className="text-subsection-title" style={{ marginTop: 'var(--space-2)' }}>Catalog Metadata</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Created By</span>
                  <span className="text-body">{hotel.createdBy}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Last Updated</span>
                  <span className="text-body">{hotel.lastUpdated}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Total Room Types</span>
                  <span className="text-body">{hotel.roomTypesCount}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Total Gallery Images</span>
                  <span className="text-body">{hotel.galleryCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <MapPin className="text-primary" size={20} />
                <h3 className="text-subsection-title">Address & Coordinates</h3>
              </div>
              <p className="text-body">{hotel.address}</p>
              <p className="text-body text-muted">{hotel.city}, {hotel.country}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Latitude</span>
                  <span className="text-body">{hotel.latitude}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Longitude</span>
                  <span className="text-body">{hotel.longitude}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Distances</h3>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="text-body-bold">{hotel.landmark}</span>
                  <Badge variant={getStatusBadgeVariant(hotel.distanceMode)}>{hotel.distanceMode}</Badge>
                </div>
                <span className="text-body text-muted">{hotel.distance}</span>
                {hotel.shuttleNotes && (
                  <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-default)' }}>
                    <span className="text-caption text-muted" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Shuttle Notes</span>
                    <span className="text-body">{hotel.shuttleNotes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <BedDouble className="text-primary" size={20} />
              <h3 className="text-subsection-title">Room Types Reference</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Double Room</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Max Occupancy</span><span className="text-caption-bold">2</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Bed</span><span className="text-caption-bold">1 King Bed</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Size</span><span className="text-caption-bold">32 sqm</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Bathroom</span><span className="text-caption-bold">Private</span></div>
                </div>
              </div>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Triple Room</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Max Occupancy</span><span className="text-caption-bold">3</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Bed</span><span className="text-caption-bold">3 Single Beds</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Size</span><span className="text-caption-bold">40 sqm</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Bathroom</span><span className="text-caption-bold">Private</span></div>
                </div>
              </div>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-3)' }}>Quad Room</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Max Occupancy</span><span className="text-caption-bold">4</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Bed</span><span className="text-caption-bold">4 Single Beds</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Size</span><span className="text-caption-bold">50 sqm</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="text-caption text-muted">Bathroom</span><span className="text-caption-bold">Private</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'amenities' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Wifi className="text-primary" size={20} />
              <h3 className="text-subsection-title">Amenities & Facilities</h3>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <Badge variant={getStatusBadgeVariant("Free Wi-Fi")}>Free Wi-Fi</Badge>
              <Badge variant={getStatusBadgeVariant("Elevator")}>Elevator</Badge>
              <Badge variant={getStatusBadgeVariant("Restaurant")}>Restaurant</Badge>
              <Badge variant={getStatusBadgeVariant("Haram View")}>Haram View</Badge>
              <Badge variant={getStatusBadgeVariant("Wheelchair Accessible")}>Wheelchair Accessible</Badge>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <ImageIcon className="text-primary" size={20} />
              <h3 className="text-subsection-title">Gallery (15 Images)</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
              <div style={{ height: '150px', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <img src={hotel.thumbnail} alt="Primary" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Mocking additional images */}
              <div style={{ height: '150px', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon className="text-muted" />
              </div>
              <div style={{ height: '150px', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon className="text-muted" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <h3 className="text-subsection-title">Hotel Usage</h3>
            <p className="text-body text-muted">This hotel is currently included in the following active packages and group trips.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Package className="text-primary" />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="text-body-bold">Package: Premium Umrah Dec</span>
                    <span className="text-caption text-muted">Active • Referenced for Makkah segment</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View Package</Button>
              </div>

              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Users className="text-warning" />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="text-body-bold">Group Trip: TRP-1001 (Snapshot)</span>
                    <span className="text-caption text-muted">Upcoming • 10 Dec 2026</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View Trip</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '1 day ago', actor: 'Admin User', action: 'Published Hotel', module: 'Hotel', details: 'Status changed to Active' },
                { id: '2', timestamp: '2 days ago', actor: 'Admin User', action: 'Uploaded Gallery', module: 'Hotel', details: 'Added 5 images' },
                { id: '3', timestamp: '1 week ago', actor: 'Admin User', action: 'Created Hotel', module: 'Hotel', details: 'Draft created' }
              ]}
            />
          </div>
        )}

      </div>
    </div>
  );
};
