// Home.jsx

import React from "react";
import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/home/navbar/Navbar.jsx";
import SessionNavbar from "../../components/home/navbar/SessionNavbar.jsx";
import CourseCard from "./CourseCard.jsx";

const AllCourses = () => {
    const cards = useLoaderData();

    // Check if accessToken is available
    const isSessionActive = localStorage.getItem("accessToken");

    return (
        <div>
            {isSessionActive ? <SessionNavbar /> : <Navbar />} {/* Conditional rendering based on accessToken */}

            <div className="flex flex-col items-center">
                <div className='flex flex-wrap justify-center w-full lg:w-5/6 mb-8'>
                    <CourseCard numberOfCourses={20} />
                </div>
            </div>
        </div>
    );
};

export default AllCourses;
