import React from 'react';
import _ from 'lodash';

const TableBody = ({data, columns, currentPage, pageSize}) => {
    let no = (currentPage - 1) * pageSize + 1;

    return (
        <tbody>
            {data.map(item => (
                <tr key={item._id}>
                    <td>{no++}</td>
                    {columns.map(({path, content, key}) => (
                        <td className={key ? 'td-buttons' : ''} key={key ? key : path}>
                            {!content ? _.get(item, path) : content(item._id)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;