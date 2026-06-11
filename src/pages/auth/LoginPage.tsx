import React, { useState } from 'react';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      if (email === 'admin@umrahhaji.com' && password === 'admin123') {
        onLogin();
      } else {
        setError('Invalid credentials. Hint: admin@umrahhaji.com / admin123');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: 'var(--surface-page)',
      fontFamily: 'var(--font-family-base)'
    }}>
      {/* Left side - Decorative */}
      <div className="login-left-panel" style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-8)',
        backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: 'var(--glass-border)', boxShadow: 'var(--glass-shadow)',
        backgroundImage: 'radial-gradient(at 100% 0%, var(--color-primary-light) 0, transparent 50%), radial-gradient(at 0% 100%, var(--surface-sunken) 0, transparent 50%)',
        color: 'var(--color-text-neutral)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Wave Pattern Overlay */}
        <div style={{ 
          position: 'absolute', 
          bottom: '-10%', 
          left: '-10%', 
          right: '-10%', 
          height: '60%', 
          opacity: 0.15, 
          color: 'var(--color-text-muted)', 
          pointerEvents: 'none',
          maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
        }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern" width="100" height="30" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <path d="M0 15 Q 25 0, 50 15 T 100 15" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <img src="/brand/logo-full.svg" alt="UmrahHaji.com Logo" style={{ height: '48px', width: 'auto' }} />
        </div>

        <div style={{ maxWidth: '480px', position: 'relative', zIndex: 1 }}>
          <h1 className="text-h1" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: 'var(--space-6)' }}>
            Enterprise Resource Planning
          </h1>
          <p className="text-body-lg text-muted" style={{ lineHeight: 1.6 }}>
            The all-in-one comprehensive platform for managing Umrah and Hajj operations, travel agencies, and financial settlements with intelligent insights.
          </p>
        </div>

        <div className="text-caption text-muted" style={{ position: 'relative', zIndex: 1 }}>
          © 2026 UmrahHaji.com ERP. All rights reserved.
        </div>
      </div>

      {/* Right side - Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
        position: 'relative'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--surface-base)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)',  boxShadow: 'var(--glass-shadow)',
          borderRadius: 'var(--radius-card)',
          border: 'none',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <h2 className="text-h2" style={{ marginBottom: 'var(--space-2)' }}>Welcome back</h2>
            <p className="text-body text-muted">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {error && (
              <div style={{ padding: 'var(--space-3) var(--space-4)', backgroundColor: 'var(--surface-sunken)', borderLeft: '4px solid var(--color-danger)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-caption-bold text-danger">{error}</span>
              </div>
            )}

            <FormField label="Email Address" required>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@umrahhaji.com"
                leftIcon={<Mail size={16} />}
              />
            </FormField>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <label className="text-label" style={{ color: 'var(--color-text-neutral)' }}>Password <span className="text-danger">*</span></label>
                <a href="#" className="text-caption text-primary" style={{ fontWeight: 500 }}>Forgot password?</a>
              </div>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                leftIcon={<Lock size={16} />}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              style={{ marginTop: 'var(--space-2)' }}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
          
          <div style={{ marginTop: 'var(--space-8)', textAlign: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-6)' }}>
            <p className="text-caption text-muted">Hint: Use admin@umrahhaji.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};
