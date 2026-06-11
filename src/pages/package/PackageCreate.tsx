import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Plus, Trash2, Calendar, Map, BedDouble, Plane, DollarSign, Image as ImageIcon, ChevronRight, Check, FileText, Video } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

export const PackageCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Mock form state for dynamic lists
  const [features, setFeatures] = useState<string[]>(['Mutawwif Guide', '24/7 Support']);
  const [inclusions, setInclusions] = useState<string[]>(['Flight Tickets', 'Hotel Stay', 'Visa Processing']);
  const [roomPrices, setRoomPrices] = useState<any[]>([
    { type: 'Double', adult: 'RM 8500', isDefault: true },
    { type: 'Triple', adult: 'RM 8200', isDefault: false },
    { type: 'Quad', adult: 'RM 7900', isDefault: false }
  ]);

  const steps = [
    { num: 1, title: 'Basic Info & Details' },
    { num: 2, title: 'Accommodation & Logistics' },
    { num: 3, title: 'Gallery & Media' }
  ];
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(steps);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Create New Package"
        breadcrumbs={[{ label: 'Home' }, { label: 'Packages', onClick: () => navigate('package-list') }, { label: 'Create Package' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('package-list'); }}>Cancel</Button>
            <Button variant="secondary" onClick={() => navigate('package-list')}>Save as Draft</Button>
            {currentStep === 3 && <Button onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success');  navigate('package-list'); }}>Publish Package</Button>}
            {currentStep < 3 && <Button onClick={() => setCurrentStep(currentStep + 1)}>Save & Continue</Button>}
          </div>
        }
      />

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none' }}>
        {steps.map((step, idx) => (
          <React.Fragment key={step.num}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: currentStep >= step.num ? 'var(--color-primary)' : 'var(--surface-sunken)',
                color: currentStep >= step.num ? 'white' : 'var(--text-muted)'
              }}>
                {currentStep > step.num ? <Check size={16} /> : step.num}
              </div>
              <span className={`text-body-bold ${currentStep >= step.num ? 'text-primary' : 'text-muted'}`}>{step.title}</span>
            </div>
            {idx < steps.length - 1 && <div style={{ flex: 1, height: '2px', backgroundColor: currentStep > step.num ? 'var(--color-primary)' : 'var(--surface-sunken)', margin: '0 var(--space-4)' }}></div>}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--space-6)' }}>
        
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Basic Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Package Code">
                    <Input placeholder="Auto-generated (e.g. PKG-UMR-26-001)" disabled />
                  </FormField>
                  <FormField label="Travel Agency" required>
                    <Select options={[{value: 'zamzam', label: 'Zamzam Travels'}]} value="zamzam" onChange={() => {}} />
                  </FormField>
                </div>
                <FormField label="Package Name" required>
                  <Input placeholder="e.g. Premium Umrah Safar 2026" />
                </FormField>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Category" required>
                    <Select options={[{value: 'umrah', label: 'Umrah'}, {value: 'hajj', label: 'Hajj'}]} value="umrah" onChange={() => {}} />
                  </FormField>
                  <FormField label="Type" required>
                    <Select options={[{value: 'premium', label: 'Premium'}, {value: 'standard', label: 'Standard'}]} value="premium" onChange={() => {}} />
                  </FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Visa Type">
                    <Select options={[{value: 'umrah', label: 'Umrah Visa'}, {value: 'tourist', label: 'Tourist Visa'}]} value="umrah" onChange={() => {}} />
                  </FormField>
                  <FormField label="Visibility" required>
                    <Select options={[{value: 'internal', label: 'Internal'}, {value: 'public', label: 'Public'}, {value: 'private', label: 'Private Link'}, {value: 'hidden', label: 'Hidden'}]} value="internal" onChange={() => {}} />
                  </FormField>
                  <FormField label="Booking Availability" required>
                    <Select options={[{value: 'open', label: 'Open'}, {value: 'closed', label: 'Closed'}, {value: 'coming_soon', label: 'Coming Soon'}, {value: 'sold_out', label: 'Sold Out'}, {value: 'request', label: 'On Request'}]} value="closed" onChange={() => {}} />
                  </FormField>
                  <FormField label="Creation Source" required>
                    <Select options={[{value: 'ta', label: 'Travel Agency'}, {value: 'admin_assist', label: 'Admin Assistance'}, {value: 'admin_correct', label: 'Admin Correction'}]} value="ta" onChange={() => {}} />
                  </FormField>
                </div>
                <FormField label="Package Description" required>
                  <textarea className="input-field" rows={4} placeholder="Detailed customer-facing description..." style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-input)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }} />
                </FormField>
              </div>
            </section>

            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Key Features & Inclusions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <div>
                  <FormField label="Key Features">
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
                      {features.map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-full)', border: 'none' }}>
                          <span className="text-caption-bold">{feat}</span>
                          <Trash2 size={12} className="text-muted" style={{ cursor: 'pointer' }} onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Input placeholder="Add a key feature..." />
                      <Button variant="secondary">Add</Button>
                    </div>
                  </FormField>
                </div>
                <div>
                  <FormField label="Package Inclusions">
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
                      {inclusions.map((inc, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-full)', border: 'none' }}>
                          <span className="text-caption-bold">{inc}</span>
                          <Trash2 size={12} className="text-muted" style={{ cursor: 'pointer' }} onClick={() => setInclusions(inclusions.filter((_, idx) => idx !== i))} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Input placeholder="Add another inclusion..." />
                      <Button variant="secondary">Add</Button>
                    </div>
                  </FormField>
                </div>
              </div>
            </section>

            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <Map size={20} className="text-primary" />
                <h2 className="text-section-title">Itinerary Planning</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <FormField label="Makkah Nights"><Input type="number" defaultValue={7} /></FormField>
                <FormField label="Madinah Nights"><Input type="number" defaultValue={4} /></FormField>
              </div>
              <FormField label="Itinerary Template Reference">
                <Select options={[{value: 'tmpl_1', label: 'Standard 12 Days Umrah Template'}]} value="tmpl_1" onChange={() => {}} />
              </FormField>
            </section>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <Calendar size={20} className="text-primary" />
                <h2 className="text-section-title">Trip Schedules & Season</h2>
              </div>
              <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>Define the available departure dates and their resolved season references.</p>
              
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <input type="checkbox" defaultChecked /> <span className="text-body-bold">Schedule Enabled</span>
                  </div>
                  <Trash2 size={16} className="text-danger" style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <FormField label="Departure Date"><Input type="date" defaultValue="2026-12-15" /></FormField>
                  <FormField label="Return Date"><Input type="date" defaultValue="2026-12-26" /></FormField>
                  <FormField label="Season (Auto-resolved)">
                    <Input value="High Season - Dec 2026" disabled />
                  </FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)' }}>
                  <FormField label="Flight Status"><Select options={[{value: 'pending', label: 'Pending'}, {value: 'confirmed', label: 'Confirmed'}]} value="pending" onChange={() => {}} /></FormField>
                  <FormField label="Hotel Status"><Select options={[{value: 'pending', label: 'Pending'}, {value: 'confirmed', label: 'Confirmed'}]} value="pending" onChange={() => {}} /></FormField>
                  <FormField label="Schedule Visibility"><Select options={[{value: 'visible', label: 'Visible'}, {value: 'hidden', label: 'Hidden'}, {value: 'request', label: 'On Request'}]} value="visible" onChange={() => {}} /></FormField>
                  <FormField label="Capacity (Pax)"><Input type="number" defaultValue={45} /></FormField>
                  <FormField label="Booking Cut-off Date"><Input type="date" defaultValue="2026-11-15" /></FormField>
                </div>
              </div>
              <Button variant="secondary" size="sm" leftIcon={<Plus size={16} />}>Add Schedule</Button>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <Plane size={20} className="text-primary" />
                  <h2 className="text-section-title">Flight Options</h2>
                </div>
                <FormField label="Airline" required>
                  <Select options={[{value: 'mh', label: 'Malaysia Airlines (MH)'}]} value="mh" onChange={() => {}} />
                </FormField>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                  <FormField label="Departure Airport"><Select options={[{value: 'kul', label: 'KUL - Kuala Lumpur'}]} value="kul" onChange={() => {}} /></FormField>
                  <FormField label="Arrival Airport"><Select options={[{value: 'jed', label: 'JED - Jeddah'}]} value="jed" onChange={() => {}} /></FormField>
                  <FormField label="Return Departure Airport"><Select options={[{value: 'med', label: 'MED - Madinah'}]} value="med" onChange={() => {}} /></FormField>
                  <FormField label="Return Arrival Airport"><Select options={[{value: 'kul', label: 'KUL - Kuala Lumpur'}]} value="kul" onChange={() => {}} /></FormField>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                  <input type="checkbox" /> <span className="text-body-bold">Add Transit Area</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                  <FormField label="Status">
                    <Select options={[{value: 'tbc', label: 'To Be Confirmed'}, {value: 'confirmed', label: 'Confirmed'}]} value="tbc" onChange={() => {}} />
                  </FormField>
                  <FormField label="Default Flight Class">
                    <Select options={[{value: 'economy', label: 'Economy'}, {value: 'business', label: 'Business'}]} value="economy" onChange={() => {}} />
                  </FormField>
                </div>
                <FormField label="Baggage Notes" style={{ marginTop: 'var(--space-4)' }}>
                  <Input placeholder="e.g. 30kg + 7kg cabin baggage, Zam-zam water included" />
                </FormField>
              </section>

              <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <BedDouble size={20} className="text-primary" />
                  <h2 className="text-section-title">Hotel Selection</h2>
                </div>
                <FormField label="Makkah Hotel" style={{ marginBottom: 'var(--space-4)' }}>
                  <Select options={[{value: 'swiss', label: 'Swissotel Makkah'}]} value="swiss" onChange={() => {}} />
                </FormField>
                <FormField label="Madinah Hotel" style={{ marginBottom: 'var(--space-4)' }}>
                  <Select options={[{value: 'pullman', label: 'Pullman Zamzam Madinah'}]} value="pullman" onChange={() => {}} />
                </FormField>
                <FormField label="Other Hotel" style={{ marginBottom: 'var(--space-4)' }}>
                  <Select options={[{value: '', label: 'Select optional hotel...'}]} value="" onChange={() => {}} />
                </FormField>
                <FormField label="Status" style={{ marginBottom: 'var(--space-4)' }}>
                  <Select options={[{value: 'tbc', label: 'To Be Confirmed'}, {value: 'confirmed', label: 'Confirmed'}]} value="confirmed" onChange={() => {}} />
                </FormField>
                <FormField label="Hotel Notes">
                  <textarea className="input-base" rows={2} placeholder="Customer visible notes about hotel arrangements..." style={{ width: '100%', resize: 'vertical' }} />
                </FormField>
              </section>
            </div>

            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <DollarSign size={20} className="text-primary" />
                <h2 className="text-section-title">Room Pricing & Commission</h2>
              </div>
              
              <div style={{ overflowX: 'auto', marginBottom: 'var(--space-6)' }}>
                <div className="data-table-container">
                  <table className="data-table text-body">
                    <thead>
                      <tr>
                        <th>Room Type</th>
                        <th>Adult Price</th>
                        <th>Child Price</th>
                        <th>Child (w/o Bed)</th>
                        <th>Infant Price</th>
                        <th>Discount</th>
                        <th>Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomPrices.map((room, idx) => (
                        <tr key={idx}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <input type="checkbox" defaultChecked />
                              <span className="text-body-bold">{room.type}</span>
                            </div>
                          </td>
                          <td><Input defaultValue={room.adult} /></td>
                          <td><Input defaultValue="RM 6000" /></td>
                          <td><Input defaultValue="RM 5500" /></td>
                          <td><Input defaultValue="RM 2500" /></td>
                          <td><Input placeholder="RM / %" /></td>
                          <td><input type="radio" name="defaultRoom" defaultChecked={room.isDefault} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Payment Configuration</h3>
                  <FormField label="Deposit Amount per Pax"><Input defaultValue="RM 1500" /></FormField>
                </div>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Commission Configuration</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                    <FormField label="Commission Type"><Select options={[{value: 'fixed', label: 'Fixed Amount'}]} value="fixed" onChange={() => {}} /></FormField>
                    <FormField label="Agent Commission"><Input defaultValue="RM 500" /></FormField>
                    <FormField label="Public Commission"><Input placeholder="Optional" /></FormField>
                    <FormField label="Commission Notes"><Input placeholder="Internal notes" /></FormField>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
                <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)' }}>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Promotional Labels</h3>
                  <FormField label="Select up to 2 labels">
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Badge variant="primary">Hot Deal</Badge>
                      <Badge variant="neutral">Best Offer</Badge>
                      <Badge variant="neutral">Early Bird</Badge>
                      <Badge variant="neutral">Family Deal</Badge>
                    </div>
                  </FormField>
                </div>
              </div>
            </section>

            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <Map size={20} className="text-primary" />
                <h2 className="text-section-title">Transport Information</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Makkah Transport Type"><Select options={[{value: 'bus', label: 'Bus'}, {value: 'van', label: 'Van'}]} value="bus" onChange={() => {}} /></FormField>
                <FormField label="Makkah Transport Status"><Select options={[{value: 'confirmed', label: 'Confirmed'}, {value: 'tbc', label: 'To Be Confirmed'}]} value="confirmed" onChange={() => {}} /></FormField>
                <FormField label="Madinah Transport Type"><Select options={[{value: 'bus', label: 'Bus'}, {value: 'van', label: 'Van'}]} value="bus" onChange={() => {}} /></FormField>
                <FormField label="Madinah Transport Status"><Select options={[{value: 'confirmed', label: 'Confirmed'}, {value: 'tbc', label: 'To Be Confirmed'}]} value="confirmed" onChange={() => {}} /></FormField>
                <FormField label="Inter-city Transport Type"><Select options={[{value: 'bus', label: 'Bus'}, {value: 'train', label: 'Haramain Train'}]} value="bus" onChange={() => {}} /></FormField>
                <FormField label="Inter-city Transport Status"><Select options={[{value: 'confirmed', label: 'Confirmed'}, {value: 'tbc', label: 'To Be Confirmed'}]} value="confirmed" onChange={() => {}} /></FormField>
              </div>
              <FormField label="Transport Notes" style={{ marginTop: 'var(--space-4)' }}>
                <textarea className="input-base" rows={2} placeholder="Customer visible transport notes..." style={{ width: '100%', resize: 'vertical' }} />
              </FormField>
            </section>

            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <FileText size={20} className="text-primary" />
                <h2 className="text-section-title">Terms & Policies</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Cancellation Policy" required>
                  <textarea className="input-base" rows={4} placeholder="Terms regarding cancellation..." style={{ width: '100%', resize: 'vertical' }} />
                </FormField>
                <FormField label="Refund Policy" required>
                  <textarea className="input-base" rows={4} placeholder="Terms regarding refund..." style={{ width: '100%', resize: 'vertical' }} />
                </FormField>
                <FormField label="Amendment Policy">
                  <textarea className="input-base" rows={4} placeholder="Terms regarding name or date changes..." style={{ width: '100%', resize: 'vertical' }} />
                </FormField>
                <FormField label="Disclaimers">
                  <textarea className="input-base" rows={4} placeholder="Visa, Flight, or Hotel disclaimers..." style={{ width: '100%', resize: 'vertical' }} />
                </FormField>
              </div>
            </section>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <ImageIcon size={20} className="text-primary" />
                <h2 className="text-section-title">Gallery & Media</h2>
              </div>
              
              <FormField label="Primary Thumbnail (Max 2MB)" style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{ border: '2px dashed var(--border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-8)', textAlign: 'center', backgroundColor: 'var(--surface-sunken)' }}>
                  <ImageIcon size={32} className="text-muted" style={{ margin: '0 auto var(--space-3)' }} />
                  <p className="text-body-bold">Upload primary package image</p>
                  <Button variant="secondary" size="sm" style={{ marginTop: 'var(--space-3)' }}>Select File</Button>
                </div>
              </FormField>

              <FormField label="Gallery Images (Optional, Max 10 Files, 2MB each)" style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{ border: '2px dashed var(--border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', textAlign: 'center', backgroundColor: 'var(--surface-sunken)' }}>
                  <ImageIcon size={24} className="text-muted" style={{ margin: '0 auto var(--space-2)' }} />
                  <p className="text-body text-muted">Drag and drop gallery images here</p>
                  <Button variant="secondary" size="sm" style={{ marginTop: 'var(--space-2)' }}>Browse Images</Button>
                </div>
              </FormField>

              <FormField label="Short Video URL (Optional)" style={{ marginBottom: 'var(--space-6)' }}>
                <Input placeholder="https://youtube.com/..." />
                <span className="text-caption text-muted" style={{ display: 'block', marginTop: 'var(--space-1)' }}>Provide an external link to a video representing the package.</span>
              </FormField>

              <FormField label="Brochure PDF (Optional, Max 5MB)">
                <div style={{ border: 'none', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-body text-muted">No file selected</span>
                  <Button variant="secondary" size="sm">Browse Files</Button>
                </div>
              </FormField>
            </section>
          </div>
        )}

      </div>
    </div>
  );
};
