import React, { useEffect, useState } from "react";
import StudentSidebar from "./StudentSidebar";
import Container from "react-bootstrap/Container";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";
import Header from "../../../components/Header.jsx";
import { Button, FormControl, InputGroup, Modal, Form } from "react-bootstrap";
import axios from "axios";

const StudentInstitution = () => {
    const [institutions, setInstitutions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewDetailsModal, setViewDetailsModal] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState({});

    const handleViewInstitutionDetails = async (institutionId) => {
        try {
            const response = await axios.get(`http://localhost:8080/institution/getById/${institutionId}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
            });

            if (response.data) {
                const institutionDetails = response.data;
                setSelectedInstitution(institutionDetails);
                setViewDetailsModal(true);
            } else {
                console.error("Institution not found");
            }
        } catch (error) {
            console.error("Error fetching institution details:", error);
        }
    };

    const fetchInstitutions = async () => {
        try {
            const response = await axios.get("http://localhost:8080/institution/getAll", {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
            });
            console.log("Fetched Institutions:", response.data);
            setInstitutions(response.data);
        } catch (error) {
            console.error("Error fetching institutions:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            fetchInstitutions();
        } else {
            fetchInstitutionById(searchQuery);
        }
    };

    const fetchInstitutionById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/institution/getById/${id}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
            });

            if (response.data) {
                const institutionDetails = response.data;
                setSelectedInstitution(institutionDetails);
                // Filter the institutions list to only include the searched institution
                setInstitutions([institutionDetails]);
            } else {
                console.error("Institution not found");
                // Optionally, you can set the institutions list to an empty array or handle it differently
                setInstitutions([]);
            }
        } catch (error) {
            console.error("Error fetching institution by ID:", error);
            // Handle the error, show a message, etc.
            setInstitutions([]); // Set the institutions list to an empty array
        }
    };

    const handleCloseViewDetailsModal = () => {
        setViewDetailsModal(false);
    };

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            fetchInstitutions();
        }
    }, [localStorage.getItem("userId")]);

    return (
        <div>
            <Header />
            <div className="d-flex">
                <StudentSidebar />
                <Container fluid className="flex-grow-1">
                    <StudentProfileBar />
                    <div className="wrapper">
                        <div className="search-bar mb-3">
                            <InputGroup>
                                <FormControl type="text" placeholder="Search by ID" value={searchQuery} onChange={handleSearchChange} />
                                <Button variant="primary" onClick={handleSearch}>
                                    Search
                                </Button>
                            </InputGroup>
                        </div>

                        <div className="institution-list">
                            {Array.isArray(institutions) &&
                                institutions.map((institution) => (
                                    <div className="item" key={institution.institutionId}>
                                        <strong>ID: {institution.institutionId}</strong> {institution.institutionName} -- {institution.address}, {institution.country}
                                        <Button
                                            variant="success"
                                            onClick={() => handleViewInstitutionDetails(institution.institutionId)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </Container>

                {/* Modal for viewing complete institution details */}
                <Modal show={viewDetailsModal} onHide={handleCloseViewDetailsModal} animation={false} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Complete Institution Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formInstitutionName">
                                <Form.Label>Institution Name:</Form.Label>
                                <Form.Control type="text" value={selectedInstitution.institutionName} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formAddress">
                                <Form.Label>Address:</Form.Label>
                                <Form.Control type="text" value={selectedInstitution.address} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCountry">
                                <Form.Label>Country:</Form.Label>
                                <Form.Control type="text" value={selectedInstitution.country} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formOfficialWebsite">
                                <Form.Label>Official Website:</Form.Label>
                                <Form.Control type="text" value={selectedInstitution.officialWebsite} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control type="text" value={selectedInstitution.description} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCoursesTypes">
                                <Form.Label>Courses Types:</Form.Label>
                                <Form.Control type="text" value={selectedInstitution.coursesTypes} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSpecialInformation">
                                <Form.Label>Special Information:</Form.Label>
                                <Form.Control type="text" value={selectedInstitution.specialInformation} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formRulesAndRegulations">
                                <Form.Label>Rules and Regulations:</Form.Label>
                                <Form.Control text="textarea" value={selectedInstitution.rulesAndRegulations} readOnly />
                            </Form.Group>
                            {/* Add more fields as needed */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseViewDetailsModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default StudentInstitution;
