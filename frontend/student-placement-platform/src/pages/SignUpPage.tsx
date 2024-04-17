import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';



export const SignUpPage = () => {
    

    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmpasswordValue, setconfirmPasswordValue] = useState('');

   const navigate= useNavigate();

    const onLogInClicked = async () => {
        const response = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        });
        const { token } = response.data;
      
    }

    return (
        <div className="content-container">
            <h1>Log In</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
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
                disabled={!emailValue || !passwordValue || confirmpasswordValue !=passwordValue}
                onClick={onLogInClicked}>Sign Up</button>
               
            
        </div>
    );
}
export default SignUpPage;