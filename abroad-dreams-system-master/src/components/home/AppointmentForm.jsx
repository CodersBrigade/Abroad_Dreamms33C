import React, { useState } from 'react';
import AppointmentService from './../../pages/admin/AppointmentService.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import AppointmentAnimationComponent from "./AppointmentAnimationComponent.jsx";

const AppointmentForm = () => {
    const [appointmentData, setAppointmentData] = useState({
        date: '',
        fullName: '',
        email: '',
        mobileNumber: '',
        purpose: '',
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Validate date only today or future date
        if (name === 'date') {
            if (new Date(value) < new Date()) {
                toast.error('Please select today or a future date', { position: toast.POSITION.TOP_RIGHT });
                return;
            }
        }

        setAppointmentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate form fields
            if (!appointmentData.date || !appointmentData.fullName || !appointmentData.mobileNumber) {
                // If any of the required fields are empty, show an error toast
                toast.error('Please fill in all required fields', { position: toast.POSITION.TOP_RIGHT });
                return;
            }

            // Call the addAppointment function from the service
            await AppointmentService.addStudentAppointment(appointmentData);

            // Clear the form and show success toast
            setSuccess(true);
            setAppointmentData({
                date: '',
                fullName: '',
                email: '',
                mobileNumber: '',
                purpose: '',
            });

            toast.success('Appointment added successfully', { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            // Handle errors here
            setError('Error adding appointment');
            toast.error('Error adding appointment', { position: toast.POSITION.TOP_RIGHT });
        }
    };


    return (

    // import CalendarAnimation from "./CalendarAnimation.jsx";
    // <div className="col-md-4 d-flex align-items-center justify-content-center">
    //     <CalendarAnimation/>
    // </div>

        <div className="container-fluid">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-4 d-flex align-items-center justify-content-center bg-blurred" style={{ backgroundImage: 'url("your-background-image.jpg")' }}>
                    <AppointmentAnimationComponent />
                </div>
                <div className="col-md-4">
                    <h2 className="text-center mt-4">Book An Appointment</h2>
                    <form onSubmit={handleSubmit} className="my-4">
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date:</label>
                            <input type="date" className="form-control" id="date" name="date" value={appointmentData.date} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">Full Name:</label>
                            <input type="text" className="form-control" id="fullName" name="fullName" value={appointmentData.fullName} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" className="form-control" id="email" name="email" value={appointmentData.email} onChange={handleInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mobileNumber" className="form-label">Mobile Number:</label>
                            <input type="tel" className="form-control" id="mobileNumber" name="mobileNumber" value={appointmentData.mobileNumber} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="purpose" className="form-label">Purpose:</label>
                            <input type="text" className="form-control" id="purpose" name="purpose" value={appointmentData.purpose} onChange={handleInputChange} required />
                        </div>

                        <button type="submit" className="btn btn-success w-100">Book Appointment</button>
                    </form>
                </div>

            </div>
            <ToastContainer />
        </div>
    );
};

export default AppointmentForm;
