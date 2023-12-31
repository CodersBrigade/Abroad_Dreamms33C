// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";

// Create the Instructors component
export default function Instructor() {
    // State variables
    const [instructors, setInstructors] = useState([]);
    const [editInstructorId, setEditInstructorId] = useState(null);
    const [showForm, setShowForm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            fetchInstructors();
        } else {
            fetchInstructorById(searchQuery);
        }
    };

    const handleClose = () => setShowForm('');

    const [instructorData, setInstructorData] = useState({
        name: "",
        address: "",
        mobileNo: "",
        qualifications: "",
        uploadFile: "",
    });

    const [editInstructorData, setEditInstructorData] = useState({
        name: "",
        address: "",
        mobileNo: "",
        qualifications: "",
        uploadFile: "",
    });

    const handleShow = (formType, instructorId = null) => {
        setShowForm(formType);
        setEditInstructorId(instructorId);

        if (!instructorId) {
            setInstructorData({
                name: "",
                address: "",
                mobileNo: "",
                qualifications: "",
                uploadFile: "",
            });
        }
    };

    const handleSaveInstructor = () => {
        axios
            .post('http://localhost:8080/instructor/save', instructorData)
            .then((response) => {
                console.log('Instructor saved successfully:', response.data);
                handleClose();
                fetchInstructors();
            })
            .catch((error) => {
                console.error('Error saving Instructor:', error);
            });
    };

    const fetchInstructors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/instructor/getAll');
            console.log('Fetched Instructors:', response.data);
            setInstructors(response.data);
        } catch (error) {
            console.error('Error fetching Instructors:', error);
        }
    };

    const fetchInstructorById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/instructor/getById/${id}`);
            console.log('Fetched Instructor by ID:', response.data);
            setInstructors([response.data]);
        } catch (error) {
            console.error('Error fetching Instructor by ID:', error);
        }
    };

    const handleRemoveInstructor = (instructorId) => {
        if (instructorId === undefined) {
            console.error("Invalid ID: ID is undefined");
            return;
        }
        axios
            .delete(`http://localhost:8080/instructor/delete/${instructorId}`)
            .then((response) => {
                console.log(`Instructor with ID ${instructorId} removed successfully`);
                fetchInstructors();
            })
            .catch((error) => {
                console.error(`Error removing Instructor with ID ${instructorId}:`, error);
            });
    };

    const handleUpdateInstructor = () => {
        axios
            .put(`http://localhost:8080/instructor/update/${editInstructorId}`, editInstructorData)
            .then((response) => {
                console.log('Instructor updated successfully:', response.data);
                handleClose();
                fetchInstructors();
            })
            .catch((error) => {
                console.error('Error updating Instructor:', error);
            });
    };

    const handleEditInstructor = (instructorId) => {
        const instructorToEdit = instructors.find((instructor) => instructor.instructorId === instructorId);

        setEditInstructorData({
            name: instructorToEdit.name,
            address: instructorToEdit.address,
            mobileNo: instructorToEdit.mobileNo,
            qualifications: instructorToEdit.qualifications,
            uploadFile: instructorToEdit.uploadFile,
        });

        handleShow('editInstructor', instructorId);
    };

    useEffect(() => {
        fetchInstructors();
    }, []);

    return (
        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />

            <Container fluid className="flex-grow-1">
                <div className="wrapper">
                    <div className="d-flex align-items-center mb-3">
                        <button className="btn btn-dark mr-2 m-1" onClick={() => { handleShow("addInstructor") }}>Add New Instructor +</button>
                        <input
                            type="text"
                            className="form-control mr-2"
                            placeholder="Search by ID"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>

                    {Array.isArray(instructors) && instructors.map((instructor) => (
                        <div className="item" key={instructor.instructorId}>
                            {<strong>ID: {instructor.instructorId}</strong>} {instructor.name}{" -- "}{instructor.mobileNo}
                            <div>
                                <button className="btn btn-danger m-1" onClick={() => handleEditInstructor(instructor.instructorId)}>View Details/Edit</button>
                                <button className="btn btn-success m-1" onClick={() => handleRemoveInstructor(instructor.instructorId)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    <Modal
                        show={Boolean(showForm)}
                        onHide={handleClose}
                        animation={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >

                        {showForm === 'editInstructor' && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Edit Instructor
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Form fields for editing Instructor */}
                                        <Form.Group className="mb-3" controlId="formEditInstructorName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Name"
                                                value={editInstructorData.name}
                                                onChange={(e) => setEditInstructorData({ ...editInstructorData, name: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditInstructorAddress">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Address"
                                                value={editInstructorData.address}
                                                onChange={(e) => setEditInstructorData({ ...editInstructorData, address: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditInstructorMobileNo">
                                            <Form.Label>Mobile No</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Mobile No"
                                                value={editInstructorData.mobileNo}
                                                onChange={(e) => setEditInstructorData({ ...editInstructorData, mobileNo: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditInstructorQualifications">
                                            <Form.Label>Qualifications</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Qualifications"
                                                value={editInstructorData.qualifications}
                                                onChange={(e) => setEditInstructorData({ ...editInstructorData, qualifications: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditInstructorUploadFile">
                                            <Form.Label>Upload File</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Upload File"
                                                value={editInstructorData.uploadFile}
                                                onChange={(e) => setEditInstructorData({ ...editInstructorData, uploadFile: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                            </>
                        )}

                        {showForm === 'addInstructor' && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Add Instructor
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Form fields for adding a new Instructor */}
                                        <Form.Group className="mb-3" controlId="formInstructorName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Name"
                                                value={instructorData.name}
                                                onChange={(e) => setInstructorData({ ...instructorData, name: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formInstructorAddress">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Address"
                                                value={instructorData.address}
                                                onChange={(e) => setInstructorData({ ...instructorData, address: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formInstructorMobileNo">
                                            <Form.Label>Mobile No</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Mobile No"
                                                value={instructorData.mobileNo}
                                                onChange={(e) => setInstructorData({ ...instructorData, mobileNo: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formInstructorQualifications">
                                            <Form.Label>Qualifications</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Qualifications"
                                                value={instructorData.qualifications}
                                                onChange={(e) => setInstructorData({ ...instructorData, qualifications: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formInstructorUploadFile">
                                            <Form.Label>Upload File</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Upload File"
                                                value={instructorData.uploadFile}
                                                onChange={(e) => setInstructorData({ ...instructorData, uploadFile: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                            </>
                        )}

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            {showForm === 'addInstructor' && <Button variant="primary" onClick={handleSaveInstructor}>Add Instructor</Button>}
                            {showForm === 'editInstructor' && <Button variant="primary" onClick={handleUpdateInstructor}>Update Instructor</Button>}
                        </Modal.Footer>
                    </Modal>

                </div>
            </Container>
        </div>
    );
}
