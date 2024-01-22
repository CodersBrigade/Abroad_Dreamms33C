import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import StudentSidebar from "./StudentSidebar";
import axios from "axios";
import Header from "../../../components/Header.jsx";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("personal-info");
    const [formData, setFormData] = useState({
        // Default values for form fields
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
        highSchoolTranscript: null, // For file upload
        testScores: "",
        testScoreDocuments: null, // For file upload
    });

    const [formErrors, setFormErrors] = useState('');

    console.log('Token Fetched::: ',localStorage.getItem('accessToken'));
    console.log('userId Fetched::: ',localStorage.getItem('userId'));

    const validateForm = () => {
        const errors = {};

        for (const key in formData) {
            if (!formData[key]) {
                errors[key] = `${
                    key.charAt(0).toUpperCase() + key.slice(1)
                } is required`;
            }
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handlePrevButtonClick = () => {
        // Move to the previous tab
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form before submitting
        if (!validateForm()) {
            console.log("Form contains errors. Please review and correct.");
            return;
        }

        try {
            // Send form data to the Spring Boot backend using FormData
            const token = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userId');

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            };

            const formDataToSend = new FormData();

            for (const key in formData) {
                if (key === 'highSchoolTranscript' || key === 'testScoreDocuments') {
                    // If it's a file, append to formDataToSend
                    formDataToSend.append(key, formData[key]);
                } else {
                    // If it's not a file, treat it as a regular string field
                    formDataToSend.append(key, JSON.stringify(formData[key]));
                }
            }

            // Add user ID to the FormData
            formDataToSend.append('systemUser', userId);

            console.log(formData.dateOfBirth);

            // Send the request
            const response = await axios.post("http://localhost:8080/student-profile/save", formDataToSend, { headers });

            // Handle the response as needed
            console.log(response.data);

            // Move to the next tab
            const tabOrder = ["personal-info", "address-info", "academic-info", "test-scores"];
            const currentTabIndex = tabOrder.indexOf(activeTab);

            if (currentTabIndex !== -1 && currentTabIndex < tabOrder.length - 1) {
                setActiveTab(tabOrder[currentTabIndex + 1]);
            }
        } catch (error) {
            // Handle error
            console.error("Error submitting form:", error.message);
        }
    };


    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
        setFormErrors({ ...formErrors, [key]: "" });
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
                                <Form onSubmit={handleSubmit}>
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
                                                placeholder="DOB"
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
                                </Form>
                            </div>
                        </Tab>
                        <Tab
                            tabClassName="tab"
                            eventKey="address-info"
                            title="Address Information"
                        >
                            <div className="forms">
                                <Form onSubmit={handleSubmit}>
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
                                </Form>
                            </div>
                        </Tab>
                        <Tab
                            tabClassName="tab"
                            eventKey="academic-info"
                            title="Academic History"
                        >
                            <div className="forms">
                                <Form onSubmit={handleSubmit}>
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
                                            <Form.Label>Expected Graduation Year</Form.Label>
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
                                            <Form.Text className="text-danger">
                                                {formErrors.gpa}
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="highSchoolTranscript">
                                            <Form.Label>Upload High School Transcript</Form.Label>
                                            <Form.Control
                                                type="file"
                                                plac
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "highSchoolTranscript",
                                                        e.target.files[0]
                                                    )
                                                }
                                                required
                                            />
                                            <Form.Text className="text-muted">
                                                Upload documents/transcript (e.g., score reports).
                                            </Form.Text>
                                            <Form.Text className="text-danger">
                                                {formErrors.highSchoolTranscript}
                                            </Form.Text>
                                        </Form.Group>
                                    </div>
                                </Form>
                            </div>
                        </Tab>
                        <Tab tabClassName="tab" eventKey="test-scores" title="Test Scores">
                            <div className="forms">
                                <Form onSubmit={handleSubmit}>
                                    <h5>Standardized Test Scores</h5>
                                    <Form.Group controlId="testScores">
                                        <Form.Label>Select Test Type</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={formData.testScores}
                                            onChange={(e) =>
                                                handleInputChange("testScores", e.target.value)
                                            }
                                            required
                                        >
                                            <option value="">Select Test Type</option>
                                            <option value="SAT">SAT</option>
                                            <option value="ACT">ACT</option>
                                            <option value="GRE">GRE</option>
                                            <option value="IELTS">IELTS</option>
                                            <option value="PTE">PTE</option>
                                        </Form.Control>
                                        <Form.Text className="text-danger">
                                            {formErrors.testScores}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="testScoreDocuments">
                                        <Form.Label>Upload Test Score Documents</Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "testScoreDocuments",
                                                    e.target.files[0]
                                                )
                                            }
                                            required
                                        />
                                        <Form.Text className="text-muted">
                                            Upload documents related to your test scores (e.g., score
                                            reports).
                                        </Form.Text>
                                        <Form.Text className="text-danger">
                                            {formErrors.testScoreDocuments}
                                        </Form.Text>
                                    </Form.Group>
                                </Form>
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

                            <Button variant="primary" type="submit">
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
