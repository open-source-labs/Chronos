import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';
import moment from 'moment';

const SpeedChart = React.memo(() => {
  const { healthData } = useContext(HealthContext);
  const { time, cpuspeed } = healthData;
  const yAxis = cpuspeed;
  console.log(time);
  console.log(cpuspeed);
  const createChart = () => {
    let timeArr;
    if (time !== undefined) {
      timeArr = time.map((el: any) => moment(el).format('hh:mm A'));
    }

    return (
      <Plot
        data={[
          {
            name: 'mbps',
            x: timeArr,
            y: yAxis,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {
              color: '#3788fc'
            },
          },
        ]}
        layout={{
          title: 'Speed Chart',
          height: 300,
          width: 300,
          font: {
            color: '#444d56',
            size: 11.5,
            family: 'Roboto',
          },
          xaxis: {
            title: 'Time (EST)',
            tickmode: 'linear',
            tickformat: '%H %M %p',
            // tickangle: 30,
            // range: [0, 5],
            rangemode: 'nonnegative',
            mirror: false,
            ticks: 'outside',
            showline: true,
          },
          yaxis: {
            title: 'Data Rates (MBPS)',
            mirror: false,
            ticks: 'outside',
            showline: true,
          },
          paper_bgcolor: 'white',
          showlegend: true,
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            y: 5,
          },
        }}
      />
    );
  };

  return <div className="chart">{createChart()}</div>;
});

export default SpeedChart;
