import React from 'react'
import DateDisplay from '../components/DateDisplay'
import {Link} from "react-router-dom";

import '../styles/index.css';
import NavBar from '../components/UnauthenticatedNavbar';

const Homepage: React.FC = () => {
    return (
        <div className="homepage-full-screen-container">
            <NavBar />
            <div className="homepage-centered-content">
                <div className="homepage-content-box">
                    <h2 className="homepage-heading"> Student Placement Platform </h2>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <Link to="/login" className="btn btn-primary btn-lg mt-3" role="button">Login</Link>
                        <Link to="/register" className="btn btn-secondary btn-lg mb-3 mt-1" role="button">Register</Link>
                    </div>
                    <DateDisplay />
                </div>
            </div>
        </div>
    );
}

export default Homepage
