import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowRight, FiAlertCircle, FiCheck, FiClock, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { api } from '../services/api';

export default function Signup() {
  const [step, setStep] = useState(1); // 1: email, 2: OTP verification
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const role = 'citizen'; // All self-registered accounts are citizens
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password || !confirmPassword) {
      setError('Please complete all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.signup({ email, password, role });
      setStep(2);
      setCountdown(60);
      setSuccess('Account created. Enter the verification code sent to your email.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAccount = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!code) {
      setError('Please enter the verification code');
      return;
    }

    if (code.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      await api.verify({ email, code });
      navigate('/login', {
        state: {
          email,
          message: 'Account verified. You can now sign in with your password.',
        },
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.signup({ email, password, role });
      setCountdown(60);
      setSuccess('A new verification code has been sent to your email.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to resend verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--bg)',
      color: 'var(--text)',
    }}>
      {/* Left side - Branding */}
      <div style={{
        flex: 1,
        background: `linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)`,
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px',
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff',
          }}>T</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 18,
              background: 'linear-gradient(90deg, var(--accent), #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>TrafficFlow</div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 11,
              color: 'var(--text3)',
              letterSpacing: 1,
            }}>SMART CITIES</div>
          </div>
        </Link>

        <div>
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 16,
            lineHeight: 1.3,
          }}>Join Our Community</h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            {[
              'Real-time traffic monitoring',
              'Citizen incident reporting',
              'Advanced analytics & trends',
              'Collaborative urban planning',
            ].map((feature, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14,
                color: 'var(--text2)',
              }}>
                <FiCheck size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px',
        maxWidth: 420,
        margin: '0 auto',
      }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 900,
            marginBottom: 8,
          }}>Create Account</h1>
          <p style={{
            color: 'var(--text2)',
            fontSize: 15,
          }}>
            {step === 1 ? 'Create your account with email and password' : 'Enter the code we sent to your email'}
          </p>
        </div>

        <form onSubmit={step === 1 ? handleSignup : handleVerifyAccount} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Error Message */}
          {error && (
            <div style={{
              padding: 12,
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 8,
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              fontSize: 13,
              color: '#ef4444',
            }}>
              <FiAlertCircle size={16} style={{ marginTop: 2, flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div style={{
              padding: 12,
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: 8,
              fontSize: 13,
              color: '#22c55e',
            }}>
              {success}
            </div>
          )}

          {step === 1 ? (
            <>

              {/* Email Input */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: 'var(--text2)',
                }}>Email Address</label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  background: 'var(--surface)',
                  border: `1px solid ${focusedField === 'email' ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 8,
                  transition: 'all 0.2s',
                }}>
                  <FiMail size={18} style={{ color: 'var(--text3)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    placeholder="you@example.com"
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text)',
                      outline: 'none',
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: 'var(--text2)',
                }}>Password</label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  background: 'var(--surface)',
                  border: `1px solid ${focusedField === 'password' ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 8,
                  transition: 'all 0.2s',
                }}>
                  <FiLock size={18} style={{ color: 'var(--text3)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    placeholder="At least 8 characters"
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text)',
                      outline: 'none',
                      fontSize: 14,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: 'var(--text2)',
                }}>Confirm Password</label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  background: 'var(--surface)',
                  border: `1px solid ${focusedField === 'confirmPassword' ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 8,
                  transition: 'all 0.2s',
                }}>
                  <FiLock size={18} style={{ color: 'var(--text3)' }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Re-enter your password"
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text)',
                      outline: 'none',
                      fontSize: 14,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button - Request OTP */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 8,
                  padding: '12px 16px',
                  background: loading ? 'var(--text3)' : 'var(--accent)',
                  color: '#000',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Creating account...' : <>Create Account <FiArrowRight size={16} /></>}
              </button>
            </>
          ) : (
            <>
              {/* OTP Info */}
              <div style={{
                padding: 12,
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: 8,
                fontSize: 13,
                color: 'var(--accent)',
              }}>
                Verification code sent to <strong>{email}</strong>
              </div>

              {/* OTP Input */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: 'var(--text2)',
                }}>Enter 6-digit Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength="6"
                  placeholder="000000"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'var(--surface)',
                    border: `1px solid ${focusedField === 'otp' ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 8,
                    color: 'var(--text)',
                    fontSize: 24,
                    letterSpacing: 8,
                    textAlign: 'center',
                    fontWeight: 600,
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={() => setFocusedField('otp')}
                  onBlur={() => setFocusedField('')}
                />
              </div>

              {/* Resend OTP */}
              <div style={{
                textAlign: 'center',
                fontSize: 13,
                color: 'var(--text2)',
              }}>
                {countdown > 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <FiClock size={14} />
                    Resend in {countdown}s
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Resend Code
                  </button>
                )}
              </div>

              {/* Submit Button - Verify OTP */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 8,
                  padding: '12px 16px',
                  background: loading ? 'var(--text3)' : 'var(--accent)',
                  color: '#000',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Verifying...' : <>Verify Account <FiArrowRight size={16} /></>}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => { setStep(1); setError(''); setSuccess(''); setCode(''); setCountdown(0); }}
                style={{
                  padding: '12px 16px',
                  background: 'transparent',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                ← Change Email
              </button>
            </>
          )}
        </form>

        {/* Login Link */}
        <div style={{
          marginTop: 32,
          textAlign: 'center',
          paddingTop: 24,
          borderTop: '1px solid var(--border)',
        }}>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: 'var(--accent)',
              fontWeight: 600,
              textDecoration: 'none',
            }}>Sign in</Link>
          </p>
        </div>

        {/* Back to Home */}
        <Link to="/" style={{
          marginTop: 16,
          textAlign: 'center',
          color: 'var(--text3)',
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: 500,
        }}>← Back to Home</Link>
      </div>
    </div>
  );
}
