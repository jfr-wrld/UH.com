import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Users, Plane, BedDouble, Bus, Map as MapIcon, ChevronDown, ChevronRight, Check } from 'lucide-react';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const GroupTripCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [creationSource, setCreationSource] = useState('manual_admin');
  const [name, setName] = useState('');
  const [dates, setDates] = useState('');
  const [seats, setSeats] = useState(45);
  const { create } = useLocalStorageCrud('group-trip');

  const handleSave = () => {
    create({
      code: `TRP-${Math.floor(Math.random() * 10000)}`,
      name: name || 'New Group Trip',
      package: 'Custom Package',
      agency: 'Zamzam Travels',
      mutawwif: 'Unassigned',
      dates: dates || 'TBD',
      seats: seats,
      booked: 0,
      status: 'Upcoming'
    });
    if(showToast) showToast('Success', 'Group Trip created successfully', 'success');
    navigate('group-trip-list');
  };

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    details: true,
    flight: false,
    hotel: false,
    transport: false,
    itinerary: false
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
        title="Create Group Trip"
        breadcrumbs={[{ label: 'Home' }, { label: 'Group Trips', onClick: () => navigate('group-trip-list') }, { label: 'Create' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('group-trip-list')}>Cancel</Button>
            <Button variant="secondary" onClick={() => navigate('group-trip-list')}>Save as Draft</Button>
            <Button onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success');  navigate('group-trip-list'); }}>Create & Activate Trip</Button>
          </div>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        
        {/* Section 1: Core Details */}
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', overflow: 'hidden' }}>
          <SectionHeader id="details" title="1. Group Trip Details" icon={Users} isComplete={true} />
          {openSections.details && (
            <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Group Trip Image">
                  <div style={{ border: '1px dashed var(--border-default)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}>
                    <Button variant="secondary" size="sm">Upload Image</Button>
                    <p className="text-caption text-muted" style={{ marginTop: 'var(--space-2)' }}>JPG, PNG, WebP (Max 2MB)</p>
                  </div>
                </FormField>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <FormField label="Creation Source" required>
                  <Select 
                    options={[
                      {value: 'manual_admin', label: 'Manual by Admin Request'},
                      {value: 'manual_agency', label: 'Manual by Travel Agency'},
                      {value: 'from_package', label: 'Spawned From Package'}
                    ]} 
                    value={creationSource} 
                    onChange={setCreationSource} 
                  />
                </FormField>
                {creationSource === 'manual_admin' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <FormField label="Request Source" required>
                      <Select options={[{value: 'email', label: 'Email'}, {value: 'whatsapp', label: 'WhatsApp'}, {value: 'ticket', label: 'Ticket'}]} value="email" onChange={() => {}} />
                    </FormField>
                    <FormField label="Travel Agency PIC" required>
                      <Input placeholder="Approving PIC Name" />
                    </FormField>
                  </div>
                )}
              </div>
              {creationSource === 'manual_admin' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)', padding: '0 var(--space-4)' }}>
                  <FormField label="Agency Approval Reference" required>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Input placeholder="Ticket ID or note..." />
                      <Button variant="secondary" size="sm">Attach Evidence</Button>
                    </div>
                  </FormField>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Travel Agency" required>
                  <Select options={[{value: 'zamzam', label: 'Zamzam Travels'}]} value="zamzam" onChange={() => {}} />
                </FormField>
                <FormField label="Package Reference" required={creationSource === 'from_package'}>
                  <Select options={[{value: 'none', label: 'None'}, {value: 'pkg1', label: 'Premium Umrah 2026'}]} value={creationSource === 'from_package' ? 'pkg1' : 'none'} onChange={() => {}} disabled={creationSource !== 'from_package'} />
                </FormField>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Season Type">
                  <Select options={[{value: 'winter', label: 'Winter'}, {value: 'ramadhan', label: 'Ramadhan'}]} value="winter" onChange={() => {}} />
                </FormField>
                <FormField label="Season Period">
                  <Select options={[{value: 'p1', label: 'Dec 2026 - Feb 2027'}]} value="p1" onChange={() => {}} />
                </FormField>
                <FormField label="Season Override Reason">
                  <Input placeholder="Reason if manually changed..." />
                </FormField>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Trip Code" required><Input placeholder="Auto-generated" disabled /></FormField>
                <FormField label="Group Trip Name" required><Input placeholder="e.g. Premium Safar Umrah" value={name} onChange={e => setName(e.target.value)} /></FormField>
                <FormField label="Trip Type" required>
                  <Select options={[{value: 'umrah', label: 'Umrah'}, {value: 'hajj', label: 'Hajj'}, {value: 'custom', label: 'Custom'}]} value="umrah" onChange={() => {}} />
                </FormField>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Departure Date" required><Input type="date" value={dates} onChange={e => setDates(e.target.value)} /></FormField>
                <FormField label="Return Date" required><Input type="date" /></FormField>
                <FormField label="Duration" required><Input placeholder="e.g. 11 Days 10 Nights" disabled /></FormField>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Departure City"><Select options={[{value: 'kul', label: 'Kuala Lumpur'}, {value: 'cgk', label: 'Jakarta'}]} value="kul" onChange={() => {}} /></FormField>
                <FormField label="Destination Type" required>
                  <Select options={[{value: 'makkah_madinah', label: 'Makkah + Madinah'}, {value: 'makkah', label: 'Makkah Only'}]} value="makkah_madinah" onChange={() => {}} />
                </FormField>
                <FormField label="Mutawwif"><Select options={[{value: 'm1', label: 'Ustaz Ahmad'}]} value="m1" onChange={() => {}} /></FormField>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Member Capacity" required><Input type="number" value={seats} onChange={e => setSeats(Number(e.target.value))} /></FormField>
                <FormField label="WhatsApp Group Link"><Input placeholder="https://chat.whatsapp.com/..." /></FormField>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Status" required>
                  <Select options={[{value: 'draft', label: 'Draft'}, {value: 'pending', label: 'Pending Travel Agency Approval'}, {value: 'active', label: 'Active'}]} value="draft" onChange={() => {}} />
                </FormField>
                <FormField label="Internal Notes">
                  <textarea className="input-base" placeholder="Optional admin notes..." rows={3} style={{ width: '100%', resize: 'vertical' }} />
                </FormField>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Flight */}
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', overflow: 'hidden' }}>
          <SectionHeader id="flight" title="2. Flight Details Snapshot" icon={Plane} />
          {openSections.flight && (
            <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
              <p className="text-body text-muted">Select a flight from the master catalog. A snapshot will be saved for this trip.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Outbound Airline"><Select options={[{value: 'sv', label: 'Saudi Airlines (SV)'}]} value="sv" onChange={() => {}} /></FormField>
                <FormField label="Outbound Flight Number"><Input placeholder="e.g. SV 821" /></FormField>
                <FormField label="Departure Airport"><Input defaultValue="KUL" /></FormField>
                <FormField label="Arrival Airport"><Input defaultValue="JED" /></FormField>
                <FormField label="Departure Date"><Input type="date" /></FormField>
                <FormField label="Departure Time"><Input type="time" /></FormField>
                <FormField label="Arrival Date"><Input type="date" /></FormField>
                <FormField label="Arrival Time"><Input type="time" /></FormField>
                <FormField label="Flight Class">
                  <Select options={[{value: 'economy', label: 'Economy'}, {value: 'business', label: 'Business'}]} value="economy" onChange={() => {}} />
                </FormField>
              </div>

              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', marginBottom: 'var(--space-4)' }}>
                  <input type="checkbox" />
                  <span className="text-body-bold">Add Transit / Connecting Flight</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Transit Airport"><Input placeholder="e.g. DXB" disabled /></FormField>
                  <FormField label="Transit Duration"><Input placeholder="e.g. 2h 30m" disabled /></FormField>
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Return Airline"><Select options={[{value: 'sv', label: 'Saudi Airlines (SV)'}]} value="sv" onChange={() => {}} /></FormField>
                <FormField label="Return Flight Number"><Input placeholder="e.g. SV 822" /></FormField>
                <FormField label="Departure Airport"><Input defaultValue="JED" /></FormField>
                <FormField label="Arrival Airport"><Input defaultValue="KUL" /></FormField>
                <FormField label="Departure Date"><Input type="date" /></FormField>
                <FormField label="Departure Time"><Input type="time" /></FormField>
                <FormField label="Arrival Date"><Input type="date" /></FormField>
                <FormField label="Arrival Time"><Input type="time" /></FormField>
                <FormField label="Flight Class">
                  <Select options={[{value: 'economy', label: 'Economy'}, {value: 'business', label: 'Business'}]} value="economy" onChange={() => {}} />
                </FormField>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Flight Notes">
                  <textarea className="input-base" placeholder="Customer or operational flight notes..." rows={2} style={{ width: '100%', resize: 'vertical' }} />
                </FormField>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Hotel */}
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', overflow: 'hidden' }}>
          <SectionHeader id="hotel" title="3. Accommodation / Hotel Assignment" icon={BedDouble} />
          {openSections.hotel && (
            <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
              <p className="text-body text-muted">Select active hotels. The actual rooming lists will be managed in the Members &gt; Services tab.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Makkah Hotel"><Select options={[{value: 'h1', label: 'Swissotel Makkah'}]} value="h1" onChange={() => {}} /></FormField>
                <FormField label="Check-in Date"><Input type="date" /></FormField>
                <FormField label="Check-out Date"><Input type="date" /></FormField>
                <FormField label="Makkah Default Meal Plan"><Select options={[{value: 'fb', label: 'Full Board'}]} value="fb" onChange={() => {}} /></FormField>
                <FormField label="Makkah Room Default"><Select options={[{value: 'quad', label: 'Quad'}, {value: 'triple', label: 'Triple'}]} value="quad" onChange={() => {}} /></FormField>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Madinah Hotel"><Select options={[{value: 'h2', label: 'Pullman Zamzam Madinah'}]} value="h2" onChange={() => {}} /></FormField>
                <FormField label="Check-in Date"><Input type="date" /></FormField>
                <FormField label="Check-out Date"><Input type="date" /></FormField>
                <FormField label="Madinah Default Meal Plan"><Select options={[{value: 'fb', label: 'Full Board'}]} value="fb" onChange={() => {}} /></FormField>
                <FormField label="Madinah Room Default"><Select options={[{value: 'quad', label: 'Quad'}, {value: 'triple', label: 'Triple'}]} value="quad" onChange={() => {}} /></FormField>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Other Hotel"><Select options={[{value: 'none', label: 'None'}, {value: 'h3', label: 'Jeddah Transit Hotel'}]} value="none" onChange={() => {}} /></FormField>
                <FormField label="Check-in Date"><Input type="date" disabled /></FormField>
                <FormField label="Check-out Date"><Input type="date" disabled /></FormField>
                <FormField label="Room Default"><Select options={[{value: 'quad', label: 'Quad'}]} value="quad" onChange={() => {}} disabled /></FormField>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Hotel Notes">
                  <textarea className="input-base" placeholder="Additional requirements..." rows={2} style={{ width: '100%', resize: 'vertical' }} />
                </FormField>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Transport */}
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', overflow: 'hidden' }}>
          <SectionHeader id="transport" title="4. Ground Transportation" icon={Bus} />
          {openSections.transport && (
            <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Makkah Transport"><Select options={[{value: 'bus', label: 'Private Coach'}]} value="bus" onChange={() => {}} /></FormField>
                <FormField label="Madinah Transport"><Select options={[{value: 'bus', label: 'Private Coach'}]} value="bus" onChange={() => {}} /></FormField>
                <FormField label="Inter-city Transport"><Select options={[{value: 'train', label: 'Haramain Train'}]} value="train" onChange={() => {}} /></FormField>
                <FormField label="Airport Transfer"><Select options={[{value: 'included', label: 'Included'}]} value="included" onChange={() => {}} /></FormField>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <FormField label="Transport Vendor">
                  <Input placeholder="Vendor name" />
                </FormField>
                <FormField label="Transport Notes">
                  <textarea className="input-base" placeholder="Operational instructions..." rows={2} style={{ width: '100%', resize: 'vertical' }} />
                </FormField>
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Itinerary */}
        <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', overflow: 'hidden' }}>
          <SectionHeader id="itinerary" title="5. Itinerary Snapshot" icon={MapIcon} />
          {openSections.itinerary && (
            <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
              <p className="text-body text-muted">Select an itinerary template. It will be copied into an operational snapshot tied to the exact trip dates.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', alignItems: 'end' }}>
                <FormField label="Itinerary Template">
                  <Select options={[{value: 'tmpl', label: 'Standard 11 Days Umrah'}]} value="tmpl" onChange={() => {}} />
                </FormField>
                <Button variant="secondary">Generate Dated Itinerary</Button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked />
                    <span className="text-body-bold">Auto-generate Dates</span>
                  </label>
                </div>
                <FormField label="Local Timezone">
                  <Select options={[{value: 'my', label: 'Malaysia (GMT+8)'}]} value="my" onChange={() => {}} />
                </FormField>
                <FormField label="Destination Timezone">
                  <Select options={[{value: 'sa', label: 'Saudi Arabia (GMT+3)'}]} value="sa" onChange={() => {}} />
                </FormField>
              </div>
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-warning-light)', borderRadius: 'var(--radius-md)', color: 'var(--color-warning-dark)' }}>
                <span className="text-caption-bold">Note:</span> Generating the itinerary will lock the template reference and create trip-specific daily schedules.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
