// Part 1: Import Statements and Initial State
import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Nav } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import StudentSidebar from "../../components/student/StudentSidebar.jsx";
import '../../components/Dashboard.css';







export default function DashboardStudent() {

    const [institutions, setInstitutions] = useState([]);
    const [totalInstitutions, setTotalInstitutions] = useState(0);

    const [courses, setCourses] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);




    // Function to fetch institution data
    const fetchInstitutions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/institution/getAll');
            console.log('Fetched institutions:', response.data);
            setInstitutions(response.data);

            setTotalInstitutions(response.data.length);

        } catch (error) {
            console.error('Error fetching institutions:', error);
            // Handle the error, show a message, etc.
        }
    };// Empty dependency array ensures the effect runs only once when the component mounts

    // Function to fetch course data
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/course/getAll');
            setCourses(response.data);
            setTotalCourses(response.data.length);

        } catch (error) {
            console.error('Error fetching courses:', error);
            // Handle the error, show a message, etc.
        }
    };


    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetchInstitutions();
        fetchCourses();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts


    // Logout functionality
    const handleLogout = () => {
        window.location.href = '/login/admin';
    };

    return (

        <div className="d-flex">
            {/* StudentSidebar */}
            <StudentSidebar />



        <Container fluid className="flex-grow-1">
            <div className="info-box">
                <h5>
                    Welcome back <strong>Student</strong>
                </h5>
            </div>
            <div className="info-wrapper">
                <div className="info-box">
                    <p>Total Institutions</p>
                    <strong>{totalInstitutions}</strong>
                </div>
                <div className="info-box">
                    <p>Total Courses</p>
                    <strong>{totalCourses}</strong>
                </div>

            </div>

            <br />

        </Container>
        </div>
    );
}
