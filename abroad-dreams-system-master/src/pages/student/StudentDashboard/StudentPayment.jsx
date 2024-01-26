import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentSidebar from "./StudentSidebar.jsx";
import Header from "../../../components/Header.jsx";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";
import PaymentService from "../../admin/PaymentService.js";

export default function StudentPayment({ userId }) {

    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState({});
    const [users, setUsers] = useState([]); // State to store fetched users
    const [tempUserId, setTempUserId] = useState('');
    // const [selectedPayment, setSelectedPayment] = useState(null);
    const [cardError, setCardError] = useState({ hasError: false, message: '' });
    const [expirationError, setExpirationError] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentFormData, setPaymentFormData] = useState({
        cardNumber: '',
        expiration: '',
        cvv: '',
        cardHolderName: '',
        amount: '',
        currency: 'NPR', // Default currency
    });
    const [paymentData, setPaymentData] = useState({
        userId: null,
        application: null,
        amount: 0,
        paymentType: '',
        status: '',
        paymentDate: new Date().toISOString().split('T')[0],
        description: '', // Initialize description with an empty string
    });

    const API_BASE_URL = 'http://localhost:8080/student/payment';

    const PaymentService = {
        getPaymentById: (id) => axios.get(`${API_BASE_URL}/getByPaymentId/${id}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        }),

        getByUserId: (userId) => axios.get(`${API_BASE_URL}/getById/${userId}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        }),

        updatePayment: (id, paymentData) => axios.put(`${API_BASE_URL}/update/${id}`, paymentData, {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        }),

        getPaymentsByStatus: (status) => axios.get(`${API_BASE_URL}/status/${status}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        }),

        updatePaymentStatus: (paymentId, status) => axios.put(`${API_BASE_URL}/updateStatus/${paymentId}`, { status }, {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        }),

        getPaymentsByDate: (date) => axios.get(`${API_BASE_URL}/date/${date}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
        }),




    };

    const handlePayment = () => {
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


    useEffect(() => {
        setTempUserId(localStorage.getItem('userId'));
        fetchPayments();
    }, [tempUserId]);

    useEffect(() => {
        if (selectedPayment) {
            setPaymentFormData((prevData) => ({
                ...prevData,
                amount: selectedPayment.amount,
            }));
        }
    }, [selectedPayment]);

    const fetchPayments = async () => {
        try {
            const response = await PaymentService.getByUserId(tempUserId);
            const paidPayments = response.data.filter(payment => payment.status === 'Paid');

            setPayments(response.data);
            console.log('Paid::',paidPayments);
        } catch (error) {
            console.error('Error fetching payments true:', error);
        }
    };
    const formatCardNumber = (value) => {
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        const regex = /\d{1,16}/g; // Allow only up to 16 digits
        let parts = numericValue.match(regex);

        if (parts) {
            let formattedValue = parts.join(' ').replace(/(\d{4})/g, '$1 ').trim();

            // Ensure a maximum length of 19 characters (16 digits + 3 spaces)
            if (formattedValue.length > 19) {
                formattedValue = formattedValue.slice(0, 19);
            }

            return formattedValue;
        }

        return numericValue;
    };

    const handleCardImageSource = () => {
        const cardType = getCardType(paymentFormData.cardNumber.replace(/\s+/g, '').slice(0, 2));
        return cardType !== 'unknown'
            ? `/src/assets/cardtypes/${cardType}.png`
            : `/src/assets/cardtypes/UnknownCard.png`;
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

            // Handle card errors
            if (cardType === 'unknown') {
                const errorMessage = 'Invalid card number!'; // Customize the error message
                setCardError({ hasError: true, message: errorMessage });
            } else {
                // Clear card errors if the input is valid
                setCardError({ hasError: false, message: '' });

                // Use the card type information to dynamically display the card image
                const cardImageElement = document.getElementById('cardImage');
                if (cardImageElement) {
                    cardImageElement.src = cardType !== 'unknown'
                        ? `/src/assets/cardtypes/${cardType}.png`
                        : `/src/assets/cardtypes/UnknownCard.png`;
                }

                // Add further validations as needed...
            }
        } else if (name === 'cardHolderName') {
            // Restrict input to letters only
            updatedValue = updatedValue.replace(/[^A-Za-z]/g, '');
        } else {
            // Update other input values
            setPaymentFormData({ ...paymentFormData, [name]: updatedValue });
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

        // Validate expiration date against today's date
        const currentDate = new Date();
        const enteredMonth = parseInt(sanitizedValue.slice(0, 2), 10);
        const enteredYear = parseInt(sanitizedValue.slice(2), 10);
        const enteredDate = new Date(2000 + enteredYear, enteredMonth - 1);

        if (enteredMonth > 0 && enteredMonth <= 12) {
            if (enteredDate > currentDate) {
                setExpirationError('');
            } else {
                setExpirationError('Invalid expiration date. Please enter a future date.');
            }
        } else {
            setExpirationError('Invalid expiration month. Please enter a valid month (1-12).');
        }

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
            currency: 'NPR', // Default currency
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for errors before submitting
        if (cardError.hasError || expirationError || !isFormValid()) {
            console.log('Invalid input. Please fix the errors.');
            return;
        }

        try {
            // Update the payment status to 'success'
            await PaymentService.updatePaymentStatus(selectedPayment.paymentId, 'success');

            // Display success toast
            toast.success('Payment successful!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            console.log('Payment successful!');
            // Add logic to handle successful payment submission
        } catch (error) {
            console.error('Payment failed!', error);

            // Display failure toast
            toast.error('Payment failed!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Add logic to handle payment failure
        } finally {
            // Close the payment form modal
            setShowPaymentForm(false);
            // Reset the payment form data if needed
            setPaymentFormData({
                cardNumber: '',
                expiration: '',
                cvv: '',
                cardHolderName: '',
                amount: '',
                currency: 'NPR', // Default currency
            });
        }
    };


    const isFormValid = () => {
        // Add validation for other fields as needed
        return (
            paymentFormData.cardNumber.trim() !== '' &&
            paymentFormData.expiration.trim() !== '' &&
            paymentFormData.cvv.trim() !== '' &&
            paymentFormData.cardHolderName.trim() !== '' &&
            paymentFormData.amount !== ''
        );
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
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedPayment(payment);
                                            setShowPaymentForm(true);
                                        }}
                                    >
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
                                    <div className="input-with-icon" style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            className={`form-control ${cardError.hasError ? 'is-invalid' : ''}`}
                                            id="cardNumber"
                                            name="cardNumber"
                                            placeholder="Enter card number"
                                            value={paymentFormData.cardNumber}
                                            onChange={handleInputChange}
                                            maxLength="19"
                                            required

                                        />
                                        {cardError.hasError && (
                                            <div className="invalid-feedback">{cardError.message}</div>
                                        )}
                                        <img
                                            id="cardImage"
                                            src={handleCardImageSource()}
                                            alt="Card Type"
                                            className="card-type-icon small-card-icon"
                                            style={{
                                                marginTop: '45px',
                                                position: 'absolute',
                                                top: '50%',
                                                right: '10px', // Adjust the distance from the right edge
                                                transform: 'translateY(-50%)',
                                                maxWidth: '50px', // Adjust the maximum width as needed
                                                height: 'auto', // Maintain aspect ratio
                                            }}
                                        />
                                    </div>
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="formPaymentExpiration">
                                    <Form.Label>Expiration Date (MM/YY)</Form.Label>
                                    <input
                                        type="text"
                                        className={`form-control ${expirationError ? 'is-invalid' : ''}`}
                                        id="expiration"
                                        name="expiration"
                                        placeholder="MM/YY"
                                        value={paymentFormData.expiration}
                                        onChange={handleExpirationChange}
                                        required
                                    />
                                    {expirationError && <div className="invalid-feedback">{expirationError}</div>}
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
                                        readOnly={true}
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
                                        <option value="NPR">NPR</option>
                                        {/* Add more currencies as needed */}
                                    </select>
                                </Form.Group>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={cardError.hasError || !!expirationError || !isFormValid()}
                                >
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
