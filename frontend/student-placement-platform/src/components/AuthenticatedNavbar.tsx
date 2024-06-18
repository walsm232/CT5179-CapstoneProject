import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticatedNavbar: React.FC = () => {
    const navigate = useNavigate();
    const role = sessionStorage.getItem('role');
    const userId = sessionStorage.getItem('userId');

    const handleLogout = () => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-3">
            <a href="/dashboard" className="navbar-brand">Placement System</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Dashboard</a>
                    </li>
                    {role === 'STUDENT' && (
                        <li className="nav-item">
                            <a className="nav-link" href={`/profile/${userId}`}>Profile</a>
                        </li>
                    )}
                    {role === 'RECRUITER' && (
                        <li className="nav-item">
                            <a className="nav-link" href="/company">Company</a>
                        </li>
                    )}
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AuthenticatedNavbar;
