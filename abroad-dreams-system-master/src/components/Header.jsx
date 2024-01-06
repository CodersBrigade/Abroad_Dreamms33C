import { useState } from 'react'
// import reactLogo from '.'
// import viteLogo from '/vite.svg'
import companyLogo from '../assets/abroad-dreams-logo.svg';
// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';



function Header() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          {/*<img src={companyLogo} width="300" className="d-inline-block align-top" alt="" />*/}
          <Navbar.Brand href="/" style={{
            marginLeft: 10
          }}> <strong>Abroad Dreams</strong> | Consultancy Management System </Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>
    </>
  )
}

export default Header
