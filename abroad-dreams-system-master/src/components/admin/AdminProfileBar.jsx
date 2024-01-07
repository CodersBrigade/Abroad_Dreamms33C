import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FiBell, FiLogOut } from 'react-icons/fi';

const AdminProfileBar = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <Navbar className="bg-light justify-content-between">
            <Navbar.Text>Welcome, {localStorage.getItem("userId")}</Navbar.Text>
            <Nav>
                {/*<Nav.Link href="#" className="mr-3">*/}
                {/*    <FiBell size={24} />*/}
                {/*</Nav.Link>*/}
                <Nav.Link onClick={handleLogout}>
                    <FiLogOut color={"#820b14"} size={24} /> Logout
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default AdminProfileBar;
