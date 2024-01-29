import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./AdminSidebar.css";

import { FaHome } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { MdDateRange, MdEditNotifications } from "react-icons/md";
import { BsCashStack } from "react-icons/bs";
import { FaSchool } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";


export default function AdminSidebar() {
    const location = useLocation();

    const isLinkActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className={`sidebarListItem ${isLinkActive("/admin/dashboard") ? "active" : ""}`}>
                            <Link to="/admin/dashboard" className="sidebarLink">
                                <FaHome />
                                Home
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/admin/application") ? "active" : ""}`}>
                            <Link to="/admin/application" className="sidebarLink">
                                <IoIosPaper />
                                Applications
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/admin/appointment") ? "active" : ""}`}>
                            <Link to="/admin/appointment" className="sidebarLink">
                                <MdDateRange />
                                Appointments
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/admin/payment") ? "active" : ""}`}>
                            <Link to="/admin/payment" className="sidebarLink">
                                <BsCashStack />
                                Payments
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Major Sections</h3>
                    <li className={`sidebarListItem ${isLinkActive("/admin/institution") ? "active" : ""}`}>
                        <Link to="/admin/institution" className="sidebarLink">
                            <FaSchool />
                            Institutions
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${isLinkActive("/admin/course") ? "active" : ""}`}>
                        <Link to="/admin/course" className="sidebarLink">
                            <FaBookReader />
                            Courses
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${isLinkActive("/admin/instructor") ? "active" : ""}`}>
                        <Link to="/admin/instructor" className="sidebarLink">
                            <FaChalkboardTeacher />
                            Instructors
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${isLinkActive("/admin/student") ? "active" : ""}`}>
                        <Link to="/admin/student" className="sidebarLink">
                            <PiStudentFill />
                            Students
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${isLinkActive("/admin/notice") ? "active" : ""}`}>
                        <Link to="/admin/notice" className="sidebarLink">
                            <MdEditNotifications />
                            Notices
                        </Link>
                    </li>

                </div>

            </div>
        </div>
    );
}
