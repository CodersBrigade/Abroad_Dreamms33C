// Home.jsx

import React from "react";
import { useLoaderData } from "react-router-dom";
import Banner from "../../components/home/banner/Banner";
import Footer from "../../components/home/footer/Footer";
import AboutUs from "../../components/home/aboutus/AboutUs.jsx";
import Navbar from "../../components/home/navbar/Navbar.jsx";
import SessionNavbar from "../../components/home/navbar/SessionNavbar.jsx";
import CourseCard from "./CourseCard.jsx";
import AppointmentForm from "../../components/home/AppointmentForm.jsx";
import SubscribeComponent from "../../components/admin/SubscribeComponent.jsx";
import ExtraNav from "../../components/home/extranav/ExtraNav.jsx";

const Home = () => {
    const cards = useLoaderData();

    // Check if accessToken is available
    const isSessionActive = localStorage.getItem("accessToken");

    return (
        <div>
            <ExtraNav />
            {isSessionActive ? <SessionNavbar /> : <Navbar />} {/* Conditional rendering based on accessToken */}
            <Banner />
            <CourseCard/>
            {/*<SubscribeComponent/>*/}
            <AboutUs />
            <AppointmentForm/>
            <Footer />
        </div>
    );
};

export default Home;
