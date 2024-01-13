import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {Col, Nav, Row} from 'react-bootstrap';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import '../../components/Dashboard.css';
import GenderChart from "../../components/admin/GenderChart.jsx";
import ApplicationDataChart from "../../components/admin/ApplicationDataChart.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";
import Header from "../../components/Header.jsx";

export default function DashboardAdmin() {

    const [institutions, setInstitutions] = useState([]);
    const [totalInstitutions, setTotalInstitutions] = useState(0);

    const [instructors, setInstructors] = useState([]);
    const [totalInstructors, setTotalInstructors] = useState(0);

    const [courses, setCourses] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);

    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);


    const fetchGenderData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/studentProfiles/getAll',
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            console.log('Fetched gender data:', response.data);
            // You may want to set the gender data in the state if needed
        } catch (error) {
            console.error('Error fetching gender data:', error);
            // Handle the error, show a message, etc.
        }
    };

    const fetchInstructors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/instructor/getAll',
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
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
            const response = await axios.get('http://localhost:8080/institution/getAll',
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            console.log('Fetched institutions:', response.data);
            setInstitutions(response.data);

            setTotalInstitutions(response.data.length);

        } catch (error) {
            console.error('Error fetching institutions:', error);
            // Handle the error, show a message, etc.
        }
    };

    // Function to fetch course data
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/course/getAll',
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            setCourses(response.data);
            setTotalCourses(response.data.length);

        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };



    // Function to fetch student data
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/system-user/getAll',
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            setStudents(response.data);
            setTotalStudents(response.data.length);

        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchInstitutions();
        fetchCourses();
        fetchStudents();
        fetchInstructors();
        fetchGenderData();
    }, []);


    // Logout functionality
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (

        <div className="d-flex">

            <AdminSidebar />

        <Container fluid className="flex-grow-1 m-2">
            <Header/>
            <AdminProfileBar/>

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

            <br/>
            <br/>

            {/*<Row>*/}
            {/*    <Col md={6}>*/}
            {/*        <GenderChart />*/}
            {/*    </Col>*/}
            {/*    <Col md={6}>*/}
            {/*        <ApplicationDataChart />*/}
            {/*    </Col>*/}
            {/*</Row>*/}



        </Container>
        </div>
    );
}
