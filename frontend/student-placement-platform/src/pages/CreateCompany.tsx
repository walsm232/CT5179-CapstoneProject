import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/index.css';
import NavBar from '../components/AuthenticatedNavbar';

const CreateCompany = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [companyNameValue, setCompanyName] = useState('');
    const [locationValue, setLocation] = useState('');
    const [industryValue, setIndustry] = useState('');
    const [websiteValue, setWebsite] = useState('');


    const navigate = useNavigate();

    const onCompanySubmitted = async () => {
        try {
            const response = await axios.post('http://localhost:8089/api/v1/companies', {
                companyName: companyNameValue,
                location: locationValue,
                industry: industryValue,
                website: websiteValue,
                
            });

            if (response.status === 201 || response.status === 200) {
                setSuccessMessage('Company created.');
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error during creation:", error.response?.data || "No additional error info available");
                setErrorMessage(error.response?.data || "No additional error info available");
            } else if (error instanceof Error) {
                console.error("Error during creation:", error.message);
                setErrorMessage(error.message);
            } else {
                console.error("Unexpected error type during creation:", error);
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    return (
    <div className="account-full-screen-container d-flex justify-content-center align-items-center">
        <NavBar />
        <div className="register-content-box bg-white p-4 shadow rounded col-md-8 col-lg-6">
            <h1 className="mb-3">Create a Company</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message display */}
            <form className="needs-validation" noValidate>
                <input type="text" className="form-control mb-3" placeholder="Company Name" value={companyNameValue} onChange={e => setCompanyName(e.target.value)} required />
                <input type="text" className="form-control mb-3" placeholder="Location" value={locationValue} onChange={e => setLocation(e.target.value)} required />
                <input type="text" className="form-control mb-3" placeholder="Industry" value={industryValue} onChange={e => setIndustry(e.target.value)} required />
                <input type="text" className="form-control mb-3" placeholder="Website" value={websiteValue} onChange={e => setWebsite(e.target.value)} required />
                <button type="button" className="btn btn-primary mb-3" disabled={!companyNameValue || !locationValue || !industryValue || !websiteValue} onClick={onCompanySubmitted}>
                    Submit
                </button>
            </form>
        </div>
    </div>
);
}

export default CreateCompany;