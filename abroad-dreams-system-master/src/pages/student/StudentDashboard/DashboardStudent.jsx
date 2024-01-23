import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faFileAlt,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const DashboardCard = ({ title, icon, data, loading, error }) => (
  <Card className="text-center my-3">
    <Card.Body>
      <Card.Title>
        <FontAwesomeIcon icon={icon} style={{ margin: 20 }} /> {title}
      </Card.Title>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Card.Text>
          <h1>{data}</h1>
        </Card.Text>
      )}
    </Card.Body>
  </Card>
);

const DashboardStudent = () => {
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Fetch list of courses
        const responseCourses = await axios.get(
          "http://localhost:8080/student/course/getAll",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );
        setCourses(responseCourses.data);

        // Fetch list of applications
        const responseApplications = await axios.get(
          "http://localhost:8080/applications/all",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );
        setApplications(responseApplications.data);

        // Fetch list of institutions
        const responseInstitutions = await axios.get(
          "http://localhost:8080/institution/getAll",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );
        setInstitutions(responseInstitutions.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <DashboardCard
            title="Courses"
            icon={faBook}
            data={courses.length}
            loading={loading}
            error={error}
          />
        </Col>

        <Col md={4}>
          <DashboardCard
            title="Applications"
            icon={faFileAlt}
            data={applications.length}
            loading={loading}
            error={error}
          />
        </Col>

        <Col md={4}>
          <DashboardCard
            title="Institutions"
            icon={faUniversity}
            data={institutions.length}
            loading={loading}
            error={error}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardStudent;
