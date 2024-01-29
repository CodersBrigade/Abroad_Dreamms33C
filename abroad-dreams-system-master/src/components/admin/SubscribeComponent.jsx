import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SubscribeComponent = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Add logic for subscription here
        console.log(`Subscribed with email: ${email}`);
    };

    return (
        <div className="subscribe-container" style={{ backgroundColor: 'black', padding: '20px', color: 'white' }}>
            <div className="row">
                {/* Text on the left half (2/4) */}
                <div className="col-md-6">
                    <h2>Subscribe to Our Newsletter</h2>
                    <p>Stay updated with our latest news and updates. Subscribe now!</p>
                </div>

                {/* Input on the right half (2/4) */}
                <div className="col-md-6">
                    <Form onSubmit={handleSubscribe} className="mt-4">
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="light" type="submit">
                            Subscribe
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SubscribeComponent;
