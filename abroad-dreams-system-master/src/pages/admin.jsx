// Part 1: Import Statements and Initial State
import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../Dashboard.css';

export default function Admin() {
  const [institutions, setInstitutions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(''); // Using a string to represent the type of form

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

  const handleShow = (formType) => {
    setShowForm(formType);
  };

  const handleSaveInstitution = () => {
    axios
        .post('http://localhost:8080/institution/save', institutionData)
        .then((response) => {
          console.log('Institution saved successfully:', response.data);
          handleClose();
        })
        .catch((error) => {
          console.error('Error saving institution:', error);
          // Handle the error, show a message, etc.
        });
  };

  const handleSaveCourse = () => {
    axios
        .post('http://localhost:8080/course/save', courseData)
        .then((response) => {
          console.log('Course saved successfully:', response.data);
          handleClose(); // Close the modal upon success
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
        })
        .catch((error) => {
          console.error('Error saving student:', error);
        });
  };


  return (
      <Container className="outer">
        <h5>
          Welcome back <strong>Administrator</strong>
        </h5>
        <br />
        <Tabs defaultActiveKey="institutions" className="mb-3">
          <Tab tabClassName="tab" eventKey="institutions" title="Institutions">
            <div className="wrapper">
              <button className="btn btn-dark" onClick={() => { handleShow("institution") }}>Add New Institution +</button>
              {institutions.map(doc => {
                return (
                    <div className='item' key={doc.instituteId}>
                      {doc.instituteName} <strong>{doc.instituteId}</strong>
                      <div>
                        <button className="btn btn-danger">Edit</button>
                        <button className="btn btn-danger">Remove</button>
                      </div>
                    </div>
                )
              })}
            </div>
          </Tab>

          <Tab tabClassName="tab" eventKey="courses" title="Courses">
            <div className="wrapper">
              <button className="btn btn-dark" onClick={() => { handleShow("course") }}>Add New Course +</button>
              {courses.map(doc => {
                return (
                    <div className='item' key={doc.courseId}>
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
                        {doc.firstName} {doc.lastName} <strong>[{doc.studentId}]</strong>
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

                  <Button variant="primary" onClick={handleSaveCourse}>
                    Add Course
                  </Button>
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

                            <Button variant="primary" onClick={handleSaveStudent}>
                              Save Student
                            </Button>
                          </Form>
                        </Modal.Body>
                      </> : null
          }
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            {showForm === 'institution' && <Button variant="primary" onClick={handleSaveInstitution}>Add Institution</Button>}
            {showForm === 'course' && <Button variant="primary" onClick={handleSaveCourse}>Add Course</Button>}
            {showForm === 'student' && <Button variant="primary" onClick={handleSaveStudent}>Add Student</Button>}
          </Modal.Footer>
        </Modal>
      </Container>
  )
}
