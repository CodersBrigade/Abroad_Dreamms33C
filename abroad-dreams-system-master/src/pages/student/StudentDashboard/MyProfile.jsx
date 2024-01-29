// MyProfile.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
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
        // Add other fields from StudentProfile entity here
    });

    const [isEditMode, setIsEditMode] = useState(false);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/student-profile/getByUserId/${localStorage.getItem('userId')}`, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
            });

            console.log('Fetched:::', response.data);

            if (response.data && response.data.length > 0) {
                // Assuming the API returns an array of profiles, use the first profile
                setProfileData(response.data[0]);
                setIsEditMode(true); // Enable edit mode if data is fetched
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSaveOrUpdateProfile = () => {
        // Add systemUserId to the profileData
        const updatedProfileData = { ...profileData, systemUserId: localStorage.getItem('userId') };

        if (isEditMode) {
            // Update existing profile
            axios
                .put(`http://localhost:8080/student-profile/update/${localStorage.getItem('userId')}`, updatedProfileData, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                })
                .then((response) => {
                    console.log('Profile updated successfully:', response.data);
                    // Optionally, you can disable edit mode after successful update
                    // setIsEditMode(false);
                })
                .catch((error) => {
                    console.error('Error updating profile:', error);
                });
        } else {
            // Save new profile
            axios
                .post('http://localhost:8080/student-profile/save', updatedProfileData, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                })
                .then((response) => {
                    console.log('Profile saved successfully:', response.data);
                    setIsEditMode(true); // Enable edit mode after successful save
                })
                .catch((error) => {
                    console.error('Error saving profile:', error);
                });
        }
    };


    useEffect(() => {
        if (localStorage.getItem('userId')) {
            fetchProfileData();
        }
    }, [localStorage.getItem('userId')]);

    return (
        <div>
            <Header />
            <div className="d-flex">
                <StudentSidebar />
        <Container fluid className="m-2">
            <StudentProfileBar />
            <h2>My Profile</h2>
            <Form>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" value={profileData.firstName} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formMiddleName">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control type="text" name="middleName" value={profileData.middleName} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" value={profileData.lastName} onChange={handleInputChange} />
                </Form.Group>


                <Form.Group controlId="formDateOfBirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="text"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        type="text"
                        name="gender"
                        value={profileData.gender}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formEmailAddress">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="emailAddress"
                        value={profileData.emailAddress}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formFullAddress">
                    <Form.Label>Full Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="fullAddress"
                        value={profileData.fullAddress}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        name="country"
                        value={profileData.country}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        value={profileData.city}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formZipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="zipCode"
                        value={profileData.zipCode}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                {/* Continue adding form groups for other fields */}

                {isEditMode ? (
                    <Button variant="primary" onClick={handleSaveOrUpdateProfile}>
                        Update Profile
                    </Button>
                ) : (
                    <Button variant="primary" onClick={handleSaveOrUpdateProfile}>
                        Save Profile
                    </Button>
                )}

            </Form>
        </Container>
            </div></div>
    );
}
