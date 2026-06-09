import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import TunnelBackground from '../components/TunnelBackground';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ onLogin }) {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(location.state?.message || '');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const navigate = useNavigate();
  const isStatusMessage = error.toLowerCase().includes('verified') || error.toLowerCase().includes('sign in');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Firebase auth handles tokens, but we keep the onLogin interface for compatibility
      onLogin(userCredential.user.accessToken, 'citizen', email);
      navigate('/dashboard');
    } catch (err) {
      let msg = err.message;
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password';
      }
      setError(msg);
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

      {/* Right side - Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px',
        maxWidth: 420,
        margin: '0 auto',
      }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 900,
            marginBottom: 8,
          }}>Welcome Back</h1>
          <p style={{
            color: 'var(--text2)',
            fontSize: 15,
          }}>Sign in to access your traffic dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Error Message */}
          {error && (
            <div style={{
              padding: 12,
              background: isStatusMessage ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: isStatusMessage ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 8,
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              fontSize: 13,
              color: isStatusMessage ? '#22c55e' : '#ef4444',
            }}>
              <FiAlertCircle size={16} style={{ marginTop: 2, flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

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

          {/* Password Input */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}>
              <label style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text2)',
              }}>Password</label>
              <Link to="/forgot-password" style={{
                fontSize: 12,
                color: 'var(--accent)',
                textDecoration: 'none',
                fontWeight: 500,
              }}>Forgot?</Link>
            </div>
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
                placeholder="••••••••"
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

          {/* Submit Button */}
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
            {loading ? 'Signing in...' : <>Sign In <FiArrowRight size={16} /></>}
          </button>
        </form>

        {/* Signup Link */}
        <div style={{
          marginTop: 32,
          textAlign: 'center',
          paddingTop: 24,
          borderTop: '1px solid var(--border)',
        }}>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{
              color: 'var(--accent)',
              fontWeight: 600,
              textDecoration: 'none',
            }}>Create one</Link>
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
