import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';

function Registerscreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function register() {
    if (password !== confirmpassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    const user = { name, email, password };

    try {
      setLoading(true);
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, user);
      setLoading(false);

      // Automatically log in the user after registration
      const loginResult = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, { email, password });
      localStorage.setItem('currentUser', JSON.stringify(loginResult.data)); // Save user data to localStorage

      // Show success popup
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'You have been logged in automatically.',
      }).then(() => {
        navigate('/home'); // Redirect to home page
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
      Swal.fire('Error', 'Registration Failed', 'error');
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          <div className='bs'>
            <h2>Register</h2>
            <input
              type="text"
              className='form-control'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className='form-control'
              placeholder='Confirm Password'
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <button className='btn btn-primary mt-3' onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;