import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon } from 'react-icons/fa';
import companyLogo from '../../../assets/abroad-dreams-logo.svg';

const SessionNavbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [theme]);

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    const handleToggle = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    const navbarClass = isScrolled ? "fixed-top" : "";
    const containerClass = isScrolled ? "py-2" : "";
    const darkThemeClass = theme === "dark" ? "bg-dark" : "bg-light";

    return (
        <nav className={`navbar navbar-expand-lg ${navbarClass} ${darkThemeClass}`}>
            <div className={`container-fluid ${containerClass}`}>
                <img src={companyLogo} width="300" className={`d-inline-block align-top ${isScrolled ? 'visible' : 'hidden'}`} alt="" />
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" style={{ marginRight: "24px" }}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link" style={{ marginRight: "24px" }}>
                                View Courses
                            </NavLink>
                        </li>

                    </ul>
                </div>
                <div className="ml-auto d-flex align-items-center">
                    <Link to="/student/dashboard" className="nav-link">
                        <button className="btn btn-success mx-2">Dashboard</button>
                    </Link>
                    <label className="switch ml-2" onClick={handleToggle}>
                        {theme === "dark" ? <FaMoon className="text-light" /> : <FaSun />}
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default SessionNavbar;
