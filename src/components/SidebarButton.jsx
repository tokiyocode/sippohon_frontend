import React from 'react';

const SidebarButton = ({label, onClick}) => {
    return (
        <li className="text-center p-40 upgrade-btn">
            <button onClick={onClick} className="btn d-block w-100 btn-danger text-white" target="_blank">{label}</button>
        </li>
    );
}

export default SidebarButton;