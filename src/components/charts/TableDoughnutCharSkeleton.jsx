import React from 'react';
import Skeleton from 'react-loading-skeleton';

const TableDoughnutChartSkeleton = ({labels, height}) => {
    const baseColor = "#f2f7f8"; // refactor in the future

    return (
    <div style={{ width: "100%", height: height}}>
        <div className="doughnut-chart-skeleton">
            <ul className="legend-skeleton">
                {labels.map(label => <li key={label}><Skeleton height={25} baseColor={baseColor} /></li>)}
            </ul>
            <div className="doughnut-skeleton">
                <Skeleton circle width={450} height={450} baseColor={baseColor} />
            </div>
        </div>
    </div>
    )
}

export default TableDoughnutChartSkeleton;