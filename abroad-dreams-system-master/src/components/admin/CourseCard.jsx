import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';

function CourseCard({ course, onEdit, onRemove, onToggleWishlist }) {
    const [isWishlistActive, setWishlistActive] = useState(false);

    const handleToggleWishlist = () => {
        setWishlistActive(!isWishlistActive);
        onToggleWishlist(course.courseId, !isWishlistActive);
    };

    return (
        <Card className="course-card">
            {course && (
                <>
                    <Card.Img variant="top" src={course.imageURL || "default-image.jpg"} alt="Course Image" />
                    <Card.Body>
                        <Card.Title>{course.courseName}</Card.Title>
                        <Card.Text>
                            <strong>ID:</strong> {course.courseId} <br />
                            <strong>Credits:</strong> {course.credits} <br />
                            <strong>Duration:</strong> {course.durationYears} Years <br />
                            <strong>Fee:</strong> {course.courseFee} <br />
                            <strong>Availability:</strong> {course.availability ? 'Available' : 'Not Available'}
                        </Card.Text>
                        <div className="card-icons">
                            <FontAwesomeIcon
                                icon={isWishlistActive ? faHeart : faHeart}
                                className={`wishlist-icon ${isWishlistActive ? 'active' : ''}`}
                                onClick={handleToggleWishlist}
                            />
                            <Button variant="primary" onClick={() => onEdit(course.courseId)}>
                                <FontAwesomeIcon icon={faEye} /> View
                            </Button>
                        </div>
                    </Card.Body>
                </>
            )}
        </Card>
    );
}

export default CourseCard;
