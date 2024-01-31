import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {Col, Nav, Row} from 'react-bootstrap';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import '../../components/Dashboard.css';
import ApplicationDataChart from "../../components/admin/ApplicationDataChart.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";
import Header from "../../components/Header.jsx";
import NoticeService from "./NoticeService.js";
import PaymentService from "./PaymentService.js";
import SystemUsersBarChart from "../../components/admin/SytemUsersBarChart.jsx";
import CountryBarChart from "../../components/admin/CountryBarChart.jsx";
import StudentService from "./StudentService.js";
import NoticeCalendar from "../../components/admin/NoticeCalendar.jsx";

export default function DashboardAdmin() {

    const [institutions, setInstitutions] = useState([]);
    const [totalInstitutions, setTotalInstitutions] = useState(0);

    const [instructors, setInstructors] = useState([]);
    const [totalInstructors, setTotalInstructors] = useState(0);

    const [courses, setCourses] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);

    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);

    const [payments, setPayments] = useState([]);

    const [totalEarnings, setTotalEarnings] = useState(0);

    console.log(localStorage.getItem('accessToken'));



    const fetchInstructors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/instructor/getAll',
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            console.log('Fetched Instructors:', response.data);
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
            console.log('Fetched Institutions:', response.data);
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
            console.log('Fetched Courses:',response.data);
            setCourses(response.data);
            setTotalCourses(response.data.length);

        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await StudentService.getAllStudents();
            setStudents(response.data);
            setTotalStudents(response.data.length-1);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchPayments = () => {
        // Fetch all payments on component mount
        axios.get('http://localhost:8080/admin/payments/getAll', { headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") } })
            .then((response) => {
                console.log('Fetched payments:', response.data);
                setPayments(response.data);

                // Calculate the total amount
                const paidPayments = response.data.filter(payment => payment.status === 'Paid');
                const totalAmount = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);
                setTotalEarnings(totalAmount);
                console.log(totalAmount);

                // ... (other logic if needed)
            })
            .catch((error) => {
                console.error('Error fetching payments:', error);
                // Handle the error, show a message, etc.
            });
    };


    useEffect(() => {
        fetchInstitutions();
        fetchCourses();
        fetchInstructors();
        fetchStudents();
        fetchPayments();
    }, []);


    // Logout functionality
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div>
        <Header/>
        <div className="d-flex">

            <AdminSidebar />

        <Container fluid className="flex-grow-1 m-2">

            <AdminProfileBar/>

            <div className="info-wrapper">
                <div className="info-box">
                    <p>Total Earnings</p>
                    <strong>Rs. {totalEarnings}</strong>
                </div>
                <div className="info-box">
                    <p>Total Institutions</p>
                    <strong>{totalInstitutions}</strong>
                </div>
                <div className="info-box">
                    <p>Total Courses</p>
                    <strong>{totalCourses}</strong>
                </div>
                <div className="info-box">
                    <p>Total Students</p>
                    <strong>{totalStudents}</strong>
                </div>
                <div className="info-box">
                    <p>Total Instructors</p>
                    <strong>{totalInstructors}</strong>
                </div>
            </div>

            <br/>
            <br/>


            <Row>
                <Col xs={10}>
                    <NoticeCalendar />
                </Col>

            </Row>
            <Row>
                <Col md={4}>
                    <ApplicationDataChart />
                </Col>
                <Col md={7}>
                    <CountryBarChart />
                </Col>


            </Row>


        </Container>
        </div>
        </div>
    );
}
