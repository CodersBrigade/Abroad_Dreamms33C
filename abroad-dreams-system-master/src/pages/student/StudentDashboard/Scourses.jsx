// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import {Container, Button, Modal, Form, FormControl, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import StudentSidebar from './StudentSidebar.jsx'
export default function SCourses() {
    // State variables
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [showApplyForm, setShowApplyForm] = useState(false);
    const [applicationData, setApplicationData] = useState({
        studentId: '', // Set the studentId dynamically based on the logged-in student
        courseId: '',
    });

    const handleShowApplyForm = (courseId) => {
        setApplicationData({ ...applicationData, courseId });
        setShowApplyForm(true);
    };

    const handleCloseApplyForm = () => {
        setShowApplyForm(false);
    };

    const handleApply = () => {
        // Add logic to handle the application submission
        // You can use axios.post to send the application data to the server
        // Make sure to set the appropriate values for studentId and courseId in the applicationData
        console.log('Application submitted:', applicationData);
        // Add your logic to submit the application to the server
        // axios.post('http://localhost:8080/applications/save', applicationData)
        //   .then(response => {
        //     console.log('Application saved successfully:', response.data);
        //     handleCloseApplyForm();
        //   })
        //   .catch(error => {
        //     console.error('Error saving application:', error);
        //   });
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            fetchCourses();
        } else {
            fetchCourseById(searchQuery);
        }
    };


    const [courseData, setCourseData] = useState({
        courseName: "",
        durationYears: "",
        availability: "",
        credits: "",
        courseFee: "",
    });

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/course/getAll');
            setCourses(response.data);

        } catch (error) {
            console.error('Error fetching courses:', error);
            // Handle the error, show a message, etc.
        }
    };

    const fetchCourseById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/course/getById/${id}`);
            console.log('Fetched course by ID:', response.data);
            setCourses([response.data]);
        } catch (error) {
            console.error('Error fetching course by ID:', error);
        }
    };


    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="d-flex">
            <StudentSidebar />

            <Container fluid className="flex-grow-1">
                <div className="wrapper">
                    <div className="search-bar mb-3">
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Search by ID"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Button variant="primary" onClick={handleSearch}>Search</Button>
                        </InputGroup>
                    </div>

                    <div className="course-list">
                        {Array.isArray(courses) && courses.map((course) => (
                            <div className="item" key={course.courseId}>
                                <strong>ID: {course.courseId}</strong> {course.courseName} -- {course.courseFee}
                                <div>
                                    <button className="btn btn-success m-1" onClick={() => handleShowApplyForm(course.courseId)}>Apply</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            <Modal
                show={showApplyForm}
                onHide={handleCloseApplyForm}
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

                        {/* Add other application form fields here... */}

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseApplyForm}>Cancel</Button>
                    <Button variant="success" onClick={handleApply}>Apply</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
