import { useLoaderData } from "react-router-dom";
import Banner from "../../components/home/banner/Banner";

import Footer from "../../components/home/footer/Footer";
import AboutUs from "../../components/home/aboutus/AboutUs.jsx";
import Navbar from "../../components/home/navbar/Navbar.jsx";
import CourseCard from "../../components/admin/CourseCard.jsx";
import SessionNavbar from "../../components/home/navbar/SessionNavbar.jsx";


const Home = () => {
    const cards = useLoaderData();

    // Check if accessToken is available
    const isSessionActive = localStorage.getItem("accessToken");

    return (
        <div>
            {isSessionActive ? <SessionNavbar /> : <Navbar />}  {/* Conditional rendering based on accessToken */}
            <Banner />
            <AboutUs />

            <div className='flex flex-col items-center justify-center mt-0 mb-8 ' id='services'>
                <h1 className='text-black text-2xl md:text-4xl font-metamorphous font-bold text-center'>Featured Courses</h1>
            </div>
            <div className="flex flex-col lg:flex-row  items-center  justify-center">
                <div className='flex flex-col items-center w-full lg:w-5/12 mb-8'>
                    <div className="course-card-list justify-content-center">

                    </div>
                </div>

            </div>
            <CourseCard />
            <Footer />
        </div>
    );
};

export default Home;
