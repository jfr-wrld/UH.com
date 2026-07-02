import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../components/actions/Button';
import { FormField } from '../../components/inputs/FormField';
import { Input } from '../../components/inputs/Input';
import { Mail, Lock, Eye, EyeOff, User, Building, MapPin, CheckCircle, Hash, ArrowRight, ArrowLeft } from 'lucide-react';

type Step = 'agency_info' | 'pic_info' | 'account_setup' | 'otp' | 'success';

export const TARegisterPage: React.FC<{ onRegister: () => void; onLoginClick: () => void }> = ({ onRegister, onLoginClick }) => {
  const [step, setStep] = useState<Step>('agency_info');
  const [formData, setFormData] = useState({
    agencyName: '',
    registrationNumber: '',
    picName: '',
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

  const agencyInputRef = useRef<HTMLInputElement>(null);
  const picInputRef = useRef<HTMLInputElement>(null);
  const accountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'agency_info' && agencyInputRef.current) agencyInputRef.current.focus();
    if (step === 'pic_info' && picInputRef.current) picInputRef.current.focus();
    if (step === 'account_setup' && accountInputRef.current) accountInputRef.current.focus();
  }, [step]);

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
    return strength; 
  };

  const pwdStrength = calculatePasswordStrength(formData.password);

  const getStrengthColor = () => {
    if (pwdStrength === 0) return 'var(--color-border)';
    if (pwdStrength === 1) return '#ef4444'; 
    if (pwdStrength === 2) return '#eab308'; 
    if (pwdStrength === 3) return '#22c55e'; 
  };

  const isAgencyValid = formData.agencyName && formData.registrationNumber;
  const isPicValid = formData.picName && formData.email && formData.phone;
  const isAccountValid = formData.password && formData.confirmPassword;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setIsLoading(true);
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
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
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

  const renderStepper = () => {
    const steps = [
      { id: 'agency_info', label: 'Agency' },
      { id: 'pic_info', label: 'Contact' },
      { id: 'account_setup', label: 'Account' }
    ];

    const currentIndex = steps.findIndex(s => s.id === step);

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
        {steps.map((s, idx) => {
          const isActive = idx === currentIndex;
          const isCompleted = idx < currentIndex;
          
          return (
            <React.Fragment key={s.id}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 1 }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: isActive || isCompleted ? 'var(--color-primary)' : 'var(--surface-sunken)',
                  color: isActive || isCompleted ? '#FFFFFF' : 'var(--color-text-muted)',
                  fontWeight: 600, fontSize: '14px',
                  border: isActive || isCompleted ? 'none' : '1px solid var(--color-border)',
                  transition: 'all 0.3s ease'
                }}>
                  {isCompleted ? <CheckCircle size={18} /> : idx + 1}
                </div>
                <span style={{ 
                  fontSize: '12px', 
                  fontWeight: isActive ? 600 : 500, 
                  color: isActive ? 'var(--color-text-neutral)' : 'var(--color-text-muted)'
                }}>
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div style={{ 
                  flex: 1, 
                  height: '2px', 
                  backgroundColor: isCompleted ? 'var(--color-primary)' : 'var(--surface-sunken)',
                  margin: '0 8px',
                  marginBottom: '20px',
                  transition: 'all 0.3s ease'
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
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
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--color-primary-dark)', zIndex: -1 }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <img src="/brand/logo-full.svg" alt="UmrahHaji.com Logo" style={{ height: '42px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
        </div>
        <div style={{ maxWidth: '520px', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', padding: '8px 16px', 
            borderRadius: '999px', fontSize: '14px', fontWeight: 600, marginBottom: '24px',
            backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Building size={16} /> For Travel Agencies
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
          
          {['agency_info', 'pic_info', 'account_setup'].includes(step) && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '8px', letterSpacing: '-0.02em' }}>Apply as Agency</h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Follow the steps to set up your agency workspace.</p>
              </div>

              {renderStepper()}

              {step === 'agency_info' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease-out' }}>
                  <FormField label="Agency Name" required>
                    <Input 
                      ref={agencyInputRef}
                      name="agencyName"
                      value={formData.agencyName}
                      onChange={handleChange}
                      placeholder="E.g. Al-Hijrah Travel Sdn Bhd"
                      leftIcon={<Building size={18} />}
                      required
                    />
                  </FormField>
                  <FormField label="Registration Number (SSM / MOTAC)" required>
                    <Input 
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      placeholder="E.g. 1234567-X"
                      leftIcon={<Hash size={18} />}
                      required
                    />
                  </FormField>
                  <Button
                    type="button"
                    onClick={() => setStep('pic_info')}
                    disabled={!isAgencyValid}
                    size="lg"
                    style={{ marginTop: '12px', width: '100%', height: '52px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    Next Step <ArrowRight size={18} />
                  </Button>
                </div>
              )}

              {step === 'pic_info' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease-out' }}>
                  <FormField label="Person In Charge (PIC) Name" required>
                    <Input 
                      ref={picInputRef}
                      name="picName"
                      value={formData.picName}
                      onChange={handleChange}
                      placeholder="E.g. Ahmad Fauzi"
                      leftIcon={<User size={18} />}
                      required
                    />
                  </FormField>
                  <FormField label="Business Email" required>
                    <Input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@agency.com"
                      leftIcon={<Mail size={18} />}
                      required
                    />
                  </FormField>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-neutral)' }}>Business Phone Number <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <select 
                        name="phoneCode" 
                        value={formData.phoneCode} 
                        onChange={handleChange}
                        style={{ 
                          width: '90px', padding: '0 12px', border: '1px solid var(--color-border)', 
                          borderRadius: 'var(--radius-md)', backgroundColor: '#FFFFFF', fontSize: '15px',
                          color: 'var(--color-text-neutral)', outline: 'none'
                        }}
                      >
                        <option value="+60">+60</option>
                        <option value="+62">+62</option>
                        <option value="+65">+65</option>
                      </select>
                      <div style={{ flex: 1 }}>
                        <Input 
                          type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          placeholder="123456789" required
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <Button type="button" variant="outline" onClick={() => setStep('agency_info')} size="lg" style={{ width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                      <ArrowLeft size={18} />
                    </Button>
                    <Button type="button" onClick={() => setStep('account_setup')} disabled={!isPicValid} size="lg" style={{ flex: 1, height: '52px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      Next Step <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              )}

              {step === 'account_setup' && (
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease-out' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-neutral)' }}>Password <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                    <Input 
                      ref={accountInputRef}
                      type={showPassword ? "text" : "password"} 
                      name="password" value={formData.password} onChange={handleChange}
                      placeholder="••••••••" leftIcon={<Lock size={18} />}
                      rightIcon={
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}>
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      } required
                    />
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
                      name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                      placeholder="••••••••" leftIcon={<Lock size={18} />}
                      rightIcon={
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}>
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      } style={{ borderColor: passwordError ? 'var(--color-danger)' : undefined }} required
                    />
                    {passwordError && <p style={{ fontSize: '13px', color: 'var(--color-danger)', marginTop: '4px' }}>{passwordError}</p>}
                  </div>
                  <div style={{ backgroundColor: 'var(--surface-sunken)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)' }}>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                      By applying, you agree to our <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Privacy Policy</a>. Our team will review your application within 24-48 hours.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <Button type="button" variant="outline" onClick={() => setStep('pic_info')} size="lg" style={{ width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                      <ArrowLeft size={18} />
                    </Button>
                    <Button type="submit" disabled={isLoading || !isAccountValid} size="lg" style={{ flex: 1, height: '52px', fontSize: '16px' }}>
                      {isLoading ? 'Processing...' : 'Submit Application'}
                    </Button>
                  </div>
                </form>
              )}

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
                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '12px' }}>Verify Email</h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>
                  We have sent an OTP code to <br /><strong style={{ color: 'var(--color-text-neutral)' }}>{formData.email}</strong>
                </p>
              </div>
              <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  {otp.map((digit, index) => (
                    <input key={index} ref={el => otpRefs.current[index] = el} type="text" inputMode="numeric" value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(index, e)} autoFocus={index === 0}
                      style={{ width: '56px', height: '64px', fontSize: '28px', textAlign: 'center', fontWeight: 600, border: '2px solid', borderColor: digit ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: 'var(--radius-lg)', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', color: 'var(--color-text-neutral)', backgroundColor: '#FFFFFF' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(6, 148, 162, 0.15)'; }}
                      onBlur={(e) => { e.target.style.borderColor = digit ? 'var(--color-primary)' : 'var(--color-border)'; e.target.style.boxShadow = 'none'; }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
                  Did not receive the code?{' '}
                  {otpTimer > 0 ? <span style={{ color: 'var(--color-text-neutral)', fontWeight: 500 }}>Resend in {otpTimer}s</span> : <button type="button" onClick={() => setOtpTimer(59)} style={{ color: 'var(--color-primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Resend Now</button>}
                </div>
                <Button type="submit" disabled={isLoading || otp.some(d => !d)} size="lg" style={{ width: '100%', height: '52px', fontSize: '16px' }}>
                  {isLoading ? 'Verifying...' : 'Submit OTP'}
                </Button>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeIn 0.4s ease-out' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}><CheckCircle size={80} color="#10b981" /></div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-neutral)', marginBottom: '16px' }}>Application Submitted</h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '40px', lineHeight: 1.6 }}>
                Your agency application has been submitted successfully. Our team will review your details and contact you shortly.
              </p>
              <Button onClick={onLoginClick} size="lg" style={{ width: '100%', height: '52px', fontSize: '16px' }}>Return to Login</Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
