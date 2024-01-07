import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

function PageNotAuthorized() {
    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 800 },
    });

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
                <h1 style={h1Style}>Access Denied!</h1>
                <p style={pStyle}>You are not authorized to view this page.</p>
                <p style={pStyle}>Would you like to <Link to="/login">Login</Link>?</p>
            </animated.div>
        </div>
    );
}

export default PageNotAuthorized;
