import React from 'react';

const CircleButton = ({btnClass, iconClass, onClick}) => {
    return (
        <span onClick={onClick} className={`btn ${btnClass} btn-circle d-flex align-items-center justify-content-center`}>
            <i className={`mdi ${iconClass} text-white fs-41`} /> 
        </span>)
}

export default CircleButton;