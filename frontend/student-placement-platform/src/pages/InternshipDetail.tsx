import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/AuthenticatedNavbar';
import '../styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ApplicationDetails {
    name: string;
    email: string;
    resume: string;
}

interface Internship {
    internshipId: number;
    jobTitle: string;
    description: string;
    location: string;
    duration: string;
    qualifications: string;
    applicationDeadline: string;
    company: {
        companyId: number;
        companyName: string;
    };
}

const InternshipDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [internship, setInternship] = useState<Internship | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails>({
        name: '',
        email: '',
        resume: '',
    });

    useEffect(() => {
        const fetchInternship = async () => {
            try {
                const response = await axios.get(`http://63.34.12.64:8089/api/v1/internships/${id}`);
                setInternship(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error fetching internship:", error.response?.data || "No additional error info available");
                    setErrorMessage(JSON.stringify(error.response?.data) || "No additional error info available");
                } else if (error instanceof Error) {
                    console.error("Error fetching internship:", error.message);
                    setErrorMessage(error.message);
                } else {
                    console.error("Unexpected error type fetching internship:", error);
                    setErrorMessage("An unexpected error occurred.");
                }
            }
        };

        fetchInternship();
    }, [id]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setApplicationDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleApply = () => {
        // Handle application submission
        console.log("Application Details:", applicationDetails);
        // Close the modal
        setShowModal(false);
    };

    if (!internship) {
        return (
            <div className="internship-detail-full-screen-container d-flex justify-content-center align-items-center">
                <NavBar />
                <div className="internship-detail-content-box bg-white p-4 shadow rounded col-md-10 col-lg-8" style={{ marginTop: '100px' }}>
                    <h1>Loading...</h1>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                </div>
            </div>
        );
    }

    return (
        <div className="internship-detail-full-screen-container d-flex justify-content-center align-items-center">
            <NavBar />
            <div className="internship-detail-content-box bg-white p-4 shadow rounded col-md-10 col-lg-8" style={{ marginTop: '100px' }}>
                <h1 className="mb-3">{internship.jobTitle}</h1>
                <p><strong>Company:</strong> {internship.company.companyName}</p>
                <p><strong>Location:</strong> {internship.location}</p>
                <p><strong>Duration:</strong> {internship.duration}</p>
                <p><strong>Qualifications:</strong> {internship.qualifications}</p>
                <p><strong>Description:</strong></p>
                <p>{internship.description}</p>
                <p><strong>Application Deadline:</strong> {new Date(internship.applicationDeadline).toLocaleDateString()}</p>
                <button className="btn btn-warning" onClick={() => setShowModal(true)}>Apply</button>

                {/* Modal */}
                {showModal && (
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Apply for {internship.jobTitle}</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" className="form-control" id="name" name="name" value={applicationDetails.name} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" name="email" value={applicationDetails.email} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="resume" className="form-label">Resume</label>
                                            <textarea className="form-control" id="resume" name="resume" rows={3} value={applicationDetails.resume} onChange={handleInputChange}></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleApply}>Submit Application</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InternshipDetail;
