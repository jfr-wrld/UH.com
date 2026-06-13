import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { FileUploader } from '../../components/inputs/FileUploader';
import { Button } from '../../components/actions/Button';
import { Stepper } from '../../components/navigation/Stepper';
import { Plus, Trash2, Calendar, Map, BedDouble, Plane, DollarSign, Image as ImageIcon, FileText } from 'lucide-react';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const PackageCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Umrah');
  const [type, setType] = useState('Premium');
  const { create } = useLocalStorageCrud<any>('package');

  const handleSave = () => {
    create({
      code: `PKG-UMR-26-${Math.floor(Math.random() * 1000)}`,
      name: name || 'New Package',
      agency: 'Zamzam Travels',
      category: category,
      type: type,
      hotel: 'Swissotel Makkah',
      flight: 'Saudi Airlines (SV)',
      price: 'RM 10800',
      schedule: 'TBD',
      commission: 'RM 500',
      status: 'Published',
      labels: [],
      dateCreated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    if(showToast) showToast('Success', 'Package created successfully', 'success');
    navigate('package-list');
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  // Mock form state for dynamic lists
  const [features, setFeatures] = useState<string[]>(['Mutawwif Guide', '24/7 Support']);
  const [inclusions, setInclusions] = useState<string[]>(['Flight Tickets', 'Hotel Stay', 'Visa Processing']);
  const [roomPrices, setRoomPrices] = useState<any[]>([
    { type: 'Double', adult: 'RM 8500', isDefault: true },
    { type: 'Triple', adult: 'RM 8200', isDefault: false },
    { type: 'Quad', adult: 'RM 7900', isDefault: false }
  ]);

  const steps = [
    { id: '1', label: 'Basic Info & Details' },
    { id: '2', label: 'Accommodation & Logistics' },
    { id: '3', label: 'Gallery & Media' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title="Create New Package"
        breadcrumbs={[{ label: 'Home' }, { label: 'Packages', onClick: () => navigate('package-list') }, { label: 'Create Package' }]}
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={handleStepClick} />

        <div style={{ marginTop: 'var(--space-8)' }}>
          
          {/* STEP 1 */}
          {currentStep === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <section>
                <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Basic Information</h2>
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
                    <Input placeholder="e.g. Premium Umrah Safar 2026" value={name} onChange={e => setName(e.target.value)} />
                  </FormField>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <FormField label="Category" required>
                      <Select options={[{value: 'Umrah', label: 'Umrah'}, {value: 'Hajj', label: 'Hajj'}]} value={category} onChange={setCategory} />
                    </FormField>
                    <FormField label="Type" required>
                      <Select options={[{value: 'Premium', label: 'Premium'}, {value: 'Standard', label: 'Standard'}]} value={type} onChange={setType} />
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
                    <textarea className="input-field" rows={4} placeholder="Detailed customer-facing description..." style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-input)', backgroundColor: 'var(--surface-base)' }} />
                  </FormField>
                </div>
              </section>

              <section>
                <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Key Features & Inclusions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                  <div>
                    <FormField label="Key Features">
                      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
                        {features.map((feat, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-pill)', border: 'none' }}>
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
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-pill)', border: 'none' }}>
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

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
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
          {currentStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <Calendar size={20} className="text-primary" />
                  <h2 className="text-section-title">Trip Schedules & Season</h2>
                </div>
                <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>Define the available departure dates and their resolved season references.</p>
                
                <div style={{ padding: 'var(--space-4)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }}>
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
                <section>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
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

                <section>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
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
                    <textarea className="input-field" rows={2} placeholder="Customer visible notes about hotel arrangements..." style={{ width: '100%', resize: 'vertical' }} />
                  </FormField>
                </section>
              </div>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
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

              </section>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
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
                  <textarea className="input-field" rows={2} placeholder="Customer visible transport notes..." style={{ width: '100%', resize: 'vertical' }} />
                </FormField>
              </section>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <FileText size={20} className="text-primary" />
                  <h2 className="text-section-title">Terms & Policies</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Cancellation Policy" required>
                    <textarea className="input-field" rows={4} placeholder="Terms regarding cancellation..." style={{ width: '100%', resize: 'vertical' }} />
                  </FormField>
                  <FormField label="Refund Policy" required>
                    <textarea className="input-field" rows={4} placeholder="Terms regarding refund..." style={{ width: '100%', resize: 'vertical' }} />
                  </FormField>
                  <FormField label="Amendment Policy">
                    <textarea className="input-field" rows={4} placeholder="Terms regarding name or date changes..." style={{ width: '100%', resize: 'vertical' }} />
                  </FormField>
                  <FormField label="Disclaimers">
                    <textarea className="input-field" rows={4} placeholder="Visa, Flight, or Hotel disclaimers..." style={{ width: '100%', resize: 'vertical' }} />
                  </FormField>
                </div>
              </section>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <ImageIcon size={20} className="text-primary" />
                  <h2 className="text-section-title">Gallery & Media</h2>
                </div>
                
                <FormField label="Primary Thumbnail (Max 2MB)" style={{ marginBottom: 'var(--space-6)' }}>
                  <FileUploader accept=".jpg,.png" maxSizeMB={2} id="package-thumbnail" />
                </FormField>

                <FormField label="Gallery Images (Optional, Max 10 Files, 2MB each)" style={{ marginBottom: 'var(--space-6)' }}>
                  <FileUploader accept=".jpg,.png" maxSizeMB={2} multiple id="package-gallery" />
                </FormField>

                <FormField label="Short Video URL (Optional)" style={{ marginBottom: 'var(--space-6)' }}>
                  <Input placeholder="https://youtube.com/..." />
                  <span className="text-caption text-muted" style={{ display: 'block', marginTop: 'var(--space-1)' }}>Provide an external link to a video representing the package.</span>
                </FormField>

                <FormField label="Brochure PDF (Optional, Max 5MB)">
                  <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-body text-muted">No file selected</span>
                    <Button variant="secondary" size="sm">Browse Files</Button>
                  </div>
                </FormField>
              </section>
            </div>
          )}

        </div>
        
        {/* Sticky Footer */}
        <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
          <Button 
            variant="secondary" 
            disabled={currentStep === 0}
            onClick={handlePrev}
          >
            Previous
          </Button>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('package-list')}>Cancel</Button>
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSave}>Publish Package</Button>
            ) : (
              <Button onClick={handleNext}>Next Step</Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
