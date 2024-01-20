import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import Header from "../../components/Header.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";

export default function SystemUser() {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [showForm, setShowForm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            fetchUsers();
        } else {
            fetchUserById(searchQuery);
        }
    };

    const handleClose = () => setShowForm('');

    const [userData, setUserData] = useState({
        username: '',
        role: '',
        email: '',
        password: '',
        roles: [], // You may need to adjust this based on your data structure
    });

    const [editUserData, setEditUserData] = useState({
        username: '',
        role: '',
        email: '',
        password: '',
        roles: [],
    });

    const handleShow = (formType, userId = null) => {
        setShowForm(formType);
        setEditUserId(userId);

        if (!userId) {
            setUserData({
                username: '',
                role: '',
                email: '',
                password: '',
                roles: [],
            });
        }
    };

    const handleSaveUser = () => {
        axios
            .post('http://localhost:8080/system-user/save', userData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            })
            .then((response) => {
                console.log('User saved successfully:', response.data);
                handleClose();
                fetchUsers();
            })
            .catch((error) => {
                console.error('Error saving user:', error);
            });
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/system-user/getAll', {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            console.log('Fetched users:', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    const fetchUserById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/system-user/getById/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            console.log('Fetched user by ID:', response.data);
            setUsers([response.data]);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
        }
    };

    const handleRemoveUser = (userId) => {
        if (userId === undefined) {
            console.error("Invalid ID: ID is undefined");
            return;
        }
        axios
            .delete(`http://localhost:8080/system-user/delete/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            })
            .then((response) => {
                console.log(`User with ID ${userId} removed successfully`);
                fetchUsers();
            })
            .catch((error) => {
                console.error(`Error removing user with ID ${userId}:`, error);
            });
    };

    const handleUpdateUser = () => {
        axios
            .put(`http://localhost:8080/system-user/update/${editUserId}`, editUserData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            })
            .then((response) => {
                console.log('User updated successfully:', response.data);
                handleClose();
                fetchUsers();
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    const handleEditUser = (userId) => {
        const userToEdit = users.find((user) => user.userId === userId);

        setEditUserData({
            username: userToEdit.username,
            role: userToEdit.role,
            email: userToEdit.email,
            password: '', // You may need to handle password separately based on your security policies
            roles: userToEdit.roles,
        });

        handleShow('editUser', userId);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="d-flex">
            <AdminSidebar />
            <Container fluid className="flex-grow-1">
                <Header/>
                <AdminProfileBar/>
                <div className="wrapper">
                    <div className="d-flex align-items-center mb-3">
                        {/*<button className="btn btn-dark mr-2 m-1" onClick={() => { handleShow("addUser") }}>Add New User +</button>*/}
                        <input
                            type="text"
                            className="form-control mr-2"
                            placeholder="Search by ID"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>

                    {Array.isArray(users) && users.map((user) => (
                        <div className="item" key={user.userId}>
                            {<strong>ID: {user.userId}</strong>} {user.username}{" -- "}{user.role}
                            <div>
                                <button className="btn btn-danger m-1" onClick={() => handleEditUser(user.userId)}>
                                    <FaEdit /> View Details/Edit
                                </button>
                                <button className="btn btn-success m-1" onClick={() => handleRemoveUser(user.userId)}>
                                    <FaTrash /> Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <Modal
                        show={Boolean(showForm)}
                        onHide={handleClose}
                        animation={false}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >

                        {showForm === 'editUser' && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Edit User
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Form fields for editing user */}
                                        <Form.Group className="mb-3" controlId="formEditUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Username"
                                                value={editUserData.username}
                                                onChange={(e) => setEditUserData({ ...editUserData, username: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditRole">
                                            <Form.Label>Role</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Role"
                                                value={editUserData.role}
                                                onChange={(e) => setEditUserData({ ...editUserData, role: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEditEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter Email"
                                                value={editUserData.email}
                                                onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                                            />
                                        </Form.Group>

                                        {/* You may add more fields here based on your entity structure */}

                                    </Form>
                                </Modal.Body>
                            </>
                        )}

                        {showForm === 'addUser' && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Add User
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Form fields for adding a new user */}
                                        <Form.Group className="mb-3" controlId="formUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Username"
                                                value={userData.username}
                                                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formRole">
                                            <Form.Label>Role</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Role"
                                                value={userData.role}
                                                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter Email"
                                                value={userData.email}
                                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                            />
                                        </Form.Group>

                                        {/* You may add more fields here based on your entity structure */}

                                    </Form>
                                </Modal.Body>
                            </>
                        )}

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            {showForm === 'addUser' && <Button variant="success" onClick={handleSaveUser}>Add User</Button>}
                            {showForm === 'editUser' && <Button variant="primary" onClick={handleUpdateUser}>Update User</Button>}
                        </Modal.Footer>
                    </Modal>

                </div>
            </Container>
        </div>
    );
}
