import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const FlightAdd: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [hasTransit, setHasTransit] = useState(false);
  const [airline, setAirline] = useState('');
  const [number, setNumber] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const { create } = useLocalStorageCrud('flight');

  const handleSave = () => {
    create({
      airline: airline || 'Unknown',
      logo: airline === 'sv' ? 'SV' : airline === 'mh' ? 'MH' : 'XX',
      number: number || 'XX000',
      route: `${origin || 'XXX'} → ${destination || 'YYY'}`,
      type: hasTransit ? 'Transit' : 'Direct',
      departure: '00:00',
      arrival: '00:00',
      duration: '0h',
      available: true,
      status: 'Active'
    });
    if(showToast) showToast('Success', 'Flight published successfully', 'success');
    navigate('flight-list');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Add Flight"
        breadcrumbs={[{ label: 'Home' }, { label: 'Flight Catalog', onClick: () => navigate('flight-list') }, { label: 'Add Flight' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('flight-list'); }}>Cancel</Button>
            <Button variant="secondary" onClick={() => navigate('flight-list')}>Save as Draft</Button>
            <Button onClick={handleSave}>Publish Flight</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 800px)', gap: 'var(--space-6)' }}>
        
        {/* Flight Info */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Flight Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Airline" required>
                <Select options={[{value: 'sv', label: 'Saudia Airlines'}, {value: 'mh', label: 'Malaysia Airlines'}]} placeholder="Select Airline" value={airline} onChange={setAirline} />
              </FormField>
              <FormField label="Flight Number" required helpText="Airline code + number (e.g. SV841)">
                <Input placeholder="Flight Number" value={number} onChange={e => setNumber(e.target.value)} />
              </FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Flight Direction">
                <Select options={[{value: 'outbound', label: 'Outbound'}, {value: 'return', label: 'Return'}, {value: 'transit', label: 'Transit'}]} placeholder="Select Direction" value="" onChange={() => {}} />
              </FormField>
              <FormField label="Service Type" required>
                <Select options={[{value: 'direct', label: 'Direct'}, {value: 'transit', label: 'Transit'}, {value: 'connecting', label: 'Connecting'}]} placeholder="Select Service" value="" onChange={() => {}} />
              </FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Flight Category">
                <Select options={[{value: 'international', label: 'International'}, {value: 'domestic', label: 'Domestic'}, {value: 'charter', label: 'Charter'}, {value: 'other', label: 'Other'}]} placeholder="Select Category" value="" onChange={() => {}} />
              </FormField>
              <FormField label="Aircraft Type">
                <Input placeholder="e.g. Boeing 777, Airbus A330" />
              </FormField>
            </div>
            <FormField label="Customer Visible Notes">
              <textarea 
                placeholder="Notes visible in the package preview" 
                style={{ width: '100%', minHeight: '80px', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: 'none', fontFamily: 'inherit', resize: 'vertical' }}
              />
            </FormField>
          </div>
        </section>

        {/* Route & Schedule */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Route & Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Origin Airport" required>
                <Select options={[{value: 'kul', label: 'KUL - Kuala Lumpur'}, {value: 'cgk', label: 'CGK - Jakarta'}]} placeholder="Select Origin" value={origin} onChange={setOrigin} />
              </FormField>
              <FormField label="Origin Terminal">
                <Input placeholder="e.g. Terminal 1" />
              </FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Destination Airport" required>
                <Select options={[{value: 'jed', label: 'JED - Jeddah'}, {value: 'med', label: 'MED - Medina'}]} placeholder="Select Destination" value={destination} onChange={setDestination} />
              </FormField>
              <FormField label="Destination Terminal">
                <Input placeholder="e.g. Terminal 1" />
              </FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Departure Time (Local)">
                <Input type="time" />
              </FormField>
              <FormField label="Arrival Time (Local)">
                <Input type="time" />
              </FormField>
              <FormField label="Estimated Duration">
                <Input placeholder="e.g. 8h 15m" />
              </FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Operating Days">
                <Select options={[{value: 'daily', label: 'Daily'}, {value: 'weekdays', label: 'Weekdays'}, {value: 'weekends', label: 'Weekends'}]} placeholder="Select Days" value="" onChange={() => {}} />
              </FormField>
              <FormField label="Valid From">
                <Input type="date" />
              </FormField>
              <FormField label="Valid Until">
                <Input type="date" />
              </FormField>
            </div>
          </div>
        </section>

        {/* Transit */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2 className="text-section-title">Transit Information</h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
              <input type="checkbox" checked={hasTransit} onChange={(e) => setHasTransit(e.target.checked)} style={{ width: '18px', height: '18px' }} />
              <span className="text-body-bold">Has Transit</span>
            </label>
          </div>
          {hasTransit ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Transit Airport" required>
                  <Select options={[{value: 'dxb', label: 'DXB - Dubai'}, {value: 'doh', label: 'DOH - Doha'}]} placeholder="Select Transit Airport" value="" onChange={() => {}} />
                </FormField>
                <FormField label="Layover Duration" required>
                  <Input placeholder="e.g. 2h 30m" />
                </FormField>
              </div>
              <FormField label="Transit Notes">
                <Input placeholder="e.g. Aircraft change, Same terminal" />
              </FormField>
            </div>
          ) : (
            <span className="text-body text-muted">Enable this option if the flight includes a transit or layover.</span>
          )}
        </section>

        {/* Baggage & Cabin */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Baggage & Cabin Reference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <FormField label="Cabin Class">
              <Select options={[{value: 'economy', label: 'Economy'}, {value: 'business', label: 'Business'}]} placeholder="Select Class" value="" onChange={() => {}} />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Checked Baggage">
                <Input placeholder="e.g. 30 kg" />
              </FormField>
              <FormField label="Cabin Baggage">
                <Input placeholder="e.g. 7 kg" />
              </FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Meal Included">
                <Select options={[{value: 'yes', label: 'Yes'}, {value: 'no', label: 'No'}, {value: 'unknown', label: 'Unknown'}]} placeholder="Select" value="" onChange={() => {}} />
              </FormField>
              <FormField label="Seat Selection">
                <Select options={[{value: 'included', label: 'Included'}, {value: 'paid', label: 'Paid'}, {value: 'unknown', label: 'Unknown'}]} placeholder="Select" value="" onChange={() => {}} />
              </FormField>
            </div>
            <FormField label="Baggage Notes">
              <Input placeholder="e.g. Varies by fare class" />
            </FormField>
          </div>
        </section>

        {/* Visibility */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Status & Visibility</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Owner Scope" required>
                <Select options={[{value: 'global', label: 'Global'}, {value: 'agency', label: 'Travel Agency'}]} value="global" onChange={() => {}} />
              </FormField>
              <FormField label="Status" required>
                <Select options={[{value: 'draft', label: 'Draft'}, {value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}]} value="draft" onChange={() => {}} />
              </FormField>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <div>
                <span className="text-body-bold" style={{ display: 'block' }}>Available for Package</span>
                <span className="text-caption text-muted">Allow this flight to be selected by Travel Agencies.</span>
              </div>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <div>
                <span className="text-body-bold" style={{ display: 'block' }}>Customer Visible</span>
                <span className="text-caption text-muted">Show flight details in package preview to customers.</span>
              </div>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <div>
                <span className="text-body-bold" style={{ display: 'block' }}>Data Verified</span>
                <span className="text-caption text-muted">Mark this catalog data as verified by operations.</span>
              </div>
            </label>
          </div>
        </section>

      </div>
    </div>
  );
};
