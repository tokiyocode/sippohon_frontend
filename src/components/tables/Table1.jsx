import React, { useState } from 'react';
import TableBody from './TableBody1';
import TableHead from './TableHead1';
import Pagination from '../Pagination';
import _ from 'lodash';
import paginate from '../../utils/paginate';
import SearchBox from './SearchBox';
import { useEffect } from 'react';

const Table = ({columns, pageSize=10, onGetPageData}) => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ searchQuery, setSearchQuery ] = useState("");

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }

    const pagedData = onGetPageData(searchQuery);
    const itemsCount = pagedData.length;
    const paginatedData = paginate(pagedData, currentPage, pageSize);

    return (
        <div className="card">
            <div className="card-body">
                <ul className="navbar-nav float-start me-auto">
                    <SearchBox value={searchQuery} onSearch={handleSearch} />
                </ul>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <TableHead data={pagedData} columns={columns} />
                    <TableBody 
                        pageSize={pageSize}
                        currentPage={currentPage}
                        data={paginatedData} 
                        columns={columns} />
                </table>
            </div>
            <Pagination itemsCount={itemsCount} pageSize={pageSize} onPageChange={handlePageChange} />
        </div>
    );
}

export default Table;