import React, { useEffect, useState } from 'react'
const NavBar: React.FC = () => {

    return (<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-3">
        <a href="/" className="navbar-brand">Placement System</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/Login">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                </li>
            </ul>
        </div>
     </nav>)}

export default NavBar