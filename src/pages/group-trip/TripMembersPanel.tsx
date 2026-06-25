import React, { useState } from 'react';
import { Button } from '../../components/actions/Button';
import { Badge } from '../../components/data-display/Badge';
import { Tabs } from '../../components/navigation/Tabs';
import { Plus, Users, ChevronRight } from 'lucide-react';
import { AddJamaahModal } from './AddJamaahModal';
import { AddFamilyGroupModal } from './AddFamilyGroupModal';
import { useDataFilter } from '../../hooks/useDataFilter';
import { getStatusBadgeVariant, getCategoryBadgeVariant } from '../../utils/badge';

export const TripMembersPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [isAddJamaahOpen, setIsAddJamaahOpen] = useState(false);
  const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);

  const tabs = [
    { id: 'documents', label: 'By Documents' },
    { id: 'services', label: 'By Services' }
  ];

  const members = [
    { id: '1', name: 'Ahmad Hassan', group: 'Hassan Family', isPic: true, passport: 'Confirmed', visa: 'Confirmed', room: '1205 (Double)', flight: 'Confirmed' },
    { id: '2', name: 'Siti Aminah', group: 'Hassan Family', isPic: false, passport: 'Pending Review', visa: 'In Progress', room: '1205 (Double)', flight: 'Confirmed' },
    { id: '3', name: 'Zahid Kamaruddin', group: 'Individual', isPic: false, passport: 'Missing', visa: 'Pending', room: '1302 (Triple)', flight: 'Pending' }
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="text-subsection-title">Trip Members (3 / 45)</h3>
          <p className="text-body text-muted">Manage Jamaah allocation, documents, and operational services.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="secondary" leftIcon={<Users size={16} />} onClick={() => setIsAddFamilyOpen(true)}>Add Family / Group</Button>
          <Button leftIcon={<Plus size={16} />} onClick={() => setIsAddJamaahOpen(true)}>Add Jamaah</Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="data-table-container" style={{ overflowX: 'auto' }}>
        <table className="data-table text-body" style={{ minWidth: '800px' }}>
          <thead>
            <tr>
              <th>Member</th>
              {activeTab === 'documents' ? (
                <>
                  <th>IC / ID</th>
                  <th>Passport</th>
                  <th>Photo</th>
                  <th>Vaccination</th>
                  <th>Visa Docs</th>
                  <th>Notes / Remarks</th>
                </>
              ) : (
                <>
                  <th>Visa Status</th>
                  <th>E-Ticket (Flight)</th>
                  <th>Room Assignment</th>
                  <th>Train Ticket</th>
                  <th>Notes / Remarks</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="text-body-bold" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {m.name} {m.isPic && <Badge variant={getStatusBadgeVariant("PIC")} style={{ fontSize: '0.6rem', padding: '2px 4px' }}>PIC</Badge>}
                    </span>
                    <span className="text-caption text-muted">{m.group}</span>
                  </div>
                </td>
                {activeTab === 'documents' ? (
                  <>
                    <td><Badge variant={getStatusBadgeVariant('Confirmed')}>Confirmed</Badge></td>
                    <td>
                      <Badge variant={getStatusBadgeVariant(m.passport)}>{m.passport}</Badge>
                      {m.passport !== 'Confirmed' && <Button variant="ghost" size="sm" style={{ marginTop: 'var(--space-1)' }}>Upload</Button>}
                    </td>
                    <td><Badge variant={getStatusBadgeVariant('Confirmed')}>Confirmed</Badge></td>
                    <td><Badge variant={getStatusBadgeVariant('Confirmed')}>Confirmed</Badge></td>
                    <td><Badge variant={getStatusBadgeVariant('Confirmed')}>Confirmed</Badge></td>
                    <td><span className="text-caption text-muted">No issues</span></td>
                  </>
                ) : (
                  <>
                    <td><Badge variant={getStatusBadgeVariant(m.visa)}>{m.visa}</Badge></td>
                    <td><Badge variant={getStatusBadgeVariant(m.flight)}>{m.flight}</Badge></td>
                    <td><span className="text-body-bold">{m.room}</span></td>
                    <td><Badge variant={getStatusBadgeVariant("Not Required")}>Not Required</Badge></td>
                    <td><span className="text-caption text-muted">-</span></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddJamaahModal isOpen={isAddJamaahOpen} onClose={() => setIsAddJamaahOpen(false)} />
      <AddFamilyGroupModal isOpen={isAddFamilyOpen} onClose={() => setIsAddFamilyOpen(false)} />
    </div>
  );
};
