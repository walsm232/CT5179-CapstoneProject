import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AuthenticatedNavbar: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            try {
                const parsedUsername = JSON.parse(storedUsername);
                if (typeof parsedUsername === 'string') {
                    setUsername(parsedUsername);
                }
            } catch (e) {
                setUsername(storedUsername);
            }
        }
        const storedRole = sessionStorage.getItem('role');
        if (storedRole) {
            try {
                const parsedUsername = JSON.parse(storedRole);
                if (typeof parsedUsername === 'string') {
                    setRole(parsedUsername);
                }
            } catch (e) {
                setRole(storedRole);
            }
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const handleAccount = () => {
        navigate(`/account`);
    };

    const handleProfile = () => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            navigate(`/profile/${userId}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-3">
            <a href="/" className="navbar-brand">Placement System</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Dashboard</a>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {username || 'User'} [{role || 'Role'}]
                            </a>
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                <button className="dropdown-item" onClick={handleAccount}>My Account</button>
                                {role === 'STUDENT' && (
                                    <button className="dropdown-item" onClick={handleProfile}>Career Profile</button>
                                )}
                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            </div>
                        </li>
                    </ul>
            </div>
        </nav>
    );
};

export default AuthenticatedNavbar;
