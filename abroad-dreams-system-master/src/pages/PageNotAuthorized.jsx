import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

function PageNotAuthorized() {
    const [loading, setLoading] = useState(true);
    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 800 },
    });

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        // Simulate an asynchronous check (e.g., fetching user data)
        const checkAccessToken = async () => {
            // Replace the setTimeout with an actual asynchronous check
            // In this example, we use setTimeout to simulate an asynchronous operation
            setTimeout(() => {
                setLoading(false);

                if (accessToken) {
                    // If accessToken is found, navigate or refresh
                    window.location.reload();
                }
            }, 0);
        };

        checkAccessToken();
    }, []);

    const pageNotAuthorizedContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#FFFFFF',
    };

    const pageNotAuthorizedContentStyle = {
        textAlign: 'center',
        color: '#FF0000', // Red color for emphasis
    };

    const h1Style = {
        fontSize: '3em',
        margin: '0',
        fontWeight: 'bold',
        letterSpacing: '2px',
    };

    const pStyle = {
        margin: '10px 0',
    };

    return (
        <div style={Object.assign({}, pageNotAuthorizedContainerStyle, fadeIn)}>
            <animated.div style={pageNotAuthorizedContentStyle}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <h1 style={h1Style}>Access Denied!</h1>
                        <p style={pStyle}>You are not authorized to view this page.</p>
                        <p style={pStyle}>Would you like to <Link to="/login">Login</Link>?</p>
                    </>
                )}
            </animated.div>
        </div>
    );
}

export default PageNotAuthorized;
