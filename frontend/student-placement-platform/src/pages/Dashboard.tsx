import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/AuthenticatedNavbar';
import '../styles/index.css';

const Dashboard = () => {
    const [internships, setInternships] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await axios.get('http://localhost:8089/api/v1/internships');
                setInternships(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error fetching internships:", error.response?.data || "No additional error info available");
                    setErrorMessage(JSON.stringify(error.response?.data) || "No additional error info available");
                } else if (error instanceof Error) {
                    console.error("Error fetching internships:", error.message);
                    setErrorMessage(error.message);
                } else {
                    console.error("Unexpected error type fetching internships:", error);
                    setErrorMessage("An unexpected error occurred.");
                }
            }
        };

        fetchInternships();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredInternships = internships.filter(internship =>
        internship.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company?.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard-full-screen-container d-flex justify-content-center align-items-center">
            <NavBar />
            <div className="dashboard-content-box bg-white p-4 shadow rounded col-md-10 col-lg-8">
                <h1 className="mb-3">Available Internships</h1>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search for internships"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {!errorMessage && filteredInternships.length === 0 && (
                    <div className="alert alert-info">No internships currently available.</div>
                )}
                {!errorMessage && filteredInternships.length > 0 && (
                    <div className="list-group">
                        {filteredInternships.map(internship => (
                            <button 
                                key={internship.internshipId} 
                                className="list-group-item list-group-item-action list-group-item-primary"
                                onClick={() => navigate(`/internshipdetail/${internship.internshipId}`)}
                            >
                                <h5 className="mb-1">{internship.jobTitle}</h5>
                                <p className="mb-1">{internship.company?.companyName}</p>
                                <small>{internship.location}</small>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
