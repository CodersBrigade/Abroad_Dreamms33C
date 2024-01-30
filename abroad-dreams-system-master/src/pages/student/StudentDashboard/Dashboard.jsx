import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import StudentSidebar from "./StudentSidebar.jsx";
import axios from "axios";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";
import Header from "../../../components/Header.jsx";
import { toast } from "react-toastify";
import MyCalendar from "./Calendar.jsx";
import BasicBars from "./BarChart.jsx";
import BasicPie from "./PieChart.jsx";
import DashboardStudent from "./DashboardStudent.jsx";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [studentId, setStudentId] = useState(""); // Maintain studentId state

  const checkProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/student-profile/getByUserId/${localStorage.getItem('userId')}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
      });

      console.log('Fetched:::', response.data);

      if (response.data && response.data.length < 1) {
        // Show a complete profile notification
        toast.error("Complete Your Profile First!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log('Profile Fetched', error);
      // Show a complete profile notification

    }
  };


  // Function to fetch course data
  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/student/course/getAll",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      setCourses(response.data);
      setTotalCourses(response.data.length);
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Handle the error, show a message, etc.
    }
  };


  useEffect(() => {
    fetchCourses();
    checkProfile();
  }, []);

  return (
    <div>
      <Header />
      <div className="d-flex">
        <StudentSidebar />
        <Container fluid className="m-2">
          <StudentProfileBar />
          <div>
            <DashboardStudent />
          </div>
          <div className="d-flex">
            <MyCalendar style={{ minWidth: "500px", width: "50%" }} />
            <BasicBars />
            <BasicPie />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
