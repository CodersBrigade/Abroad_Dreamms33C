import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

import {FaUserGraduate} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import loginImage from '../../assets/images/login.png'; // Import the login image
import 'bootstrap/dist/css/bootstrap.min.css';


const StudentLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(""); // New state for error message


    const handleLogin = async (e) => {
        e.preventDefault();


        // Replace "http://localhost:8080" with the actual URL of your backend
        const backendUrl = "http://localhost:8080";


        try {
            const response = await axios.post(`${backendUrl}/authenticate`, {
                email, password
            });
            const userData = response?.data?.data;

            localStorage.setItem("accessToken", userData?.token)
            localStorage.setItem("userId",userData?.userId)
// localStorage.clear()
            // Check if user exists and perform login logic
            if (userData?.role == "students") {
                // Passwords match, perform your login logic here
                console.log("Login successful!", userData);
                navigate('/student/dashboard');
                window.location.href = '/student/dashboard';

            } else if (userData?.role == "admin") {
                navigate('/admin/dashboard');
                window.location.href = '/admin/dashboard';

            } else {
                console.log("Username/Password Mismatch");
                setError("Username/Password Mismatch");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError("Login error");
        }
    };

    return (
        <div className="container" style={{marginTop: '40px'}}>
            <div className="row justify-content-center align-items-center vh-80">
                {/* Add the image here */}
                <img src={loginImage} alt="Login" className="col-md-5" style={{maxWidth: '100%', marginRight: '20px'}}/>

                <form className="col-md-4" onSubmit={handleLogin}>
                    <h1 className="text-center mb-4">Login! </h1>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>)}
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
                            <span className="input-group-text"><FaUserGraduate/></span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="input-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}  // Connect the input to the password state
                                onChange={(e) => setPassword(e.target.value)}  // Update the password state
                                required
                            />
                            <span className="input-group-text"><RiLockPasswordFill/></span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe"/>
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a href="#" className="float-end mb-4">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Login</button>
                    <div className="mt-2 text-center mb-4">
                        <p>Don't have an account? <a href="../student/sign-up">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
