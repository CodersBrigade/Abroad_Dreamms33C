// Payment.jsx

import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import Header from "../../components/Header.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";
import PaymentService from './PaymentService.js';
import StudentService from './StudentService.js';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Payment() {
    // State variables
    const [searchUserId, setSearchUserId] = useState('');

    const [payments, setPayments] = useState([]);
    const [showForm, setShowForm] = useState('');
    const [selectedPayment, setSelectedPayment] = useState({});
    const [paymentData, setPaymentData] = useState({
        userId: null,
        application: null,
        amount: 0,
        paymentType: '',
        status: '',
        paymentDate: new Date().toISOString().split('T')[0],
        description: '', // Initialize description with an empty string
    });
    const [users, setUsers] = useState([]); // State to store fetched users

    const handleClose = () => {
        setShowForm('');
        setSelectedPayment({});
    };

    const handleShow = (formType, payment) => {
        setShowForm(formType);
        setSelectedPayment(payment);

        if (!payment) {
            setPaymentData({
                userId: null,
                application: null,
                amount: 0,
                paymentType: '',
                status: '',
                paymentDate: new Date().toISOString().split('T')[0],
                description: '', // Initialize description with an empty string
            });
        } else {
            setPaymentData({
                userId: payment.userId,
                application: payment.application,
                amount: payment.amount,
                paymentType: payment.paymentType,
                status: payment.status,
                paymentDate: new Date(payment.paymentDate).toISOString().split('T')[0],
                description: payment.description || '', // Initialize description with an empty string if undefined
            });
        }
    };

    const handleSavePayment = () => {
        PaymentService.savePayment(paymentData)
            .then((response) => {
                console.log('Payment saved successfully:', response.data);
                handleClose();
                fetchPayments();
            })
            .catch((error) => {
                console.error('Error saving payment:', error);
            });
    };

    const handleGetPaymentByUserId = () => {
        if (searchUserId.trim() !== '') {
            // Call the service function to fetch payments by user ID
            PaymentService.getPaymentByUserId(searchUserId)
                .then((result) => {
                    setPayments(result);
                })
                .catch((error) => {
                    console.error('Error fetching payments by user ID:', error);
                });
        } else {
            // If search input is empty, fetch all payments
            fetchPayments();
        }
    };


    const handleUpdatePayment = () => {
        if (selectedPayment && selectedPayment.paymentId) {
            PaymentService.updatePayment(selectedPayment.paymentId, paymentData)
                .then((response) => {
                    console.log('Payment updated successfully:', response.data);
                    handleClose();
                    fetchPayments();
                })
                .catch((error) => {
                    console.error('Error updating payment:', error);
                });
        }
    };

    const handleRemovePayment = (paymentId) => {
        if (paymentId) {
            PaymentService.deletePaymentById(paymentId)
                .then(() => {
                    console.log(`Payment with ID ${paymentId} removed successfully`);
                    fetchPayments();
                })
                .catch((error) => {
                    console.error(`Error removing payment with ID ${paymentId}:`, error);
                });
        }
    };

    const fetchPayments = async () => {
        try {
            const fetchedPayments = await PaymentService.getAllPayments();
            console.log('Fetched payments:', fetchedPayments);
            setPayments(fetchedPayments);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await StudentService.getAllStudents();
            console.log('Fetched users:', fetchedUsers.data);
            setUsers(fetchedUsers.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchPayments();
        fetchUsers();
    }, []);

    return (
        <div><Header />
        <div className="d-flex">
            <AdminSidebar />
            <Container fluid className="flex-grow-1">

                <AdminProfileBar/>
                <div className="d-flex align-items-center mb-3">
                    <button className="btn btn-dark mr-2 m-1" onClick={() => handleShow('addPayment')}>
                        Add New Payment +
                    </button>
                </div>
                <div className="d-flex align-items-center mb-3">
                    <input
                        type="text"
                        placeholder="Enter User ID"
                        value={searchUserId}
                        onChange={(e) => setSearchUserId(e.target.value)}
                        className="form-control mr-2"
                    />
                    <button className="btn btn-primary" onClick={() => handleGetPaymentByUserId()}>
                        Search
                    </button>
                </div>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>User ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments && payments.length > 0 ? (
                        payments.map((payment) => (
                            <tr key={payment.paymentId}>
                                <td>{payment.paymentId}</td>
                                <td>{payment.userId}</td>
                                <td>{payment.description}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.status}</td>
                                <td>{payment.paymentDate}</td>
                                <td>
                                    <Button variant="success" onClick={() => handleShow('editPayment', payment)}>
                                        <FaEdit/> View/Edit
                                    </Button>{' '}
                                    <Button variant="danger" onClick={() => handleRemovePayment(payment.paymentId)}>
                                       <FaTrash/> Remove
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No payments found</td>
                        </tr>
                    )}
                    </tbody>
                </Table>

                <Modal
                    show={Boolean(showForm)}
                    onHide={handleClose}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{showForm === 'addPayment' ? 'Add Payment' : 'Edit Payment'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formPaymentUser">
                                <Form.Label>User</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={paymentData.user ? paymentData.user.userId : ''}
                                    onChange={(e) => {
                                        const selectedUserId = e.target.value;
                                        const selectedUser = users.find(user => user.userId.toString() === selectedUserId);
                                        console.log('Selected User:::', selectedUser);
                                        console.log('Selected UserId:::', selectedUserId);
                                        setPaymentData({ ...paymentData, userId: selectedUserId || null });
                                    }}
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user.userId} value={user.userId}>
                                            {user.userId} - {user.username}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formPaymentAmount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={paymentData.amount}
                                    onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPaymentDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Description"
                                    value={paymentData.description}
                                    onChange={(e) => setPaymentData({ ...paymentData, description: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPaymentDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={paymentData.paymentDate}
                                    onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="formPaymentStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={paymentData.status}
                                    onChange={(e) => setPaymentData({ ...paymentData, status: e.target.value })}
                                >
                                    <option value="">Select Status</option>
                                    <option value="Due">Due</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Cancelled">Cancelled</option>
                                </Form.Control>
                            </Form.Group>

                            {/* Add other form fields */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {showForm === 'addPayment' ? (
                            <Button variant="primary" onClick={handleSavePayment}>
                                Save Payment
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleUpdatePayment}>
                                Update Payment
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
        </div>
    );
}
