import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginAdmin.css'; // Import a custom CSS file for additional styling

function LoginAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
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
    <div className="login-container">
      
      <Container className="login-form" fluid>
      
        <Row>
        
          <Col>
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{fontWeight:"bold",fontSize:30,marginTop:-20}}>Login</Form.Label>
                <Form.Label>Email Address</Form.Label>
                
                <Form.Control
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                className="login-button"
                variant="primary"
                type="submit"
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginAdmin;
