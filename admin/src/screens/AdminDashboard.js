import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import Bookings from './Bookings';
import Cylinders from './Cylinders';
import AddCylinder from './Addcylinder';
import Users from './Users';

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/admin/login'); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  const items = [
    { key: '1', label: 'Bookings', children: <Bookings /> },
    { key: '2', label: 'Cylinders', children: <Cylinders /> },
    { key: '3', label: 'Add Cylinder', children: <AddCylinder /> },
    { key: '4', label: 'Users', children: <Users /> },
  ];

  return (
    <div className="admin-dashboard">
      <h2><b>Admin Panel</b></h2>
      <Tabs items={items} />
    </div>
  );
}

export default AdminDashboard;