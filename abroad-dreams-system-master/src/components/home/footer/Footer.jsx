import React from "react";
import logo from '../../../assets/abroad-dreams-logo-dark.png';
import { FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';



const Footer = () => {


    return (
        <div>
            <footer className="footer p-5 bg-success mt-5 text-white font-bold">
                <div className="container d-flex align-items-center justify-content-between">
                    {/* Left Container */}

                    <div className="left-container">
                        <div className="mb-3"><strong>Developed By Coders Brigade</strong></div>
                        <div><strong>Address:</strong> Maitidevi, Kathmandu</div>
                        <div><strong>Email:</strong> abroad.dreams.com@gmail.com</div>

                    </div>

                    {/* Center Container */}
                    <div className="center-container ">
                        <img src={logo} width={300} className="img-fluid" alt=""/>



                    </div>

                    {/* Right Container */}
                    <div className="right-container">
                        <div className="mb-3 font-weight-bold">Follow Us</div>
                        <div className="d-flex gap-3">
                            <a href="https://www.instagram.com/abroad-dreams" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaInstagram className="social-icon" />
                            </a>
                            <a href="https://www.facebook.com/abroad-dreams" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaFacebook className="social-icon" />
                            </a>
                            <a href="https://github.com/CodersBrigade/abroad-dreams.git" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaGithub className="social-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
