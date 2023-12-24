import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css'; // Import your CSS file

function SignUpStudent({ params }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Perform signup logic, e.g., send data to server
    alert('Signup successful!');
    // Redirect to the student page
    window.location = '/student';
  };

  return (
    <div className="loginSignUp">
      <Container className="loginSignUp-Container">
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            {/* <Form.Label>Username</Form.Label> */}
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            {/* <Form.Label>Confirm Password</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        <p className="loginSignUp-Login">
          Already Have an Account ?<span>Login Here</span>
        </p>
        <div className="loginSignUp-Agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing I agree to the terms of use & privacy policy.</p>
        </div>
      </Container>
    </div>
  );
}

export default SignUpStudent;
