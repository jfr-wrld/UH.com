import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Mail, Lock, Eye, EyeOff, Briefcase, CheckCircle } from 'lucide-react';

type Step = 'login' | 'forgot' | 'forgot_success';

export const TALoginPage: React.FC<{ onLogin: () => void; onRegisterClick: () => void }> = ({ onLogin, onRegisterClick }) => {
  const [step, setStep] = useState<Step>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ((step === 'login' || step === 'forgot') && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [step]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both business email and password.');
      return;
    }

    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your business email address.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('forgot_success');
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: 'var(--surface-base)',
      fontFamily: 'var(--font-family-base)'
    }}>
      {/* Left side - Premium Imagery */}
      <div className="login-left-panel" style={{
        flex: 1.2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px',
        background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%), url('/images/masjid-nabawi.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* If image missing, fallback color */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--color-primary-dark)', zIndex: -1 }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src="/brand/logo-full.svg" alt="UmrahHaji.com Logo" style={{ height: '42px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
        </div>

        <div style={{ maxWidth: '520px', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: 'rgba(255, 255, 255, 0.15)', 
            color: '#FFFFFF', 
            padding: '8px 16px', 
            borderRadius: '999px', 
            fontSize: '14px', 
            fontWeight: 600, 
            marginBottom: '24px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Briefcase size={16} />
            For Travel Agencies
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Grow Your Umrah Business.
          </h1>
          <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)' }}>
            Access the premier B2B platform to manage packages, assign Mutawwifs, and scale your operations effortlessly.
          </p>
        </div>
      </div>

      {/* Right side - Form Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: '#FFFFFF',
        overflowY: 'auto'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          transition: 'all 0.3s ease-in-out'
        }}>
          {step === 'login' && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '8px', letterSpacing: '-0.02em' }}>Agency Sign In</h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Enter your business credentials to access the portal.</p>
              </div>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {error && (
                  <div style={{ padding: '12px 16px', backgroundColor: 'var(--surface-danger)', borderLeft: '4px solid var(--color-danger)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-danger)' }}>{error}</span>
                  </div>
                )}

                <FormField label="Business Email" required>
                  <Input 
                    ref={firstInputRef}
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agency@example.com"
                    leftIcon={<Mail size={18} />}
                    required
                  />
                </FormField>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-neutral)' }}>Password <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <button type="button" onClick={() => setStep('forgot')} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Forgot password?</button>
                  </div>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    leftIcon={<Lock size={18} />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  size="lg"
                  style={{ marginTop: '12px', width: '100%', height: '52px', fontSize: '16px' }}
                >
                  {isLoading ? 'Signing In...' : 'Sign In as Agency'}
                </Button>

                <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'var(--surface-sunken)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                    <strong style={{ color: 'var(--color-text-neutral)' }}>Demo Account (for testing):</strong><br />
                    Email: admin@agency.com<br />
                    Password: password123
                  </p>
                </div>
              </form>

              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
                  Not registered yet?{' '}
                  <button onClick={onRegisterClick} style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Apply for Agency Account
                  </button>
                </p>
              </div>
            </div>
          )}

          {step === 'forgot' && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '12px' }}>Forgot Password</h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Enter your registered business email to receive reset instructions.</p>
              </div>
              <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {error && (
                  <div style={{ padding: '12px 16px', backgroundColor: 'var(--surface-danger)', borderLeft: '4px solid var(--color-danger)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-danger)' }}>{error}</span>
                  </div>
                )}
                <FormField label="Business Email" required>
                  <Input 
                    ref={firstInputRef}
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agency@example.com"
                    leftIcon={<Mail size={18} />}
                    required
                  />
                </FormField>
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  size="lg"
                  style={{ marginTop: '12px', width: '100%', height: '52px', fontSize: '16px' }}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <button onClick={() => setStep('login')} style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Back to Login
                </button>
              </div>
            </div>
          )}

          {step === 'forgot_success' && (
            <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <CheckCircle size={80} color="#10b981" />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '16px' }}>Reset Link Sent</h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '40px', lineHeight: 1.6 }}>
                If an account exists for {email}, we will send password reset instructions.
              </p>
              <Button
                onClick={() => {
                  setStep('login');
                  setPassword('');
                }}
                size="lg"
                style={{ width: '100%', height: '52px', fontSize: '16px' }}
              >
                Back to Login
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
