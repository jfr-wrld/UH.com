import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { FileUploader } from '../../components/inputs/FileUploader';
import { Button } from '../../components/actions/Button';
import { Modal } from '../../components/feedback/Modal';
import { Stepper } from '../../components/navigation/Stepper';
import { RichTextEditor } from '../../components/inputs/RichTextEditor';
import { Plus, Trash2, Calendar, Map, BedDouble, Plane, DollarSign, Image as ImageIcon, FileText, Edit, CheckCircle, Save, ChevronLeft, ArrowLeft, Building, Bus, ChevronUp, ChevronDown, GripVertical, Gift, Heart, Star, Users, Flame, MapPin, Check, Train, User, Droplet, BookOpen, PlaneTakeoff, PlaneLanding, Clock, Package } from 'lucide-react';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const TAPackageCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void, packageId?: string }> = ({ navigate, showToast  }) => {
  const { create, data } = useLocalStorageCrud<any>('package');
  const [showErrors, setShowErrors] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [draftTime, setDraftTime] = useState('');
  
  const [selectedPackageToCopy, setSelectedPackageToCopy] = useState<string>('');

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { id: '1', label: 'Basic Info' },
    { id: '2', label: 'Accommodation & Logistics' },
    { id: '3', label: 'Itinerary Planning' },
    { id: '4', label: 'Terms & Policies' },
    { id: '5', label: 'Gallery & Media' },
    { id: '6', label: 'Preview & Publish' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    agency: 'Al-Hijrah Travel',
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
    itineraryDays: [
      {
        id: 'day_1',
        dayNumber: 1,
        title: 'Departure',
        location: 'Kuala Lumpur',
        isExpanded: true,
        activities: [
          { id: 'act_1', name: 'Departure from KLIA 1', time: '10:00 PM', icon: 'PlaneTakeoff', description: 'KLIA to Jeddah on MAS AMAL' }
        ]
      },
      {
        id: 'day_2',
        dayNumber: 2,
        title: 'Arrive',
        location: 'Makkah',
        isExpanded: true,
        activities: [
          { id: 'act_2', name: 'Arrival at Jeddah', time: '5:00 AM', icon: 'PlaneLanding', description: 'Arrival at King Abdulaziz Airport' },
          { id: 'act_3', name: 'Transfer to Makkah', time: '7:00 AM', icon: 'Bus', description: 'Bus transfer to hotel in Makkah' }
        ]
      }
    ],
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
    forceMajeurePolicy: '',
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
      agency: 'Al-Hijrah Travel',
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
      itineraryDays: [
        {
          id: 'day_1',
          dayNumber: 1,
          title: 'Departure',
          location: 'Kuala Lumpur',
          isExpanded: true,
          activities: [
            { id: 'act_1', name: 'Departure from KLIA 1', time: '10:00 PM', icon: 'PlaneTakeoff', description: 'KLIA to Jeddah on MAS AMAL' }
          ]
        },
        {
          id: 'day_2',
          dayNumber: 2,
          title: 'Arrive',
          location: 'Makkah',
          isExpanded: true,
          activities: [
            { id: 'act_2', name: 'Arrival at Jeddah', time: '5:00 AM', icon: 'PlaneLanding', description: 'Arrival at King Abdulaziz Airport' },
            { id: 'act_3', name: 'Transfer to Makkah', time: '7:00 AM', icon: 'Bus', description: 'Bus transfer to hotel in Makkah' }
          ]
        },
        {
          id: 'day_3',
          dayNumber: 3,
          title: 'Umrah',
          location: 'Makkah',
          isExpanded: false,
          activities: [
            { id: 'act_4', name: 'First Umrah', time: '8:00 AM', icon: 'Users', description: 'Guided Umrah with Mutawwif' }
          ]
        }
      ],
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
      refundPolicy: 'Refunds will be processed within 14-21 working days.',
      amendmentPolicy: 'Name changes allowed up to 30 days prior to departure for RM 200 fee.',
      forceMajeurePolicy: 'In the event of sudden visa suspension by Saudi Govt, packages will be postponed to the next available date.',
      disclaimers: 'Prices are subject to change without prior notice.',
      thumbnailUrl: '/images/makkah.jpg',
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
      navigate('ta-package-list');
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

  const handleApplyPolicies = () => {
    if (!selectedPackageToCopy) return;

    if (selectedPackageToCopy === 'template_standard') {
      updateForm('cancellationPolicy', '<p>Cancellation 45 days prior to departure: 100% refund minus RM 1,000 admin fee.</p><p>Cancellation 30 days prior: 50% refund.</p><p>Cancellation within 30 days: Non-refundable.</p>');
      updateForm('refundPolicy', '<p>Refund processing requires 14-30 working days upon receipt of the official cancellation letter and management approval.</p>');
      updateForm('amendmentPolicy', '<p>Name changes are permitted up to 30 days before departure subject to an RM 500 amendment fee.</p><p>Rescheduling will be subject to the latest package pricing adjustments.</p>');
      updateForm('forceMajeurePolicy', '<p>In the event of visa suspension by the Saudi Government or flight restrictions by MOTAC / Malaysian Government, the departure will be rescheduled without additional charges. <strong>No cash refunds will be provided.</strong></p>');
      updateForm('disclaimers', '<p>Umrah Visa approval is strictly the prerogative of the Saudi Embassy. Non-refundable visa costs apply for rejected applications.</p><p>Excess baggage beyond 30kg is strictly the passenger\'s responsibility.</p>');
      if (showToast) showToast('Success', 'Standard MOTAC Template applied successfully', 'success');
      return;
    }

    if (selectedPackageToCopy === 'template_premium') {
      updateForm('cancellationPolicy', '<p>Cancellation 60 days prior to departure: 100% refund.</p><p>Cancellation 30 days prior: 75% refund.</p><p>Cancellation within 30 days: Non-refundable (Exceptions made for severe medical reasons supported by official medical records).</p>');
      updateForm('refundPolicy', '<p>Priority Lane: Refund processing is expedited to a maximum of 7 working days.</p>');
      updateForm('amendmentPolicy', '<p>Complimentary name changes up to 15 days before departure. Rescheduling is free of charge for the first request.</p>');
      updateForm('forceMajeurePolicy', '<p>Comprehensive travel insurance covering Force Majeure is included. Funds can be refunded 100% in cash or rescheduled according to the passenger\'s preference.</p>');
      updateForm('disclaimers', '<p>This package includes VIP baggage handling (up to 40kg). Any visa rejection will be actively appealed by our legal team.</p>');
      if (showToast) showToast('Success', 'Premium Template applied successfully', 'success');
      return;
    }

    const pkg = data.find((p: any) => p.id === selectedPackageToCopy);
    if (pkg) {
      updateForm('cancellationPolicy', pkg.cancellationPolicy || '<p>Policy not defined in this package.</p>');
      updateForm('refundPolicy', pkg.refundPolicy || '<p>Policy not defined in this package.</p>');
      updateForm('amendmentPolicy', pkg.amendmentPolicy || '<p>Policy not defined in this package.</p>');
      updateForm('forceMajeurePolicy', pkg.forceMajeurePolicy || '<p>Policy not defined in this package.</p>');
      updateForm('disclaimers', pkg.disclaimers || '<p>Policy not defined in this package.</p>');
      if (showToast) showToast('Copied Successfully', `Policies copied from ${pkg.name}`, 'success');
    }
  };

  const addItineraryDay = () => {
    const newDay = {
      id: `day_${Math.random().toString(36).substring(2, 9)}`,
      dayNumber: formData.itineraryDays.length + 1,
      title: 'New Day',
      location: formData.itineraryDays.length > 0 ? formData.itineraryDays[formData.itineraryDays.length - 1].location : 'Makkah',
      isExpanded: true,
      activities: []
    };
    updateForm('itineraryDays', [...formData.itineraryDays, newDay]);
  };

  const removeItineraryDay = (dayId: string) => {
    const newDays = formData.itineraryDays.filter(d => d.id !== dayId).map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
    updateForm('itineraryDays', newDays);
  };

  const updateItineraryDay = (dayId: string, field: string, value: any) => {
    updateForm('itineraryDays', formData.itineraryDays.map(d => d.id === dayId ? { ...d, [field]: value } : d));
  };

  const addActivity = (dayId: string) => {
    const newActivity = {
      id: `act_${Math.random().toString(36).substring(2, 9)}`,
      name: 'New Activity',
      time: '12:00 PM',
      icon: 'Check',
      description: ''
    };
    updateForm('itineraryDays', formData.itineraryDays.map(d => d.id === dayId ? { ...d, activities: [...d.activities, newActivity] } : d));
  };

  const removeActivity = (dayId: string, actId: string) => {
    updateForm('itineraryDays', formData.itineraryDays.map(d => d.id === dayId ? { ...d, activities: d.activities.filter(a => a.id !== actId) } : d));
  };

  const updateActivity = (dayId: string, actId: string, field: string, value: any) => {
    updateForm('itineraryDays', formData.itineraryDays.map(d => d.id === dayId ? { ...d, activities: d.activities.map(a => a.id === actId ? { ...a, [field]: value } : a) } : d));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader 
        title="Create New Package"
        breadcrumbs={[{ label: 'Home' }, { label: 'Packages', onClick: () => navigate('ta-package-list') }, { label: 'Create Package' }]}
        actions={
          <Button variant="secondary" onClick={handleFillExample} leftIcon={<Edit size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={handleStepClick} />

        {currentStep === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            {/* Section 1: Basic Info */}
            <section>
              <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Basic Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
                  <FormField label="Package Code">
                    <Input placeholder="Auto-generated (e.g. PKG-UMR-26-001)" disabled />
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
                <div key={schedule.id} style={{ padding: 'var(--space-4)', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }}>
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
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Map size={20} className="text-primary" />
                  <h2 className="text-section-title">Itinerary Planning</h2>
                </div>
                <span className="text-body text-muted">Itinerary Template: <span className="text-body-bold text-neutral">Premium Umrah 7D6N</span></span>
              </div>
              
              {/* Configuration Summary Box */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4)', backgroundColor: '#F0F9FF', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', border: '1px solid #BAE6FD' }}>
                <div>
                  <h4 className="text-body-bold" style={{ color: '#0369A1' }}>Current Package Configuration</h4>
                  <p className="text-caption" style={{ color: '#0284C7' }}>This configuration filters suitable itinerary templates.</p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
                  <div style={{ textAlign: 'center' }}><div className="text-caption text-muted">Package Category</div><div className="text-body-bold">{formData.category}</div></div>
                  <div style={{ textAlign: 'center' }}><div className="text-caption text-muted">Total Days</div><div className="text-body-bold">{formData.makkahNights + formData.madinahNights + 1} Days</div></div>
                  <div style={{ textAlign: 'center' }}><div className="text-caption text-muted">Total Nights</div><div className="text-body-bold">{formData.makkahNights + formData.madinahNights} Nights</div></div>
                  <div style={{ textAlign: 'center' }}><div className="text-caption text-muted">Makkah Nights</div><div className="text-body-bold">{formData.makkahNights} Nights</div></div>
                  <div style={{ textAlign: 'center' }}><div className="text-caption text-muted">Madinah Nights</div><div className="text-body-bold">{formData.madinahNights} Nights</div></div>
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-6)' }}>
                <FormField label="Select Itinerary Template">
                  <Select options={[{value: 'tmpl_1', label: 'Premium Umrah 7D6N'}, {value: 'tmpl_2', label: 'Standard Umrah 12D10N'}]} value={formData.itineraryTemplate} onChange={(e) => updateForm('itineraryTemplate', e.target.value)} />
                </FormField>
              </div>

              {/* Days List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {formData.itineraryDays.map((day, dIdx) => (
                  <div key={day.id} style={{ border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', backgroundColor: 'var(--surface-base)' }}>
                    {/* Day Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flex: 1 }}>
                        <GripVertical size={16} className="text-muted" style={{ cursor: 'grab' }} />
                        <span className="text-body-bold" style={{ minWidth: '60px' }}>Day {day.dayNumber}:</span>
                        <div style={{ width: '200px' }}>
                          <Select 
                            options={[{value: 'Departure', label: 'Departure'}, {value: 'Arrive', label: 'Arrive'}, {value: 'Umrah', label: 'Umrah'}, {value: 'Ziarah', label: 'Ziarah'}, {value: 'Free & Easy', label: 'Free & Easy'}]} 
                            value={day.title} 
                            onChange={(e) => updateItineraryDay(day.id, 'title', e.target.value)} 
                          />
                        </div>
                        <div style={{ width: '200px' }}>
                          <Select 
                            options={[{value: 'Kuala Lumpur', label: 'Kuala Lumpur'}, {value: 'Makkah', label: 'Makkah'}, {value: 'Madinah', label: 'Madinah'}, {value: 'Jeddah', label: 'Jeddah'}]} 
                            value={day.location} 
                            onChange={(e) => updateItineraryDay(day.id, 'location', e.target.value)} 
                          />
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div onClick={() => removeItineraryDay(day.id)} style={{ cursor: 'pointer', padding: '4px', backgroundColor: '#FEF2F2', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                          <Trash2 size={16} color="#DC2626" />
                        </div>
                        <div onClick={() => updateItineraryDay(day.id, 'isExpanded', !day.isExpanded)} style={{ cursor: 'pointer', padding: '4px' }}>
                          {day.isExpanded ? <ChevronUp size={20} className="text-muted" /> : <ChevronDown size={20} className="text-muted" />}
                        </div>
                      </div>
                    </div>

                    {/* Activities List */}
                    {day.isExpanded && (
                      <div style={{ marginTop: 'var(--space-4)', paddingLeft: 'var(--space-6)' }}>
                        <h5 className="text-body-bold" style={{ marginBottom: 'var(--space-3)' }}>Activities</h5>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                          {day.activities.map((act, aIdx) => (
                            <div key={act.id} style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', position: 'relative' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                                <GripVertical size={14} className="text-muted" style={{ cursor: 'grab' }} />
                                <span className="text-body-bold">Activity {aIdx + 1}</span>
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div onClick={() => removeActivity(day.id, act.id)} style={{ cursor: 'pointer', padding: '4px', backgroundColor: '#FEF2F2', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                                    <Trash2 size={14} color="#DC2626" />
                                  </div>
                                  <ChevronUp size={16} className="text-muted" style={{ cursor: 'pointer' }} />
                                </div>
                              </div>
                              
                              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                                <FormField label="Activity Name">
                                  <Input value={act.name} onChange={(e) => updateActivity(day.id, act.id, 'name', e.target.value)} />
                                </FormField>
                                <FormField label="Time">
                                  <Input value={act.time} onChange={(e) => updateActivity(day.id, act.id, 'time', e.target.value)} />
                                </FormField>
                                <FormField label="Select Icon">
                                  <Select 
                                    options={[
                                      {value: 'PlaneTakeoff', label: 'Departure'}, 
                                      {value: 'PlaneLanding', label: 'Arrival'}, 
                                      {value: 'Bus', label: 'Bus Transfer'}, 
                                      {value: 'Users', label: 'Group Meeting'}, 
                                      {value: 'Check', label: 'Check-in'}
                                    ]} 
                                    value={act.icon} 
                                    onChange={(e) => updateActivity(day.id, act.id, 'icon', e.target.value)} 
                                  />
                                </FormField>
                              </div>
                              <FormField label="Short Description">
                                <textarea className="input-base" rows={2} value={act.description} onChange={(e) => updateActivity(day.id, act.id, 'description', e.target.value)} style={{ width: '100%', minWidth: '100%', resize: 'vertical' }} />
                              </FormField>
                            </div>
                          ))}
                        </div>

                        <Button variant="secondary" size="sm" onClick={() => addActivity(day.id)} leftIcon={<Plus size={14} />} style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>Add Activity</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'var(--space-6)' }}>
                 <Button variant="secondary" onClick={addItineraryDay} leftIcon={<Plus size={16} />}>Add Day</Button>
              </div>

            </section>
          </div>
        )}

        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
            {/* Section 8: Terms */}
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <FileText size={20} className="text-primary" />
                  <h2 className="text-section-title">Terms & Policies</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ width: '280px' }}>
                    <Select 
                      options={[
                        { value: '', label: 'Select template/package...' },
                        { value: 'template_standard', label: 'Standard MOTAC Template', icon: <FileText size={14} /> },
                        { value: 'template_premium', label: 'Premium Policy Template', icon: <Star size={14} /> },
                        ...data.map((pkg: any) => ({ value: pkg.id, label: `${pkg.code || 'Draft'} - ${pkg.name}`, icon: <Package size={14} /> }))
                      ]} 
                      value={selectedPackageToCopy}
                      onChange={(e) => setSelectedPackageToCopy(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleApplyPolicies} disabled={!selectedPackageToCopy}>Apply Template</Button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <FormField label="Cancellation Policy" required error={showErrors && !formData.cancellationPolicy ? 'Required' : undefined}>
                  <RichTextEditor minHeight="150px" value={formData.cancellationPolicy} onChange={(val) => updateForm('cancellationPolicy', val)} placeholder="Fokus ke hangusnya tiket/land arrangement..." />
                </FormField>
                <FormField label="Refund Policy">
                  <RichTextEditor minHeight="150px" value={formData.refundPolicy} onChange={(val) => updateForm('refundPolicy', val)} placeholder="Fokus ke persentase potongan berdasarkan H- minus keberangkatan..." />
                </FormField>
                <FormField label="Amendment Policy">
                  <RichTextEditor minHeight="150px" value={formData.amendmentPolicy} onChange={(val) => updateForm('amendmentPolicy', val)} placeholder="Fokus ke ganti nama jamaah, ganti paspor, atau pindah tanggal..." />
                </FormField>
                <FormField label="Force Majeure & Govt Regulation">
                  <RichTextEditor minHeight="150px" value={formData.forceMajeurePolicy} onChange={(val) => updateForm('forceMajeurePolicy', val)} placeholder="Fokus ke regulasi Saudi/Kemenag..." />
                </FormField>
                <FormField label="General Disclaimers" style={{ gridColumn: '1 / -1' }}>
                  <RichTextEditor minHeight="150px" value={formData.disclaimers} onChange={(val) => updateForm('disclaimers', val)} placeholder="Fokus ke visa non-reguler, bagasi, dll..." />
                </FormField>
              </div>
            </section>
          </div>
        )}

        {currentStep === 4 && (
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

        {currentStep === 5 && (
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
                    <img src={formData.thumbnailUrl || '/images/makkah.jpg'} alt="Package" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/images/makkah.jpg'; }} />
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
                        <img src={formData.thumbnailUrl || '/images/makkah.jpg'} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} onError={(e) => { e.currentTarget.src = '/images/makkah.jpg'; }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                         <img src="/images/madinah.jpg" style={{ width: '100%', height: '66px', objectFit: 'cover', borderRadius: '8px' }} />
                         <img src="/images/masjid-nabawi.jpg" style={{ width: '100%', height: '66px', objectFit: 'cover', borderRadius: '8px' }} />
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
                      <img src="/images/makkah.jpg" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
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
                      <img src="/images/madinah.jpg" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
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
                    
                    <Button variant="secondary" style={{ width: '100%', marginTop: 'var(--space-3)', fontSize: '12px' }}>👁️ Hotel Details</Button>
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
          variant="secondary" 
          disabled={currentStep === 0}
          onClick={handlePrev}
          leftIcon={<ChevronLeft size={16} />}
        >
          Previous
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {isDraftSaved && <span className="text-caption text-muted">Draft saved {draftTime}</span>}
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('ta-package-list')}>Cancel</Button>
            <Button variant="secondary" onClick={() => handleSave(true)} leftIcon={<Save size={16} />}>Save as Draft</Button>
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
