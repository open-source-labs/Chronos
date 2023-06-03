import moment from 'moment';
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { all, solo as soloStyle } from './sizeSwitch';
import { getTime } from '../context/helpers';

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

const HealthChart: React.FC<HealthChartProps> = React.memo(props => {
  // const { renderService, metric, timeList, valueList, sizing, colourGenerator } = props;
  const { serviceName, categoryName, metrics, timeList, sizing, colourGenerator } = props;
  const [solo, setSolo] = useState<SoloStyles | null>(null);
  // metrics = specific metrics in categories
  // temporary y-axis values for testing purposes
  const valueList = metrics[0].books[0].activememory_in_bytes
  // filter through metrics to desired metrics and then plot them

  function generatePlotlyDataObjects(metricsArray) {
    // iterate through the metricsArray
      // each element is an array of num data (y-axis)
      // generate a plotly data object to add to an array that will be passed into our plotly chart's data prop
    
  }



  setInterval(() => {
    if (solo !== soloStyle) {
      setSolo(soloStyle);
    }
  }, 20);

  const createChart = () => {
    //
    const timeArr = timeList.map((el: any) => moment(el).format('kk:mm:ss'));
    const reverseTimeArr = timeArr.reverse();
    const hashedColour = colourGenerator(serviceName);
    const re = /_/g;
    type plotlyData = {
      name: any;
      x: any;
      y: any;
      type: any;
      mode: any;
      marker: { color: string };
    };
    // const plotlyData = {
    //   name: metric.replace(re, ' '),
    //   x: reverseTimeArr, //reversed for better UX
    //   y: valueList,
    //   type: 'scattergl',
    //   mode: 'lines',
    //   marker: { color: hashedColour },
    // };
    const sizeSwitch = sizing === 'all' ? all : solo;

    return (
      <Plot
        // data takes an array of objects that each have x, y, type, mode, marker
        data={[plotlyData]}
        config={{ displayModeBar: false }}
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
