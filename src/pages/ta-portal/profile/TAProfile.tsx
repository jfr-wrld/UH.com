import React, { useState } from 'react';
import { Badge } from '../../../components/data-display/Badge';
import { Tabs } from '../../../components/navigation/Tabs';
import { Button } from '../../../components/actions/Button';
import { HeroHeader } from '../../../components/layout/HeroHeader';
import { MapPin, ShieldCheck, Mail, BadgeCheck } from 'lucide-react';

import { TAAgencyInfoForm } from './TAAgencyInfoForm';
import { TAPicContactsForm } from './TAPicContactsForm';
import { TAAddressForm } from './TAAddressForm';
import { TALegalDocumentsForm } from './TALegalDocumentsForm';
import { TABankSettlementForm } from './TABankSettlementForm';

interface TAProfileProps {
  navigate: (route: string, state?: any) => void;
}

export function TAProfile({ navigate }: TAProfileProps) {
  const [activeTab, setActiveTab] = useState('agency-info');
  const [verificationStatus, setVerificationStatus] = useState<'Incomplete' | 'Verified'>('Incomplete');

  const tabs = [
    { id: 'agency-info', label: 'Agency Information' },
    { id: 'pic-contacts', label: 'PIC & Contacts' },
    { id: 'address', label: 'Address' },
    { id: 'legal-docs', label: 'Legal Documents' },
    { id: 'bank-settlement', label: 'Bank & Settlement' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
      {/* Dev/Preview State Toggle Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: 'var(--space-3) var(--space-4)', 
        backgroundColor: 'var(--surface-sunken)', 
        borderRadius: 'var(--radius-md)',
        border: 'var(--border-default)',
        marginTop: '-10px'
      }}>
        <span className="text-caption-bold" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
          DEVELOPMENT PREVIEW: Toggle Profile State
        </span>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button 
            variant={verificationStatus === 'Incomplete' ? 'primary' : 'secondary'} 
            size="sm" 
            onClick={() => setVerificationStatus('Incomplete')}
          >
            Incomplete Registration
          </Button>
          <Button 
            variant={verificationStatus === 'Verified' ? 'primary' : 'secondary'} 
            size="sm" 
            onClick={() => setVerificationStatus('Verified')}
          >
            Verified Agency
          </Button>
        </div>
      </div>

      <HeroHeader
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: '800', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>Al-Hijrah Travel</span>
            {verificationStatus === 'Verified' && (
              <BadgeCheck size={24} style={{ color: '#0ea5e9', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
            )}
          </div>
        }
        subtitle={
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', opacity: 0.9, marginTop: 'var(--space-1)', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><ShieldCheck size={16} /> REG-123456</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><MapPin size={16} /> Jakarta Selatan, ID</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><Mail size={16} /> support@alhijrah.com</span>
          </div>
        }
        badges={[
          verificationStatus === 'Verified' ? (
            <Badge key="verification" variant="success">Verified Agency</Badge>
          ) : (
            <Badge key="verification" variant="warning">Incomplete Profile</Badge>
          ),
          <Badge key="type" variant="primary">Umrah & Hajj</Badge>
        ]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant={verificationStatus === 'Verified' ? 'secondary' : 'primary'} disabled={verificationStatus === 'Verified'}>
              {verificationStatus === 'Verified' ? 'Verified' : 'Submit for Review'}
            </Button>
          </div>
        }
        avatarComponent={
          <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', backgroundColor: 'white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white', flexShrink: 0 }}>
            <img src="https://picsum.photos/seed/alhijrah/150/150" alt="Al-Hijrah Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        }
      />
      
      <Tabs activeTab={activeTab} onChange={setActiveTab} tabs={tabs} />

      {/* Profile Completion Alert / Verification Status Info */}
      {verificationStatus === 'Incomplete' ? (
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--space-3)',
          padding: 'var(--space-4)',
          backgroundColor: 'var(--color-warning-light)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-warning)',
        }}>
          <div style={{ marginTop: '2px', color: 'var(--color-warning-dark)' }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <span className="text-body-bold" style={{ color: 'var(--color-warning-dark)', display: 'block' }}>Registration Incomplete</span>
            <span className="text-caption" style={{ color: 'var(--color-warning-dark)' }}>
              Please complete all forms below and upload the mandatory documents under the <strong>Legal Documents</strong> tab to request verification from administrative review.
            </span>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--space-3)',
          padding: 'var(--space-4)',
          backgroundColor: 'var(--color-success-light)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-success)',
        }}>
          <div style={{ marginTop: '2px', color: 'var(--color-success)' }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="text-body-bold" style={{ color: 'var(--color-success-dark)', display: 'block' }}>Verified Profile</span>
            <span className="text-caption" style={{ color: 'var(--color-success-dark)' }}>
              Your travel agency verification is fully active. You are cleared to configure packages, manage trips, and handle financial payouts.
            </span>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', boxShadow: 'var(--glass-shadow)', borderRadius: 'var(--radius-card)', border: 'none', padding: 'var(--space-6)', minHeight: '400px' }}>
        {activeTab === 'agency-info' && <TAAgencyInfoForm />}
        {activeTab === 'pic-contacts' && <TAPicContactsForm />}
        {activeTab === 'address' && <TAAddressForm />}
        {activeTab === 'legal-docs' && <TALegalDocumentsForm />}
        {activeTab === 'bank-settlement' && <TABankSettlementForm />}
      </div>
    </div>
  );
}
