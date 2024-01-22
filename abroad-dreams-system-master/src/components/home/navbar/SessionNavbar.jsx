import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import companyLogo from '../../../assets/abroad-dreams-logo.svg';
import companyLogoDark from '../../../assets/abroad-dreams-logo-dark.svg';



const SessionNavbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isScrolled, setIsScrolled] = useState(false);
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || "student");
    const [cartCount, setCartCount] = useState(0); // Add cart count state


    useEffect(() => {
        setUserRole(localStorage.getItem("role") || "student");

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

    const handleAddToCart = () => {
        // Your cart functionality logic
        // For example, increment the cart count
        setCartCount((prevCount) => prevCount + 1);
    };

    const handleToggle = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    const navbarClass = isScrolled ? "fixed-top" : "";
    const containerClass = isScrolled ? "py-2" : "";
    const darkThemeClass = theme === "dark" ? "bg-dark text-white" : "bg-light";

    const logoSrc = theme === "dark" ? companyLogoDark : companyLogo;

    const getDashboardLink = () => {
        return userRole === 'Admin' ? '/admin/dashboard' : '/student/dashboard';
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';

    };

    return (
        <nav className={`navbar navbar-expand-lg ${navbarClass} ${darkThemeClass}`}>
            <div className={`container-fluid ${containerClass}`}>
                <Link to="/">
                    <img
                        src={logoSrc}
                        width="300"
                        className={`d-inline-block align-top ${isScrolled ? 'visible' : 'hidden'}`}
                        alt=""
                    />
                </Link>
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
                            <NavLink to="/" className={`nav-link ${theme === "dark" ? "text-white" : ""}`} style={{ marginRight: "24px" }}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="../student/allCourses" className={`nav-link ${theme === "dark" ? "text-white" : ""}`} style={{ marginRight: "24px" }}>
                                View Courses
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="../student/allNotices" className={`nav-link ${theme === "dark" ? "text-white" : ""}`} style={{ marginRight: "24px" }}>
                                View Notices
                            </NavLink>
                        </li>

                    </ul>
                </div>
                <div className="ml-auto d-flex align-items-center">
                    <button className="btn btn-warning mx-2" onClick={handleAddToCart}>
                        <FaShoppingCart className={`mr-1 ${theme === "dark" ? "text-white" : ""}`} />
                        Cart ({cartCount})
                    </button>
                    <Link to={getDashboardLink()} className="nav-link">
                        <button className="btn btn-success mx-2">Dashboard</button>
                    </Link>
                    <Link to="/logout" className="nav-link">
                        <FaSignOutAlt className={`mx-2 ${theme === "dark" ? "text-white" : ""}`} onClick={handleLogout}/>
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
