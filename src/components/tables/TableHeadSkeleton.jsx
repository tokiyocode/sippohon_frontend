import _ from 'lodash';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const TableHeadSkeleton = ({ numOfThs, ...others }) => {
  const numOfThsArray = _.range(0, numOfThs);

  return (
    <thead className='thead-dark'>
        <tr>    
            {numOfThsArray.map(num => (
                <th className='table-head' key={num} scope="col">
                    <Skeleton {...others} />
                </th>
            ))}
        </tr>    
    </thead>
  );
}

export default TableHeadSkeleton