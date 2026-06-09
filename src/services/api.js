/* ────────── City-aware mock data for all dashboard components ────────── */

export const CITIES = [
  { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
  { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { name: 'Pune', lat: 18.5204, lon: 73.8567 },
];

export const PRIORITY_COLOR = {
  Critical: '#ef4444',
  High: '#f59e0b',
  Medium: '#3b82f6',
  Low: '#22c55e',
};

export const PRIORITY_BG = {
  Critical: 'rgba(239,68,68,0.15)',
  High: 'rgba(245,158,11,0.15)',
  Medium: 'rgba(59,130,246,0.15)',
  Low: 'rgba(34,197,94,0.15)',
};

/* ─── Hotspot data per city (used by Dashboard, Hotspots, MapPage) ─── */

const HOTSPOTS_DB = {
  Hyderabad: [
    { name: 'Mehdipatnam Junction', type: 'intersection', lat: 17.3950, lon: 78.4420, congestion_score: 92, frequency_days: 26, peak_hours: '8:30–10:30 AM' },
    { name: 'Ameerpet Flyover', type: 'flyover', lat: 17.4375, lon: 78.4483, congestion_score: 88, frequency_days: 24, peak_hours: '9:00–11:00 AM' },
    { name: 'LB Nagar Circle', type: 'roundabout', lat: 17.3457, lon: 78.5522, congestion_score: 82, frequency_days: 22, peak_hours: '8:00–10:00 AM' },
    { name: 'Madhapur IT Hub', type: 'corridor', lat: 17.4486, lon: 78.3908, congestion_score: 78, frequency_days: 20, peak_hours: '5:30–7:30 PM' },
    { name: 'Panjagutta Cross', type: 'intersection', lat: 17.4260, lon: 78.4509, congestion_score: 74, frequency_days: 18, peak_hours: '9:00–10:30 AM' },
    { name: 'Kukatpally Y Junction', type: 'junction', lat: 17.4849, lon: 78.4138, congestion_score: 71, frequency_days: 19, peak_hours: '8:30–10:00 AM' },
    { name: 'Miyapur Metro Road', type: 'arterial', lat: 17.4969, lon: 78.3548, congestion_score: 65, frequency_days: 16, peak_hours: '6:00–8:00 PM' },
    { name: 'ECIL Junction', type: 'intersection', lat: 17.4614, lon: 78.5709, congestion_score: 60, frequency_days: 14, peak_hours: '8:00–9:30 AM' },
    { name: 'Begumpet Rail Crossing', type: 'crossing', lat: 17.4419, lon: 78.4723, congestion_score: 55, frequency_days: 12, peak_hours: '7:30–9:00 AM' },
    { name: 'Gachibowli ORR Entry', type: 'ramp', lat: 17.4400, lon: 78.3489, congestion_score: 52, frequency_days: 13, peak_hours: '5:00–7:00 PM' },
  ],
  Mumbai: [
    { name: 'Andheri Subway', type: 'subway', lat: 19.1197, lon: 72.8464, congestion_score: 95, frequency_days: 28, peak_hours: '8:00–10:30 AM' },
    { name: 'Sion-Panvel Highway', type: 'highway', lat: 19.0428, lon: 72.8620, congestion_score: 90, frequency_days: 26, peak_hours: '7:30–10:00 AM' },
    { name: 'Dadar TT Circle', type: 'roundabout', lat: 19.0178, lon: 72.8478, congestion_score: 87, frequency_days: 25, peak_hours: '8:30–11:00 AM' },
    { name: 'WEH Goregaon', type: 'highway', lat: 19.1559, lon: 72.8495, congestion_score: 83, frequency_days: 23, peak_hours: '9:00–11:00 AM' },
    { name: 'Haji Ali Junction', type: 'intersection', lat: 18.9827, lon: 72.8130, congestion_score: 76, frequency_days: 20, peak_hours: '5:30–7:30 PM' },
    { name: 'Mulund Toll Naka', type: 'toll', lat: 19.1726, lon: 72.9436, congestion_score: 70, frequency_days: 18, peak_hours: '8:00–10:00 AM' },
    { name: 'Bandra-Worli Sea Link', type: 'bridge', lat: 19.0297, lon: 72.8157, congestion_score: 68, frequency_days: 17, peak_hours: '6:00–8:30 PM' },
    { name: 'Thane-Belapur Road', type: 'arterial', lat: 19.2094, lon: 72.9788, congestion_score: 62, frequency_days: 15, peak_hours: '8:00–9:30 AM' },
  ],
  Bengaluru: [
    { name: 'Silk Board Junction', type: 'intersection', lat: 12.9170, lon: 77.6227, congestion_score: 96, frequency_days: 28, peak_hours: '8:00–11:00 AM' },
    { name: 'KR Puram Bridge', type: 'bridge', lat: 12.9984, lon: 77.6961, congestion_score: 91, frequency_days: 26, peak_hours: '8:30–10:30 AM' },
    { name: 'Hebbal Flyover', type: 'flyover', lat: 13.0358, lon: 77.5970, congestion_score: 85, frequency_days: 24, peak_hours: '9:00–11:00 AM' },
    { name: 'Marathahalli Bridge', type: 'bridge', lat: 12.9591, lon: 77.7019, congestion_score: 82, frequency_days: 22, peak_hours: '5:00–7:30 PM' },
    { name: 'Whitefield Road', type: 'corridor', lat: 12.9698, lon: 77.7500, congestion_score: 78, frequency_days: 21, peak_hours: '8:00–10:00 AM' },
    { name: 'Koramangala BDA Complex', type: 'intersection', lat: 12.9352, lon: 77.6245, congestion_score: 72, frequency_days: 18, peak_hours: '5:30–7:00 PM' },
    { name: 'Electronic City Toll', type: 'toll', lat: 12.8448, lon: 77.6718, congestion_score: 67, frequency_days: 16, peak_hours: '8:30–10:00 AM' },
    { name: 'Banashankari Circle', type: 'roundabout', lat: 12.9255, lon: 77.5468, congestion_score: 58, frequency_days: 14, peak_hours: '9:00–10:30 AM' },
  ],
  Delhi: [
    { name: 'ITO Junction', type: 'intersection', lat: 28.6280, lon: 77.2410, congestion_score: 93, frequency_days: 27, peak_hours: '8:00–10:30 AM' },
    { name: 'Ashram Chowk', type: 'intersection', lat: 28.5692, lon: 77.2564, congestion_score: 90, frequency_days: 26, peak_hours: '8:30–11:00 AM' },
    { name: 'Dhaula Kuan', type: 'flyover', lat: 28.5920, lon: 77.1650, congestion_score: 86, frequency_days: 24, peak_hours: '9:00–11:00 AM' },
    { name: 'Moolchand Flyover', type: 'flyover', lat: 28.5712, lon: 77.2398, congestion_score: 81, frequency_days: 22, peak_hours: '5:30–7:30 PM' },
    { name: 'Kashmere Gate ISBT', type: 'terminal', lat: 28.6679, lon: 77.2295, congestion_score: 76, frequency_days: 20, peak_hours: '7:00–9:30 AM' },
    { name: 'Rajouri Garden Metro', type: 'corridor', lat: 28.6493, lon: 77.1219, congestion_score: 69, frequency_days: 17, peak_hours: '9:00–10:30 AM' },
    { name: 'Sarai Kale Khan', type: 'interchange', lat: 28.5892, lon: 77.2578, congestion_score: 64, frequency_days: 15, peak_hours: '8:00–10:00 AM' },
    { name: 'Mundka Industrial Area', type: 'arterial', lat: 28.6843, lon: 77.0316, congestion_score: 56, frequency_days: 13, peak_hours: '6:00–8:00 PM' },
  ],
  Chennai: [
    { name: 'Kathipara Junction', type: 'cloverleaf', lat: 13.0114, lon: 80.2013, congestion_score: 91, frequency_days: 26, peak_hours: '8:00–10:30 AM' },
    { name: 'Koyambedu Signal', type: 'intersection', lat: 13.0694, lon: 80.1948, congestion_score: 87, frequency_days: 24, peak_hours: '8:30–10:30 AM' },
    { name: 'Guindy Flyover', type: 'flyover', lat: 13.0067, lon: 80.2206, congestion_score: 83, frequency_days: 23, peak_hours: '9:00–11:00 AM' },
    { name: 'Adyar Signal', type: 'intersection', lat: 13.0063, lon: 80.2574, congestion_score: 77, frequency_days: 20, peak_hours: '5:00–7:00 PM' },
    { name: 'Anna Nagar Tower', type: 'roundabout', lat: 13.0850, lon: 80.2101, congestion_score: 72, frequency_days: 18, peak_hours: '8:00–9:30 AM' },
    { name: 'OMR Thoraipakkam', type: 'corridor', lat: 12.9342, lon: 80.2321, congestion_score: 66, frequency_days: 16, peak_hours: '5:30–7:30 PM' },
    { name: 'T. Nagar Ranganathan St', type: 'market', lat: 13.0418, lon: 80.2341, congestion_score: 60, frequency_days: 22, peak_hours: '11:00 AM–1:00 PM' },
  ],
  Pune: [
    { name: 'Swargate Chowk', type: 'intersection', lat: 18.5018, lon: 73.8636, congestion_score: 89, frequency_days: 25, peak_hours: '8:30–10:30 AM' },
    { name: 'Hinjewadi IT Park Entry', type: 'corridor', lat: 18.5912, lon: 73.7389, congestion_score: 86, frequency_days: 24, peak_hours: '9:00–11:00 AM' },
    { name: 'Chandni Chowk', type: 'intersection', lat: 18.5283, lon: 73.7868, congestion_score: 82, frequency_days: 22, peak_hours: '8:00–10:00 AM' },
    { name: 'Kothrud Depo', type: 'junction', lat: 18.5074, lon: 73.8077, congestion_score: 75, frequency_days: 19, peak_hours: '5:30–7:30 PM' },
    { name: 'Katraj Tunnel', type: 'tunnel', lat: 18.4546, lon: 73.8660, congestion_score: 70, frequency_days: 17, peak_hours: '8:30–10:00 AM' },
    { name: 'Viman Nagar Chowk', type: 'roundabout', lat: 18.5679, lon: 73.9143, congestion_score: 63, frequency_days: 15, peak_hours: '9:00–10:30 AM' },
    { name: 'Hadapsar Bus Stand', type: 'terminal', lat: 18.5089, lon: 73.9260, congestion_score: 57, frequency_days: 13, peak_hours: '7:30–9:00 AM' },
  ],
};

/* ─── Stats per city (used by Dashboard) ─── */

const STATS_DB = {
  Hyderabad: { total_hotspots: 10, critical_zones: 3, avg_congestion: 72, estimated_daily_loss: '₹3.8 Cr', peak_hour: '9:00–10:30 AM', worst_day: 'Monday', vehicles_affected: '3.2L', improvement_potential: '38%' },
  Mumbai: { total_hotspots: 8, critical_zones: 3, avg_congestion: 79, estimated_daily_loss: '₹8.5 Cr', peak_hour: '8:30–10:30 AM', worst_day: 'Friday', vehicles_affected: '5.1L', improvement_potential: '32%' },
  Bengaluru: { total_hotspots: 8, critical_zones: 3, avg_congestion: 76, estimated_daily_loss: '₹6.2 Cr', peak_hour: '8:00–10:00 AM', worst_day: 'Monday', vehicles_affected: '4.5L', improvement_potential: '35%' },
  Delhi: { total_hotspots: 8, critical_zones: 2, avg_congestion: 74, estimated_daily_loss: '₹9.1 Cr', peak_hour: '8:30–10:30 AM', worst_day: 'Tuesday', vehicles_affected: '6.3L', improvement_potential: '40%' },
  Chennai: { total_hotspots: 7, critical_zones: 2, avg_congestion: 71, estimated_daily_loss: '₹3.1 Cr', peak_hour: '8:30–10:30 AM', worst_day: 'Monday', vehicles_affected: '2.9L', improvement_potential: '42%' },
  Pune: { total_hotspots: 7, critical_zones: 2, avg_congestion: 73, estimated_daily_loss: '₹2.4 Cr', peak_hour: '9:00–11:00 AM', worst_day: 'Wednesday', vehicles_affected: '2.1L', improvement_potential: '45%' },
};

/* ─── Trends data per period (used by Trends page) ─── */

function generateTrends(period) {
  if (period === 'hourly') {
    return [
      { label: '6 AM', congestion_index: 35, incidents: 2, avg_delay_min: 4 },
      { label: '7 AM', congestion_index: 55, incidents: 3, avg_delay_min: 8 },
      { label: '8 AM', congestion_index: 78, incidents: 5, avg_delay_min: 14 },
      { label: '9 AM', congestion_index: 92, incidents: 8, avg_delay_min: 22 },
      { label: '10 AM', congestion_index: 85, incidents: 6, avg_delay_min: 18 },
      { label: '11 AM', congestion_index: 62, incidents: 4, avg_delay_min: 10 },
      { label: '12 PM', congestion_index: 50, incidents: 3, avg_delay_min: 7 },
      { label: '1 PM', congestion_index: 48, incidents: 2, avg_delay_min: 6 },
      { label: '2 PM', congestion_index: 52, incidents: 3, avg_delay_min: 8 },
      { label: '3 PM', congestion_index: 58, incidents: 3, avg_delay_min: 9 },
      { label: '4 PM', congestion_index: 72, incidents: 5, avg_delay_min: 13 },
      { label: '5 PM', congestion_index: 88, incidents: 7, avg_delay_min: 20 },
      { label: '6 PM', congestion_index: 91, incidents: 8, avg_delay_min: 23 },
      { label: '7 PM', congestion_index: 80, incidents: 6, avg_delay_min: 16 },
      { label: '8 PM', congestion_index: 58, incidents: 3, avg_delay_min: 9 },
      { label: '9 PM', congestion_index: 38, incidents: 2, avg_delay_min: 5 },
    ];
  }
  if (period === 'weekly') {
    return [
      { label: 'Mon', congestion_index: 82, incidents: 12, avg_delay_min: 18 },
      { label: 'Tue', congestion_index: 75, incidents: 9, avg_delay_min: 14 },
      { label: 'Wed', congestion_index: 78, incidents: 10, avg_delay_min: 16 },
      { label: 'Thu', congestion_index: 73, incidents: 8, avg_delay_min: 13 },
      { label: 'Fri', congestion_index: 85, incidents: 14, avg_delay_min: 20 },
      { label: 'Sat', congestion_index: 55, incidents: 5, avg_delay_min: 8 },
      { label: 'Sun', congestion_index: 38, incidents: 3, avg_delay_min: 5 },
    ];
  }
  // monthly
  return [
    { label: 'Jan', congestion_index: 68, incidents: 42, avg_delay_min: 12 },
    { label: 'Feb', congestion_index: 72, incidents: 38, avg_delay_min: 14 },
    { label: 'Mar', congestion_index: 75, incidents: 45, avg_delay_min: 15 },
    { label: 'Apr', congestion_index: 70, incidents: 35, avg_delay_min: 13 },
    { label: 'May', congestion_index: 65, incidents: 30, avg_delay_min: 11 },
    { label: 'Jun', congestion_index: 78, incidents: 52, avg_delay_min: 17 },
    { label: 'Jul', congestion_index: 85, incidents: 60, avg_delay_min: 20 },
    { label: 'Aug', congestion_index: 82, incidents: 55, avg_delay_min: 19 },
    { label: 'Sep', congestion_index: 76, incidents: 48, avg_delay_min: 16 },
    { label: 'Oct', congestion_index: 72, incidents: 40, avg_delay_min: 14 },
    { label: 'Nov', congestion_index: 69, incidents: 36, avg_delay_min: 13 },
    { label: 'Dec', congestion_index: 74, incidents: 44, avg_delay_min: 15 },
  ];
}

/* ─── Recommendations per city (used by Recommendations page) ─── */

function getRecommendations(city) {
  const hotspots = HOTSPOTS_DB[city] || HOTSPOTS_DB.Hyderabad;
  return {
    recommendations: hotspots.slice(0, 5).map(h => {
      const priority = h.congestion_score > 85 ? 'Critical' : h.congestion_score > 70 ? 'High' : h.congestion_score > 55 ? 'Medium' : 'Low';
      const suggestions = [];
      if (h.congestion_score > 85) {
        suggestions.push('Construct grade-separated flyover or underpass');
        suggestions.push('Implement adaptive signal timing with AI sensors');
        suggestions.push('Designate alternate bypass route for heavy vehicles');
      } else if (h.congestion_score > 70) {
        suggestions.push('Optimize traffic signal cycle duration');
        suggestions.push('Add dedicated left-turn lane');
        suggestions.push('Deploy traffic wardens during peak hours');
      } else {
        suggestions.push('Install smart sensors for real-time monitoring');
        suggestions.push('Improve road markings and signage');
        suggestions.push('Add pedestrian refuge islands');
      }
      const costs = { Critical: '₹45–80 Cr', High: '₹8–25 Cr', Medium: '₹2–8 Cr', Low: '₹50L–2 Cr' };
      const impacts = { Critical: '↓ 35–45% congestion', High: '↓ 20–30% congestion', Medium: '↓ 10–18% congestion', Low: '↓ 5–10% congestion' };
      return {
        location: h.name,
        lat: h.lat,
        lon: h.lon,
        priority,
        suggestions,
        estimated_cost: costs[priority],
        impact: impacts[priority],
      };
    }),
  };
}

/* ─── Incidents data (used by MapPage) ─── */

function getIncidentsForCity(city) {
  const cityData = CITIES.find(c => c.name === city) || CITIES[0];
  return {
    incidents: [
      { type: 'Accident', description: 'Two-vehicle collision blocking left lane', lat: cityData.lat + 0.012, lon: cityData.lon + 0.008, severity: 'Major' },
      { type: 'Road Work', description: 'Metro construction — lane closure', lat: cityData.lat - 0.015, lon: cityData.lon + 0.022, severity: 'High' },
      { type: 'Signal Fault', description: 'Traffic light malfunction at junction', lat: cityData.lat + 0.008, lon: cityData.lon - 0.012, severity: 'Moderate' },
      { type: 'Waterlogging', description: 'Heavy rain causing waterlogging on underpass', lat: cityData.lat - 0.020, lon: cityData.lon - 0.005, severity: 'Major' },
      { type: 'Event', description: 'Political rally causing road diversion', lat: cityData.lat + 0.025, lon: cityData.lon + 0.015, severity: 'High' },
    ],
  };
}

/* ════════════════════════  PUBLIC API  ════════════════════════ */

export const api = {
  // Auth stubs (Firebase handles these now)
  login: async () => { throw new Error('Use Firebase Auth instead'); },
  signup: async () => { throw new Error('Use Firebase Auth instead'); },
  verify: async () => { throw new Error('Use Firebase Auth instead'); },
  requestOTP: async () => { throw new Error('Use Firebase Auth instead'); },
  verifyOTP: async () => { throw new Error('Use Firebase Auth instead'); },
  forgotPassword: async () => { throw new Error('Use Firebase Auth instead'); },
  resetPassword: async () => { throw new Error('Use Firebase Auth instead'); },
  googleAuth: async () => { throw new Error('Use Firebase Auth instead'); },

  /* ── Dashboard ── */
  getStats: async (city) => STATS_DB[city] || STATS_DB.Hyderabad,

  /* ── Hotspots & Map ── */
  getHotspots: async (city) => ({
    hotspots: HOTSPOTS_DB[city] || HOTSPOTS_DB.Hyderabad,
  }),

  /* ── Recommendations ── */
  getRecommendations: async (city) => getRecommendations(city),

  /* ── Trends ── */
  getTrends: async (city, period) => ({
    data: generateTrends(period),
  }),

  /* ── Traffic Flow (map layer) ── */
  getTrafficFlow: async () => ({ flowData: [] }),

  /* ── Incidents ── */
  getIncidents: async (bbox) => {
    // Determine closest city from bbox string "lon1,lat1,lon2,lat2"
    const parts = bbox.split(',').map(Number);
    const centerLat = (parts[1] + parts[3]) / 2;
    const centerLon = (parts[0] + parts[2]) / 2;
    let closest = CITIES[0];
    let minDist = Infinity;
    CITIES.forEach(c => {
      const d = Math.abs(c.lat - centerLat) + Math.abs(c.lon - centerLon);
      if (d < minDist) { minDist = d; closest = c; }
    });
    return getIncidentsForCity(closest.name);
  },

  /* ── Citizen Portal ── */
  reportIncident: async () => ({ success: true, message: 'Incident reported successfully' }),
  getAdminIncidents: async () => [],
  verifyIncident: async () => ({ success: true }),
};
