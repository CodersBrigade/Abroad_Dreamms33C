import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export default function CourseCard({ numberOfCourses }) {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const navigateToStudentCourses = () => {
        // Use navigate function to navigate to the '/student/studentcourses' route
        navigate('/student/studentcourses');
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/student/course/getAll');
            setCourses(response.data.slice(0, numberOfCourses));

        } catch (error) {
            // If login fails, show an error notification
            toast.error('Server-Side Error!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <Container fluid>
            <h1 className="mt-4 mb-3">Courses</h1>
            <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                {Array.isArray(courses) &&
                    courses.map((course) => (
                        <Col key={course.courseId} className="mb-4">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <img width={250} src={'data:image/png;base64,'+course.image} />
                                    <Card.Title><br />{course.courseName}</Card.Title>
                                    <Card.Text>
                                        Duration: {course.durationYears} Year/s
                                        <br />
                                        Total Credits: {course.credits}
                                    </Card.Text>
                                    {accessToken && (
                                        <>
                                            <Button variant="success m-1" onClick={navigateToStudentCourses}>
                                                <FaPlus />
                                            </Button>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </Container>
    );
}
