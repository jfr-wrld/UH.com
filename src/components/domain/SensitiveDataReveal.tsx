import React, { useState } from 'react';
import { Button } from '../actions/Button';
import { Eye, EyeOff, Copy } from 'lucide-react';
import type { ToastMessage } from '../feedback/Toast';

export interface SensitiveDataRevealProps {
  label: string;
  realValue: string;
  maskedValue?: string;
  onReveal?: () => void;
}

export const SensitiveDataReveal: React.FC<SensitiveDataRevealProps> = ({
  label,
  realValue,
  maskedValue = '•••• •••• ••••',
  onReveal
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleRevealToggle = () => {
    if (!isRevealed && onReveal) {
      onReveal(); // Trigger audit log callback
    }
    setIsRevealed(!isRevealed);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(realValue);
    // In a real app, you might trigger a toast here
  };

  return (
    <div>
      <div className="text-caption text-muted" style={{ marginBottom: 'var(--space-1)' }}>{label}</div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-3)',
        backgroundColor: 'var(--surface-sunken)',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        <div style={{ flexGrow: 1, letterSpacing: isRevealed ? 'normal' : '2px' }}>
          {isRevealed ? realValue : maskedValue}
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
          <Button variant="ghost" size="sm" onClick={handleCopy} title="Copy to clipboard">
            <Copy size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRevealToggle} title={isRevealed ? "Hide" : "Reveal"}>
            {isRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
      </div>
    </div>
  );
};
