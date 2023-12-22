import React from "react";
import './LoginForm.css';
import { FaUserGraduate } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginForm = () => {
    return (
        <div className="wrapper">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type ="text" placeholder="Username" required />
                    <FaUserGraduate className="icon"/>
                </div>
                <div className="input-box">
                    <input type ="password" placeholder="Password" required />
                    <RiLockPasswordFill className="icon"/>
                </div>

                <div className="remember-forgot">
                    <label><input type ="checkbox"/>Remember me</label>
                    <a href="#">Forgot Password?</a>
                </div>

                <button type="Submit">Login</button>

                <div className="register-link">
                    <p>Dont have an account? <a href="#">Register</a></p>
                </div>
            </form>

        </div>
    );
};

export default LoginForm