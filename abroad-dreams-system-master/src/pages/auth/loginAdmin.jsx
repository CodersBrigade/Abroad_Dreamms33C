import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="Login" style={{ marginTop: 100 }}>
        <Container className="mt-5" style={{
          backgroundColor: '#fcfcfc',
          borderWidth: 2,
          borderColor: 'black',
          borderStyle: 'solid',
          width: 900,
          padding: 40,
          paddingTop: 80,
          paddingBottom: 80,
          borderRadius: 20,
        }}>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                      type="email"
                      placeholder="Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <br />

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button style={{ width: 150, marginTop: 30, backgroundColor:"green", borderColor:"green", }} variant="primary" type="submit">
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
