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
import {toast} from "react-toastify";


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

    const profileIncompleteAlert = () => {

        // Show a complete profile notification
        toast.error('Complete Your Profile First!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    useEffect(() => {
        fetchCourses();
        profileIncompleteAlert();

    }, []);


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
