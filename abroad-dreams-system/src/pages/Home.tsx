import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Page } from "../components/Page";
import { DidYouKnow } from "../components/pages/home/DidYouKnow";
import { Welcome } from "../components/pages/home/Welcome";
import "../styles/pages/home.scss";

import Institutions from "./Institutions"; // Import the Institutions component


export default function Home() {
    const navigate = useNavigate();
    const [totalClassrooms, setTotalClassrooms] = useState(3);
    const [totalCountries, setTotalCountries] = useState(2);
    const [totalPaymentsReceived, setTotalPaymentsReceived] = useState('Rs. 9,984.20');
    const [pendingApplications, setPendingApplications] = useState(2);
    const [totalStudents, setTotalStudents] = useState(198);
    const [totalCourses, setTotalCourses] = useState(30);
    const [totalTutors, setTotalTutors] = useState(6);
    const [pendingInvoices, setPendingInvoices] = useState(3);
    const [totalUsers, setTotalUsers] = useState(22);
    const [totalInstitutions, setTotalInstitutions] = useState(15);




    const fetchTotalUsers = () => {
        // Simulate API call to fetch total institutions
        // const institutionsData = /* Call to your API */;
        // setTotalInstitutions(institutionsData.length); // Update the state with the fetched data
    };

    const fetchTotalCountries = () => {
        // Simulate API call to fetch total institutions
        // const institutionsData = /* Call to your API */;
        // setTotalInstitutions(institutionsData.length); // Update the state with the fetched data
    };

    const fetchTotalClassrooms = () => {
        // Simulate API call to fetch total classrooms
        // const classroomsData = /* Call to your API */;
        // setTotalClassrooms(classroomsData.length); // Update the state with the fetched data
    };

    const fetchTotalPaymentsReceived = () => {
        // Simulate API call to fetch total payments received
        // const paymentsData = /* Call to your API */;
        // setTotalPaymentsReceived(paymentsData.length); // Update the state with the fetched data
    };

    const fetchPendingApplications = () => {
        // Simulate API call to fetch pending applications
        // const applicationsData = /* Call to your API */;
        // setPendingApplications(applicationsData.length); // Update the state with the fetched data
    };

    const fetchTotalStudents = async () => {

    };


    const fetchTotalCourses = () => {
        // Simulate API call to fetch total courses
        // const coursesData = /* Call to your API */;
        // setTotalCourses(coursesData.length); // Update the state with the fetched data
    };

    const fetchTotalTutors = () => {
        // Simulate API call to fetch total tutors
        // const tutorsData = /* Call to your API */;
        // setTotalTutors(tutorsData.length); // Update the state with the fetched data
    };

    const fetchPendingInvoices = () => {
        // Simulate API call to fetch total tutors
        // const tutorsData = /* Call to your API */;
        // setTotalTutors(tutorsData.length); // Update the state with the fetched data
    };


    return (
        <Page title="Home">
            <h3 className="main-title">Home</h3>
            <div className="cards">
                <Welcome />
                <DidYouKnow />
            </div>
            <div className={"spacer"}> </div>
            <div className="counters">
                <div className="counter" id="pending-applications" onClick={() => navigate("../applications")}>
                    <h4>Pending Applications</h4>
                    <p>{pendingApplications}</p>
                </div>
                <div className="counter" id="pending-invoices" onClick={() => navigate("../payments")}>
                    <h4>Pending Invoices</h4>
                    <p>{pendingInvoices}</p>
                </div>
                <div className="counter" onClick={() => navigate("../institutions")}>
                    <h4>Total No. of Institutions</h4>
                    <p>{totalInstitutions}</p>
                </div>
                <div className="counter" onClick={() => navigate("../classrooms")}>
                    <h4>Total No. of Classrooms</h4>
                    <p>{totalClassrooms}</p>
                </div>
                <div className="counter" onClick={() => navigate("../payments")}>
                    <h4>Total Payments Received</h4>
                    <p>{totalPaymentsReceived}</p>
                </div>
                <div className="counter" onClick={() => navigate("../students")}>
                    <h4>Total No. of Students</h4>
                    <p>{totalStudents}</p>
                </div>
                <div className="counter" onClick={() => navigate("../courses")}>
                    <h4>Total No. of Courses</h4>
                    <p>{totalCourses}</p>
                </div>
                <div className="counter" onClick={() => navigate("../tutors")}>
                    <h4>Total No. of Tutors</h4>
                    <p>{totalTutors}</p>
                </div>
                <div className="counter" onClick={() => navigate("../users")}>
                    <h4>Total No. of Users</h4>
                    <p>{totalUsers}</p>
                </div>
                <div className="counter" onClick={() => navigate("../countries")}>
                    <h4>Total No. of Countries</h4>
                    <p>{totalCountries}</p>
                </div>
            </div>
        </Page>
    );
}
