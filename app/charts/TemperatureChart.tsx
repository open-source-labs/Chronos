import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';
import { HealthContext } from '../context/HealthContext';

const TemperatureChart = () => {
  const { healthData } = useContext(HealthContext);
  const { time, cputemp } = healthData;

  const createChart = () => {
    const yAxis = cputemp;
    let month: undefined | string;
    let timeArr: undefined | [number];
    if (time !== undefined && cputemp !== undefined) {
      timeArr = time.map((el: string) => moment(el).format('hh:mm A'));
      month = moment(time[0]).format('MMM Do');
    }

    return (
      <Plot
        data={[
          {
            type: 'scatter',
            fill: 'tozeroy',
            mode: 'lines',
            fillcolor: 'rgb(250, 26, 88)',
            x: timeArr,
            y: yAxis,
            name: 'CPU Temperature',
            showlegend: true,
          },
        ]}
        config={{ responsive: true }}
        layout={{
          title: 'CPU Temperature',
          height: 400,
          width: 400,
          font: {
            color: 'black',
            size: 15,
            family: 'Nunito sans, sans serif',
          },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            y: 5,
          },
          xaxis: {
            title: month,
            tickmode: 'linear',
            tickformat: '%d %B (%a)<br>%Y',
            mirror: false,
            ticks: 'outside',
            showline: true,
          },
          yaxis: {
            title: `Temperature (\xB0C)`,
            rangemode: 'nonnegative',
            mirror: false,
            ticks: 'outside',
            showline: true,
          },
        }}
      />
    );
  };

  return <div className="chart">{createChart()}</div>;
};

export default TemperatureChart;
