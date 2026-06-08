import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { CITIES } from '../services/api';

export default function DashboardLayout({ user, city, setCity, onLogout }) {
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar
        city={city}
        onCityChange={setCity}
        cities={CITIES}
        user={user}
        onLogout={onLogout}
      />
      <main style={{ marginLeft: 240, flex: 1, padding: '32px 36px', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  );
}
