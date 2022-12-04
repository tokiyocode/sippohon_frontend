import _ from 'lodash';
import React, { forwardRef } from 'react';

const TablePrintTemplate = forwardRef(({columns, data}, ref) => {
    let num = 1;
    const pageSize = 10;
    const numOfTables = Math.ceil(data.length / pageSize);
    let numOfTablesArray = _.range(1, numOfTables + 1);
    let pagedData = [];

    return (
        <div ref={ref} className="page-wrapper-print">
            {numOfTablesArray.map(tableNumber => {
                if (num % pageSize === 1)
                    pagedData = _(data).slice(num - 1).take(pageSize).value();
                return (
                    <div key={tableNumber} className="card-print-wrapper">
                        <div className="card card-print py-3">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th>No</th>
                                            {columns.map(column => <th key={column.path}>{column.title}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagedData.map(item =>(
                                            <tr key={item._id}>
                                                <td>{num++}</td>
                                                {columns.map(column => <td>{_.get(item, column.path)}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>);
            })}
        </div>
    );
});
 
export default TablePrintTemplate;