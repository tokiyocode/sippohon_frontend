import React from 'react';

const NotFound = () => {
    return (
        <div className="error-box">
            <div className="error-body text-center">
                <h1 className="error-title text-success">404</h1>
                <h3 className="text-uppercase error-subtitle">HALAMAN TIDAK DITEMUKAN!</h3>
            </div>
        </div>
    );
}

export default NotFound;