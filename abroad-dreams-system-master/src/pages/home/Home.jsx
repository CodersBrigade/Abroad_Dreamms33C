import { useLoaderData } from "react-router-dom";
import Banner from "../../components/home/banner/Banner";

import Footer from "../../components/home/footer/Footer";
import AboutUs from "../../components/home/aboutus/AboutUs.jsx";
import Navbar from "../../components/home/navbar/Navbar.jsx";


const Home = () => {
    const cards=useLoaderData();
    return (
        <div>
            <Navbar/>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <div className='flex flex-col items-center justify-center mt-0 mb-8 ' id='services' >
                <h1 className='text-black text-2xl md:text-4xl font-metamorphous font-bold text-center'>Featured Courses</h1>
            </div>
            <div className="flex flex-col lg:flex-row  items-center  justify-center">
                <div className='flex flex-col items-center w-full lg:w-5/12 mb-8'>
                    <div className="course-card-list justify-content-center">
                        <p><center> Featured Courses will be displayed here!</center></p>
                    </div>
                </div>

            </div>
            <Footer></Footer>
            </div>
    );
};

export default Home;
