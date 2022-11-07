import React from 'react';
import TableHeadSkeleton from './TableHeadSkeleton';

const TableHead = ({columns}) => {
    return (
        <>
            <thead className='thead-dark'>
                <tr>
                    <th>No</th>
                    {columns.map(column => (
                        <th className='table-head' key={column.path ? column.path : column.key} scope="col">
                            {column.title}
                        </th>
                    ))}
                </tr>
            </thead>
        </>
    );
}

export default TableHead;