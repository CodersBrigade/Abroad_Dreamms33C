// Payment.jsx

import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import PaymentService from './PaymentService.js';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import Header from "../../components/Header.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";

export default function Payment() {
    const [payments, setPayments] = useState([]);
    const [showForm, setShowForm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPayment, setSelectedPayment] = useState({});
    const [paymentData, setPaymentData] = useState({
        user: null,
        application: null,
        amount: 0,
        paymentType: '',
        status: '',
        paymentDate: new Date(),
    });
    const [loading, setLoading] = useState(true); // New loading state

    const fetchPayments = async () => {
        // try {
        //     const response = await PaymentService.getAllPayments();
        //     console.log('Test Data:',response.data);
        //     setPayments(response.data);
        // } catch (error) {
        //     console.error('Error fetching payments:', error);
        // } finally {
        //     setLoading(false); // Set loading to false when data fetching is complete
        // }
    };

    useEffect(() => {
        // fetchPayments();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        // try {
        //     const response = await PaymentService.getPaymentsByDate(searchQuery);
        //     setPayments(response.data);
        // } catch (error) {
        //     console.error('Error searching payments:', error);
        // }
    };

    const handleClose = () => {
        setShowForm('');
        setSelectedPayment({});
    };

    const handleShow = (formType, payment) => {
        // setShowForm(formType);
        // setSelectedPayment(payment);
        //
        // if (!payment) {
        //     setPaymentData({
        //         user: null,
        //         application: null,
        //         amount: 0,
        //         paymentType: '',
        //         status: '',
        //         paymentDate: new Date(),
        //     });
        // } else {
        //     setPaymentData({
        //         user: payment.user,
        //         application: payment.application,
        //         amount: payment.amount,
        //         paymentType: payment.paymentType,
        //         status: payment.status,
        //         paymentDate: new Date(payment.paymentDate),
        //     });
        // }
    };

    const handleSavePayment = async () => {
        // try {
        //     await PaymentService.addPayment(paymentData);
        //     handleClose();
        //     fetchPayments();
        // } catch (error) {
        //     console.error('Error saving payment:', error);
        // }
    };

    const handleUpdatePayment = async () => {
        // try {
        //     await PaymentService.updatePayment(selectedPayment.paymentId, paymentData);
        //     handleClose();
        //     fetchPayments();
        // } catch (error) {
        //     console.error('Error updating payment:', error);
        // }
    };

    const handleRemovePayment = async (paymentId) => {
        // try {
        //     await PaymentService.deletePayment(paymentId);
        //     fetchPayments();
        // } catch (error) {
        //     console.error('Error removing payment:', error);
        // }
    };

    return (
        <div className="d-flex">
            <AdminSidebar />
            <Container fluid className="flex-grow-1">
                <Header />
                <AdminProfileBar/>
                <div className="d-flex align-items-center mb-3">
                    <button className="btn btn-dark mr-2 m-1" onClick={() => handleShow('addPayment')}>
                        Add New Payment +
                    </button>
                    <input
                        type="text"
                        className="form-control mr-2"
                        placeholder="Search by Date"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Invoice ID</th>
                    {/* Add other table headers based on your Payment entity structure */}
                    <th>User ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Type</th>
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
                        <td>{payment.paymentType}</td>
                        <td>{payment.status}</td>
                        <td>{payment.paymentDate}</td>
                        <td>
                            <Button variant="info" onClick={() => handleShow('editPayment', payment)}>Edit</Button>{' '}
                            <Button variant="danger" onClick={() => handleRemovePayment(payment.paymentId)}>Remove</Button>
                        </td>
                    </tr>
                )) ) : (
                    <tr>
                        <td colSpan="8">No payments found</td>
                    </tr>
                )}
                </tbody>
            </Table>
                    )}
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
                        {/* Add form fields based on your PaymentPojo structure */}
                        <Form.Group controlId="formPaymentAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Amount"
                                value={paymentData.amount}
                                onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
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
                        <Form.Group controlId="formPaymentType">
                            <Form.Label>Payment Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={paymentData.paymentType}
                                onChange={(e) => setPaymentData({ ...paymentData, paymentType: e.target.value })}
                            >
                                <option value="">Select Payment Type</option>
                                <option value="Debit/Credit Card">Debit/Credit Card</option>
                                <option value="Cash">Cash</option>
                                <option value="Digital Wallet">Digital Wallet</option>
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
    );
}
