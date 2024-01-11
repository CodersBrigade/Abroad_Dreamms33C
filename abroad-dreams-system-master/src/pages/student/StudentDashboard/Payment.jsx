import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import StudentSidebar from './StudentSidebar.jsx';
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";
import './Payment.css';


export default function Payment() {
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expirationMonth: '',
        expirationYear: '',
        cvv: '',
        cardHolderName: '',
        amount: '',
        currency: 'USD', // Default currency
    });

    const formatCardNumber = (value) => {
        const trimmedValue = value.replace(/\s+/g, ''); // Remove existing spaces
        const regex = /\d{1,4}/g;
        const parts = trimmedValue.match(regex);

        if (parts) {
            return parts.join(' ');
        }

        return trimmedValue;
    };

// ...

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

        setPaymentInfo({ ...paymentInfo, [name]: updatedValue });
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

        setPaymentInfo({
            ...paymentInfo,
            expirationMonth: formattedValue.slice(0, 2),
            expirationYear: formattedValue.slice(3), // Adjust the slice to get the year
        });

        // Update the input value
        event.target.value = formattedValue;
    };
    const handleFocus = (event) => {
        const { value } = event.target;
        const slashPosition = value.indexOf('/');
        if (slashPosition !== -1) {
            event.target.setSelectionRange(slashPosition + 1, slashPosition + 1);
        }
    };
    const handleCVVChange = (event) => {
        const { value } = event.target;
        if (/^\d{0,4}$/.test(value)) { // Adjust regex to match the desired CVV length
            setPaymentInfo({ ...paymentInfo, cvv: value });
        }
    };

    const handleCurrencyChange = (event) => {
        const { value } = event.target;
        setPaymentInfo({ ...paymentInfo, currency: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('your_payment_api_endpoint', paymentInfo);
            console.log('Payment successful!', response.data);
        } catch (error) {
            console.error('Payment failed!', error);
        }
    };

    return (
        <div className="d-flex">
            <StudentSidebar />
            <Container fluid className="flex-grow-1">
                <StudentProfileBar />
                <div className="wrapper">
                    <div className="payment-form">
                        <h2>Payment Information</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <div className="input-with-icon">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cardNumber"
                                        name="cardNumber"
                                        placeholder="Enter card number"
                                        value={paymentInfo.cardNumber}
                                        onChange={handleInputChange}
                                        required={"Please Enter a value"}
                                    />
                                    <img id="cardImage" src="" alt="Card Type" className="card-type-icon small-card-icon" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="expiration">Expiration Date (MM/YY)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="expiration"
                                    name="expiration"
                                    placeholder="MM/YY"
                                    value={paymentInfo.expirationMonth ? `${paymentInfo.expirationMonth}/${paymentInfo.expirationYear}` : ''}
                                    onChange={handleExpirationChange}
                                    onFocus={handleFocus}
                                    required={"Please Enter a value"}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cvv"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={paymentInfo.cvv}
                                    onChange={handleCVVChange}
                                    maxLength="4" // Adjust based on the maximum CVV length expected
                                    required={"Please Enter a value"}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cardHolderName">Cardholder's Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardHolderName"
                                    name="cardHolderName"
                                    placeholder="Cardholder's name"
                                    value={paymentInfo.cardHolderName}
                                    onChange={handleInputChange}
                                    required={"Please Enter a value"}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    name="amount"
                                    placeholder="Enter amount"
                                    value={paymentInfo.amount}
                                    onChange={handleInputChange}
                                    required={"Please Enter a value"}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="currency">Currency</label>
                                <select
                                    className="form-control"
                                    id="currency"
                                    name="currency"
                                    value={paymentInfo.currency}
                                    onChange={handleCurrencyChange}
                                >
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                    <option value="NRS">NRS</option>
                                    {/* Add more currencies as needed */}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Submit Payment
                            </button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
}
