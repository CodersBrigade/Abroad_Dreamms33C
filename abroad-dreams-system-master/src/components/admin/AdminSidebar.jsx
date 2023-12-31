import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./AdminSidebar.css";
import {
    Home,
    Message,
    History,
    VerifiedUser,
    Money, People, GraphicEq, Book, Payment, Room, MeetingRoom, RoomService, CheckBox, School,
} from "@material-ui/icons";
import {GiTeacher} from "react-icons/gi";

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
                        <li className={`sidebarListItem ${isLinkActive("/admin") ? "active" : ""}`}>
                            <Link to="/admin" className="sidebarLink">
                                <Home className="sidebarIcon" />
                                Home
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/admin/applications") ? "active" : ""}`}>
                            <Link to="/admin/applications" className="sidebarLink">
                                <Book className="sidebarIcon" />
                                Applications
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/admin/appointment") ? "active" : ""}`}>
                            <Link to="/admin/appointment" className="sidebarLink">
                                <Message className="sidebarIcon" />
                                Appointments
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/admin/payment") ? "active" : ""}`}>
                            <Link to="/admin/payment" className="sidebarLink">
                                <Payment className="sidebarIcon" />
                                Payments
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Major Sections</h3>
                    <li className={`sidebarListItem ${isLinkActive("/admin/institution") ? "active" : ""}`}>
                        <Link to="/admin/institution" className="sidebarLink">
                            <School className="sidebarIcon" />
                            Institutions
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${isLinkActive("/admin/student") ? "active" : ""}`}>
                        <Link to="/admin/student" className="sidebarLink">
                            <People className="sidebarIcon" />
                            Students
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${isLinkActive("/admin/course") ? "active" : ""}`}>
                        <Link to="/admin/course" className="sidebarLink">
                            <CheckBox className="sidebarIcon" />
                            Courses
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${isLinkActive("/admin/instructor") ? "active" : ""}`}>
                        <Link to="/admin/instructor" className="sidebarLink">
                            <GiTeacher className="sidebarIcon" />
                            Instructors
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${isLinkActive("/admin/systemuser") ? "active" : ""}`}>
                        <Link to="/admin/systemuser" className="sidebarLink">
                            <VerifiedUser className="sidebarIcon" />
                            System Users
                        </Link>
                    </li>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Analytics</h3>
                    <li className={`sidebarListItem ${isLinkActive("/admin/chart") ? "active" : ""}`}>
                        <Link to="/admin/chart" className="sidebarLink">
                            <GraphicEq className="sidebarIcon" />
                            Reports
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    );
}
