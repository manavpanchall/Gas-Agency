import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('currentUser'));

    function logout() {
        localStorage.removeItem('currentUser');
        navigate('/admin/login');
    }

    function handleAdminPanelClick() {
        if (!user) {
            navigate('/admin/login');
        } else {
            navigate('/admin/dashboard');
        }
    }

    function handleProfileClick() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.isAdmin) {
            navigate('/admin/profile');
        } else {
            navigate('/admin/login');
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#" onClick={handleAdminPanelClick}>
                    Admin Panel
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user ? (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user"></i> {user.name}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <button className="dropdown-item" onClick={handleProfileClick}>
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={logout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/login">
                                    Login
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;