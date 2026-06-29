import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Stepper } from '../../components/navigation/Stepper';
import { Plus, Trash2, MapPin, BedDouble, Wifi, Image as ImageIcon, Edit } from 'lucide-react';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const HotelAdd: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState('0');
  const [rooms, setRooms] = useState('0');
  const [distance, setDistance] = useState('0');

  const { create } = useLocalStorageCrud<any>('hotel');

  const steps = [
    { id: '1', label: 'Basic Info', description: 'Name & rating' },
    { id: '2', label: 'Location', description: 'Address & distance' },
    { id: '3', label: 'Rooms', description: 'Room types' },
    { id: '4', label: 'Amenities', description: 'Facilities' },
    { id: '5', label: 'Media', description: 'Gallery' },
    { id: '6', label: 'Status', description: 'Visibility' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleSave = () => {
    create({
      name: name || 'New Hotel',
      city: city || 'Makkah',
      rating: parseInt(rating) || 0,
      distance: parseInt(distance) || 0,
      rooms: parseInt(rooms) || 0,
      status: 'Active',
      lastUpdated: new Date().toISOString().split('T')[0]
    });
    if(showToast) showToast('Success', 'Hotel published successfully', 'success');
    navigate('hotel-list');
  };

  const handleFillExample = () => {
    setName('Swissotel Makkah');
    setCity('makkah');
    setRating('5');
    setRooms('1400');
    setDistance('100');
  };

  const [roomTypes, setRoomTypes] = useState<any[]>([
    { id: 'rt_1', name: 'Double Room', occupancy: 2, bed: '1 King Bed', size: '32', bathroom: 'private', notes: '' },
    { id: 'rt_2', name: 'Triple Room', occupancy: 3, bed: '3 Single Beds', size: '40', bathroom: 'private', notes: '' }
  ]);

  const addRoomType = () => {
    setRoomTypes([...roomTypes, { id: `rt_${Date.now()}`, name: '', occupancy: 1, bed: '', size: '', bathroom: 'private', notes: '' }]);
  };

  const renderBasicInfo = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
      <FormField label="Hotel Name" required>
        <Input placeholder="e.g. Swissotel Makkah" value={name} onChange={e => setName(e.target.value)} />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="Hotel Chain / Brand">
          <Input placeholder="e.g. Accor, Hilton" />
        </FormField>
        <FormField label="Total Rooms">
          <Input type="number" placeholder="e.g. 500" value={rooms} onChange={e => setRooms(e.target.value)} />
        </FormField>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="Star Rating" required>
          <Select options={[{value: '5', label: '5 Star'}, {value: '4', label: '4 Star'}, {value: '3', label: '3 Star'}, {value: 'unrated', label: 'Unrated'}]} value={rating} onChange={setRating} placeholder="Select rating" />
        </FormField>
        <FormField label="Customer Rating">
          <Input type="number" step="0.1" max="5" min="0" placeholder="0.0 - 5.0" />
        </FormField>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="City" required>
          <Select options={[{value: 'makkah', label: 'Makkah'}, {value: 'madinah', label: 'Madinah'}]} value={city} onChange={setCity} placeholder="Select city" />
        </FormField>
        <FormField label="Country" required>
          <Select options={[{value: 'sa', label: 'Saudi Arabia'}]} value="sa" onChange={() => {}} />
        </FormField>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="Short Description">
          <textarea 
            className="input-field" 
            rows={3} 
            placeholder="Customer-facing description of the hotel..."
            style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-input)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', boxShadow: 'var(--glass-shadow)' }}
          />
        </FormField>
        <FormField label="Internal Notes">
          <textarea 
            className="input-field" 
            rows={3} 
            placeholder="Admin-only notes..."
            style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-input)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', boxShadow: 'var(--glass-shadow)' }}
          />
        </FormField>
      </div>
    </div>
  );

  const renderLocation = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
      <FormField label="Address Line" required>
        <Input placeholder="Full street address" />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="District / Area">
          <Input placeholder="e.g. Ajyad, Misfalah" />
        </FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
          <FormField label="Latitude">
            <Input type="number" step="0.000001" placeholder="21.422487" />
          </FormField>
          <FormField label="Longitude">
            <Input type="number" step="0.000001" placeholder="39.826206" />
          </FormField>
        </div>
      </div>
      
      <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <h3 className="text-body-bold">Distance to Main Landmark</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Main Landmark" required>
            <Select options={[{value: 'haram', label: 'Masjid al-Haram'}, {value: 'nabawi', label: 'Masjid an-Nabawi'}]} value="haram" onChange={() => {}} />
          </FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 'var(--space-2)' }}>
            <FormField label="Distance Value" required>
              <Input type="number" placeholder="e.g. 100" value={distance} onChange={e => setDistance(e.target.value)} />
            </FormField>
            <FormField label="Unit" required>
              <Select options={[{value: 'm', label: 'm'}, {value: 'km', label: 'km'}]} value="m" onChange={() => {}} />
            </FormField>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Distance Mode" required>
            <Select options={[{value: 'walking', label: 'Walking'}, {value: 'shuttle', label: 'Shuttle'}, {value: 'driving', label: 'Driving'}]} value="walking" onChange={() => {}} />
          </FormField>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', paddingBottom: 'var(--space-2)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                <span className="text-body">Shuttle Available</span>
              </label>
            </div>
          </div>
        </div>
        <FormField label="Shuttle Notes">
          <Input placeholder="Schedule / frequency if known..." />
        </FormField>
      </div>
    </div>
  );

  const renderRooms = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>Add reference room types that travel agencies can choose from when including this hotel in a package.</p>
      {roomTypes.map((rt, idx) => (
        <div key={rt.id} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-3)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="text-body-bold">Room Option {idx + 1}</span>
            <button onClick={() => setRoomTypes(roomTypes.filter(r => r.id !== rt.id))} style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}>
              <Trash2 size={16} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: 'var(--space-3)' }}>
            <FormField label="Room Type Name">
              <Input value={rt.name} placeholder="e.g. Quad Room" onChange={() => {}} />
            </FormField>
            <FormField label="Max Occupancy">
              <Input type="number" value={rt.occupancy} onChange={() => {}} />
            </FormField>
            <FormField label="Bed Configuration">
              <Input value={rt.bed} placeholder="e.g. 2 Single Beds" onChange={() => {}} />
            </FormField>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 'var(--space-3)' }}>
            <FormField label="Room Size (sqm)">
              <Input type="number" value={rt.size} onChange={() => {}} />
            </FormField>
            <FormField label="Bathroom Type">
              <Select options={[{value:'private', label:'Private'}, {value:'shared', label:'Shared'}]} value={rt.bathroom} onChange={() => {}} />
            </FormField>
            <FormField label="Notes">
              <Input value={rt.notes} placeholder="Optional room notes..." onChange={() => {}} />
            </FormField>
          </div>
        </div>
      ))}
      <Button variant="secondary" size="sm" leftIcon={<Plus size={16} />} onClick={addRoomType} style={{ width: 'fit-content', marginTop: 'var(--space-2)' }}>
        Add Room Type
      </Button>
    </div>
  );

  const renderAmenities = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h3 className="text-body-bold">General & Transport</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Free Wi-Fi</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Elevator</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}><input type="checkbox" /> Airport Transfer</label>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <h3 className="text-body-bold">Food & Worship</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}><input type="checkbox" defaultChecked /> Restaurant</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}><input type="checkbox" /> Prayer Room</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}><input type="checkbox" /> Haram View</label>
      </div>
    </div>
  );

  const renderGallery = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <p className="text-body text-muted">Upload a primary thumbnail and up to 20 gallery images. Max 1MB per image.</p>
      <div style={{ border: '2px dashed var(--border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-8)', textAlign: 'center', backgroundColor: 'var(--surface-sunken)' }}>
        <ImageIcon size={32} className="text-muted" style={{ margin: '0 auto var(--space-3)' }} />
        <p className="text-body-bold">Drag and drop images here</p>
        <p className="text-caption text-muted" style={{ marginBottom: 'var(--space-4)' }}>or click to browse from your computer</p>
        <Button variant="secondary" size="sm">Select Files</Button>
      </div>
    </div>
  );

  const renderStatusAndVisibility = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="Status" required>
          <Select options={[{value: 'draft', label: 'Draft'}, {value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}]} value="draft" onChange={() => {}} />
        </FormField>
        <FormField label="Owner Scope" required>
          <Select options={[{value: 'global', label: 'Global Template'}, {value: 'agency', label: 'Travel Agency'}]} value="global" onChange={() => {}} />
        </FormField>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <FormField label="Owner Agency" helperText="Required if Owner Scope is Travel Agency">
          <Select options={[{value: '', label: 'Select Agency'}, {value: 'a1', label: 'Travel Agency A'}]} value="" onChange={() => {}} disabled />
        </FormField>
        <FormField label="Visibility" required>
          <Select options={[{value: 'available', label: 'Available for Package'}, {value: 'internal', label: 'Internal'}, {value: 'hidden', label: 'Hidden'}]} value="available" onChange={() => {}} />
        </FormField>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
          <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
          <div>
            <span className="text-body-bold" style={{ display: 'block' }}>Available for Package</span>
            <span className="text-caption text-muted">Allow this hotel to be selected by Travel Agencies.</span>
          </div>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
          <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
          <div>
            <span className="text-body-bold" style={{ display: 'block' }}>Customer Visible</span>
            <span className="text-caption text-muted">Show hotel details in package preview to customers.</span>
          </div>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
          <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
          <div>
            <span className="text-body-bold" style={{ display: 'block' }}>Data Verified</span>
            <span className="text-caption text-muted">Internal marker indicating the hotel data is accurate and complete.</span>
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title="Add Hotel to Catalog"
        breadcrumbs={[{ label: 'Home' }, { label: 'Hotels', onClick: () => navigate('hotel-list') }, { label: 'Add Hotel' }]}
        actions={
          <Button variant="outline" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={handleStepClick} />

        <div style={{ marginTop: 'var(--space-8)' }}>
          {currentStep === 0 && renderBasicInfo()}
          {currentStep === 1 && renderLocation()}
          {currentStep === 2 && renderRooms()}
          {currentStep === 3 && renderAmenities()}
          {currentStep === 4 && renderGallery()}
          {currentStep === 5 && renderStatusAndVisibility()}
        </div>
      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <Button 
          variant="outline" 
          disabled={currentStep === 0}
          onClick={handlePrev}
        >
          Previous
        </Button>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="ghost" onClick={() => navigate('hotel-list')}>Cancel</Button>
          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSave}>Publish Hotel</Button>
          ) : (
            <Button onClick={handleNext}>Next Step</Button>
          )}
        </div>
      </div>
    </div>
  );
};
