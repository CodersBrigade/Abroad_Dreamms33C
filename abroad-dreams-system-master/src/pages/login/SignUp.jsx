import React, { useState } from "react";
import "./SignUp.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    if (password === confirmPassword) {
      alert("Sign up successful!");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="loginSignUp">
      <div className="loginSignUp-Container">
        <h1><strong>Sign Up Here</strong></h1>
        <div className="loginSignUp-Fields">
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email Address" />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {/* <div className="eye-icon" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div> */}
          </div>

          <div className="confirm-password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {/* <div className="eye-icon" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div> */}
          </div>
        </div>
        <button onClick={handleSignUp}>Continue</button>
        <p className="loginSignUp-Login">
          Already Have an Account ?<span>Login Here</span>
        </p>
        <div className="loginSignUp-Agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;