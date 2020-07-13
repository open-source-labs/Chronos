import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';
import moment from 'moment';

/**
 * @desc Render Speed Chart
 * @return component - component for speed changes
 */

const SpeedChart = () => {
  const { healthData } = useContext(HealthContext);
  const { time, cpuspeed } = healthData;
  const yAxis = cpuspeed;
  const createChart = () => {
    let timeArr;
    if (time === undefined) {
      // Do Nothing
    } else {
      // const xAxis = healthData.time;

      timeArr = time.map((el: any) => moment(el).format('h:mm:ss A'));
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
          },
        ]}
        layout={{
          title: 'Speed Chart',
          height: 400,
          width: 400,
          font: {
            color: 'black',
            size: 14,
            family: 'Nunito, san serif',
          },
          xaxis: {
            title: 'Time (PST)',
            tickmode: 'linear',
            tickformat: '%d %B (%a)<br>%Y',
            tickangle: 30,
            range: [0, 5],
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
};

export default SpeedChart;
