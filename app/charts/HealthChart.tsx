import moment from 'moment';
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { all, solo as soloStyle } from './sizeSwitch';

interface HealthChartProps {
  key: string;
  dataType: string;
  serviceName: string;
  chartData: object;
  categoryName: string;
  sizing: string;
  colourGenerator: Function;
}
interface SoloStyles {
  height: number;
  width: number;
}
type PlotlyData = {
  name: string;
  x: string[];
  y: string[];
  type: string;
  mode: string;
  marker: { colors: string[] };
};

const HealthChart: React.FC<HealthChartProps> = React.memo(props => {
  const { dataType, serviceName, chartData, categoryName, sizing, colourGenerator } = props;
  const [solo, setSolo] = useState<SoloStyles | null>(null);

  // makes time data human-readable, and reverses it so it shows up correctly in the graph
  const prettyTimeInReverse = (timeArray: string[]): string[] => {
    return timeArray.map((el: any) => moment(el).format('kk:mm:ss')).reverse();
  };

  // removes underscores from metric names to improve their look in the graph
  const prettyMetricName = metricName => {
    return metricName.replaceAll('_', ' ');
  };

  // pulls the current service names to be shown in the graph title from chartData
  const serviceNamesAsString = (chartDataObject: object): string => {
    let serviceNameString = '';
    for (const serviceName in chartDataObject) {
      serviceNameString += `${serviceName} | `;
    }
    return serviceNameString;
  };

  // generates an array of plotly data objects to be passed into our plotly chart's data prop
  const generatePlotlyDataObjects = (chartDataObj: object): object[] => {
    const arrayOfPlotlyDataObjects: PlotlyData[] = [];
    // loop through the list of metrics for the current chart
    for (const metricName in chartDataObj) {
      // define the value and time arrays; allow data to be reassignable in case we need to convert the bytes data into megabytes
      let dataArray = chartDataObj[metricName].value;
      const timeArray = chartDataObj[metricName].time;
      // specifically for `Megabyte` types, convert the original data of bytes into a value of megabytes before graphing
      if (dataType === 'Memory in Megabytes' || dataType === 'Cache in Megabytes') {
        dataArray = dataArray.map(value => (value / 1000000).toFixed(2));
      }
      // create the plotly object
      const plotlyDataObject: PlotlyData = {
        name: prettyMetricName(metricName),
        x: prettyTimeInReverse(timeArray),
        y: dataArray,
        type: 'scattergl',
        mode: 'lines',
        marker: {
          colors: ['#fc4039', '#4b54ea', '#32b44f', '#3788fc', '#9c27b0', '#febc2c'],
        },
      };
      // push the dataObject into the arrayOfPlotlyDataObjects
      arrayOfPlotlyDataObjects.push(plotlyDataObject);
    }
    // return the array of plotlyDataObject
    return arrayOfPlotlyDataObjects;
  };

  setInterval(() => {
    if (solo !== soloStyle) {
      setSolo(soloStyle);
    }
  }, 20);

  const createChart = () => {
    const dataArray = generatePlotlyDataObjects(chartData);
    const sizeSwitch = sizing === 'all' ? all : solo;

    return (
      <Plot
        data={dataArray}
        config={{ displayModeBar: true }}
        layout={{
          title: `${serviceName} || ${categoryName}`,
          ...sizeSwitch,
          font: {
            color: '#444d56',
            size: 11.5,
            family: 'Roboto',
          },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          showlegend: true,
          legend: {
            orientation: 'v',
          },
          xaxis: {
            title: 'Time',
            tickmode: 'auto',
            tick0: 0,
            dtick: 10,
            rangemode: 'nonnegative',
            mirror: false,
            ticks: 'outside',
            showline: true,
          },
          yaxis: {
            rangemode: 'nonnegative',
            title: `${dataType}`,
          },
        }}
      />
    );
  };

  return (
    <div className="chart" data-testid="Health Chart">
      {createChart()}
    </div>
  );
});

export default HealthChart;
