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

    for (let i = 0; i < healthData.length; i += 2) {
      const element = healthData[i];
      // If using a SQL Database
      if (element.currentmicroservice === props.service && element.cpucurrentspeed) {
        xAxis.push(i);
        yAxis.push(element.cpucurrentspeed);
      }
      // If using a Mongo Database
      if (element.currentMicroservice === props.service && element.cpuCurrentSpeed) {
        xAxis.push(i);
        yAxis.push(element.cpuCurrentSpeed);
      }
    }

    return (
      <Plot
        data={[
          {
            name: 'mbps',
            x: xAxis,
            y: yAxis,
            maxdisplayed: 50,
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
            // consider changing to variable
            tick0: 50,
            dtick: 200,
            nticks: 2000,
            rangeslider: true,
          },
          yaxis: {
            range: [0, yAxis],
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
