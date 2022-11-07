import React from 'react';
import { useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';

const SidebarCollapsibleItem = ({label, iconClass, items}) => {
    const ref = React.createRef();

    const handleCollapse = ({ current }) => {
        if (!current.className.includes('collapsible--expanded'))
            current.className += ' collapsible--expanded';
        else
            current.className = current.className.replace('collapsible--expanded', '');
    }

    return (
        <>
            <li ref={ref} className={"sidebar-item collapsible collapsible--expanded"} onClick={() => handleCollapse(ref)}> 
                <span className="sidebar-link waves-effect waves-dark sidebar-link">
                    <i className={iconClass}></i>
                    <span className="hide-menu">{label}</span>
                </span>
            </li>
            <ul id='sidebarnav' className='collapsible__items'>
                {items.map(({label, iconClass, href, hide}) => (
                    !hide && <SidebarItem key={href} label={label} iconClass={iconClass} href={href} />
                ))}
            </ul>
        </>
    );
}

export default SidebarCollapsibleItem;