import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';
import { HealthContext } from '../context/HealthContext';

const TemperatureChart = React.memo(() => {
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
            fillcolor: '#4b54ea',
            x: timeArr,
            y: yAxis,
            name: 'CPU Temperature',
            showlegend: true,
          },
        ]}
        config={{ responsive: true }}
        layout={{
          title: 'CPU Temperature',
          height: 300,
          width: 300,
          font: {
            color: '#444d56',
            size: 11.5,
            family: 'Roboto',
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
            title: 'Time (EST)',
            tickmode: 'linear',
            tickformat: '%H %M %p',
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
});

export default TemperatureChart;
