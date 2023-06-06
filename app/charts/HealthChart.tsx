import moment from 'moment';
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { all, solo as soloStyle } from './sizeSwitch';

interface HealthChartProps {
  key: string;
  serviceName: string;
  // metric: string;
  categoryName: string;
  metrics: any[];
  timeList: any[];
  // valueList: any;
  sizing: string;
  colourGenerator: Function;
}

interface SoloStyles {
  height: number;
  width: number;
}

type plotlyData = {
  name: string;
  x: string[];
  y: string[];
  type: string;
  mode: string;
  marker: { colors: string[] };
};

const HealthChart: React.FC<HealthChartProps> = React.memo(props => {
  // 'metrics' is an array of the user-specified metrics as objects => 'metric name': [metric values]
  const { serviceName, categoryName, metrics, timeList, sizing, colourGenerator } = props;
  const [solo, setSolo] = useState<SoloStyles | null>(null);
  const timeArr = timeList.map((el: any) => moment(el).format('kk:mm:ss'));
  const reverseTimeArr = timeArr.reverse();
  const re = /_/g;

  // this array gets populated once generatePlotlyDataObjects is invoked in `createChart`
  const plotlyDataObjectArray: plotlyData[] = [];
  // generates an array plotly data objects to add to be passed into our plotly chart's data prop
  const generatePlotlyDataObjects = (metricsArray, timeArray) => {
    console.log('metricsArray: ', metricsArray);
    console.log('timeArray: ', timeArray);
    // iterate through the metricsArray
    // each element is an array of num data (y-axis)
    metricsArray.forEach(el => {
      const originalMetricName = Object.keys(el)[0];
      const prettyMetricName = originalMetricName.replace(re, ' ');
      const newColor = colourGenerator(serviceName);
      console.log('prettyMetricName ', prettyMetricName);
      // plotly's data prop takes an array of objects that each have x, y, type, mode, marker
      const dataObject: plotlyData = {
        name: prettyMetricName,
        x: timeArray,
        y: el[originalMetricName],
        type: 'scattergl',
        mode: 'lines',
        marker: {
          colors: ['#fc4039', '#4b54ea', '#32b44f', '#3788fc', '#9c27b0', '#febc2c'],
        },
      };
      plotlyDataObjectArray.push(dataObject);
    });
    console.log('plotlydataObjectarray: ', plotlyDataObjectArray);
  };

  setInterval(() => {
    if (solo !== soloStyle) {
      setSolo(soloStyle);
    }
  }, 20);

  const createChart = () => {
    generatePlotlyDataObjects(metrics, reverseTimeArr);
    const sizeSwitch = sizing === 'all' ? all : solo;

    return (
      <Plot
        data={plotlyDataObjectArray}
        config={{ displayModeBar: true }}
        layout={{
          title: `${serviceName} | ${categoryName}`,
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
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            y: 5,
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
            //! change this later :^)
            title: 'Value',
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
