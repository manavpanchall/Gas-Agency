import React from 'react';

function Profile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <div className="container mt-5">
            <h2>Profile</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Name: {user.name}</h5>
                    <p className="card-text">Email: {user.email}</p>
                    <p className="card-text">Role: {user.isAdmin ? 'Admin' : 'User'}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;