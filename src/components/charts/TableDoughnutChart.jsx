import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getNumOfDocuments } from "../../services/utilsService";
import TableDoughnutChartSkeleton from "./TableDoughnutCharSkeleton";

ChartJS.register(ArcElement, Tooltip, Legend);

const TableDoughnutChart = ({width, height}) => {
    const [tableLengths, setTableLengths] = useState([]);
    const [labels, setLabels] = useState([]);
    const [numOfData, setNumOfData] = useState();
    const [numOfDocuments, setNumOfDocuments] = useState();
    const defaultOnClick = ChartJS.overrides["doughnut"].plugins.legend.onClick;

    useEffect( () => {
        async function getTableLengths() {
            const {data: numOfDocuments} = await getNumOfDocuments();
            const tableLengths = [];
            const labels = [];
            let numOfData = 0;
            let index = 0;
            Object
                .keys(numOfDocuments)
                .map(key => {
                    tableLengths[index] = numOfDocuments[key];
                    labels[index++] = key;
                    numOfData += numOfDocuments[key];
                });

            setTableLengths(tableLengths);
            setLabels(labels);
            setNumOfData(numOfData);
            setNumOfDocuments(numOfDocuments);
        };

        getTableLengths();
    }, []);

    const handleClickLegend = (e, legendItem, legend) => {
        let selectedItemValue;
            Object.keys(numOfDocuments).forEach(key => {
                if (key === legendItem.text)
                    selectedItemValue = numOfDocuments[key];
        });
        defaultOnClick(e, legendItem, legend);
        if (legendItem.hidden)
            setNumOfData(numOfData + selectedItemValue);
        else
            setNumOfData(numOfData - selectedItemValue);
            
    }

    const data={
        labels: labels,
        datasets: [
          {
            data: tableLengths,
            backgroundColor: [
              "#4dd08c",
              "#fdc90f",
              "#fc4b6c",
              "#1a9bfc",
              "#1e4db7"
            ],
            borderColor: [
              "#4dd08c",
              "#fdce27",
              "#fc5d7b",
              "#31a5fc",
              "#183e92"
            ],
            borderWidth: 1,
            cutout: "70%",
            // borderRadius: 10
          },
        ],
    };

    const options={
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                align: "start",
                labels: {
                    usePointStyle: true,
                    pointStyle: "rectRounded",
                    font: {
                        size: 16,
                        family: "Poppins, sans-serif"
                    }
                },
                onClick: handleClickLegend
            },
            counter: {
                fontSize: 60,
                fontFamily: "Poppins",
                value: numOfData
            }
        }
    };

    const counter = {
        id: "counter",
        beforeDraw: function(chart, args, options) {
            const {ctx, chartArea} = chart;
            const {width, height} = chartArea;
            ctx.save();
            const {fontSize, fontFamily, value} = options;
            const horizontalCenter = width / 2;
            const verticalCenter = height / 2 + (fontSize / 4);
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.textAlign = "center";
            ctx.fillText(value, horizontalCenter, verticalCenter);
        }
    };

    if (tableLengths.length === 0)
        return <TableDoughnutChartSkeleton labels={labels} height={height} />

    return <Doughnut
                    data={data}
                    options={options}
                    width={width}
                    height={height}
                    plugins={[
                        counter
                    ]} />;
}

export default TableDoughnutChart;