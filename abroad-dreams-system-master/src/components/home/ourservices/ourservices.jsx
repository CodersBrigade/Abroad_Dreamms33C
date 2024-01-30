import React from "react";
import Footer from "../footer/Footer.jsx";

const Ourservices = () => {
    return (
        <div style={{background: '#198754', padding: '20px', color: 'white', textAlign: 'center'}}>
            <h2>Our Services</h2>
            <ul style={{
                listStyleType: 'disc',
                paddingLeft: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px'
            }}>
                <li>Admissions Assistance</li>
                <li>Scholarship Guidance</li>
                <li>Visa Support</li>
                <li>Test Preparation</li>
                <li>Career Counseling</li>
                <li>Document Evaluation</li>
            </ul>
        </div>
    );
};

export default Ourservices;
