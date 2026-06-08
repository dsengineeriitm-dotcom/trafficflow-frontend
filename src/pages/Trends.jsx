import React, { useEffect, useState, useRef } from 'react';
import { api } from '../services/api';

const PERIODS = ['hourly', 'weekly', 'monthly'];

function useChart(canvasRef, config) {
  useEffect(() => {
    if (!canvasRef.current || !config) return;
    let chart;
    const tryCreate = () => {
      if (window.Chart) {
        chart = new window.Chart(canvasRef.current, config);
      }
    };
    tryCreate();
    return () => { if (chart) chart.destroy(); };
  }, [config]);
}

export default function Trends({ city }) {
  const [period, setPeriod] = useState('monthly');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const barRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    api.getTrends(city, period).then(r => {
      setData(r.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [city, period]);

  const labels = data.map(d => d.label || d.hour || d.day);
  const congestionValues = data.map(d => d.congestion_index);
  const incidentValues = data.map(d => d.incidents || 0);

  const barChart = !loading && data.length ? {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Congestion Index',
        data: congestionValues,
        backgroundColor: congestionValues.map(v => v > 80 ? 'rgba(239,68,68,0.75)' : v > 65 ? 'rgba(245,158,11,0.75)' : 'rgba(0,212,255,0.6)'),
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#5a7a94', font: { size: 11 } }, grid: { color: 'rgba(99,179,237,0.08)' } },
        y: { ticks: { color: '#5a7a94', font: { size: 11 } }, grid: { color: 'rgba(99,179,237,0.08)' }, min: 0, max: 100 }
      }
    }
  } : null;

  const lineChart = !loading && data.length && period === 'monthly' ? {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Incidents',
          data: incidentValues,
          borderColor: '#7c3aed',
          backgroundColor: 'rgba(124,58,237,0.12)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#7c3aed',
          pointRadius: 4,
        },
        {
          label: 'Avg Delay (min)',
          data: data.map(d => d.avg_delay_min || 0),
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245,158,11,0.08)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#f59e0b',
          pointRadius: 4,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { color: '#94b8d4', font: { size: 11 }, boxWidth: 12, usePointStyle: true }
        }
      },
      scales: {
        x: { ticks: { color: '#5a7a94', font: { size: 11 } }, grid: { color: 'rgba(99,179,237,0.08)' } },
        y: { ticks: { color: '#5a7a94', font: { size: 11 } }, grid: { color: 'rgba(99,179,237,0.08)' } }
      }
    }
  } : null;

  useChart(barRef, barChart);
  useChart(lineRef, lineChart);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <div style={{ width: 3, height: 28, background: '#f59e0b', borderRadius: 2 }} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>Traffic Trends</h1>
        </div>
        <p style={{ color: 'var(--text3)', fontSize: 13, marginLeft: 15 }}>Historical congestion pattern analysis for {city}</p>
      </div>

      {/* Period toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {PERIODS.map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{
            padding: '8px 20px', borderRadius: 8, border: '1px solid',
            borderColor: period === p ? 'var(--accent)' : 'var(--border)',
            background: period === p ? 'rgba(0,212,255,0.12)' : 'var(--surface)',
            color: period === p ? 'var(--accent)' : 'var(--text3)',
            fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)',
            textTransform: 'capitalize',
          }}>{p}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
          <div style={{ color: 'var(--text3)' }}>Loading chart data...</div>
        </div>
      ) : (
        <>
          {/* Bar Chart */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>Congestion Index</h3>
              <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
                {[['Critical (>80)', '#ef4444'], ['High (65–80)', '#f59e0b'], ['Normal', '#00d4ff']].map(([l, c]) => (
                  <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text3)' }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: c, display: 'inline-block' }} />{l}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', height: 280 }}>
              <canvas ref={barRef} role="img" aria-label={`Congestion index ${period} chart for ${city}`} />
            </div>
          </div>

          {/* Line Chart (monthly only) */}
          {period === 'monthly' && (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Incidents & Delay Trends</h3>
              <div style={{ position: 'relative', height: 260 }}>
                <canvas ref={lineRef} role="img" aria-label={`Incidents and delay monthly chart for ${city}`} />
              </div>
            </div>
          )}

          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              { label: 'Peak Congestion', value: `${Math.max(...congestionValues)}%`, color: '#ef4444' },
              { label: 'Low Congestion', value: `${Math.min(...congestionValues)}%`, color: '#22c55e' },
              { label: 'Average', value: `${Math.round(congestionValues.reduce((a, b) => a + b, 0) / congestionValues.length)}%`, color: '#f59e0b' },
              { label: 'Data Points', value: data.length, color: 'var(--accent)' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 18px' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: 'var(--font-display)' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
