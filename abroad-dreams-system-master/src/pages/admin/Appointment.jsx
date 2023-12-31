import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar.jsx';

export default function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [editAppointmentId, setEditAppointmentId] = useState(null);
    const [showForm, setShowForm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            fetchAppointments();
        } else {
            fetchAppointmentById(searchQuery);
        }
    };

    const handleClose = () => setShowForm('');

    const [appointmentData, setAppointmentData] = useState({
        studentId: "",
        date: "",
        purpose: "",
        status: "Pending",  // Default status
    });

    const [editAppointmentData, setEditAppointmentData] = useState({
        studentId: "",
        date: "",
        purpose: "",
        status: "Pending",
    });

    const handleShow = (formType, appointmentId = null) => {
        setShowForm(formType);
        setEditAppointmentId(appointmentId);

        if (!appointmentId) {
            setAppointmentData({
                studentId: "",
                date: "",
                purpose: "",
                status: "Pending",
            });
        }
    };

    const handleSaveAppointment = async () => {
        try {
            const response = await axios.post('/appointments/save', appointmentData);
            console.log('Appointment saved successfully:', response.data);
            handleClose();
            fetchAppointments();
        } catch (error) {
            console.error('Error saving Appointment:', error);
        }
    };


    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/appointments/getAll');
            console.log('Fetched Appointments:', response.data);
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching Appointments:', error);
        }
    };

    const fetchAppointmentById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/appointments/getById/${id}`);
            console.log('Fetched Appointment by ID:', response.data);
            setAppointments([response.data]);
        } catch (error) {
            console.error('Error fetching Appointment by ID:', error);
        }
    };

    const handleRemoveAppointment = (appointmentId) => {
        if (appointmentId === undefined) {
            console.error("Invalid ID: ID is undefined");
            return;
        }
        axios
            .delete(`http://localhost:8080/appointments/delete/${appointmentId}`)
            .then((response) => {
                console.log(`Appointment with ID ${appointmentId} removed successfully`);
                fetchAppointments();
            })
            .catch((error) => {
                console.error(`Error removing Appointment with ID ${appointmentId}:`, error);
            });
    };

    const handleUpdateAppointment = () => {
        axios
            .put(`http://localhost:8080/appointments/update/${editAppointmentId}`, editAppointmentData)
            .then((response) => {
                console.log('Appointment updated successfully:', response.data);
                handleClose();
                fetchAppointments();
            })
            .catch((error) => {
                console.error('Error updating Appointment:', error);
            });
    };

    const handleEditAppointment = (appointmentId) => {
        const appointmentToEdit = appointments.find((appointment) => appointment.appointmentId === appointmentId);

        setEditAppointmentData({
            studentId: appointmentToEdit.studentId,
            date: appointmentToEdit.date,
            purpose: appointmentToEdit.purpose,
            status: appointmentToEdit.status,
        });

        handleShow('editAppointment', appointmentId);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />

            <Container fluid className="flex-grow-1">
                <div className="appointment-component">
            <div className="d-flex align-items-center mb-3">
                <button className="btn btn-dark mr-2 m-1" onClick={() => { handleShow("addAppointment") }}>Add New Appointment +</button>
                <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Search by ID"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>

            {Array.isArray(appointments) && appointments.map((appointment) => (
                <div className="item" key={appointment.appointmentId}>
                    {<strong>ID: {appointment.appointmentId}</strong>} {appointment.purpose}{" -- "}{appointment.status}
                    <div>
                        <button className="btn btn-danger m-1" onClick={() => handleEditAppointment(appointment.appointmentId)}>View Details/Edit</button>
                        <button className="btn btn-success m-1" onClick={() => handleRemoveAppointment(appointment.appointmentId)}>Remove</button>
                    </div>
                </div>
            ))}

            <Modal
                show={Boolean(showForm)}
                onHide={handleClose}
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                {showForm === 'editAppointment' && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Edit Appointment
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                {/* Form fields for editing Appointment */}
                                <Form.Group className="mb-3" controlId="formEditAppointmentStudentId">
                                    <Form.Label>Student ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Student ID"
                                        value={editAppointmentData.studentId}
                                        onChange={(e) => setEditAppointmentData({ ...editAppointmentData, studentId: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEditAppointmentDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Date"
                                        value={editAppointmentData.date}
                                        onChange={(e) => setEditAppointmentData({ ...editAppointmentData, date: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEditAppointmentPurpose">
                                    <Form.Label>Purpose</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Purpose"
                                        value={editAppointmentData.purpose}
                                        onChange={(e) => setEditAppointmentData({ ...editAppointmentData, purpose: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEditAppointmentStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Status"
                                        value={editAppointmentData.status}
                                        onChange={(e) => setEditAppointmentData({ ...editAppointmentData, status: e.target.value })}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </>
                )}

                {showForm === 'addAppointment' && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Appointment
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                {/* Form fields for adding a new Appointment */}
                                <Form.Group className="mb-3" controlId="formAppointmentStudentId">
                                    <Form.Label>Student ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Student ID"
                                        value={appointmentData.studentId}
                                        onChange={(e) => setAppointmentData({ ...appointmentData, studentId: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formAppointmentDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Date"
                                        value={appointmentData.date}
                                        onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formAppointmentPurpose">
                                    <Form.Label>Purpose</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Purpose"
                                        value={appointmentData.purpose}
                                        onChange={(e) => setAppointmentData({ ...appointmentData, purpose: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formAppointmentStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Status"
                                        value={appointmentData.status}
                                        onChange={(e) => setAppointmentData({ ...appointmentData, status: e.target.value })}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                    </>
                )}

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    {showForm === 'addAppointment' && <Button variant="primary" onClick={handleSaveAppointment}>Add Appointment</Button>}
                    {showForm === 'editAppointment' && <Button variant="primary" onClick={handleUpdateAppointment}>Update Appointment</Button>}
                </Modal.Footer>
            </Modal>
        </div>
            </Container>
        </div>
    );
}
