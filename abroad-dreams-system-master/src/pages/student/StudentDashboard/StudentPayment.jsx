import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import PaymentService from './StudentPaymentService.js';
import StudentSidebar from "./StudentSidebar.jsx";
import Header from "../../../components/Header.jsx";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";
import './StudentPayment.css';

export default function StudentPayment({ userId }) {
    const [payments, setPayments] = useState([]);
    const [tempUserId, setTempUserId] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentFormData, setPaymentFormData] = useState({
        cardNumber: '',
        expiration: '',
        cvv: '',
        cardHolderName: '',
        amount: '',
        currency: 'USD', // Default currency
    });

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

    const formatCardNumber = (value) => {
        const trimmedValue = value.replace(/\s+/g, ''); // Remove existing spaces
        const regex = /\d{1,4}/g;
        const parts = trimmedValue.match(regex);

        if (parts) {
            return parts.join(' ');
        }

        return trimmedValue;
    };

    const getCardType = (cardNumber) => {
        // Define regex patterns for different card types
        const cardPatterns = {
            visa: /^4/,
            mastercard: /^5[1-5]/,
            amex: /^3[47]/,
            discover: /^6(?:011|5[0-9]{2})/,
            // Add more card patterns as needed
        };

        for (const card in cardPatterns) {
            if (cardPatterns[card].test(cardNumber)) {
                return card;
            }
        }

        return 'unknown'; // Return 'unknown' if the card type is not identified
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let updatedValue = value;

        if (name === 'cardNumber') {
            // Apply card number validation and formatting
            updatedValue = formatCardNumber(value);

            // Limit the card number to 16 characters
            if (updatedValue.length > 19) {
                updatedValue = updatedValue.slice(0, 19);
            }

            // Determine card type if the input is not empty
            const cardType = updatedValue.trim() !== ''
                ? getCardType(updatedValue.replace(/\s+/g, '').slice(0, 2))
                : 'unknown';

            // Use the card type information to dynamically display the card image
            const cardImageElement = document.getElementById('cardImage');
            if (cardImageElement) {
                cardImageElement.src = cardType !== 'unknown'
                    ? `/src/assets/cardtypes/${cardType}.png`
                    : `/src/assets/cardtypes/UnknownCard.png`;
            }

            // Add further validations as needed...
        }

        setPaymentFormData({ ...paymentFormData, [name]: updatedValue });
    };

    const handleExpirationChange = (event) => {
        const { value } = event.target;
        const sanitizedValue = value
            .replace(/[^0-9]/g, '') // Remove non-numeric characters
            .slice(0, 4); // Restrict input to MMYY format

        let formattedValue = sanitizedValue;

        if (sanitizedValue.length > 2) {
            // Automatically add a slash after the first two characters
            formattedValue = `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(2)}`;
        }

        setPaymentFormData({
            ...paymentFormData,
            expiration: formattedValue,
        });

        // Update the input value
        event.target.value = formattedValue;
    };

    const handleCVVChange = (event) => {
        const { value } = event.target;
        if (/^\d{0,4}$/.test(value)) { // Adjust regex to match the desired CVV length
            setPaymentFormData({ ...paymentFormData, cvv: value });
        }
    };

    const handleCurrencyChange = (event) => {
        const { value } = event.target;
        setPaymentFormData({ ...paymentFormData, currency: value });
    };

    const handleCancelPayment = () => {
        setShowPaymentForm(false);
        // Reset the payment form data if needed
        setPaymentFormData({
            cardNumber: '',
            expiration: '',
            cvv: '',
            cardHolderName: '',
            amount: '',
            currency: 'USD', // Default currency
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('your_payment_api_endpoint', paymentFormData);
            console.log('Payment successful!', response.data);
            // Add logic to handle successful payment submission
        } catch (error) {
            console.error('Payment failed!', error);
            // Add logic to handle payment failure
        }
    };

    return (
        <div>
            <Header />
            <div className="d-flex">
                <StudentSidebar />
                <Container>
                    <StudentProfileBar />
                    <h2>Student Payments</h2>

                    {/* Table Structure */}
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Description</th>
                            <th>Amount</th>
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
                                <td>{payment.status}</td>
                                <td>{payment.paymentDate}</td>
                                <td>
                                    <Button variant="primary" onClick={() => setShowPaymentForm(true)}>
                                        Make Payment
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    {/* Payment Modal */}
                    <Modal
                        show={showPaymentForm}
                        onHide={handleCancelPayment}
                        animation={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Make Payment
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formPaymentCardNumber">
                                    <Form.Label>Card Number</Form.Label>
                                    <div className="input-with-icon">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cardNumber"
                                            name="cardNumber"
                                            placeholder="Enter card number"
                                            value={paymentFormData.cardNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <img id="cardImage" src="" alt="Card Type" className="card-type-icon small-card-icon" />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPaymentExpiration">
                                    <Form.Label>Expiration Date (MM/YY)</Form.Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="expiration"
                                        name="expiration"
                                        placeholder="MM/YY"
                                        value={paymentFormData.expiration}
                                        onChange={handleExpirationChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPaymentCVV">
                                    <Form.Label>CVV</Form.Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cvv"
                                        name="cvv"
                                        placeholder="CVV"
                                        value={paymentFormData.cvv}
                                        onChange={handleCVVChange}
                                        maxLength="4"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPaymentCardHolderName">
                                    <Form.Label>Cardholder's Name</Form.Label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cardHolderName"
                                        name="cardHolderName"
                                        placeholder="Cardholder's name"
                                        value={paymentFormData.cardHolderName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPaymentAmount">
                                    <Form.Label>Amount</Form.Label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="amount"
                                        name="amount"
                                        placeholder="Enter amount"
                                        value={paymentFormData.amount}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPaymentCurrency">
                                    <Form.Label>Currency</Form.Label>
                                    <select
                                        className="form-control"
                                        id="currency"
                                        name="currency"
                                        value={paymentFormData.currency}
                                        onChange={handleCurrencyChange}
                                    >
                                        <option value="USD">USD</option>
                                        <option value="GBP">GBP</option>
                                        <option value="NRS">NRS</option>
                                        {/* Add more currencies as needed */}
                                    </select>
                                </Form.Group>

                                <button type="submit" className="btn btn-primary">
                                    Submit Payment
                                </button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCancelPayment}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </div>
    );
}
