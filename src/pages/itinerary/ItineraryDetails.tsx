import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Button } from '../../components/actions/Button';
import { AuditLogPanel } from '../../components/domain/AuditLogPanel';
import { MapPin, Clock, Calendar as CalendarIcon, FileText, Globe, MessageSquare, Eye, ChevronRight } from 'lucide-react';
import { StatusTransitionMenu } from '../../components/domain/StatusTransitionMenu';
import { useDataFilter } from '../../hooks/useDataFilter';

export const ItineraryDetails: React.FC<{ navigate: (route: string, data?: any) => void, itineraryId?: string }> = ({ navigate, itineraryId = 'it_1' }) => {
  const [status, setStatus] = useState('Draft');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Itinerary Data
  const itinerary = {
    id: itineraryId,
    name: 'Premium Umrah 12D/10N',
    type: 'Umrah',
    duration: '12D / 10N',
    status: status,
    owner: 'Global Template',
    visibility: 'Available for Package',
    totalActivities: 35,
    localTz: 'Malaysia (GMT+8)',
    destTz: 'Saudi Arabia (GMT+3)',
    destTz: 'Saudi Arabia (GMT+3)',
    description: 'A comprehensive 12-day Umrah itinerary with 4 days in Madinah and 6 days in Makkah.',
    createdBy: 'Admin User',
    lastUpdated: '10 May 2026, 14:30',
    totalDays: 12,
    ownerAgency: 'Global Template'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
    { id: 'schedule', label: 'Schedule' },
    { id: 'usage', label: 'Usage' },
    { id: 'feedback', label: 'Feedback Summary' },
    { id: 'logs', label: 'Activity Logs' },
  ];
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    hasActiveFilters,
    filteredData
  } = useDataFilter(tabs);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <h1 className="text-page-title">{itinerary.name}</h1>
            <StatusTransitionMenu currentStatus={status} onTransition={setStatus} allowedTransitions={['Draft', 'Active', 'Archived', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'Scheduled', 'Upcoming', 'Under Review', 'Published']} />
            <Badge variant="primary">{itinerary.owner}</Badge>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--text-muted)' }}>
            <span className="text-body">{itinerary.duration}</span>
            <span>•</span>
            <span className="text-body">{itinerary.totalActivities} Activities</span>
            <span>•</span>
            <span className="text-body">{itinerary.visibility}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => navigate('itinerary-list')}>Back to List</Button>
          <Button>Edit Template</Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Template Metadata</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Type</span>
                  <span className="text-body">{itinerary.type}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Duration</span>
                  <span className="text-body">{itinerary.duration}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Total Days</span>
                  <span className="text-body">{itinerary.totalDays}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Owner Agency</span>
                  <span className="text-body">{itinerary.ownerAgency}</span>
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Description</span>
                <p className="text-body" style={{ lineHeight: '1.5' }}>{itinerary.description}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 className="text-subsection-title">Configuration</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Created By</span>
                  <span className="text-body">{itinerary.createdBy}</span>
                </div>
                <div>
                  <span className="text-caption text-muted" style={{ display: 'block' }}>Last Updated</span>
                  <span className="text-body">{itinerary.lastUpdated}</span>
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Time Zones</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <Globe size={14} className="text-muted" />
                    <span className="text-body">Local: {itinerary.localTz}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <MapPin size={14} className="text-muted" />
                    <span className="text-body">Dest: {itinerary.destTz}</span>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-caption text-muted" style={{ display: 'block' }}>Feedback Settings</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <MessageSquare size={14} className="text-success" />
                  <span className="text-body">Daily Feedback Enabled</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="text-subsection-title">Itinerary Timeline</h3>
              <Button variant="secondary" size="sm">Expand All Days</Button>
            </div>
            
            {/* Mock Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              
              {/* Day 1 */}
              <div style={{ border: 'none', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body-bold">Day 1: Departure & Arrival</span>
                  <span className="text-caption text-muted">3 Activities</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  
                  {/* Activity 1 */}
                  <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '80px', marginTop: 'var(--space-1)' }}>
                      <span className="text-body-bold">08:00</span>
                      <span className="text-caption text-muted">Local</span>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-sunken)', border: 'none' }}>
                        <span style={{ fontSize: '18px' }}>🛫</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="text-body-bold">Gather at KLIA 1</span>
                          <Badge variant="primary">Participant Visible</Badge>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                          <MapPin size={14} className="text-muted" />
                          <span className="text-caption text-muted">Kuala Lumpur International Airport</span>
                        </div>
                        <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                          <span className="text-caption-bold" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Participant Description</span>
                          <span className="text-body text-muted">Briefing and check-in process. Please arrive 4 hours before departure time.</span>
                        </div>
                        <div style={{ padding: 'var(--space-3)', border: '1px dashed var(--color-warning-default)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}>
                          <span className="text-caption-bold text-warning" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Internal Instructions</span>
                          <span className="text-body text-muted">Ensure all passports and visas are collected. Distribute ID cards to jamaah.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity 2 */}
                  <div style={{ padding: 'var(--space-4)', display: 'flex', gap: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '80px', marginTop: 'var(--space-1)' }}>
                      <span className="text-body-bold">14:00</span>
                      <span className="text-caption text-muted">Local</span>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--surface-sunken)', border: 'none' }}>
                        <span style={{ fontSize: '18px' }}>✈️</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="text-body-bold">Flight Departure (SV 831)</span>
                          <Badge variant="primary">Participant Visible</Badge>
                        </div>
                        <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                          <span className="text-caption-bold" style={{ display: 'block', marginBottom: 'var(--space-1)' }}>Participant Description</span>
                          <span className="text-body text-muted">Direct flight to Jeddah. Enjoy your flight.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Day 2 */}
              <div style={{ border: 'none', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-3) var(--space-4)', display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-body-bold">Day 2: First Umrah</span>
                  <span className="text-caption text-muted">4 Activities</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <h3 className="text-subsection-title">Template Usage</h3>
            <p className="text-body text-muted">This template is currently used by the following packages and group trips. Group trips use a snapshot of this template and will not be affected by future edits.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <FileText className="text-primary" />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="text-body-bold">Package: Premium Umrah Dec</span>
                    <span className="text-caption text-muted">Active • Assigned on 15 May 2026</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View Package</Button>
              </div>

              <div style={{ padding: 'var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <CalendarIcon className="text-warning" />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="text-body-bold">Group Trip: TRP-1001 (Snapshot)</span>
                    <span className="text-caption text-muted">Upcoming • Created on 01 Jun 2026</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View Trip</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
            <p className="text-body text-muted">Aggregated feedback from group trips using this template will appear here. Powered by Testimonial Management.</p>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <AuditLogPanel 
              logs={[
                { id: '1', timestamp: '1 day ago', actor: 'Admin User', action: 'Published Template', module: 'Itinerary', details: 'Status changed to Active' },
                { id: '2', timestamp: '2 days ago', actor: 'Admin User', action: 'Added Activity', module: 'Itinerary', details: 'Added Ziyarah to Day 3' },
                { id: '3', timestamp: '1 week ago', actor: 'Admin User', action: 'Created Itinerary', module: 'Itinerary', details: 'Draft created' }
              ]}
            />
          </div>
        )}

      </div>
    </div>
  );
};
