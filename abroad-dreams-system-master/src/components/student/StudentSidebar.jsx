import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./StudentSidebar.css";
import {
    Home,
    Message,
    History,
    VerifiedUser,
    Money, People, GraphicEq, Book, Payment, Room, MeetingRoom, RoomService, CheckBox, School,
} from "@material-ui/icons";
import {GiTeacher} from "react-icons/gi";

export default function StudentSidebar() {
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
                        <li className={`sidebarListItem ${isLinkActive("/student/dashboard") ? "active" : ""}`}>
                            <Link to="/student/dashboard" className="sidebarLink">
                                <Home className="sidebarIcon" />
                                Home
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/student/applications") ? "active" : ""}`}>
                            <Link to="/student/applications" className="sidebarLink">
                                <Book className="sidebarIcon" />
                                Applications
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/student/appointment") ? "active" : ""}`}>
                            <Link to="/student/appointment" className="sidebarLink">
                                <Message className="sidebarIcon" />
                                Appointments
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/student/payment") ? "active" : ""}`}>
                            <Link to="/student/payment" className="sidebarLink">
                                <Payment className="sidebarIcon" />
                                Payments
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Profile Section</h3>
                    <li className={`sidebarListItem ${isLinkActive("/student/profile") ? "active" : ""}`}>
                        <Link to="/student/profile" className="sidebarLink">
                            <School className="sidebarIcon" />
                            Profile Section
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${isLinkActive("/student/course") ? "active" : ""}`}>
                        <Link to="/student/course" className="sidebarLink">
                            <CheckBox className="sidebarIcon" />
                            My Courses
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    );
}
