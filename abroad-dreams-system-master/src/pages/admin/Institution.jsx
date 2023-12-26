// Institution.jsx

import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';


const Institution = ({
                         showForm,
                         handleClose,
                         handleSaveInstitution,
                         institutionData,
                         setInstitutionData,
                     }) => {
    return (
        <Modal
            show={Boolean(showForm)}
            onHide={handleClose}
            animation={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {showForm === 'institution' && (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Institution
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Institution Name</Form.Label>
                                <Form.Control
                                    placeholder="Enter Institution Name"
                                    value={institutionData.institutionName}
                                    onChange={(e) =>
                                        setInstitutionData({
                                            ...institutionData,
                                            institutionName: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            {/* ... Other form fields for institution data ... */}

                            <Button variant="primary" onClick={handleSaveInstitution}>
                                Add Institution
                            </Button>
                        </Form>
                    </Modal.Body>
                </>
            )}
            {/* ... Add other cases for different forms if needed ... */}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                {showForm === 'institution' && (
                    <Button variant="primary" onClick={handleSaveInstitution}>
                        Add Institution
                    </Button>
                )}
                {/* ... Add other cases for different form buttons if needed ... */}
            </Modal.Footer>
        </Modal>
    );
};

export default Institution;
