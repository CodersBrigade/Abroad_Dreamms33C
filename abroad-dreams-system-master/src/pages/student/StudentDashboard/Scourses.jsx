import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, FormControl, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import StudentSidebar from './StudentSidebar.jsx';

export default function SCourses() {
    // State variables
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [showApplyForm, setShowApplyForm] = useState(false);
    const [applicationData, setApplicationData] = useState({
        studentId: '', // Set the studentId dynamically based on the logged-in student
        courseId: '',
    });

    const [isDisabled, setIsDisabled] = useState(false);


    const handleShowApplyForm = (courseId) => {
        setApplicationData({ ...applicationData, courseId });
        setShowApplyForm(true);
    };

    const handleCloseApplyForm = () => {
        setShowApplyForm(false);
    };

    const handleApply = () => {
        const tempUserId = localStorage.getItem("userId");
        const courseId = applicationData.courseId;

        if (tempUserId && courseId) {
            const applicationData = {
                studentId: Number(tempUserId),
                courseId: Number(courseId),
                // ... other properties of your applicationData
            };

            axios.post('http://localhost:8080/applications/save', applicationData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            })
                .then(response => {
                    console.log('Application saved successfully:', response.data);
                    // Add any additional logic after successful submission
                    // For example, you might want to close the application form
                    // and update some UI elements
                    // handleCloseApplyForm();
                })
                .catch(error => {
                    console.log(applicationData.courseId);
                    console.log(applicationData.studentId);

                    console.error('Error saving application:', error);
                    // Add any error handling logic here
                });
        } else {
            console.error('tempUserId or courseId is not available.');
        }
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
            const response = await axios.get('http://localhost:8080/course/getAll', {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
            });
            setCourses(response.data);

        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const tempUserId = localStorage.getItem("userId");

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
        setIsDisabled(!applicationData.courseId);
        setIsDisabled(!applicationData.studentId);


    }, [applicationData.courseId, applicationData.studentId]);

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
                                    <button className="btn btn-primary m-1">Add to Wishlist</button>
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
                                value={tempUserId}
                                readOnly
                                disabled={isDisabled}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCourseId">
                            <Form.Label>Course ID</Form.Label>
                            <Form.Control
                                type="text"
                                value={applicationData.courseId}
                                readOnly
                                disabled={isDisabled}
                            />
                        </Form.Group>

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
