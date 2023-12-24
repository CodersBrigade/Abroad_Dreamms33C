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






export default function Admin() {

  const [institutions, setInstitutions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true); // Track login status
  const [showForm, setShowForm] = useState(''); // Using a string to represent the type of form
  const [editInstitutionId, setEditInstitutionId] = useState(null);


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
      <Container className="outer">
          <Nav className="justify-content-end">
              <Nav.Item>
                  <Nav.Link eventKey="logout" onClick={handleLogout}>
                      Logout
                  </Nav.Link>
              </Nav.Item>
              <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              </Form>
          </Nav>
        <h5>
          Welcome back <strong>Administrator</strong>
        </h5>
        <br />
        <Tabs defaultActiveKey="institutions" className="mb-3" >
            <Tab tabClassName="tab" eventKey="institutions" title="Institutions">
                <div className="wrapper">
                    <button className="btn btn-dark" onClick={() => { handleShow("institution") }} >Add New Institution +</button>
                    {institutions.map((doc) => (
                        <div className="item" key={doc.institutionId}>
                            {<strong>ID: {doc.institutionId}</strong>} {doc.institutionName}{" -- "}{doc.address}{", "}{doc.country}
                            <div>
                                <button className="btn btn-danger" onClick={() => handleEditInstitution(doc.institutionId)}>View Details/Edit</button>
                                <button className="btn btn-success" onClick={() => handleRemoveInstitution(doc.institutionId)}>Remove</button>
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
                        <button className="btn btn-danger">Edit</button>
                        <button className="btn btn-danger">Remove</button>
                      </div>
                    </div>
                )
              })}
            </div>
          </Tab>

          <Tab tabClassName="tab" eventKey="instructors" title="Instructors">
            <div className="wrapper">

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
                        <button className="btn btn-danger">Remove</button>
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
          </Modal.Footer>
        </Modal>
      </Container>
  )
}
