import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaBook,
  FaCog,
  FaBell,
  FaSignOutAlt, FaSchool, FaBookReader, FaChalkboardTeacher,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./StudentSidebar.css";
import {IoIosPaper} from "react-icons/io";
import {MdDateRange, MdEditNotifications} from "react-icons/md";
import {BsCashStack} from "react-icons/bs";
import {BiSolidReport} from "react-icons/bi";

const StudentSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isLinkActive = (path) => {
    return location.pathname === path;
  };


  return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li className={`sidebarListItem ${isLinkActive("/student/dashboard") ? "active" : ""}`}>
                <Link to="/student/dashboard" className="sidebarLink">
                  <FaHome />
                  My Dashboard
                </Link>
              </li>
              <li className={`sidebarListItem ${isLinkActive("/student/profile") ? "active" : ""}`}>
                <Link to="../student/profile" className="sidebarLink">
                  <IoIosPaper />
                  My Profile
                </Link>
              </li>
              <li className={`sidebarListItem ${isLinkActive("/student/studentcourses") ? "active" : ""}`}>
                <Link to="/student/studentcourses" className="sidebarLink">
                  <MdDateRange />
                  My Courses
                </Link>
              </li>
              <li className={`sidebarListItem ${isLinkActive("/student/myapplication") ? "active" : ""}`}>
                <Link to="/student/myapplication" className="sidebarLink">
                  <BsCashStack />
                  MyApplications
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Major Sections</h3>
            <li className={`sidebarListItem ${isLinkActive("/student/payment") ? "active" : ""}`}>
              <Link to="/student/payment" className="sidebarLink">
                <FaSchool />
                MyPayments
              </Link>
            </li>

            <li className={`sidebarListItem ${isLinkActive("/student/notice") ? "active" : ""}`}>
              <Link to="/student/notice" className="sidebarLink">
                <FaBookReader />
                My Notices
              </Link>
            </li>

          </div>
        </div>
      </div>
  );
};

export default StudentSidebar;
