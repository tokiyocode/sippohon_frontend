import React from 'react';

const SearchBox = ({value, onSearch}) => {
    return (
        <li className="nav-item search-box">
            <form className="app-search position-absolute">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Cari..." 
                    value={value}
                    onChange={(e) => onSearch(e.currentTarget.value)} 
                />
            </form>
        </li>
    );
}

export default SearchBox;