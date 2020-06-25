import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';
import moment from 'moment';
/**
 * @desc Render Speed Chart
 * @param object props- passed from GraphsContainer
 * @return component - component for speed changes
 */

const SpeedChart = props => {
  const { healthData } = useContext(HealthContext);

  const createChart = () => {
    const xAxis = [];
    const yAxis = [];

    for (let i = 0; i < healthData.length; i += 1) {
      const {
        currentmicroservice,
        currentMicroservice,
        cpuCurrentSpeed,
        cpucurrentspeed,
        timestamp,
      } = healthData[i];
      const milliseconds = moment(timestamp).format('h:mm a');

      // If using a SQL Database
      if (currentmicroservice === props.service && cpucurrentspeed) {
        xAxis.push(milliseconds);
        yAxis.push(cpucurrentspeed);
      }
      // If using a Mongo Database
      if (currentMicroservice === props.service && cpuCurrentSpeed) {
        xAxis.push(milliseconds);
        yAxis.push(cpuCurrentSpeed);
      }
    }
    const secondsArr = xAxis.map(dates => dates);

    return (
      <Plot
        data={[
          {
            name: 'mbps',
            x: secondsArr,
            y: yAxis,
            type: 'scatter',
            mode: 'lines',
          },
          { label: 'mbps' },
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
            title: 'Service',
            tickmode: 'linear',
            tick0: secondsArr[0],
            tickformat: '%d %B (%a)<br>%Y',
            nticks: 5,
            range: [1, 10],
            rangemode: 'nonnegative',
            rangeslider: true,
          },
          yaxis: {
            title: 'Data Rates (MBPS)',
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

  return <div>{createChart()}</div>;
};

export default SpeedChart;
