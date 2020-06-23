import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';

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
    let midIdx;
    let backEnd;

    for (let i = 0; i < healthData.length; i += 1) {
      const {
        currentmicroservice,
        currentMicroservice,
        cpuCurrentSpeed,
        cpucurrentspeed,
      } = healthData[i];
      // If using a SQL Database
      if (currentmicroservice === props.service && cpucurrentspeed) {
        xAxis.push(i);
        yAxis.push(cpucurrentspeed);
      }
      // If using a Mongo Database
      if (currentMicroservice === props.service && cpuCurrentSpeed) {
        xAxis.push(i);
        yAxis.push(cpuCurrentSpeed);
      }
      midIdx = Math.floor(xAxis.length / 2);
      backEnd = xAxis.slice(midIdx);
    }

    return (
      <Plot
        data={[
          {
            name: 'mbps',
            x: backEnd,
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
            tick0: backEnd,
            dtick: 5,
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
