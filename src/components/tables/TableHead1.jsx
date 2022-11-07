import React from 'react';

const TableHead = ({data, columns}) => {
    if (data.length === 0)
        return;

    return (
        <thead className='thead-dark'>
            <tr>
                <th>No</th>
                {columns.map(column => <th className='table-head' key={column.path ? column.path : column.key} scope="col">{column.title}</th>)}
            </tr>
        </thead>
    );
}

export default TableHead;