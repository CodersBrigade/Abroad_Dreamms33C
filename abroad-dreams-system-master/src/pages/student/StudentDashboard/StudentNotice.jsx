// Notice.jsx

import React, { useState, useEffect } from 'react';
import { Container, Table, Button} from 'react-bootstrap';
import NoticeService from '../../admin/NoticeService.js';
import Header from "../../../components/Header.jsx";
import StudentSidebar from "./StudentSidebar.jsx";

export default function StudentNotice() {
    const [notices, setNotices] = useState([]);

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

    return (
        <div className="d-flex">
            <StudentSidebar />
            <Container>
                <Header />
                <div className="d-flex align-items-center mb-3">
                    <button className="btn btn-dark mr-2 m-1" onClick={() => handleShow('addNotice')}>Add New Notice +</button>
                </div>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Notice ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notices.map((notice) => (
                        <tr key={notice.noticeId}>
                            <td>{notice.noticeId}</td>
                            <td>{notice.title}</td>
                            <td>{notice.description}</td>
                            <td>{notice.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

            </Container>
        </div>
    );
}
