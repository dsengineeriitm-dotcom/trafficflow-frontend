import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowRight, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import TunnelBackground from '../components/TunnelBackground';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: Success
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send password reset email. Please try again.');
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
            {step === 1 && "Enter your email to receive a reset link"}
            {step === 2 && "Reset email sent successfully!"}
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
              {loading ? 'Sending...' : <>Send Reset Link <FiArrowRight size={16} /></>}
            </button>
          </form>
        )}

        {step === 2 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, color: 'var(--accent)' }}>
              <FiCheckCircle size={64} />
            </div>
            <p style={{ color: 'var(--text2)', marginBottom: 24 }}>
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and click the link to reset your password.
            </p>
            <Link to="/login" style={{
              display: 'inline-block', padding: '12px 24px', background: 'var(--accent)', color: '#000',
              borderRadius: 8, fontWeight: 700, textDecoration: 'none'
            }}>
              Return to Login
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
