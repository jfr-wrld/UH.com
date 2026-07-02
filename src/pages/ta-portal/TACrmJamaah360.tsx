import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Tabs } from '../../components/navigation/Tabs';
import { Badge } from '../../components/data-display/Badge';
import { Button } from '../../components/actions/Button';
import { DataTable } from '../../components/data-display/DataTable';
import { Timeline } from '../../components/data-display/Timeline';
import { AttachmentList } from '../../components/data-display/AttachmentList';
import { 
  User, MapPin, Phone, Mail, FileText, CheckCircle, Clock, AlertTriangle, 
  MessageSquare, Briefcase, CreditCard
} from 'lucide-react';

interface TACrmJamaah360Props {
  navigate: (path: string, state?: any) => void;
  jamaahId?: string;
}

export const TACrmJamaah360: React.FC<TACrmJamaah360Props> = ({ navigate, jamaahId }) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Dummy data
  const jamaahInfo = {
    id: jamaahId || '1',
    name: 'Ahmad Fauzi',
    phone: '+62 812-3456-7890',
    email: 'ahmad.fauzi@example.com',
    address: 'Jl. Melati No. 15, Jakarta Selatan',
    status: 'active',
    registeredDate: '2026-01-15'
  };

  const bookingHistory = [
    { id: 'BK-1002', package: 'Umrah Plus Turki', date: '2026-06-25', status: 'pending_review', paymentStatus: 'pending_proof' },
    { id: 'BK-0501', package: 'Umrah Reguler 9 Hari', date: '2024-10-10', status: 'completed', paymentStatus: 'paid' },
  ];

  const documentVault = [
    { id: 'doc-1', name: 'Passport.pdf', type: 'Passport', status: 'verified', size: '2.4 MB', updatedAt: '2026-06-26' },
    { id: 'doc-2', name: 'Visa_Application.pdf', type: 'Visa', status: 'need_revision', size: '1.1 MB', updatedAt: '2026-06-27' },
    { id: 'doc-3', name: 'Vaccine_Meningitis.jpg', type: 'Vaccine', status: 'pending_review', size: '850 KB', updatedAt: '2026-06-28' },
  ];

  const supportTickets = [
    { id: 'TKT-089', issue: 'Refund Request', category: 'Payment / Refund', status: 'in_progress', severity: 's3_high' },
    { id: 'TKT-045', issue: 'Change Room Type', category: 'Booking', status: 'resolved', severity: 's4_normal' },
  ];

  const syncTimeline = [
    { id: '1', title: 'Document Uploaded by Jamaah (JUV)', description: 'Vaccine_Meningitis.jpg', timestamp: 'Yesterday, 10:00 AM', variant: 'primary' as const },
    { id: '2', title: 'Payment Proof Rejected by Finance', description: 'Bank transfer receipt blurry.', timestamp: 'Yesterday, 02:30 PM', variant: 'danger' as const },
    { id: '3', title: 'Notification Sent to Jamaah', description: 'Re-upload payment proof reminder.', timestamp: 'Yesterday, 02:35 PM', variant: 'primary' as const },
  ];

  const renderStatusBadge = (status: string) => {
    if (status === 'verified' || status === 'completed' || status === 'paid' || status === 'resolved') return <Badge variant="success">{status}</Badge>;
    if (status === 'need_revision' || status === 'pending_proof' || status === 'in_progress') return <Badge variant="warning">{status}</Badge>;
    if (status === 'pending_review') return <Badge variant="info">{status}</Badge>;
    return <Badge variant="neutral">{status}</Badge>;
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title={`Jamaah 360° Profile: ${jamaahInfo.name}`} 
        breadcrumbs={[
          { label: 'Home' },
          { label: 'TA Portal' },
          { label: 'CRM Dashboard', onClick: () => navigate('ta-crm-dashboard') },
          { label: 'Jamaah Profile' }
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" leftIcon={<MessageSquare size={18} />}>Message</Button>
            <Button variant="primary" leftIcon={<Briefcase size={18} />}>New Booking</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar - Profile Summary */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm text-center">
            <div className="w-24 h-24 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User size={40} className="text-teal-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{jamaahInfo.name}</h2>
            <div className="mt-2 flex justify-center">
              <Badge variant="success">Active User</Badge>
            </div>
            
            <div className="mt-6 text-left flex flex-col gap-3">
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Phone size={16} /> <span>{jamaahInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Mail size={16} /> <span>{jamaahInfo.email}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-600 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" /> <span>{jamaahInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Tabs */}
        <div className="lg:col-span-3">
          <Tabs 
            activeTab={activeTab} 
            onChange={setActiveTab}
            tabs={[
              { id: 'profile', label: 'Overview' },
              { id: 'documents', label: 'Document Vault', icon: <FileText size={16} /> },
              { id: 'bookings', label: 'Bookings', icon: <Briefcase size={16} /> },
              { id: 'support', label: 'Support Cases', icon: <MessageSquare size={16} /> }
            ]} 
          />
          
          <div className="mt-4">
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sync Timeline (Audit)</h3>
                  <Timeline items={syncTimeline} />
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Total Bookings</span>
                      <span className="font-semibold">2</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Document Readiness</span>
                      <span className="font-semibold text-warning">Action Needed</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Referral Code</span>
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">FAUZI-2026</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Required Documents</h3>
                  <Button size="sm" variant="outline">Request Upload</Button>
                </div>
                <DataTable 
                  data={documentVault}
                  columns={[
                    { header: 'Type', accessor: 'type' },
                    { header: 'File Name', accessor: 'name' },
                    { header: 'Status', accessor: (row) => renderStatusBadge(row.status) },
                    { header: 'Size', accessor: 'size' },
                    { header: 'Updated', accessor: 'updatedAt' },
                    { 
                      header: 'Action', 
                      accessor: () => <Button variant="ghost" size="sm">Review</Button>,
                      align: 'right' 
                    }
                  ]}
                  keyExtractor={(r) => r.id}
                />
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking & Transaction History</h3>
                <DataTable 
                  data={bookingHistory}
                  columns={[
                    { header: 'Booking ID', accessor: 'id' },
                    { header: 'Package', accessor: 'package' },
                    { header: 'Date', accessor: 'date' },
                    { header: 'Booking Status', accessor: (row) => renderStatusBadge(row.status) },
                    { header: 'Payment Status', accessor: (row) => renderStatusBadge(row.paymentStatus) },
                    { 
                      header: 'Action', 
                      accessor: () => <Button variant="ghost" size="sm">Details</Button>,
                      align: 'right' 
                    }
                  ]}
                  keyExtractor={(r) => r.id}
                />
              </div>
            )}

            {activeTab === 'support' && (
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
                  <Button size="sm" variant="outline">Create Ticket</Button>
                </div>
                <DataTable 
                  data={supportTickets}
                  columns={[
                    { header: 'Ticket ID', accessor: 'id' },
                    { header: 'Category', accessor: 'category' },
                    { header: 'Issue', accessor: 'issue' },
                    { header: 'Status', accessor: (row) => renderStatusBadge(row.status) },
                    { 
                      header: 'Action', 
                      accessor: () => <Button variant="ghost" size="sm">Reply</Button>,
                      align: 'right' 
                    }
                  ]}
                  keyExtractor={(r) => r.id}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
