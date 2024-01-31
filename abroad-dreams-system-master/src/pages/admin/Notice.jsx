// Notice.jsx

import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

import NoticeService from './NoticeService.js';
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import Header from "../../components/Header.jsx";
import AdminProfileBar from "../../components/admin/AdminProfileBar.jsx";

export default function Notice() {
    const [searchNoticeId, setSearchNoticeId] = useState('');

    const [notices, setNotices] = useState([]);
    const [showForm, setShowForm] = useState('');
    const [selectedNotice, setSelectedNotice] = useState({});
    const [noticeData, setNoticeData] = useState({
        // Add properties based on your NoticePojo structure
        date: new Date(),
        description: '',
    });

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await NoticeService.getAllNotices();
            setNotices(response.data);
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    const handleGetNoticeById = () => {
        if (searchNoticeId.trim() !== '') {
            // Call the service function to fetch notice by Notice ID
            NoticeService.getNoticeById(searchNoticeId)
                .then((result) => {
                    setNotices([result]);
                })
                .catch((error) => {
                    console.error('Error fetching notice by Notice ID:', error);
                });
        } else {
            // If search input is empty, fetch all notices
            fetchNotices();
        }
    };


    const handleClose = () => {
        setShowForm('');
        setSelectedNotice({});
    };

    const handleShow = (formType, notice) => {
        setShowForm(formType);
        setSelectedNotice(notice);

        if (!notice) {
            setNoticeData({
                date: new Date(),
                description: '',
                title:'',
            });
        } else {
            setNoticeData({
                date: new Date(notice.date),
                description: notice.description,
                title: notice.title
            });
        }
    };

    const handleSaveNotice = async () => {
        try {
            await NoticeService.addNotice(noticeData);
            handleClose();
            fetchNotices();
        } catch (error) {
            console.error('Error saving notice:', error);
        }
    };

    const handleUpdateNotice = async () => {
        try {
            await NoticeService.updateNotice(selectedNotice.noticeId, noticeData);
            handleClose();
            fetchNotices();
        } catch (error) {
            console.error('Error updating notice:', error);
        }
    };

    const handleRemoveNotice = async (noticeId) => {
        try {
            await NoticeService.deleteNotice(noticeId);
            fetchNotices();
        } catch (error) {
            console.error('Error removing notice:', error);
        }
    };

    return (
        <div><Header />
        <div className="d-flex">
            {/* AdminSidebar */}
            <AdminSidebar />
            <Container fluid className="flex-grow-1">

                <AdminProfileBar/>
                <div className="d-flex align-items-center mb-3">
                    <button className="btn btn-dark mr-2 m-1" onClick={() => handleShow('addNotice')}>Add New Notice +</button>
                </div>
                <div className="d-flex align-items-center mb-3">
                    <input
                        type="text"
                        placeholder="Enter Notice ID"
                        value={searchNoticeId}
                        onChange={(e) => setSearchNoticeId(e.target.value)}
                        className="form-control me-2"
                    />
                    <button className="btn btn-primary" onClick={() => handleGetNoticeById()}>
                        Search by Notice ID
                    </button>
                </div>


                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Notice ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notices.map((notice) => (
                        <tr key={notice.noticeId}>
                            <td>{notice.noticeId}</td>
                            <td>{notice.title}</td>
                            <td>{notice.description}</td>
                            <td>{new Date(notice.date).toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}</td>
                            <td>
                                <Button variant="success" onClick={() => handleShow('editNotice', notice)}>
                                    <FaEdit /> Edit
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleRemoveNotice(notice.noticeId)}>
                                    <FaTrash /> Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <Modal
                    show={Boolean(showForm)}
                    onHide={handleClose}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{showForm === 'addNotice' ? 'Add Notice' : 'Edit Notice'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formNoticeTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    value={noticeData.title}
                                    onChange={(e) => setNoticeData({ ...noticeData, title: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="formNoticeDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Description"
                                    value={noticeData.description}
                                    onChange={(e) => setNoticeData({ ...noticeData, description: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="formNoticeDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={noticeData.date}
                                    onChange={(e) => setNoticeData({ ...noticeData, date: e.target.value })}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {showForm === 'addNotice' ? (
                            <Button variant="primary" onClick={handleSaveNotice}>
                                Save Notice
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleUpdateNotice}>
                                Update Notice
                            </Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
        </div>
    );
}
