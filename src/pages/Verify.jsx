import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Verify() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || '';
  const verificationCode = state?.verificationCode || ''; // OTP from signup response

  // 6 individual digit inputs
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigit = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length < 6) { setError('Please enter the full 6-digit code.'); return; }
    setError('');
    setLoading(true);
    try {
      await api.verify({ email, code });
      setSuccess('Account verified successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{ padding: '20px 40px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg2)' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00d4ff22, #7c3aed22)', border: '1px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛣️</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--accent)' }}>TRAFFIC PLANNER</span>
        </Link>
        <Link to="/login" style={{ fontSize: 14, color: 'var(--text3)', textDecoration: 'none' }}>
          ← Back to Login
        </Link>
      </nav>

      {/* Page Body */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 460, textAlign: 'center' }}>

          {/* Icon */}
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,212,255,0.1)', border: '2px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 28px' }}>📧</div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, letterSpacing: -1, marginBottom: 12 }}>Verify your account</h1>
          <p style={{ color: 'var(--text3)', fontSize: 15, lineHeight: 1.6, marginBottom: 8 }}>
            Enter the 6-digit verification code sent to your email.
          </p>
          {email && <p style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: 12, fontSize: 14 }}>{email}</p>}

          {verificationCode && (
            <div style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.4)', borderRadius: 12, padding: '14px 16px', marginBottom: 20, textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>📨 Your verification code:</p>
              <p style={{ fontSize: 24, fontWeight: 900, fontFamily: 'var(--font-display)', color: '#22c55e', letterSpacing: 4 }}>{verificationCode}</p>
            </div>
          )}



          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '14px 18px', borderRadius: 10, fontSize: 14, marginBottom: 24, border: '1px solid rgba(239,68,68,0.3)' }}>
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', padding: '14px 18px', borderRadius: 10, fontSize: 14, marginBottom: 24, border: '1px solid rgba(34,197,94,0.3)' }}>
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '36px' }}>
            <label style={{ display: 'block', marginBottom: 20, fontSize: 13, color: 'var(--text2)', fontWeight: 600 }}>Enter 6-Digit Code</label>

            {/* OTP Input Boxes */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
              {digits.map((d, i) => (
                <input key={i}
                  ref={el => inputRefs.current[i] = el}
                  type="text" inputMode="numeric" maxLength={1} value={d}
                  onChange={e => handleDigit(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  style={{
                    width: 52, height: 64, textAlign: 'center', fontSize: 28, fontWeight: 800,
                    background: d ? 'rgba(0,212,255,0.1)' : 'var(--bg3)',
                    border: `2px solid ${d ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 12, color: 'var(--accent)', outline: 'none',
                    transition: 'all 0.15s', fontFamily: 'var(--font-display)',
                  }}
                />
              ))}
            </div>

            <button type="submit" disabled={loading || success}
              style={{ width: '100%', padding: 15, background: success ? '#22c55e' : 'var(--accent)', color: '#000', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 800, cursor: loading || success ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-display)', letterSpacing: 1, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'VERIFYING...' : success ? '✓ VERIFIED' : 'VERIFY CODE →'}
            </button>
          </form>

          <p style={{ marginTop: 24, fontSize: 13, color: 'var(--text3)' }}>
            Didn't get a code?{' '}
            <Link to="/signup" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Sign up again</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
