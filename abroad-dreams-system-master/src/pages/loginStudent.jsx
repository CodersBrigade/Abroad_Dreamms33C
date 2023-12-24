import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/signUp/LoginStudent.css";

function LoginStudent({ params }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location = "/student";
  };

  return (
    <div className="Login" style={{ marginTop: 10 }}>
      <Container className="mt-5 loginContainer">
        <Row>
          <h1>Login</h1>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <br />

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <p style={{cursor:'pointer'}}>Forgot password?</p>

              <Button variant="primary" type="submit">
                Login
              </Button>
              
            </Form>
          </Col>
          <div className="register-here">
            <p>New Here?</p>
            <a href="/register">Click Here to Register.</a>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LoginStudent;
