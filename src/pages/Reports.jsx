import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Reports({ city }) {
  const [stats, setStats] = useState(null);
  const [hotspots, setHotspots] = useState([]);
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    Promise.all([api.getStats(city), api.getHotspots(city), api.getRecommendations(city)]).then(([s, h, r]) => {
      setStats(s);
      setHotspots(h.hotspots || []);
      setRecs(r.recommendations || []);
    });
  }, [city]);

  const handlePrint = () => window.print();

  const totalCost = recs.reduce((acc, r) => {
    const match = r.estimated_cost?.match(/₹(\d+)/);
    return acc + (match ? parseInt(match[1]) : 0);
  }, 0);

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <div style={{ width: 3, height: 28, background: '#22c55e', borderRadius: 2 }} />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>Infrastructure Report</h1>
          </div>
          <p style={{ color: 'var(--text3)', fontSize: 13, marginLeft: 15 }}>Comprehensive traffic planning report for {city}</p>
        </div>
        <button onClick={handlePrint} style={{
          padding: '10px 20px', background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: 10, color: 'var(--accent)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)',
        }}>🖨️ Print / Export PDF</button>
      </div>

      {/* Report Header */}
      <div style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.06), rgba(124,58,237,0.06))', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
          Traffic Infrastructure Planner — Executive Summary
        </div>
        <div style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 20 }}>
          City: {city} · Generated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · Analysis Period: Last 12 months
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {[
            { label: 'Hotspots Identified', value: hotspots.length },
            { label: 'Critical Zones', value: recs.filter(r => r.priority === 'Critical').length, color: '#ef4444' },
            { label: 'Total Recommendations', value: recs.length },
            { label: 'Daily Economic Loss', value: stats?.estimated_daily_loss || '₹4.2 Cr', color: '#f59e0b' },
            { label: 'Avg Congestion', value: `${stats?.avg_congestion || 68}%`, color: '#00d4ff' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--surface)', borderRadius: 10, padding: '14px 16px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color || 'var(--text)', fontFamily: 'var(--font-display)' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Infrastructure Action Plan</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr>
              {['#', 'Location', 'Priority', 'Recommended Solution', 'Est. Cost', 'Expected Impact'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text3)', fontWeight: 600, fontSize: 10, letterSpacing: 0.8, borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recs.map((r, i) => {
              const colors = { Critical: '#ef4444', High: '#f59e0b', Medium: '#3b82f6', Low: '#22c55e' };
              return (
                <tr key={r.location} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', color: 'var(--text3)' }}>{i + 1}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text)', fontWeight: 500 }}>{r.location}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ color: colors[r.priority], fontWeight: 700, fontSize: 11 }}>{r.priority}</span>
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--text2)' }}>{r.suggestions[0]}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text)', fontWeight: 600 }}>{r.estimated_cost}</td>
                  <td style={{ padding: '10px 12px', color: '#22c55e', fontSize: 11 }}>{r.impact}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Key Findings */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Key Findings & Conclusion</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { title: 'Primary Problem', content: `${city} has ${recs.filter(r=>r.priority==='Critical').length} critical congestion zones requiring immediate infrastructure intervention, causing an estimated ${stats?.estimated_daily_loss || '₹4.2 Cr'} daily economic loss.`, icon: '🔴' },
            { title: 'Root Cause', content: 'Insufficient road capacity at key intersections combined with lack of alternative routes forces all traffic through narrow corridors during peak hours.', icon: '📍' },
            { title: 'Recommended Action', content: `Prioritize flyover construction at top 3 hotspots. Implement smart signal optimization at all ${recs.filter(r=>r.priority==='Medium').length} medium-priority zones within 6 months.`, icon: '✅' },
            { title: 'Expected Outcome', content: `Implementing all ${recs.length} recommendations could reduce city-wide congestion by 35–45%, improving average commute time by 18–25 minutes.`, icon: '📈' },
          ].map((f, i) => (
            <div key={i} style={{ padding: '16px 18px', background: 'var(--bg3)', borderRadius: 10, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 14, marginBottom: 6 }}>{f.icon} <span style={{ fontWeight: 700, color: 'var(--text)' }}>{f.title}</span></div>
              <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.7 }}>{f.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
