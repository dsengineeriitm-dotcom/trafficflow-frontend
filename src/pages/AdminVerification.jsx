import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function AdminVerification() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncidents = () => {
    setLoading(true);
    api.getAdminIncidents().then(r => {
      setIncidents(r.incidents || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleVerify = async (id, status) => {
    try {
      await api.verifyIncident(id, status);
      fetchIncidents();
    } catch (e) {
      alert('Failed to verify incident.');
    }
  };

  const pending = incidents.filter(i => i.status === 'pending');
  const processed = incidents.filter(i => i.status !== 'pending');

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Admin Verification Dashboard</h1>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>Review and approve citizen-reported traffic incidents to push them to the Live Map.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <div style={{ padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <div style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>PENDING REVIEW</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent3)' }}>{pending.length}</div>
        </div>
        <div style={{ padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <div style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>VERIFIED</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--success)' }}>{incidents.filter(i => i.status === 'verified').length}</div>
        </div>
        <div style={{ padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <div style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>REJECTED</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--danger)' }}>{incidents.filter(i => i.status === 'rejected').length}</div>
        </div>
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 16 }}>Pending Reports</h3>
      {loading ? (
        <div style={{ color: 'var(--text3)' }}>Loading reports...</div>
      ) : pending.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px dashed var(--border)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>👍</div>
          <div style={{ color: 'var(--text2)', fontWeight: 600 }}>All caught up!</div>
          <div style={{ color: 'var(--text3)', fontSize: 13, marginTop: 4 }}>No pending incidents to verify.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {pending.map(inc => (
            <div key={inc.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ padding: '4px 8px', background: 'var(--bg3)', borderRadius: 4, fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>#{inc.id}</span>
                  <span style={{ fontWeight: 700 }}>{inc.type.replace('_', ' ')}</span>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, border: '1px solid', borderColor: inc.severity === 'Major' ? 'var(--danger)' : 'var(--warning)', color: inc.severity === 'Major' ? 'var(--danger)' : 'var(--warning)' }}>
                    {inc.severity}
                  </span>
                  <span style={{ color: 'var(--text3)', fontSize: 12 }}>📍 {inc.city}</span>
                </div>
                <div style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.5 }}>"{inc.description}"</div>
                <div style={{ color: 'var(--text3)', fontSize: 11, marginTop: 8 }}>Reported: {new Date(inc.reported_at).toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button 
                  onClick={() => handleVerify(inc.id, 'verified')}
                  style={{ padding: '10px 16px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
                >
                  ✅ Verify
                </button>
                <button 
                  onClick={() => handleVerify(inc.id, 'rejected')}
                  style={{ padding: '10px 16px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {processed.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 16, color: 'var(--text3)' }}>Recently Processed</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {processed.slice(0, 5).map(inc => (
              <div key={inc.id} style={{ padding: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
                <div style={{ fontSize: 13 }}>
                  <span style={{ fontWeight: 600, marginRight: 8 }}>{inc.type.replace('_', ' ')}</span>
                  <span style={{ color: 'var(--text3)' }}>{inc.city}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: inc.status === 'verified' ? 'var(--success)' : 'var(--danger)' }}>
                  {inc.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
