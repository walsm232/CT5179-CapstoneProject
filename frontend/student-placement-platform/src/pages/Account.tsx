import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import AuthenticatedNavbar from '../components/AuthenticatedNavbar';
import '../styles/index.css';

function Account() {
    const [data, setData] = useState(null);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8089/api/v1/users/${userId}`);
            const data = response.data;
            setData(data);
            setUserName(data.username);
            setEmail(data.email);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            fetchUserData(userId);
        } else {
            console.error('No user ID found in session storage');
            setIsLoading(false);
        }
    }, []);

    const onSubmitClicked = async (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            console.error('No user ID found in session storage');
            return;
        }
        try {
            const response = await axios.put(`http://localhost:8089/api/v1/users/${userId}`, {
                email,
                username,
                firstName,
                lastName,
            });

            if (response.status === 200 || response.status === 201) {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error during update:", error.response?.data || "No additional error info available");
            } else if (error instanceof Error) {
                console.error("Error during update:", error.message);
            } else {
                console.error("Unexpected error type during update:", error);
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <AuthenticatedNavbar />
            <div className="account-full-screen-container d-flex justify-content-center align-items-center">
                <div className="account-content-box bg-white p-4 shadow rounded col-md-10 col-lg-8">
                    {showAlert && (
                        <Alert variant="success" className="account-alert">
                            Account updated successfully!
                        </Alert>
                    )}
                    <h2>Account Details</h2>
                    <Form onSubmit={onSubmitClicked}>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={e => setUserName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Account;
