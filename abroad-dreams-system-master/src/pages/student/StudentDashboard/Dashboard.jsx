import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import StudentSidebar from './StudentSidebar.jsx';
import SCourses from './Scourses.jsx'; // Import SCourses component

import axios from 'axios';

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);
    const [studentId, setStudentId] = useState(''); // Maintain studentId state

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

    useEffect(() => {
        fetchCourses();

    }, []);

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div className="d-flex">
            {/* StudentSidebar */}
            <StudentSidebar />


        </div>
    );
};

export default Dashboard;
