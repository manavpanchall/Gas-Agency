import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function login() {
    const user = { email, password };

    try {
      setLoading(true);
      const result = await axios.post('/api/users/login', user);
      setLoading(false);

      // Check if the user is an admin
      if (result.data.isAdmin) {
        localStorage.setItem('currentUser', JSON.stringify(result.data)); // Save user data to localStorage
        navigate('/admin/dashboard'); // Redirect to admin dashboard
      } else {
        setError(true); // Show error if the user is not an admin
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="login-container">
      {loading && <Loader />}
      <div className="login-box">
        {error && <Error message="Invalid Credentials" />}
        <h2>Admin Login</h2>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;