// // // MyProfile.jsx
// // import React, { useState, useEffect } from 'react';
// // import { Container, Form, Button } from 'react-bootstrap';
// // import axios from 'axios';
// // import Header from "../../../components/Header.jsx";
// // import StudentSidebar from "./StudentSidebar.jsx";
// // import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

// // export default function MyProfile() {
// //     const [profileData, setProfileData] = useState({
// //         studentProfileId: null,
// //         systemUserId: null,
// //         // Section A
// //         firstName: "",
// //         middleName: "",
// //         lastName: "",
// //         phoneNumber: "",
// //         emailAddress: "",
// //         gender: "",
// //         dateOfBirth: "",
// //         fullAddress: "",
// //         // Section B
// //         country: "",
// //         city: "",
// //         state: "",
// //         zipCode: "",
// //         // Section C
// //         interestedCountry: "",
// //         primaryUniversity: "",
// //         secondaryUniversity: "",
// //         interestedCourse: "",

// //         // Section D
// //         testScores: "",
// //         testType: "",

// //         // Section E
// //         previousSchoolLevel: "",
// //         previousSchoolGpa: "",
// //         graduationDate: "",
// //         background: "",

// //         // Section F
// //         reference: "",
// //         notes: "",
// //         // Add other fields from StudentProfile entity here
// //     });

// //     const [isEditMode, setIsEditMode] = useState(false);

// //     const fetchProfileData = async () => {
// //         try {
// //             const response = await axios.get(`http://localhost:8080/student-profile/getByUserId/${localStorage.getItem('userId')}`, {
// //                 headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
// //             });

// //             console.log('Fetched:::', response.data);

// //             if (response.data && response.data.length > 0) {
// //                 // Assuming the API returns an array of profiles, use the first profile
// //                 setProfileData(response.data[0]);
// //                 setIsEditMode(true); // Enable edit mode if data is fetched
// //             }
// //         } catch (error) {
// //             console.error('Error fetching profile data:', error);
// //         }
// //     };

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setProfileData({ ...profileData, [name]: value });
// //     };

// //     const handleSaveOrUpdateProfile = () => {
// //         // Add systemUserId to the profileData
// //         const updatedProfileData = { ...profileData, systemUserId: localStorage.getItem('userId') };

// //         if (isEditMode) {
// //             // Update existing profile
// //             axios
// //                 .put(`http://localhost:8080/student-profile/update/${localStorage.getItem('userId')}`, updatedProfileData, {
// //                     headers: {
// //                         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
// //                     },
// //                 })
// //                 .then((response) => {
// //                     console.log('Profile updated successfully:', response.data);
// //                     // Optionally, you can disable edit mode after successful update
// //                     // setIsEditMode(false);
// //                 })
// //                 .catch((error) => {
// //                     console.error('Error updating profile:', error);
// //                 });
// //         } else {
// //             // Save new profile
// //             axios
// //                 .post('http://localhost:8080/student-profile/save', updatedProfileData, {
// //                     headers: {
// //                         Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
// //                     },
// //                 })
// //                 .then((response) => {
// //                     console.log('Profile saved successfully:', response.data);
// //                     setIsEditMode(true); // Enable edit mode after successful save
// //                 })
// //                 .catch((error) => {
// //                     console.error('Error saving profile:', error);
// //                 });
// //         }
// //     };

// //     useEffect(() => {
// //         if (localStorage.getItem('userId')) {
// //             fetchProfileData();
// //         }
// //     }, [localStorage.getItem('userId')]);

// //     return (
// //         <div>
// //             <Header />
// //             <div className="d-flex">
// //                 <StudentSidebar />
// //         <Container fluid className="m-2">
// //             <StudentProfileBar />
// //             <h2>My Profile</h2>
// //             <Form>
// //                 <Form.Group controlId="formFirstName">
// //                     <Form.Label>First Name</Form.Label>
// //                     <Form.Control type="text" name="firstName" value={profileData.firstName} onChange={handleInputChange} />
// //                 </Form.Group>
// //                 <Form.Group controlId="formMiddleName">
// //                     <Form.Label>Middle Name</Form.Label>
// //                     <Form.Control type="text" name="middleName" value={profileData.middleName} onChange={handleInputChange} />
// //                 </Form.Group>
// //                 <Form.Group controlId="formLastName">
// //                     <Form.Label>Last Name</Form.Label>
// //                     <Form.Control type="text" name="lastName" value={profileData.lastName} onChange={handleInputChange} />
// //                 </Form.Group>

// //                 <Form.Group controlId="formDateOfBirth">
// //                     <Form.Label>Date of Birth</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         name="dateOfBirth"
// //                         value={profileData.dateOfBirth}
// //                         onChange={handleInputChange}
// //                     />
// //                 </Form.Group>

// //                 <Form.Group controlId="formGender">
// //                     <Form.Label>Gender</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         name="gender"
// //                         value={profileData.gender}
// //                         onChange={handleInputChange}
// //                     />
// //                 </Form.Group>

// //                 <Form.Group controlId="formPhoneNumber">
// //                     <Form.Label>Phone Number</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         name="phoneNumber"
// //                         value={profileData.phoneNumber}
// //                         onChange={handleInputChange}
// //                     />
// //                 </Form.Group>

// //                 <Form.Group controlId="formEmailAddress">
// //                     <Form.Label>Email Address</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         name="emailAddress"
// //                         value={profileData.emailAddress}
// //                         onChange={handleInputChange}
// //                     />
// //                 </Form.Group>

// //                 <Form.Group controlId="formFullAddress">
// //                     <Form.Label>Full Address</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         name="fullAddress"
// //                         value={profileData.fullAddress}
// //                         onChange={handleInputChange}
// //                     />
// //                 </Form.Group>

// //                 <Form.Group controlId="formCountry">
// //                     <Form.Label>Country</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         name="country"
// //                         value={profileData.country}
// //                         onChange={handleInputChange}
// //                     />
// //                 </Form.Group>

// //                 <Form.Group controlId="formCity">
// //                     <Form.Label>City</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         name="city"
// //                         value={profileData.city}
// //                         onChange={handleInputChange}
// //                     />
// //                 </Form.Group>

// //                 <Form.Group controlId="formZipCode">
// //                     <Form.Label>Zip Code</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         name="zipCode"
// //                         value={profileData.zipCode}
// //                         onChange={handleInputChange}
// //                     />
// //                 </Form.Group>

// //                 {/* Continue adding form groups for other fields */}

// //                 {isEditMode ? (
// //                     <Button variant="primary" onClick={handleSaveOrUpdateProfile}>
// //                         Update Profile
// //                     </Button>
// //                 ) : (
// //                     <Button variant="primary" onClick={handleSaveOrUpdateProfile}>
// //                         Save Profile
// //                     </Button>
// //                 )}

// //             </Form>
// //         </Container>
// //             </div></div>
// //     );
// // }

// // MyProfile.jsx
// import React, { useState, useEffect } from "react";
// import { Container, Form, Button } from "react-bootstrap";
// import axios from "axios";
// import Header from "../../../components/Header.jsx";
// import StudentSidebar from "./StudentSidebar.jsx";
// import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

// export default function MyProfile() {
//   const [profileData, setProfileData] = useState({
//     studentProfileId: null,
//     systemUserId: null,
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
//     // Add other fields from StudentProfile entity here
//   });

//   const [isEditMode, setIsEditMode] = useState(false);

//   const fetchProfileData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/student-profile/getByUserId/${localStorage.getItem(
//           "userId"
//         )}`,
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("accessToken"),
//           },
//         }
//       );

//       console.log("Fetched:::", response.data);

//       if (response.data && response.data.length > 0) {
//         // Assuming the API returns an array of profiles, use the first profile
//         setProfileData(response.data[0]);
//         setIsEditMode(true); // Enable edit mode if data is fetched
//       }
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({ ...profileData, [name]: value });
//   };

//   const handleSaveOrUpdateProfile = () => {
//     // Add systemUserId to the profileData
//     const updatedProfileData = {
//       ...profileData,
//       systemUserId: localStorage.getItem("userId"),
//     };

//     if (isEditMode) {
//       // Update existing profile
//       axios
//         .put(
//           `http://localhost:8080/student-profile/update/${localStorage.getItem(
//             "userId"
//           )}`,
//           updatedProfileData,
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("accessToken"),
//             },
//           }
//         )
//         .then((response) => {
//           console.log("Profile updated successfully:", response.data);
//           // Optionally, you can disable edit mode after successful update
//           // setIsEditMode(false);
//         })
//         .catch((error) => {
//           console.error("Error updating profile:", error);
//         });
//     } else {
//       // Save new profile
//       axios
//         .post(
//           "http://localhost:8080/student-profile/save",
//           updatedProfileData,
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("accessToken"),
//             },
//           }
//         )
//         .then((response) => {
//           console.log("Profile saved successfully:", response.data);
//           setIsEditMode(true); // Enable edit mode after successful save
//         })
//         .catch((error) => {
//           console.error("Error saving profile:", error);
//         });
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("userId")) {
//       fetchProfileData();
//     }
//   }, [localStorage.getItem("userId")]);

//   return (
//     <div>
//       <div className="d-flex" style={{ marginTop: 50 }}>
//         {/* <StudentSidebar /> */}
//         <Container fluid className="m-2">
//           {/* <StudentProfileBar /> */}
//           <center>
//             <h2 style={{ marginBottom: 20, color: "green" }}>My Profile</h2>
//           </center>
//           <Form>
//             <div
//               className="personal-details"
//               style={{ display: "flex", justifyContent: "space-evenly" }}
//             >
//               <Form.Group
//                 controlId="formFirstName"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">First Name</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="firstName"
//                   placeholder="First Name"
//                   value={profileData.firstName}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group
//                 controlId="formMiddleName"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Middle Name</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="middleName"
//                   placeholder="Middle Name"
//                   value={profileData.middleName}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formLastName" style={{ flex: 1 }}>
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Last Name</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="lastName"
//                   placeholder="Last Name"
//                   value={profileData.lastName}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </div>

//             <div
//               className="personal-details"
//               style={{ display: "flex", justifyContent: "space-evenly" }}
//             >
//               <Form.Group
//                 controlId="formDateOfBirth"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Date of Birth</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="date"
//                   name="dateOfBirth"
//                   value={profileData.dateOfBirth}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group
//                 controlId="formGender"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   <Form.Label className="form-label">Gender</Form.Label>
//                 </center>
//                 <Form.Select
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   name="gender"
//                   value={profileData.gender}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group controlId="formPhoneNumber" style={{ flex: 1 }}>
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Phone Number</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="tel"
//                   name="phoneNumber"
//                   value={profileData.phoneNumber}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//               <Form.Group
//                 controlId="formEmailAddress"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Email Address</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="email"
//                   name="emailAddress"
//                   placeholder="Email"
//                   value={profileData.emailAddress}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group
//                 controlId="formFullAddress"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Full Address</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="fullAddress"
//                   placeholder="Full Address"
//                   value={profileData.fullAddress}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formCountry" style={{ flex: 1 }}>
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Country</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="country"
//                   placeholder="Country"
//                   value={profileData.country}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <Form.Group
//                 controlId="formCity"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">City</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={profileData.city}
//                   onChange={handleInputChange}
//                   className="form-input"
//                 />
//               </Form.Group>

//               <Form.Group controlId="formZipCode" style={{ flex: 1 }}>
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Zip Code</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="number"
//                   name="zipCode"
//                   placeholder="Zip Code"
//                   value={profileData.zipCode}
//                   onChange={handleInputChange}
//                   className="form-input"
//                 />
//               </Form.Group>
//             </div>

//             {/* Continue adding form groups for other fields */}

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginTop: 40,
//               }}
//             >
//               {isEditMode ? (
//                 <Button
//                   variant="primary"
//                   onClick={handleSaveOrUpdateProfile}
//                   style={{
//                     backgroundColor: "#007bff",
//                     color: "#fff",
//                     border: "none",
//                     padding: "10px 20px",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "background-color 0.3s ease",
//                   }}
//                 >
//                   Update Profile
//                 </Button>
//               ) : (
//                 <Button
//                   variant="primary"
//                   onClick={handleSaveOrUpdateProfile}
//                   style={{
//                     backgroundColor: "#28a745",
//                     color: "#fff",
//                     border: "none",
//                     padding: "10px 20px",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "background-color 0.3s ease",
//                     fontWeight: "bold",
//                     fontSize: 20,
//                   }}
//                 >
//                   Save Profile
//                 </Button>
//               )}
//             </div>
//           </Form>
//         </Container>
//       </div>
//     </div>
//   );
// }

// MyProfile.jsx

// import React, { useState, useEffect } from "react";
// import { Container, Form, Button } from "react-bootstrap";
// import axios from "axios";
// import "./MyProfile.css";
// import Header from "../../../components/Header.jsx";
// import StudentSidebar from "./StudentSidebar.jsx";
// import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

// export default function MyProfile() {
//   const [profileData, setProfileData] = useState({
//     studentProfileId: null,
//     systemUserId: null,
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
//     // Add other fields from StudentProfile entity here
//   });

//   const [isEditMode, setIsEditMode] = useState(false);

//   const fetchProfileData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/student-profile/getByUserId/${localStorage.getItem(
//           "userId"
//         )}`,
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("accessToken"),
//           },
//         }
//       );

//       console.log("Fetched:::", response.data);

//       if (response.data && response.data.length > 0) {
//         // Assuming the API returns an array of profiles, use the first profile
//         setProfileData(response.data[0]);
//         setIsEditMode(true); // Enable edit mode if data is fetched
//       }
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({ ...profileData, [name]: value });
//   };

//   const handleSaveOrUpdateProfile = () => {
//     // Add systemUserId to the profileData
//     const updatedProfileData = {
//       ...profileData,
//       systemUserId: localStorage.getItem("userId"),
//     };

//     if (isEditMode) {
//       // Update existing profile
//       axios
//         .put(
//           `http://localhost:8080/student-profile/update/${localStorage.getItem(
//             "userId"
//           )}`,
//           updatedProfileData,
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("accessToken"),
//             },
//           }
//         )
//         .then((response) => {
//           console.log("Profile updated successfully:", response.data);
//           // Optionally, you can disable edit mode after successful update
//           // setIsEditMode(false);
//         })
//         .catch((error) => {
//           console.error("Error updating profile:", error);
//         });
//     } else {
//       // Save new profile
//       axios
//         .post(
//           "http://localhost:8080/student-profile/save",
//           updatedProfileData,
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("accessToken"),
//             },
//           }
//         )
//         .then((response) => {
//           console.log("Profile saved successfully:", response.data);
//           setIsEditMode(true); // Enable edit mode after successful save
//         })
//         .catch((error) => {
//           console.error("Error saving profile:", error);
//         });
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("userId")) {
//       fetchProfileData();
//     }
//   }, [localStorage.getItem("userId")]);

//   return (
//     <div>
//       <Header />
//       <div className="d-flex" style={{ marginTop: 50 }}>
//         <StudentSidebar />
//         <Container fluid className="m-2">
//           <StudentProfileBar />
//           <center>
//             <h2 style={{ marginBottom: 20, color: "green" }}>My Profile</h2>
//           </center>
//           <Form>
//             <div
//               className="personal-details"
//               style={{ display: "flex", justifyContent: "space-evenly" }}
//             >
//               <Form.Group
//                 controlId="formFirstName"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">First Name</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="firstName"
//                   placeholder="First Name"
//                   value={profileData.firstName}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group
//                 controlId="formMiddleName"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Middle Name</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="middleName"
//                   placeholder="Middle Name"
//                   value={profileData.middleName}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formLastName" style={{ flex: 1 }}>
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Last Name</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="lastName"
//                   placeholder="Last Name"
//                   value={profileData.lastName}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </div>

//             <div
//               className="personal-details"
//               style={{ display: "flex", justifyContent: "space-evenly" }}
//             >
//               <Form.Group
//                 controlId="formDateOfBirth"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Date of Birth</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="date"
//                   name="dateOfBirth"
//                   value={profileData.dateOfBirth}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group
//                 controlId="formGender"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   <Form.Label className="form-label">Gender</Form.Label>
//                 </center>
//                 <Form.Select
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   name="gender"
//                   value={profileData.gender}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </Form.Select>
//               </Form.Group>

//               <Form.Group controlId="formPhoneNumber" style={{ flex: 1 }}>
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Phone Number</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="tel"
//                   name="phoneNumber"
//                   placeholder="Phone"
//                   value={profileData.phoneNumber}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//               <Form.Group
//                 controlId="formEmailAddress"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Email Address</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="email"
//                   name="emailAddress"
//                   placeholder="Email"
//                   value={profileData.emailAddress}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group
//                 controlId="formFullAddress"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Full Address</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="fullAddress"
//                   placeholder="Full Address"
//                   value={profileData.fullAddress}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formCountry" style={{ flex: 1 }}>
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Country</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="country"
//                   placeholder="Country"
//                   value={profileData.country}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <Form.Group
//                 controlId="formCity"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">City</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={profileData.city}
//                   onChange={handleInputChange}
//                   className="form-input"
//                 />
//               </Form.Group>

//               <Form.Group controlId="formZipCode" style={{ flex: 1 }}>
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Zip Code</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="number"
//                   name="zipCode"
//                   placeholder="Zip Code"
//                   value={profileData.zipCode}
//                   onChange={handleInputChange}
//                   className="form-input"
//                 />
//               </Form.Group>
//             </div>

//             {/* Continue adding form groups for other fields */}

//             <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//               <Form.Group
//                 controlId="formInterestedCountry"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">
//                     Interested Country
//                   </Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="interestedCountry"
//                   placeholder="Interested Country"
//                   value={profileData.interestedCountry}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group
//                 controlId="formPrimaryUniversity"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">
//                     Primary University
//                   </Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="primaryUniversity"
//                   placeholder="Primary University"
//                   value={profileData.primaryUniversity}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group
//                 controlId="formSecondaryUniversity"
//                 style={{ flex: 1 }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">
//                     Secondary University
//                   </Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="secondaryUniversity"
//                   placeholder="Secondary University"
//                   value={profileData.secondaryUniversity}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//               <Form.Group
//                 controlId="formInterestedCourse"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">
//                     Interested Course
//                   </Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="interestedCourse"
//                   placeholder="Interested Course"
//                   value={profileData.interestedCourse}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group
//                 controlId="formTestScores"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Test Scores</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="number"
//                   name="testScores"
//                   placeholder="Test Scores"
//                   value={profileData.testScores}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formTestType" style={{ flex: 1 }}>
//                 <center>
//                   <Form.Label className="form-label">Test Type</Form.Label>
//                 </center>
//                 <Form.Select
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   name="testType"
//                   value={profileData.testType}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">Select Test Type</option>
//                   <option value="toefel">Toefel</option>
//                   <option value="ielts">IELTS</option>
//                   <option value="sat">SAT</option>
//                   <option value="gre">GRE</option>
//                   <option value="pte">PTE</option>
//                   <option value="duolingo">Duolingo</option>
//                 </Form.Select>
//               </Form.Group>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//               <Form.Group
//                 controlId="formPreviousSchoolLevel"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">
//                     Previous School Level
//                   </Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="text"
//                   name="previousSchoolLevel"
//                   placeholder="Previous School Level"
//                   value={profileData.previousSchoolLevel}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group
//                 controlId="formPreviousSchoolGPA"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">
//                     Previous School GPA
//                   </Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="number"
//                   name="previousSchoolGPA"
//                   placeholder="GPA"
//                   value={profileData.previousSchoolGpa}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formGraduationDate" style={{ flex: 1 }}>
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">
//                     Graduation Date
//                   </Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="date"
//                   name="graduationDate"
//                   placeholder="Graduation Date"
//                   value={profileData.graduationDate}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <Form.Group
//                 controlId="formReference"
//                 style={{ flex: 1, marginRight: "20px" }}
//               >
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Reference</Form.Label>
//                 </center>
//                 <Form.Select
//                   style={{
//                     height: 50,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   name="reference"
//                   value={profileData.reference}
//                   onChange={handleInputChange}
//                 >
//                   <option value="">Select Reference</option>
//                   <option value="socialMedia">Social Media</option>
//                   <option value="friend">Friend</option>
//                   <option value="television">Television</option>
//                   <option value="newspaper">Newspaper</option>
//                 </Form.Select>
//               </Form.Group>
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <Form.Group controlId="formReference" style={{ flex: 1 }}>
//                 <center>
//                   {" "}
//                   <Form.Label className="form-label">Notes</Form.Label>
//                 </center>
//                 <Form.Control
//                   style={{
//                     height: 150,
//                     margin: 10,
//                     border: "2px solid gray",
//                     borderRadius: 5,
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "box-shadow 0.3s ease",
//                   }}
//                   type="textarea"
//                   name="notes"
//                   placeholder="Please Leave your Notes Here"
//                   value={profileData.notes}
//                   onChange={handleInputChange}
//                 />
//               </Form.Group>
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginTop: 40,
//               }}
//             >
//               {isEditMode ? (
//                 <Button
//                   variant="primary"
//                   onClick={handleSaveOrUpdateProfile}
//                   style={{
//                     backgroundColor: "#007bff",
//                     color: "#fff",
//                     border: "none",
//                     padding: "10px 20px",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "background-color 0.3s ease",
//                   }}
//                 >
//                   Update Profile
//                 </Button>
//               ) : (
//                 <Button
//                   variant="primary"
//                   onClick={handleSaveOrUpdateProfile}
//                   style={{
//                     backgroundColor: "#28a745",
//                     color: "#fff",
//                     border: "none",
//                     padding: "10px 20px",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                     transition: "background-color 0.3s ease",
//                     fontWeight: "bold",
//                     fontSize: 20,
//                   }}
//                 >
//                   Save Profile
//                 </Button>
//               )}
//             </div>
//           </Form>
//         </Container>
//       </div>
//     </div>
//   );
// }

// MyProfile.jsx
import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./MyProfile.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { jsx } from "@emotion/react";
import Header from "../../../components/Header.jsx";
import StudentSidebar from "./StudentSidebar.jsx";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

export default function MyProfile() {
  const [profileData, setProfileData] = useState({
    studentProfileId: null,
    systemUserId: null,
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
    city: "",
    state: "",
    zipCode: "",
    // Section C
    interestedCountry: "",
    primaryUniversity: "",
    secondaryUniversity: "",
    interestedCourse: "",

    // Section D
    testScores: "",
    testType: "",

    // Section E
    previousSchoolLevel: "",
    previousSchoolGpa: "",
    graduationDate: "",
    background: "",

    // Section F
    reference: "",
    notes: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
  };

  const handleNext = () => {
    setCurrentTab((prevTab) => (prevTab === 5 ? 0 : prevTab + 1));
  };

  const handlePrevious = () => {
    setCurrentTab((prevTab) => (prevTab === 0 ? 5 : prevTab - 1));
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/student-profile/getByUserId/${localStorage.getItem(
          "userId"
        )}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      console.log("Fetched:::", response.data);

      if (response.data && response.data.length > 0) {
        // Assuming the API returns an array of profiles, use the first profile
        setProfileData(response.data[0]);
        setIsEditMode(true); // Enable edit mode if data is fetched
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSaveOrUpdateProfile = () => {
    // Add systemUserId to the profileData
    const updatedProfileData = {
      ...profileData,
      systemUserId: localStorage.getItem("userId"),
    };

    if (isEditMode) {
      // Update existing profile
      axios
        .put(
          `http://localhost:8080/student-profile/update/${localStorage.getItem(
            "userId"
          )}`,
          updatedProfileData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          console.log("Profile updated successfully:", response.data);
          // Optionally, you can disable edit mode after successful update
          // setIsEditMode(false);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else {
      // Save new profile
      axios
        .post(
          "http://localhost:8080/student-profile/save",
          updatedProfileData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          console.log("Profile saved successfully:", response.data);
          setIsEditMode(true); // Enable edit mode after successful save
        })
        .catch((error) => {
          console.error("Error saving profile:", error);
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      fetchProfileData();
    }
  }, [localStorage.getItem("userId")]);

  return (
    <div>
      <Header />
      <div className="d-flex" style={{ marginTop: 50 }}>
        <StudentSidebar />
        <Container fluid className="m-2">
          <StudentProfileBar />
          <center>
            <h2 style={{ marginBottom: 20, color: "green" }}>My Profile</h2>
          </center>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Personal Details" />
              <Tab label="Full Address" />
              <Tab label="Personal Preferences" />
              <Tab label="Education" />
              <Tab label="Tests" />
              <Tab label="References And Notes" />

              {/* Add more tabs as needed */}
            </Tabs>
          </Box>{" "}
          <Form>
            {currentTab === 0 && (
              // Personal Details Tab
              <div>
                <div style={{}}>
                  <div
                    className="personal-details"
                    style={{
                      display: "flex",

                      justifyContent: "space-evenly",
                    }}
                  >
                    <Form.Group
                      controlId="formFirstName"
                      style={{ flex: 1, marginRight: "20px" }}
                    >
                      <center>
                        <Form.Label className="form-label">
                          First Name
                        </Form.Label>
                      </center>
                      <Form.Control
                        style={{
                          height: 50,
                          margin: 10,
                          border: "2px solid gray",
                          borderRadius: 5,
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "box-shadow 0.3s ease",
                        }}
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="formMiddleName"
                      style={{ flex: 1, marginRight: "20px" }}
                    >
                      <center>
                        <Form.Label className="form-label">
                          Middle Name
                        </Form.Label>
                      </center>
                      <Form.Control
                        style={{
                          height: 50,
                          margin: 10,
                          border: "2px solid gray",
                          borderRadius: 5,
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "box-shadow 0.3s ease",
                        }}
                        type="text"
                        name="middleName"
                        placeholder="Middle Name"
                        value={profileData.middleName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formLastName" style={{ flex: 1 }}>
                      <center>
                        <Form.Label className="form-label">
                          Last Name
                        </Form.Label>
                      </center>
                      <Form.Control
                        style={{
                          height: 50,
                          margin: 10,
                          border: "2px solid gray",
                          borderRadius: 5,
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "box-shadow 0.3s ease",
                        }}
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>

                  <div
                    className="personal-details"
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Form.Group
                      controlId="formDateOfBirth"
                      style={{ flex: 1, marginRight: "20px" }}
                    >
                      <center>
                        <Form.Label className="form-label">
                          Date of Birth
                        </Form.Label>
                      </center>
                      <Form.Control
                        style={{
                          height: 50,
                          margin: 10,
                          border: "2px solid gray",
                          borderRadius: 5,
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "box-shadow 0.3s ease",
                        }}
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="formGender"
                      style={{ flex: 1, marginRight: "20px" }}
                    >
                      <center>
                        <Form.Label className="form-label">Gender</Form.Label>
                      </center>
                      <Form.Select
                        style={{
                          height: 50,
                          margin: 10,
                          border: "2px solid gray",
                          borderRadius: 5,
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "box-shadow 0.3s ease",
                        }}
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formPhoneNumber" style={{ flex: 1 }}>
                      <center>
                        <Form.Label className="form-label">
                          Phone Number
                        </Form.Label>
                      </center>
                      <Form.Control
                        style={{
                          height: 50,
                          margin: 10,
                          border: "2px solid gray",
                          borderRadius: 5,
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          transition: "box-shadow 0.3s ease",
                        }}
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone"
                        value={profileData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Form.Group
                    controlId="formEmailAddress"
                    style={{ flex: 1, marginRight: "20px" }}
                  >
                    <center>
                      <Form.Label className="form-label">
                        Email Address
                      </Form.Label>
                    </center>
                    <Form.Control
                      style={{
                        height: 50,
                        margin: 10,
                        border: "2px solid gray",
                        borderRadius: 5,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      type="email"
                      name="emailAddress"
                      placeholder="Email"
                      value={profileData.emailAddress}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>
              </div>
            )}

            {currentTab === 1 && (
              // Full Address
              <div>
                <div
                  className="personal-details"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Form.Group
                    controlId="formFullAddress"
                    style={{ flex: 1, marginRight: "20px" }}
                  >
                    <center>
                      {" "}
                      <Form.Label className="form-label">
                        Full Address
                      </Form.Label>
                    </center>
                    <Form.Control
                      style={{
                        height: 50,
                        margin: 10,
                        border: "2px solid gray",
                        borderRadius: 5,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      type="text"
                      name="fullAddress"
                      placeholder="Full Address"
                      value={profileData.fullAddress}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formCountry" style={{ flex: 1 }}>
                    <center>
                      {" "}
                      <Form.Label className="form-label">Country</Form.Label>
                    </center>
                    <Form.Control
                      style={{
                        height: 50,
                        margin: 10,
                        border: "2px solid gray",
                        borderRadius: 5,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={profileData.country}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Form.Group
                    controlId="formCity"
                    style={{ flex: 1, marginRight: "20px" }}
                  >
                    <center>
                      {" "}
                      <Form.Label className="form-label">City</Form.Label>
                    </center>
                    <Form.Control
                      style={{
                        height: 50,
                        margin: 10,
                        border: "2px solid gray",
                        borderRadius: 5,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      type="text"
                      name="city"
                      placeholder="City"
                      value={profileData.city}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </Form.Group>

                  <Form.Group controlId="formZipCode" style={{ flex: 1 }}>
                    <center>
                      {" "}
                      <Form.Label className="form-label">Zip Code</Form.Label>
                    </center>
                    <Form.Control
                      style={{
                        height: 50,
                        margin: 10,
                        border: "2px solid gray",
                        borderRadius: 5,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      type="number"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={profileData.zipCode}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </Form.Group>
                </div>
              </div>
            )}

            {currentTab === 2 && (
              // Contact Tab
              <div>
                <div
                  className="personal-preferences"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Form.Group
                    controlId="formInterestedCountry"
                    style={{ flex: 1, marginRight: "20px" }}
                  >
                    <center>
                      {" "}
                      <Form.Label className="form-label">
                        Interested Country
                      </Form.Label>
                    </center>
                    <Form.Control
                      style={{
                        height: 50,
                        margin: 10,
                        border: "2px solid gray",
                        borderRadius: 5,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      type="text"
                      name="interestedCountry"
                      placeholder="Interested Country"
                      value={profileData.interestedCountry}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formPrimaryUniversity"
                    style={{ flex: 1 }}
                  >
                    <center>
                      {" "}
                      <Form.Label className="form-label">
                        Primary University
                      </Form.Label>
                    </center>
                    <Form.Control
                      style={{
                        height: 50,
                        margin: 10,
                        border: "2px solid gray",
                        borderRadius: 5,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      type="text"
                      name="PrimaryUniversity"
                      placeholder="Primary University"
                      value={profileData.primaryUniversity}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Form.Group
                    controlId="formSecondaryUniversity"
                    style={{ flex: 1, marginRight: "20px" }}
                  >
                    <center>
                      {" "}
                      <Form.Label className="form-label">
                        Secondary University
                      </Form.Label>
                    </center>
                    <Form.Control
                      style={{
                        height: 50,
                        margin: 10,
                        border: "2px solid gray",
                        borderRadius: 5,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      type="text"
                      name="secondary university"
                      placeholder="Secondary University"
                      value={profileData.secondaryUniversity}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </Form.Group>

                  <Form.Group controlId="formZipCode" style={{ flex: 1 }}>
                    <center>
                      {" "}
                      <Form.Label className="form-label">
                        Interested Course
                      </Form.Label>
                    </center>
                    <Form.Control
                      style={{
                        height: 50,
                        margin: 10,
                        border: "2px solid gray",
                        borderRadius: 5,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      type="text"
                      name="interestedCourse"
                      placeholder="Interested Course"
                      value={profileData.interestedCourse}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </Form.Group>
                </div>
              </div>
            )}

            {currentTab === 3 && (
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Form.Group
                  controlId="formPreviousSchoolLevel"
                  style={{ flex: 1, marginRight: "20px" }}
                >
                  <center>
                    {" "}
                    <Form.Label className="form-label">
                      Previous School Level
                    </Form.Label>
                  </center>
                  <Form.Control
                    style={{
                      height: 50,
                      margin: 10,
                      border: "2px solid gray",
                      borderRadius: 5,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "box-shadow 0.3s ease",
                    }}
                    type="text"
                    name="previousSchoolLevel"
                    placeholder="Previous School Level"
                    value={profileData.previousSchoolLevel}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group
                  controlId="formPreviousSchoolGPA"
                  style={{ flex: 1, marginRight: "20px" }}
                >
                  <center>
                    {" "}
                    <Form.Label className="form-label">
                      Previous School GPA
                    </Form.Label>
                  </center>
                  <Form.Control
                    style={{
                      height: 50,
                      margin: 10,
                      border: "2px solid gray",
                      borderRadius: 5,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "box-shadow 0.3s ease",
                    }}
                    type="number"
                    name="previousSchoolGPA"
                    placeholder="GPA"
                    value={profileData.previousSchoolGpa}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formGraduationDate" style={{ flex: 1 }}>
                  <center>
                    {" "}
                    <Form.Label className="form-label">
                      Graduation Date
                    </Form.Label>
                  </center>
                  <Form.Control
                    style={{
                      height: 50,
                      margin: 10,
                      border: "2px solid gray",
                      borderRadius: 5,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "box-shadow 0.3s ease",
                    }}
                    type="date"
                    name="graduationDate"
                    placeholder="Graduation Date"
                    value={profileData.graduationDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            )}

            {currentTab === 4 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Form.Group
                  controlId="formTestScores"
                  style={{ flex: 1, marginRight: "20px" }}
                >
                  <center>
                    {" "}
                    <Form.Label className="form-label">Test Scores</Form.Label>
                  </center>
                  <Form.Control
                    style={{
                      height: 50,
                      margin: 10,
                      border: "2px solid gray",
                      borderRadius: 5,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "box-shadow 0.3s ease",
                    }}
                    type="number"
                    name="testScores"
                    placeholder="Test Scores"
                    value={profileData.testScores}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formTestType" style={{ flex: 1 }}>
                  <center>
                    <Form.Label className="form-label">Test Type</Form.Label>
                  </center>
                  <Form.Select
                    style={{
                      height: 50,
                      margin: 10,
                      border: "2px solid gray",
                      borderRadius: 5,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "box-shadow 0.3s ease",
                    }}
                    name="testType"
                    value={profileData.testType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Test Type</option>
                    <option value="toefel">Toefel</option>
                    <option value="ielts">IELTS</option>
                    <option value="sat">SAT</option>
                    <option value="gre">GRE</option>
                    <option value="pte">PTE</option>
                    <option value="duolingo">Duolingo</option>
                  </Form.Select>
                </Form.Group>
              </div>
            )}

            {currentTab === 5 && (
              <div>
                <Form.Group
                  controlId="formReference"
                  style={{ flex: 1, marginRight: "20px" }}
                >
                  <center>
                    {" "}
                    <Form.Label className="form-label">Reference</Form.Label>
                  </center>
                  <Form.Select
                    style={{
                      height: 50,
                      margin: 10,
                      border: "2px solid gray",
                      borderRadius: 5,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "box-shadow 0.3s ease",
                    }}
                    name="reference"
                    value={profileData.reference}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Reference</option>
                    <option value="socialMedia">Social Media</option>
                    <option value="friend">Friend</option>
                    <option value="television">Television</option>
                    <option value="newspaper">Newspaper</option>
                  </Form.Select>
                </Form.Group>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Form.Group controlId="formReference" style={{ flex: 1 }}>
                    <center>
                      {" "}
                      <Form.Label className="form-label">Notes</Form.Label>
                    </center>
                    <Form.Control
                      style={{
                        height: 150,
                        margin: 10,
                        border: "2px solid gray",
                        borderRadius: 5,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.3s ease",
                      }}
                      type="textarea"
                      name="notes"
                      placeholder="Please Leave your Notes Here"
                      value={profileData.notes}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 150,
              }}
            >
              {currentTab !== 0 && (
                <Button
                  style={{
                    marginRight: 10,
                    backgroundColor: "#007bff",
                    color: "#fff",
                  }}
                  onClick={() => handleTabChange(currentTab - 1)}
                >
                  Previous
                </Button>
              )}

              {currentTab !== 5 && (
                <Button
                  style={{ backgroundColor: "#007bff", color: "#fff" }}
                  variant="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}

              {currentTab === 5 && (
                <Button
                  style={{ backgroundColor: "#007bff", color: "#fff" }}
                  variant="primary"
                  onClick={handleSaveOrUpdateProfile}
                >
                  {isEditMode ? "Update Profile" : "Submit"}
                </Button>
              )}
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}
