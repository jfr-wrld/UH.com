import React, { useState } from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { MetricCard } from '../../../components/data-display/MetricCard';
import { Tabs } from '../../../components/navigation/Tabs';
import { FileWarning, PlaneTakeoff, ShieldCheck, Users } from 'lucide-react';
import { TADocumentList } from './TADocumentList';
import { TAServiceList } from './TAServiceList';

export const TADocumentDashboard: React.FC<{ navigate: (route: string, data?: any) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('documents');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader
        title="Documents & Services"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <MetricCard title="Total Members Tracked" value="150" icon={<Users />} />
        <MetricCard title="Ready Members" value="45" icon={<ShieldCheck />} />
        <MetricCard title="Pending Documents" value="32" icon={<FileWarning />} trend="down" trendValue="-5 since yesterday" />
        <MetricCard title="Pending Services" value="18" icon={<PlaneTakeoff />} />
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', boxShadow: 'var(--shadow-sm)' }}>
        <Tabs
          tabs={[
            { id: 'documents', label: 'By Documents' },
            { id: 'services', label: 'By Services' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        
        <div style={{ marginTop: 'var(--space-4)' }}>
          {activeTab === 'documents' && <TADocumentList />}
          {activeTab === 'services' && <TAServiceList />}
        </div>
      </div>
    </div>
  );
};
