import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { BedDouble, CheckCircle, ChevronLeft, ChevronRight, Save, UserPlus, BadgeCheck, CheckCircle2, Users, Plane, Crown, Star, Moon, Snowflake, Sprout, Sun, Flame, AlertTriangle, Wand2, Clock, MapPin, Building, User, Baby, UploadCloud, Link as LinkIcon, CreditCard, FileText, Image as ImageIcon, Copy } from 'lucide-react';
import { Stepper } from '../../components/navigation/Stepper';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const BookingCreate: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success' | 'error' | 'warning' | 'info') => void }> = ({ navigate, showToast }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [draftTime, setDraftTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('pkg1');
  const [paymentOption, setPaymentOption] = useState('deposit');

  const [paxAdult, setPaxAdult] = useState(1);
  const [paxChild, setPaxChild] = useState(0);
  const [paxInfant, setPaxInfant] = useState(0);
  const [extraBed, setExtraBed] = useState(0);

  const [selectedAirline, setSelectedAirline] = useState('mh');
  const [selectedSchedule, setSelectedSchedule] = useState('sch1');

  const [primaryBooker, setPrimaryBooker] = useState({ name: '', email: '', phone: '', ic: '' });

  const [activeTab, setActiveTab] = useState<string>('Jan');

  const [flightClass, setFlightClass] = useState({ economy: 1, business: 0, first: 0 });

  const [roomAdults, setRoomAdults] = useState({ quint: 0, quad: 0, triple: 0, double: 0 });
  const [roomChildren, setRoomChildren] = useState({ quint: 0, quad: 0, triple: 0, double: 0 });

  const chargeablePax = paxAdult + paxChild;
  const totalPax = chargeablePax + paxInfant;
  const totalFlights = flightClass.economy + flightClass.business + flightClass.first;
  const totalRoomCapacity =
    (roomAdults.quint + roomChildren.quint) * 5 +
    (roomAdults.quad + roomChildren.quad) * 4 +
    (roomAdults.triple + roomChildren.triple) * 3 +
    (roomAdults.double + roomChildren.double) * 2;

  const packages: Record<string, any> = {
    pkg1: {
      name: 'Premium Umrah Safar (v2.1)',
      image: '/images/makkah.jpg',
      duration: '12 Days',
      locations: 'Makkah & Madinah',
      hotel: '5 Star Hotels',
      airline: 'Emirates (EK)',
      hotelName: 'Zamzam Tower',
      price: 'RM 12,000'
    },
    pkg2: {
      name: 'Economy Plus Umrah (Ramadan)',
      image: '/images/makkah.jpg',
      duration: '14 Days',
      locations: 'Makkah & Madinah',
      hotel: '4 Star Hotels',
      airline: 'Saudia (SV)',
      hotelName: 'Al Kiswah',
      price: 'RM 9,500'
    },
    pkg3: {
      name: 'VIP Ziarah Makkah Madinah',
      image: '/images/makkah.jpg',
      duration: '10 Days',
      locations: 'Makkah, Madinah & Taif',
      hotel: '5 Star Hotels (VIP)',
      airline: 'Qatar Airways (QR)',
      hotelName: 'Dar Al Tawhid',
      price: 'RM 18,500'
    }
  };

  const { create } = useLocalStorageCrud('booking');

  const steps = [
    { id: '1', label: 'Package & Schedule' },
    { id: '2', label: 'Participants' },
    { id: '3', label: 'Flight Preferences' },
    { id: '4', label: 'Room Preferences' },
    { id: '5', label: 'Payment' },
    { id: '6', label: 'Review & Submit' }
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

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    setDraftTime('just now');
    
    create({
      code: `BK-D-${Math.floor(Math.random() * 10000)}`,
      customer: primaryBooker.name ? `${primaryBooker.name} (Draft)` : 'Unnamed Draft',
      agency: 'Zamzam Travels',
      package: packages[selectedPackage]?.name || 'Premium Umrah Safar',
      price: `RM ${calculateTotal().toLocaleString()}`,
      status: 'Draft',
      payment: 'Unpaid',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    });

    if (showToast) showToast('Draft Saved', 'Your progress has been saved as a draft.', 'info');
    setTimeout(() => {
      setDraftTime('1 minute ago');
    }, 60000);
  };

  const fillExampleData = () => {
    setSelectedPackage('pkg2');
    setSelectedAirline('sv');
    setSelectedSchedule('sch2');
    setPaxAdult(2);
    setPaxChild(2);
    setPaxInfant(1);
    setExtraBed(1);
    setFlightClass({ economy: 4, business: 0, first: 0 });
    setRoomAdults({ quint: 0, quad: 1, triple: 0, double: 0 });
    setRoomChildren({ quint: 0, quad: 0, triple: 0, double: 0 });
    setPrimaryBooker({ name: 'Ahmad Hassan', email: 'ahmad.h@example.com', phone: '123456789', ic: '880101-10-1234' });
    setPaymentOption('full');
    setCurrentStep(steps.length - 1);
    if (showToast) showToast('Example Data Filled', 'Form has been populated with dummy data.', 'success');
  };

  const calculateTotal = () => {
    let total = 0;
    total += roomAdults.quint * 9590;
    total += roomAdults.quad * 9990;
    total += roomAdults.triple * 10490;
    total += roomAdults.double * 11490;

    total += roomChildren.quint * 8590;
    total += roomChildren.quad * 8990;
    total += roomChildren.triple * 9490;
    total += roomChildren.double * 10490;

    return total;
  };

  const handleSave = () => {
    if (!confirmed) {
      if (showToast) showToast('Verification Required', 'Please confirm the booking details before submitting.', 'warning');
      return;
    }
    if (!primaryBooker.name) {
      if (showToast) showToast('Booker Required', 'Primary Booker name must be filled.', 'warning');
      return;
    }
    create({
      code: `BK-${Math.floor(Math.random() * 10000)}`,
      customer: `${primaryBooker.name} (Family of ${chargeablePax})`,
      agency: 'Zamzam Travels',
      package: packages[selectedPackage]?.name || 'Premium Umrah Safar',
      price: `RM ${calculateTotal().toLocaleString()}`,
      status: paymentOption === 'manual' ? 'Pending Payment' : 'Confirmed',
      payment: paymentOption === 'full' ? 'Paid' : paymentOption === 'deposit' ? 'Partial' : paymentOption === 'installment' ? 'Partial' : 'Unpaid',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    });
    if (showToast) showToast('Success', 'Booking submitted successfully', 'success');
    navigate('booking-list');
  };

  const renderFilterBtn = (id: string, label: React.ReactNode, count: number) => {
    const isActive = activeTab === id;
    return (
      <Button
        key={id}
        variant="outline"
        size="sm"
        onClick={() => setActiveTab(id)}
        style={{ borderColor: isActive ? 'var(--color-primary)' : 'var(--gray-300)', color: isActive ? 'var(--color-primary)' : 'var(--gray-600)', backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>{label}</span>
        <span style={{ backgroundColor: isActive ? 'var(--color-primary)' : 'var(--gray-200)', color: isActive ? '#fff' : 'var(--gray-600)', padding: '2px 6px', borderRadius: '10px', marginLeft: '6px' }}>{count}</span>
      </Button>
    );
  };

  const renderScheduleItem = (id: string, title: string, status: string) => {
    const isSelected = selectedSchedule === id;
    return (
      <div
        key={id}
        onClick={() => setSelectedSchedule(id)}
        style={{ padding: 'var(--space-3)', border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--surface-base)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', border: isSelected ? '5px solid var(--color-primary)' : '1px solid var(--gray-400)' }}></div>
          <span className="text-body-bold" style={{ color: isSelected ? 'var(--color-primary-dark)' : 'inherit' }}>{title}</span>
        </div>
        <span className="text-caption text-muted">{status}</span>
      </div>
    );
  };

  const renderPackageSelection = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Package & Schedule Selection</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Travel Agency" required>
              <Select
                options={[
                  {
                    value: 'zamzam',
                    label: 'Zamzam Travels',
                    icon: <img src="https://ui-avatars.com/api/?name=Zamzam&background=10b981&color=fff" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} alt="Zamzam" />,
                    rightIcon: <BadgeCheck size={14} style={{ color: 'var(--color-primary)' }} />
                  },
                  {
                    value: 'nusantara',
                    label: 'Nusantara Holidays',
                    icon: <img src="https://ui-avatars.com/api/?name=Nusantara&background=3b82f6&color=fff" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} alt="Nusantara" />
                  }
                ]}
                defaultValue="zamzam"
                onChange={() => { }}
              />
            </FormField>
            <FormField label="Booking Source" required>
              <Select options={[{ value: 'admin', label: 'Admin Assisted' }]} defaultValue="admin" onChange={() => { }} />
            </FormField>
          </div>

          <FormField label="Package Selection" required>
            <Select
              options={[
                { value: 'pkg1', label: 'Premium Umrah Safar (v2.1)' },
                { value: 'pkg2', label: 'Economy Plus Umrah (Ramadan)' },
                { value: 'pkg3', label: 'VIP Ziarah Makkah Madinah' }
              ]}
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
            />
          </FormField>

          {selectedPackage && packages[selectedPackage] && (
            <div style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <img src={packages[selectedPackage].image} alt="Package Thumbnail" style={{ width: '110px', height: '110px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
                <div className="text-body-bold" style={{ fontSize: '18px', color: 'var(--color-text-strong)' }}>{packages[selectedPackage].name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-1)', flexWrap: 'wrap' }}>
                  <div className="text-caption text-muted" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} className="text-primary" /> {packages[selectedPackage].duration}
                  </div>
                  <div className="text-caption text-muted" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} className="text-danger" /> {packages[selectedPackage].locations}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-1)', flexWrap: 'wrap' }}>
                  <div className="text-caption text-muted" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plane size={14} className="text-success" /> {packages[selectedPackage].airline}
                  </div>
                  <div className="text-caption text-muted" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building size={14} className="text-warning" /> {packages[selectedPackage].hotelName} ({packages[selectedPackage].hotel})
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right', paddingLeft: 'var(--space-4)', borderLeft: '1px dashed var(--border-default)' }}>
                <div className="text-caption text-muted" style={{ marginBottom: '4px' }}>Starting from</div>
                <div className="text-body-bold text-primary" style={{ fontSize: '20px' }}>
                  {packages[selectedPackage].price}
                </div>
                <div className="text-caption text-muted" style={{ marginTop: '4px' }}>per pax</div>
              </div>
            </div>
          )}

          <div style={{ marginTop: 'var(--space-2)' }}>
            <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-3)' }}>Trip Schedules</h4>
            
            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <div style={{ width: '120px', flexShrink: 0 }}>
                  <Select options={[{value: '2025', label: '2025'}, {value: '2026', label: '2026'}]} defaultValue="2025" onChange={() => {}} />
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {renderFilterBtn('Jan', 'Jan', 3)}
                  {renderFilterBtn('Feb', 'Feb', 1)}
                  {renderFilterBtn('Mar', 'Mar', 1)}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-2)', borderTop: '1px dashed var(--border-default)', paddingTop: 'var(--space-3)' }}>
                <span className="text-caption text-muted" style={{ marginRight: 'var(--space-2)' }}>Filter by Category:</span>
                {renderFilterBtn('low', <><Sprout size={14} className="text-success" /> Low</>, 2)}
                {renderFilterBtn('mid', <><Sun size={14} className="text-warning" /> Mid</>, 4)}
                {renderFilterBtn('peak', <><Flame size={14} className="text-danger" /> Peak</>, 1)}
                {renderFilterBtn('ramadan', <><Moon size={14} style={{color: 'indigo'}} /> Ramadan</>, 2)}
                {renderFilterBtn('winter', <><Snowflake size={14} className="text-primary" /> Winter</>, 4)}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {activeTab === 'Jan' && (
                <>
                  {renderScheduleItem('sch1', 'Sun-Sat, 1-7 Jan 2025', 'TBA')}
                  {renderScheduleItem('sch2', 'Sun-Sat, 8-15 Jan 2025', 'TBA')}
                  {renderScheduleItem('sch3', 'Sun-Sat, 15-22 Jan 2025', 'Available')}
                </>
              )}
              {activeTab === 'Feb' && (
                <>
                  {renderScheduleItem('sch4', 'Sun-Sat, 1-7 Feb 2025', 'TBA')}
                </>
              )}
              {activeTab === 'Mar' && (
                <>
                  {renderScheduleItem('sch5', 'Sun-Sat, 1-7 Mar 2025', 'Available')}
                </>
              )}
              {activeTab === 'low' && (
                <>
                  {renderScheduleItem('sch6', 'Sun-Sat, 10-20 May 2025', 'Low Season Pricing')}
                  {renderScheduleItem('sch7', 'Sun-Sat, 22-30 May 2025', 'Low Season Pricing')}
                </>
              )}
              {activeTab === 'mid' && (
                <>
                  {renderScheduleItem('sch8', 'Sun-Sat, 1-10 Jun 2025', 'Available')}
                  {renderScheduleItem('sch9', 'Sun-Sat, 12-20 Jun 2025', 'Available')}
                  {renderScheduleItem('sch10', 'Sun-Sat, 22-30 Jun 2025', 'Available')}
                  {renderScheduleItem('sch11', 'Sun-Sat, 1-10 Jul 2025', 'Available')}
                </>
              )}
              {activeTab === 'peak' && (
                <>
                  {renderScheduleItem('sch12', 'Sun-Sat, 1-10 Aug 2025', 'High Demand')}
                </>
              )}
              {activeTab === 'ramadan' && (
                <>
                  {renderScheduleItem('sch13', 'Sun-Sat, 1-15 Ramadan 1447H', 'Available')}
                  {renderScheduleItem('sch14', 'Sun-Sat, 15-30 Ramadan 1447H', 'High Demand')}
                </>
              )}
              {activeTab === 'winter' && (
                <>
                  {renderScheduleItem('sch15', 'Sun-Sat, 1-10 Dec 2025', 'Available')}
                  {renderScheduleItem('sch16', 'Sun-Sat, 15-25 Dec 2025', 'Available')}
                  {renderScheduleItem('sch17', 'Sun-Sat, 26 Dec 2025 - 5 Jan 2026', 'High Demand')}
                  {renderScheduleItem('sch18', 'Sun-Sat, 10-20 Jan 2026', 'Available')}
                </>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );

  const renderParticipants = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 className="text-section-title">Passenger Quantities</h3>
          <span className="text-caption text-muted">Set global pax counts before assigning flight and room preferences.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', padding: 'var(--space-4)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-base)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <User size={16} className="text-muted" />
              <span className="text-body-bold">Adults (≥12 years)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '40px' }}>
              <button onClick={() => setPaxAdult(p => Math.max(1, p - 1))} disabled={paxAdult <= 1} style={{ width: '40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRight: '1px solid var(--gray-300)', backgroundColor: paxAdult <= 1 ? 'var(--gray-100)' : 'transparent', cursor: paxAdult <= 1 ? 'not-allowed' : 'pointer', color: paxAdult <= 1 ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '20px' }}>-</button>
              <input type="text" inputMode="numeric" value={paxAdult} onChange={(e) => setPaxAdult(Math.max(1, parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0))} style={{ flex: 1, textAlign: 'center', backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px', fontWeight: 'bold', width: '100%', color: 'var(--color-text-strong)' }} />
              <button onClick={() => setPaxAdult(p => p + 1)} style={{ width: '40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderLeft: '1px solid var(--gray-300)', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--color-text-strong)', fontSize: '20px' }}>+</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <User size={14} className="text-muted" />
              <span className="text-body-bold">Children (&lt;12 years)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '40px' }}>
              <button onClick={() => setPaxChild(p => Math.max(0, p - 1))} disabled={paxChild <= 0} style={{ width: '40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRight: '1px solid var(--gray-300)', backgroundColor: paxChild <= 0 ? 'var(--gray-100)' : 'transparent', cursor: paxChild <= 0 ? 'not-allowed' : 'pointer', color: paxChild <= 0 ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '20px' }}>-</button>
              <input type="text" inputMode="numeric" value={paxChild} onChange={(e) => setPaxChild(Math.max(0, parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0))} style={{ flex: 1, textAlign: 'center', backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px', fontWeight: 'bold', width: '100%', color: 'var(--color-text-strong)' }} />
              <button onClick={() => setPaxChild(p => p + 1)} style={{ width: '40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderLeft: '1px solid var(--gray-300)', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--color-text-strong)', fontSize: '20px' }}>+</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Baby size={16} className="text-muted" />
              <span className="text-body-bold">Infants (&lt;2 years)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '40px' }}>
              <button onClick={() => setPaxInfant(p => Math.max(0, p - 1))} disabled={paxInfant <= 0} style={{ width: '40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRight: '1px solid var(--gray-300)', backgroundColor: paxInfant <= 0 ? 'var(--gray-100)' : 'transparent', cursor: paxInfant <= 0 ? 'not-allowed' : 'pointer', color: paxInfant <= 0 ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '20px' }}>-</button>
              <input type="text" inputMode="numeric" value={paxInfant} onChange={(e) => setPaxInfant(Math.max(0, parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0))} style={{ flex: 1, textAlign: 'center', backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px', fontWeight: 'bold', width: '100%', color: 'var(--color-text-strong)' }} />
              <button onClick={() => setPaxInfant(p => p + 1)} style={{ width: '40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderLeft: '1px solid var(--gray-300)', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--color-text-strong)', fontSize: '20px' }}>+</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Primary Booker</h3>
        <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h4 className="text-body-bold">Booker Details</h4>
            <Button variant="secondary" size="sm" leftIcon={<UserPlus size={16} />}>Search / Invite Booker</Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Full Name" required><Input placeholder="E.g. Ahmad Hassan" value={primaryBooker.name} onChange={e => setPrimaryBooker(p => ({ ...p, name: e.target.value }))} /></FormField>
            <FormField label="Email" required><Input placeholder="E.g. ahmad@example.com" value={primaryBooker.email} onChange={e => setPrimaryBooker(p => ({ ...p, email: e.target.value }))} /></FormField>
            <FormField label="Phone Number" required>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Select options={[{ value: '+60', label: '+60 (MY)' }]} defaultValue="+60" onChange={() => { }} style={{ width: '120px' }} />
                <Input placeholder="E.g. 123456789" value={primaryBooker.phone} onChange={e => setPrimaryBooker(p => ({ ...p, phone: e.target.value }))} style={{ flex: 1 }} />
              </div>
            </FormField>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
            <FormField label="IC/Passport Number" required><Input placeholder="Identity number..." value={primaryBooker.ic} onChange={e => setPrimaryBooker(p => ({ ...p, ic: e.target.value }))} /></FormField>
            <FormField label="Address (Optional)"><Input placeholder="Full billing address..." /></FormField>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
            <FormField label="Booking Type" required>
              <Select options={[{ value: 'individual', label: 'Individual (Self)' }, { value: 'family', label: 'Family (With Dependents)' }, { value: 'group', label: 'Group (Multiple Families)' }]} defaultValue="family" onChange={() => { }} />
            </FormField>
            <FormField label="Family / Group Name (Optional)">
              <Input placeholder="e.g. Keluarga Haji Ahmad" />
            </FormField>
          </div>
        </div>
      </section>
    </div>
  );

  const renderFlightPreferences = () => {
    const totalSeats = flightClass.economy + flightClass.business + flightClass.first;
    const requiredSeats = paxAdult + paxChild;
    const seatMismatch = totalSeats !== requiredSeats;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 className="text-section-title">Flight Preferences</h3>
            <span className="text-caption text-muted">Required Seats: {requiredSeats} (Adults + Children)</span>
          </div>

          {seatMismatch && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', backgroundColor: '#fffbeb', borderRadius: 'var(--radius-md)', border: '1px solid #f59e0b', marginBottom: 'var(--space-4)' }}>
              <AlertTriangle size={18} color="#d97706" />
              <span className="text-body" style={{ color: '#b45309' }}>
                <strong>Capacity Mismatch:</strong> You have allocated {totalSeats} seats, but you have {requiredSeats} passengers requiring a flight seat.
              </span>
            </div>
          )}

          <div style={{ marginBottom: 'var(--space-2)' }}><span className="text-caption text-muted">Airlines</span></div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
            <div
              onClick={() => setSelectedAirline('mh')}
              style={{ border: selectedAirline === 'mh' ? '2px solid var(--color-primary)' : '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', width: '220px', cursor: 'pointer', backgroundColor: selectedAirline === 'mh' ? 'var(--color-primary-light)' : 'var(--surface-base)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <img src="https://ui-avatars.com/api/?name=MH&background=000&color=fff" style={{ width: 32, height: 32, borderRadius: '50%' }} alt="MH" />
                <div>
                  <div className="text-body-bold" style={{ color: selectedAirline === 'mh' ? 'var(--color-primary-dark)' : 'inherit' }}>Malaysia Airlines</div>
                  <div className="text-caption text-muted">Direct</div>
                </div>
              </div>
            </div>
            <div
              onClick={() => setSelectedAirline('ak')}
              style={{ border: selectedAirline === 'ak' ? '2px solid var(--color-primary)' : '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', width: '220px', cursor: 'pointer', backgroundColor: selectedAirline === 'ak' ? 'var(--color-primary-light)' : 'var(--surface-base)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <img src="https://ui-avatars.com/api/?name=AK&background=dc2626&color=fff" style={{ width: 32, height: 32, borderRadius: '50%' }} alt="AK" />
                <div>
                  <div className="text-body" style={{ color: selectedAirline === 'ak' ? 'var(--color-primary-dark)' : 'inherit', fontWeight: selectedAirline === 'ak' ? 600 : 'normal' }}>Air Asia</div>
                  <div className="text-caption text-muted">Transit: Dubai (DXB)</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}><span className="text-caption text-muted">Flight Class</span></div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
            <div style={{ border: '1px solid var(--color-primary)', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', width: '160px' }}>
              <div className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Plane size={16} className="text-primary" /> Economy</div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '36px', margin: 'var(--space-4) 0' }}>
                <button onClick={() => setFlightClass(p => ({...p, economy: Math.max(0, p.economy - 1)}))} disabled={flightClass.economy <= 0} style={{ width: '36px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRight: '1px solid var(--gray-300)', backgroundColor: flightClass.economy <= 0 ? 'var(--gray-100)' : 'transparent', cursor: flightClass.economy <= 0 ? 'not-allowed' : 'pointer', color: flightClass.economy <= 0 ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '18px' }}>-</button>
                <input type="text" inputMode="numeric" value={flightClass.economy} onChange={(e) => setFlightClass(p => ({...p, economy: Math.min(chargeablePax - p.business - p.first, Math.max(0, parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0))}))} style={{ flex: 1, textAlign: 'center', backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontWeight: 'bold', width: '100%', color: 'var(--color-text-strong)' }} />
                <button onClick={() => setFlightClass(p => ({...p, economy: p.economy + 1}))} disabled={totalFlights >= chargeablePax} style={{ width: '36px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderLeft: '1px solid var(--gray-300)', backgroundColor: totalFlights >= chargeablePax ? 'var(--gray-100)' : 'transparent', cursor: totalFlights >= chargeablePax ? 'not-allowed' : 'pointer', color: totalFlights >= chargeablePax ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '18px' }}>+</button>
              </div>
              <div style={{ textAlign: 'center' }}><span className="badge badge-success" style={{ width: '100%', justifyContent: 'center' }}>Included</span></div>
            </div>

            <div style={{ border: flightClass.business > 0 ? '2px solid var(--color-primary)' : '1px solid var(--gray-300)', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', width: '160px' }}>
              <div className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Crown size={16} className="text-warning" /> Business</div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '36px', margin: 'var(--space-4) 0' }}>
                <button onClick={() => setFlightClass(p => ({...p, business: Math.max(0, p.business - 1)}))} disabled={flightClass.business <= 0} style={{ width: '36px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRight: '1px solid var(--gray-300)', backgroundColor: flightClass.business <= 0 ? 'var(--gray-100)' : 'transparent', cursor: flightClass.business <= 0 ? 'not-allowed' : 'pointer', color: flightClass.business <= 0 ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '18px' }}>-</button>
                <input type="text" inputMode="numeric" value={flightClass.business} onChange={(e) => setFlightClass(p => ({...p, business: Math.min(chargeablePax - p.economy - p.first, Math.max(0, parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0))}))} style={{ flex: 1, textAlign: 'center', backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontWeight: 'bold', width: '100%', color: 'var(--color-text-strong)' }} />
                <button onClick={() => setFlightClass(p => ({...p, business: p.business + 1}))} disabled={totalFlights >= chargeablePax} style={{ width: '36px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderLeft: '1px solid var(--gray-300)', backgroundColor: totalFlights >= chargeablePax ? 'var(--gray-100)' : 'transparent', cursor: totalFlights >= chargeablePax ? 'not-allowed' : 'pointer', color: totalFlights >= chargeablePax ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '18px' }}>+</button>
              </div>
              <div style={{ textAlign: 'center' }}><span className="badge" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--color-text-neutral)', border: '1px solid var(--border-default)', width: '100%', justifyContent: 'center' }}>Requested</span></div>
            </div>

            <div style={{ border: flightClass.first > 0 ? '2px solid var(--color-primary)' : '1px solid var(--gray-300)', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', width: '160px' }}>
              <div className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={16} className="text-muted" /> First Class</div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '36px', margin: 'var(--space-4) 0' }}>
                <button onClick={() => setFlightClass(p => ({...p, first: Math.max(0, p.first - 1)}))} disabled={flightClass.first <= 0} style={{ width: '36px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRight: '1px solid var(--gray-300)', backgroundColor: flightClass.first <= 0 ? 'var(--gray-100)' : 'transparent', cursor: flightClass.first <= 0 ? 'not-allowed' : 'pointer', color: flightClass.first <= 0 ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '18px' }}>-</button>
                <input type="text" inputMode="numeric" value={flightClass.first} onChange={(e) => setFlightClass(p => ({...p, first: Math.min(chargeablePax - p.economy - p.business, Math.max(0, parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0))}))} style={{ flex: 1, textAlign: 'center', backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontWeight: 'bold', width: '100%', color: 'var(--color-text-strong)' }} />
                <button onClick={() => setFlightClass(p => ({...p, first: p.first + 1}))} disabled={totalFlights >= chargeablePax} style={{ width: '36px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderLeft: '1px solid var(--gray-300)', backgroundColor: totalFlights >= chargeablePax ? 'var(--gray-100)' : 'transparent', cursor: totalFlights >= chargeablePax ? 'not-allowed' : 'pointer', color: totalFlights >= chargeablePax ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '18px' }}>+</button>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span className="badge" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--color-text-neutral)', border: '1px solid var(--border-default)', width: '100%', justifyContent: 'center' }}>Request</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderRoomCard = (type: string, title: string, capacity: number, price: number, count: number, setCount: (val: any) => void, recommended = false) => {
    const isSelected = count > 0;
    const isPlusDisabled = totalRoomCapacity >= chargeablePax;
    return (
      <div style={{ border: recommended ? '2px solid var(--color-primary)' : isSelected ? '2px solid var(--color-primary)' : '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', minWidth: '150px', flex: '0 0 auto', backgroundColor: 'var(--surface-base)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <BedDouble size={18} className={recommended || isSelected ? "text-primary" : "text-muted"} style={{ color: recommended || isSelected ? 'var(--color-primary)' : 'var(--gray-500)' }} />
          {recommended && <span className="badge badge-success" style={{ fontSize: 10, padding: '2px 6px' }}>Included</span>}
        </div>
        <div className="text-body-bold" style={{ color: isSelected ? 'var(--color-primary-dark)' : 'inherit' }}>{title}</div>
        <div className="text-caption text-muted">{capacity} persons</div>
        <div className="text-body-bold" style={{ color: 'var(--color-primary)', marginTop: 'var(--space-2)' }}>RM {price.toLocaleString()}</div>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '36px', marginTop: 'var(--space-4)' }}>
          <button onClick={() => setCount((p: any) => Math.max(0, p - 1))} disabled={count <= 0} style={{ width: '36px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRight: '1px solid var(--gray-300)', backgroundColor: count <= 0 ? 'var(--gray-100)' : 'transparent', cursor: count <= 0 ? 'not-allowed' : 'pointer', color: count <= 0 ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '18px' }}>-</button>
          <input type="text" inputMode="numeric" value={count} onChange={(e) => setCount(Math.max(0, parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0))} style={{ flex: 1, textAlign: 'center', backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontWeight: 'bold', width: '100%', color: 'var(--color-text-strong)' }} />
          <button onClick={() => setCount((p: any) => p + 1)} disabled={isPlusDisabled} style={{ width: '36px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderLeft: '1px solid var(--gray-300)', backgroundColor: isPlusDisabled ? 'var(--gray-100)' : 'transparent', cursor: isPlusDisabled ? 'not-allowed' : 'pointer', color: isPlusDisabled ? 'var(--gray-400)' : 'var(--color-text-strong)', fontSize: '18px' }}>+</button>
        </div>
      </div>
    );
  };

  const renderRoomAndPricing = () => {

    const requiredBeds = chargeablePax;
    const roomMismatch = totalRoomCapacity < requiredBeds || totalRoomCapacity > requiredBeds + 2;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 className="text-section-title">Room Preferences</h3>
          </div>

          {roomMismatch && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', backgroundColor: '#fffbeb', borderRadius: 'var(--radius-md)', border: '1px solid #f59e0b', marginBottom: 'var(--space-4)' }}>
              <AlertTriangle size={18} color="#d97706" />
              <span className="text-body" style={{ color: '#b45309' }}>
                <strong>Capacity Mismatch:</strong> Your selected rooms accommodate {totalRoomCapacity} pax, but you have {requiredBeds} passengers (excluding infants). Please adjust room quantities.
              </span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Adults */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Users size={18} />
                  <h4 className="text-body-bold">Adults (≥12 years)</h4>
                </div>
                <span className="text-body text-muted">Total Adults: <span className="text-body-bold text-neutral">{paxAdult}</span></span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
                {renderRoomCard('quint', 'Quint', 5, 9590, roomAdults.quint, (f) => setRoomAdults(p => ({ ...p, quint: f(p.quint) })))}
                {renderRoomCard('quad', 'Quad', 4, 9990, roomAdults.quad, (f) => setRoomAdults(p => ({ ...p, quad: f(p.quad) })), true)}
                {renderRoomCard('triple', 'Triple', 3, 10490, roomAdults.triple, (f) => setRoomAdults(p => ({ ...p, triple: f(p.triple) })))}
                {renderRoomCard('double', 'Double', 2, 11490, roomAdults.double, (f) => setRoomAdults(p => ({ ...p, double: f(p.double) })))}
              </div>
            </div>

            {/* Children */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Users size={18} />
                  <h4 className="text-body-bold">Children (&lt;12 years)</h4>
                </div>
                <span className="text-body text-muted">Total Children: <span className="text-body-bold text-neutral">{paxChild}</span></span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
                {renderRoomCard('quint', 'Quint', 5, 8590, roomChildren.quint, (f) => setRoomChildren(p => ({ ...p, quint: f(p.quint) })))}
                {renderRoomCard('quad', 'Quad', 4, 8990, roomChildren.quad, (f) => setRoomChildren(p => ({ ...p, quad: f(p.quad) })), true)}
                {renderRoomCard('triple', 'Triple', 3, 9490, roomChildren.triple, (f) => setRoomChildren(p => ({ ...p, triple: f(p.triple) })))}
                {renderRoomCard('double', 'Double', 2, 10490, roomChildren.double, (f) => setRoomChildren(p => ({ ...p, double: f(p.double) })))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-6)' }}>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', width: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span className="text-body text-muted">Subtotal</span>
                <span className="text-body">RM {calculateTotal().toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-default)', paddingTop: 'var(--space-2)' }}>
                <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>Total Amount</span>
                <span className="text-body-bold" style={{ color: 'var(--color-primary-dark)' }}>RM {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderPayment = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Payment Options</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <FormField label="Payment Option" required>
            <Select
              options={[
                { value: 'full', label: 'Full Payment' },
                { value: 'deposit', label: 'Deposit Payment' },
                { value: 'installment', label: 'Installment Plan' },
                { value: 'manual', label: 'Manual Bank Transfer' }
              ]}
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
            />
          </FormField>

          {(paymentOption === 'deposit' || paymentOption === 'manual') && (
            <FormField label="Amount to Pay Now (RM)" required>
              <Input type="number" defaultValue="2000" />
            </FormField>
          )}

          {paymentOption === 'installment' && (
            <FormField label="Installment Plan" required>
              <Select options={[{ value: '3months', label: '3 Months (0% Interest)' }, { value: '6months', label: '6 Months (+2% Admin Fee)' }]} defaultValue="3months" onChange={() => { }} />
            </FormField>
          )}
        </div>

        {paymentOption === 'installment' && (
          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-2)' }}>Installment Schedule</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px dashed var(--border-default)' }}>
              <span className="text-body">Payment 1 (Today)</span>
              <span className="text-body-bold">RM {(calculateTotal() / 3).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px dashed var(--border-default)' }}>
              <span className="text-body">Payment 2 (15 Jan 2027)</span>
              <span className="text-body-bold">RM {(calculateTotal() / 3).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0' }}>
              <span className="text-body">Payment 3 (15 Feb 2027)</span>
              <span className="text-body-bold">RM {(calculateTotal() / 3).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        )}

        {paymentOption === 'manual' && (
          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-6)', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-md)', border: '2px dashed var(--gray-300)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
            <UploadCloud size={32} style={{ color: 'var(--gray-400)', margin: '0 auto var(--space-2) auto' }} />
            <h4 className="text-body-bold">Upload Proof of Payment</h4>
            <p className="text-caption text-muted">Drag and drop your receipt here, or click to browse files (JPG, PNG, PDF)</p>
          </div>
        )}

        {paymentOption !== 'manual' && (
          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-300)' }}>
            <h4 className="text-body-bold" style={{ marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><LinkIcon size={16} /> CHIP Payment Link Generation</h4>
            <p className="text-body text-muted" style={{ marginBottom: 'var(--space-4)' }}>A secure CHIP Payment Gateway link will be generated. You can share this directly with the customer via WhatsApp or Email to complete their payment.</p>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <input type="text" readOnly value="https://pay.chip.com.my/chk_8f92jK3" style={{ flex: 1, padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-neutral)' }} />
              <Button variant="secondary" leftIcon={<Copy size={16} />}>Copy Link</Button>
            </div>
          </div>
        )}

        <p className="text-caption text-muted" style={{ marginTop: 'var(--space-4)' }}>Submitting the booking will create an invoice reference. Actual payment verification happens in the Billing & Payment module or via manual Finance review in the Booking Details page.</p>
      </section>
    </div>
  );

  const renderPreview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)', paddingBottom: 'var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>Review & Finalize Booking</h3>
        
        {/* Modern Itinerary Ticket Layout */}
        <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-300)', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          {/* Header Image & Title */}
          <div style={{ padding: 'var(--space-6)', backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 100%), url(${packages[selectedPackage].image})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="badge" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', marginBottom: 'var(--space-3)', border: 'none', padding: '4px 10px' }}>{activeTab} 2026 Departure</span>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 var(--space-2) 0' }}>{packages[selectedPackage].name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', opacity: 0.9 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={16} /> {packages[selectedPackage].duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16} /> {packages[selectedPackage].locations}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 var(--space-2) 0', opacity: 0.8, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Amount</p>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0' }}>RM {calculateTotal().toLocaleString()}</h2>
            </div>
          </div>

          <div style={{ padding: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
            
            {/* Participants */}
            <div>
              <h4 className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', color: 'var(--color-text-strong)', borderBottom: '1px solid var(--gray-200)', paddingBottom: 'var(--space-2)' }}><Users size={18} className="text-primary" /> Passenger Details</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Adults (≥12 yrs)</span><span className="text-body-bold">{paxAdult} Pax</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Children (&lt;12 yrs)</span><span className="text-body-bold">{paxChild} Pax</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Infants</span><span className="text-body-bold text-success">{paxInfant} Pax (Free)</span>
                </li>
              </ul>
            </div>

            {/* Flight & Transport */}
            <div>
              <h4 className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', color: 'var(--color-text-strong)', borderBottom: '1px solid var(--gray-200)', paddingBottom: 'var(--space-2)' }}><Plane size={18} className="text-primary" /> Flight Configuration</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Airline</span><span className="text-body-bold">{packages[selectedPackage].airline}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Economy Seats</span><span className="text-body-bold">{flightClass.economy > 0 ? `${flightClass.economy} Seats` : '-'}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Premium Seats</span><span className="text-body-bold">{flightClass.business + flightClass.first > 0 ? `${flightClass.business + flightClass.first} Seats` : '-'}</span>
                </li>
              </ul>
            </div>

            {/* Rooms */}
            <div>
              <h4 className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', color: 'var(--color-text-strong)', borderBottom: '1px solid var(--gray-200)', paddingBottom: 'var(--space-2)' }}><Building size={18} className="text-primary" /> Accommodation</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Hotel Quality</span><span className="text-body-bold">{packages[selectedPackage].hotel}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Quad / Quint Rooms</span><span className="text-body-bold">{roomAdults.quad + roomChildren.quad + roomAdults.quint + roomChildren.quint > 0 ? roomAdults.quad + roomChildren.quad + roomAdults.quint + roomChildren.quint : '-'}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Double / Triple Rooms</span><span className="text-body-bold">{roomAdults.double + roomChildren.double + roomAdults.triple + roomChildren.triple > 0 ? roomAdults.double + roomChildren.double + roomAdults.triple + roomChildren.triple : '-'}</span>
                </li>
              </ul>
            </div>

            {/* Payment Details */}
            <div>
              <h4 className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', color: 'var(--color-text-strong)', borderBottom: '1px solid var(--gray-200)', paddingBottom: 'var(--space-2)' }}><CreditCard size={18} className="text-primary" /> Payment Details</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body text-muted">Payment Method</span><span className="text-body-bold" style={{ textTransform: 'capitalize' }}>{paymentOption.replace('manual', 'Manual Transfer')}</span>
                </li>
                {paymentOption === 'installment' && (
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-body text-muted">Upfront Today</span><span className="text-body-bold text-danger">RM {(calculateTotal() / 3).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </li>
                )}
                {paymentOption === 'manual' && (
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-body text-muted">Proof of Payment</span><span className="badge badge-success" style={{ fontSize: '10px' }}>Uploaded</span>
                  </li>
                )}
                {paymentOption !== 'manual' && (
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-body text-muted">Link Status</span><span className="badge badge-warning" style={{ fontSize: '10px' }}>Awaiting Payment</span>
                  </li>
                )}
              </ul>
            </div>

          </div>
        </div>
      </section>

      <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--surface-warning)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-warning)' }}>
        <label style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input type="checkbox" style={{ marginTop: '4px' }} checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
          <span className="text-body">I confirm that the booking information is accurate and ready for submission. I understand that any payment transactions are tracked separately.</span>
        </label>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minHeight: 'calc(100vh - 120px)' }}>
      <PageHeader
        title="Create Package Booking"
        subtitle="Create a new manual booking, select schedules, set room configurations and register payment options."
        breadcrumbs={[{ label: 'Home' }, { label: 'Bookings', onClick: () => navigate('booking-list') }, { label: 'Create' }]}
        actions={
          <Button variant="secondary" onClick={fillExampleData} leftIcon={<Wand2 size={16} />}>Fill Example</Button>
        }
      />

      <div style={{ backgroundColor: 'var(--surface-base)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', padding: 'var(--space-6)', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <Stepper steps={steps} currentStepIndex={currentStep} onStepClick={handleStepClick} />

        <div style={{ marginTop: 'var(--space-8)' }}>
          {currentStep === 0 && renderPackageSelection()}
          {currentStep === 1 && renderParticipants()}
          {currentStep === 2 && renderFlightPreferences()}
          {currentStep === 3 && renderRoomAndPricing()}
          {currentStep === 4 && renderPayment()}
          {currentStep === 5 && renderPreview()}
        </div>
      </div>

      {/* Sticky Footer */}
      <div style={{ marginTop: 'auto', position: 'sticky', bottom: '-32px', margin: 'auto -32px -32px -32px', backgroundColor: 'var(--surface-base)', borderTop: '1px solid var(--border-default)', padding: 'var(--space-4) var(--space-8)', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <Button
          variant="outline"
          disabled={currentStep === 0}
          onClick={() => { setCurrentStep(prev => prev - 1); window.scrollTo(0, 0); }}
          leftIcon={<ChevronLeft size={16} />}
        >
          Back
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          {isDraftSaved && <span className="text-caption text-muted">Draft saved {draftTime}</span>}
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => navigate('booking-list')}>Cancel</Button>
            <Button variant="outline" onClick={handleSaveDraft} leftIcon={<Save size={16} />}>Save Draft</Button>
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={currentStep === steps.length - 1 && !confirmed}
              rightIcon={currentStep === steps.length - 1 ? undefined : <ChevronRight size={16} />}
              leftIcon={currentStep === steps.length - 1 ? <CheckCircle size={16} /> : undefined}
            >
              {currentStep === steps.length - 1 ? 'Submit Booking' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
