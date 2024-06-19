import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/index.css';
import NavBar from '../components/UnauthenticatedNavbar';

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [roleValue, setRoleValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const navigate = useNavigate();

    const onRegisterClicked = async () => {
        try {
            const response = await axios.post('http://localhost:8089/api/v1/users/register', {
                username: usernameValue,
                firstName: firstNameValue,
                lastName: lastNameValue,
                role: roleValue,
                email: emailValue,
                password: passwordValue,
            });

            if (response.status === 201 || response.status === 200) {
                setSuccessMessage('Registration successful! Redirecting to login...');
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error during registration:", error.response?.data || "No additional error info available");
                setErrorMessage(error.response?.data || "No additional error info available");
            } else if (error instanceof Error) {
                console.error("Error during registration:", error.message);
                setErrorMessage(error.message);
            } else {
                console.error("Unexpected error type during registration:", error);
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="register-full-screen-container d-flex justify-content-center align-items-center">
            <NavBar />
            <div className="register-content-box bg-white p-4 shadow rounded col-md-8 col-lg-6">
                <h1 className="mb-3">Register</h1>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form className="needs-validation" noValidate>
                    <input type="text" className="form-control mb-3" placeholder="Username" value={usernameValue} onChange={e => setUsernameValue(e.target.value)} required />
                    <input type="text" className="form-control mb-3" placeholder="First Name" value={firstNameValue} onChange={e => setFirstNameValue(e.target.value)} required />
                    <input type="text" className="form-control mb-3" placeholder="Last Name" value={lastNameValue} onChange={e => setLastNameValue(e.target.value)} required />
                    <select className="form-select mb-3" value={roleValue} onChange={e => setRoleValue(e.target.value)} required>
                        <option value="" disabled hidden>Role</option>
                        <option value="Student">Student</option>
                        <option value="Placement Officer">Placement Officer</option>
                        <option value="Recruiter">Recruiter</option>
                    </select>
                    <input type="email" className="form-control mb-3" placeholder="Email" value={emailValue} onChange={e => setEmailValue(e.target.value)} required />
                    <input type="password" className="form-control mb-3" placeholder="Password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)} required />
                    <input type="password" className="form-control mb-3" placeholder="Confirm Password" value={confirmPasswordValue} onChange={e => setConfirmPasswordValue(e.target.value)} required />
                    <button type="button" className="btn btn-primary mb-3" disabled={!emailValue || !passwordValue || confirmPasswordValue !== passwordValue || !usernameValue || !firstNameValue || !lastNameValue || !roleValue} onClick={onRegisterClicked}>
                        Sign Up
                    </button>
                </form>
                <div className="text-center">
                    <button className="btn btn-link" onClick={() => navigate('/login')}>
                        Already have an account? Log in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
