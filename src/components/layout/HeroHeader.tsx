import React from 'react';
import { classNames } from '../../lib/utils';
import { ChevronLeft } from 'lucide-react';

export interface HeroHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  badges?: React.ReactNode;
  actions?: React.ReactNode;
  
  // Navigation
  onBack?: () => void;
  backLabel?: string;
  
  // Visuals
  avatarUrl?: string; 
  avatarComponent?: React.ReactNode; // e.g. custom avatar layout
  coverImageUrl?: string; 
  theme?: 'image' | 'gradient' | 'masked-image' | 'simple';
  
  className?: string;
  children?: React.ReactNode; // For any extra info injected in the main content area
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  title,
  subtitle,
  badges,
  actions,
  onBack,
  backLabel = 'Back',
  avatarUrl,
  avatarComponent,
  coverImageUrl,
  theme = 'gradient',
  className,
  children
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: '0' }} className={className}>
      
      {/* Back Button */}
      {onBack && (
        <div style={{ marginBottom: '-16px' }}>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 0, fontWeight: 500 }}
            className="text-body hover-link"
          >
            <ChevronLeft size={16} /> {backLabel}
          </button>
        </div>
      )}

      <div style={{
        position: 'relative', width: '100%', minHeight: theme === 'simple' ? 'auto' : '260px', borderRadius: theme === 'simple' ? '0' : 'var(--radius-lg)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: theme === 'simple' ? 'var(--space-4) 0' : 'var(--space-6)', boxShadow: theme === 'simple' ? 'none' : 'var(--glass-shadow)', marginTop: 'var(--space-2)',
        backgroundColor: theme === 'simple' ? 'transparent' : 'var(--color-primary-dark)'
      }}>
        
        {/* Background Renderers based on Theme */}
        {theme === 'image' && coverImageUrl && (
          <>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <img src={coverImageUrl} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)' }} />
          </>
        )}

        {theme === 'gradient' && (
          <>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, #024E55 100%)' }}>
              <svg width="100%" height="100%" style={{ opacity: 0.12, position: 'absolute', inset: 0 }}>
                <pattern id="islamicPatternHero" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                   <path d="M30 0L60 30L30 60L0 30Z M15 15L45 45 M15 45L45 15" stroke="currentColor" fill="none" strokeWidth="1" />
                   <circle cx="30" cy="30" r="10" stroke="currentColor" fill="none" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#islamicPatternHero)" />
              </svg>
            </div>
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }} />
          </>
        )}

        {theme === 'masked-image' && coverImageUrl && (
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, left: '50%',
            backgroundImage: `url("${coverImageUrl}")`,
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2,
            maskImage: 'linear-gradient(to right, transparent, black)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black)'
          }} />
        )}

        {/* Content Overlay */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center', flex: 1 }}>
            
            {/* Avatar Slot */}
            {(avatarUrl || avatarComponent) && (
              <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.5)', flexShrink: 0 }}>
                {avatarComponent ? avatarComponent : <img src={avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', color: theme === 'simple' ? 'var(--color-text-primary)' : 'white' }}>
              {badges && (
                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                  {badges}
                </div>
              )}
              
              <h1 style={{ fontSize: theme === 'simple' ? '1.5rem' : '2.2rem', fontWeight: theme === 'simple' ? '700' : '800', margin: 0, textShadow: theme === 'simple' ? 'none' : '0 2px 4px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>
                {title}
              </h1>
              
              {subtitle && (
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', opacity: 0.9, marginTop: 'var(--space-1)', textShadow: theme === 'simple' ? 'none' : '0 1px 2px rgba(0,0,0,0.5)', color: theme === 'simple' ? 'var(--color-text-muted)' : 'inherit' }}>
                  {subtitle}
                </div>
              )}

              {children && (
                <div style={{ marginTop: 'var(--space-2)' }}>
                  {children}
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          {actions && (
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
