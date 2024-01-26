import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";
import Header from "../../components/Header.jsx";
import {toast} from "react-toastify";

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
        userId: '',
        courseId: '',
        status: '',
    });

    const handleShowApplicationForm = (userId, courseId) => {
        setApplicationData({
            userId,
            courseId,
            status: 'Pending', // You can set the initial status as needed
        });
        setShowApplicationForm(true);
    };

    const handleProcessing = (applicationId) => {
        // Update the application status to 'Processing'
        axios.put(`http://localhost:8080/applications/update/${applicationId}`, { status: 'Processing' }, {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        })
            .then(applicationUpdateResponse => {
                // If success
                toast.success('Application Set to Processing Success!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.log('Application processing successfully:', applicationUpdateResponse.data);
                fetchApplications(); // Fetch updated applications
            })
            .catch(error => {
                // If fail
                toast.error('Application Set to Processing Failed!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.error('Error updating application:', error);
            });
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

    const handleApprove = (applicationId) => {
        // Update the application status to 'Approved'
        axios.put(`http://localhost:8080/applications/update/${applicationId}`, { status: 'Approved' }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        })
            .then(response => {
                // If success
                toast.success('Application Approve Successful!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.log('Application updated successfully:', response.data);
                fetchApplications();

                const userId = response.data?.user?.userId || response.data?.userId;

                if (userId) {
                    const paymentData = {
                        userId: userId,
                        amount: 99.00,
                        description: "Processing Fee",
                        status: "Pending",
                        paymentDate: new Date().toISOString(),
                    };

                    return axios.post('http://localhost:8080/admin/payments/save', paymentData, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("accessToken")
                        }
                    });
                } else {
                    throw new Error('User ID not found in the application update response.');
                }
            })
            .then(paymentResponse => {
                // If success
                toast.success('Payment Add Successful!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                console.log('Payment saved successfully:', paymentResponse.data);
                fetchApplications();
                // You may want to fetch the updated list of applications here
            })
            .catch(error => {
                // If fail
                toast.error('Error Adding Payment for Application!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.error('Error updating application or saving payment:', error);
            });
    };



    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div><Header />
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
                            <strong>Request #: {application.applicationId}</strong> User ID: {application.userId} -- Course ID: {application.courseId} -- Status: {application.status}
                            <div>
                                {application.status !== 'Approved' && application.status !== 'Processing' && (
                                    <button className="btn btn-danger m-1" onClick={() => handleApprove(application.applicationId)}>Approve Application</button>
                                )}
                                {application.status === 'Approved' && (
                                    <button className="btn btn-secondary m-1" onClick={() => handleProcessing(application.applicationId)}>Set To Processing</button>
                                )}

                                {application.status === 'Processing' && (
                                    <button className="btn btn-success m-1" onClick={() => handleMarkComplete(application.applicationId)}>Mark Complete</button>
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
                                <Form.Group className="mb-3" controlId="formUserId">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={applicationData.userId}
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
        </div>
    );
}
