import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginAdmin.css'

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === 'admin@gmail.com' && password === 'admin') {
      // Successful login
      window.location = '/admin';
    } else {
      // Display error message
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="Login">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group controlId="formBasicEmail">
              <h3>Login</h3>
              <p>Welcome back!</p>
              <Form.Label style={{fontWeight:"bold",color:"green",marginLeft:125, marginBottom:20}} >Email Address</Form.Label>

              <Form.Control
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <br />

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{fontWeight:"bold",color:"green",marginLeft:140,marginBottom:20}}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="btn btn-primary"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default LoginAdmin;
