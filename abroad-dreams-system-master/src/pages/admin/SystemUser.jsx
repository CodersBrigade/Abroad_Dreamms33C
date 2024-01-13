// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";

// Create the SystemUser component
export default function SystemUser() {
    // State variables
    const [systemUsers, setSystemUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [showForm, setShowForm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            fetchSystemUsers();
        } else {
            fetchSystemUserById(searchQuery);
        }
    };

    const handleClose = () => setShowForm('');

    const [systemUserData, setSystemUserData] = useState({
        username: "",
        email: "",
        password: "",
        role: "Student", // Set the default role
    });


    const [editSystemUserData, setEditSystemUserData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleShow = (formType, userId = null) => {
        setShowForm(formType);
        setEditUserId(userId);

        if (!userId) {
            setSystemUserData({
                username: "",
                email: "",
                password: "",
            });
        }
    };

    const handleSaveSystemUser = () => {
        axios
            .post('http://localhost:8080/system-user/save', systemUserData,
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}})
            .then((response) => {
                console.log('SystemUser saved successfully:', response.data);
                handleClose();
                fetchSystemUsers();
            })
            .catch((error) => {
                console.error('Error saving SystemUser:', error);
            });
    };

    const fetchSystemUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/system-user/getAll',
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            console.log('Fetched SystemUser:', response.data);
            setSystemUsers(response.data);
        } catch (error) {
            console.error('Error fetching SystemUser:', error);
        }
    };

    const fetchSystemUserById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/system-user/getById/${id}`,
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}});
            console.log('Fetched SystemUser by ID:', response.data);
            setSystemUsers([response.data]);
        } catch (error) {
            console.error('Error fetching SystemUser by ID:', error);
        }
    };

    const handleRemoveSystemUser = (userId) => {
        if (userId === undefined) {
            console.error("Invalid ID: ID is undefined");
            return;
        }
        axios
            .delete(`http://localhost:8080/system-user/delete/${userId}`,
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}})
            .then((response) => {
                console.log(`SystemUser with ID ${userId} removed successfully`);
                fetchSystemUsers();
            })
            .catch((error) => {
                console.error(`Error removing SystemUser with ID ${userId}:`, error);
            });
    };

    const handleUpdateSystemUser = () => {
        axios
            .put(`http://localhost:8080/system-user/update/${editUserId}`, editSystemUserData,
                {headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}})
            .then((response) => {
                console.log('SystemUser updated successfully:', response.data);
                handleClose();
                fetchSystemUsers();
            })
            .catch((error) => {
                console.error('Error updating SystemUser:', error);
            });
    };

    const handleEditSystemUser = (userId) => {
        const systemUserToEdit = systemUsers.find((systemUser) => systemUser.userId === userId);

        setEditSystemUserData({
            username: systemUserToEdit.username,
            email: systemUserToEdit.email,
            password: systemUserToEdit.password,
        });

        handleShow('editSystemUser', userId);
    };

    useEffect(() => {
        fetchSystemUsers();
    }, []);

    return (
        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />

            <Container fluid className="flex-grow-1">
                <AdminProfileBar/>
                <div className="wrapper">
                    <div className="d-flex align-items-center mb-3">
                        <button className="btn btn-dark mr-2 m-1" onClick={() => { handleShow("addSystemUser") }}>Add New SystemUser +</button>
                        <input
                            type="text"
                            className="form-control mr-2"
                            placeholder="Search by ID"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>

                    {Array.isArray(systemUsers) &&
                        systemUsers.map((systemUser) => (
                            <div className="item" key={systemUser.userId}>
                                {<strong>ID: {systemUser.userId}</strong>} {systemUser.name}{" -- "}{systemUser.email}{" -- "}{systemUser.role}
                                <div>
                                    <button className="btn btn-danger m-1" onClick={() => handleEditSystemUser(systemUser.userId)}>View Details/Edit</button>
                                    {/*<button className="btn btn-success m-1" onClick={() => handleRemoveSystemUser(systemUser.userId)}>Remove</button>*/}
                                </div>
                            </div>
                        ))
                    }

                    <Modal
                        show={Boolean(showForm)}
                        onHide={handleClose}
                        animation={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >

                        {showForm === 'editSystemUser' && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Edit SystemUser
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Form fields for editing SystemUser */}
                                        <Form.Group className="mb-3" controlId="formEditSystemUserUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Username"
                                                value={editSystemUserData.username}
                                                onChange={(e) => setEditSystemUserData({ ...editSystemUserData, username: e.target.value })}
                                            />
                                        </Form.Group>


                                        <Form.Group className="mb-3" controlId="formEditSystemUserEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter Email"
                                                value={editSystemUserData.email}
                                                onChange={(e) => setEditSystemUserData({ ...editSystemUserData, email: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditSystemUserPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter Password"
                                                value={editSystemUserData.password}
                                                onChange={(e) => setEditSystemUserData({ ...editSystemUserData, password: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                            </>
                        )}

                        {showForm === 'addSystemUser' && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Add SystemUser
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Form fields for adding a new SystemUser */}
                                        <Form.Group className="mb-3" controlId="formSystemUserUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Username"
                                                value={systemUserData.username}
                                                onChange={(e) => setSystemUserData({ ...systemUserData, username: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formSystemUserEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter Email"
                                                value={systemUserData.email}
                                                onChange={(e) => setSystemUserData({ ...systemUserData, email: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formSystemUserPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Enter Password"
                                                value={systemUserData.password}
                                                onChange={(e) => setSystemUserData({ ...systemUserData, password: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                            </>
                        )}

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            {showForm === 'addSystemUser' && <Button variant="success" onClick={handleSaveSystemUser}>Add SystemUser</Button>}
                            {showForm === 'editSystemUser' && <Button variant="primary" onClick={handleUpdateSystemUser}>Update SystemUser</Button>}
                        </Modal.Footer>
                    </Modal>

                </div>
            </Container>
        </div>
    );
}
