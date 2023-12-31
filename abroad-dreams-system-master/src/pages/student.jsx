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
import "./ProfileForm.css";

// import StudentSidebar from "../StudentSidebar";
import './SearchCollege.css';



import "./RequestForm.css";
import StudentSidebar from "../StudentSidebar";

const Student = () => {
  const [institution, setProgram] = useState({
    programName: "University of Coventry",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [highSchoolName, setHighSchoolName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [testScores, setTestScores] = useState("");
  const [extracurricularActivities, setExtracurricularActivities] =
    useState("");
  const [personalStatement, setPersonalStatement] = useState("");
  const [documents, setDocuments] = useState(null);

  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [disabilities, setDisabilities] = useState({
    visual: false,
    hearing: false,
    motor: false,
    cognitive: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setDisabilities((prevDisabilities) => ({
      ...prevDisabilities,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, including the 'disabilities' state.
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    // Handle form submission here, including the 'disabilities' state.
  };

  const [filters, setFilters] = useState({
    country: "",
    usState: [],
    name: "",
    useState:[]
  
  });

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("http://localhost:3100/student_active/sushmita@gmail.com")
      .then((doc) => {
        const arr = [];
        doc.data.courses.forEach((doc) => {
          arr.push({
            courseName: Object.keys(doc)[0],
            grade: doc[Object.keys(doc)[0]],
          });
        });
        setCourses(arr);
        console.log(arr);
      });
  }, []);

  return (
    <Container style={{ marginLeft: 250 }}>
       {/* <StudentSidebar/> */}
      <h5>
        Welcome back <strong>Student</strong>
      </h5>
      <br />
      <Tabs defaultActiveKey="institutions" className="mb-3">
        <Tab
          tabClassName="tab"
          eventKey="institutions"
          title="Your Institution"
        >
          <div className="wrapper">
            <div className="inner">
              <h3>Preferred Institution</h3>
              <p>{institution.programName}</p>
              <hr />
              <h4>Application Progress Report</h4>
              <div
                style={{
                  padding: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="p">
                    Documents <h5>Submitted</h5>
                  </p>
                  <p className="p">
                    Language Requirements <h5>iELTS 6.5+ </h5>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="p">
                    Application Progress <br />
                    <br />
                    <ProgressBar
                      variant="success"
                      animated={true}
                      now={80}
                      label={`${80}%`}
                    />
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="p">
                    Min Required GPA <h5>3.0</h5>
                  </p>
                  <p className="p">
                    List of Grades <br />{" "}
                    {courses.map((doc) => {
                      return (
                        <p style={{ marginTop: 10 }}>
                          {doc.courseName} - {doc.grade}
                        </p>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Tab>

        <Tab tabClassName="tab" eventKey="courses" title="Preferred Courses">
          <div className="wrapper">
            <button className="btn btn-dark" onClick={handleShow}>
              Add/Drop Preferred Courses
            </button>
            {courses.map((doc) => {
              return <div className="item">{doc.courseName}</div>;
            })}
          </div>
        </Tab>

        <Tab tabClassName="tab" eventKey="profile" title="Profile">
          <div className="wrapper">
            <div className="profile-form">
              <h4>University Application Profile</h4>
              <h5>Personal Information</h5>
              {/* <form onSubmit={handleSubmit}> */}
              {/* Personal Information */}
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <h5>Contact Information</h5>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* Address Information */}
              <h5>Address Information</h5>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  placeholder="State"
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Zip Code:</label>
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  placeholder="Zip Code"
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  placeholder="Country"
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>

              {/* Academic History */}
              <h5>Academic History</h5>
              <div className="form-group">
                <label htmlFor="highSchoolName">High School Name:</label>
                <input
                  type="text"
                  id="highSchoolName"
                  value={highSchoolName}
                  placeholder="High School Name"
                  onChange={(e) => setHighSchoolName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="graduationYear">
                  Expected Graduation Year:
                </label>
                <input
                  type="date"
                  id="graduationYear"
                  value={graduationYear}
                  placeholder="Expected Graduation Year"
                  onChange={(e) => setGraduationYear(e.target.value)}
                  required
                />
              </div>
              {/* Standardized Test Scores */}
              <h5>Standardized Test Scores</h5>
              <div className="form-group">
                <label htmlFor="testScores">Select Test Type:</label>
                <select
                  id="testScores"
                  value={testScores}
                  onChange={(e) => setTestScores(e.target.value)}
                  required
                >
                  <option value="">Select Test Type</option>
                  <option value="SAT">SAT</option>
                  <option value="ACT">ACT</option>
                  <option value="GRE">GRE</option>
                  <option value="IELTS">IELTS</option>
                  <option value="PTE">PTE</option>
                  {/* Add more test options as needed */}
                </select>
              </div>

              {/* Test Score Documents */}
              <h5>Test Score Documents</h5>
              <div className="form-group">
                <label htmlFor="testScoreDocuments">
                  Upload Test Score Documents:
                </label>
                <input
                  type="file"
                  id="testScoreDocuments"
                  onChange={(e) => setTestScoreDocuments(e.target.files[0])}
                  required
                />
                <small className="form-text text-muted">
                  Upload documents related to your test scores (e.g., score
                  reports).
                </small>
              </div>

              {/* Extracurricular Activities */}
              <h5>Extracurricular Activities</h5>
              <div className="form-group">
                <label htmlFor="extracurricularActivities">Activities:</label>
                <textarea
                  id="extracurricularActivities"
                  value={extracurricularActivities}
                  placeholder="List your extracurricular activities"
                  onChange={(e) => setExtracurricularActivities(e.target.value)}
                  required
                />
              </div>

              {/* Personal Statement */}
              <h5>Personal Statement</h5>
              <div className="form-group">
                <label htmlFor="personalStatement">Personal Statement:</label>
                <textarea
                  id="personalStatement"
                  value={personalStatement}
                  placeholder="Write your personal statement"
                  onChange={(e) => setPersonalStatement(e.target.value)}
                  required
                />
              </div>

              {/* Documents */}
              <div className="form-group">
                <label htmlFor="documents">
                  Documents (Transcripts, etc.):
                </label>
                <input
                  type="file"
                  id="documents"
                  onChange={handleFileChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button className="btn btn-primary" type="submit">
                Submit Application
              </button>
              {/* </form> */}
            </div>
          </div>
        </Tab>

        <Tab tabClassName="tab" eventKey="searchCollege" title="Search College">
  <div className="wrapper">
    <div>
      <h5>Sort by</h5>
      <div>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          placeholder="Search country..."
          value={filters.country}
          onChange={(e) => handleFilterChange("country", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Search name..."
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
      </div>
    </div>
  </div>

      <div className="my-colleges">
            <h4>My Colleges</h4>
            <ul>
              <div style={{display:"flex",justifyContent:"space-evenly"}}>
                <div style={{display:"flex",justifyContent:"space-evenly"}}>
                <li>Covenrty <a style={{fontSize:12, textDecoration:"none",marginRight:12}} href="https://www.coventry.ac.uk/">View Details</a> </li>
              <button>Apply</button>
              <button>Remove</button>
              </div>
                <div style={{display:"flex",justifyContent:"space-evenly"}}>
                <li>UToledo <a style={{fontSize:12, textDecoration:"none",marginRight:12}} href="https://www.coventry.ac.uk/">View Details</a> </li>
              <button>Apply</button>
              <button>Remove</button>
              </div>
              </div>

            </ul>
          </div>
 

</Tab>


        <Tab tabClassName="tab" eventKey="request" title="Request Form">
          <div className="wrapper">
            <div>
              <h4 style={{ marginTop: 20, fontWeight: "bold" }}>
                Request Form
              </h4>
              {/* <form onSubmit={handleSubmit}> */}
              <input
                type="text"
                id="name"
                value={name}
                style={{ width: 300 }}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />
              <input
                type="email"
                id="email"
                value={name}
                style={{ width: 300, marginTop: 10 }}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <textarea
                id="request"
                value={request}
                placeholder="Request"
                onChange={(e) => setRequest(e.target.value)}
                required
              />
              <br />
              <div>
                <p>Select your disabilities (if any):</p>
                <label>
                  <input
                    type="checkbox"
                    name="visual"
                    checked={disabilities.visual}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Visual
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="hearing"
                    checked={disabilities.hearing}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Hearing
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="motor"
                    checked={disabilities.motor}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Motor
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="cognitive"
                    checked={disabilities.cognitive}
                    onChange={handleCheckboxChange}
                  />{" "}
                  Cognitive
                </label>
              </div>

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              {/* </form> */}
            </div>
          </div>
        </Tab>
      </Tabs>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add or Drop a course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <input style={{ marginRight: 10 }} placeholder="Course Code" />
            <a style={{ marginRight: 10 }} href="#">
              Add
            </a>
            <a href="#">Drop</a>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Student;
