import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import StudentApplicationService from './StudentApplicationService.js';
import StudentSidebar from "./StudentSidebar.jsx";
import Header from "../../../components/Header.jsx";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";
import axios from "axios";

export default function StudentApplication({ userId }) {
    const [applications, setApplications] = useState([]);
    const [tempUserId, setTempUserId] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [fetchedCourseName] = useState('');

    useEffect(() => {
        setTempUserId(localStorage.getItem('userId'));
    }, []);

    useEffect(() => {
        fetchApplications();
    }, [tempUserId]);

    const fetchApplications = async () => {
        try {
            const response = await StudentApplicationService.getByUserId(tempUserId);
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const fetchCourseById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/course/getById/${application.courseId}`);
            const fetchedCourseName = response.data; // Corrected line
        } catch (error) {
            console.error('Error fetching course by ID:', error);
        }
    };



    const handleViewDetails = (applicationId) => {
        const selectedApp = applications.find(app => app.applicationId === applicationId);
        setSelectedApplication(selectedApp);
        setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
    };

    return (
        <div>
            <Header/>
            <div className="d-flex">
                <StudentSidebar />
                <Container>
                    <StudentProfileBar/>
                    <h2>My Applications</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Course ID</th>
                            <th>Status</th>
                            <th>Date Applied</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {applications.map((application) => (
                            <tr key={application.applicationId}>
                                <td>{application.applicationId}</td>
                                <td>{application.courseId}</td>
                                {/*<td>{fetchedCourseName}</td>*/}
                                <td>{application.status}</td>
                                <td>{application.applicationDate}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleViewDetails(application.applicationId)}>
                                        View Application Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>
                <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Application Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* Render the application details here */}
                            {selectedApplication && (
                                <>
                                    <Form.Group controlId="formApplicationId">
                                        <Form.Label>Application ID</Form.Label>
                                        <Form.Control type="text" value={selectedApplication.applicationId} readOnly />
                                    </Form.Group>
                                    <Form.Group controlId="formCourseId">
                                        <Form.Label>Course ID</Form.Label>
                                        <Form.Control type="text" value={selectedApplication.courseId} readOnly />
                                    </Form.Group>
                                    {/* Add more fields as needed */}
                                </>
                            )}
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}
