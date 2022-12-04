import React from 'react';

const Breadcrumb = ({path}) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 d-flex align-items-center">
                <li className="breadcrumb-item">
                    <a href="index.html" className="link">
                        <i className="mdi mdi-home-outline fs-4">
                        </i>
                    </a>
                </li>
                {path.map(item => <li key={item} className="breadcrumb-item active" aria-current="page">{item}</li>)}
            </ol>
        </nav>
    );
}

export default Breadcrumb;