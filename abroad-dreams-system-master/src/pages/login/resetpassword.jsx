import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import resetPasswordImage from '../../assets/images/resetpassword.png';

const CreateNewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        navigate('/login');
    };

    return (
        <div className="container" style={{ marginTop: '40px', textAlign: 'center' }}>
            <div className="row justify-content-center align-items-center">
                <div className="col-md-5">
                    <img src={resetPasswordImage} alt="Reset Password" style={{ maxWidth: '100%' }} />
                </div>
                <form className="col-md-4" onSubmit={handleResetPassword}>
                    <h1 className="text-center mb-4">Create New Password</h1>
                    <p className="text-muted mb-4">
                        <span style={{ fontWeight: 'bold', color: 'black' }}>New password must have:</span>
                        <br />
                        - <span style={{ color: 'black' }}>Six alphabets with two capital</span>
                        <br />
                        - <span style={{ color: 'black' }}>Use any special characters</span>
                        <br />
                        - <span style={{ color: 'black' }}>At least 1 number</span>
                    </p>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="form-label text-start">
                            <span style={{ fontWeight: 'bold'}}>New Password</span>
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label text-start">
                            <span style={{ fontWeight: 'bold'}}>Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default CreateNewPassword;
