import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Verify from './pages/Verify';
import ForgotPassword from './pages/ForgotPassword';

import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import Hotspots from './pages/Hotspots';
import Recommendations from './pages/Recommendations';
import Trends from './pages/Trends';
import Reports from './pages/Reports';
import CitizenPortal from './pages/CitizenPortal';
import AdminVerification from './pages/AdminVerification';

export default function App() {
  const [city, setCity] = useState('Hyderabad');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    if (token && role) setUser({ token, role, email });
  }, []);

  const handleLogin = (token, role, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    setUser({ token, role, email });
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" replace /> : <ForgotPassword />} />

        {/* Protected Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout user={user} city={city} setCity={setCity} onLogout={handleLogout} />}>
          <Route index element={<Dashboard city={city} />} />
          <Route path="map" element={<MapPage city={city} />} />
          <Route path="hotspots" element={<Hotspots city={city} />} />
          <Route path="recommendations" element={<Recommendations city={city} />} />
          <Route path="trends" element={<Trends city={city} />} />
          <Route path="reports" element={<Reports city={city} />} />
          <Route path="citizen" element={<CitizenPortal city={city} />} />
          <Route path="admin" element={user?.role === 'admin' ? <AdminVerification /> : <Navigate to="/dashboard" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
