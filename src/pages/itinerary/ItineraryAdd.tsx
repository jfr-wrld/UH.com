import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { Button } from '../../components/actions/Button';
import { Plus, Trash2, GripVertical, Settings, MessageSquare } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

export const ItineraryAdd: React.FC<{ navigate: (route: string, data?: any) => void, showToast?: (title: string, desc?: string, variant?: 'success'|'error'|'warning'|'info') => void }> = ({ navigate, showToast  }) => {
  const [durationDays, setDurationDays] = useState(0);
  const [days, setDays] = useState<any[]>([]);

  const handleGenerateDays = () => {
    if (durationDays > 0) {
      const newDays = Array.from({ length: durationDays }, (_, i) => ({
        id: `day_${i + 1}`,
        dayNumber: i + 1,
        title: '',
        activities: []
      }));
      setDays(newDays);
    }
  };

  const addActivity = (dayIndex: number) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities.push({
      id: `act_${Date.now()}`,
      name: '',
      time: '',
      icon: 'default'
    });
    setDays(updatedDays);
  };
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(updatedDays);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title="Create Itinerary Template"
        breadcrumbs={[{ label: 'Home' }, { label: 'Itineraries', onClick: () => navigate('itinerary-list') }, { label: 'Create' }]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success'); navigate('itinerary-list'); }}>Cancel</Button>
            <Button variant="secondary" onClick={() => navigate('itinerary-list')}>Save as Draft</Button>
            <Button onClick={() => { if(showToast) showToast('Success', 'Action completed successfully', 'success');  navigate('itinerary-list'); }}>Publish Template</Button>
          </div>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 800px)', gap: 'var(--space-6)' }}>
        
        {/* Template Info */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <h2 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Template Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <FormField label="Template Name" required>
              <Input placeholder="e.g. Premium Umrah 12D/10N" />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Type" required>
                <Select options={[{value: 'umrah', label: 'Umrah'}, {value: 'haji', label: 'Haji'}, {value: 'custom', label: 'Custom'}]} value="" onChange={() => {}} placeholder="Select type" />
              </FormField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                <FormField label="Duration Days" required>
                  <Input type="number" placeholder="Days" value={durationDays} onChange={(e) => setDurationDays(parseInt(e.target.value) || 0)} />
                </FormField>
                <FormField label="Nights">
                  <Input type="number" placeholder="Nights" />
                </FormField>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Owner Scope" required>
                <Select options={[{value: 'global', label: 'Global Template'}, {value: 'agency', label: 'Travel Agency'}]} value="global" onChange={() => {}} />
              </FormField>
              <FormField label="Owner Agency">
                <Select options={[{value: 'a1', label: 'Travel Agency A'}, {value: 'a2', label: 'Travel Agency B'}]} value="" placeholder="Select Agency" onChange={() => {}} />
              </FormField>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Status" required>
                <Select options={[{value: 'draft', label: 'Draft'}, {value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}]} value="draft" onChange={() => {}} />
              </FormField>
              <FormField label="Visibility" required>
                <Select options={[{value: 'available', label: 'Available for Package'}, {value: 'internal', label: 'Internal'}, {value: 'private', label: 'Private Draft'}]} value="available" onChange={() => {}} />
              </FormField>
            </div>
            <FormField label="Description">
              <textarea 
                className="input-base" 
                placeholder="Short internal description (Max 500 characters)" 
                rows={3} 
                style={{ width: '100%', resize: 'vertical' }} 
              />
            </FormField>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer', marginTop: 'var(--space-2)' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
              <div>
                <span className="text-body-bold" style={{ display: 'block' }}>Available for Package</span>
                <span className="text-caption text-muted">Enable to make this itinerary selectable when creating/editing packages.</span>
              </div>
            </label>
          </div>
        </section>

        {/* Schedule Builder */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2 className="text-section-title">Schedule Builder</h2>
            <Button variant="secondary" size="sm" onClick={handleGenerateDays}>Generate Days</Button>
          </div>

          {days.length === 0 ? (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-default)' }}>
              <p className="text-body text-muted">Enter duration and click Generate Days to create the schedule.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {days.map((day, dIdx) => (
                <div key={day.id} style={{ border: 'none', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  
                  {/* Day Header */}
                  <div style={{ backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-4)', borderBottom: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <GripVertical size={16} className="text-muted" style={{ cursor: 'grab' }} />
                      <span className="text-body-bold" style={{ whiteSpace: 'nowrap' }}>Day {day.dayNumber}</span>
                      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                        <Input placeholder="Day Title / Focus (e.g. Departure, Ihram, Ziyarah)" style={{ height: '36px' }} />
                        <Input placeholder="Location (e.g. Malaysia, Makkah, Madinah)" style={{ height: '36px' }} />
                      </div>
                    </div>
                    <div style={{ paddingLeft: 'calc(16px + var(--space-3) + 40px)' }}>
                      <textarea 
                        className="input-base" 
                        placeholder="Day Notes (Optional, max 500 characters)" 
                        rows={2} 
                        style={{ width: '100%', resize: 'vertical' }} 
                      />
                    </div>
                  </div>

                  {/* Day Activities */}
                  <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {day.activities.map((act: any, aIdx: number) => (
                      <div key={act.id} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', padding: 'var(--space-4)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}>
                        <GripVertical size={16} className="text-muted" style={{ cursor: 'grab', marginTop: 'var(--space-2)' }} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '120px 150px 1fr 1fr', gap: 'var(--space-3)' }}>
                            <FormField label="Time">
                              <Input type="time" />
                            </FormField>
                            <FormField label="Time Display Mode">
                              <Select options={[{value: 'local', label: 'Local Time'}, {value: 'dest', label: 'Destination Time'}, {value: 'both', label: 'Both'}]} value="local" onChange={() => {}} />
                            </FormField>
                            <FormField label="Activity Icon">
                              <Select options={[{value: 'departure', label: '🛫 Departure'}, {value: 'hotel', label: '🏨 Hotel'}, {value: 'umrah', label: '🕋 Umrah'}]} placeholder="Select Icon" value="" onChange={() => {}} />
                            </FormField>
                            <FormField label="Activity Location">
                              <Input placeholder="Overrides day location" />
                            </FormField>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                            <FormField label="Activity Name" required>
                              <Input placeholder="e.g. Gather at Airport" />
                            </FormField>
                            <FormField label="Visibility">
                              <Select options={[{value: 'participant', label: 'Participant Visible'}, {value: 'internal', label: 'Internal Only'}]} value="participant" onChange={() => {}} />
                            </FormField>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                            <FormField label="Short Description">
                              <textarea className="input-base" placeholder="Participant-facing summary" rows={2} style={{ width: '100%', resize: 'vertical' }} />
                            </FormField>
                            <FormField label="Instructions">
                              <textarea className="input-base" placeholder="Operational instructions" rows={2} style={{ width: '100%', resize: 'vertical' }} />
                            </FormField>
                          </div>
                        </div>
                        <button style={{ marginTop: 'var(--space-1)', border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer', padding: 'var(--space-2)' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" leftIcon={<Plus size={16} />} onClick={() => addActivity(dIdx)} style={{ width: 'fit-content' }}>
                      Add Activity
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Time Zone Settings */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <Settings size={20} className="text-primary" />
            <h2 className="text-section-title">Time Zone Settings</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField label="Local Timezone" required>
              <Select options={[{value: 'my', label: 'Malaysia (GMT+8)'}, {value: 'id', label: 'Indonesia (GMT+7)'}]} value="my" onChange={() => {}} />
            </FormField>
            <FormField label="Destination Timezone" required>
              <Select options={[{value: 'sa', label: 'Saudi Arabia (GMT+3)'}]} value="sa" onChange={() => {}} />
            </FormField>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer', marginTop: 'var(--space-4)' }}>
            <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
            <div>
              <span className="text-body-bold" style={{ display: 'block' }}>Auto Convert Times</span>
              <span className="text-caption text-muted">Automatically calculate and display destination times for participants.</span>
            </div>
          </label>
        </section>

        {/* Feedback Settings */}
        <section style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <MessageSquare size={20} className="text-primary" />
            <h2 className="text-section-title">Feedback Settings</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px' }} />
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Enable Feedback Collection</span>
                  <span className="text-caption text-muted">Allow participants to rate this itinerary daily.</span>
                </div>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px' }} disabled />
                <div>
                  <span className="text-body-bold" style={{ display: 'block' }}>Anonymous Feedback</span>
                  <span className="text-caption text-muted">Requires feedback collection to be enabled.</span>
                </div>
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
              <FormField label="Feedback Visibility">
                <Select options={[{value: 'admin', label: 'Admin Only'}, {value: 'internal', label: 'Internal'}, {value: 'agency', label: 'Agency'}]} value="admin" onChange={() => {}} disabled />
              </FormField>
              <FormField label="Feedback Type">
                <Select options={[{value: 'day', label: 'Day-level'}, {value: 'activity', label: 'Activity-level'}]} value="day" onChange={() => {}} disabled />
              </FormField>
            </div>

            <FormField label="Feedback Prompt" style={{ marginTop: 'var(--space-2)' }}>
              <textarea 
                className="input-base" 
                placeholder="Custom prompt for feedback (Optional, Max 300 characters)" 
                rows={2} 
                style={{ width: '100%', resize: 'vertical' }} 
                disabled
              />
            </FormField>
          </div>
        </section>

      </div>
    </div>
  );
};
