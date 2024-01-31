// Notice.jsx

import React, { useState, useEffect } from 'react';
import { Container, Table, Button} from 'react-bootstrap';
import NoticeService from '../../admin/NoticeService.js';
import Header from "../../../components/Header.jsx";
import StudentSidebar from "./StudentSidebar.jsx";
import StudentProfileBar from "../../../components/student/StudentProfileBar.jsx";

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
        <div>
            <Header/>
        <div className="d-flex">
            <StudentSidebar />
            <Container>
                <div >
                    <StudentProfileBar/>
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
                            <td>{new Date(notice.date).toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

            </Container>
        </div>
        </div>
    );
}
