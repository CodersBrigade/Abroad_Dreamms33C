import React from "react";
import { Container } from "react-bootstrap";

const Ourservices = () => {
    return (
        <div style={{ background: '#198754', padding: '20px', color: 'white' }}>
            <Container className="text-center">
                {/*<h2>Our Services</h2>*/}
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
            </Container>
        </div>
    );
};

export default Ourservices;
