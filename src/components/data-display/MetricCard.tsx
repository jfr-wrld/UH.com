import React, { useState, useEffect } from 'react';
import { classNames } from '../../lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  trendLabel?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  accentColor?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  trendValue,
  trendLabel,
  icon,
  iconBg,
  accentColor,
  className
}) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div 
      className={classNames('metric-card', className)}
      style={accentColor ? { borderLeft: `3px solid ${accentColor}` } : undefined}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 className="text-body-medium" style={{ color: 'var(--gray-500)', fontSize: '13px' }}>{title}</h3>
        {icon && (
          <div style={{ 
            width: 32, 
            height: 32, 
            borderRadius: 8, 
            backgroundColor: iconBg || 'var(--gray-50)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {React.cloneElement(icon as React.ReactElement, { size: 16 })}
          </div>
        )}
      </div>
      <div 
        className="metric-value" 
        style={{ 
          transition: 'all 0.3s ease-out',
          color: pulse ? 'var(--color-success)' : 'inherit',
          transform: pulse ? 'scale(1.05)' : 'scale(1)',
          transformOrigin: 'left center'
        }}
      >
        {value}
      </div>
      
      {trend && trendValue && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div className={classNames('metric-trend', trend)}>
            {trend === 'up' && <ArrowUpRight size={14} />}
            {trend === 'down' && <ArrowDownRight size={14} />}
            {trend === 'neutral' && <Minus size={14} />}
            <span>{trendValue}</span>
          </div>
          {trendLabel && <span style={{ color: 'var(--gray-500)', fontSize: 'var(--text-caption-size)' }}>{trendLabel}</span>}
        </div>
      )}
    </div>
  );
};
