// StudentPayment.jsx

import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import PaymentService from './StudentPaymentService.js';
import StudentSidebar from "./StudentSidebar.jsx";

export default function StudentPayment({ userId }) {
    const [payments, setPayments] = useState([]);
    const [tempUserId, setTempUserId] = useState('');

    useEffect(() => {
        setTempUserId(localStorage.getItem('userId'));
    }, []);

    useEffect(() => {
        fetchPayments();
    }, [tempUserId]);

    const fetchPayments = async () => {
        try {
            const response = await PaymentService.getByUserId(tempUserId);
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const handleMakePayment = async () => {
        try {
            // Add logic to make a payment
            // You may need to open a modal or navigate to a payment form
            console.log('Make Payment button clicked');
        } catch (error) {
            console.error('Error making payment:', error);
        }
    };

    const handleFilterByStatus = async (status) => {
        try {
            const response = await PaymentService.getPaymentsByStatus(tempUserId, status);
            setPayments(response.data);
        } catch (error) {
            console.error(`Error fetching payments with status ${status}:`, error);
        }
    };

    const handleFilterByDate = async (date) => {
        try {
            const response = await PaymentService.getPaymentsByDate(tempUserId, date);
            setPayments(response.data);
        } catch (error) {
            console.error(`Error fetching payments with date ${date}:`, error);
        }
    };

    return (
        <div className="d-flex">
            <StudentSidebar />
        <Container>
            <h2>Student Payments</h2>
            <div>
                {/*<Button variant="primary" onClick={() => handleFilterByStatus('PAID')}>*/}
                {/*    Filter by Status: PAID*/}
                {/*</Button>{' '}*/}
                <Button variant="primary" onClick={() => handleFilterByStatus('PENDING')}>
                    Filter by Status: PENDING
                </Button>{' '}

            </div>
            {/*<div>*/}
            {/*    /!* Adjust the date format as per your backend's requirements *!/*/}
            {/*    <Button variant="primary" onClick={() => handleFilterByDate('2022-01-01')}>*/}
            {/*        Filter by Date: 2022-01-01*/}
            {/*    </Button>{' '}*/}
            {/*    /!* Add other date filters as needed *!/*/}
            {/*</div>*/}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Invoice ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment) => (
                    <tr key={payment.paymentId}>
                        <td>{payment.paymentId}</td>
                        <td>{payment.description}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.paymentType}</td>
                        <td>{payment.status}</td>
                        <td>{payment.paymentDate}</td>
                        <td>
                            <Button variant="primary" onClick={handleMakePayment}>
                                Make Payment
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
        </div>
    );
}
