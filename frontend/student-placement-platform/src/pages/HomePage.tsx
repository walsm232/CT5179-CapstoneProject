import React from 'react'
import DateDisplay from '../components/DateDisplay'
import {Link, useNavigate} from "react-router-dom";
import { ROUTES } from '../resources/routes-constants';

const HomePage: React.FC = () => {

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Home Page</h1>
            <button>
            <Link to="/Login">Login</Link>
                </button>
            <button>Register</button>
            <DateDisplay />
        </div>
    )
}

export default HomePage
