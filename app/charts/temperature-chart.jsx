import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';
import { HealthContext } from '../context/HealthContext';
/**
 * @desc Renders Readout of CPU Temperature
 * @param object props - passed from GraphsContainer
 * @return Plot Component - Component for CPU Graph
 */

const TemperatureChart = ({ service }) => {
  // Once we pass down specific props to our graph components
  // (i.e cputemp, time, etc) we can remove our for loop, desctructured variables
  const { healthData } = useContext(HealthContext);
  const { time, cputemp } = healthData;

  const createChart = () => {
    const yAxis = cputemp;
    let month;
    let timeArr;
    if (time === undefined || cputemp === undefined) {
      // Do Nothing
    } else {
      // const xAxis = healthData.time;
      timeArr = time.map(el => moment(el).format('S A'));
      month = moment(time[0]).format('MMM Do');
    }
    console.log('month1111', month);

    return (
      <Plot
        data={[
          {
            type: 'scatter',
            fill: 'tozeroy',
            mode: 'none',
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
            family: 'Nunito, san serif',
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
            nticks: 10,
            range: [1, 4],
          },
          yaxis: {
            title: `Temperature (\xB0C)`,
            rangemode: 'nonnegative',
          },
        }}
      />
    );
  };

  return <div>{createChart()}</div>;
};

export default TemperatureChart;
