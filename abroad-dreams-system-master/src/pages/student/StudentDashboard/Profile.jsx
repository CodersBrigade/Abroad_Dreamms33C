// import React, { useState } from "react";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import StudentSidebar from "./StudentSidebar";
// import axios from "axios";
// import Header from "../../../components/Header.jsx";
// import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("personal-info");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     gender: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//     highSchoolName: "",
//     graduationYear: "",
//     gpa: "",
//     testType: "",
//     testScores: "",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   const validateForm = () => {
//     const errors = {};

//     const requiredFields = [
//       "firstName",
//       "lastName",
//       "dateOfBirth",
//       "gender",
//       "phone",
//       "address",
//       "city",
//       "state",
//       "zipCode",
//       "country",
//       "highSchoolName",
//       "graduationYear",
//       "gpa",
//       "testType",
//       "testScores",
//     ];

//     requiredFields.forEach((field) => {
//       if (!formData[field].trim()) {
//         errors[field] = `${
//           field.charAt(0).toUpperCase() + field.slice(1)
//         } is required`;
//       }
//     });

//     if (activeTab === "test-scores") {
//       if (!formData.testType) {
//         errors.testType = "Test Type is required";
//       }

//       const testScores = parseFloat(formData.testScores);

//       if (isNaN(testScores) || testScores < 0 || testScores > 100) {
//         errors.testScores = "Test Score must be a number between 0 and 100";
//       }
//     }

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   const handleInputChange = (key, value) => {
//     setFormData({ ...formData, [key]: value });
//     setFormErrors({ ...formErrors, [key]: "" });
//   };

//   const handlePrevButtonClick = () => {
//     const tabOrder = [
//       "personal-info",
//       "address-info",
//       "academic-info",
//       "test-scores",
//     ];
//     const currentTabIndex = tabOrder.indexOf(activeTab);

//     if (currentTabIndex !== -1 && currentTabIndex > 0) {
//       setActiveTab(tabOrder[currentTabIndex - 1]);
//     }
//   };

//   const handleNextButtonClick = () => {
//     const tabOrder = [
//       "personal-info",
//       "address-info",
//       "academic-info",
//       "test-scores",
//     ];
//     const currentTabIndex = tabOrder.indexOf(activeTab);

//     if (currentTabIndex !== -1 && currentTabIndex < tabOrder.length - 1) {
//       setActiveTab(tabOrder[currentTabIndex + 1]);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validateForm()) {
//       console.log("Form contains errors. Please review and correct.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("accessToken");
//       const userId = localStorage.getItem("userId");

//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };

//       const dataToSend = {
//         systemUser: userId,
//         ...formData,
//       };

//       console.log("Data to Send:", dataToSend);

//       const response = await axios.post(
//         "http://localhost:8080/student-profile/save",
//         dataToSend,
//         { headers }
//       );

//       console.log(response.data);

//       const tabOrder = [
//         "personal-info",
//         "address-info",
//         "academic-info",
//         "test-scores",
//       ];
//       const currentTabIndex = tabOrder.indexOf(activeTab);

//       if (currentTabIndex !== -1 && currentTabIndex < tabOrder.length - 1) {
//         setActiveTab(tabOrder[currentTabIndex + 1]);
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error("Server Error:", error.response.data);
//       } else if (error.request) {
//         console.error("No response from server");
//       } else {
//         console.error("Error:", error.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="d-flex">
//         <StudentSidebar />

//         <div className="main-content flex-grow-1 p-4">
//           <StudentProfileBar />
//           <Form onSubmit={handleSubmit}>
//             <Tabs
//               defaultActiveKey="personal-info"
//               activeKey={activeTab}
//               onSelect={(key) => setActiveTab(key)}
//               className="profile-tabs"
//             >
//               <Tab
//                 tabClassName="tab"
//                 eventKey="personal-info"
//                 title="Personal Information"
//               >
//                 <div className="forms d-flex flex-column">
//                   <h5>Personal Information</h5>
//                   <div className="d-flex ">
//                     <Form.Group controlId="firstName">
//                       <Form.Label>First Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="First Name"
//                         value={formData.firstName}
//                         onChange={(e) =>
//                           handleInputChange("firstName", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.firstName}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="lastName">
//                       <Form.Label>Last Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Last Name"
//                         value={formData.lastName}
//                         onChange={(e) =>
//                           handleInputChange("lastName", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.lastName}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="dateOfBirth">
//                       <Form.Label>Date of Birth</Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={formData.dateOfBirth}
//                         onChange={(e) =>
//                           handleInputChange("dateOfBirth", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.dateOfBirth}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="gender">
//                       <Form.Label>Gender</Form.Label>
//                       <Form.Control
//                         as="select"
//                         value={formData.gender}
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
//                       <Form.Text className="text-danger">
//                         {formErrors.gender}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="phone">
//                       <Form.Label>Phone</Form.Label>
//                       <Form.Control
//                         type="tel"
//                         placeholder="Phone"
//                         value={formData.phone}
//                         onChange={(e) =>
//                           handleInputChange("phone", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.phone}
//                       </Form.Text>
//                     </Form.Group>
//                   </div>
//                 </div>
//               </Tab>
//               <Tab
//                 tabClassName="tab"
//                 eventKey="address-info"
//                 title="Address Information"
//               >
//                 <div className="forms">
//                   <h5>Address Information</h5>
//                   <div className="d-flex ">
//                     <Form.Group controlId="address">
//                       <Form.Label>Address</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Address"
//                         value={formData.address}
//                         onChange={(e) =>
//                           handleInputChange("address", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.address}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="city">
//                       <Form.Label>City</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="City"
//                         value={formData.city}
//                         onChange={(e) =>
//                           handleInputChange("city", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.city}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="state">
//                       <Form.Label>State</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="State"
//                         value={formData.state}
//                         onChange={(e) =>
//                           handleInputChange("state", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.state}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="zipCode">
//                       <Form.Label>Zip Code</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Zip Code"
//                         value={formData.zipCode}
//                         onChange={(e) =>
//                           handleInputChange("zipCode", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.zipCode}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="country">
//                       <Form.Label>Country</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Country"
//                         value={formData.country}
//                         onChange={(e) =>
//                           handleInputChange("country", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.country}
//                       </Form.Text>
//                     </Form.Group>
//                   </div>
//                 </div>
//               </Tab>
//               <Tab
//                 tabClassName="tab"
//                 eventKey="academic-info"
//                 title="Academic History"
//               >
//                 <div className="forms">
//                   <h5>Academic History</h5>
//                   <div className="d-flex">
//                     <Form.Group controlId="highSchoolName">
//                       <Form.Label>High School Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="High School Name"
//                         value={formData.highSchoolName}
//                         onChange={(e) =>
//                           handleInputChange("highSchoolName", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.highSchoolName}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="graduationYear">
//                       <Form.Label> Graduation Year</Form.Label>
//                       <Form.Control
//                         type="date"
//                         placeholder="Expected Graduation Year"
//                         value={formData.graduationYear}
//                         onChange={(e) =>
//                           handleInputChange("graduationYear", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.graduationYear}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="gpa">
//                       <Form.Label>High School GPA</Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="High School GPA"
//                         value={formData.gpa}
//                         onChange={(e) =>
//                           handleInputChange("gpa", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </div>
//                 </div>
//               </Tab>
//               <Tab
//                 tabClassName="tab"
//                 eventKey="test-scores"
//                 title="Test Scores"
//               >
//                 <div className="forms">
//                   <h5>Standardized Test Scores</h5>
//                   <Form.Group controlId="testScores">
//                     <Form.Label>Select Test Type</Form.Label>
//                     <Form.Control
//                       as="select"
//                       value={formData.testType}
//                       onChange={(e) =>
//                         handleInputChange("testType", e.target.value)
//                       }
//                       required
//                     >
//                       <option value="SAT">SAT</option>
//                       <option value="ACT">ACT</option>
//                       <option value="GRE">GRE</option>
//                       <option value="IELTS">IELTS</option>
//                       <option value="PTE">PTE</option>
//                     </Form.Control>
//                     <Form.Text className="text-danger">
//                       {formErrors.testType}
//                     </Form.Text>
//                     <Form.Label>Your Test Score</Form.Label>
//                     <Form.Control
//                       type="number"
//                       value={formData.testScores}
//                       onChange={(e) =>
//                         handleInputChange("testScores", e.target.value)
//                       }
//                       required
//                     />
//                   </Form.Group>
//                 </div>
//               </Tab>
//             </Tabs>
//             <div className="d-flex justify-content-between">
//               <Button
//                 variant="primary"
//                 type="button"
//                 onClick={handlePrevButtonClick}
//               >
//                 Previous
//               </Button>
//               <Button
//                 variant="primary"
//                 type="button"
//                 onClick={handleNextButtonClick}
//               >
//                 {activeTab === "test-scores" ? "Submit" : "Next"}
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Profile;

// import React, { useState } from "react";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import StudentSidebar from "./StudentSidebar";
// import axios from "axios";
// import Header from "../../../components/Header.jsx";
// import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("personal-info");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     gender: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//     highSchoolName: "",
//     graduationYear: "",
//     testType: "",
//     gpa: "",
//     testScores: "",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   const validateForm = () => {
//     const errors = {};

//     if (!formData.firstName.trim()) {
//       errors.firstName = "First Name is required";
//     }

//     if (!formData.lastName.trim()) {
//       errors.lastName = "Last Name is required";
//     }

//     // Add more validations for other fields...

//     if (activeTab === "test-scores") {
//       if (!formData.testType) {
//         errors.testType = "Test Type is required";
//       }

//       const testScores = parseFloat(formData.testScores);

//       if (isNaN(testScores) || testScores < 0 || testScores > 100) {
//         errors.testScores = "Test Score must be a number between 0 and 100";
//       }
//     }

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   const handleInputChange = (key, value) => {
//     if (key === "testScores") {
//       setFormData({ ...formData, [key]: value });
//     } else {
//       setFormData({ ...formData, [key]: value });
//       setFormErrors({ ...formErrors, [key]: "" });
//     }
//   };

//   const handlePrevButtonClick = () => {
//     const tabOrder = [
//       "personal-info",
//       "address-info",
//       "academic-info",
//       "test-scores",
//     ];
//     const currentTabIndex = tabOrder.indexOf(activeTab);

//     if (currentTabIndex !== -1 && currentTabIndex > 0) {
//       setActiveTab(tabOrder[currentTabIndex - 1]);
//     }
//   };

//   const handleNextButtonClick = () => {
//     const tabOrder = [
//       "personal-info",
//       "address-info",
//       "academic-info",
//       "test-scores",
//     ];
//     const currentTabIndex = tabOrder.indexOf(activeTab);

//     if (currentTabIndex !== -1 && currentTabIndex < tabOrder.length - 1) {
//       setActiveTab(tabOrder[currentTabIndex + 1]);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validateForm()) {
//       console.log("Form contains errors. Please review and correct.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("accessToken");
//       const userId = localStorage.getItem("userId");

//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };

//       const dataToSend = {
//         systemUser: userId,
//         ...formData,
//       };

//       console.log("Data to Send:", dataToSend);

//       const response = await axios.post(
//         "http://localhost:8080/student-profile/save",
//         dataToSend,
//         { headers }
//       );

//       console.log(response.data);

//       const tabOrder = [
//         "personal-info",
//         "address-info",
//         "academic-info",
//         "test-scores",
//       ];
//       const currentTabIndex = tabOrder.indexOf(activeTab);

//       if (currentTabIndex !== -1 && currentTabIndex < tabOrder.length - 1) {
//         setActiveTab(tabOrder[currentTabIndex + 1]);
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error("Server Error:", error.response.data);
//       } else if (error.request) {
//         console.error("No response from server");
//       } else {
//         console.error("Error:", error.message);
//       }
//     }
//   };
//   return (
//     <div>
//       <Header />
//       <div className="d-flex">
//         <StudentSidebar />

//         <div className="main-content flex-grow-1 p-4">
//           <StudentProfileBar />
//           <Form onSubmit={handleSubmit}>
//             <Tabs
//               defaultActiveKey="personal-info"
//               activeKey={activeTab}
//               onSelect={(key) => setActiveTab(key)}
//               className="profile-tabs"
//             >
//               <Tab
//                 tabClassName="tab"
//                 eventKey="personal-info"
//                 title="Personal Information"
//               >
//                 <div className="forms d-flex flex-column">
//                   <h5>Personal Information</h5>
//                   <div className="d-flex ">
//                     <Form.Group controlId="firstName">
//                       <Form.Label>First Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="First Name"
//                         value={formData.firstName}
//                         onChange={(e) =>
//                           handleInputChange("firstName", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.firstName}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="lastName">
//                       <Form.Label>Last Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Last Name"
//                         value={formData.lastName}
//                         onChange={(e) =>
//                           handleInputChange("lastName", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.lastName}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="dateOfBirth">
//                       <Form.Label>Date of Birth</Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={formData.dateOfBirth}
//                         onChange={(e) =>
//                           handleInputChange("dateOfBirth", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.dateOfBirth}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="gender">
//                       <Form.Label>Gender</Form.Label>
//                       <Form.Control
//                         as="select"
//                         value={formData.gender}
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
//                       <Form.Text className="text-danger">
//                         {formErrors.gender}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="phone">
//                       <Form.Label>Phone</Form.Label>
//                       <Form.Control
//                         type="tel"
//                         placeholder="Phone"
//                         value={formData.phone}
//                         onChange={(e) =>
//                           handleInputChange("phone", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.phone}
//                       </Form.Text>
//                     </Form.Group>
//                   </div>
//                 </div>
//               </Tab>
//               <Tab
//                 tabClassName="tab"
//                 eventKey="address-info"
//                 title="Address Information"
//               >
//                 <div className="forms">
//                   <h5>Address Information</h5>
//                   <div className="d-flex ">
//                     <Form.Group controlId="address">
//                       <Form.Label>Address</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Address"
//                         value={formData.address}
//                         onChange={(e) =>
//                           handleInputChange("address", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.address}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="city">
//                       <Form.Label>City</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="City"
//                         value={formData.city}
//                         onChange={(e) =>
//                           handleInputChange("city", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.city}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="state">
//                       <Form.Label>State</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="State"
//                         value={formData.state}
//                         onChange={(e) =>
//                           handleInputChange("state", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.state}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="zipCode">
//                       <Form.Label>Zip Code</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Zip Code"
//                         value={formData.zipCode}
//                         onChange={(e) =>
//                           handleInputChange("zipCode", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.zipCode}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="country">
//                       <Form.Label>Country</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Country"
//                         value={formData.country}
//                         onChange={(e) =>
//                           handleInputChange("country", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.country}
//                       </Form.Text>
//                     </Form.Group>
//                   </div>
//                 </div>
//               </Tab>
//               <Tab
//                 tabClassName="tab"
//                 eventKey="academic-info"
//                 title="Academic History"
//               >
//                 <div className="forms">
//                   <h5>Academic History</h5>
//                   <div className="d-flex">
//                     <Form.Group controlId="highSchoolName">
//                       <Form.Label>High School Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="High School Name"
//                         value={formData.highSchoolName}
//                         onChange={(e) =>
//                           handleInputChange("highSchoolName", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.highSchoolName}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="graduationYear">
//                       <Form.Label> Graduation Year</Form.Label>
//                       <Form.Control
//                         type="date"
//                         placeholder="Expected Graduation Year"
//                         value={formData.graduationYear}
//                         onChange={(e) =>
//                           handleInputChange("graduationYear", e.target.value)
//                         }
//                         required
//                       />
//                       <Form.Text className="text-danger">
//                         {formErrors.graduationYear}
//                       </Form.Text>
//                     </Form.Group>
//                     <Form.Group controlId="gpa">
//                       <Form.Label>High School GPA</Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="High School GPA"
//                         value={formData.gpa}
//                         onChange={(e) =>
//                           handleInputChange("gpa", e.target.value)
//                         }
//                         required
//                       />
//                     </Form.Group>
//                   </div>
//                 </div>
//               </Tab>
//               <Tab
//                 tabClassName="tab"
//                 eventKey="test-scores"
//                 title="Test Scores"
//               >
//                 <div className="forms">
//                   <h5>Standardized Test Scores</h5>
//                   <Form.Group controlId="testScores">
//                     <Form.Label>Select Test Type</Form.Label>
//                     <Form.Control
//                       as="select"
//                       value={formData.testType}
//                       onChange={(e) =>
//                         handleInputChange("testType", e.target.value)
//                       }
//                       required
//                     >
//                       <option value="SAT">SAT</option>
//                       <option value="ACT">ACT</option>
//                       <option value="GRE">GRE</option>
//                       <option value="IELTS">IELTS</option>
//                       <option value="PTE">PTE</option>
//                     </Form.Control>
//                     <Form.Text className="text-danger">
//                       {formErrors.testType}
//                     </Form.Text>
//                     <Form.Label>Your Test Score</Form.Label>
//                     <Form.Control
//                       type="number"
//                       value={formData.testScores}
//                       onChange={(e) =>
//                         handleInputChange("testScores", e.target.value)
//                       }
//                       required
//                     />
//                   </Form.Group>
//                 </div>
//               </Tab>
//             </Tabs>
//             <div className="d-flex justify-content-between">
//               <Button
//                 variant="primary"
//                 type="button"
//                 onClick={handlePrevButtonClick}
//               >
//                 Previous
//               </Button>
//               <Button
//                 variant="primary"
//                 type="button"
//                 onClick={handleNextButtonClick}
//               >
//                 {activeTab === "test-scores" ? "Submit" : "Next"}
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Profile;

import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Header from "../../../components/Header.jsx";
import StudentSidebar from "./StudentSidebar";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal-info");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    highSchoolName: "",
    graduationYear: "",
    gpa: "",
    testType: "",
    testScores: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
    } else {
      const dateOfBirth = new Date(formData.dateOfBirth);
      const currentDate = new Date();

      if (dateOfBirth >= currentDate) {
        errors.dateOfBirth = "Date of Birth must be in the past";
      }
    }

    if (!formData.gender) {
      errors.gender = "Gender is required";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = "Invalid phone number. Please enter a 10-digit number.";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    if (!formData.state.trim()) {
      errors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      errors.zipCode = "Zip Code is required";
    } else if (!/^\d{5}$/.test(formData.zipCode.trim())) {
      errors.zipCode = "Invalid Zip Code. Please enter a 5-digit number.";
    }

    if (!formData.country.trim()) {
      errors.country = "Country is required";
    }

    if (!formData.highSchoolName.trim()) {
      errors.highSchoolName = "High School Name is required";
    }

    if (!formData.graduationYear) {
      errors.graduationYear = "Graduation Year is required";
    } else {
      const graduationYear = new Date(formData.graduationYear);
      const currentYear = new Date().getFullYear();

      if (graduationYear.getFullYear() <= currentYear) {
        errors.graduationYear = "Graduation Year must be in the future";
      }
    }

    if (!formData.gpa.trim()) {
      errors.gpa = "High School GPA is required";
    } else {
      const gpaValue = parseFloat(formData.gpa);
      if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
        errors.gpa = "Invalid GPA. Please enter a number between 0 and 4.";
      }
    }

    if (activeTab === "test-scores") {
      console.log("Checking testType and testScores");
      console.log("testType:", formData.testType);
      console.log("testScores:", formData.testScores);

      if (!formData.testType) {
        errors.testType = "Test Type is required";
      }

      if (!formData.testScores.trim()) {
        errors.testScores = "Test Score is required";
      } else {
        const testScores = parseFloat(formData.testScores);

        if (isNaN(testScores) || testScores < 0 || testScores > 100) {
          errors.testScores = "Test Score must be a number between 0 and 100";
        }
      }
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (key, value) => {
    if (key === "testScores") {
      setFormData({ ...formData, [key]: value });
    } else {
      setFormData({ ...formData, [key]: value });
      setFormErrors({ ...formErrors, [key]: "" });
    }
  };

  const handlePrevButtonClick = () => {
    const tabOrder = [
      "personal-info",
      "address-info",
      "academic-info",
      "test-scores",
    ];
    const currentTabIndex = tabOrder.indexOf(activeTab);

    if (currentTabIndex !== -1 && currentTabIndex > 0) {
      setActiveTab(tabOrder[currentTabIndex - 1]);
    }
  };

  const handleNextButtonClick = () => {
    console.log("Next button clicked");

    const tabOrder = [
      "personal-info",
      "address-info",
      "academic-info",
      "test-scores",
    ];

    // Get the current tab index based on the active tab
    const currentTabIndex = tabOrder.indexOf(activeTab);
    console.log("Current Tab Index:", currentTabIndex);

    if (currentTabIndex !== -1 && currentTabIndex < tabOrder.length - 1) {
      // Check if the form is valid before moving to the next tab
      if (validateForm()) {
        // Check if the next action is a regular "Next" or a "Submit"
        const isSubmitAction = currentTabIndex === tabOrder.length - 2;

        if (isSubmitAction) {
          // If it's a "Submit", call the handleSubmit function
          handleSubmit();
        } else {
          // If it's a regular "Next", move to the next tab
          setActiveTab(tabOrder[currentTabIndex + 1]);
        }
      } else {
        console.log("Form contains errors. Please review and correct.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call validateForm before submitting the form
    if (!validateForm()) {
      console.log("Form contains errors. Please review and correct.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const formattedDateOfBirth = new Date(formData.dateOfBirth)
        .toISOString()
        .split("T")[0];
      const formattedGraduationYear = new Date(formData.graduationYear)
        .toISOString()
        .split("T")[0];

      const dataToSend = {
        systemUser: userId,
        ...formData,
        dateOfBirth: formattedDateOfBirth,
        graduationYear: formattedGraduationYear,
      };

      console.log("Data to Send:", dataToSend);

      const response = await axios.post(
        "http://localhost:8080/student-profile/save",
        dataToSend,
        { headers }
      );

      console.log("Server Response:", response.data);

      if (response.status === 200) {
        // Submission was successful
        console.log("Form submitted successfully");

        // Assuming you want to move to the next tab after successful submission
        const tabOrder = [
          "personal-info",
          "address-info",
          "academic-info",
          "test-scores",
        ];
        const currentTabIndex = tabOrder.indexOf(activeTab);

        if (currentTabIndex !== -1 && currentTabIndex < tabOrder.length - 1) {
          setActiveTab(tabOrder[currentTabIndex + 1]);
        } else {
          // Optionally, you may redirect to another page or perform additional actions
          console.log("Form submitted, but no next tab available.");
        }

        // Reset formErrors and submissionError on successful submission
        setFormErrors({});
      } else {
        // Server returned an error
        console.error("Server Error:", response.data);

        // Set submissionError to true to indicate a submission failure
        setSubmissionError(true);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }

      // Set submissionError to true to indicate a submission failure
      setSubmissionError(true);
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <StudentSidebar />

        <div className="main-content flex-grow-1 p-4">
          <StudentProfileBar />
          <Form onSubmit={handleSubmit}>
            <Tabs
              defaultActiveKey="personal-info"
              activeKey={activeTab}
              onSelect={(key) => setActiveTab(key)}
              className="profile-tabs"
            >
              <Tab
                tabClassName="tab"
                eventKey="personal-info"
                title="Personal Information"
              >
                <div className="forms d-flex flex-column">
                  <h5>Personal Information</h5>
                  <div className="d-flex ">
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        required
                      />
                      <Form.Text className="text-danger">
                        {formErrors.firstName}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        required
                      />
                      <Form.Text className="text-danger">
                        {formErrors.lastName}
                      </Form.Text>
                    </Form.Group>
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
                      <Form.Text className="text-danger">
                        {formErrors.dateOfBirth}
                      </Form.Text>
                    </Form.Group>
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
                      <Form.Text className="text-danger">
                        {formErrors.gender}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                      />
                      <Form.Text className="text-danger">
                        {formErrors.phone}
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>
              </Tab>
              <Tab
                tabClassName="tab"
                eventKey="address-info"
                title="Address Information"
              >
                <div className="forms">
                  <h5>Address Information</h5>
                  <div className="d-flex ">
                    <Form.Group controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        required
                      />
                      <Form.Text className="text-danger">
                        {formErrors.address}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        required
                      />
                      <Form.Text className="text-danger">
                        {formErrors.city}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        required
                      />
                      <Form.Text className="text-danger">
                        {formErrors.state}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="zipCode">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Zip Code"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        required
                      />
                      <Form.Text className="text-danger">
                        {formErrors.zipCode}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Country"
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        required
                      />
                      <Form.Text className="text-danger">
                        {formErrors.country}
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>
              </Tab>
              <Tab
                tabClassName="tab"
                eventKey="academic-info"
                title="Academic History"
              >
                <div className="forms">
                  <h5>Academic History</h5>
                  <div className="d-flex">
                    <Form.Group controlId="highSchoolName">
                      <Form.Label>High School Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="High School Name"
                        value={formData.highSchoolName}
                        onChange={(e) =>
                          handleInputChange("highSchoolName", e.target.value)
                        }
                        required
                      />
                      <Form.Text className="text-danger">
                        {formErrors.highSchoolName}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="graduationYear">
                      <Form.Label> Graduation Year</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Expected Graduation Year"
                        value={formData.graduationYear}
                        onChange={(e) =>
                          handleInputChange("graduationYear", e.target.value)
                        }
                        required
                      />
                      <Form.Text className="text-danger">
                        {formErrors.graduationYear}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="gpa">
                      <Form.Label>High School GPA</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="High School GPA"
                        value={formData.gpa}
                        onChange={(e) =>
                          handleInputChange("gpa", e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </div>
                </div>
              </Tab>
              <Tab
                tabClassName="tab"
                eventKey="test-scores"
                title="Test Scores"
              >
                <div className="forms">
                  <h5>Standardized Test Scores</h5>
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
                    <Form.Text className="text-danger">
                      {formErrors.testType}
                    </Form.Text>
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
                </div>
              </Tab>
            </Tabs>
            <div className="d-flex justify-content-between">
              <Button
                variant="primary"
                type="button"
                onClick={handlePrevButtonClick}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={handleNextButtonClick}
              >
                {activeTab === "test-scores" ? "Submit" : "Next"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
