// src/components/AppointmentAnimationComponent.jsx

import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/calendar-animation.json'
class CalendarAnimation extends Component {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            renderer: 'svg'
        }
        return (
            <div>
                <Lottie
                    options={defaultOptions}
                    height={500}
                    width={500}
                />
            </div>
        )
    };
}
export default CalendarAnimation;
