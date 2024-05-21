import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEducationHistory = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [educationid, setEducationid] = useState('');
    const [userid, setUserId] = useState('');
    const [degree, setDegree] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [major, setMajor] = useState('');
   

    const navigate = useNavigate();

    const onSubmitClicked = async () => {
        try {
            const response = await axios.post('http://localhost:8089/api/v1/users/1/education-history', {
                educationId: educationid,
              
               
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
            <div className="register-content-box bg-white p-4 shadow rounded col-md-8 col-lg-6">
                <h1 className="mb-3">Register</h1>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message display */}
                <form className="needs-validation" noValidate>
                    <input type="text" className="form-control mb-3" placeholder="Education Id" value={educationid} onChange={e => setEducationid(e.target.value)} required />
                    <input type="text" className="form-control mb-3" placeholder="Institution Name" value={institutionName} onChange={e => setInstitutionName(e.target.value)} required />
                    <input type="text" className="form-control mb-3" placeholder="Major" value={major} onChange={e => setMajor(e.target.value)} required />
                    
                    <input type="email" className="form-control mb-3" placeholder="Degree" value={degree} onChange={e => setDegree(e.target.value)} required />
                    
                    <button type="button" className="btn btn-primary mb-3" onClick={onSubmitClicked}>
                       Submit
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

export default AddEducationHistory;