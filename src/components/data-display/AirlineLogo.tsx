import React from 'react';

interface AirlineLogoProps {
  iata: string;
  name?: string;
  size?: number;
}

export const AirlineLogo: React.FC<AirlineLogoProps> = ({ iata, name = '', size = 32 }) => {
  const logoUrl = `https://pics.avs.io/200/200/${iata}.png`;

  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        borderRadius: '50%', 
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid var(--color-border)'
      }}
      title={name || iata}
    >
      <img 
        src={logoUrl} 
        alt={`${iata} logo`} 
        style={{ 
          width: '70%', 
          height: '70%', 
          objectFit: 'contain'
        }}
        onError={(e) => {
          // Fallback to text if image fails
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.innerHTML = `<span style="font-size: ${size * 0.4}px; font-weight: bold; color: var(--color-text-neutral);">${iata}</span>`;
          }
        }}
      />
    </div>
  );
};
