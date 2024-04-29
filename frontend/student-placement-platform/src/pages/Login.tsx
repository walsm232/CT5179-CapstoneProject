import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


export const Login = () => {
    

    const [errorMessage, setErrorMessage] = useState('');

    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const navigate= useNavigate();

    const onLogInClicked = async () => {
        const response = await axios.post('/api/login', {
            username: usernameValue,
            password: passwordValue,
        });
        const { token } = response.data;
      
    }

    return (
        <div className="login-full-screen-container d-flex justify-content-center align-items-center vh-100">
            <div className="login-centered-content">
                <div className="login-content-box p-4 bg-white shadow rounded">
                    <h1 className="mb-3">Login</h1>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form className="needs-validation" noValidate>
                        <input
                            type="username"
                            className="form-control mb-3"
                            value={usernameValue}
                            onChange={e => setUsernameValue(e.target.value)}
                            placeholder="Username"
                            required />
                        <input
                            type="password"
                            className="form-control mb-3"
                            value={passwordValue}
                            onChange={e => setPasswordValue(e.target.value)}
                            placeholder="Password"
                            required />
                        <hr />
                        <button
                            className="btn btn-primary mb-2"
                            disabled={!usernameValue || !passwordValue}
                            onClick={onLogInClicked}>Log In</button>
                        <button
                            className="btn btn-link"
                            onClick={() => navigate('/register')}>Don&apos;t have an account? Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;