import React, { useEffect } from 'react'; // Import useEffect
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './screens/AdminLogin';
import AdminDashboard from './screens/AdminDashboard';
import Navbar from './components/Navbar';
import Profile from './screens/Profile';
import './App.css';

function App() {
  useEffect(() => {
    // Clear localStorage on page refresh
    localStorage.removeItem('currentUser');
  }, []);

  const user = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" replace />}
        />
        <Route
          path="/admin/profile"
          element={user && user.isAdmin ? <Profile /> : <Navigate to="/admin/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;