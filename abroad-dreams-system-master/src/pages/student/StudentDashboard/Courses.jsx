import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, FormControl, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import StudentSidebar from './StudentSidebar.jsx';
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [applicationData, setApplicationData] = useState({
        studentId: '',
        courseId: '',
    });
    const [appliedCourses, setAppliedCourses] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const fetchAppliedCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/applications/student/' + tempUserId, {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
            });
            setAppliedCourses(response.data);
        } catch (error) {
            console.error('Error fetching applied courses:', error);
        }
    };

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
            };

            axios.post('http://localhost:8080/applications/save', applicationData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            })
                .then(response => {
                    console.log('Application saved successfully:', response.data);
                    handleCloseApplyForm();
                })
                .catch(error => {
                    console.error('Error saving application:', error);
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

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/course/getAll', {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
            });

            const coursesNotApplied = response.data.filter(course => {
                return !appliedCourses.some(applied => applied.courseId === course.courseId);
            });

            setCourses(coursesNotApplied);

        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const tempUserId = localStorage.getItem("userId");

    const fetchCourseById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/course/getById/${id}`);
            setCourses([response.data]);  // Corrected line
        } catch (error) {
            console.error('Error fetching course by ID:', error);
        }
    };

    useEffect(() => {
        if (tempUserId) {
            fetchCourses();
        }
    }, [tempUserId]);

    useEffect(() => {
        if (tempUserId) {
            fetchAppliedCourses();
        }
    }, [tempUserId]);

    const hasApplied = (courseId) => {
        return appliedCourses.some(course => course.courseId === courseId);
    };

    const getApplicationStatus = (courseId) => {
        const appliedCourse = appliedCourses.find(course => course.courseId === courseId);
        return appliedCourse ? appliedCourse.status : null;
    };

    return (
        <div className="d-flex">
            <StudentSidebar />
            <Container fluid className="flex-grow-1">
                <StudentProfileBar/>
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
                                    {tempUserId && course.availability && (
                                        hasApplied(course.courseId) ? (
                                            <p>Application Status: {getApplicationStatus(course.courseId)}</p>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn btn-success m-1"
                                                    onClick={() => handleShowApplyForm(course.courseId)}
                                                    disabled={hasApplied(course.courseId)}
                                                >
                                                    Apply
                                                </button>
                                                <button
                                                    className="btn btn-primary m-1"
                                                    disabled={hasApplied(course.courseId)}
                                                >
                                                    Add to Wishlist
                                                </button>
                                            </>
                                        )
                                    )}
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
