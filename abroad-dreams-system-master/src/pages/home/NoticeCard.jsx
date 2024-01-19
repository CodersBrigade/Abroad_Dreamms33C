import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart, FaPlus, FaTimes } from 'react-icons/fa';

function NoticeCard({ notice }) {
    const [isRead, setIsRead] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const handleToggleRead = () => {
        setIsRead(!isRead);
    };

    const handleCloseCard = () => {
        setIsHidden(true);
    };

    return (
        !isHidden && (
            <Card className={`notice-card ${isRead ? 'read' : 'unread'}`}>
                <div className="card-header">
                    <Card.Title>{notice.title}</Card.Title>
                    <Button
                        variant="link"
                        className="close-icon"
                        onClick={handleCloseCard}
                    >
                        <FaTimes />
                    </Button>
                </div>
                <Card.Body>
                    <Card.Text>{notice.description}</Card.Text>
                    <Card.Text>Date: {new Date(notice.date).toLocaleDateString()}</Card.Text>
                </Card.Body>
            </Card>
        )
    );
}

export default NoticeCard;
