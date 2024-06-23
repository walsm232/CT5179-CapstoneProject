import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/AuthenticatedNavbar';
import '../styles/index.css';

const Dashboard: React.FC = () => {
    const [internships, setInternships] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [companies, setCompanies] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await axios.get('http://localhost:8089/api/v1/internships');
                const data = response.data;
                setInternships(data);

                const companyNames = data
                    .map((internship: any) => internship.company?.companyName)
                    .filter((name: string | undefined): name is string => !!name);
                const uniqueCompanies = Array.from(new Set(companyNames)) as string[];
                
                const locationNames = data
                    .map((internship: any) => internship.location)
                    .filter((location: string | undefined): location is string => !!location);
                const uniqueLocations = Array.from(new Set(locationNames)) as string[];

                setCompanies(uniqueCompanies);
                setLocations(uniqueLocations);
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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCompany(event.target.value);
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(event.target.value);
    };

    const filteredInternships = internships.filter((internship: any) => 
        (internship.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company?.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedCompany === '' || internship.company?.companyName === selectedCompany) &&
        (selectedLocation === '' || internship.location === selectedLocation)
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
                <select className="form-control mb-3" value={selectedCompany} onChange={handleCompanyChange}>
                    <option value="">All Companies</option>
                    {companies.map(company => (
                        <option key={company} value={company}>{company}</option>
                    ))}
                </select>
                <select className="form-control mb-3" value={selectedLocation} onChange={handleLocationChange}>
                    <option value="">All Locations</option>
                    {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {!errorMessage && filteredInternships.length === 0 && (
                    <div className="alert alert-info">No internships currently available.</div>
                )}
                {!errorMessage && filteredInternships.length > 0 && (
                    <div className="list-group">
                        {filteredInternships.map((internship: any) => (
                            <button 
                                key={internship.internshipId} 
                                className="list-group-item list-group-item-action list-group-item-primary"
                                onClick={() => navigate(`/internship/${internship.internshipId}`)}
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
