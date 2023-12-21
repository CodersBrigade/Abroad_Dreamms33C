import React, { useState, useEffect } from 'react'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import '../Dashboard.css';
import axios from 'axios';

export default function admin() {
  const [institutions, setInstitutions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [showProgram, setShowProgram] = useState(true)
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [formData, setFormData] = useState({
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

  const handleShow = (institution) => {
    if (institution == "institution"){
      setShowProgram(true)
    }
    else{
      setShowProgram(false)
    }
    setShow(true)
  };

  const handleSaveInstitution = () => {
    axios.post("http://localhost:8080/institution/save", formData)
        .then(response => {
          console.log("Institution saved successfully:", response.data);
          handleClose();

        })
        .catch(error => {
          console.error("Error saving institution:", error);
          // Handle the error, show a message, etc.
        });
  };

  const handleSaveCourse = () => {
    axios.post("http://localhost:8080/course/save", courseData)
        .then(response => {
          console.log("Course saved successfully:", response.data);
          handleClose(); // Close the modal upon success
          // Optionally, update the local state or perform other actions
        })
        .catch(error => {
          console.error("Error saving course:", error);
          // Handle the error, show a message, etc.
        });
  };


  return (
    <Container className='outer'>
      <h5>Welcome back <strong>Administrator</strong></h5>
      <br />
      <Tabs defaultActiveKey="institutions" className="mb-3">
        <Tab tabClassName="tab" eventKey="institutions" title="Institutions">
          <div className="wrapper">
            <button className="btn btn-dark" onClick={(e) => {handleShow("institution")}}>Add New Institution +</button>
            {institutions.map(doc => {
              return (
                <div className='item'>
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
            <button className="btn btn-dark" onClick={(e) => {handleShow("something")}}>Add New Course +</button>
            {courses.map(doc => {
              return (
                <div className='item'>
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
            <button className="btn btn-dark">View Pending Applications</button>
            {students.map(doc => {
              return (
                <div className='item'>
                  <div>
                    {doc.firstName} {doc.lastName } <strong>[{doc.studentId}]</strong>
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
        show={show} onHide={handleClose} animation={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {showProgram? 
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
              value={formData.institutionName}
              onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Country</Form.Label>
              <Form.Control
                  placeholder="Enter Country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Official Website</Form.Label>
              <Form.Control
                  placeholder="Enter Official Website"
                  value={formData.officialWebsite}
                  onChange={(e) => setFormData({ ...formData, officialWebsite: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                  placeholder="Short Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Courses Types</Form.Label>
              <Form.Control
                  placeholder="BSc, MSc, Diploma, Language etc."
                  value={formData.coursesTypes}
                  onChange={(e) => setFormData({ ...formData, coursesTypes: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Special Information</Form.Label>
              <Form.Control
                  placeholder="Special Information (Optional)"
                  value={formData.specialInformation}
                  onChange={(e) => setFormData({ ...formData, specialInformation: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Rules & Regulations</Form.Label>
              <Form.Control
                  placeholder="Rules & Regulations"
                  value={formData.rulesAndRegulation}
                  onChange={(e) => setFormData({ ...formData, rulesAndRegulation: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSaveInstitution}>Add Institution</Button>
          </Form>
        </Modal.Body>
        </>: <>
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
        
        </>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          {/*<Button variant="primary" onClick={handleSaveInstitution}>Add</Button>*/}
        </Modal.Footer>
      </Modal>

    </Container>
  )
}
