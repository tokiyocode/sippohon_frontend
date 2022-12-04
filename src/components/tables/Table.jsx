import React, { useState } from 'react';
import paginate from '../../utils/paginate';
import Pagination from '../Pagination';
import SearchBox from '../SearchBox';
import TableBody from './TableBody';
import TableBodySkeleton from './TableBodySkeleton';
import TableHead from './TableHead';
import TableHeadSkeleton from './TableHeadSkeleton';

const Table = ({columns, pageSize=10, onGetPageData, isLoading}) => {
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
    const preloaderSkeletonColor = "#f2f7f8"; // refactor this in the future, this file should not concern about styling

    return (
        <div className="card">
            <div className="card-body">
                <ul className="navbar-nav float-start me-auto">
                    <SearchBox value={searchQuery} onSearch={handleSearch} />
                </ul>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    {isLoading ? <TableHeadSkeleton numOfThs={columns.length + 1} baseColor={preloaderSkeletonColor} /> : <TableHead columns={columns} />}
                    {isLoading ? 
                        <TableBodySkeleton numOfTds={columns.length + 1} pageSize={pageSize} baseColor={preloaderSkeletonColor} /> :
                        <TableBody 
                            pageSize={pageSize}
                            currentPage={currentPage}
                            data={paginatedData} 
                            columns={columns} 
                        />
                    }
                    
                </table>
            </div>
            <Pagination itemsCount={itemsCount} pageSize={pageSize} onPageChange={handlePageChange} />
        </div>
    );
}

export default Table;