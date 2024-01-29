// import React, { useState, useEffect } from "react";
// import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBook,
//   faFileAlt,
//   faUniversity,
// } from "@fortawesome/free-solid-svg-icons";
// import { green } from "@mui/material/colors";

// const Dashboard = () => {
//   const [courses, setCourses] = useState(0);
//   const [applications, setApplications] = useState(0);
//   const [institutions, setInstitutions] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Simulating a fetch from a backend API
//     const fetchData = async () => {
//       try {
//         // Simulate fetching data
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         // Replace with actual data fetching logic from your backend

//         const fetchCourseById = async (id) => {
//           try {
//               const response = await axios.get(`http://localhost:8080/course/getById/${id}`,
//                   {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
//               console.log('Fetched course by ID:', response.data);
//               setCourses([response.data]);
//           } catch (error) {
//               console.error('Error fetching course by ID:', error);
//           }
//       };

//         setApplications(30);
//         setInstitutions(5);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container mt-4 ">
//       <Row className="justify-content-md-center">
//         <Col md={4}>
//           <Card className="text-center my-3">
//             <Card.Body>
//               <Card.Title>
//                 <FontAwesomeIcon icon={faBook} style={{ margin: 20 }} /> Courses
//               </Card.Title>
//               {loading ? (
//                 <Spinner animation="border" variant="primary" />
//               ) : error ? (
//                 <Alert variant="danger">{error}</Alert>
//               ) : (
//                 <Card.Text>
//                   <h1>{courses}</h1>
//                 </Card.Text>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={4}>
//           <Card className="text-center my-3">
//             <Card.Body>
//               <Card.Title>
//                 <FontAwesomeIcon icon={faFileAlt} style={{ margin: 20 }} />{" "}
//                 Applications
//               </Card.Title>
//               {loading ? (
//                 <Spinner animation="border" variant="primary" />
//               ) : error ? (
//                 <Alert variant="danger">{error}</Alert>
//               ) : (
//                 <Card.Text>
//                   <h1>{applications}</h1>
//                 </Card.Text>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={4}>
//           <Card className="text-center my-3">
//             <Card.Body>
//               <Card.Title>
//                 <FontAwesomeIcon icon={faUniversity} style={{ margin: 20 }} />{" "}
//                 Institutions
//               </Card.Title>
//               {loading ? (
//                 <Spinner animation="border" variant="primary" />
//               ) : error ? (
//                 <Alert variant="danger">{error}</Alert>
//               ) : (
//                 <Card.Text>
//                   <h1>{institutions}</h1>
//                 </Card.Text>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Dashboard;

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

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [applications, setApplications] = useState(0);
  const [institutions, setInstitutions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating a fetch from a backend API
    const fetchData = async () => {
      try {
        // Simulate fetching data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Fetch list of courses
        const fetchCourses = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/course/all",
              {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("accessToken"),
                },
              }
            );
            console.log("Fetched courses:", response.data);
            setCourses(response.data);
          } catch (error) {
            console.error("Error fetching courses:", error);
            setError("Error fetching courses data");
          }
        };

        // Fetch applications
        const fetchApplications = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/applications/all",
              {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("accessToken"),
                },
              }
            );
            setApplications(response.data);
          } catch (error) {
            console.error("Error fetching applications:", error);
            setError("Error fetching applications data");
          }
        };

        // Fetch institutions
        const fetchInstitutions = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/institution/getAll",
              {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("accessToken"),
                },
              }
            );
            console.log("Fetched institutions:", response.data);
            setInstitutions(response.data);
          } catch (error) {
            console.error("Error fetching institutions:", error);
            setError("Error fetching institutions data");
          }
        };

        // Call the functions
        await fetchCourses();
        await fetchApplications();
        await fetchInstitutions();

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
    <div className="container mt-4 ">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card className="text-center my-3">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faBook} style={{ margin: 20 }} /> Courses
              </Card.Title>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <Card.Text>
                  <h1>{courses.length}</h1>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center my-3">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faFileAlt} style={{ margin: 20 }} />{" "}
                Applications
              </Card.Title>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <Card.Text>
                  <h1>{applications}</h1>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center my-3">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon icon={faUniversity} style={{ margin: 20 }} />{" "}
                Institutions
              </Card.Title>
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : error ? (
                <Alert variant="danger">{error}</Alert>
              ) : (
                <Card.Text>
                  <h1>{institutions}</h1>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
