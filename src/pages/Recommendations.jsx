import React, { useEffect, useState } from 'react';
import { api, PRIORITY_COLOR, PRIORITY_BG } from '../services/api';

export default function Recommendations({ city }) {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getRecommendations(city).then(r => {
      setRecs(r.recommendations || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [city]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
      <div style={{ color: 'var(--text3)' }}>Generating infrastructure recommendations...</div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 3, height: 28, background: '#3b82f6', borderRadius: 2 }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>Infrastructure Action Plan</h1>
        </div>
        <p style={{ color: 'var(--text3)', fontSize: 13, marginLeft: 15 }}>
          AI-generated infrastructure recommendations to alleviate congestion in {city}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {recs.map((r) => {
          const color = PRIORITY_COLOR[r.priority];
          const bg = PRIORITY_BG[r.priority];
          
          return (
            <div key={r.location} style={{
              background: 'var(--surface)', border: `1px solid ${color}33`,
              borderRadius: 'var(--radius-lg)', padding: '20px 22px',
              display: 'flex', flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{r.location}</h3>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{r.lat.toFixed(4)}, {r.lon.toFixed(4)}</div>
                </div>
                <span style={{ background: bg, color, fontSize: 11, padding: '4px 10px', borderRadius: 20, fontWeight: 700, border: `1px solid ${color}55` }}>
                  {r.priority} Priority
                </span>
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 6, fontWeight: 600 }}>Suggested Solutions:</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text)', marginBottom: 16 }}>
                  {r.suggestions.map(s => <li key={s} style={{ marginBottom: 4 }}>{s}</li>)}
                </ul>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 10, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>Estimated Cost</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{r.estimated_cost}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>Expected Impact</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#22c55e' }}>{r.impact}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
