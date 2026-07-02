import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Mail, Lock, Eye, EyeOff, User, MapPin, CheckCircle } from 'lucide-react';

type Step = 'register' | 'otp' | 'success';

export const JUVRegisterPage: React.FC<{ onRegister: () => void; onLoginClick: () => void }> = ({ onRegister, onLoginClick }) => {
  const [step, setStep] = useState<Step>('register');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+60',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpTimer, setOtpTimer] = useState(59);

  // Focus ref for auto-focus
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'register' && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [step]);

  // Handle OTP Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
      setPasswordError('');
    }
  };

  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/[0-9]/.test(pwd)) strength += 1;
    return strength; // 0, 1, 2, 3
  };

  const pwdStrength = calculatePasswordStrength(formData.password);

  const getStrengthColor = () => {
    if (pwdStrength === 0) return 'var(--color-border)';
    if (pwdStrength === 1) return '#ef4444'; // Red
    if (pwdStrength === 2) return '#eab308'; // Yellow
    if (pwdStrength === 3) return '#22c55e'; // Green
  };

  const isFormValid = formData.fullName && formData.email && formData.phone && formData.password && formData.confirmPassword;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    // Simulate network request to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setOtpTimer(59);
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1000);
  };

  const handleResendOtp = () => {
    setOtpTimer(59);
    // Simulate resend API
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
        background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%), url('/images/masjid-al-haram.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* If image missing, fallback color */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--color-primary-dark)', zIndex: -1 }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src="/brand/logo-full.svg" alt="UmrahHaji.com" style={{ height: '42px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
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
            Join Millions of Pilgrims
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Start Your Spiritual Journey.
          </h1>
          <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)' }}>
            Create an account to discover premium packages, manage your travel documents, and stay connected with your guides all in one secure platform.
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
          
          {step === 'register' && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '8px', letterSpacing: '-0.01em' }}>Create an Account</h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Enter your details to register as a Jamaah.</p>
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
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', padding: '0 16px', fontWeight: 500 }}>OR REGISTER WITH EMAIL</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }}></div>
              </div>

              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <FormField label="Full Name" required>
                  <Input 
                    ref={firstInputRef}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="E.g. Rahmad Ismail"
                    leftIcon={<User size={18} />}
                    required
                  />
                </FormField>

                <FormField label="Email Address" required>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rahmad.ismail@mail.com"
                    leftIcon={<Mail size={18} />}
                    required
                  />
                </FormField>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-neutral)' }}>Phone Number <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <select 
                      name="phoneCode" 
                      value={formData.phoneCode} 
                      onChange={handleChange}
                      style={{ 
                        width: '90px', 
                        padding: '0 12px', 
                        border: '1px solid var(--color-border)', 
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '15px',
                        color: 'var(--color-text-neutral)',
                        outline: 'none'
                      }}
                    >
                      <option value="+60">+60</option>
                      <option value="+62">+62</option>
                      <option value="+65">+65</option>
                    </select>
                    <div style={{ flex: 1 }}>
                      <Input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="123456789"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-neutral)' }}>Password <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    leftIcon={<Lock size={18} />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                    required
                  />
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div style={{ marginTop: '4px' }}>
                      <div style={{ display: 'flex', height: '4px', gap: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ flex: 1, backgroundColor: pwdStrength >= 1 ? getStrengthColor() : 'var(--color-border)' }}></div>
                        <div style={{ flex: 1, backgroundColor: pwdStrength >= 2 ? getStrengthColor() : 'var(--color-border)' }}></div>
                        <div style={{ flex: 1, backgroundColor: pwdStrength >= 3 ? getStrengthColor() : 'var(--color-border)' }}></div>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>Include at least 8 chars, 1 uppercase, 1 number.</p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-neutral)' }}>Confirm Password <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    leftIcon={<Lock size={18} />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    }
                    style={{ borderColor: passwordError ? 'var(--color-danger)' : undefined }}
                    required
                  />
                  {passwordError && (
                    <p style={{ fontSize: '13px', color: 'var(--color-danger)', marginTop: '4px' }}>{passwordError}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  size="lg"
                  style={{ marginTop: '12px', width: '100%', height: '52px', fontSize: '16px' }}
                >
                  {isLoading ? 'Processing...' : 'Create Account'}
                </Button>
              </form>

              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <p style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
                  Already have an account?{' '}
                  <button onClick={onLoginClick} style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '12px' }}>OTP Verification</h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
                  We have sent an OTP code to <br />
                  <strong style={{ color: 'var(--color-text-neutral)' }}>{formData.email}</strong>
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => otpRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      autoFocus={index === 0}
                      style={{
                        width: '56px',
                        height: '64px',
                        fontSize: '28px',
                        textAlign: 'center',
                        fontWeight: 600,
                        border: '2px solid',
                        borderColor: digit ? 'var(--color-primary)' : 'var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        color: 'var(--color-text-neutral)',
                        backgroundColor: '#FFFFFF'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-primary)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(6, 148, 162, 0.15)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = digit ? 'var(--color-primary)' : 'var(--color-border)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  ))}
                </div>

                <div style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
                  Did not receive the code?{' '}
                  {otpTimer > 0 ? (
                    <span style={{ color: 'var(--color-text-neutral)', fontWeight: 500 }}>Resend in {otpTimer}s</span>
                  ) : (
                    <button type="button" onClick={handleResendOtp} style={{ color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Resend Now</button>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || otp.some(d => !d)}
                  size="lg"
                  style={{ width: '100%', height: '52px', fontSize: '16px' }}
                >
                  {isLoading ? 'Verifying...' : 'Submit OTP'}
                </Button>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <CheckCircle size={80} color="#10b981" />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '16px' }}>Verification Successful</h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '40px', lineHeight: 1.6 }}>
                Your account has been verified successfully. Please login to access your dashboard and explore premium packages.
              </p>
              <Button
                onClick={onLoginClick}
                size="lg"
                style={{ width: '100%', height: '52px', fontSize: '16px' }}
              >
                Proceed to Login
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
