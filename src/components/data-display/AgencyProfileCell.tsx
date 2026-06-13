import React from 'react';
import { BadgeCheck, Building2 } from 'lucide-react';

export interface AgencyProfileCellProps {
  name: string;
  logo?: string | null;
  isVerified?: boolean;
  email?: string;
  subtitleNode?: React.ReactNode;
}

export const AgencyProfileCell: React.FC<AgencyProfileCellProps> = ({ 
  name, 
  logo, 
  isVerified = true, 
  email,
  subtitleNode
}) => {
  const safeName = String(name || 'Unknown Agency');
  const displayEmail = email || `${safeName.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--surface-sunken)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
        {logo ? (
          <img src={logo} alt={safeName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Building2 size={16} style={{ color: 'var(--text-muted)' }} />
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
          <span className="text-body-bold">{safeName}</span>
          {isVerified && <BadgeCheck size={14} className="text-primary" style={{ color: 'var(--color-primary)' }} />}
        </div>
        <span className="text-caption text-muted">{displayEmail}</span>
        {subtitleNode && <div className="text-caption text-muted">{subtitleNode}</div>}
      </div>
    </div>
  );
};
