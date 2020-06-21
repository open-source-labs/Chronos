import React, { useContext, useEffect } from 'react';
import Plot from 'react-plotly.js';
import HealthContext from '../context/DetailsContext';

const SpeedChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    // Number from 0-1990
    const xAxis = [];
    // For MBS: 2.4hz, 2.0hz, etc.
    const yAxis = [];

    for (let i = 0; i < healthData.length; i += 2) {
      const element = healthData[i];
      // If using a SQL Database
      if (
        element.currentmicroservice === props.service &&
        element.cpucurrentspeed
      ) {
        xAxis.push(i);
        yAxis.push(element.cpucurrentspeed);
      }

      // If using a Mongo Database
      if (
        element.currentMicroservice === props.service &&
        element.cpuCurrentSpeed
      ) {
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
            size: 13,
            family: 'Nunito, san serif',
          },
          xaxis: {
            title: 'Service',
            tickmode: 'linear',
            tick0: 50,
            dtick: 200,
            nticks: 2000,
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
