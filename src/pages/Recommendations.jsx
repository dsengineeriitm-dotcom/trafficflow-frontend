import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api, PRIORITY_COLOR, PRIORITY_BG } from '../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

function parseImpact(impactStr) {
  // Extract number from string like "↓ 35-45% congestion"
  const match = impactStr.match(/(\d+)/);
  if (!match) return 20;
  return parseInt(match[1], 10);
}

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
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 3, height: 28, background: '#3b82f6', borderRadius: 2 }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>Infrastructure Action Plan</h1>
        </div>
        <p style={{ color: 'var(--text3)', fontSize: 13, marginLeft: 15 }}>
          AI-generated infrastructure recommendations to alleviate congestion in {city}
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {recs.map((r) => {
          const color = PRIORITY_COLOR[r.priority];
          const bg = PRIORITY_BG[r.priority];
          const impactPercent = parseImpact(r.impact);
          
          return (
            <motion.div variants={itemVariants} key={r.location} style={{
              background: 'var(--surface)', border: `1px solid ${color}33`,
              borderRadius: 'var(--radius-lg)', padding: '20px 22px',
              display: 'flex', flexDirection: 'column',
              boxShadow: r.priority === 'Critical' ? `0 0 20px ${color}15` : 'none',
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
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text)', marginBottom: 20 }}>
                  {r.suggestions.map(s => <li key={s} style={{ marginBottom: 4 }}>{s}</li>)}
                </ul>
              </div>
              
              <div style={{ marginTop: 10, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>Estimated Cost</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{r.estimated_cost}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>Expected Impact</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#22c55e' }}>{r.impact}</div>
                  </div>
                </div>

                {/* Visual Impact Bar */}
                <div style={{ height: 6, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${impactPercent * 2}%` }} /* Scale up for visual effect */
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, rgba(34,197,94,0.5), #22c55e)', borderRadius: 3 }} 
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
