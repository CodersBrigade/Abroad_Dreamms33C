// Home.jsx

import React from "react";
import { useLoaderData } from "react-router-dom";
import Banner from "../../components/home/banner/Banner";
import Footer from "../../components/home/footer/Footer";
import AboutUs from "../../components/home/aboutus/AboutUs.jsx";
import Navbar from "../../components/home/navbar/Navbar.jsx";
import SessionNavbar from "../../components/home/navbar/SessionNavbar.jsx";
import CourseCard from "./CourseCard.jsx";

const Home = () => {
    const cards = useLoaderData();

    // Check if accessToken is available
    const isSessionActive = localStorage.getItem("accessToken");

    return (
        <div>
            {isSessionActive ? <SessionNavbar /> : <Navbar />} {/* Conditional rendering based on accessToken */}
            <Banner />
            <AboutUs />
            <CourseCard/>
            <Footer />
        </div>
    );
};

export default Home;
