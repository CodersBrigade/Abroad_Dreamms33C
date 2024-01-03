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
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import '../../components/Dashboard.css';







export default function DashboardAdmin() {

    const [institutions, setInstitutions] = useState([]);
    const [totalInstitutions, setTotalInstitutions] = useState(0);

    const [instructors, setInstructors] = useState([]);
    const [totalInstructors, setTotalInstructors] = useState(0);

    const [courses, setCourses] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);

    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);




    const fetchInstructors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/instructor/getAll');
            console.log('Fetched instructors:', response.data);
            setInstructors(response.data);
            setTotalInstructors(response.data.length);

        } catch (error) {
            console.error('Error fetching instructors:', error);
            // Handle the error, show a message, etc.
        }
    };




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

    // Function to fetch student data
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/students/getAll');
            setStudents(response.data);
            setTotalStudents(response.data.length);

        } catch (error) {
            console.error('Error fetching students:', error);
            // Handle the error, show a message, etc.
        }
    };

    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetchInstitutions();
        fetchCourses();
        fetchStudents();
        fetchInstructors();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts


    // Logout functionality
    const handleLogout = () => {
        window.location.href = '/login/admin';
    };

    return (

        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />



        <Container fluid className="flex-grow-1">



            <Nav className="justify-content-end">
                <Nav.Item>
                    <Nav.Link eventKey="logout" onClick={handleLogout}>
                        Logout
                    </Nav.Link>
                </Nav.Item>

            </Nav>

            <h5>
                Welcome back <strong>Administrator</strong>
            </h5>
            <div className="info-wrapper">
                <div className="info-box">
                    <p>Total Institutions</p>
                    <strong>{totalInstitutions}</strong>
                </div>
                <div className="info-box">
                    <p>Total Courses</p>
                    <strong>{totalCourses}</strong>
                </div>
                <div className="info-box">
                    <p>Total Student</p>
                    <strong>{totalStudents}</strong>
                </div>
                <div className="info-box">
                    <p>Total Instructors</p>
                    <strong>{totalInstructors}</strong>
                </div>
            </div>

            <br />

        </Container>
        </div>
    );
}
