import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

function PageNotFound() {
    const [loading, setLoading] = useState(true);
    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 800 },
    });

    const pageNotFoundContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#FFFFFF',
    };

    const pageNotFoundContentStyle = {
        textAlign: 'center',
        color: '#82B041', // Theme color
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

    useEffect(() => {

    }, []);

    return (
        <div style={Object.assign({}, pageNotFoundContainerStyle, fadeIn)}>
            <animated.div style={pageNotFoundContentStyle}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <h1 style={h1Style}>Page Not Found!</h1>
                        <p style={pStyle}>You need to be logged in to continue...</p>
                        <p style={pStyle}>Would you like to <Link to="/login">Login</Link>?</p>
                    </>
                )}
            </animated.div>
        </div>
    );
}

export default PageNotFound;
