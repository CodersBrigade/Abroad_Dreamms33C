import React, { useState } from "react";
import { Container, Card, Form, Button, Modal } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddNotice = ({ onAddNotice }) => {
  const [newNotice, setNewNotice] = useState("");
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const addNotice = async () => {
    if (newNotice.trim() === "") {
      setError("Notice cannot be empty.");
      setShowErrorModal(true);
      return;
    }

    if (newNotice.length > 200) {
      setError("Notice cannot exceed 200 characters.");
      setShowErrorModal(true);
      return;
    }

    // Additional validations
    // const containsSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(newNotice);
    // if (containsSpecialChars) {
    //   setError("Notice cannot contain special characters.");
    //   setShowErrorModal(true);
    //   return;
    // }

    // Check if the notice contains profanity (example)
    const profanityList = ["hate", "fight", "angry"];
    const containsProfanity = profanityList.some((word) =>
      newNotice.toLowerCase().includes(word.toLowerCase())
    );

    if (containsProfanity) {
      setError("Please avoid using inappropriate language.");
      setShowErrorModal(true);
      return;
    }

    // Add other appropriate validations

    try {
      // Update the backend with the new notice using Axios
      const response = await axios.post("your_backend_api_url/add_notice", {
        notice: newNotice,
      });

      // Assuming the response has a 'data' property containing the updated notice
      const data = response.data;

      // Call the parent component's callback to update notices
      onAddNotice(data.notice);
      setNewNotice("");
      setError(null);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Server error: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error sending the request.");
      }

      setShowErrorModal(true);
    }
  };

  const handleInputChange = (e) => {
    setNewNotice(e.target.value);
    setError(null); // Clear error when user types
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <Container className="mt-4 notice-board">
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Notices</Card.Title>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add a new notice"
              value={newNotice}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={addNotice}>
            Add Notice
          </Button>
        </Card.Body>
      </Card>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger">{error}</Modal.Body>
      </Modal>
    </Container>
  );
};

export default AddNotice;
