import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import HealthContext from '../context/DetailsContext';

const SpeedChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    const xAxis = [];
    const yAxis = [];

    for (let i = 0; i < healthData.length; i += 1) {
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
        data = {[{
          domain: { x: [0, 1], y: [0, 1] },
          type: 'indicator',
          value: yAxis[length],
          title: {'text': "Speed Chart"},
          delta: {'reference': 3.5, 'increasing': {'color': "mistyrose"}},
          mode: "gauge+number+delta",
          gauge: { axis: { range: [null, 7] },
                  'tickwidth': 1,
                  'tickcolor': "#fce38a",
                  'bar': {'color': "#6eb6ff"},
                  'bordercolor': "#a3de83",
                  'steps': [
                  {'range': [0, 3.5], 'color': '#fab57a'},
                  {'range': [3.5, 5.3], 'color': '#edf798'}],
                  'threshold': {
                  'line': {'color': "red", 'width': 4},
                  'thickness': 0.75,
                  'value': 6}
                    },
        }]}
        layout = {{
          height: 500,
          width: 500,
          paper_bgcolor: '#fffbe0'
        }}
      />
    )


    // const chartData = {
    //   datasets: [
    //     {
    //       label: `CPU Speed of ${props.service}`,
    //       data: yAxis,
    //       backgroundColor: [
    //         'rgb(2, 210, 249)',
    //       ],
    //     },
    //   ],
    //   options: {
    //   },
    //   xAxisID: 'Speed',
    //   yAxisID: 'Communicaton',
    //   labels: xAxis,
    // };

    // return <Line data={chartData} />;
  };

  return <div>{createChart()}</div>;
};

export default SpeedChart;
