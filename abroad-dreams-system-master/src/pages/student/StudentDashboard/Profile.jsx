import React, { useState } from "react";
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
import StudentSidebar from "./StudentSidebar";
import Header from "../../../components/Header.jsx";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";
const Profile = () => {
  const [formData, setFormData] = useState({
    // Section A
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    gender: "",
    dateOfBirth: "",
    fullAddress: "",
    // Section B
    country: "",
    state: "",
    zipCode: "",
    district: "",
    // Section B
    interestedCountry: "",
    primaryUniversity: "",
    secondaryUniversity: "",
    interestedCourse: "",

    // Section C
    testScores: "",
    testType: "",

    // Section D
    highSchoolName: "",
    highSchoolGpa: "",
    graduationDate: "",
    background: "",

    // Section E
    reference: "",
    notes: "",
  });
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };
  return (
    <div>
      <div
        style={{
          position: "fixed",
          zIndex: 2000,
          left: 0,
          right: 0,
        }}
      >
        <Header />
      </div>
      <div className="d-flex">
        <div
          style={{
            marginTop: 90,
            position: "static",
          }}
        >
          <StudentSidebar />
        </div>
        <div style={{ marginTop: 90 }}>
          <Container fluid className="flex-grow-1">
            <StudentProfileBar />
            <h2>Student Profile Form</h2>
            {/* Section A */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Contact Information</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="middleName">
                        <Form.Label>Middle Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.middleName}
                          onChange={(e) =>
                            handleInputChange("middleName", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="emailAddress">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          value={formData.emailAddress}
                          onChange={(e) =>
                            handleInputChange("emailAddress", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          as="select"
                          value={formData.gender}
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="dateOfBirth">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            handleInputChange("dateOfBirth", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="fullAddress">
                        <Form.Label>Full Address</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.fullAddress}
                          onChange={(e) =>
                            handleInputChange("fullAddress", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {/*<Button variant="primary" type="submit">*/}
                  {/* Submit*/}
                  {/*</Button>*/}
                </Form>
              </Card.Body>
            </Card>

            {/* Section B */}

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Address Information</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.country}
                          onChange={(e) =>
                            handleInputChange("country", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="state">
                        <Form.Label>State/Province</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.state}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="zipCode">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="district">
                        <Form.Label>District</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.district}
                          onChange={(e) =>
                            handleInputChange("district", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/*<Button variant="primary" type="submit">*/}
                  {/* Submit*/}
                  {/*</Button>*/}
                </Form>
              </Card.Body>
            </Card>

            {/* Section B */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Education Details</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="interestedCountry">
                        <Form.Label>Interested Country</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.interestedCountry}
                          onChange={(e) =>
                            handleInputChange(
                              "interestedCountry",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="primaryUniversity">
                        <Form.Label>Primary University</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.primaryUniversity}
                          onChange={(e) =>
                            handleInputChange(
                              "primaryUniversity",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="secondaryUniversity">
                        <Form.Label>Secondary University</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.secondaryUniversity}
                          onChange={(e) =>
                            handleInputChange(
                              "secondaryUniversity",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="interestedCourse">
                        <Form.Label>Interested Course</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.interestedCourse}
                          onChange={(e) =>
                            handleInputChange(
                              "interestedCourse",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/*<Button variant="primary" type="submit">*/}
                  {/* Submit*/}
                  {/*</Button>*/}
                </Form>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Academic History</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="interestedCountry">
                        <Form.Label>High School Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.highSchoolName}
                          onChange={(e) =>
                            handleInputChange("highSchoolName", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="primaryUniversity">
                        <Form.Label>High School GPA</Form.Label>
                        <Form.Control
                          type="number"
                          value={formData.highSchoolGpa}
                          onChange={(e) =>
                            handleInputChange("highSchoolGpa", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="secondaryUniversity">
                        <Form.Label>Graduation Year</Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.graduationDate}
                          onChange={(e) =>
                            handleInputChange("graduationDate", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group controlId="interestedCourse">
                        <Form.Label>Background</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.background}
                          onChange={(e) =>
                            handleInputChange("background", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/*<Button variant="primary" type="submit">*/}
                  {/* Submit*/}
                  {/*</Button>*/}
                </Form>
              </Card.Body>
            </Card>
            {/* Section c */}

            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Standardized Test Scores</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="testScores">
                        <Form.Label>Select Test Type</Form.Label>
                        <Form.Control
                          as="select"
                          value={formData.testType}
                          onChange={(e) =>
                            handleInputChange("testType", e.target.value)
                          }
                          required
                        >
                          <option value="SAT">SAT</option>
                          <option value="ACT">ACT</option>
                          <option value="GRE">GRE</option>
                          <option value="IELTS">IELTS</option>
                          <option value="PTE">PTE</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group controlId="testScore">
                        <Form.Label>Your Test Score</Form.Label>
                        <Form.Control
                          type="number"
                          value={formData.testScores}
                          onChange={(e) =>
                            handleInputChange("testScores", e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            {/* Section C */}
            <Card>
              <Card.Body>
                <Card.Title>Additional Information</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="reference">
                        <Form.Label>Reference</Form.Label>
                        <Form.Control
                          as="select"
                          value={formData.reference}
                          onChange={(e) =>
                            handleInputChange("reference", e.target.value)
                          }
                        >
                          <option value="">Select Reference</option>
                          <option value="socialMedia">Social Media</option>
                          <option value="friend">Friend</option>
                          <option value="television">Television</option>
                          <option value="newspaper">Newspaper</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="notes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={formData.notes}
                          onChange={(e) =>
                            handleInputChange("notes", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <div style={{ marginBottom: "50px" }}></div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div style={{ marginBottom: "50px" }}></div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Profile;
