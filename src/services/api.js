export const api = {
  login: async (data) => { throw new Error("Use Firebase Auth instead"); },
  signup: async (data) => { throw new Error("Use Firebase Auth instead"); },
  verify: async (data) => { throw new Error("Use Firebase Auth instead"); },
  requestOTP: async (email) => { throw new Error("Use Firebase Auth instead"); },
  verifyOTP: async (email, otp) => { throw new Error("Use Firebase Auth instead"); },
  forgotPassword: async (email) => { throw new Error("Use Firebase Auth instead"); },
  resetPassword: async (email, otp, new_password) => { throw new Error("Use Firebase Auth instead"); },
  googleAuth: async (data) => { throw new Error("Use Firebase Auth instead"); },

  getStats: async (city) => {
    return {
      congestion_level: Math.floor(Math.random() * 40) + 40,
      active_incidents: Math.floor(Math.random() * 15) + 5,
      avg_speed: Math.floor(Math.random() * 20) + 20,
      emissions_saved: Math.floor(Math.random() * 500) + 100,
      predicted_congestion: Math.floor(Math.random() * 30) + 60
    };
  },
  getHotspots: async (city) => {
    const cityData = CITIES.find(c => c.name === city) || CITIES[0];
    return [
      { id: 1, lat: cityData.lat + 0.01, lon: cityData.lon + 0.01, severity: 'High', description: 'Major intersection jam' },
      { id: 2, lat: cityData.lat - 0.02, lon: cityData.lon - 0.01, severity: 'Critical', description: 'Accident reported' },
      { id: 3, lat: cityData.lat + 0.015, lon: cityData.lon - 0.015, severity: 'Medium', description: 'Slow moving traffic' },
    ];
  },
  getRecommendations: async (city) => {
    return [
      { type: 'signal_timing', action: 'Increase green light duration at Main St by 15s', impact: 'High', impact_desc: 'Reduces wait time by 22%' },
      { type: 'route_diversion', action: 'Divert heavy vehicles away from Downtown hub', impact: 'Medium', impact_desc: 'Improves flow by 12%' },
      { type: 'infrastructure', action: 'Deploy smart sensors at Junction A', impact: 'High', impact_desc: 'Enables real-time adaptive routing' },
    ];
  },
  getTrends: async (city, period) => {
    return {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      congestion: [10, 15, 85, 45, 90, 30],
      emissions: [20, 25, 100, 60, 110, 40]
    };
  },
  getTrafficFlow: async (lat, lon) => {
    return { mock: true, flowData: [] };
  },
  getIncidents: async (bbox) => {
    return { mock: true, incidents: [] };
  },
  
  reportIncident: async (data) => {
    return { success: true, message: "Incident reported successfully (Mock)" };
  },
  getAdminIncidents: async () => {
    return [];
  },
  verifyIncident: async (id, status) => {
    return { success: true };
  },
};

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
