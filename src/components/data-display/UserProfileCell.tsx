import React from 'react';
import { BadgeCheck } from 'lucide-react';

export interface UserProfileCellProps {
  name: string;
  email?: string;
  phone?: string;
  isVerified?: boolean;
  subtitleNode?: React.ReactNode;
}

export const UserProfileCell: React.FC<UserProfileCellProps> = ({ 
  name, 
  email, 
  phone, 
  isVerified = true,
  subtitleNode
}) => {
  const safeName = String(name || 'Unknown User');
  const displayEmail = email || `${safeName.split(' (')[0].toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <img 
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(safeName)}&background=random&color=fff&size=40`} 
        alt={safeName} 
        style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
          <span className="text-body-bold">{safeName}</span>
          {isVerified && <BadgeCheck size={14} className="text-primary" style={{ color: 'var(--color-primary)' }} />}
        </div>
        <span className="text-caption text-muted">{displayEmail}</span>
        {phone && <span className="text-caption text-muted">{phone}</span>}
        {subtitleNode && <div className="text-caption text-muted">{subtitleNode}</div>}
      </div>
    </div>
  );
};
