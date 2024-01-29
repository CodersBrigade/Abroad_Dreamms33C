// import React, { useState, useEffect } from "react";
// import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
// import axios from "axios";

// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";

// export default function StudentProfile() {
//   const [profileData, setFormData] = useState({
//     // Section A
//     // Section A
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     phoneNumber: "",
//     emailAddress: "",
//     gender: "",
//     dateOfBirth: "",
//     fullAddress: "",
//     // Section B
//     country: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     // Section C
//     interestedCountry: "",
//     primaryUniversity: "",
//     secondaryUniversity: "",
//     interestedCourse: "",

//     // Section D
//     testScores: "",
//     testType: "",

//     // Section E
//     previousSchoolLevel: "",
//     previousSchoolGpa: "",
//     graduationDate: "",
//     background: "",

//     // Section F
//     reference: "",
//     notes: "",
//   });

//   const [profileData, setProfileData] = useState(null);

//   const fetchStudentProfile = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/student-profile/fetch",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Fetched Student Profile:", response.data);

//       setProfileData(response.data);
//     } catch (error) {
//       console.error("Error fetching student profile:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStudentProfile();
//   }, []); // Fetch student profile on component mount

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/student-profile/save",
//         profileData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Form submitted successfully:", response.data);

//       fetchStudentProfile();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData({ ...profileData, [field]: value });
//   };

// const FetchedProfileCard = ({ profileData }) => {
//   return (
//     <Card className="mt-4">
//       <Card.Body>
//         <Card.Title>Fetched Student Profile</Card.Title>
//         {profileData && (
//           <div>
//             {/* Section A */}
//             <Card className="mb-4">
//               <Card.Body>
//                 <Card.Title>Contact Information</Card.Title>
//                 <RowItem label="First Name" value={profileData.firstName} />
//                 <RowItem label="Middle Name" value={profileData.middleName} />
//                 <RowItem label="Last Name" value={profileData.lastName} />
//                 <RowItem label="Phone Number" value={profileData.phoneNumber} />
//                 <RowItem label="Email Address" value={profileData.emailAddress} />
//                 <RowItem label="Gender" value={profileData.gender} />
//                 <RowItem label="Date of Birth" value={profileData.dateOfBirth} />
//                 <RowItem label="Full Address" value={profileData.fullAddress} />
//               </Card.Body>
//             </Card>

//             {/* Section B */}
//             <Card className="mb-4">
//               <Card.Body>
//                 <Card.Title>Address Information</Card.Title>
//                 <RowItem label="Country" value={profileData.country} />
//                 <RowItem label="State/Province" value={profileData.state} />
//                 <RowItem label="Zip Code" value={profileData.zipCode} />
//                 <RowItem label="City" value={profileData.city} />
//               </Card.Body>
//             </Card>

//             {/* Section C */}
//             <Card className="mb-4">
//               <Card.Body>
//                 <Card.Title>Academic History</Card.Title>
//                 <RowItem label="Previous School Level" value={profileData.previousSchoolLevel} />
//                 <RowItem label="Previous Education GPA" value={profileData.previousSchoolGpa} />
//                 <RowItem label="Graduation Year" value={profileData.graduationDate} />
//                 <RowItem label="Background" value={profileData.background} />
//               </Card.Body>
//             </Card>

//             {/* ... (Other Sections) */}
//           </div>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// const RowItem = ({ label, value }) => {
//   return (
//     <Row className="mb-2">
//       <Col sm={4}>
//         <strong>{label}:</strong>
//       </Col>
//       <Col sm={8}>
//         {value}
//       </Col>
//     </Row>
//   );
// };

// export default FetchedProfileCard;

// import React, { useState, useEffect } from "react";
// import { Container, Card, Row, Col } from "react-bootstrap";
// import axios from "axios";

// export default function ViewProfile() {
//   const [profileData, setProfileData] = useState(null);

//   const fetchStudentProfile = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/student-profile/fetch",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Fetched Student Profile:", response.data);

//       setProfileData(response.data);
//     } catch (error) {
//       console.error("Error fetching student profile:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStudentProfile();
//   }, []); // Fetch student profile on component mount

//   return (
//     <Container>
//       <Card className="mt-4">
//         <Card.Body>
//           <Card.Title>Fetched Student Profile</Card.Title>
//           {profileData && (
//             <div>
//               {/* Section A */}
//               <CardSection title="Contact Information">
//                 <RowItem label="First Name" value={profileData.firstName} />
//                 <RowItem label="Middle Name" value={profileData.middleName} />
//                 <RowItem label="Last Name" value={profileData.lastName} />
//                 <RowItem label="Phone Number" value={profileData.phoneNumber} />
//                 <RowItem
//                   label="Email Address"
//                   value={profileData.emailAddress}
//                 />
//                 <RowItem label="Gender" value={profileData.gender} />
//                 <RowItem
//                   label="Date of Birth"
//                   value={profileData.dateOfBirth}
//                 />
//                 <RowItem label="Full Address" value={profileData.fullAddress} />
//               </CardSection>

//               {/* Section B */}
//               <CardSection title="Address Information">
//                 <RowItem label="Country" value={profileData.country} />
//                 <RowItem label="State/Province" value={profileData.state} />
//                 <RowItem label="Zip Code" value={profileData.zipCode} />
//                 <RowItem label="City" value={profileData.city} />
//               </CardSection>

//               {/* Section C */}
//               <CardSection title="Academic History">
//                 <RowItem
//                   label="Previous School Level"
//                   value={profileData.previousSchoolLevel}
//                 />
//                 <RowItem
//                   label="Previous Education GPA"
//                   value={profileData.previousSchoolGpa}
//                 />
//                 <RowItem
//                   label="Graduation Year"
//                   value={profileData.graduationDate}
//                 />
//                 <RowItem label="Background" value={profileData.background} />
//               </CardSection>

//               {/* Section D */}
//               <CardSection title="Education Details">
//                 <RowItem
//                   label="Interested Country"
//                   value={profileData.interestedCountry}
//                 />
//                 <RowItem
//                   label="Primary University"
//                   value={profileData.primaryUniversity}
//                 />
//                 <RowItem
//                   label="Secondary University"
//                   value={profileData.secondaryUniversity}
//                 />
//                 <RowItem
//                   label="Interested Course"
//                   value={profileData.interestedCourse}
//                 />
//               </CardSection>

//               {/* Section E */}
//               <CardSection title="Standardized Test Scores">
//                 <RowItem
//                   label="Select Test Type"
//                   value={profileData.testType}
//                 />
//                 <RowItem
//                   label="Your Test Score"
//                   value={profileData.testScores}
//                 />
//               </CardSection>

//               {/* Section F */}
//               <CardSection title="Additional Information">
//                 <RowItem label="Reference" value={profileData.reference} />
//                 <RowItem label="Notes" value={profileData.notes} />
//               </CardSection>
//             </div>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }

// const CardSection = ({ title, children }) => {
//   return (
//     <Card className="mb-4">
//       <Card.Body>
//         <Card.Title>{title}</Card.Title>
//         {children}
//       </Card.Body>
//     </Card>
//   );
// };

// const RowItem = ({ label, value }) => {
//   return (
//     <Row className="mb-2">
//       <Col sm={4}>
//         <strong>{label}:</strong>
//       </Col>
//       <Col sm={8}>{value}</Col>
//     </Row>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
// import axios from "axios";

// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";

// export default function StudentProfile() {
//   const [profileData, setProfileData] = useState({
//     // Section A
//     // Section A
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     phoneNumber: "",
//     emailAddress: "",
//     gender: "",
//     dateOfBirth: "",
//     fullAddress: "",
//     // Section B
//     country: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     // Section C
//     interestedCountry: "",
//     primaryUniversity: "",
//     secondaryUniversity: "",
//     interestedCourse: "",

//     // Section D
//     testScores: "",
//     testType: "",

//     // Section E
//     previousSchoolLevel: "",
//     previousSchoolGpa: "",
//     graduationDate: "",
//     background: "",

//     // Section F
//     reference: "",
//     notes: "",
//   });

//   const [profileData, setProfileData] = useState(null);

//   const fetchStudentProfile = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/student-profile/fetch",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Fetched Student Profile:", response.data);

//       setProfileData(response.data);
//     } catch (error) {
//       console.error("Error fetching student profile:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStudentProfile();
//   }, []); // Fetch student profile on component mount

//   const handleInputChange = (field, value) => {
//     setFormData({ ...profileData, [field]: value });
//   };

//   return (
//     <Container>
//       <Card>
//         <Card.Body>
//           <Card.Title>Student Profile</Card.Title>
//           <Form onSubmit={handleSubmit}>
//             {/* Section A */}
//             <Card className="mb-4">
//               <Card.Body>
//                 <Card.Title>Contact Information</Card.Title>
//                 <Row>
//                   <Col>
//                     <Form.Group controlId="firstName">
//                       <Form.Label>First Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.firstName}
//                         onChange={(e) =>
//                           handleInputChange("firstName", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="middleName">
//                       <Form.Label>Middle Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.middleName}
//                         onChange={(e) =>
//                           handleInputChange("middleName", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="lastName">
//                       <Form.Label>Last Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.lastName}
//                         onChange={(e) =>
//                           handleInputChange("lastName", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col>
//                     <Form.Group controlId="phoneNumber">
//                       <Form.Label>Phone Number</Form.Label>
//                       <Form.Control
//                         type="tel"
//                         value={profileData.phoneNumber}
//                         onChange={(e) =>
//                           handleInputChange("phoneNumber", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="emailAddress">
//                       <Form.Label>Email Address</Form.Label>
//                       <Form.Control
//                         type="email"
//                         value={profileData.emailAddress}
//                         onChange={(e) =>
//                           handleInputChange("emailAddress", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="gender">
//                       <Form.Label>Gender</Form.Label>
//                       <Form.Control
//                         as="select"
//                         value={profileData.gender}
//                         onChange={(e) =>
//                           handleInputChange("gender", e.target.value)
//                         }
//                         required
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col>
//                     <Form.Group controlId="dateOfBirth">
//                       <Form.Label>Date of Birth</Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={profileData.dateOfBirth}
//                         onChange={(e) =>
//                           handleInputChange("dateOfBirth", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="fullAddress">
//                       <Form.Label>Full Address</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.fullAddress}
//                         onChange={(e) =>
//                           handleInputChange("fullAddress", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>

//             {/* Section B */}

//             <Card className="mb-4">
//               <Card.Body>
//                 <Card.Title>Address Information</Card.Title>
//                 {/* <Form onSubmit={handleSubmit}> */}
//                 <Row>
//                   <Col>
//                     <Form.Group controlId="country">
//                       <Form.Label>Country</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.country}
//                         onChange={(e) =>
//                           handleInputChange("country", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="state">
//                       <Form.Label>State/Province</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.state}
//                         onChange={(e) =>
//                           handleInputChange("state", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="zipCode">
//                       <Form.Label>Zip Code</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.zipCode}
//                         onChange={(e) =>
//                           handleInputChange("zipCode", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="district">
//                       <Form.Label>City</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.city}
//                         onChange={(e) =>
//                           handleInputChange("city", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>

//             {/* Section C */}

//             <Card className="mb-4">
//               <Card.Body>
//                 <Card.Title>Academic History</Card.Title>
//                 {/* <Form onSubmit={handleSubmit}> */}
//                 <Row>
//                   <Col>
//                     <Form.Group controlId="previousSchoolLevel">
//                       <Form.Label>Previous School Level</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.previousSchoolLevel}
//                         onChange={(e) =>
//                           handleInputChange(
//                             "previousSchoolLevel",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="primaryUniversity">
//                       <Form.Label>Previous Education GPA</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={profileData.previousSchoolGpa}
//                         onChange={(e) =>
//                           handleInputChange("previousSchoolGpa", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="secondaryUniversity">
//                       <Form.Label>Graduation Year</Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={profileData.graduationDate}
//                         onChange={(e) =>
//                           handleInputChange("graduationDate", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col>
//                     <Form.Group controlId="interestedCourse">
//                       <Form.Label>Background</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.background}
//                         onChange={(e) =>
//                           handleInputChange("background", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//             {/* Section D */}

//             <Card className="mb-4">
//               <Card.Body>
//                 <Card.Title>Education Details</Card.Title>
//                 {/* <Form onSubmit={handleSubmit}> */}
//                 <Row>
//                   <Col>
//                     <Form.Group controlId="interestedCountry">
//                       <Form.Label>Interested Country</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.interestedCountry}
//                         onChange={(e) =>
//                           handleInputChange("interestedCountry", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="primaryUniversity">
//                       <Form.Label>Primary University</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.primaryUniversity}
//                         onChange={(e) =>
//                           handleInputChange("primaryUniversity", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="secondaryUniversity">
//                       <Form.Label>Secondary University</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.secondaryUniversity}
//                         onChange={(e) =>
//                           handleInputChange(
//                             "secondaryUniversity",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId="interestedCourse">
//                       <Form.Label>Interested Course</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={profileData.interestedCourse}
//                         onChange={(e) =>
//                           handleInputChange("interestedCourse", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//             {/* Section E */}

//             <Card className="mb-4">
//               <Card.Body>
//                 <Card.Title>Standardized Test Scores</Card.Title>
//                 {/* <Form onSubmit={handleSubmit}> */}
//                 <Row>
//                   <Col>
//                     <Form.Group controlId="testScores">
//                       <Form.Label>Select Test Type</Form.Label>
//                       <Form.Control
//                         as="select"
//                         value={profileData.testType}
//                         onChange={(e) =>
//                           handleInputChange("testType", e.target.value)
//                         }
//                         required
//                       >
//                         <option value="SAT">SAT</option>
//                         <option value="ACT">ACT</option>
//                         <option value="GRE">GRE</option>
//                         <option value="IELTS">IELTS</option>
//                         <option value="PTE">PTE</option>
//                         <option value="Duolingo">Duolingo</option>
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>

//                   <Col>
//                     <Form.Group controlId="testScore">
//                       <Form.Label>Your Test Score</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={profileData.testScores}
//                         onChange={(e) =>
//                           handleInputChange("testScores", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 {/* </Form> */}
//               </Card.Body>
//             </Card>

//             {/* Section F */}
//             <Card>
//               <Card.Body>
//                 <Card.Title>Additional Information</Card.Title>
//                 {/* <Form onSubmit={handleSubmit}> */}
//                 <Row>
//                   <Col>
//                     <Form.Group controlId="reference">
//                       <Form.Label>Reference</Form.Label>
//                       <Form.Control
//                         as="select"
//                         value={profileData.reference}
//                         onChange={(e) =>
//                           handleInputChange("reference", e.target.value)
//                         }
//                       >
//                         <option value="">Select Reference</option>
//                         <option value="socialMedia">Social Media</option>
//                         <option value="friend">Friend</option>
//                         <option value="television">Television</option>
//                         <option value="newspaper">Newspaper</option>
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col>
//                     <Form.Group controlId="notes">
//                       <Form.Label>Notes</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         rows={4}
//                         value={profileData.notes}
//                         onChange={(e) =>
//                           handleInputChange("notes", e.target.value)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Button variant="primary" type="submit">
//                   Submit
//                 </Button>

//                 <Link to={"/view-profile"}>
//                   <Button variant="primary" type="button">
//                     {" "}
//                     {/* Corrected type attribute */}
//                     View Profile
//                   </Button>
//                 </Link>
//               </Card.Body>
//             </Card>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }

import React, { useState, useEffect } from "react";
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
import axios from "axios";

export default function ViewProfile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    gender: "",
    dateOfBirth: "",
    fullAddress: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    interestedCountry: "",
    primaryUniversity: "",
    secondaryUniversity: "",
    interestedCourse: "",
    testScores: "",
    testType: "",
    previousSchoolLevel: "",
    previousSchoolGpa: "",
    graduationDate: "",
    background: "",
    reference: "",
    notes: "",
  });

  const handleDisplay = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/student-profile/getById/{id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Fetched Student Profile:", response.data);

      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/student-profile/update",
        profileData, // Send the updated profile data in the request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Updated Student Profile:", response.data);

      // Optionally, you can handle success feedback or redirect the user
    } catch (error) {
      console.error("Error updating student profile:", error);
      // Optionally, you can handle error feedback
    }
  };

  useEffect(() => {
    // Assuming you have the student ID after creating the profile
    const createdStudentId = localStorage.getItem("userId"); // Replace with the actual student ID
    handleDisplay(createdStudentId);
  }, []); // Fetch student profile on component mount

  // useEffect(() => {
  //   handleDisplay();
  // }, []); // Fetch student profile on component mount

  const handleInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Student Profile</Card.Title>
          <Form>
            {/* Section A */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Contact Information</Card.Title>
                <Row>
                  <Col>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.firstName}
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
                        value={profileData.middleName}
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
                        value={profileData.lastName}
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
                        value={profileData.phoneNumber}
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
                        value={profileData.emailAddress}
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
                        value={profileData.gender}
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
                        value={profileData.dateOfBirth}
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
                        value={profileData.fullAddress}
                        onChange={(e) =>
                          handleInputChange("fullAddress", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Section B */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Address Information</Card.Title>
                <Row>
                  <Col>
                    <Form.Group controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.country}
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
                        value={profileData.state}
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
                        value={profileData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Section C */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Academic History</Card.Title>
                <Row>
                  <Col>
                    <Form.Group controlId="previousSchoolLevel">
                      <Form.Label>Previous School Level</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.previousSchoolLevel}
                        onChange={(e) =>
                          handleInputChange(
                            "previousSchoolLevel",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="previousSchoolGpa">
                      <Form.Label>Previous Education GPA</Form.Label>
                      <Form.Control
                        type="number"
                        value={profileData.previousSchoolGpa}
                        onChange={(e) =>
                          handleInputChange("previousSchoolGpa", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="graduationDate">
                      <Form.Label>Graduation Year</Form.Label>
                      <Form.Control
                        type="date"
                        value={profileData.graduationDate}
                        onChange={(e) =>
                          handleInputChange("graduationDate", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="background">
                      <Form.Label>Background</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.background}
                        onChange={(e) =>
                          handleInputChange("background", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Section D */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Education Details</Card.Title>
                <Row>
                  <Col>
                    <Form.Group controlId="interestedCountry">
                      <Form.Label>Interested Country</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.interestedCountry}
                        onChange={(e) =>
                          handleInputChange("interestedCountry", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="primaryUniversity">
                      <Form.Label>Primary University</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.primaryUniversity}
                        onChange={(e) =>
                          handleInputChange("primaryUniversity", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="secondaryUniversity">
                      <Form.Label>Secondary University</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileData.secondaryUniversity}
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
                        value={profileData.interestedCourse}
                        onChange={(e) =>
                          handleInputChange("interestedCourse", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Section E */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Standardized Test Scores</Card.Title>
                <Row>
                  <Col>
                    <Form.Group controlId="testType">
                      <Form.Label>Select Test Type</Form.Label>
                      <Form.Control
                        as="select"
                        value={profileData.testType}
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
                        <option value="Duolingo">Duolingo</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="testScores">
                      <Form.Label>Your Test Score</Form.Label>
                      <Form.Control
                        type="number"
                        value={profileData.testScores}
                        onChange={(e) =>
                          handleInputChange("testScores", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Section F */}
            <Card>
              <Card.Body>
                <Card.Title>Additional Information</Card.Title>
                <Row>
                  <Col>
                    <Form.Group controlId="reference">
                      <Form.Label>Reference</Form.Label>
                      <Form.Control
                        as="select"
                        value={profileData.reference}
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
                        value={profileData.notes}
                        onChange={(e) =>
                          handleInputChange("notes", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <center style={{ marginTop: 30, marginBottom: 30 }}>
              <Button variant="primary" type="button" onClick={handleUpdate}>
                Update Profile
              </Button>
            </center>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
