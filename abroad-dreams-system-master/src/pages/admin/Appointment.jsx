import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Chart from "../../components/AdminChart.jsx";
import AdminSidebar from "../../components/AdminSidebar.jsx";
import CreateAppointment from '../../components/Appointment/CreateAppointment.jsx';



const Appointment = () => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/appointments/getAll');
            console.log('Fetched appointments:', response.data);
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            // Handle the error, show a message, etc.
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/students/getAll');
            setStudents(response.data);
            setTotalStudents(response.data.length);

        } catch (error) {
            console.error('Error fetching students:', error);
            // Handle the error, show a message, etc.
        }
    };



    useEffect(() => {
        // Fetch appointments when the component mounts
        fetchAppointments();
        fetchStudents();

    }, []); // The empty dependency array ensures this effect runs only once

    const handleEdit = (id) => {
        // Add your logic to handle the edit action
        console.log(`Editing appointment with ID: ${id}`);
    };

    const handleDelete = (id) => {
        // Add your logic to handle the delete action
        console.log(`Deleting appointment with ID: ${id}`);
    };

    return (
        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <Container fluid className="flex-grow-1">
                {/* Add the CreateAppointment component */}
                <CreateAppointment
                    fetchAppointments={fetchAppointments}
                    fetchStudents={fetchStudents}
                />

                <h2>Appointments</h2>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Purpose</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.appointmentId}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.purpose}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEdit(appointment.id)}>
                                    <EditIcon />
                                </Button>
                                {' '}
                                <Button variant="danger" onClick={() => handleDelete(appointment.id)}>
                                    <DeleteIcon />
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                {/*<Chart />*/}
            </Container>
        </div>
    );
};

export default Appointment;
