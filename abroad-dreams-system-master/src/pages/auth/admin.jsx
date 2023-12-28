// Part 1: Import Statements and Initial State
import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../Dashboard.css';
import { Nav } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import AdminSidebar from "../../components/AdminSidebar.jsx";







export default function Admin() {

    const [institutions, setInstitutions] = useState([]);
    const [editInstitutionId, setEditInstitutionId] = useState(null);
    const [editInstructorId, setEditInstructorId] = useState(null);
    const [totalInstitutions, setTotalInstitutions] = useState(0);

    const [instructors, setInstructors] = useState([]);
    const [totalInstructors, setTotalInstructors] = useState(0);


    const [courses, setCourses] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);

    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);


    // const [loggedIn, setLoggedIn] = useState(true); // Track login status
    const [showForm, setShowForm] = useState(''); // Using a string to represent the type of form



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

    const [courseData, setCourseData] = useState({
        courseName: "",
        durationYears: "",
        availability: "",
        credits: "",
        courseFee: "",
    });

    const [studentData, setStudentData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        mobileNumber: '',
        profileStatus: false,
    });

    const handleShow = (formType, institutionId = null, instructorId = null) => {
        setShowForm(formType);
        setEditInstitutionId(institutionId);
        setEditInstructorId(instructorId);

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

        // Reset the form data if you are adding a new instructor
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
                console.error('Error saving instructor:', error);
                // Handle the error, show a message, etc.
            });
    };

    const handleRemoveInstructor = (instructorId) => {
        // Check if id is undefined before making the API call
        if (instructorId === undefined) {
            console.error("Invalid ID: ID is undefined");
            return;
        }
        axios
            .delete(`http://localhost:8080/instructor/delete/${instructorId}`)
            .then((response) => {
                console.log(`Instructor with ID ${instructorId} removed successfully`);
                // Fetch the updated list of instructors after removal
                fetchInstructors();
            })
            .catch((error) => {
                console.error(`Error removing instructor with ID ${instructorId}:`, error);
                // Handle the error, show a message, etc.
            });
    };

    const handleUpdateInstructor = () => {
        console.log({editInstructorId});
        axios
            .put(`http://localhost:8080/instructor/update/${editInstructorId}`, editInstructorData)
            .then((response) => {
                console.log('Instructor updated successfully:', response.data);
                handleClose();
                fetchInstructors(); // Fetch the updated list of instructors
            })
            .catch((error) => {
                console.error('Error updating instructor:', error);
                // Handle the error, show a message, etc.
            });
    };

    const handleEditInstructor = (instructorId) => {
        // Find the instructor to edit from the list
        const instructorToEdit = instructors.find((instructor) => instructor.instructorId === instructorId);

        // Set the data for editing
        setEditInstructorData({
            name: instructorToEdit.name,
            address: instructorToEdit.address,
            mobileNo: instructorToEdit.mobileNo,
            qualifications: instructorToEdit.qualifications,
            uploadFile: instructorToEdit.uploadFile,
        });

        // Show the edit instructor form/modal
        handleShow('editInstructor', instructorId);

        // console.log({instructorId});
    };

    const fetchInstructors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/instructor/getAll');
            console.log('Fetched instructors:', response.data);
            setInstructors(response.data);
            setTotalInstructors(response.data.length);

        } catch (error) {
            console.error('Error fetching instructors:', error);
            // Handle the error, show a message, etc.
        }
    };




    const handleSaveCourse = () => {
        axios
            .post('http://localhost:8080/course/save', courseData)
            .then((response) => {
                console.log('Course saved successfully:', response.data);
                handleClose(); // Close the modal upon success
                fetchCourses();
                // Optionally, update the local state or perform other actions
            })
            .catch((error) => {
                console.error('Error saving course:', error);
                // Handle the error, show a message, etc.
            });
    };

    const handleSaveStudent = () => {
        axios
            .post('http://localhost:8080/students/save', studentData)
            .then((response) => {
                console.log('Student saved successfully:', response.data);
                handleClose();
                fetchStudents();
            })
            .catch((error) => {
                console.error('Error saving student:', error);
            });
    };

    const handleSaveInstitution = () => {
        axios
            .post('http://localhost:8080/institution/save', institutionData)
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
            const response = await axios.get('http://localhost:8080/institution/getAll');
            console.log('Fetched institutions:', response.data);
            setInstitutions(response.data);

            setTotalInstitutions(response.data.length);

        } catch (error) {
            console.error('Error fetching institutions:', error);
            // Handle the error, show a message, etc.
        }
    };// Empty dependency array ensures the effect runs only once when the component mounts

    const handleRemoveInstitution = (institutionId) => {

        // Check if id is undefined before making the API call
        if (institutionId === undefined) {
            console.error("Invalid ID: ID is undefined");
            return;
        }
        axios
            .delete(`http://localhost:8080/institution/delete/${institutionId}`)
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
            .put(`http://localhost:8080/institution/update/${editInstitutionId}`, editInstitutionData)
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

    // Function to fetch course data
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/course/getAll');
            setCourses(response.data);
            setTotalCourses(response.data.length);

        } catch (error) {
            console.error('Error fetching courses:', error);
            // Handle the error, show a message, etc.
        }
    };

    // Function to fetch student data
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/students/getAll');
            setStudents(response.data);
            setTotalStudents(response.data.length);

        } catch (error) {
            console.error('Error fetching students:', error);
            // Handle the error, show a message, etc.
        }
    };

    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetchInstitutions();
        fetchCourses();
        fetchStudents();
        fetchInstructors();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts


    // useEffect(() => {
    //     if (showForm === 'institutions') {
    //         fetchInstitutions();
    //     }
    // }, [showForm]);


    // Logout functionality
    const handleLogout = () => {
        window.location.href = '/login/admin';


    };

    return (

        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />



        <Container fluid className="flex-grow-1">



            <Nav className="justify-content-end">
                <Nav.Item>
                    <Nav.Link eventKey="logout" onClick={handleLogout}>
                        Logout
                    </Nav.Link>
                </Nav.Item>

            </Nav>

            <h5>
                Welcome back <strong>Administrator</strong>
            </h5>
            <div className="info-wrapper">
                <div className="info-box">
                    <p>Total Institutions</p>
                    <strong>{totalInstitutions}</strong>
                </div>
                <div className="info-box">
                    <p>Total Courses</p>
                    <strong>{totalCourses}</strong>
                </div>
                <div className="info-box">
                    <p>Total Students</p>
                    <strong>{totalStudents}</strong>
                </div>
                <div className="info-box">
                    <p>Total Instructors</p>
                    <strong>{totalInstructors}</strong>
                </div>
            </div>

            <br />
            <Tabs defaultActiveKey="institutions" className="mb-3" >
                <Tab tabClassName="tab" eventKey="institutions" title="Institutions">
                    <div className="wrapper">
                        <button className="btn btn-dark" onClick={() => { handleShow("institution") }} >Add New Institution +</button>
                        {institutions.map((doc) => (
                            <div className="item" key={doc.institutionId}>
                                {<strong>ID: {doc.institutionId}</strong>} {doc.institutionName}{" -- "}{doc.address}{", "}{doc.country}
                                <div>
                                    <button className="btn btn-danger m-1" onClick={() => handleEditInstitution(doc.institutionId)}>View Details/Edit</button>
                                    <button className="btn btn-success m-1" onClick={() => handleRemoveInstitution(doc.institutionId)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Tab>

                <Tab tabClassName="tab" eventKey="courses" title="Courses">
                    <div className="wrapper">
                        <button className="btn btn-dark" onClick={() => { handleShow("course") }}>Add New Course +</button>
                        {courses.map(doc => {
                            return (
                                <div className='item' key={doc.id}>
                                    {doc.courseName}
                                    <div>
                                        <button className="btn btn-danger m-1">Edit</button>
                                        <button className="btn btn-success m-1">Remove</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Tab>

                <Tab tabClassName="tab" eventKey="instructors" title="Instructors">
                    <div className="wrapper">
                        <button className="btn btn-dark" onClick={() => { handleShow("instructor") }}>Add New Instructor +</button>
                        {instructors.map(instructor => (
                            <div className='item' key={instructor.instructorId}>
                                {instructor.name}
                                <div>
                                    <button className="btn btn-danger m-1" onClick={() => handleEditInstructor(instructor.instructorId)}>Edit</button>
                                    <button className="btn btn-success m-1" onClick={() => handleRemoveInstructor(instructor.instructorId)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Tab>


                <Tab tabClassName="tab" eventKey="students" title="Students">
                    <div className="wrapper">
                        <button className="btn btn-dark" onClick={() => { handleShow("student") }}>Add New Student +</button>
                        {students.map(doc => {
                            return (
                                <div className='item' key={doc.studentId}>
                                    <div>
                                        {doc.id} {doc.name} <strong>[{doc.mobileNumber}]</strong>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger">Edit</button>
                                        <button className="btn btn-success m-1">Remove</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Tab>


            </Tabs>


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
                                <Form.Group className="mb-3" controlId="formEditInstructorName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Name"
                                        value={editInstructorData.name}
                                        onChange={(e) =>
                                            setEditInstructorData({
                                                ...editInstructorData,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEditInstructorAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Address"
                                        value={editInstructorData.address}
                                        onChange={(e) =>
                                            setEditInstructorData({
                                                ...editInstructorData,
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEditInstructorMobileNo">
                                    <Form.Label>Mobile No.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Mobile No."
                                        value={editInstructorData.mobileNo}
                                        onChange={(e) =>
                                            setEditInstructorData({
                                                ...editInstructorData,
                                                mobileNo: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEditInstructorQualifications">
                                    <Form.Label>Qualifications</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Qualifications"
                                        value={editInstructorData.qualifications}
                                        onChange={(e) =>
                                            setEditInstructorData({
                                                ...editInstructorData,
                                                qualifications: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEditInstructorUploadFile">
                                    <Form.Label>Upload File</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Upload File"
                                        value={editInstructorData.uploadFile}
                                        onChange={(e) =>
                                            setEditInstructorData({
                                                ...editInstructorData,
                                                uploadFile: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Button variant="primary" onClick={handleUpdateInstructor}>
                                    Update Instructor
                                </Button>
                            </Form>
                        </Modal.Body>
                    </>
                )}

                {showForm === 'instructor' && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Instructor
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formInstructorName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Name"
                                        value={instructorData.name}
                                        onChange={(e) =>
                                            setInstructorData({
                                                ...instructorData,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formInstructorAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Address"
                                        value={instructorData.address}
                                        onChange={(e) =>
                                            setInstructorData({
                                                ...instructorData,
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formInstructorMobileNo">
                                    <Form.Label>Mobile No.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Mobile No."
                                        value={instructorData.mobileNo}
                                        onChange={(e) =>
                                            setInstructorData({
                                                ...instructorData,
                                                mobileNo: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formInstructorQualifications">
                                    <Form.Label>Qualifications</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Qualifications"
                                        value={instructorData.qualifications}
                                        onChange={(e) =>
                                            setInstructorData({
                                                ...instructorData,
                                                qualifications: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formInstructorUploadFile">
                                    <Form.Label>Upload File</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Upload File"
                                        value={instructorData.uploadFile}
                                        onChange={(e) =>
                                            setInstructorData({
                                                ...instructorData,
                                                uploadFile: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>

                                <Button variant="primary" onClick={handleSaveInstructor}>
                                    Add Instructor
                                </Button>
                            </Form>
                        </Modal.Body>
                    </>
                )}

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

                                <Button variant="primary" onClick={handleUpdateInstitution}>
                                    Update Institution
                                </Button>
                            </Form>
                        </Modal.Body>
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
                                <Button variant="primary" onClick={handleSaveInstitution}>Add Institution</Button>
                            </Form>
                        </Modal.Body>
                    </>: showForm === 'course' ?
                        <>
                            <Modal.Header closeButton>

                                <Modal.Title id="contained-modal-title-vcenter">
                                    Add a Course
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formCourseName">
                                        <Form.Label>Course Name</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Course Name"
                                            value={courseData.courseName}
                                            onChange={(e) => setCourseData({ ...courseData, courseName: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formDurationYears">
                                        <Form.Label>Duration (in Years)</Form.Label>
                                        <Form.Control
                                            placeholder="Duration (in Years)"
                                            value={courseData.durationYears}
                                            onChange={(e) => setCourseData({ ...courseData, durationYears: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formCourseTitle">
                                        <Form.Label>Availability</Form.Label>
                                        <Form.Control
                                            placeholder="True or False"
                                            value={courseData.availability}
                                            onChange={(e) => setCourseData({ ...courseData, availability: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formCredits">
                                        <Form.Label>Total Credit</Form.Label>
                                        <Form.Control
                                            placeholder="Enter Total Course Credit, For example, (360)"
                                            value={courseData.credits}
                                            onChange={(e) => setCourseData({ ...courseData, credits: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formSemester">
                                        <Form.Label>Course Fee</Form.Label>
                                        <Form.Control
                                            placeholder="Semester Month, For example, (September/October)"
                                            value={courseData.courseFee}
                                            onChange={(e) => setCourseData({ ...courseData, courseFee: e.target.value })}
                                        />
                                    </Form.Group>


                                </Form>
                            </Modal.Body>

                        </> :
                        showForm === 'student' ?
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Add a Student
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Username"
                                                value={studentData.username}
                                                onChange={(e) => setStudentData({ ...studentData, username: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter Password"
                                                value={studentData.password}
                                                onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Name"
                                                value={studentData.name}
                                                onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter Email"
                                                value={studentData.email}
                                                onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formMobileNumber">
                                            <Form.Label>Mobile Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Mobile Number"
                                                value={studentData.mobileNumber}
                                                onChange={(e) => setStudentData({ ...studentData, mobileNumber: e.target.value })}
                                            />
                                        </Form.Group>

                                        {/* Assuming you have a checkbox for profile status */}
                                        <Form.Group className="mb-3" controlId="formProfileStatus">
                                            <Form.Check
                                                type="checkbox"
                                                label="Profile Status"
                                                checked={studentData.profileStatus}
                                                onChange={(e) => setStudentData({ ...studentData, profileStatus: e.target.checked })}
                                            />
                                        </Form.Group>

                                    </Form>
                                </Modal.Body>
                            </> : null
                }
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    {showForm === 'institution' && <Button variant="primary" onClick={handleSaveInstitution}>Add Institution</Button>}
                    {showForm === 'course' && <Button variant="primary" onClick={handleSaveCourse}>Add Course</Button>}
                    {showForm === 'student' && <Button variant="primary" onClick={handleSaveStudent}>Add Student</Button>}
                    {showForm === 'instructor' && <Button variant="primary" onClick={handleSaveInstructor}>Add Instructor</Button>}
                </Modal.Footer>
            </Modal>

        </Container>
        </div>
    );
}
