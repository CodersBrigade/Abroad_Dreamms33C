import React, { useState } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

import 'bootstrap/dist/css/bootstrap.min.css';


function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Replace "http://localhost:8080" with the actual URL of your backend
    const backendUrl = "http://localhost:8080";

    try {
      const response = await axios.get(`${backendUrl}/system-user/getByEmail/${email}`);
      const userData = response.data;

      // Check if user exists and perform login logic
      if (userData) {

        // Check if the entered password matches the password from the response
        if (password === userData.password) {
          // Passwords match, perform your login logic here
          console.log("Login successful!", userData);
          navigate('/admin');
        } else {
          console.log("Incorrect password");
          setError("Incorrect password");
        }
      } else {
        console.log("User not found");
        setError("User not found");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login error");
    }
  };
  return (
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <form className="col-md-4" onSubmit={handleLogin}>
            <h1 className="text-center mb-4">Administrator Login </h1>
            {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div> )}
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
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}  // Connect the input to the password state
                    onChange={(e) => setPassword(e.target.value)}  // Update the password state
                    required
                />
                <span className="input-group-text"><RiLockPasswordFill /></span>
              </div>
            </div>
            <div className="mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className="float-end mb-4">Forgot Password?</a>
            </div>
            <button type="submit" className="btn btn-danger w-100">Login</button>
            <div className="mt-2 text-center mb-4">
              <p>Don't have an account? <a href="#">Register</a></p>
            </div>
          </form>
        </div>
      </div>
  );
}

export default LoginAdmin;
