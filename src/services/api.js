import axios from 'axios';

const BASE = 'https://trafficflow-backend-8v90.onrender.com/api';

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  login: (data) => axios.post(`${BASE}/auth/login`, data).then(r => r.data),
  signup: (data) => axios.post(`${BASE}/auth/signup`, data).then(r => r.data),
  verify: (data) => axios.post(`${BASE}/auth/verify`, data).then(r => r.data),
  requestOTP: (email) => axios.post(`${BASE}/auth/request-otp`, { email }).then(r => r.data),
  verifyOTP: (email, otp) => axios.post(`${BASE}/auth/verify-otp`, { email, otp }).then(r => r.data),
  forgotPassword: (email) => axios.post(`${BASE}/auth/forgot-password`, { email }).then(r => r.data),
  resetPassword: (email, otp, new_password) => axios.post(`${BASE}/auth/reset-password`, { email, otp, new_password }).then(r => r.data),
  googleAuth: (data) => axios.post(`${BASE}/auth/google`, data).then(r => r.data),

  getStats: (city) => axios.get(`${BASE}/stats?city=${city}`).then(r => r.data),
  getHotspots: (city) => axios.get(`${BASE}/hotspots?city=${city}`).then(r => r.data),
  getRecommendations: (city) => axios.get(`${BASE}/recommendations?city=${city}`).then(r => r.data),
  getTrends: (city, period) => axios.get(`${BASE}/trends?city=${city}&period=${period}`).then(r => r.data),
  getTrafficFlow: (lat, lon) => axios.get(`${BASE}/traffic/flow?lat=${lat}&lon=${lon}`).then(r => r.data),
  getIncidents: (bbox) => axios.get(`${BASE}/traffic/incidents?bbox=${bbox}`).then(r => r.data),
  
  reportIncident: (data) => axios.post(`${BASE}/incidents/report`, data, { headers: authHeaders() }).then(r => r.data),
  getAdminIncidents: () => axios.get(`${BASE}/incidents/admin`, { headers: authHeaders() }).then(r => r.data),
  verifyIncident: (id, status) => axios.post(`${BASE}/incidents/verify/${id}`, { status }, { headers: authHeaders() }).then(r => r.data),
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
