import React from "react";
import { useLoaderData } from "react-router-dom";
import Banner from "../../components/home/banner/Banner";
import Footer from "../../components/home/footer/Footer";
import AboutUs from "../../components/home/aboutus/AboutUs.jsx";
import Navbar from "../../components/home/navbar/Navbar.jsx";
import CourseCard from "../../components/admin/CourseCard.jsx";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../../components/home/banner/Banner";
import Footer from "../../components/home/footer/Footer";
import AboutUs from "../../components/home/aboutus/AboutUs.jsx";
import Navbar from "../../components/home/navbar/Navbar.jsx";
import CourseCard from "../../components/admin/CourseCard.jsx";

const AllCourses = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/course/getAll',
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            // Handle the error, show a message, etc.
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <Navbar />

            <div className='flex flex-col items-center justify-center mt-0 mb-8 ' id='services'>
                <h1 className='text-black text-2xl md:text-4xl font-metamorphous font-bold text-center'>All Courses</h1>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center">
                <div className='flex flex-col items-center w-full lg:w-5/12 mb-8'>
                    <div className="course-card-list justify-content-center">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default AllCourses;

const AllCourses = () => {
    const courses = useLoaderData();  // Assuming useLoaderData returns an array of courses

    return (
        <div>
            <Navbar />
            <Banner></Banner>
            <AboutUs></AboutUs>

            <div className='flex flex-col items-center justify-center mt-0 mb-8 ' id='services'>
                <h1 className='text-black text-2xl md:text-4xl font-metamorphous font-bold text-center'>All Courses</h1>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center">
                <div className='flex flex-col items-center w-full lg:w-5/12 mb-8'>
                    <div className="course-card-list justify-content-center">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AllCourses;
