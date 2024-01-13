import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import StudentApplicationService from './StudentApplicationService.js';
import StudentSidebar from "./StudentSidebar.jsx";

export default function StudentApplication({ userId }) {
    const [applications, setApplications] = useState([]);
    const [tempUserId, setTempUserId] = useState('');

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

    const handleViewDetails = (applicationId) => {
        // Add logic to view application details
        console.log(`View Details button clicked for application ID: ${applicationId}`);
    };

    return (
        <div className="d-flex">
            <StudentSidebar />
        <Container>
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
        </div>
    );
}
