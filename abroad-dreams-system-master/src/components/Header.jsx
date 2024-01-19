import { useState } from 'react'
import companyLogo from '../assets/abroad-dreams-logo.svg';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";


function Header() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Link to="/">
            <img src={companyLogo} width="300" className="d-inline-block align-top" alt="" />
          </Link>
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
