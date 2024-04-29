import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';



export const SignUpPage = () => {
    

    const [errorMessage, setErrorMessage] = useState('');

    const [usernameValue, setUsernameValue] = useState('');
    const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [roleValue, setRoleValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmpasswordValue, setconfirmPasswordValue] = useState('');
    
    

   const navigate= useNavigate();

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

            console.log("Response:", response.data);
            navigate('/login');

            if (response.data && response.data.token) {
                const {token} = response.data;
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error during registration:", error.response?.data || "No additional error info available");
                setErrorMessage(error.response?.data || "No additional error info available");
            } else if (error instanceof Error) {
                console.error("Error during registration:", error.message);
                setErrorMessage(error.message);
            } else {
                console.error("Unexpected error type during registration:", error);
                setErrorMessage(JSON.stringify(error));
            }
        }
    };

    return (
        <div className="content-container">
            <h1>Register</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={usernameValue}
                onChange={e => setUsernameValue(e.target.value)}
                placeholder="username" />
            <input
                value={firstNameValue}
                onChange={e => setFirstNameValue(e.target.value)}
                placeholder="First Name" />
            <input
                value={lastNameValue}
                onChange={e => setLastNameValue(e.target.value)}
                placeholder="Last Name" />
            <select defaultValue="" onChange={e => setRoleValue(e.target.value)}>
                <option value="" disabled>-Role-</option>
                <option value="Student">Student</option>
                <option value="Placement Officer">Placement Officer</option>
                <option value="Placement Company">Placement Company</option>
            </select>
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com" />
            <input
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="password" />
             <input
                type="password"
                value={confirmpasswordValue}
                onChange={e => setconfirmPasswordValue(e.target.value)}
                placeholder="password" />
            <hr />
            <button
                disabled={!emailValue || !passwordValue || confirmpasswordValue !=passwordValue || !usernameValue || !firstNameValue || !lastNameValue || !roleValue }
                onClick={onRegisterClicked}>Sign Up</button>
               
            
        </div>
    );
}
export default SignUpPage;