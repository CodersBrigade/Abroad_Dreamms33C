import React, { useEffect, useState } from "react";
import StudentSidebar from "./StudentSidebar";
import Container from "react-bootstrap/Container";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";
import Header from "../../../components/Header.jsx";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";

export default function StudentInstitution() {
    const [institutions, setInstitutions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchInstitutions = async () => {
        try {
            const response = await axios.get("http://localhost:8080/institution/getAll", {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
            });
            console.log("Fetched Institutions:", response.data);
            setInstitutions(response.data);
        } catch (error) {
            console.error("Error fetching institutions:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            fetchInstitutions();
        } else {
            fetchInstitutionById(searchQuery);
        }
    };

    const fetchInstitutionById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/institution/getById/${id}`);
            setInstitutions([response.data]); // Corrected line
        } catch (error) {
            console.error("Error fetching institution by ID:", error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            fetchInstitutions();
        }
    }, [localStorage.getItem("userId")]);

    const handleViewInstitutionDetails = async (institutionId) => {
        try {
            const response = await axios.get(`http://localhost:8080/institution/getById/${institutionId}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
            });

            if (response.data) {
                const institutionDetails = response.data;
                // Display the institution details in a modal or navigate to a new page
                console.log("View Institution Details:", institutionDetails);
            } else {
                console.error("Institution not found");
            }
        } catch (error) {
            console.error("Error fetching institution details:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="d-flex">
                <StudentSidebar />
                <Container fluid className="flex-grow-1">
                    <StudentProfileBar />
                    <div className="wrapper">
                        <div className="search-bar mb-3">
                            <InputGroup>
                                <FormControl type="text" placeholder="Search by ID" value={searchQuery} onChange={handleSearchChange} />
                                <Button variant="primary" onClick={handleSearch}>
                                    Search
                                </Button>
                            </InputGroup>
                        </div>

                        <div className="institution-list">
                            {Array.isArray(institutions) &&
                                institutions.map((institution) => (
                                    <div className="item" key={institution.institutionId}>
                                        <strong>ID: {institution.institutionId}</strong> {institution.institutionName} -- {institution.location}
                                        <Button
                                            variant="success"  // Set the variant to "success" for green color
                                            onClick={() => handleViewInstitutionDetails(institution.institutionId)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
