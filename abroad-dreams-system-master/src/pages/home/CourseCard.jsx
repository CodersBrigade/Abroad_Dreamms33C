import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FaHeart, FaPlus } from 'react-icons/fa';

export default function CourseCard({ numberOfCourses }) {
    const [courses, setCourses] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/student/course/getAll');
            console.log('Image URL:', response.data.image);

            setCourses(response.data.slice(0, numberOfCourses));

        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <Container fluid>
            <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                {Array.isArray(courses) &&
                    courses.map((course) => (
                        <Col key={course.courseId} className="mb-4">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <img width={250} src={"src/assets/images/ai-course.jpg"} />
                                    <Card.Title><br />{course.courseName}</Card.Title>
                                    <Card.Text>
                                        <strong>Course Code: {course.courseId}</strong>
                                        <br />
                                        Duration: {course.durationYears} Year/s
                                        <br />
                                        Total Credits: {course.credits}
                                    </Card.Text>
                                    {accessToken && (
                                        <>
                                            <Button variant="danger m-1">
                                                <FaHeart />
                                            </Button>
                                            <Button variant="success m-1">
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
