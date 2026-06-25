import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Users, Plane, BedDouble, Bus, Map as MapIcon, ChevronLeft, ChevronRight, Check, Wand2 } from 'lucide-react';
import { Stepper } from '../../components/navigation/Stepper';
import { FileUploader } from '../../components/inputs/FileUploader';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const GroupTripCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [creationSource, setCreationSource] = useState('manual_admin');
  const [name, setName] = useState('');
  const [dates, setDates] = useState('');
  const [seats, setSeats] = useState(45);
  
  const { create } = useLocalStorageCrud<any>('group-trip-v2');

  const steps = [
    { id: '1', label: 'Trip Details' },
    { id: '2', label: 'Flight Snapshot' },
    { id: '3', label: 'Hotel Assignment' },
    { id: '4', label: 'Transportation' },
    { id: '5', label: 'Itinerary Snapshot' }
  ];

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSave();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

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

  const fillExampleData = () => {
    setCreationSource('from_package');
    setName('Premium Safar Umrah (Winter 2026)');
    setDates('2026-12-15');
    setSeats(45);
    if(showToast) showToast('Example Data Loaded', 'Fields have been populated automatically.', 'info');
  };

  const renderCoreDetails = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      
      {/* Section: General Information */}
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>General Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <FormField label="Group Trip Image">
              <FileUploader accept=".jpg,.png,.webp" maxSizeMB={2} id="trip-image-upload" />
            </FormField>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Trip Code" required><Input placeholder="Auto-generated" disabled /></FormField>
            <FormField label="Group Trip Name" required><Input placeholder="e.g. Premium Safar Umrah" value={name} onChange={e => setName(e.target.value)} /></FormField>
            <FormField label="Trip Type" required>
              <Select options={[{value: 'umrah', label: 'Umrah'}, {value: 'hajj', label: 'Hajj'}, {value: 'custom', label: 'Custom'}, {value: 'ziyarah', label: 'Ziyarah'}, {value: 'other', label: 'Other'}]} value="umrah" onChange={() => {}} />
            </FormField>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Travel Agency" required>
              <Select options={[{value: 'zamzam', label: 'Zamzam Travels'}]} value="zamzam" onChange={() => {}} />
            </FormField>
            <FormField label="Package Reference" required={creationSource === 'from_package'}>
              <Select options={[{value: 'none', label: 'None'}, {value: 'pkg1', label: 'Premium Umrah 2026'}]} value={creationSource === 'from_package' ? 'pkg1' : 'none'} onChange={() => {}} disabled={creationSource !== 'from_package'} />
            </FormField>
          </div>
        </div>
      </section>

      {/* Section: Origin & Approvals */}
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Origin & Approvals</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
              <FormField label="Agency Approval Reference" required>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <Input placeholder="Ticket ID or approval note..." />
                  </div>
                  <div style={{ flex: 1 }}>
                    <FileUploader accept=".pdf,.jpg,.png,.docx" maxSizeMB={2} id="approval-evidence" />
                  </div>
                </div>
              </FormField>
            </div>
          )}
        </div>
      </section>

      {/* Section: Schedule & Logistics */}
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Schedule & Logistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
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
            <FormField label="Departure Date" required><Input type="date" value={dates} onChange={e => setDates(e.target.value)} /></FormField>
            <FormField label="Return Date" required><Input type="date" /></FormField>
            <FormField label="Duration" required><Input placeholder="e.g. 11 Days 10 Nights" disabled /></FormField>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Departure City"><Select options={[{value: 'kul', label: 'Kuala Lumpur'}, {value: 'cgk', label: 'Jakarta'}]} value="kul" onChange={() => {}} /></FormField>
            <FormField label="Destination Type" required>
              <Select options={[{value: 'makkah_madinah', label: 'Makkah + Madinah'}, {value: 'makkah', label: 'Makkah'}, {value: 'madinah', label: 'Madinah'}, {value: 'other', label: 'Other'}]} value="makkah_madinah" onChange={() => {}} />
            </FormField>
            <FormField label="Mutawwif"><Select options={[{value: 'm1', label: 'Ustaz Ahmad', icon: <img src="https://ui-avatars.com/api/?name=Ustaz+Ahmad&background=random&color=fff&size=24" alt="U" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />}]} value="m1" onChange={() => {}} /></FormField>
          </div>
        </div>
      </section>

      {/* Section: Status & Administration */}
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Status & Administration</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
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
      </section>
    </div>
  );

  const renderFlight = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 className="text-section-title">2. Flight Details Snapshot</h3>
        </div>
        <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>Select a flight from the master catalog. A snapshot will be saved for this trip.</p>
        
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
            <Select options={[{value: 'economy', label: 'Economy'}, {value: 'business', label: 'Business'}, {value: 'first', label: 'First'}, {value: 'mixed', label: 'Mixed'}]} value="economy" onChange={() => {}} />
          </FormField>
        </div>

        <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', margin: 'var(--space-4) 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', marginBottom: 'var(--space-4)' }}>
            <input type="checkbox" />
            <span className="text-body-bold">Add Transit / Connecting Flight</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Transit Airport"><Input placeholder="e.g. DXB" disabled /></FormField>
            <FormField label="Transit Duration"><Input placeholder="e.g. 2h 30m" disabled /></FormField>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 'var(--space-4) 0' }} />

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
            <Select options={[{value: 'economy', label: 'Economy'}, {value: 'business', label: 'Business'}, {value: 'first', label: 'First'}, {value: 'mixed', label: 'Mixed'}]} value="economy" onChange={() => {}} />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <FormField label="Flight Notes">
            <textarea className="input-base" placeholder="Customer or operational flight notes..." rows={2} style={{ width: '100%', resize: 'vertical' }} />
          </FormField>
        </div>
      </section>
    </div>
  );

  const renderHotel = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 className="text-section-title">3. Accommodation / Hotel Assignment</h3>
        </div>
        <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>Select active hotels. The actual rooming lists will be managed in the Members &gt; Services tab.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Makkah Hotel"><Select options={[{value: 'h1', label: 'Swissotel Makkah'}]} value="h1" onChange={() => {}} /></FormField>
          <FormField label="Check-in Date"><Input type="date" /></FormField>
          <FormField label="Check-out Date"><Input type="date" /></FormField>
          <FormField label="Makkah Default Meal Plan"><Select options={[{value: 'none', label: 'None'}, {value: 'breakfast', label: 'Breakfast'}, {value: 'hb', label: 'Half Board'}, {value: 'fb', label: 'Full Board'}]} value="fb" onChange={() => {}} /></FormField>
          <FormField label="Makkah Room Default"><Select options={[{value: 'quad', label: 'Quad'}, {value: 'triple', label: 'Triple'}, {value: 'double', label: 'Double'}]} value="quad" onChange={() => {}} /></FormField>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 'var(--space-4) 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Madinah Hotel"><Select options={[{value: 'h2', label: 'Pullman Zamzam Madinah'}]} value="h2" onChange={() => {}} /></FormField>
          <FormField label="Check-in Date"><Input type="date" /></FormField>
          <FormField label="Check-out Date"><Input type="date" /></FormField>
          <FormField label="Madinah Default Meal Plan"><Select options={[{value: 'none', label: 'None'}, {value: 'breakfast', label: 'Breakfast'}, {value: 'hb', label: 'Half Board'}, {value: 'fb', label: 'Full Board'}]} value="fb" onChange={() => {}} /></FormField>
          <FormField label="Madinah Room Default"><Select options={[{value: 'quad', label: 'Quad'}, {value: 'triple', label: 'Triple'}, {value: 'double', label: 'Double'}]} value="quad" onChange={() => {}} /></FormField>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 'var(--space-4) 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Other Hotel"><Select options={[{value: 'none', label: 'None'}, {value: 'h3', label: 'Jeddah Transit Hotel'}]} value="none" onChange={() => {}} /></FormField>
          <FormField label="Check-in Date"><Input type="date" disabled /></FormField>
          <FormField label="Check-out Date"><Input type="date" disabled /></FormField>
          <FormField label="Room Default"><Select options={[{value: 'quad', label: 'Quad'}, {value: 'triple', label: 'Triple'}, {value: 'double', label: 'Double'}]} value="quad" onChange={() => {}} disabled /></FormField>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 'var(--space-4) 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
          <FormField label="Hotel Notes">
            <textarea className="input-base" placeholder="Additional requirements..." rows={2} style={{ width: '100%', resize: 'vertical' }} />
          </FormField>
        </div>
      </section>
    </div>
  );

  const renderTransport = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 className="text-section-title">4. Ground Transportation</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Makkah Transport"><Select options={[{value: 'bus', label: 'Bus'}, {value: 'van', label: 'Van'}, {value: 'coach', label: 'Private Coach'}, {value: 'train', label: 'Train'}, {value: 'other', label: 'Other'}]} value="bus" onChange={() => {}} /></FormField>
          <FormField label="Madinah Transport"><Select options={[{value: 'bus', label: 'Bus'}, {value: 'van', label: 'Van'}, {value: 'coach', label: 'Private Coach'}, {value: 'train', label: 'Train'}, {value: 'other', label: 'Other'}]} value="bus" onChange={() => {}} /></FormField>
          <FormField label="Inter-city Transport"><Select options={[{value: 'bus', label: 'Bus'}, {value: 'coach', label: 'Private Coach'}, {value: 'train', label: 'Haramain Train'}, {value: 'other', label: 'Other'}]} value="train" onChange={() => {}} /></FormField>
          <FormField label="Airport Transfer"><Select options={[{value: 'included', label: 'Included'}, {value: 'not_included', label: 'Not Included'}, {value: 'tbc', label: 'To Be Confirmed'}]} value="included" onChange={() => {}} /></FormField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <FormField label="Transport Vendor">
            <Input placeholder="Vendor name" />
          </FormField>
          <FormField label="Transport Notes">
            <textarea className="input-base" placeholder="Operational instructions..." rows={2} style={{ width: '100%', resize: 'vertical' }} />
          </FormField>
        </div>
      </section>
    </div>
  );

  const renderItinerary = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 className="text-section-title">5. Itinerary Snapshot</h3>
        </div>
        <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>Select an itinerary template. It will be copied into an operational snapshot tied to the exact trip dates.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', alignItems: 'end' }}>
          <FormField label="Itinerary Template">
            <Select options={[{value: 'tmpl', label: 'Standard 11 Days Umrah'}]} value="tmpl" onChange={() => {}} />
          </FormField>
          <Button variant="secondary">Generate Dated Itinerary</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
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
        <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-warning-light)', borderRadius: 'var(--radius-md)', color: 'var(--color-warning-dark)', marginTop: 'var(--space-4)' }}>
          <span className="text-caption-bold">Note:</span> Generating the itinerary will lock the template reference and create trip-specific daily schedules.
        </div>
      </section>
    </div>
  );

  const handleSaveDraft = () => {
    if(showToast) showToast('Draft Saved', 'Progress saved to draft.', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title="Create Group Trip"
        subtitle="Create a new trip instance, assign vendors, and define its operational scope."
        breadcrumbs={[{ label: 'Home' }, { label: 'Group Trips', onClick: () => navigate('group-trip-list') }, { label: 'Create' }]}
        actions={
          <Button variant="secondary" onClick={fillExampleData} leftIcon={<Wand2 size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={handleStepClick} />

        <div style={{ marginTop: 'var(--space-8)' }}>
          {currentStep === 0 && renderCoreDetails()}
          {currentStep === 1 && renderFlight()}
          {currentStep === 2 && renderHotel()}
          {currentStep === 3 && renderTransport()}
          {currentStep === 4 && renderItinerary()}
        </div>
      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <Button
          variant="outline"
          disabled={currentStep === 0}
          onClick={handleBack}
          leftIcon={<ChevronLeft size={16} />}
        >
          Back
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('group-trip-list')}>Cancel</Button>
            <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
            <Button
              variant="primary"
              onClick={handleNext}
              rightIcon={currentStep === steps.length - 1 ? undefined : <ChevronRight size={16} />}
              leftIcon={currentStep === steps.length - 1 ? <Check size={16} /> : undefined}
            >
              {currentStep === steps.length - 1 ? 'Create & Activate Trip' : 'Next'}
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};
