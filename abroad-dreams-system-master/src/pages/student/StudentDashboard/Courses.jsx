import React from "react";
import StudentSidebar from "./StudentSidebar";
import { Tabs, Tab } from "react-bootstrap";

const Courses = () => {
  return (
    <>
      <div className="d-flex">
        <StudentSidebar />
        <Tabs defaultActiveKey="tab1" id="courses-tabs">
          <Tab eventKey="tab1" title="Tab 1">
            {/* Content of Tab 1 */}
            <h2>Tab 1 Content</h2>
          </Tab>
          <Tab eventKey="tab2" title="Tab 2">
            {/* Content of Tab 2 */}
            <h2>Tab 2 Content</h2>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Courses;
