import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import StudentSidebar from './StudentSidebar.jsx';
import StudentCourse from './StudentCourse.jsx'; // Import StudentCourse component

import axios from 'axios';
import {Nav} from "react-bootstrap";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";
import Header from "../../../components/Header.jsx";
import welcomeImage from '../../../assets/welcome.png';


const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);
    const [studentId, setStudentId] = useState(''); // Maintain studentId state


    // Function to fetch course data
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/student/course/getAll', {
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
        <div>
        <Header/>
        <div className="d-flex">

            {/* StudentSidebar */}
            <StudentSidebar />

            <Container fluid className="flex-grow-1 m-2">

                <StudentProfileBar/>

                <img src={welcomeImage} alt="Welcome" style={{ width: '100%', marginBottom: '20px' }} />


            </Container>

        </div>
        </div>
    );
};

export default Dashboard;
