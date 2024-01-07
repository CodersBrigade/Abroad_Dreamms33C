import React from "react";
import StudentSidebar from "./StudentSidebar";
import Container from "react-bootstrap/Container";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

const Institutions = () => {
  return (
    <>
      <div className="d-flex">
        <StudentSidebar />
          <Container fluid className="flex-grow-1 m-2">

              <StudentProfileBar/>

          </Container>
      </div>
    </>
  );
};

export default Institutions;
