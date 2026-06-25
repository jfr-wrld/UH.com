import React from 'react';

interface CountryFlagProps {
  country: string;
  size?: number;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ country, size = 16 }) => {
  if (!country) return null;

  const getFlagUrl = (name: string) => {
    switch (name.toLowerCase()) {
      case 'indonesia': return 'https://flagcdn.com/id.svg';
      case 'malaysia': return 'https://flagcdn.com/my.svg';
      case 'saudi arabia': return 'https://flagcdn.com/sa.svg';
      case 'uae': 
      case 'united arab emirates': return 'https://flagcdn.com/ae.svg';
      case 'qatar': return 'https://flagcdn.com/qa.svg';
      case 'singapore': return 'https://flagcdn.com/sg.svg';
      case 'turkey': return 'https://flagcdn.com/tr.svg';
      case 'brunei': return 'https://flagcdn.com/bn.svg';
      default: return null;
    }
  };

  const flagUrl = getFlagUrl(country);

  if (!flagUrl) {
    return (
      <div 
        style={{ 
          width: size, 
          height: size, 
          borderRadius: '50%', 
          backgroundColor: 'var(--color-border)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.6,
          fontWeight: 'bold',
          color: 'var(--color-text-neutral)'
        }}
      >
        {country.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img 
      src={flagUrl} 
      alt={`${country} flag`} 
      style={{ 
        width: size * 1.33, 
        height: size, 
        objectFit: 'cover', 
        borderRadius: '2px',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
      }} 
    />
  );
};
