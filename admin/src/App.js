import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './screens/AdminLogin';
import AdminDashboard from './screens/AdminDashboard';
import Navbar from './components/Navbar';
import Profile from './screens/Profile';
import './App.css';

function App() {
  useEffect(() => {
    // Optional: Clear localStorage on page refresh
    // localStorage.removeItem('currentUser');
  }, []);

  const user = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        
        {/* Public route */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected admin routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            user?.isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/profile" 
          element={
            user?.isAdmin ? <Profile /> : <Navigate to="/admin/login" replace />
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;