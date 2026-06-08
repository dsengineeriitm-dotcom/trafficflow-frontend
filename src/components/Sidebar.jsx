import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NAV = [
  { path: '/dashboard', label: 'Dashboard', icon: '⬡' },
  { path: '/dashboard/map', label: 'Live Map', icon: '◎' },
  { path: '/dashboard/hotspots', label: 'Hotspots', icon: '▲' },
  { path: '/dashboard/recommendations', label: 'Infrastructure', icon: '⬢' },
  { path: '/dashboard/trends', label: 'Trends', icon: '◈' },
  { path: '/dashboard/reports', label: 'Reports', icon: '▣' },
  { path: '/dashboard/citizen', label: 'Citizen Report', icon: '📢' },
  { path: '/dashboard/admin', label: 'Admin Verify', icon: '🛡️', adminOnly: true },
];

export default function Sidebar({ city, onCityChange, cities, user, onLogout }) {
  const navigate = useNavigate();
  const navItems = NAV.filter(item => !item.adminOnly || user?.role === 'admin');

  return (
    <aside style={{
      width: 240, minHeight: '100vh', background: 'var(--bg2)',
      borderRight: '1px solid var(--border)', display: 'flex',
      flexDirection: 'column', position: 'fixed', left: 0, top: 0, zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #00d4ff22, #7c3aed22)', border: '1px solid rgba(0,212,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛣️</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, letterSpacing: 1, color: 'var(--accent)' }}>TRAFFIC</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, color: 'var(--text3)', letterSpacing: 2 }}>INFRASTRUCTURE PLANNER</div>
          </div>
        </div>
      </div>

      {/* City Selector */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 10, color: 'var(--text3)', letterSpacing: 1.5, marginBottom: 8, fontWeight: 600 }}>ACTIVE CITY</div>
        <select value={city} onChange={e => onCityChange(e.target.value)}
          style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, padding: '8px 12px', fontSize: 13, fontFamily: 'var(--font)', cursor: 'pointer', outline: 'none' }}>
          {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px' }}>
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} end={item.path === '/dashboard'}
            style={({ isActive }) => ({
              width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
              borderRadius: 10, marginBottom: 3, transition: 'all 0.2s', textDecoration: 'none',
              background: isActive ? 'rgba(0,212,255,0.1)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text2)',
              borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
              fontSize: 13, fontWeight: isActive ? 600 : 400,
            })}>
            <span style={{ fontSize: 16, opacity: 0.85 }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
        {user && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
            <div style={{ fontSize: 10, color: user.role === 'admin' ? 'var(--accent)' : 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, fontWeight: 700 }}>
              {user.role === 'admin' ? '🛡️ Admin' : '👤 Citizen'}
            </div>
            <button onClick={onLogout}
              style={{ width: '100%', padding: '7px 0', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.5 }}>
              LOGOUT
            </button>
          </div>
        )}
        <div style={{ fontSize: 10, color: 'var(--text3)', lineHeight: 1.6 }}>
          <div>Powered by TomTom + HERE</div>
          <div style={{ marginTop: 2, color: 'rgba(0,212,255,0.5)', fontSize: 9 }}>v2.0.0 · Real-time Data</div>
        </div>
      </div>
    </aside>
  );
}
