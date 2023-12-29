// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import AdminSidebar from "../../components/AdminSidebar.jsx";

// Create the Courses component
export default function Courses() {
    // State variables
    const [courses, setCourses] = useState([]);
    const [editCourseId, setEditCourseId] = useState(null);
    const [showForm, setShowForm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleClose = () => setShowForm('');

    const [courseData, setCourseData] = useState({
        courseName: "",
        credits: 0,
        durationYears: 0,
        courseFee: 0,
        availability: false,
    });

    const [editCourseData, setEditCourseData] = useState({
        courseName: "",
        credits: 0,
        durationYears: 0,
        courseFee: 0,
        availability: false,
    });

    const handleShow = (formType, courseId = null) => {
        setShowForm(formType);
        setEditCourseId(courseId);

        if (!courseId) {
            setCourseData({
                courseName: "",
                credits: 0,
                durationYears: 0,
                courseFee: 0,
                availability: false,
            });
        }
    };

    const handleSaveCourse = () => {
        axios
            .post('http://localhost:8080/course/save', courseData)
            .then((response) => {
                console.log('Course saved successfully:', response.data);
                handleClose();
                fetchCourses();
            })
            .catch((error) => {
                console.error('Error saving course:', error);
            });
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/course/getAll');
            console.log('Fetched courses:', response.data);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
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

    const handleRemoveCourse = (courseId) => {
        if (courseId === undefined) {
            console.error("Invalid ID: ID is undefined");
            return;
        }
        axios
            .delete(`http://localhost:8080/course/delete/${courseId}`)
            .then((response) => {
                console.log(`Course with ID ${courseId} removed successfully`);
                fetchCourses();
            })
            .catch((error) => {
                console.error(`Error removing course with ID ${courseId}:`, error);
            });
    };

    const handleUpdateCourse = () => {
        axios
            .put(`http://localhost:8080/course/update/${editCourseId}`, editCourseData)
            .then((response) => {
                console.log('Course updated successfully:', response.data);
                handleClose();
                fetchCourses();
            })
            .catch((error) => {
                console.error('Error updating course:', error);
            });
    };

    const handleEditCourse = (courseId) => {
        const courseToEdit = courses.find((course) => course.courseId === courseId);

        setEditCourseData({
            courseName: courseToEdit.courseName,
            credits: courseToEdit.credits,
            durationYears: courseToEdit.durationYears,
            courseFee: courseToEdit.courseFee,
            availability: courseToEdit.availability,
        });

        handleShow('editCourse', courseId);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />

            <Container fluid className="flex-grow-1">
                <div className="wrapper">
                    <div className="d-flex align-items-center mb-3">
                        <button className="btn btn-dark mr-2 m-1" onClick={() => { handleShow("addCourse") }}>Add New Course +</button>
                        <input
                            type="text"
                            className="form-control mr-2"
                            placeholder="Search by ID"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>

                    {Array.isArray(courses) && courses.map((course) => (
                        <div className="item" key={course.courseId}>
                            {<strong>ID: {course.courseId}</strong>} {course.courseName}{" -- "}{course.courseFee}
                            <div>
                                <button className="btn btn-danger m-1" onClick={() => handleEditCourse(course.courseId)}>View Details/Edit</button>
                                <button className="btn btn-success m-1" onClick={() => handleRemoveCourse(course.courseId)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    <Modal
                        show={Boolean(showForm)}
                        onHide={handleClose}
                        animation={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >

                        {showForm === 'editCourse' && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Edit Course
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Form fields for editing course */}
                                        <Form.Group className="mb-3" controlId="formEditCourseName">
                                            <Form.Label>Course Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Course Name"
                                                value={editCourseData.courseName}
                                                onChange={(e) => setEditCourseData({ ...editCourseData, courseName: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditCredits">
                                            <Form.Label>Credits</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Credits"
                                                value={editCourseData.credits}
                                                onChange={(e) => setEditCourseData({ ...editCourseData, credits: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditDurationYears">
                                            <Form.Label>Duration (Years)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Duration in Years"
                                                value={editCourseData.durationYears}
                                                onChange={(e) => setEditCourseData({ ...editCourseData, durationYears: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditCourseFee">
                                            <Form.Label>Course Fee</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Course Fee"
                                                value={editCourseData.courseFee}
                                                onChange={(e) => setEditCourseData({ ...editCourseData, courseFee: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditAvailability">
                                            <Form.Check
                                                type="checkbox"
                                                label="Availability"
                                                checked={editCourseData.availability}
                                                onChange={(e) => setEditCourseData({ ...editCourseData, availability: e.target.checked })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                            </>
                        )}

                        {showForm === 'addCourse' && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Add Course
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Form fields for adding a new course */}
                                        <Form.Group className="mb-3" controlId="formCourseName">
                                            <Form.Label>Course Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Course Name"
                                                value={courseData.courseName}
                                                onChange={(e) => setCourseData({ ...courseData, courseName: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formCredits">
                                            <Form.Label>Credits</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Credits"
                                                value={courseData.credits}
                                                onChange={(e) => setCourseData({ ...courseData, credits: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formDurationYears">
                                            <Form.Label>Duration (Years)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Duration in Years"
                                                value={courseData.durationYears}
                                                onChange={(e) => setCourseData({ ...courseData, durationYears: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formCourseFee">
                                            <Form.Label>Course Fee</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Course Fee"
                                                value={courseData.courseFee}
                                                onChange={(e) => setCourseData({ ...courseData, courseFee: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formAvailability">
                                            <Form.Check
                                                type="checkbox"
                                                label="Availability"
                                                checked={courseData.availability}
                                                onChange={(e) => setCourseData({ ...courseData, availability: e.target.checked })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                            </>
                        )}

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            {showForm === 'addCourse' && <Button variant="primary" onClick={handleSaveCourse}>Add Course</Button>}
                            {showForm === 'editCourse' && <Button variant="primary" onClick={handleUpdateCourse}>Update Course</Button>}
                        </Modal.Footer>
                    </Modal>

                </div>
            </Container>
        </div>
    );
}
