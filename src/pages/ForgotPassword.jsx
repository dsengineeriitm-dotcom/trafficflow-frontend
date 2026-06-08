import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { api } from '../services/api';
import TunnelBackground from '../components/TunnelBackground';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password, 3: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      await api.forgotPassword(email);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp || !newPassword) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await api.resetPassword(email, otp, newPassword);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP or failed to reset password.');
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
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
      }} className="hidden md:flex">
        <TunnelBackground>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '40px',
            height: '100%',
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)',
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
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: 1,
                }}>SMART CITIES</div>
              </div>
            </Link>

            <div>
              <blockquote style={{
                fontSize: 24,
                fontWeight: 600,
                marginBottom: 16,
                lineHeight: 1.4,
                color: '#fff',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                "Real-time traffic intelligence for smarter urban planning."
              </blockquote>
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 14,
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}>Join thousands of urban planners optimizing their cities</p>
            </div>
          </div>
        </TunnelBackground>
      </div>

      {/* Right side - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px',
        maxWidth: 420,
        margin: '0 auto',
        width: '100%',
      }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 900,
            marginBottom: 8,
          }}>Forgot Password</h1>
          <p style={{
            color: 'var(--text2)',
            fontSize: 15,
          }}>
            {step === 1 && "Enter your email to receive a reset code"}
            {step === 2 && "Enter the 6-digit code and your new password"}
            {step === 3 && "Password updated successfully!"}
          </p>
        </div>

        {error && (
          <div style={{
            padding: 12,
            marginBottom: 16,
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

        {step === 1 && (
          <form onSubmit={handleRequestOTP} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text2)' }}>Email Address</label>
              <div style={{
                position: 'relative', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                background: 'var(--surface)', border: `1px solid ${focusedField === 'email' ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 8, transition: 'all 0.2s',
              }}>
                <FiMail size={18} style={{ color: 'var(--text3)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  placeholder="you@example.com"
                  style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', fontSize: 14 }}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8, padding: '12px 16px', background: loading ? 'var(--text3)' : 'var(--accent)',
                color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Sending...' : <>Send Reset Code <FiArrowRight size={16} /></>}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text2)' }}>6-Digit Reset Code</label>
              <div style={{
                position: 'relative', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                background: 'var(--surface)', border: `1px solid ${focusedField === 'otp' ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 8, transition: 'all 0.2s',
              }}>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onFocus={() => setFocusedField('otp')}
                  onBlur={() => setFocusedField('')}
                  placeholder="000000"
                  style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', fontSize: 14, letterSpacing: '2px', textAlign: 'center' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text2)' }}>New Password</label>
              <div style={{
                position: 'relative', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                background: 'var(--surface)', border: `1px solid ${focusedField === 'password' ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 8, transition: 'all 0.2s',
              }}>
                <FiLock size={18} style={{ color: 'var(--text3)' }} />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  placeholder="••••••••"
                  style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', fontSize: 14 }}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8, padding: '12px 16px', background: loading ? 'var(--text3)' : 'var(--accent)',
                color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Resetting...' : <>Reset Password <FiArrowRight size={16} /></>}
            </button>
          </form>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, color: 'var(--accent)' }}>
              <FiCheckCircle size={64} />
            </div>
            <p style={{ color: 'var(--text2)', marginBottom: 24 }}>
              Your password has been reset successfully. You can now log in with your new password.
            </p>
            <Link to="/login" style={{
              display: 'inline-block', padding: '12px 24px', background: 'var(--accent)', color: '#000',
              borderRadius: 8, fontWeight: 700, textDecoration: 'none'
            }}>
              Go to Login
            </Link>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>
            Remembered your password?{' '}
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
