import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";

export default function Application() {
    const [applications, setApplications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showApplicationForm, setShowApplicationForm] = useState(false); // Add this line

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            fetchApplications();
        } else {
            fetchApplicationById(searchQuery);
        }
    };

    const [applicationData, setApplicationData] = useState({
        studentId: '',
        courseId: '',
        status: '',
    });

    const handleShowApplicationForm = (studentId, courseId) => {
        setApplicationData({
            studentId,
            courseId,
            status: 'Pending', // You can set the initial status as needed
        });
        setShowApplicationForm(true);
    };

    const handleCloseApplicationForm = () => {
        setShowApplicationForm(false);
    };

    const handleApply = () => {
        axios.post('http://localhost:8080/applications/save', applicationData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        })
            .then(response => {
                console.log('Application saved successfully:', response.data);
            })
            .catch(error => {
                console.error('Error saving application:', error);
            });
    };

    const fetchApplications = async () => {
        try {
            const response = await axios.get('http://localhost:8080/applications/all', {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
            });
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const fetchApplicationById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/applications/${id}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
            });
            setApplications([response.data]);
        } catch (error) {
            console.error('Error fetching application by ID:', error);
        }
    };

    const handleUpdate = (applicationId) => {
        axios.put(`http://localhost:8080/applications/update/${applicationId}`, { status: 'Approved' }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        })
            .then(response => {
                console.log('Application updated successfully:', response.data);
                // You may want to fetch the updated list of applications here
                fetchApplications();
            })
            .catch(error => {
                console.error('Error updating application:', error);
            });
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div className="d-flex">
            <AdminSidebar />

            <Container fluid className="flex-grow-1">
                <AdminProfileBar/>
                <div className="wrapper">
                    <div className="d-flex align-items-center mb-3">
                        <input
                            type="text"
                            className="form-control mr-2"
                            placeholder="Search by ID"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>

                    {Array.isArray(applications) && applications.map((application) => (
                        <div className="item" key={application.applicationId}>
                            <strong>ID: {application.applicationId}</strong> Student ID: {application.studentId} -- Course ID: {application.courseId} -- Status: {application.status}
                            <div>
                                {application.status !== 'Approved' && (
                                    <button className="btn btn-danger m-1" onClick={() => handleUpdate(application.applicationId)}>Approve Application</button>
                                )}
                            </div>
                        </div>
                    ))}


                    <Modal
                        show={showApplicationForm}
                        onHide={handleCloseApplicationForm}
                        animation={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Application Form
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formStudentId">
                                    <Form.Label>Student ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={applicationData.studentId}
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formCourseId">
                                    <Form.Label>Course ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={applicationData.courseId}
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={applicationData.status}
                                        readOnly
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseApplicationForm}>Cancel</Button>
                            <Button variant="success" onClick={handleApply}>Apply</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Container>
        </div>
    );
}
