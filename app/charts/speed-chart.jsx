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
          value: yAxis[yAxis.length - 1],
          title: {'text': "Speed Chart"},
          delta: {'reference': 3.5, 'decreasing': {'color': 'mistyrose'}},
          mode: "gauge+number+delta",
          gauge: { axis: { range: [null, 8] },
            'tickwidth': 1,
            'tickcolor': 'mistyrose',
            'bar': {'color': "#e1315b"},
            'bordercolor': "#a1be95",
            'steps': [
              {'range': [0, 4], 'color': '#e2dfa2'},
              {'range': [4, 6], 'color': '#fab57a'}
            ],
            'threshold': {
              'line': {'color': 'mistyrose', 'width': 3.5},
              'thickness': 0.75,
              'value': 7.5
            }
          },
        }]}
        layout = {{
          height: 250,
          width: 250,
          font: {
            color: 'Black',
            size: 15
          },
          borderRadius: 10,
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: .5
          }
        }}
      />
    )
  };

  return <div className="speedChart">{createChart()}</div>;
};

export default SpeedChart;
