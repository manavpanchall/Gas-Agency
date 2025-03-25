import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

function Profile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/admin/login');
        }
    }, [user, navigate]);

    if (!user) {
        return <Loader />;
    }

    return (
        <div className="container mt-5">
            <h2>Admin Profile</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Name: {user.name}</h5>
                    <p className="card-text">Email: {user.email}</p>
                    <p className="card-text">User ID: {user._id}</p>
                    <p className="card-text">
                        Role: <span className="badge bg-primary">
                            {user.isAdmin ? 'Administrator' : 'Regular User'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;