import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const SuccessNotification = ({ show, onClose }) => {
    return (
        <Alert show={show} variant="success" onClose={onClose} dismissible>
            <Alert.Heading>Success!</Alert.Heading>
            <p>Your operation was successful.</p>
        </Alert>
    );
};

export default SuccessNotification;
