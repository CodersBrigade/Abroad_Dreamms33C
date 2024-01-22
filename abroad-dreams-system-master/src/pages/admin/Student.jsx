// Student.jsx

import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

import StudentService from './StudentService.js';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import Header from "../../components/Header.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";

export default function Student() {
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState({});
    const [studentData, setStudentData] = useState({
        // Add properties based on your SystemUserPojo structure
        username: '',
        email: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await StudentService.getAllStudents();
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleClose = () => {
        setShowForm('');
        setSelectedStudent({});
    };

    const handleShow = (formType, student) => {
        setShowForm(formType);
        setSelectedStudent(student);

        if (!student) {
            setStudentData({
                username: '',
                email: '',
                password: '',
                role: '',
            });
        } else {
            setStudentData({
                username: student.username,
                email: student.email,
                password: student.password,
                role: student.role,
            });
        }
    };

    const handleSaveStudent = async () => {
        try {
            await StudentService.addStudent(studentData);
            handleClose();
            fetchStudents();
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const handleUpdateStudent = async () => {
        try {
            await StudentService.updateStudent(selectedStudent.userId, studentData);
            handleClose();
            fetchStudents();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleRemoveStudent = async (userId) => {
        try {
            await StudentService.deleteStudent(userId);
            fetchStudents();
        } catch (error) {
            console.error('Error removing student:', error);
        }
    };

    return (
        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />
            <Container fluid className="flex-grow-1">
                <Header />
                <AdminProfileBar/>
                <div className="d-flex align-items-center mb-3">
                    <button className="btn btn-dark mr-2 m-1" onClick={() => handleShow('addStudent')}>Add New Student +</button>
                </div>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student) => (
                        <tr key={student.userId}>
                            <td>{student.userId}</td>
                            <td>{student.username}</td>
                            <td>{student.email}</td>
                            <td>{student.role}</td>
                            <td>
                                <Button variant="success" onClick={() => handleShow('editStudent', student)}>
                                    <FaEdit /> Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleRemoveStudent(student.userId)}>
                                    <FaTrash /> Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <Modal
                    show={Boolean(showForm)}
                    onHide={handleClose}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{showForm === 'addStudent' ? 'Add Student' : 'Edit Student'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formStudentUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Username"
                                    value={studentData.username}
                                    onChange={(e) => setStudentData({ ...studentData, username: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="formStudentEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={studentData.email}
                                    onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                                />
                            </Form.Group>


                            <Form.Group controlId="formStudentRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Role"
                                    value={studentData.role}
                                    onChange={(e) => setStudentData({ ...studentData, role: e.target.value })}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {showForm === 'addStudent' ? (
                            <Button variant="primary" onClick={handleSaveStudent}>
                                Save Student
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleUpdateStudent}>
                                Update Student
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}
