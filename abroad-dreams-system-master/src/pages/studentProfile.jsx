import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfileForm.css'

function LoginStudent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [faculty, setFaculty] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle form submission logic here
    // For now, redirecting to /student
    window.location = '/student';
  };

  return (
    <div className="Login" style={{ marginTop: 100 }}>
      <Container
        className="mt-5"
        style={{
          backgroundColor: '#fcfcfc',
          borderWidth: 2,
          borderColor: 'black',
          borderStyle: 'solid',
          width: 900,
          padding: 40,
          paddingTop: 80,
          paddingBottom: 80,
          borderRadius: 20,
        }}
      >
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicFaculty">
                <Form.Label>Faculty</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter faculty"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
              </Form.Group>

              <Button
                style={{ width: 150, marginTop: 30 }}
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

export default LoginStudent;
