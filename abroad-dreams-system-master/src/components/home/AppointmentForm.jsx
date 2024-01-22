import React, { useState } from 'react';
import AppointmentService from './../../pages/admin/AppointmentService.js'; // Update the path accordingly

const AppointmentForm = () => {
    const [appointmentData, setAppointmentData] = useState({
        date: '',
        fullName: '',
        email: '',
        mobileNumber: '',
        purpose: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the addAppointment function from the service
            await AppointmentService.addStudentAppointment(appointmentData);
            // Optionally, you can add logic here to handle success
            console.log('Appointment added successfully');
        } catch (error) {
            // Handle errors here
            console.error('Error adding appointment:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Date:</label>
                <input type="date" name="date" value={appointmentData.date} onChange={handleInputChange} required />

                <label>Full Name:</label>
                <input type="text" name="fullName" value={appointmentData.fullName} onChange={handleInputChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={appointmentData.email} onChange={handleInputChange} />

                <label>Mobile Number:</label>
                <input type="tel" name="mobileNumber" value={appointmentData.mobileNumber} onChange={handleInputChange} required />

                <label>Purpose:</label>
                <input type="text" name="purpose" value={appointmentData.purpose} onChange={handleInputChange} required />

                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default AppointmentForm;
