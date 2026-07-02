import React, { useState } from 'react';
import { Modal } from '../../../components/feedback/Modal';
import { Button } from '../../../components/actions/Button';
import { FormField } from '../../../components/inputs/FormField';
import { Input } from '../../../components/inputs/Input';
import { Select } from '../../../components/inputs/Select';
import { Search, UserPlus, Send, AlertCircle } from 'lucide-react';

interface AddJamaahModalProps {
  onClose: () => void;
  onAdd: (newJamaah: any) => void;
}

export const AddJamaahModal: React.FC<AddJamaahModalProps> = ({ onClose, onAdd }) => {
  const [mode, setMode] = useState<'existing' | 'invite'>('existing');
  
  // Existing User State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('');

  // Invite New User State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [booking, setBooking] = useState('');
  const [sendInvite, setSendInvite] = useState(true);

  const handleAdd = () => {
    if (mode === 'existing') {
      if (!selectedUser) return;
      onAdd({
        id: `tajm_${Math.floor(Math.random() * 1000)}`,
        name: selectedUser === 'usr_1' ? 'Kamal Effendi' : 'Existing Jamaah',
        email: selectedUser === 'usr_1' ? 'kamal@example.com' : 'user@example.com',
        phone: '+60 12-345-6789',
        gender: 'Male',
        country: 'Malaysia',
        booking: 'Unassigned',
        package: '-',
        groupTrip: 'Unassigned',
        docStatus: 'Incomplete',
        paymentStatus: 'Unpaid',
        status: 'Pending Profile',
        joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        agency: 'Al-Hijrah Travel'
      });
    } else {
      if (!name || (!email && !phone)) return;
      onAdd({
        id: `tajm_${Math.floor(Math.random() * 1000)}`,
        name,
        email,
        phone,
        gender: 'Not Set',
        country: 'Malaysia',
        booking: booking || 'Unassigned',
        package: booking ? 'Umrah Reguler 9 Hari' : '-',
        groupTrip: 'Unassigned',
        docStatus: 'Missing',
        paymentStatus: 'Unpaid',
        status: sendInvite ? 'Pending Invitation' : 'Pending Profile',
        joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        agency: 'Al-Hijrah Travel'
      });
    }
  };

  const dummySearchOptions = [
    { value: 'usr_1', label: 'Kamal Effendi (kamal@example.com)' },
    { value: 'usr_2', label: 'Sarah Binti Amin (sarah@example.com)' }
  ];

  return (
    <Modal title="Add Jamaah" isOpen={true} onClose={onClose} size="lg">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        
        {/* Mode Selector */}
        <div style={{ display: 'flex', backgroundColor: 'var(--surface-sunken)', padding: '4px', borderRadius: 'var(--radius-lg)' }}>
          <button 
            style={{ flex: 1, padding: 'var(--space-2) var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', backgroundColor: mode === 'existing' ? 'var(--surface-base)' : 'transparent', boxShadow: mode === 'existing' ? 'var(--shadow-sm)' : 'none', fontWeight: mode === 'existing' ? 600 : 400, color: mode === 'existing' ? 'var(--text-main)' : 'var(--text-muted)', transition: 'all 0.2s' }}
            onClick={() => setMode('existing')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)' }}>
              <Search size={16} /> Search Existing User
            </div>
          </button>
          <button 
            style={{ flex: 1, padding: 'var(--space-2) var(--space-4)', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', backgroundColor: mode === 'invite' ? 'var(--surface-base)' : 'transparent', boxShadow: mode === 'invite' ? 'var(--shadow-sm)' : 'none', fontWeight: mode === 'invite' ? 600 : 400, color: mode === 'invite' ? 'var(--text-main)' : 'var(--text-muted)', transition: 'all 0.2s' }}
            onClick={() => setMode('invite')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)' }}>
              <UserPlus size={16} /> Invite New User
            </div>
          </button>
        </div>

        {mode === 'existing' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <FormField label="Search Platform User" required>
              <Select options={[{value: '', label: 'Search by name, email, or phone...'}, ...dummySearchOptions]} value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} />
            </FormField>
            {selectedUser && (
              <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-body-bold" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>{dummySearchOptions.find(o => o.value === selectedUser)?.label}</span>
                <span className="text-caption text-muted">This user has an existing account on UmrahHaji.com. Linking them to your agency will grant you access to their travel documents and profile.</span>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <FormField label="Full Name" required>
              <Input placeholder="e.g. Ahmad Faizal" value={name} onChange={(e) => setName(e.target.value)} />
            </FormField>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <FormField label="Email Address" required>
                <Input type="email" placeholder="e.g. ahmad@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormField>
              <FormField label="Phone Number">
                <Input type="tel" placeholder="+60 12-345-6789" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </FormField>
            </div>

            <FormField label="Link to Booking (Optional)">
              <Select options={[{value: '', label: 'No Booking (Lead)'}, {value: 'BK-AH-001', label: 'BK-AH-001 - Umrah Reguler 9 Hari'}, {value: 'BK-AH-002', label: 'BK-AH-002 - Umrah Plus Turki 12 Hari'}]} value={booking} onChange={(e) => setBooking(e.target.value)} />
            </FormField>

            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 'var(--space-3)' }}>
              <input type="checkbox" id="sendInvite" checked={sendInvite} onChange={(e) => setSendInvite(e.target.checked)} style={{ width: 18, height: 18, marginTop: '2px' }} />
              <div>
                <label htmlFor="sendInvite" className="text-body-bold" style={{ cursor: 'pointer', color: 'var(--color-primary-dark)', display: 'block' }}>Send Email Invitation</label>
                <span className="text-caption" style={{ color: 'var(--color-primary-dark)' }}>The jamaah will receive a secure link to activate their account and complete their profile and travel documents.</span>
              </div>
            </div>
            
            {email && dummySearchOptions.some(o => o.label.includes(email)) && (
              <div style={{ padding: 'var(--space-3)', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-md)', display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <AlertCircle size={16} style={{ color: '#DC2626' }} />
                <span className="text-caption" style={{ color: '#991B1B' }}>A user with this email already exists. Please use the "Search Existing User" tab instead.</span>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-default)' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd} leftIcon={mode === 'invite' && sendInvite ? <Send size={16} /> : <UserPlus size={16} />} disabled={(mode === 'existing' && !selectedUser) || (mode === 'invite' && (!name || (!email && !phone)))}>
            {mode === 'existing' ? 'Link Jamaah' : sendInvite ? 'Send Invitation' : 'Add Jamaah'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
