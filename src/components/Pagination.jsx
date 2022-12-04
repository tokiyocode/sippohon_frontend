import React from 'react';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';

const Pagination = ({
        itemsCount, 
        pageSize, 
        onPageChange}) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount <= 1)
        return null;

    return <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                pageCount={pagesCount}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                breakLinkClassName="page-link"
                onPageChange={onPageChange}
             />
}

export default Pagination;