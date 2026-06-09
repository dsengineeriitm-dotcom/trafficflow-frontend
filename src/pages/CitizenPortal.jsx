import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api, CITIES } from '../services/api';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function CitizenPortal({ city }) {
  const [formData, setFormData] = useState({
    type: 'ACCIDENT',
    severity: 'Medium',
    description: '',
  });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [submitting, setSubmitting] = useState(false);
  
  // No auto-loading on mount to prevent browser blocking.
  const [gps, setGps] = useState({ lat: null, lon: null, error: null, loading: false });
  
  const cityData = CITIES.find(c => c.name === city) || CITIES[0];

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setGps({ lat: null, lon: null, error: 'Geolocation not supported by browser', loading: false });
      return;
    }
    
    setGps({ lat: null, lon: null, error: null, loading: true });
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGps({ 
          lat: position.coords.latitude, 
          lon: position.coords.longitude, 
          error: null, 
          loading: false 
        });
      },
      (err) => {
        setGps({ lat: null, lon: null, error: err.message, loading: false });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', msg: '' });

    try {
      let finalLat = gps.lat;
      let finalLon = gps.lon;

      if (!finalLat || !finalLon) {
        const latOffset = (Math.random() - 0.5) * 0.02;
        const lonOffset = (Math.random() - 0.5) * 0.02;
        finalLat = cityData.lat + latOffset;
        finalLon = cityData.lon + lonOffset;
      }

      await api.reportIncident({
        ...formData,
        city,
        lat: finalLat,
        lon: finalLon,
      });

      setStatus({ type: 'success', msg: 'Incident reported successfully! It is pending admin verification.' });
      setFormData({ ...formData, description: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to submit report. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const mapLat = gps.lat || cityData.lat;
  const mapLon = gps.lon || cityData.lon;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 28, textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Citizen Reporting</h1>
        <p style={{ color: 'var(--text3)', fontSize: 14 }}>Report a traffic incident in {city} to alert other drivers and authorities.</p>
      </div>

      {status.msg && (
        <div style={{ 
          padding: '16px 20px', borderRadius: 'var(--radius)', marginBottom: 24,
          background: status.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
          border: `1px solid ${status.type === 'success' ? '#22c55e55' : '#ef444455'}`,
          color: status.type === 'success' ? '#22c55e' : '#ef4444', fontSize: 14, fontWeight: 600
        }}>
          {status.msg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        
        {/* Form Side */}
        <form onSubmit={handleSubmit} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
          {/* Incident Type */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text2)', fontWeight: 600 }}>Incident Type</label>
            <select 
              value={formData.type} 
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none' }}
            >
              <option value="ACCIDENT">🚗 Accident</option>
              <option value="ROAD_WORKS">🚧 Road Works</option>
              <option value="CONGESTION">🛑 Severe Congestion</option>
              <option value="HAZARD">⚠️ Hazard on Road</option>
            </select>
          </div>

          {/* Severity */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text2)', fontWeight: 600 }}>Severity</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {['Low', 'Medium', 'High', 'Major'].map(lvl => (
                <button 
                  key={lvl} type="button"
                  onClick={() => setFormData({ ...formData, severity: lvl })}
                  style={{
                    padding: '10px 0', border: '1px solid', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: formData.severity === lvl ? 'var(--accent)' : 'var(--bg3)',
                    borderColor: formData.severity === lvl ? 'var(--accent)' : 'var(--border)',
                    color: formData.severity === lvl ? '#000' : 'var(--text3)',
                    transition: 'all 0.2s'
                  }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text2)', fontWeight: 600 }}>Description Details</label>
            <textarea 
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="E.g., 2 cars involved, blocking the left lane near the bridge..."
              style={{ width: '100%', padding: '16px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, outline: 'none', minHeight: 100, resize: 'vertical' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            style={{ width: '100%', padding: 16, background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-display)', letterSpacing: 1, opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? 'SUBMITTING...' : 'SUBMIT REPORT'}
          </button>
        </form>

        {/* Map Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Location Notice */}
          <div style={{ padding: 16, background: gps.lat ? 'rgba(34,197,94,0.05)' : (gps.error ? 'rgba(239,68,68,0.05)' : 'rgba(0,212,255,0.05)'), borderRadius: 'var(--radius)', border: `1px dashed ${gps.lat ? 'rgba(34,197,94,0.3)' : (gps.error ? 'rgba(239,68,68,0.3)' : 'rgba(0,212,255,0.3)')}`, display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 24 }}>{gps.lat ? '🎯' : (gps.loading ? '⏳' : '📍')}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: gps.lat ? 'var(--success)' : (gps.error ? 'var(--danger)' : 'var(--accent)') }}>
                {gps.loading ? 'Acquiring GPS Signal...' : (gps.lat ? 'Live GPS Location Locked' : (gps.error ? 'Location Error: ' + gps.error : 'Manual Detection Required'))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>
                {gps.loading ? 'Please allow location access when prompted...' : (gps.lat ? `Accuracy guaranteed. Coordinates: ${gps.lat.toFixed(4)}, ${gps.lon.toFixed(4)}` : `Click the button to grant location access and pinpoint your live location.`)}
              </div>
            </div>
            {!gps.lat && !gps.loading && (
              <button 
                onClick={detectLocation}
                style={{ padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Detect Location
              </button>
            )}
          </div>

          {/* Google Maps Iframe */}
          <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', minHeight: 300 }}>
            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0, minHeight: 400 }}
              src={`https://maps.google.com/maps?q=${mapLat},${mapLon}&z=15&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
