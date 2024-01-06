import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";

export default function Institution() {

    const [institutions, setInstitutions] = useState([]);
    const [editInstitutionId, setEditInstitutionId] = useState(null);

    const [showForm, setShowForm] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [searchByCountryQuery, setSearchByCountryQuery] = useState('');


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '' && searchByCountryQuery.trim() === '') {
            // If both search inputs are empty, fetch all institutions
            fetchInstitutions();
        } else if (searchByCountryQuery.trim() !== '') {
            // If it's a country search, fetch institutions by country
            // setIsCountrySearch(true);
            fetchInstitutionsByCountry();
        } else {
            // Fetch institutions based on the search query
            // setIsCountrySearch(false);
            fetchInstitutionById(searchQuery);
        }
    };


    const handleClose = () => setShowForm('');

    const [institutionData, setInstitutionData] = useState({
        institutionName: "",
        address: "",
        country: "",
        officialWebsite: "",
        description: "",
        coursesTypes: "",
        specialInformation: "",
        rulesAndRegulation: "",
    });

    const [editInstitutionData, setEditInstitutionData] = useState({
        institutionName: "",
        address: "",
        country: "",
        officialWebsite: "",
        description: "",
        coursesTypes: "",
        specialInformation: "",
        rulesAndRegulation: "",
    });

    const handleShow = (formType, institutionId = null) => {
        setShowForm(formType);
        setEditInstitutionId(institutionId);

        // Reset the form data if you are adding a new institution
        if (!institutionId) {
            setInstitutionData({
                institutionName: "",
                address: "",
                country: "",
                officialWebsite: "",
                description: "",
                coursesTypes: "",
                specialInformation: "",
                rulesAndRegulation: "",
            });
        }
    };

    const handleSaveInstitution = () => {
        axios
            .post('http://localhost:8080/institution/save', institutionData,
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}})
            .then((response) => {
                console.log('Institution saved successfully:', response.data);
                handleClose();
                fetchInstitutions();
            })
            .catch((error) => {
                console.error('Error saving institution:', error);
                // Handle the error, show a message, etc.
            });
    };

    // Function to fetch institution data
    const fetchInstitutions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/institution/getAll',
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            console.log('Fetched institutions:', response.data);
            setInstitutions(response.data);

            setTotalInstitutions(response.data.length);

        } catch (error) {
            console.error('Error fetching institutions:', error);
            // Handle the error, show a message, etc.
        }
    };// Empty dependency array ensures the effect runs only once when the component mounts

    const fetchInstitutionById = async (institutionId) => {
        try {
            const response = await axios.get(`http://localhost:8080/institution/getById/${institutionId}`,
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            console.log('Fetched institution by ID:', response.data);

            // Update the state with the fetched institution
            setInstitutions(response.data);

            // Set total institutions based on the fetched data
            setTotalInstitutions(response.data.length);

        } catch (error) {
            console.error(`Error fetching institution by ID ${institutionId}:`, error);
            // Handle the error, show a message, etc.
            setInstitutions([]); // Clear institutions if an error occurs
        }
    };

    const fetchInstitutionsByCountry = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/institution/getByCountry/${searchByCountryQuery}`,
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            console.log('Fetched institutions by country:', response.data);
            if (response.data.length > 0) {
                setInstitutions(response.data);
                setSearchResultMessage('');
            } else {
                setInstitutions([]);
                setSearchResultMessage('No results found for the given search query.');
            }

        } catch (error) {
            console.error('Error fetching institutions by country:', error);
            // Handle the error, show a message, etc.
        }
    };


    const handleRemoveInstitution = (institutionId) => {

        // Check if id is undefined before making the API call
        if (institutionId === undefined) {
            console.error("Invalid ID: ID is undefined");
            return;
        }
        axios
            .delete(`http://localhost:8080/institution/delete/${institutionId}`,
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}})
            .then((response) => {
                console.log(`Institution with ID ${institutionId} removed successfully`);
                // Fetch the updated list of institutions after removal
                fetchInstitutions();
            })
            .catch((error) => {
                console.error(`Error removing institution with ID ${institutionId}:`, error);
                // Handle the error, show a message, etc.
            });
    };

    const handleUpdateInstitution = () => {
        axios
            .put(`http://localhost:8080/institution/update/${editInstitutionId}`, editInstitutionData,
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}})
            .then((response) => {
                console.log('Institution updated successfully:', response.data);
                handleClose();
                fetchInstitutions(); // Fetch the updated list of institutions
            })
            .catch((error) => {
                console.error('Error updating institution:', error);
                // Handle the error, show a message, etc.
            });
    };
    const handleEditInstitution = (institutionId) => {

        // Find the institution to edit from the list
        const institutionToEdit = institutions.find((institution) => institution.institutionId === institutionId);

        // Set the data for editing
        setEditInstitutionData({
            institutionName: institutionToEdit.institutionName,
            address: institutionToEdit.address,
            country: institutionToEdit.country, //
            officialWebsite: institutionToEdit.officialWebsite,
            description: institutionToEdit.description, //
            coursesTypes: institutionToEdit.coursesTypes, //
            specialInformation: institutionToEdit.specialInformation, //
            rulesAndRegulation: institutionToEdit.rulesAndRegulation, //
        });

        // Show the edit institution form/modal
        handleShow('editInstitution', institutionId);
    };

    useEffect(() => {
        fetchInstitutions();
    }, []);




    return (
        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />

            <Container fluid className="flex-grow-1">
                <div className="wrapper">
                    {/* Search bar and buttons */}
                    <div className="d-flex align-items-center mb-3">
                        <button className="btn btn-dark mr-2 m-1" onClick={() => { handleShow("institution") }}>Add New Institution +</button>
                        {/* Search input for country */}
                        <input
                            type="text"
                            className="form-control mr-2"
                            placeholder="Search by Country"
                            value={searchByCountryQuery}
                            onChange={(e) => setSearchByCountryQuery(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>

                    {/* Institution items */}
                    {Array.isArray(institutions) && institutions.map((doc) => (
                        <div className="item" key={doc.institutionId}>
                            {/* Display institution details */}
                            {<strong>ID: {doc.institutionId}</strong>} {doc.institutionName}{" -- "}{doc.address}{", "}{doc.country}
                            <div>
                                {/* Buttons for editing and removing institutions */}
                                <button className="btn btn-danger m-1" onClick={() => handleEditInstitution(doc.institutionId)}>View Details/Edit</button>
                                <button className="btn btn-success m-1" onClick={() => handleRemoveInstitution(doc.institutionId)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    {/* Modal for adding/editing institutions */}
                    <Modal
                        show={Boolean(showForm)}
                        onHide={handleClose}
                        animation={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >

            {showForm === 'editInstitution' && (
                <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Institution
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formEditInstitutionName">
                                <Form.Label>Institution Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Institution Name"
                                    value={editInstitutionData.institutionName}
                                    onChange={(e) =>
                                        setEditInstitutionData({
                                            ...editInstitutionData,
                                            institutionName: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEditAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Address"
                                    value={editInstitutionData.address}
                                    onChange={(e) =>
                                        setEditInstitutionData({
                                            ...editInstitutionData,
                                            address: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEditCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Country"
                                    value={editInstitutionData.country}
                                    onChange={(e) =>
                                        setEditInstitutionData({
                                            ...editInstitutionData,
                                            country: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEditOfficialWebsite">
                                <Form.Label>Official Website</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Official Website"
                                    value={editInstitutionData.officialWebsite}
                                    onChange={(e) =>
                                        setEditInstitutionData({
                                            ...editInstitutionData,
                                            officialWebsite: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEditDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Short Description"
                                    value={editInstitutionData.description}
                                    onChange={(e) =>
                                        setEditInstitutionData({
                                            ...editInstitutionData,
                                            description: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEditCoursesTypes">
                                <Form.Label>Courses Types</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="BSc, MSc, Diploma, Language etc."
                                    value={editInstitutionData.coursesTypes}
                                    onChange={(e) =>
                                        setEditInstitutionData({
                                            ...editInstitutionData,
                                            coursesTypes: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEditSpecialInformation">
                                <Form.Label>Special Information</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Special Information (Optional)"
                                    value={editInstitutionData.specialInformation}
                                    onChange={(e) =>
                                        setEditInstitutionData({
                                            ...editInstitutionData,
                                            specialInformation: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEditRulesAndRegulation">
                                <Form.Label>Rules & Regulations</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Rules & Regulations"
                                    value={editInstitutionData.rulesAndRegulation}
                                    onChange={(e) =>
                                        setEditInstitutionData({
                                            ...editInstitutionData,
                                            rulesAndRegulation: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/*<Button variant="secondary" onClick={handleClose}>Cancel</Button>*/}
                        {showForm === 'editInstitution' && <Button variant="success" onClick={handleUpdateInstitution}>Update Institution</Button>}
                    </Modal.Footer>
                </>
            )}


            {showForm === 'institution' ?
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
                                    onChange={(e) => setInstitutionData({ ...institutionData, institutionName: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    placeholder="Enter Address"
                                    value={institutionData.address}
                                    onChange={(e) => setInstitutionData({ ...institutionData, address: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    placeholder="Enter Country"
                                    value={institutionData.country}
                                    onChange={(e) => setInstitutionData({ ...institutionData, country: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Official Website</Form.Label>
                                <Form.Control
                                    placeholder="Enter Official Website"
                                    value={institutionData.officialWebsite}
                                    onChange={(e) => setInstitutionData({ ...institutionData, officialWebsite: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    placeholder="Short Description"
                                    value={institutionData.description}
                                    onChange={(e) => setInstitutionData({ ...institutionData, description: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Courses Types</Form.Label>
                                <Form.Control
                                    placeholder="BSc, MSc, Diploma, Language etc."
                                    value={institutionData.coursesTypes}
                                    onChange={(e) => setInstitutionData({ ...institutionData, coursesTypes: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Special Information</Form.Label>
                                <Form.Control
                                    placeholder="Special Information (Optional)"
                                    value={institutionData.specialInformation}
                                    onChange={(e) => setInstitutionData({ ...institutionData, specialInformation: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Rules & Regulations</Form.Label>
                                <Form.Control
                                    placeholder="Rules & Regulations"
                                    value={institutionData.rulesAndRegulation}
                                    onChange={(e) => setInstitutionData({ ...institutionData, rulesAndRegulation: e.target.value })}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                        </> : null
            }
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                {showForm === 'institution' && <Button variant="success" onClick={handleSaveInstitution}>Add Institution</Button>}
            </Modal.Footer>
        </Modal>

        </div>
            </Container>
        </div>

    );

}
