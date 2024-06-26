import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import EducationList from './EducationList';
import SkillList from './SkillList';
import AuthenticatedNavbar from '../components/AuthenticatedNavbar';
import '../styles/index.css';

function StudentProfile() {
    const [data, setData] = useState(null);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const onSubmitClicked = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8089/api/v1/users/' + id, {
                email: email,
                username: username
            });

            if (response.status === 201 || response.status === 200) {
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

    useEffect(() => {
        fetch('http://localhost:8089/api/v1/users/' + id)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setUserName(data.username);
                setEmail(data.email);
            });
    }, [id]);

    if (!data) {
        return <div>
            
            Loading...</div>;
    }

    return (
        <React.Fragment>
            <AuthenticatedNavbar />
           
            <div className="student-profile-container">
           
            
                <div className="student-profile-lists">
                <Form onSubmit={onSubmitClicked}>
                <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.firstName}
                               
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.lastName}
                                
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={data.username}
                                onChange={e => setUserName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={data.email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <div className="col-sm-2"><Button variant="primary" type="submit">
                            Update
                        </Button></div></Form>
                
                <h3>Skills</h3>
                    <SkillList />
                    <h3>Education History</h3>
                    <EducationList />
                    
                </div>
               
            </div>
        
            
        </React.Fragment>
    );
}

export default StudentProfile;
