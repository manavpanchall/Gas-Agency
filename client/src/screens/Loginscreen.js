import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    async function Login() {
        const user = {
            email,
            password,
        };

        try {
            setLoading(true);
            const result = await axios.post('/api/users/login', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response from server:', result.data);
            setLoading(false);
            localStorage.setItem('currentUser', JSON.stringify(result.data));
            window.location.href = '/home';

        } catch (error) {
            console.log('Error response from server:', error.response ? error.response.data : error.message);
            setLoading(false);
            setError(true);
        }
    }
    return (
        <div>
            {loading && (<Loader />)}
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 mt-5'>
                    {error && (<Error message='Invalid Credentials' />)}
                    <div className='bs'>
                        <h2>Login</h2>
                        <input type="text" className='form-control' placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="text" className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />

                        <button className='btn btn-primary mt-3' onClick={Login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginscreen;