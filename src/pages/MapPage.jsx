import React, { useEffect, useState, useRef } from 'react';
import { api, CITIES, PRIORITY_COLOR } from '../services/api';

const LAYERS = ['Hotspots', 'Incidents', 'Heatmap'];

function getLegendColor(score) {
  if (score > 85) return '#ef4444';
  if (score > 70) return '#f59e0b';
  if (score > 55) return '#3b82f6';
  return '#22c55e';
}

export default function MapPage({ city }) {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);
  const [hotspots, setHotspots] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [activeLayer, setActiveLayer] = useState('Hotspots');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const cityData = CITIES.find(c => c.name === city) || CITIES[0];

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;
    const L = window.L;
    if (!L) return;

    leafletMap.current = L.map(mapRef.current, {
      center: [cityData.lat, cityData.lon],
      zoom: 13,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(leafletMap.current);

    L.control.zoom({ position: 'bottomright' }).addTo(leafletMap.current);
  }, []);

  useEffect(() => {
    if (leafletMap.current) {
      leafletMap.current.setView([cityData.lat, cityData.lon], 13);
    }
    setLoading(true);
    const bbox = `${cityData.lon - 0.3},${cityData.lat - 0.3},${cityData.lon + 0.3},${cityData.lat + 0.3}`;
    Promise.all([api.getHotspots(city), api.getIncidents(bbox)]).then(([h, inc]) => {
      setHotspots(h.hotspots || []);
      setIncidents(inc.incidents || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [city]);

  useEffect(() => {
    const L = window.L;
    if (!L || !leafletMap.current) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    if (activeLayer === 'Hotspots') {
      hotspots.forEach((h, i) => {
        const color = getLegendColor(h.congestion_score);
        const marker = L.circleMarker([h.lat, h.lon], {
          radius: 8 + (h.congestion_score / 100) * 14,
          fillColor: color,
          color: '#fff',
          weight: 2,
          fillOpacity: 0.82,
        }).addTo(leafletMap.current);

        marker.on('click', () => setSelected(h));
        markersRef.current.push(marker);

        // Pulse ring
        const pulse = L.circleMarker([h.lat, h.lon], {
          radius: 20 + (h.congestion_score / 100) * 16,
          fillColor: 'transparent',
          color: color,
          weight: 1.5,
          opacity: 0.35,
          fillOpacity: 0,
        }).addTo(leafletMap.current);
        markersRef.current.push(pulse);
      });
    }

    if (activeLayer === 'Incidents') {
      incidents.forEach(inc => {
        const color = inc.severity === 'Major' ? '#ef4444' : inc.severity === 'High' ? '#f59e0b' : '#3b82f6';
        const marker = L.circleMarker([inc.lat, inc.lon], {
          radius: 10, fillColor: color, color: '#fff', weight: 2, fillOpacity: 0.9,
        }).addTo(leafletMap.current);
        marker.bindPopup(`<b>${inc.type}</b><br>${inc.description}`);
        markersRef.current.push(marker);
      });
    }

    if (activeLayer === 'Heatmap') {
      hotspots.forEach(h => {
        const gradient = h.congestion_score > 80 ? '#ef4444' : '#f59e0b';
        const circle = L.circle([h.lat, h.lon], {
          radius: 800,
          fillColor: gradient,
          color: 'transparent',
          fillOpacity: 0.25,
        }).addTo(leafletMap.current);
        markersRef.current.push(circle);
      });
    }
  }, [hotspots, incidents, activeLayer]);

  return (
    <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800 }}>{city} — Live Traffic Map</h2>
          <p style={{ color: 'var(--text3)', fontSize: 12, marginTop: 2 }}>Click a hotspot marker for details</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {LAYERS.map(l => (
            <button key={l} onClick={() => setActiveLayer(l)} style={{
              padding: '8px 16px', borderRadius: 8, border: '1px solid',
              borderColor: activeLayer === l ? 'var(--accent)' : 'var(--border)',
              background: activeLayer === l ? 'rgba(0,212,255,0.12)' : 'var(--surface)',
              color: activeLayer === l ? 'var(--accent)' : 'var(--text2)',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)',
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Map container */}
      <div style={{ flex: 1, position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        {/* Loading overlay */}
        {loading && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,12,20,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
            <div style={{ color: 'var(--accent)', fontSize: 13 }}>Loading map data...</div>
          </div>
        )}

        {/* Legend */}
        <div style={{
          position: 'absolute', bottom: 20, left: 20, background: 'rgba(13,20,33,0.95)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '12px 16px', zIndex: 999,
        }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>CONGESTION LEVEL</div>
          {[['Critical (85+)', '#ef4444'], ['High (70–85)', '#f59e0b'], ['Medium (55–70)', '#3b82f6'], ['Low (<55)', '#22c55e']].map(([l, c]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              <span style={{ fontSize: 11, color: 'var(--text2)' }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Selected hotspot panel */}
        {selected && (
          <div style={{
            position: 'absolute', top: 16, right: 16, width: 280, background: 'rgba(13,20,33,0.97)',
            border: '1px solid var(--border2)', borderRadius: 'var(--radius-lg)', padding: 20, zIndex: 999,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{selected.name}</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
            </div>
            {[
              ['Congestion Score', `${selected.congestion_score}/100`, getLegendColor(selected.congestion_score)],
              ['Frequency', `${selected.frequency_days} days/month`, 'var(--text)'],
              ['Peak Hours', selected.peak_hours, 'var(--text)'],
              ['Type', selected.type, 'var(--text)'],
            ].map(([label, val, color]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                <span style={{ color: 'var(--text3)' }}>{label}</span>
                <span style={{ color, fontWeight: 600 }}>{val}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, fontSize: 11, color: 'var(--text3)', padding: '10px', background: 'var(--bg3)', borderRadius: 8 }}>
              💡 {selected.congestion_score > 80 ? 'Flyover or road widening recommended' : selected.congestion_score > 65 ? 'Signal optimization suggested' : 'Monitor and maintain current infrastructure'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
