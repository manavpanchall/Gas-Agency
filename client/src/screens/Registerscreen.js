import React, { useState } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';

function Registerscreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  async function register() {
    if (password === confirmpassword) {
      const user = {
        name,
        email,
        password,
        confirmpassword,
      };

      try {
        setLoading(true);
        const result = await axios.post('/api/users/register', user); // API call to backend
        console.log(result.data);
        setLoading(false);
        setSuccess(true);

        // Clear form fields
        setName('');
        setEmail('');
        setPassword('');
        setConfirmpassword('');
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert('Passwords do not match');
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      {success && <Success message='User Registered Successfully' />}
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