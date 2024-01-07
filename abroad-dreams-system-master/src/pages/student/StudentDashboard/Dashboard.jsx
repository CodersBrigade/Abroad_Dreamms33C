import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import StudentSidebar from './StudentSidebar.jsx';
import Courses from './Courses.jsx'; // Import Courses component

import axios from 'axios';
import {Nav} from "react-bootstrap";

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);
    const [studentId, setStudentId] = useState(''); // Maintain studentId state

    // Function to fetch course data
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/course/getAll', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            });
            setCourses(response.data);
            setTotalCourses(response.data.length);
        } catch (error) {
            console.error('Error fetching courses:', error);
            // Handle the error, show a message, etc.
        }
    };

    useEffect(() => {
        fetchCourses();

    }, []);


    // Logout functionality
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="d-flex">
            {/* StudentSidebar */}
            <StudentSidebar />

            <Container fluid className="flex-grow-1 m-2">

                <Nav className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link eventKey="logout" onClick={handleLogout}>
                            Logout
                        </Nav.Link>
                    </Nav.Item>

                </Nav>

                <h5>
                    Welcome back <strong>User ID : {localStorage.getItem("userId")}</strong>
                </h5>

            </Container>

        </div>
    );
};

export default Dashboard;
