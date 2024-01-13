import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaBook,
  FaCog,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./StudentSidebar.css";

const StudentSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  return (
    <div
      className={`student-sidebar ${isSidebarOpen ? "" : "closed"} ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="toggle-btn" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className="sidebar-content">
        <Link to="/student/dashboard" className="sidebar-item">
          <FaHome className="icon" />
          <span>Dashboard</span>
        </Link>

        <Link to="/profile" className="sidebar-item">
          <FaUser className="icon" />
          <span>Profile</span>
        </Link>

        <Link to="/student/studentcourses" className="sidebar-item">
          <FaBook className="icon" />
          <span>Courses</span>
        </Link>

        <Link to="/student/myapplication" className="sidebar-item">
          <FaBook className="icon" />
          <span>My Application</span>
        </Link>

        <Link to="/student/payment" className="sidebar-item">
          <FaBook className="icon" />
          <span>Payments</span>
        </Link>

        <Link to="../student/institution" className="sidebar-item">
          <FaBook className="icon" />
          <span>Institutions</span>
        </Link>
        <Link to="/student/payment" className="sidebar-item">
          <FaBook className="icon" />
          <span>Payment</span>
        </Link>

        <Link to="/settings" className="sidebar-item">
          <FaCog className="icon" />
          <span>Settings</span>
        </Link>

        <div className="sidebar-item">
          <FaBell className="icon" />
          <span>Notifications</span>
        </div>

        <div className="sidebar-item" onClick={handleLogout}>
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </div>
      </div>

      <div className="theme-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </div>
    </div>
  );
};

export default StudentSidebar;
