import React from 'react';
import { Link } from 'react-router-dom';
import { FiMap, FiAlertCircle, FiTrendingUp, FiUsers, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Navigation */}
      <nav style={{
        padding: '20px 40px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg2)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 'bold',
            color: '#fff',
          }}>T</div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 16,
              letterSpacing: 1,
              background: 'linear-gradient(90deg, var(--accent), #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>TrafficFlow</div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 10,
              color: 'var(--text3)',
              letterSpacing: 1.5,
            }}>SMART CITIES</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            gap: 8,
            '@media (max-width: 768px)': { display: 'none' }
          }}>
            <Link to="/login" style={{
              textDecoration: 'none',
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: 14,
              padding: '10px 18px',
              borderRadius: 8,
              transition: 'all 0.3s',
              border: '1px solid transparent',
              cursor: 'pointer',
            }}>Log In</Link>
            <Link to="/signup" style={{
              textDecoration: 'none',
              background: 'var(--accent)',
              color: '#000',
              fontWeight: 700,
              fontSize: 14,
              padding: '10px 20px',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0, 212, 255, 0.25)',
              transition: 'all 0.3s',
              border: '1px solid var(--accent)',
            }}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '80px 40px',
        textAlign: 'center',
        background: `linear-gradient(135deg, var(--bg) 0%, var(--bg2) 100%)`,
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 16px',
          background: 'rgba(0, 212, 255, 0.1)',
          color: 'var(--accent)',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1.5,
          marginBottom: 24,
          border: '1px solid rgba(0, 212, 255, 0.3)',
        }}>
          🚀 NEXT-GENERATION URBAN MOBILITY
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 900,
          lineHeight: 1.15,
          marginBottom: 20,
          maxWidth: 900,
          margin: '0 auto 20px',
          background: 'linear-gradient(135deg, var(--text), var(--accent))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Solve Traffic Congestion with Real-Time Intelligence
        </h1>

        <p style={{
          color: 'var(--text2)',
          fontSize: 'clamp(14px, 1.5vw, 18px)',
          maxWidth: 650,
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Combine live TomTom and HERE geospatial data with citizen crowdsourcing to analyze traffic patterns, identify hotspots, and optimize city infrastructure in real-time.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <Link to="/signup" style={{
            textDecoration: 'none',
            background: 'var(--accent)',
            color: '#000',
            fontWeight: 700,
            fontSize: 15,
            padding: '14px 32px',
            borderRadius: 8,
            boxShadow: '0 6px 20px rgba(0, 212, 255, 0.3)',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid var(--accent)',
          }}>
            Start Free <FiArrowRight size={18} />
          </Link>
          <button style={{
            textDecoration: 'none',
            background: 'transparent',
            color: 'var(--text)',
            fontWeight: 600,
            fontSize: 15,
            padding: '14px 32px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}>
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 900,
            marginBottom: 12,
          }}>Powerful Features for Smart Cities</h2>
          <p style={{
            color: 'var(--text2)',
            fontSize: 16,
            maxWidth: 500,
            margin: '0 auto',
          }}>Everything you need to understand and optimize traffic flow</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {[
            {
              icon: FiMap,
              title: 'Live Traffic Map',
              desc: 'Real-time visualization of congestion hotspots with interactive maps'
            },
            {
              icon: FiAlertCircle,
              title: 'Incident Tracking',
              desc: 'Citizen reports combined with official data for comprehensive alerts'
            },
            {
              icon: FiTrendingUp,
              title: 'Trend Analysis',
              desc: 'Identify patterns and predict traffic flows with advanced analytics'
            },
            {
              icon: FiUsers,
              title: 'Community Driven',
              desc: 'Engage citizens to report and resolve traffic issues collaboratively'
            },
          ].map((feature, i) => (
            <div key={i} style={{
              padding: 32,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              transition: 'all 0.3s',
              cursor: 'pointer',
            }} onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 212, 255, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: 50,
                height: 50,
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(124, 58, 237, 0.2))',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                fontSize: 24,
                color: 'var(--accent)',
              }}>
                <feature.icon />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{feature.title}</h3>
              <p style={{ color: 'var(--text3)', fontSize: 14, lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '60px 40px',
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          maxWidth: 1000,
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {[
            { label: '50+', value: 'Cities Covered' },
            { label: '1M+', value: 'Incidents Resolved' },
            { label: '99.9%', value: 'Uptime' },
            { label: '10K+', value: 'Active Users' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 8,
              }}>{stat.label}</div>
              <div style={{ color: 'var(--text2)', fontWeight: 600 }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 40px',
        textAlign: 'center',
        background: `linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)`,
      }}>
        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 900,
          marginBottom: 16,
        }}>Ready to Optimize Your City?</h2>
        <p style={{
          color: 'var(--text2)',
          fontSize: 16,
          marginBottom: 32,
          maxWidth: 500,
          margin: '0 auto 32px',
        }}>Join urban planners and traffic management teams already transforming their cities</p>
        <Link to="/signup" style={{
          textDecoration: 'none',
          background: 'var(--accent)',
          color: '#000',
          fontWeight: 700,
          fontSize: 15,
          padding: '14px 36px',
          borderRadius: 8,
          boxShadow: '0 6px 20px rgba(0, 212, 255, 0.3)',
          display: 'inline-block',
          transition: 'all 0.3s',
        }}>Get Started Free</Link>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg2)',
        color: 'var(--text3)',
        fontSize: 13,
        textAlign: 'center',
      }}>
        <p>© 2024 TrafficFlow. Built for smarter cities.</p>
      </footer>
    </div>
  );
}
