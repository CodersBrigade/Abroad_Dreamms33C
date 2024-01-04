// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import {Container, Button, Modal, Form, FormControl, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import StudentSidebar from '../../components/student/StudentSidebar.jsx'
export default function SCourses() {
    // State variables
    const [courses, setCourses] = useState([]);
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
            {/* AdminSidebar */}
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
                                    <button className="btn btn-success m-1">Apply</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}