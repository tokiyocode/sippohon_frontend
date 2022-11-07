import _ from 'lodash';
import React from 'react'
import Skeleton from 'react-loading-skeleton';

const TableBodySkeleton = ({ numOfTds, pageSize, ...others }) => {
    const numOfTdsArray = _.range(0, numOfTds);
    const numOfPageSizes = _.range(0, pageSize);

    return (
        <tbody>
            {numOfPageSizes.map(num => (
                <tr key={num}>
                    {numOfTdsArray.map(index => <td key={index}><Skeleton {...others} /></td>)}
                </tr>
            ))}
        </tbody>
    )
}

export default TableBodySkeleton