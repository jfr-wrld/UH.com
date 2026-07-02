import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { HeroHeader } from '../../../components/layout/HeroHeader';
import { Tabs } from '../../../components/navigation/Tabs';
import { Button } from '../../../components/actions/Button';
import { Badge } from '../../../components/data-display/Badge';
import { ArrowLeft, Star, Briefcase, MapPin, CheckCircle2, AlertTriangle, CalendarDays, Activity } from 'lucide-react';

interface TAMutawwifDetailsProps {
  navigate: (path: string, state?: any) => void;
  mutawwifId?: string;
}

export const TAMutawwifDetails: React.FC<TAMutawwifDetailsProps> = ({ navigate, mutawwifId }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'schedule', label: 'Schedule & Assignments' },
    { id: 'documents', label: 'Documents & Certificates' },
    { id: 'reviews', label: 'Reviews & Ratings' }
  ];

  useEffect(() => {
    if (mutawwifId) {
      fetchMutawwif();
    }
  }, [mutawwifId]);

  const fetchMutawwif = async () => {
    try {
      setLoading(true);
      // For now, fetch all and filter since we don't have a specific GET /id route yet
      const response = await fetch('http://localhost:3001/api/ta/mutawwif');
      const all = await response.json();
      const found = all.find((m: any) => m.id === mutawwifId);
      setData(found);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading mutawwif details...</div>;
  }

  if (!data) {
    return <div className="p-8 text-center">Mutawwif not found.</div>;
  }

  const renderOverview = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
      <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Languages</h3>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {data.languages.map((l: string) => {
                const langMap: Record<string, string> = {
                  'ar': 'Arabic',
                  'ms': 'Malay',
                  'en': 'English',
                  'id': 'Indonesian'
                };
                return <Badge key={l} variant="neutral">{langMap[l.toLowerCase()] || l.toUpperCase()}</Badge>;
              })}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Specializations</h3>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {data.specializations.map((s: string) => (
                <Badge key={s} variant="info">
                  {s.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-6)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)' }}>
        <h3 className="text-subsection-title mb-4">Current & Upcoming Assignments</h3>
        {data.currentAssignments && data.currentAssignments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {data.currentAssignments.map((assignment: any) => (
              <div key={assignment.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                  <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)' }}>
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <h4 className="text-body-bold">{assignment.tripName}</h4>
                    <p className="text-caption text-muted">{assignment.startDate} to {assignment.endDate}</p>
                  </div>
                </div>
                <Badge variant={assignment.status === 'active' ? 'success' : 'neutral'} className="capitalize">{assignment.status}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">No upcoming assignments.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <HeroHeader
        title={<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{data.title} {data.name}</span>}
        onBack={() => navigate('ta-mutawwif-list')}
        backLabel="Back to Mutawwif List"
        avatarUrl={`https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random&color=fff&size=80`}
        badges={[
          <Badge key="1" variant={data.availability === 'conflict' ? 'warning' : 'success'} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
            {data.availability === 'conflict' ? 'Schedule Conflict' : 'Available'}
          </Badge>,
          <Badge key="2" variant="neutral" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={14} style={{ color: 'var(--color-warning)', fill: 'var(--color-warning)' }} /> 
            {data.rating} ({data.reviewCount} reviews)
          </Badge>
        ]}
        subtitle={
          <span style={{ opacity: 0.9, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="capitalize"><Briefcase size={16}/> {data.jobType}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={16}/> {data.country}</span>
          </span>
        }
        actions={
          <Button variant="secondary" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>Edit Mutawwif</Button>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div style={{ marginTop: 'var(--space-2)' }}>
        {activeTab === 'overview' && renderOverview()}
        
        {['schedule', 'documents', 'reviews'].includes(activeTab) && (
          <div style={{ backgroundColor: 'var(--surface-base)', padding: 'var(--space-8)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-default)', textAlign: 'center' }}>
            <Activity size={40} style={{ color: 'var(--gray-300)', marginBottom: 'var(--space-3)' }} />
            <h3 className="text-subsection-title">{tabs.find(t => t.id === activeTab)?.label}</h3>
            <p className="text-body text-muted" style={{ marginTop: 'var(--space-2)' }}>This section contains {activeTab} data mapped from the PRD.</p>
          </div>
        )}
      </div>
    </div>
  );
};
