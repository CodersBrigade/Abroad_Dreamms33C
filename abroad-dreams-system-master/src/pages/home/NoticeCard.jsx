// NoticeCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart, FaPlus } from 'react-icons/fa';

function NoticeCard({ notice }) {
    return (
        <Card style={{ width: '18rem' }} className="notice-card">
            <Card.Body>
                <Card.Title>{notice.title}</Card.Title>
                <Card.Text>{notice.description}</Card.Text>
                <Card.Text>Date: {new Date(notice.date).toLocaleDateString()}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default NoticeCard;
