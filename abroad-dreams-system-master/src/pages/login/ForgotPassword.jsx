import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import forgotPasswordImage from '../../assets/images/forgotpassword.png';
import Header from "../../components/Header.jsx";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(''); // Add this line
    const navigate = useNavigate();

    const showToast = (type, message) => {
        toast[type](message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/recover/reset-password', {
                sendToEmail: email, // Send the email in the correct format
            });

            if (response.status === 403) {
                showToast('success', 'Email sent successfully');
                navigate('/login');

            } else {

                showToast('error', 'Failed to send email');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            // setError('Failed to send email. Please try again.');
            showToast('success', 'Email Sent Successful!');
            navigate('/login');
        }
    };

    return (
        <div>
            <Header />
            <div className="container" style={{ marginTop: '40px', textAlign: 'center' }}>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-5">
                        <img src={forgotPasswordImage} alt="Forgot Password" style={{ maxWidth: '100%' }} />
                    </div>
                    <form className="col-md-4" onSubmit={handleSendEmail}>
                    <h1 className="text-center mb-4">
                        <FaEnvelope style={{ marginRight: '10px' }} />
                        Forgot Password?
                    </h1>
                    <p className="text-center mb-4">
                        <AiOutlineLock style={{ marginRight: '10px' }} />
                        Please enter your email address to receive a verification code
                    </p>
                    <div className="mb-4">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaEnvelope style={{ color: 'black' }} />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'green' }}>
                        Send Email
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default ForgotPassword;
