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
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Sections</h3>
                    {/* ... Other sections ... */}
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Analytics</h3>
                    {/* ... Other analytics ... */}
                </div>
            </div>
        </div>
    );
}
