import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Mail, Lock, Eye, EyeOff, MapPin, CheckCircle } from 'lucide-react';

type Step = 'login' | 'forgot' | 'forgot_success';

export const JUVLoginPage: React.FC<{ onLogin: () => void; onRegisterClick: () => void }> = ({ onLogin, onRegisterClick }) => {
  const [step, setStep] = useState<Step>('login');
  const [emailOrPhone, setEmailOrPhone] = useState('');
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
    
    if (!emailOrPhone || !password) {
      setError('Please enter both email/phone and password.');
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
    if (!emailOrPhone) {
      setError('Please enter your email or phone number.');
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
        background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%), url('/images/kaaba.jpg')`,
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
            <MapPin size={16} />
            Your Spiritual Journey Starts Here
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Welcome back, Pilgrim.
          </h1>
          <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)' }}>
            Track your bookings, prepare your travel documents, and stay connected with your travel agency all in one place.
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
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '8px', letterSpacing: '-0.02em' }}>Sign In</h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Enter your email or phone to access your account.</p>
              </div>

              {/* Social Login */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <Button variant="outline" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', borderColor: 'var(--color-border)', color: 'var(--color-text-neutral)', height: '48px', fontSize: '15px', fontWeight: 500 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                  Google
                </Button>
                <Button variant="outline" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', borderColor: 'var(--color-border)', color: 'var(--color-text-neutral)', height: '48px', fontSize: '15px', fontWeight: 500 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.12 3.833 3.06 1.57-.061 2.167-.98 4.067-.98 1.88 0 2.441.96 4.086.98 1.666.02 2.682-1.464 3.68-2.934 1.15-1.688 1.623-3.328 1.643-3.411-.036-.016-3.183-1.22-3.216-4.852-.027-3.04 2.483-4.512 2.597-4.58-1.428-2.086-3.64-2.327-4.437-2.368-2.083-.223-4.103 1.021-4.851 1.021zm2.464-4.542c.846-1.026 1.417-2.453 1.262-3.882-1.229.05-2.73.818-3.6 1.87-.78.938-1.442 2.4-1.259 3.805 1.378.107 2.75-.705 3.597-1.793z"/></svg>
                  Apple
                </Button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }}></div>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', padding: '0 16px', fontWeight: 500 }}>OR SIGN IN WITH EMAIL</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }}></div>
              </div>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {error && (
                  <div style={{ padding: '12px 16px', backgroundColor: 'var(--surface-danger)', borderLeft: '4px solid var(--color-danger)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-danger)' }}>{error}</span>
                  </div>
                )}

                <FormField label="Email or Phone Number" required>
                  <Input 
                    ref={firstInputRef}
                    type="text" 
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="you@example.com or +60..."
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
                  disabled={isLoading || !emailOrPhone || !password}
                  size="lg"
                  style={{ marginTop: '12px', width: '100%', height: '52px', fontSize: '16px' }}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'var(--surface-sunken)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                    <strong style={{ color: 'var(--color-text-neutral)' }}>Demo Account (for testing):</strong><br />
                    Email: jamaah@example.com<br />
                    Password: password123
                  </p>
                </div>
              </form>

              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
                  New to UmrahHaji.com?{' '}
                  <button onClick={onRegisterClick} style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Create an account
                  </button>
                </p>
              </div>
            </div>
          )}

          {step === 'forgot' && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '12px' }}>Forgot Password</h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Enter your registered email or phone to receive reset instructions.</p>
              </div>
              <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {error && (
                  <div style={{ padding: '12px 16px', backgroundColor: 'var(--surface-danger)', borderLeft: '4px solid var(--color-danger)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-danger)' }}>{error}</span>
                  </div>
                )}
                <FormField label="Email or Phone Number" required>
                  <Input 
                    ref={firstInputRef}
                    type="text" 
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="you@example.com or +60..."
                    leftIcon={<Mail size={18} />}
                    required
                  />
                </FormField>
                <Button
                  type="submit"
                  disabled={isLoading || !emailOrPhone}
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
                If an account exists for {emailOrPhone}, we will send password reset instructions.
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
