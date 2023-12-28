// CreateAppointment.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const CreateAppointment = ({ fetchAppointments, fetchStudents }) => {
    const [date, setDate] = useState('');
    const [purpose, setPurpose] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch students when the component mounts
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/students/getAll');
                console.log('Fetched students:', response.data);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                // Handle the error, show a message, etc.
            }
        };

        fetchStudents();
    }, []);

    const handleSaveAppointment = async () => {
        try {
            // You can add validation here before making the request
            if (!selectedStudent || !selectedStudent.id) {
                console.error('Invalid selected student:', selectedStudent);
                // Handle the error, show a message, etc.
                return;
            }

            const newAppointment = {
                date,
                purpose,
                studentId: selectedStudent.id,
            };

            await axios.post('http://localhost:8080/appointments/save', newAppointment);

            // Fetch appointments to update the list after adding a new appointment
            fetchAppointments();

            // Clear the form fields after saving
            setDate('');
            setPurpose('');
            setSelectedStudent('');
        } catch (error) {
            console.error('Error saving appointment:', error);
            // Handle the error, show a message, etc.
        }
    };

    return (
        <Container Container style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <h2>Add New Appointment</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Purpose</Form.Label>
                        <Form.Control
                            type="text"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Select Student</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                        >
                            <option value="">Select student...</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Button variant="primary" onClick={handleSaveAppointment}>
                    Add New Appointment
                </Button>
            </Form>
        </Container>
    );
};

export default CreateAppointment;
