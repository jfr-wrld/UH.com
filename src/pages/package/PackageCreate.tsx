import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { FileUploader } from '../../components/inputs/FileUploader';
import { Button } from '../../components/actions/Button';
import { Stepper } from '../../components/navigation/Stepper';
import { Plus, Trash2, Calendar, Map, BedDouble, Plane, DollarSign, Image as ImageIcon, FileText, Edit, CheckCircle, Save, ChevronLeft, ArrowLeft, Building, Bus, ChevronUp, Gift, Heart, Star, Users, Flame, MapPin, Check, Train, User, Droplet, BookOpen } from 'lucide-react';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const PackageCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const { create } = useLocalStorageCrud<any>('package');
  const [showErrors, setShowErrors] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [draftTime, setDraftTime] = useState('');

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { id: '1', label: 'Basic Info' },
    { id: '2', label: 'Accommodation & Logistics' },
    { id: '3', label: 'Terms & Policies' },
    { id: '4', label: 'Gallery & Media' },
    { id: '5', label: 'Preview & Publish' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    agency: 'zamzam',
    category: 'Umrah',
    type: 'Premium',
    visaType: 'umrah',
    visibility: 'internal',
    availability: 'closed',
    creationSource: 'ta',
    description: '',
    features: ['Mutawwif Guide', '24/7 Support'],
    inclusions: ['Flight Tickets', 'Hotel Stay', 'Visa Processing'],
    makkahNights: 7,
    madinahNights: 4,
    itineraryTemplate: 'tmpl_1',
    schedules: [
      { id: '1', departureDate: '2026-12-15', returnDate: '2026-12-26', flightStatus: 'pending', hotelStatus: 'pending', visibility: 'visible', capacity: 45, cutoffDate: '2026-11-15' }
    ],
    airline: 'mh',
    depAirport: 'kul',
    arrAirport: 'jed',
    retDepAirport: 'med',
    retArrAirport: 'kul',
    addTransit: false,
    flightStatus: 'tbc',
    defaultClass: 'economy',
    baggageNotes: '',
    makkahHotel: 'swiss',
    madinahHotel: 'pullman',
    otherHotel: '',
    hotelStatus: 'confirmed',
    hotelNotes: '',
    roomPrices: [
      { type: 'Double', adult: 'RM 8500', child: 'RM 6000', childNoBed: 'RM 5500', infant: 'RM 2500', discount: '', isDefault: true },
      { type: 'Triple', adult: 'RM 8200', child: '', childNoBed: '', infant: '', discount: '', isDefault: false },
      { type: 'Quad', adult: 'RM 7900', child: '', childNoBed: '', infant: '', discount: '', isDefault: false }
    ],
    depositAmount: 'RM 1500',
    commissionType: 'fixed',
    agentCommission: 'RM 500',
    publicCommission: '',
    commissionNotes: '',
    makkahTransportType: 'bus',
    makkahTransportStatus: 'confirmed',
    madinahTransportType: 'bus',
    madinahTransportStatus: 'confirmed',
    intercityTransportType: 'bus',
    intercityTransportStatus: 'confirmed',
    transportNotes: '',
    cancellationPolicy: '',
    refundPolicy: '',
    amendmentPolicy: '',
    disclaimers: '',
    thumbnailUrl: '',
    videoUrl: ''
  });

  const [newFeature, setNewFeature] = useState('');
  const [newInclusion, setNewInclusion] = useState('');

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFillExample = () => {
    setFormData({
      name: 'Premium Safar VIP 2026',
      agency: 'zamzam',
      category: 'Umrah',
      type: 'VIP',
      visaType: 'umrah',
      visibility: 'public',
      availability: 'open',
      creationSource: 'ta',
      description: 'Experience an unforgettable spiritual journey with our Premium Safar VIP package. Enjoy 5-star accommodations right at the doorstep of the Haram, guided by experienced Mutawwifs.',
      features: ['Mutawwif Guide', '24/7 Support', 'VIP Transport', 'Ziyarah Included', 'Haramain Train'],
      inclusions: ['Flight Tickets', 'Hotel Stay', 'Visa Processing', 'Zamzam Water', 'Meals (Full Board)'],
      makkahNights: 7,
      madinahNights: 4,
      itineraryTemplate: 'tmpl_1',
      schedules: [
        { id: '1', departureDate: '2026-12-15', returnDate: '2026-12-26', flightStatus: 'confirmed', hotelStatus: 'confirmed', visibility: 'visible', capacity: 45, cutoffDate: '2026-11-15' },
        { id: '2', departureDate: '2027-01-20', returnDate: '2027-01-31', flightStatus: 'pending', hotelStatus: 'pending', visibility: 'visible', capacity: 40, cutoffDate: '2026-12-20' }
      ],
      airline: 'mh',
      depAirport: 'kul',
      arrAirport: 'jed',
      retDepAirport: 'med',
      retArrAirport: 'kul',
      addTransit: false,
      flightStatus: 'confirmed',
      defaultClass: 'economy',
      baggageNotes: '30kg Check-in, 7kg Cabin, 5L Zamzam',
      makkahHotel: 'swiss',
      madinahHotel: 'pullman',
      otherHotel: '',
      hotelStatus: 'confirmed',
      hotelNotes: 'Include breakfast buffet, partial haram view requested.',
      roomPrices: [
        { type: 'Double', adult: 'RM 12500', child: 'RM 9500', childNoBed: 'RM 7000', infant: 'RM 3500', discount: '', isDefault: true },
        { type: 'Triple', adult: 'RM 11500', child: 'RM 8500', childNoBed: 'RM 7000', infant: 'RM 3500', discount: '', isDefault: false },
        { type: 'Quad', adult: 'RM 10500', child: 'RM 7500', childNoBed: 'RM 7000', infant: 'RM 3500', discount: '', isDefault: false }
      ],
      depositAmount: 'RM 2000',
      commissionType: 'fixed',
      agentCommission: 'RM 600',
      publicCommission: 'RM 200',
      commissionNotes: 'Special promo for Ramadan season bookings.',
      makkahTransportType: 'bus',
      makkahTransportStatus: 'confirmed',
      madinahTransportType: 'bus',
      madinahTransportStatus: 'confirmed',
      intercityTransportType: 'train',
      intercityTransportStatus: 'confirmed',
      transportNotes: 'Haramain Train Business Class for Makkah-Madinah transfer.',
      cancellationPolicy: 'Cancellations 45 days before departure: 100% refund minus RM 500 processing fee.\nCancellations 30 days before departure: 50% refund.\nCancellations under 30 days: Non-refundable.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80',
      videoUrl: 'https://youtube.com/watch?v=example'
    });
    if(showToast) showToast('Filled', 'Example data has been filled', 'info');
  };

  const validateForm = () => {
    return formData.name.trim() !== '' && formData.description.trim() !== '' && formData.cancellationPolicy.trim() !== '';
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

  const handleSave = (isDraft: boolean = false) => {
    if (!isDraft && !validateForm()) {
      setShowErrors(true);
      if (showToast) showToast('Validation Error', 'Please fill in all required fields.', 'error');
      setCurrentStep(0);
      window.scrollTo(0, 0);
      return;
    }

    const newCode = `PKG-UMR-26-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    const basePrice = formData.roomPrices.find(r => r.type === 'Double')?.adult || 'TBD';

    const completePackage = {
      ...formData,
      code: newCode,
      hotel: formData.makkahHotel === 'swiss' ? 'Swissotel Makkah' : (formData.makkahHotel || 'TBA'),
      flight: formData.airline === 'mh' ? 'Malaysia Airlines (MH)' : (formData.airline || 'TBA'),
      price: basePrice,
      schedule: formData.schedules.length > 0 && formData.schedules[0].departureDate ? formData.schedules[0].departureDate : 'TBD',
      commission: formData.agentCommission || 'TBD',
      status: isDraft ? 'Draft' : 'Published',
      labels: [],
      dateCreated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    (create as any)(completePackage);
    
    if (isDraft) {
      setIsDraftSaved(true);
      setDraftTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      if(showToast) showToast('Draft Saved', 'Your progress has been saved locally.', 'info');
    } else {
      if(showToast) showToast('Success', 'Package published successfully', 'success');
      navigate('package-list');
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      updateForm('features', [...formData.features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      updateForm('inclusions', [...formData.inclusions, newInclusion.trim()]);
      setNewInclusion('');
    }
  };

  const addSchedule = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    updateForm('schedules', [...formData.schedules, { id: newId, departureDate: '', returnDate: '', flightStatus: 'pending', hotelStatus: 'pending', visibility: 'visible', capacity: 45, cutoffDate: '' }]);
  };

  const updateSchedule = (idx: number, field: string, value: any) => {
    const newSchedules = [...formData.schedules];
    newSchedules[idx] = { ...newSchedules[idx], [field]: value };
    updateForm('schedules', newSchedules);
  };

  const updateRoomPrice = (idx: number, field: string, value: any) => {
    const newRooms = [...formData.roomPrices];
    newRooms[idx] = { ...newRooms[idx], [field]: value };
    updateForm('roomPrices', newRooms);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title="Create New Package"
        breadcrumbs={[{ label: 'Home' }, { label: 'Packages', onClick: () => navigate('package-list') }, { label: 'Create Package' }]}
        actions={
          <Button variant="outline" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={handleStepClick} />

        {currentStep === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            {/* Section 1: Basic Info */}
            <section>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Basic Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Package Code">
                    <Input placeholder="Auto-generated (e.g. PKG-UMR-26-001)" disabled />
                  </FormField>
                  <FormField label="Travel Agency" required>
                    <Select options={[{value: 'zamzam', label: 'Zamzam Travels'}]} value={formData.agency} onChange={(e) => updateForm('agency', e.target.value)} />
                  </FormField>
                </div>
                <FormField label="Package Name" required error={showErrors && !formData.name ? 'Required' : undefined}>
                  <Input placeholder="e.g. Premium Umrah Safar 2026" value={formData.name} onChange={e => updateForm('name', e.target.value)} />
                </FormField>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Category" required>
                    <Select options={[{value: 'Umrah', label: 'Umrah'}, {value: 'Hajj', label: 'Hajj'}]} value={formData.category} onChange={(e) => updateForm('category', e.target.value)} />
                  </FormField>
                  <FormField label="Type" required>
                    <Select options={[{value: 'Premium', label: 'Premium'}, {value: 'Standard', label: 'Standard'}, {value: 'VIP', label: 'VIP'}]} value={formData.type} onChange={(e) => updateForm('type', e.target.value)} />
                  </FormField>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Visa Type">
                    <Select options={[{value: 'umrah', label: 'Umrah Visa'}, {value: 'tourist', label: 'Tourist Visa'}]} value={formData.visaType} onChange={(e) => updateForm('visaType', e.target.value)} />
                  </FormField>
                  <FormField label="Visibility" required>
                    <Select options={[{value: 'internal', label: 'Internal'}, {value: 'public', label: 'Public'}, {value: 'private', label: 'Private Link'}, {value: 'hidden', label: 'Hidden'}]} value={formData.visibility} onChange={(e) => updateForm('visibility', e.target.value)} />
                  </FormField>
                  <FormField label="Booking Availability" required>
                    <Select options={[{value: 'open', label: 'Open'}, {value: 'closed', label: 'Closed'}, {value: 'coming_soon', label: 'Coming Soon'}, {value: 'sold_out', label: 'Sold Out'}, {value: 'request', label: 'On Request'}]} value={formData.availability} onChange={(e) => updateForm('availability', e.target.value)} />
                  </FormField>
                  <FormField label="Creation Source" required>
                    <Select options={[{value: 'ta', label: 'Travel Agency'}, {value: 'admin_assist', label: 'Admin Assistance'}, {value: 'admin_correct', label: 'Admin Correction'}]} value={formData.creationSource} onChange={(e) => updateForm('creationSource', e.target.value)} />
                  </FormField>
                </div>
                <FormField label="Package Description" required error={showErrors && !formData.description ? 'Required' : undefined}>
                  <textarea className="input-base" rows={4} value={formData.description} onChange={(e) => updateForm('description', e.target.value)} placeholder="Detailed customer-facing description..." style={{ width: '100%', minWidth: '100%', height: '120px', resize: 'vertical' }} />
                </FormField>
              </div>
            </section>

            {/* Section 2: Key Features & Inclusions */}
            <section>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Key Features & Inclusions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <div>
                  <FormField label="Key Features">
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
                      {formData.features.map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-pill)', border: 'none' }}>
                          <span className="text-caption-bold">{feat}</span>
                          <Trash2 size={12} className="text-muted" style={{ cursor: 'pointer' }} onClick={() => updateForm('features', formData.features.filter((_, idx) => idx !== i))} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Input placeholder="Add a key feature..." value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') addFeature(); }} />
                      <Button variant="secondary" onClick={addFeature}>Add</Button>
                    </div>
                  </FormField>
                </div>
                <div>
                  <FormField label="Package Inclusions">
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
                      {formData.inclusions.map((inc, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-pill)', border: 'none' }}>
                          <span className="text-caption-bold">{inc}</span>
                          <Trash2 size={12} className="text-muted" style={{ cursor: 'pointer' }} onClick={() => updateForm('inclusions', formData.inclusions.filter((_, idx) => idx !== i))} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Input placeholder="Add another inclusion..." value={newInclusion} onChange={(e) => setNewInclusion(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') addInclusion(); }} />
                      <Button variant="secondary" onClick={addInclusion}>Add</Button>
                    </div>
                  </FormField>
                </div>
              </div>
            </section>

            {/* Section 3: Itinerary */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <Map size={20} className="text-primary" />
                <h2 className="text-section-title">Itinerary Planning</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <FormField label="Makkah Nights"><Input type="number" value={formData.makkahNights} onChange={(e) => updateForm('makkahNights', parseInt(e.target.value) || 0)} /></FormField>
                <FormField label="Madinah Nights"><Input type="number" value={formData.madinahNights} onChange={(e) => updateForm('madinahNights', parseInt(e.target.value) || 0)} /></FormField>
              </div>
              <FormField label="Itinerary Template Reference">
                <Select options={[{value: 'tmpl_1', label: 'Standard 12 Days Umrah Template'}]} value={formData.itineraryTemplate} onChange={(e) => updateForm('itineraryTemplate', e.target.value)} />
              </FormField>
            </section>
          </div>
        )}

        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            {/* Section 4: Schedules */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <Calendar size={20} className="text-primary" />
                <h2 className="text-section-title">Trip Schedules & Season</h2>
              </div>
              <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>Define the available departure dates and their resolved season references.</p>
              
              {formData.schedules.map((schedule, idx) => (
                <div key={schedule.id} style={{ padding: 'var(--space-4)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <input type="checkbox" defaultChecked /> <span className="text-body-bold">Schedule #{idx + 1}</span>
                    </div>
                    {formData.schedules.length > 1 && (
                      <Trash2 size={16} className="text-danger" style={{ cursor: 'pointer' }} onClick={() => updateForm('schedules', formData.schedules.filter((_, i) => i !== idx))} />
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                    <FormField label="Departure Date"><Input type="date" value={schedule.departureDate} onChange={(e) => updateSchedule(idx, 'departureDate', e.target.value)} /></FormField>
                    <FormField label="Return Date"><Input type="date" value={schedule.returnDate} onChange={(e) => updateSchedule(idx, 'returnDate', e.target.value)} /></FormField>
                    <FormField label="Season (Auto-resolved)">
                      <Input value="High Season - Dec 2026" disabled />
                    </FormField>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-3)' }}>
                    <FormField label="Flight Status"><Select options={[{value: 'pending', label: 'Pending'}, {value: 'confirmed', label: 'Confirmed'}]} value={schedule.flightStatus} onChange={(e) => updateSchedule(idx, 'flightStatus', e.target.value)} /></FormField>
                    <FormField label="Hotel Status"><Select options={[{value: 'pending', label: 'Pending'}, {value: 'confirmed', label: 'Confirmed'}]} value={schedule.hotelStatus} onChange={(e) => updateSchedule(idx, 'hotelStatus', e.target.value)} /></FormField>
                    <FormField label="Schedule Visibility"><Select options={[{value: 'visible', label: 'Visible'}, {value: 'hidden', label: 'Hidden'}, {value: 'request', label: 'On Request'}]} value={schedule.visibility} onChange={(e) => updateSchedule(idx, 'visibility', e.target.value)} /></FormField>
                    <FormField label="Capacity (Pax)"><Input type="number" value={schedule.capacity} onChange={(e) => updateSchedule(idx, 'capacity', parseInt(e.target.value) || 0)} /></FormField>
                    <FormField label="Booking Cut-off Date"><Input type="date" value={schedule.cutoffDate} onChange={(e) => updateSchedule(idx, 'cutoffDate', e.target.value)} /></FormField>
                  </div>
                </div>
              ))}
              <Button variant="secondary" size="sm" leftIcon={<Plus size={16} />} onClick={addSchedule}>Add Schedule</Button>
            </section>

            {/* Section 5: Flights & Hotels */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <Plane size={20} className="text-primary" />
                  <h2 className="text-section-title">Flight Options</h2>
                </div>
                <FormField label="Airline" required>
                  <Select options={[{value: 'mh', label: 'Malaysia Airlines (MH)'}]} value={formData.airline} onChange={(e) => updateForm('airline', e.target.value)} />
                </FormField>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                  <FormField label="Departure Airport"><Select options={[{value: 'kul', label: 'KUL - Kuala Lumpur'}]} value={formData.depAirport} onChange={(e) => updateForm('depAirport', e.target.value)} /></FormField>
                  <FormField label="Arrival Airport"><Select options={[{value: 'jed', label: 'JED - Jeddah'}]} value={formData.arrAirport} onChange={(e) => updateForm('arrAirport', e.target.value)} /></FormField>
                  <FormField label="Return Departure"><Select options={[{value: 'med', label: 'MED - Madinah'}]} value={formData.retDepAirport} onChange={(e) => updateForm('retDepAirport', e.target.value)} /></FormField>
                  <FormField label="Return Arrival"><Select options={[{value: 'kul', label: 'KUL - Kuala Lumpur'}]} value={formData.retArrAirport} onChange={(e) => updateForm('retArrAirport', e.target.value)} /></FormField>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                  <input type="checkbox" checked={formData.addTransit} onChange={(e) => updateForm('addTransit', e.target.checked)} /> <span className="text-body-bold">Add Transit Area</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                  <FormField label="Status">
                    <Select options={[{value: 'tbc', label: 'To Be Confirmed'}, {value: 'confirmed', label: 'Confirmed'}]} value={formData.flightStatus} onChange={(e) => updateForm('flightStatus', e.target.value)} />
                  </FormField>
                  <FormField label="Default Flight Class">
                    <Select options={[{value: 'economy', label: 'Economy'}, {value: 'business', label: 'Business'}]} value={formData.defaultClass} onChange={(e) => updateForm('defaultClass', e.target.value)} />
                  </FormField>
                </div>
                <FormField label="Baggage Notes" style={{ marginTop: 'var(--space-4)' }}>
                  <Input placeholder="e.g. 30kg + 7kg cabin baggage" value={formData.baggageNotes} onChange={(e) => updateForm('baggageNotes', e.target.value)} />
                </FormField>
              </section>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <BedDouble size={20} className="text-primary" />
                  <h2 className="text-section-title">Hotel Selection</h2>
                </div>
                <FormField label="Makkah Hotel" style={{ marginBottom: 'var(--space-4)' }}>
                  <Select options={[{value: 'swiss', label: 'Swissotel Makkah'}]} value={formData.makkahHotel} onChange={(e) => updateForm('makkahHotel', e.target.value)} />
                </FormField>
                <FormField label="Madinah Hotel" style={{ marginBottom: 'var(--space-4)' }}>
                  <Select options={[{value: 'pullman', label: 'Pullman Zamzam Madinah'}]} value={formData.madinahHotel} onChange={(e) => updateForm('madinahHotel', e.target.value)} />
                </FormField>
                <FormField label="Other Hotel" style={{ marginBottom: 'var(--space-4)' }}>
                  <Select options={[{value: '', label: 'Select optional hotel...'}]} value={formData.otherHotel} onChange={(e) => updateForm('otherHotel', e.target.value)} />
                </FormField>
                <FormField label="Status" style={{ marginBottom: 'var(--space-4)' }}>
                  <Select options={[{value: 'tbc', label: 'To Be Confirmed'}, {value: 'confirmed', label: 'Confirmed'}]} value={formData.hotelStatus} onChange={(e) => updateForm('hotelStatus', e.target.value)} />
                </FormField>
                <FormField label="Hotel Notes">
                  <textarea className="input-base" rows={2} value={formData.hotelNotes} onChange={(e) => updateForm('hotelNotes', e.target.value)} placeholder="Customer visible notes about hotel arrangements..." style={{ width: '100%', minWidth: '100%', height: '80px', resize: 'vertical' }} />
                </FormField>
              </section>
            </div>

            {/* Section 6: Pricing & Comm */}
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
                      {formData.roomPrices.map((room, idx) => (
                        <tr key={idx}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <input type="checkbox" defaultChecked />
                              <span className="text-body-bold">{room.type}</span>
                            </div>
                          </td>
                          <td><Input value={room.adult} onChange={(e) => updateRoomPrice(idx, 'adult', e.target.value)} /></td>
                          <td><Input value={room.child} onChange={(e) => updateRoomPrice(idx, 'child', e.target.value)} /></td>
                          <td><Input value={room.childNoBed} onChange={(e) => updateRoomPrice(idx, 'childNoBed', e.target.value)} /></td>
                          <td><Input value={room.infant} onChange={(e) => updateRoomPrice(idx, 'infant', e.target.value)} /></td>
                          <td><Input value={room.discount} onChange={(e) => updateRoomPrice(idx, 'discount', e.target.value)} placeholder="RM / %" /></td>
                          <td><input type="radio" name="defaultRoom" checked={room.isDefault} onChange={() => {
                            const newRooms = formData.roomPrices.map((r, i) => ({ ...r, isDefault: i === idx }));
                            updateForm('roomPrices', newRooms);
                          }} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Payment Configuration</h3>
                  <FormField label="Deposit Amount per Pax"><Input value={formData.depositAmount} onChange={(e) => updateForm('depositAmount', e.target.value)} /></FormField>
                </div>
                <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                  <h3 className="text-subsection-title" style={{ marginBottom: 'var(--space-3)' }}>Commission Configuration</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                    <FormField label="Commission Type"><Select options={[{value: 'fixed', label: 'Fixed Amount'}]} value={formData.commissionType} onChange={(e) => updateForm('commissionType', e.target.value)} /></FormField>
                    <FormField label="Agent Commission"><Input value={formData.agentCommission} onChange={(e) => updateForm('agentCommission', e.target.value)} /></FormField>
                    <FormField label="Public Commission"><Input value={formData.publicCommission} onChange={(e) => updateForm('publicCommission', e.target.value)} placeholder="Optional" /></FormField>
                    <FormField label="Commission Notes"><Input value={formData.commissionNotes} onChange={(e) => updateForm('commissionNotes', e.target.value)} placeholder="Internal notes" /></FormField>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 7: Transport */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <Map size={20} className="text-primary" />
                <h2 className="text-section-title">Transport Information</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Makkah Transport Type"><Select options={[{value: 'bus', label: 'Bus'}, {value: 'van', label: 'Van'}]} value={formData.makkahTransportType} onChange={(e) => updateForm('makkahTransportType', e.target.value)} /></FormField>
                <FormField label="Makkah Transport Status"><Select options={[{value: 'confirmed', label: 'Confirmed'}, {value: 'tbc', label: 'To Be Confirmed'}]} value={formData.makkahTransportStatus} onChange={(e) => updateForm('makkahTransportStatus', e.target.value)} /></FormField>
                <FormField label="Madinah Transport Type"><Select options={[{value: 'bus', label: 'Bus'}, {value: 'van', label: 'Van'}]} value={formData.madinahTransportType} onChange={(e) => updateForm('madinahTransportType', e.target.value)} /></FormField>
                <FormField label="Madinah Transport Status"><Select options={[{value: 'confirmed', label: 'Confirmed'}, {value: 'tbc', label: 'To Be Confirmed'}]} value={formData.madinahTransportStatus} onChange={(e) => updateForm('madinahTransportStatus', e.target.value)} /></FormField>
                <FormField label="Inter-city Transport Type"><Select options={[{value: 'bus', label: 'Bus'}, {value: 'train', label: 'Haramain Train'}]} value={formData.intercityTransportType} onChange={(e) => updateForm('intercityTransportType', e.target.value)} /></FormField>
                <FormField label="Inter-city Transport Status"><Select options={[{value: 'confirmed', label: 'Confirmed'}, {value: 'tbc', label: 'To Be Confirmed'}]} value={formData.intercityTransportStatus} onChange={(e) => updateForm('intercityTransportStatus', e.target.value)} /></FormField>
              </div>
              <FormField label="Transport Notes" style={{ marginTop: 'var(--space-4)' }}>
                <textarea className="input-base" rows={2} value={formData.transportNotes} onChange={(e) => updateForm('transportNotes', e.target.value)} placeholder="Customer visible transport notes..." style={{ width: '100%', minWidth: '100%', height: '80px', resize: 'vertical' }} />
              </FormField>
            </section>
          </div>
        )}

        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            {/* Section 8: Terms */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <FileText size={20} className="text-primary" />
                <h2 className="text-section-title">Terms & Policies</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Cancellation Policy" required error={showErrors && !formData.cancellationPolicy ? 'Required' : undefined}>
                  <textarea className="input-base" rows={4} value={formData.cancellationPolicy} onChange={(e) => updateForm('cancellationPolicy', e.target.value)} placeholder="Terms regarding cancellation..." style={{ width: '100%', minWidth: '100%', height: '120px', resize: 'vertical' }} />
                </FormField>
                <FormField label="Refund Policy">
                  <textarea className="input-base" rows={4} value={formData.refundPolicy} onChange={(e) => updateForm('refundPolicy', e.target.value)} placeholder="Terms regarding refund..." style={{ width: '100%', minWidth: '100%', height: '120px', resize: 'vertical' }} />
                </FormField>
                <FormField label="Amendment Policy">
                  <textarea className="input-base" rows={4} value={formData.amendmentPolicy} onChange={(e) => updateForm('amendmentPolicy', e.target.value)} placeholder="Terms regarding name or date changes..." style={{ width: '100%', minWidth: '100%', height: '120px', resize: 'vertical' }} />
                </FormField>
                <FormField label="Disclaimers">
                  <textarea className="input-base" rows={4} value={formData.disclaimers} onChange={(e) => updateForm('disclaimers', e.target.value)} placeholder="Visa, Flight, or Hotel disclaimers..." style={{ width: '100%', minWidth: '100%', height: '120px', resize: 'vertical' }} />
                </FormField>
              </div>
            </section>
          </div>
        )}

        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            {/* Section 9: Media */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <ImageIcon size={20} className="text-primary" />
                <h2 className="text-section-title">Gallery & Media</h2>
              </div>
              
              <FormField label="Primary Thumbnail (Mandatory)" required style={{ marginBottom: 'var(--space-6)' }}>
                <FileUploader accept=".jpg,.png" maxSizeMB={2} id="package-thumbnail" />
              </FormField>

              <FormField label="Gallery Images (Optional, Max 10 Files, 2MB each)" style={{ marginBottom: 'var(--space-6)' }}>
                <FileUploader accept=".jpg,.png" maxSizeMB={2} multiple id="package-gallery" />
              </FormField>

              <FormField label="Short Video URL (Optional)" style={{ marginBottom: 'var(--space-6)' }}>
                <Input placeholder="https://youtube.com/..." value={formData.videoUrl} onChange={(e) => updateForm('videoUrl', e.target.value)} />
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

        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <CheckCircle size={20} className="text-primary" />
                <h2 className="text-section-title">Review Package Details</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
                
                {/* Mobile App Preview Card */}
                <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', maxWidth: '350px' }}>
                  {/* Image Section */}
                  <div style={{ position: 'relative', height: '220px', backgroundColor: 'var(--surface-muted)' }}>
                    <img src={formData.thumbnailUrl || 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80'} alt="Package" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80'; }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
                       <span style={{ backgroundColor: '#FFF4E6', color: '#EA580C', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><Flame size={12} color="currentColor" /> Hot Deal</span>
                       <span style={{ backgroundColor: '#FEF3C7', color: '#B45309', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>{formData.type || 'Promo'}</span>
                    </div>
                    {formData.roomPrices[0]?.discount && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                         <span style={{ backgroundColor: 'var(--color-danger)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{formData.roomPrices[0].discount}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Body Section */}
                  <div style={{ padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                      <h3 className="text-section-title" style={{ margin: 0, fontSize: '20px', lineHeight: '1.2' }}>{formData.name || 'Untitled Package'}</h3>
                      <span style={{ color: 'var(--color-danger)', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: 'var(--space-2)' }}>{formData.schedules[0]?.capacity || 0} Seats Left</span>
                    </div>
                    
                    {/* Agency info */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-info)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: 'white', fontSize: '10px' }}>{(formData.agency || 'A').substring(0,1).toUpperCase()}</span>
                        </div>
                        <span className="text-body-medium" style={{ color: 'var(--gray-600)' }}>{formData.agency === 'zamzam' ? 'Zamzam Travels' : formData.agency === 'berkah' ? 'Berkah Travel' : formData.agency || 'Agency'} <CheckCircle size={14} color="var(--color-primary)" style={{ display: 'inline', verticalAlign: 'middle' }} /></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '13px', color: 'var(--gray-500)' }}>
                        <span style={{ color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} fill="currentColor" /> 4.9</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> 800+</span>
                      </div>
                    </div>
                    
                    {/* Itinerary & Date */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', fontSize: '14px', color: 'var(--gray-600)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><Calendar size={16} /> Makkah {formData.makkahNights || 0}N • Madinah {formData.madinahNights || 0}N</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><Plane size={16} /> {formData.schedules[0]?.departureDate ? new Date(formData.schedules[0].departureDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'TBA'}</div>
                    </div>
                    
                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 'var(--space-4) 0' }} />
                    
                    {/* Price & Action */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                         <div style={{ textDecoration: 'line-through', color: 'var(--gray-500)', fontSize: '13px' }}>{formData.roomPrices[0]?.adult ? `RM ${parseInt(formData.roomPrices[0].adult.replace(/\D/g,'') || '0') + 1600}` : ''}</div>
                         <div><span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>{formData.roomPrices[0]?.adult || 'RM 0'}</span><span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>/pilgrim</span></div>
                      </div>
                      <Button style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>Book Now</Button>
                    </div>
                  </div>
                </div>

                {/* Mobile Details View */}
                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-subtle)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', maxWidth: '450px' }}>
                  {/* Header */}
                  <div style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <ArrowLeft size={20} />
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{formData.name || 'Untitled Package'}</h3>
                    </div>
                    <Heart size={20} color="var(--color-danger)" fill="var(--color-danger)" />
                  </div>

                  {/* Tabs & Quick Info */}
                  <div style={{ padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)' }}>
                      <span style={{ color: 'var(--color-primary)', fontWeight: '600', borderBottom: '2px solid var(--color-primary)' }}>Trip Details</span>
                      <span style={{ color: 'var(--gray-500)' }}>Itinerary</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-info)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                          {(formData.agency || 'A').substring(0,1).toUpperCase()}
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: '500' }}>{formData.agency === 'zamzam' ? 'Zamzam Travels' : formData.agency === 'berkah' ? 'Berkah Travel' : formData.agency || 'Agency'}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} fill="#FBBF24" color="#FBBF24" /> 4.7 <span style={{ marginLeft: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> 300+</span></div>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                      <span style={{ backgroundColor: '#FEF2F2', color: '#DC2626', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><Flame size={12} color="currentColor" /> Popular</span>
                      <span style={{ backgroundColor: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} fill="currentColor" /> {formData.type || 'VIP'}</span>
                      <span style={{ backgroundColor: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>{(formData.makkahNights || 0) + (formData.madinahNights || 0)} Nights - {(formData.makkahNights || 0) + (formData.madinahNights || 0) + 1} Days</span>
                    </div>

                    <div style={{ fontSize: '13px', color: 'var(--gray-600)', marginBottom: 'var(--space-4)' }}>
                      Makkah {formData.makkahNights || 0}N • Madinah {formData.madinahNights || 0}N
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 var(--space-4)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--gray-500)' }}><Plane size={20} /><span style={{ fontSize: '10px' }}>Flights</span></div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--gray-500)' }}><Building size={20} /><span style={{ fontSize: '10px' }}>Hotels</span></div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--gray-500)' }}><Bus size={20} /><span style={{ fontSize: '10px' }}>Transfer</span></div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--gray-500)' }}><Map size={20} /><span style={{ fontSize: '10px' }}>Activities</span></div>
                    </div>
                  </div>

                  {/* Gallery Section */}
                  <div style={{ borderTop: '4px solid var(--surface-muted)', padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 'bold' }}><ImageIcon size={16} color="var(--color-primary)" /> Gallery</div>
                      <ChevronUp size={16} color="var(--gray-400)" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px', height: '140px' }}>
                      <div style={{ width: '100%', height: '100%', minHeight: 0 }}>
                        <img src={formData.thumbnailUrl || 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80'} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80'; }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                         <img src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=600&q=80" style={{ width: '100%', height: '66px', objectFit: 'cover', borderRadius: '8px' }} />
                         <div style={{ position: 'relative', width: '100%', height: '66px', borderRadius: '8px', overflow: 'hidden' }}>
                           <img src="https://images.unsplash.com/photo-1542042161784-26ab9e041e89?w=600&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                           <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>+3</div>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Flight Section */}
                  <div style={{ borderTop: '4px solid var(--surface-muted)', padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 'bold' }}><Plane size={16} color="var(--color-primary)" /> Flight <span style={{ fontSize: '11px', color: 'var(--gray-500)', backgroundColor: 'var(--surface-muted)', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>0/2 Confirmed</span></div>
                      <ChevronUp size={16} color="var(--gray-400)" />
                    </div>
                    
                    {/* Departure */}
                    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '13px', fontWeight: '600' }}><Plane size={14} style={{ transform: 'rotate(45deg)' }}/> Departure</div>
                        <span style={{ fontSize: '11px', backgroundColor: 'var(--surface-muted)', padding: '2px 8px', borderRadius: '12px', fontWeight: '500' }}>Pending</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{formData.schedules[0]?.departureDate ? new Date(formData.schedules[0].departureDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '--'}</div>
                          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{formData.depAirport?.toUpperCase() || 'KUL'}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '0 var(--space-4)' }}>
                           <span style={{ fontSize: '10px', color: 'var(--gray-500)' }}>9h 0m</span>
                           <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-strong)', position: 'relative', margin: '4px 0' }}>
                              <Plane size={10} style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', color: 'var(--gray-400)' }} />
                           </div>
                           <span style={{ fontSize: '10px', color: 'var(--gray-500)' }}>Transit -</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{formData.schedules[0]?.departureDate ? new Date(formData.schedules[0].departureDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '--'}</div>
                          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{formData.arrAirport?.toUpperCase() || 'JED'}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)', fontSize: '12px', color: 'var(--gray-600)' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><Plane size={14} color="var(--color-primary)" /> {formData.airline === 'mh' ? 'Malaysia Airlines - MH' : formData.airline}</div>
                         <div>PNR:-</div>
                      </div>
                    </div>
                    
                    {/* Return */}
                    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: '13px', fontWeight: '600' }}><Plane size={14} style={{ transform: 'rotate(-135deg)' }}/> Return</div>
                        <span style={{ fontSize: '11px', backgroundColor: 'var(--surface-muted)', padding: '2px 8px', borderRadius: '12px', fontWeight: '500' }}>Pending</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{formData.schedules[0]?.returnDate ? new Date(formData.schedules[0].returnDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '--'}</div>
                          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{formData.retDepAirport?.toUpperCase() || 'MED'}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '0 var(--space-4)' }}>
                           <span style={{ fontSize: '10px', color: 'var(--gray-500)' }}>9h 0m</span>
                           <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border-strong)', position: 'relative', margin: '4px 0' }}>
                              <Plane size={10} style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%) rotate(180deg)', color: 'var(--gray-400)' }} />
                           </div>
                           <span style={{ fontSize: '10px', color: 'var(--gray-500)' }}>Transit -</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{formData.schedules[0]?.returnDate ? new Date(formData.schedules[0].returnDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '--'}</div>
                          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{formData.retArrAirport?.toUpperCase() || 'KUL'}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-2)', fontSize: '12px', color: 'var(--gray-600)' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><Plane size={14} color="var(--color-primary)" /> {formData.airline === 'mh' ? 'Malaysia Airlines - MH' : formData.airline}</div>
                         <div>PNR:-</div>
                      </div>
                    </div>
                  </div>

                  {/* Hotel Section */}
                  <div style={{ borderTop: '4px solid var(--surface-muted)', padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 'bold' }}><Building size={16} color="var(--color-primary)" /> Hotel <span style={{ fontSize: '11px', color: 'var(--gray-500)', backgroundColor: 'var(--surface-muted)', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>0/2 Confirmed</span></div>
                      <ChevronUp size={16} color="var(--gray-400)" />
                    </div>
                    
                    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: 'var(--space-3)', display: 'flex', gap: 'var(--space-3)' }}>
                      <img src="https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                         <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                           <span style={{ fontSize: '10px', backgroundColor: 'var(--surface-muted)', padding: '2px 6px', borderRadius: '4px' }}>{formData.makkahNights || 0}N</span>
                           <span style={{ fontSize: '10px', backgroundColor: 'var(--surface-muted)', padding: '2px 6px', borderRadius: '4px' }}>Pending</span>
                         </div>
                         <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>{formData.makkahHotel === 'swiss' ? 'Swissotel Makkah' : formData.makkahHotel || 'Fairmont Makkah'}</div>
                         <div style={{ fontSize: '11px', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Star size={10} fill="#FBBF24" color="#FBBF24" /> 4.9</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><MapPin size={10} /> 150 m</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Calendar size={10} /> 1-4 Apr 2025</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><BedDouble size={10} /> Quad Room</span>
                         </div>
                      </div>
                    </div>

                    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: 'var(--space-3)', display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                      <img src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=600&q=80" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                         <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                           <span style={{ fontSize: '10px', backgroundColor: 'var(--surface-muted)', padding: '2px 6px', borderRadius: '4px' }}>{formData.madinahNights || 0}N</span>
                           <span style={{ fontSize: '10px', backgroundColor: 'var(--surface-muted)', padding: '2px 6px', borderRadius: '4px' }}>Pending</span>
                         </div>
                         <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>{formData.madinahHotel === 'pullman' ? 'Pullman Zamzam Madinah' : formData.madinahHotel || 'Pullman Zamzam'}</div>
                         <div style={{ fontSize: '11px', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Star size={10} fill="#FBBF24" color="#FBBF24" /> 4.9</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><MapPin size={10} /> 150 m</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Calendar size={10} /> 4-7 Apr 2025</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><BedDouble size={10} /> Quad Room</span>
                         </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" style={{ width: '100%', marginTop: 'var(--space-3)', fontSize: '12px' }}>👁️ Hotel Details</Button>
                  </div>

                  {/* Transport Section */}
                  <div style={{ borderTop: '4px solid var(--surface-muted)', padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 'bold' }}><Bus size={16} color="var(--color-primary)" /> Transport <span style={{ fontSize: '11px', color: 'var(--gray-500)', backgroundColor: 'var(--surface-muted)', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>Pending</span></div>
                      <ChevronUp size={16} color="var(--gray-400)" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <Bus size={16} color="var(--gray-500)" style={{ marginTop: '2px' }}/>
                        <div>
                          <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>Makkah Transport</div>
                          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{formData.makkahTransportType === 'bus' ? 'Bus' : formData.makkahTransportType}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <Bus size={16} color="var(--gray-500)" style={{ marginTop: '2px' }}/>
                        <div>
                          <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>Madinah Transport</div>
                          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{formData.madinahTransportType === 'bus' ? 'Bus' : formData.madinahTransportType}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', gridColumn: '1 / -1' }}>
                        <Bus size={16} color="var(--gray-500)" style={{ marginTop: '2px' }}/>
                        <div>
                          <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>Inter-city Transport</div>
                          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{formData.intercityTransportType === 'train' ? 'Haramain High Speed Railway' : formData.intercityTransportType === 'bus' ? 'Bus' : formData.intercityTransportType}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Benefit Section */}
                  <div style={{ borderTop: '4px solid var(--surface-muted)', padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontWeight: 'bold' }}><Gift size={16} color="var(--color-primary)" /> Benefit</div>
                      <ChevronUp size={16} color="var(--gray-400)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--gray-700)' }}>
                      {formData.features?.length > 0 ? formData.features.map((f: string, i: number) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><Check size={16} color="var(--color-success)" /> {f}</div>
                      )) : (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Train size={16} color="var(--gray-500)" /> High-Speed Train</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bus size={16} color="var(--gray-500)" /> Cold Weather Bus</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={16} color="var(--gray-500)" /> Mutawwif Services</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Building size={16} color="var(--gray-500)" /> Accommodation in Makkah, Madinah</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={16} color="var(--gray-500)" /> Tourist Visa</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Droplet size={16} color="var(--color-info)" /> Zamzam Water</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={16} color="var(--gray-500)" /> Free Umrah Course</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

      </div>
      
      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '0', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', zIndex: 10, boxShadow: 'var(--shadow-sm)' }}>
        <Button 
          variant="outline" 
          disabled={currentStep === 0}
          onClick={handlePrev}
          leftIcon={<ChevronLeft size={16} />}
        >
          Previous
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {isDraftSaved && <span className="text-caption text-muted">Draft saved {draftTime}</span>}
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('package-list')}>Cancel</Button>
            <Button variant="outline" onClick={() => handleSave(true)} leftIcon={<Save size={16} />}>Save as Draft</Button>
            {currentStep === steps.length - 1 ? (
              <Button onClick={() => handleSave(false)} leftIcon={<CheckCircle size={16} />}>Publish Package</Button>
            ) : (
              <Button onClick={handleNext}>Next Step</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
