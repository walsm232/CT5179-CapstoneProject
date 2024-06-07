import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/index.css';
import NavBar from '../components/NavBar';

const CreateInternship = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [jobTitleValue, setJobTitle] = useState('');
    const [locationValue, setLocation] = useState('');
    const [descriptionValue, setDescription] = useState('');
    const [durationValue, setDuration] = useState('');
    const [qualificationsValue, setQualifications] = useState('');
    const [deadlineValue, setApplicationDeadline] = useState('');

    const navigate = useNavigate();

    const onInternshipSubmitted = async () => {
        try {
            const response = await axios.post('http://localhost:8089/api/v1/internships', {
                jobTitle: jobTitleValue,
                location: locationValue,
                description: descriptionValue,
                duration: durationValue,
                qualifications: qualificationsValue,
                deadline: deadlineValue
            });

            if (response.status === 201 || response.status === 200) {
                setSuccessMessage('Internship created.');
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/login');
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
    <div className="register-full-screen-container d-flex justify-content-center align-items-center">
        <NavBar />
        <div className="register-content-box bg-white p-4 shadow rounded col-md-8 col-lg-6">
            <h1 className="mb-3">Create an Internship</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message display */}
            <form className="needs-validation" noValidate>
                <input type="text" className="form-control mb-3" placeholder="Job Title" value={jobTitleValue} onChange={e => setJobTitle(e.target.value)} required />
                <input type="text" className="form-control mb-3" placeholder="Location" value={locationValue} onChange={e => setLocation(e.target.value)} required />
                <textarea className="form-control mb-3" placeholder="Description" value={descriptionValue} onChange={e => setDescription(e.target.value)} required />
                <input type="text" className="form-control mb-3" placeholder="Duration" value={durationValue} onChange={e => setDuration(e.target.value)} required />
                <input type="text" className="form-control mb-3" placeholder="Qualifications" value={qualificationsValue} onChange={e => setQualifications(e.target.value)} required />
                <label >Application Deadline
                    <input type="date"  className="form-control mb-3" value={deadlineValue} onChange={e => setApplicationDeadline(e.target.value)} required />
                </label>
                <button type="button" className="btn btn-primary mb-3" disabled={!jobTitleValue || !locationValue || !descriptionValue || !durationValue || !qualificationsValue || !deadlineValue} onClick={onInternshipSubmitted}>
                    Submit
                </button>
            </form>
        </div>
    </div>
);
}

export default CreateInternship;