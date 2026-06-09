import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api, PRIORITY_COLOR } from '../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

function StatCard({ label, value, sub, color, icon }) {
  return (
    <motion.div variants={itemVariants} style={{
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
      padding: '20px 22px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${color}88, transparent)`,
      }} />
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>{sub}</div>}
    </motion.div>
  );
}

function CongestionBar({ label, score, color }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
        <span style={{ color: 'var(--text2)' }}>{label}</span>
        <span style={{ color, fontWeight: 600 }}>{score}%</span>
      </div>
      <div style={{ height: 6, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{
            height: '100%', borderRadius: 3,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
          }} 
        />
      </div>
    </div>
  );
}

export default function Dashboard({ city }) {
  const [stats, setStats] = useState(null);
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getStats(city), api.getHotspots(city)]).then(([s, h]) => {
      setStats(s);
      setHotspots(h.hotspots || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [city]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400, flexDirection: 'column', gap: 12 }}>
      <div style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <div style={{ color: 'var(--text3)', fontSize: 13 }}>Loading city data...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const priorityCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  hotspots.forEach(h => {
    if (h.congestion_score > 85) priorityCounts.Critical++;
    else if (h.congestion_score > 70) priorityCounts.High++;
    else if (h.congestion_score > 55) priorityCounts.Medium++;
    else priorityCounts.Low++;
  });

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      {/* Header */}
      <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 3, height: 28, background: 'var(--accent)', borderRadius: 2 }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>{city} Overview</h1>
          <span style={{ background: 'rgba(0,212,255,0.12)', color: 'var(--accent)', fontSize: 11, padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(0,212,255,0.25)', fontWeight: 600 }}>LIVE</span>
        </div>
        <p style={{ color: 'var(--text3)', fontSize: 13, marginLeft: 15 }}>Traffic infrastructure analysis & planning dashboard</p>
      </motion.div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Hotspots" value={stats?.total_hotspots || 12} sub="Recurring congestion zones" color="#00d4ff" icon="🔴" />
        <StatCard label="Critical Zones" value={stats?.critical_zones || 3} sub="Immediate action needed" color="#ef4444" icon="⚠️" />
        <StatCard label="Avg Congestion" value={`${stats?.avg_congestion || 68}%`} sub="City-wide index" color="#f59e0b" icon="📊" />
        <StatCard label="Daily Economic Loss" value={stats?.estimated_daily_loss || '₹4.2 Cr'} sub="Productivity impact" color="#7c3aed" icon="💸" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Top Hotspots */}
        <motion.div variants={itemVariants} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 22 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 18, color: 'var(--text)' }}>Top Congestion Zones</h3>
          {hotspots.slice(0, 6).map((h) => {
            const color = h.congestion_score > 85 ? '#ef4444' : h.congestion_score > 70 ? '#f59e0b' : h.congestion_score > 55 ? '#3b82f6' : '#22c55e';
            return <CongestionBar key={h.name} label={h.name} score={h.congestion_score} color={color} />;
          })}
        </motion.div>

        {/* Priority Breakdown + Quick Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <motion.div variants={itemVariants} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 22 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 16, color: 'var(--text)' }}>Priority Distribution</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.entries(priorityCounts).map(([p, c]) => (
                <div key={p} style={{ background: 'var(--bg3)', borderRadius: 10, padding: '14px 16px', border: `1px solid ${PRIORITY_COLOR[p]}33` }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: PRIORITY_COLOR[p], fontFamily: 'var(--font-display)' }}>{c}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{p}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 22, flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 14, color: 'var(--text)' }}>Quick Insights</h3>
            {[
              { label: 'Peak Hours', value: stats?.peak_hour || '8:30–10:00 AM', icon: '🕗' },
              { label: 'Worst Day', value: stats?.worst_day || 'Monday', icon: '📅' },
              { label: 'Vehicles Affected', value: stats?.vehicles_affected || '2.8L', icon: '🚗' },
              { label: 'Improvement Potential', value: stats?.improvement_potential || '42%', icon: '📈' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: 13, color: 'var(--text3)' }}>{item.icon} {item.label}</span>
                <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Hotspot Table */}
      <motion.div variants={itemVariants} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 22 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 18, color: 'var(--text)' }}>All Congestion Zones</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Location', 'Type', 'Score', 'Frequency', 'Peak Hours', 'Priority'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--text3)', fontWeight: 600, fontSize: 11, letterSpacing: 0.8, borderBottom: '1px solid var(--border)' }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hotspots.map((h) => {
              const priority = h.congestion_score > 85 ? 'Critical' : h.congestion_score > 70 ? 'High' : h.congestion_score > 55 ? 'Medium' : 'Low';
              const color = PRIORITY_COLOR[priority];
              return (
                <tr key={h.name} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 12px', color: 'var(--text)', fontWeight: 500 }}>{h.name}</td>
                  <td style={{ padding: '12px 12px', color: 'var(--text2)', textTransform: 'capitalize' }}>{h.type}</td>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ height: 4, width: 50, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${h.congestion_score}%`, background: color, borderRadius: 2 }} />
                      </div>
                      <span style={{ color, fontWeight: 700 }}>{h.congestion_score}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 12px', color: 'var(--text2)' }}>{h.frequency_days} days/month</td>
                  <td style={{ padding: '12px 12px', color: 'var(--text2)', fontSize: 12 }}>{h.peak_hours}</td>
                  <td style={{ padding: '12px 12px' }}>
                    <span style={{ background: `${color}22`, color, fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600, border: `1px solid ${color}44` }}>{priority}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
