import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import Header from "../../components/Header.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";
import AppointmentService from "./AppointmentService.js";

// Create the Appointment component
export default function Appointment() {
  // State variables
  const [appointments, setAppointments] = useState([]);
  const [editAppointmentId, setEditAppointmentId] = useState(null);
  const [showForm, setShowForm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      fetchAppointments();
    } else {
      fetchAppointmentById(searchQuery);
    }
  };

  const handleClose = () => setShowForm('');

  const [appointmentData, setAppointmentData] = useState({
    date: new Date(),
    fullName: "",
    email: "",
    mobileNumber: "",
    purpose: ""
  });

  const [editAppointmentData, setEditAppointmentData] = useState({
    date: new Date(),
    fullName: "",
    email: "",
    mobileNumber: "",
    purpose: ""
  });

  const handleShow = (formType, appointment = null) => {
    setShowForm(formType);
    setEditAppointmentId(appointment ? appointment.appointmentId : null);

    if (appointment) {
      setEditAppointmentData({
        date: new Date(appointment.date),
        fullName: appointment.fullName,
        email: appointment.email,
        mobileNumber: appointment.mobileNumber,
        purpose: appointment.purpose,
      });
    } else {
      setAppointmentData({
        date: new Date(),
        fullName: "",
        email: "",
        mobileNumber: "",
        purpose: ""
      });
    }
  };

  const handleSaveAppointment = () => {
    AppointmentService.addAppointment(appointmentData)
        .then(response => {
          console.log('Appointment saved successfully:', response);
          handleClose();
          fetchAppointments();
        })
        .catch(error => {
          console.error('Error saving appointment:', error);
        });
  };

  const fetchAppointments = () => {
    AppointmentService.getAllAppointments()
        .then(response => {
          console.log('Fetched appointments:', response);
          setAppointments(response);
        })
        .catch(error => {
          console.error('Error fetching appointments:', error);
        });
  };

  const fetchAppointmentById = (id) => {
    AppointmentService.getAppointmentById(id)
        .then(response => {
          console.log('Fetched appointment by ID:', response);
          setAppointments([response]);
        })
        .catch(error => {
          console.error('Error fetching appointment by ID:', error);
        });
  };

  const handleRemoveAppointment = (appointmentId) => {
    if (appointmentId === undefined) {
      console.error("Invalid ID: ID is undefined");
      return;
    }

    AppointmentService.removeAppointment(appointmentId)
        .then(response => {
          console.log(`Appointment with ID ${appointmentId} removed successfully`);
          fetchAppointments();
        })
        .catch(error => {
          console.error(`Error removing appointment with ID ${appointmentId}:`, error);
        });
  };

  const handleUpdateAppointment = () => {
    AppointmentService.updateAppointment(editAppointmentId, editAppointmentData)
        .then(response => {
          console.log('Appointment updated successfully:', response);
          handleClose();
          fetchAppointments();
        })
        .catch(error => {
          console.error('Error updating appointment:', error);
        });
  };

  const handleEditAppointment = (appointment) => {
    handleShow('editAppointment', appointment);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
      <div className="d-flex">
        {/* AdminSidebar */}
        <AdminSidebar />

        <Container fluid className="flex-grow-1">
          <Header />
          <AdminProfileBar />
          <div className="wrapper">
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

            <Table striped bordered hover>
              <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Purpose</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {appointments.map((appointment) => (
                  <tr key={appointment.appointmentId}>
                    <td>{appointment.appointmentId}</td>
                    <td>{appointment.fullName}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.mobileNumber}</td>
                    <td>{appointment.purpose}</td>
                    <td>{new Date(appointment.date).toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td>
                      <Button variant="success" onClick={() => handleEditAppointment(appointment)}>
                        <FaEdit /> Edit
                      </Button>{' '}
                      <Button variant="danger" onClick={() => handleRemoveAppointment(appointment.appointmentId)}>
                        <FaTrash /> Remove
                      </Button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </Table>

            <Modal show={Boolean(showForm)} onHide={handleClose} animation={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              {showForm === 'editAppointment' && (
                  <>
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Edit Appointment
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        {/* Form fields for editing appointment */}
                        <Form.Group controlId="formFullName">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder="Enter full name"
                              value={editAppointmentData.fullName}
                              onChange={(e) => setEditAppointmentData({ ...editAppointmentData, fullName: e.target.value })}
                          />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                              type="email"
                              placeholder="Enter email"
                              value={editAppointmentData.email}
                              onChange={(e) => setEditAppointmentData({ ...editAppointmentData, email: e.target.value })}
                          />
                        </Form.Group>

                        <Form.Group controlId="formMobileNumber">
                          <Form.Label>Mobile Number</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder="Enter mobile number"
                              value={editAppointmentData.mobileNumber}
                              onChange={(e) => setEditAppointmentData({ ...editAppointmentData, mobileNumber: e.target.value })}
                          />
                        </Form.Group>

                        <Form.Group controlId="formDate">
                          <Form.Label>Date</Form.Label>
                          <DatePicker
                              selected={new Date(editAppointmentData.date)}
                              onChange={(date) => setEditAppointmentData({ ...editAppointmentData, date })}
                              dateFormat="MMMM d, yyyy"
                          />
                        </Form.Group>

                        <Form.Group controlId="formPurpose">
                          <Form.Label>Purpose</Form.Label>
                          <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Enter purpose"
                              value={editAppointmentData.purpose}
                              onChange={(e) => setEditAppointmentData({ ...editAppointmentData, purpose: e.target.value })}
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
                        {/* Form fields for adding a new appointment */}
                        <Form.Group controlId="formFullName">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder="Enter full name"
                              value={appointmentData.fullName}
                              onChange={(e) => setAppointmentData({ ...appointmentData, fullName: e.target.value })}
                          />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                              type="email"
                              placeholder="Enter email"
                              value={appointmentData.email}
                              onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })}
                          />
                        </Form.Group>

                        <Form.Group controlId="formMobileNumber">
                          <Form.Label>Mobile Number</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder="Enter mobile number"
                              value={appointmentData.mobileNumber}
                              onChange={(e) => setAppointmentData({ ...appointmentData, mobileNumber: e.target.value })}
                          />
                        </Form.Group>

                        <Form.Group controlId="formDate">
                          <Form.Label>Date</Form.Label>
                          <DatePicker
                              selected={new Date(appointmentData.date)}
                              onChange={(date) => setAppointmentData({ ...appointmentData, date })}
                              dateFormat="MMMM d, yyyy"
                          />
                        </Form.Group>

                        <Form.Group controlId="formPurpose">
                          <Form.Label>Purpose</Form.Label>
                          <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Enter purpose"
                              value={appointmentData.purpose}
                              onChange={(e) => setAppointmentData({ ...appointmentData, purpose: e.target.value })}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                  </>
              )}

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                {showForm === 'addAppointment' && <Button variant="success" onClick={handleSaveAppointment}>Add Appointment</Button>}
                {showForm === 'editAppointment' && <Button variant="primary" onClick={handleUpdateAppointment}>Update Appointment</Button>}
              </Modal.Footer>
            </Modal>
          </div>
        </Container>
      </div>
  );
}
