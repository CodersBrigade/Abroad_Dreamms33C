import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';

import forgotPasswordImage from '../../assets/images/forgotpassword.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const registeredEmails = ['student@gmail.com', 'admin@gmail.com', 'user3@example.com'];

    const handleSendEmail = (e) => {
        e.preventDefault();

        if (registeredEmails.includes(email)) {
            console.log('Sending reset password email to:', email);
            navigate('/reset-password');
        } else {
            setError('Invalid Email Address.');
        }
    };

    return (
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
    );
};

export default ForgotPassword;
