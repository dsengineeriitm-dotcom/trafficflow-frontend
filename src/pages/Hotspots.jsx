import React, { useEffect, useState } from 'react';
import { api, PRIORITY_COLOR, PRIORITY_BG } from '../services/api';

function HotspotCard({ h, rank }) {
  const priority = h.congestion_score > 85 ? 'Critical' : h.congestion_score > 70 ? 'High' : h.congestion_score > 55 ? 'Medium' : 'Low';
  const color = PRIORITY_COLOR[priority];
  const bg = PRIORITY_BG[priority];

  return (
    <div style={{
      background: 'var(--surface)', border: `1px solid ${color}33`,
      borderRadius: 'var(--radius-lg)', padding: '20px 22px',
      display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 16, alignItems: 'start',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color,
      }}>
        #{rank}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>{h.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 10 }}>
          {h.type} · {h.frequency_days} days/month · Peak: {h.peak_hours}
        </div>
        {/* Score bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 6, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${h.congestion_score}%`, background: `linear-gradient(90deg, ${color}77, ${color})`, borderRadius: 3 }} />
          </div>
          <span style={{ fontSize: 13, color, fontWeight: 700, minWidth: 36 }}>{h.congestion_score}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <span style={{ background: bg, color, fontSize: 11, padding: '5px 12px', borderRadius: 20, fontWeight: 700, border: `1px solid ${color}55` }}>
          {priority}
        </span>
        <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 8 }}>
          {h.lat?.toFixed(3)}°N<br />{h.lon?.toFixed(3)}°E
        </div>
      </div>
    </div>
  );
}

export default function Hotspots({ city }) {
  const [hotspots, setHotspots] = useState([]);
  const [sort, setSort] = useState('score');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getHotspots(city).then(r => {
      setHotspots(r.hotspots || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [city]);

  const sorted = [...hotspots].sort((a, b) => {
    if (sort === 'score') return b.congestion_score - a.congestion_score;
    if (sort === 'frequency') return b.frequency_days - a.frequency_days;
    return a.name.localeCompare(b.name);
  });

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}>
      <div style={{ color: 'var(--text3)' }}>Analyzing hotspots...</div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 3, height: 28, background: '#ef4444', borderRadius: 2 }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>Congestion Hotspots</h1>
        </div>
        <p style={{ color: 'var(--text3)', fontSize: 13, marginLeft: 15 }}>
          Recurring congestion zones identified through historical pattern analysis in {city}
        </p>
      </div>

      {/* Method explanation */}
      <div style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 'var(--radius)', padding: '14px 18px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 20 }}>ℹ️</span>
        <div>
          <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginBottom: 3 }}>Detection Methodology</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.6 }}>
            Hotspots are identified by analyzing TomTom historical flow data + HERE incident reports. A location is flagged when congestion_score &gt; 50 occurs on &gt;12 days/month. Score = weighted average of speed ratio, jam factor, and incident frequency.
          </div>
        </div>
      </div>

      {/* Sort controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>Sort by:</span>
        {[['score', 'Congestion Score'], ['frequency', 'Frequency'], ['name', 'Name']].map(([val, label]) => (
          <button key={val} onClick={() => setSort(val)} style={{
            padding: '6px 14px', borderRadius: 8, border: '1px solid',
            borderColor: sort === val ? 'var(--accent)' : 'var(--border)',
            background: sort === val ? 'rgba(0,212,255,0.1)' : 'transparent',
            color: sort === val ? 'var(--accent)' : 'var(--text3)',
            fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)',
          }}>{label}</button>
        ))}
      </div>

      {/* Hotspot list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sorted.map((h, i) => <HotspotCard key={h.name} h={h} rank={i + 1} />)}
      </div>
    </div>
  );
}
