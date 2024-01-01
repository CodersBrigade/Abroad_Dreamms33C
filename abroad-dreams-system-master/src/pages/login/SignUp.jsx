import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    if (password === confirmPassword) {
      try {
        const response = await axios.post("http://localhost:8080/system-user/save", {
          username: username,
          email: email,
          password: password,
          phone:'0000000000',
          name:'Hello',
        });

        console.log("User saved successfully:", response.data);
        navigate('/login/student');
      } catch (error) {
        console.error("Error saving user:", error);
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
      <div className="loginSignUp">
        <div className="loginSignUp-Container">
          <h1><strong>Sign Up Here</strong></h1>
          <div className="loginSignUp-Fields">
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
            <input type="email" placeholder="Email Address" value={email} onChange={handleEmailChange} />
            <div className="password-input">
              <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
              />
            </div>
            <div className="confirm-password-input">
              <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
          <button onClick={handleSignUp}>Register</button>
          {/* ... (your existing JSX) */}
        </div>
      </div>
  );
};

export default SignUp;
