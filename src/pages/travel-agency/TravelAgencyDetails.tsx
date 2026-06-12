// @ts-nocheck
import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Tabs } from '../../components/navigation/Tabs';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { Timeline } from '../../components/data-display/Timeline';
import { DataTable } from '../../components/data-display/DataTable';
import { SensitiveDataReveal } from '../../components/domain/SensitiveDataReveal';
import { ReviewHistoryPanel } from '../../components/domain/ReviewHistoryPanel';
import { RemarkPanel } from '../../components/domain/RemarkPanel';
import type { Remark } from '../../components/domain/RemarkPanel';
import { Edit2, Eye, EyeOff, FileText, CheckCircle, ChevronRight } from 'lucide-react';
import { useDataFilter } from '../../hooks/useDataFilter';

import { useLocalStorageCrud } from '../../hooks/useLocalStorageCrud';

export const TravelAgencyDetails: React.FC<{ navigate: (route: string, data?: any) => void, agencyId?: string }> = ({ navigate, agencyId }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { getById } = useLocalStorageCrud('travel-agencies');
  
  const [remarks, setRemarks] = useState<Remark[]>([
    { id: '1', author: 'System', timestamp: '10 Nov 2026', content: 'Agency account verified automatically via MOTAC integration.', priority: 'normal', category: 'compliance' }
  ]);

  const handleAddRemark = (content: string, priority: string, category: string) => {
    setRemarks(prev => [{
      id: String(Date.now()),
      author: 'Admin User',
      timestamp: 'Just now',
      content,
      priority: priority as any,
      category
    }, ...prev]);
  };

  const agency = getById(agencyId || '') || {
    id: agencyId || 'TA-001',
    name: 'Unknown Agency',
    status: 'Inactive',
    rating: 0,
    reviews: 0,
    logo: '',
    type: '',
    licenseCategory: '',
    officeType: '',
    location: '',
    ssm: '',
    motac: '',
    validityEnd: ''
  };

  const usersData = [
    { id: '1', name: 'Ahmad Abdullah', role: 'PIC / Owner', email: 'ahmad@albarakah.my', status: 'Active' },
    { id: '2', name: 'Siti Sarah', role: 'Operations Manager', email: 'sara@albarakah.my', status: 'Active' },
  ];

  const jamaahData = [
    { id: 'J-101', name: 'Zulkifli Ibrahim', trip: 'TRP-1001', status: 'Paid' },
    { id: 'J-102', name: 'Aisyah Rahman', trip: 'TRP-1001', status: 'Partial' },
  ];

  const packagesData = [
    { id: 'PKG-101', name: 'Premium Umrah 10 Days', season: 'Ramadan 2027', status: 'Active', capacity: '45/50' },
    { id: 'PKG-102', name: 'Standard Umrah 12 Days', season: 'Syawal 2027', status: 'Draft', capacity: '0/40' },
  ];

  const operationsData = [
    { id: 'TRP-1001', name: 'Group Trip 1', departure: '10 Dec 2026', mutawwif: 'Ustaz Azhar', status: 'Confirmed' },
    { id: 'TRP-1002', name: 'Group Trip 2', departure: '15 Jan 2027', mutawwif: 'Pending', status: 'Planning' },
  ];

  const renderProfileTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)', flexShrink: 0, backgroundColor: 'var(--surface-sunken)' }}>
          <img src={agency.logo} alt={agency.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Agency Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
            <div><div className="text-caption text-muted">Type</div><div className="text-body-medium">{agency.type || 'Travel Agency'}</div></div>
            <div><div className="text-caption text-muted">License Category</div><div className="text-body-medium">{agency.licenseCategory || 'Umrah/Ziarah'}</div></div>
            <div><div className="text-caption text-muted">Office Type</div><div className="text-body-medium">{agency.officeType || 'Head Office'}</div></div>
            <div><div className="text-caption text-muted">Location</div><div className="text-body-medium">{agency.location || 'Kuala Lumpur, MY'}</div></div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Compliance & Legal Documents</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
          <div style={{ marginBottom: 'var(--space-2)' }}>
            <SensitiveDataReveal
              label="SSM Number"
              realValue={agency.ssm || "201901004455"}
              maskedValue={agency.ssm ? `••••••••${agency.ssm.slice(-4)}` : "••••••••4455"}
            />
          </div>
          <div style={{ marginBottom: 'var(--space-2)' }}>
            <SensitiveDataReveal
              label="MOTAC License"
              realValue={agency.motac || "KPK/LN: 9988"}
              maskedValue={agency.motac ? `KPK/LN: ••••` : "KPK/LN: ••••"}
            />
          </div>
          <div>
            <div className="text-caption text-muted">License Expiry</div>
            <div className="text-body-medium">{agency.validityEnd || '31 Dec 2027'}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
          <Button variant="secondary" size="sm" leftIcon={<FileText size={16} />}>View SSM</Button>
          <Button variant="secondary" size="sm" leftIcon={<FileText size={16} />}>View MOTAC</Button>
        </div>
      </section>
    </div>
  );

  const renderUsersTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="sm">Invite Employee</Button>
      </div>
      <DataTable 
        data={usersData}
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Role', accessor: 'role' },
          { header: 'Email', accessor: 'email' },
          { header: 'Status', accessor: (row) => <Badge variant="success">{row.status}</Badge> }
        ]}
      />
    </div>
  );

  const renderJamaahTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <DataTable 
        data={jamaahData}
        columns={[
          { header: 'Jamaah Name', accessor: 'name' },
          { header: 'Group Trip', accessor: 'trip' },
          { header: 'Payment Status', accessor: (row) => <Badge variant={row.status === 'Paid' ? 'success' : 'warning'}>{row.status}</Badge> }
        ]}
      />
    </div>
  );

  const renderPackagesTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <DataTable 
        data={packagesData}
        columns={[
          { header: 'Package ID', accessor: 'id' },
          { header: 'Package Name', accessor: 'name' },
          { header: 'Season', accessor: 'season' },
          { header: 'Status', accessor: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'neutral'}>{row.status}</Badge> },
          { header: 'Capacity', accessor: 'capacity' }
        ]}
      />
    </div>
  );

  const renderOperationsTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <DataTable 
        data={operationsData}
        columns={[
          { header: 'Trip ID', accessor: 'id' },
          { header: 'Trip Name', accessor: 'name' },
          { header: 'Departure', accessor: 'departure' },
          { header: 'Mutawwif', accessor: 'mutawwif' },
          { header: 'Status', accessor: (row) => <Badge variant={row.status === 'Confirmed' ? 'primary' : 'warning'}>{row.status}</Badge> }
        ]}
      />
    </div>
  );

  const renderFinanceTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section style={{ backgroundColor: 'var(--surface-sunken)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Settlement / Bank Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
          <div><div className="text-caption text-muted">Bank Name</div><div className="text-body-medium">Maybank Islamic</div></div>
          <div><div className="text-caption text-muted">Account Holder</div><div className="text-body-medium">Al-Barakah Travel Sdn Bhd</div></div>
          <div>
            <SensitiveDataReveal
              label="Account Number"
              realValue="1560 1234 5678"
              maskedValue="•••• •••• 5678"
            />
          </div>
        </div>
      </section>
    </div>
  );

  const renderLogsTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Activity Logs</h3>
        <Timeline items={[
          { id: '1', title: 'Agency Details Updated', description: 'Admin Jane updated the phone number.', timestamp: '1 day ago', status: 'info' },
          { id: '2', title: 'Agency Activated', description: 'Application approved by Super Admin.', timestamp: '2 years ago', status: 'success' }
        ]} />
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Application Review History</h3>
        <ReviewHistoryPanel history={[
          { id: '1', reviewer: 'Ahmad Operations', date: '01 Jan 2024', status: 'approved', notes: 'All documents verified and MOTAC is active.' },
          { id: '2', reviewer: 'Sarah Compliance', date: '28 Dec 2023', status: 'revision', notes: 'SSM document is blurred. Please reupload.' }
        ]} />
      </section>

      <section>
        <h3 className="text-section-title" style={{ marginBottom: 'var(--space-4)' }}>Internal Remarks</h3>
        <RemarkPanel remarks={remarks} onAddRemark={handleAddRemark} />
      </section>
    </div>
  );
  


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      <PageHeader 
        title={agency.name} 
        breadcrumbs={[
          { label: 'Travel Agency Management' }, 
          { label: 'List', onClick: () => navigate('ta-list') },
          { label: 'Details' }
        ]}
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <Badge variant="success">{agency.status}</Badge>
            <Button leftIcon={<Edit2 size={16} />} onClick={() => navigate('ta-edit', { agencyId: agency.id })}>
              Edit Agency
            </Button>
          </div>
        }
      />

      <Tabs 
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { id: 'profile', label: 'Profile' },
          { id: 'users', label: 'Users & Team' },
          { id: 'jamaah', label: 'Jamaah & Mutawwif' },
          { id: 'packages', label: 'Packages & Group Trips' },
          { id: 'operations', label: 'Operations' },
          { id: 'finance', label: 'Finance' },
          { id: 'logs', label: 'Quality & Logs' },
        ]}
      />

      <div style={{ padding: 'var(--space-4) 0' }}>
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'jamaah' && renderJamaahTab()}
        {activeTab === 'packages' && renderPackagesTab()}
        {activeTab === 'operations' && renderOperationsTab()}
        {activeTab === 'finance' && renderFinanceTab()}
        {activeTab === 'logs' && renderLogsTab()}
      </div>
    </div>
  );
};
