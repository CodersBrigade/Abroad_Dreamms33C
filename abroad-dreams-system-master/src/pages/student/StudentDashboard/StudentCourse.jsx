import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, FormControl, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import StudentSidebar from './StudentSidebar.jsx';
import StudentProfileBar from '../../../components/student/StudentProfileBar.jsx';
import Header from "../../../components/Header.jsx";

export default function StudentCourse() {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [applicationData, setApplicationData] = useState({
        userId: '',
        courseId: '',
        applicationDate: new Date(),
    });
    const [appliedCourses, setAppliedCourses] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const fetchAppliedCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/applications/student/' + localStorage.getItem('userId'), {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
            });
            setAppliedCourses(response.data);
        } catch (error) {
            console.error('Error fetching applied courses:', error);
        }
    };

    const handleShowApplyForm = async (courseId) => {
        try {
            const response = await axios.get(`http://localhost:8080/student/course/getById/${courseId}`, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
            });

            if (response.data) {
                const courseDetails = response.data;
                setApplicationData({ ...applicationData, courseId, courseDetails });
                setShowApplyForm(true);
            } else {
                console.error('Course not found');
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const handleCloseApplyForm = () => {
        setShowApplyForm(false);
    };

    const handleApply = () => {
        const tempUserId = localStorage.getItem('userId');
        const courseId = applicationData.courseId;
        const applicationDate = applicationData.applicationDate.toISOString(); // Convert to ISO string

        if (tempUserId && courseId) {
            const applicationDataToSend = {
                userId: Number(tempUserId),
                courseId: Number(courseId),
                applicationDate: applicationDate,
            };

            axios
                .post('http://localhost:8080/applications/save', applicationDataToSend, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                })
                .then((response) => {
                    console.log('Application saved successfully:', response.data);
                    fetchAppliedCourses();
                    handleCloseApplyForm();
                })
                .catch((error) => {
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
            const response = await axios.get('http://localhost:8080/student/course/getAll', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
            });

            const coursesNotApplied = response.data.filter((course) => {
                return !appliedCourses.some((applied) => applied.courseId === course.courseId);
            });

            setCourses(coursesNotApplied);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchCourseById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/course/getById/${id}`);
            setCourses([response.data]); // Corrected line
        } catch (error) {
            console.error('Error fetching course by ID:', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            fetchCourses();
        }
    }, [localStorage.getItem('userId')]);

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            fetchAppliedCourses();
        }
    }, [localStorage.getItem('userId')]);

    const hasApplied = (courseId) => {
        return appliedCourses.some((course) => course.courseId === courseId);
    };

    const getApplicationStatus = (courseId) => {
        const appliedCourse = appliedCourses.find((course) => course.courseId === courseId);
        return appliedCourse ? appliedCourse.status : null;
    };

    return (
        <div>
            <Header/>
        <div className="d-flex">
            <StudentSidebar />
            <Container fluid className="flex-grow-1">
                <StudentProfileBar />
                <div className="wrapper">
                    <div className="search-bar mb-3">
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Search by ID"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Button variant="primary" onClick={handleSearch}>
                                Search
                            </Button>
                        </InputGroup>
                    </div>

                    <div className="course-list">
                        {Array.isArray(courses) &&
                            courses.map((course) => (
                                <div className="item" key={course.courseId}>
                                    <img width={100} src={'data:image/png;base64,'+course.image} />
                                    {<strong>{course.courseName}</strong>} Duration: {course.durationYears} Years -- Course Total:{(course.courseFee).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} | Per Year: {(course.courseFee/course.durationYears).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    <div>
                                        {localStorage.getItem('userId') && course.availability && (
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
                    <Modal.Title id="contained-modal-title-vcenter">Application Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/*<Form.Group className="mb-3" controlId="formStudentId">*/}
                        {/*    <Form.Label>Student ID</Form.Label>*/}
                        {/*    <Form.Control type="text" value={localStorage.getItem('userId')} readOnly disabled={isDisabled} />*/}
                        {/*</Form.Group>*/}
                        {/*<Form.Group className="mb-3" controlId="formCourseId">*/}
                        {/*    <Form.Label>Course ID</Form.Label>*/}
                        {/*    <Form.Control type="text" value={applicationData.courseId} readOnly disabled={isDisabled} />*/}
                        {/*</Form.Group>*/}
                        <Form.Group className="mb-3" controlId="formCourseDetails">
                            {/*<Form.Label>Course Details</Form.Label>*/}
                            {applicationData.courseDetails && (
                                <div>
                                    <p>Name: {applicationData.courseDetails.courseName}</p>
                                    <p>Duration (Years): {applicationData.courseDetails.durationYears}</p>
                                    <p>Credits: {applicationData.courseDetails.credits}</p>
                                    <p>Course Fee (Entire Duration): {(applicationData.courseDetails.courseFee).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                </div>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseApplyForm}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleApply}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
}
