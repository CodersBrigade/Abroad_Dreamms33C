import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import "../Dashboard.css";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar.jsx";



import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';




export default function Student(){

        // const [firstName, setFirstName] = useState("");
        // const [lastName, setLastName] = useState("");
        // const [dob, setDob] = useState("");
        // const [address, setAddress] = useState("");
        // const [phone, setPhone] = useState("");
        // const [email, setEmail] = useState("");
        // const [gender, setGender] = useState('');

        const [courses, setCourses] = useState([]);
        const [totalCourses, setTotalCourses] = useState(0);

        const [showForm, setShowForm] = useState(''); // Using a string to represent the type of form

        const handleClose = () => setShowForm('');

        const [courseData, setCourseData] = useState({
            courseName: "",
            durationYears: "",
            availability: "",
            credits: "",
            courseFee: "",
        });

        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            axios.post('http://localhost:8080/application/save', formData)
                .then(response => {
                    console.log(response);
                    console.log("Application Saved Successfully!!");
                })
                .catch(error => {
                    console.error(error);
                    console.log("Application Failed!");
                });
        };

        const handleShow = (formType) => {
            setShowForm(formType);
            // setEditInstitutionId(institutionId);
            // setEditInstructorId(instructorId);

        };

        const handleApply = (formType) => {

            setShowForm(formType);
            console.log("Handled Apply");
            // setShowForm(formType);
            // setEditInstitutionId(institutionId);
            // setEditInstructorId(instructorId);

        };
            const handleSubmit = (e) => {
                e.preventDefault();
                console.log("Form submitted");
            };

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

            useEffect(() => {
                fetchCourses();
            }, []);

            const handleLogout = () => {
                window.location.href = '/';
            };


            return (

                <div className="d-flex">
                    {/* AdminSidebar change to Student Sidebar */}
                    <AdminSidebar />

                    <Container fluid className="flex-grow-1">

                        <h5>
                            Welcome back <strong>Student</strong>

                        </h5>

                        {/*<Button variant="contained" color="primary" component="span">*/}
                        {/*    Upload*/}
                        {/*</Button>*/}

                        {/*<IconButton color="primary" aria-label="upload picture" component="span">*/}
                        {/*    <PhotoCamera />*/}
                        {/*</IconButton>*/}

                        <TextField type="file" />
                        <Button variant="contained" color="primary" component="span" onClick={handleFileUpload}>
                            Upload
                        </Button>



                        <div className="info-wrapper">

                            <Tabs defaultActiveKey="courses" className="mb-3" >

                                <Tab tabClassName="tab" eventKey="courses" title="Courses">
                                    <div className="wrapper">
                                        {courses.map(doc => {
                                            return (
                                                <div className='item' key={doc.id}>
                                                    {doc.courseName} {" "} {doc.durationYears} {" "} {doc.courseFee}
                                                    <div>
                                                        <button onClick={() => {handleApply}} className="btn btn-success m-1">Apply</button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Tab>

                                <Tab tabClassName="tab" eventKey="institutions" title="Institutions">

                                    <div className="info-box">
                                        <p>Total Courses</p>
                                        <strong>{totalCourses}</strong>
                                    </div>
                                    {/*<div className="wrapper">*/}
                                    {/*    <button className="btn btn-dark" onClick={() => { handleShow("institution") }} >Add New Institution +</button>*/}
                                    {/*    {institutions.map((doc) => (*/}
                                    {/*        <div className="item" key={doc.institutionId}>*/}
                                    {/*            {<strong>ID: {doc.institutionId}</strong>} {doc.institutionName}{" -- "}{doc.address}{", "}{doc.country}*/}
                                    {/*            <div>*/}
                                    {/*                <button className="btn btn-danger m-1" onClick={() => handleEditInstitution(doc.institutionId)}>View Details/Edit</button>*/}
                                    {/*                <button className="btn btn-success m-1" onClick={() => handleRemoveInstitution(doc.institutionId)}>Remove</button>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    ))}*/}
                                    {/*</div>*/}
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

                                {showForm === 'course' && (
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
                                    </> : null
                                }
                            </Modal>
                        </div>
                    </Container>
                </div>
        );

        }
