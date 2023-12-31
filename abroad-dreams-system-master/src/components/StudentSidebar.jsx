import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import "./StudentSidebar.css";

import {
    Home,
    Book,
    Message,
    Payment,
    Event, // New icon for Calendar
    AccountBox, // New icon for My Profile
} from "@material-ui/icons";

export default function StudentSidebar() {
    const location = useLocation();

    const isLinkActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Student Dashboard</h3>
                    <ul className="sidebarList">
                        <li className={`sidebarListItem ${isLinkActive("/student") ? "active" : ""}`}>
                            <Link to="/student" className="sidebarLink">
                                <Home className="sidebarIcon" />
                                Home
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/student/applications") ? "active" : ""}`}>
                            <Link to="/student/applications" className="sidebarLink">
                                <Book className="sidebarIcon" />
                                Institutions
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/student/appointment") ? "active" : ""}`}>
                            <Link to="/student/appointment" className="sidebarLink">
                                <Message className="sidebarIcon" />
                                Courses
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/student/payment") ? "active" : ""}`}>
                            <Link to="/student/payment" className="sidebarLink">
                                <Payment className="sidebarIcon" />
                                My Payments
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/student/calendar") ? "active" : ""}`}>
                            <Link to="/student/calendar" className="sidebarLink">
                                <Event className="sidebarIcon" />
                                Calendar
                            </Link>
                        </li>
                        <li className={`sidebarListItem ${isLinkActive("/student/profile") ? "active" : ""}`}>
                            <Link to="/student/profile" className="sidebarLink">
                                <AccountBox className="sidebarIcon" />
                                My Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
