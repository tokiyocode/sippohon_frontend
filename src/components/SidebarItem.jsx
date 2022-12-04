import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({label, href, iconClass}) => {
    return (
        <NavLink to={href}>
            <li className="sidebar-item"> 
                <span className="sidebar-link waves-effect waves-dark sidebar-link">
                    <i className={iconClass}></i>
                    <span className="hide-menu">{label}</span>
                </span>
            </li>
        </NavLink>
    );
}

export default SidebarItem;