import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import {FaEye, FaEyeSlash, FaUserGraduate} from "react-icons/fa";
import loginImage from '../../assets/images/login.png';
import Header from "../../components/Header.jsx";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();  // Use useNavigate for navigation
    const [error, setError] = useState("");


    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const userData = JSON.parse(atob(accessToken.split(".")[1])); // Decode JWT payload
            if (userData?.role === "Student") {
                navigate('/student/dashboard');
            } else if (userData?.role === "Admin") {
                navigate('/admin/dashboard');
            }
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const backendUrl = "http://localhost:8080";

        try {
            const response = await axios.post(`${backendUrl}/authenticate`, {
                email, password
            });
            const userData = response?.data?.data;

            localStorage.setItem("accessToken", userData?.token);
            localStorage.setItem("userId", userData?.userId);
            localStorage.setItem("email", userData?.email);
            localStorage.setItem("username", userData?.username);
            localStorage.setItem("role", userData?.role);

            if (userData?.role === "Student") {
                console.log("Login successful!", userData);
                window.location.href = '/student/dashboard';
            } else if (userData?.role === "Admin") {

                console.log("Login successful!", userData);
                window.location.href = '/admin/dashboard';

            } else {
                console.log("Username/Password Mismatch");
                setError("Username/Password Mismatch");
            }
        } catch (error) {
            console.error("Authentication Failed!", error);
            // If login fails, show an error notification
            toast.error('Username/Password Mismatch! Please try again.', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setError("Authentication Failed!");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Header/>
        <div className="container" style={{ marginTop: '40px' }}>
            <div className="row justify-content-center align-items-center vh-80">
                <img src={loginImage} alt="Login" className="col-md-5" style={{ maxWidth: '100%', marginRight: '20px' }} />

                <form className="col-md-4" onSubmit={handleLogin}>
                    <h1 className="text-center mb-4">Login! </h1>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="mb-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <span className="input-group-text"><FaUserGraduate /></span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="input-group-text" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a href="/recover/forgot-password" className="float-end mb-4">Forgot Password?</a>
                    </div>

                    <button type="submit" className="btn btn-success w-100">Login</button>
                    <div className="mt-2 text-center mb-4">
                        <p>Don't have an account? <a href="../student/sign-up">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;
