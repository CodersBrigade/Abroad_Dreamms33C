import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import "./AdminSidebar.css";

import {
    LineStyle,
    Home,
    SwapHorizontalCircleSharp,
    Message,
    History,
    VerifiedUser,
    Money,
    
} from "@material-ui/icons";

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
                                <SwapHorizontalCircleSharp className="sidebarIcon" />
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
                                <Money className="sidebarIcon" />
                                Payments
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Other Sections</h3>
                    <li className={`sidebarListItem ${isLinkActive("/admin/employee") ? "active" : ""}`}>
                        <Link to="/admin/employee" className="sidebarLink">
                            <History className="sidebarIcon" />
                            Employees
                        </Link>
                    </li>
                    <li className={`sidebarListItem ${isLinkActive("/admin/classroom") ? "active" : ""}`}>
                        <Link to="/admin/classroom" className="sidebarLink">
                            <History className="sidebarIcon" />
                            Classrooms
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
                            <VerifiedUser className="sidebarIcon" />
                            Reports
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    );
}
