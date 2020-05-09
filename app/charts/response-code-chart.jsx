import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import CommunicationsContext from '../context/OverviewContext';

const ResponseCodeChart = (props) => {
  const communicationsData = useContext(CommunicationsContext).overviewData;

  
  
  const createChart = () => {
    const responseCodes = {
      '100-199': 0,
      '200-299': 0,
      '300-399': 0,
      '400-499': 0,
      '500-599': 0,
      'NULL': 0,
    };

    for (let i = 0; i < communicationsData.length; i += 1) {
      const element = communicationsData[i];
      // If Mongo Else SQL
      if ((element.currentMicroservice === props.service) && element.resStatus) {
        const statusCode = element.resStatus;
        if (statusCode <= 199) {
          responseCodes['100-199'] += 1;
        } else if (statusCode <= 299) {
          responseCodes['200-299'] += 1;
        } else if (statusCode <= 399) {
          responseCodes['300-399'] += 1;
        } else if (statusCode <= 499) {
          responseCodes['400-499'] += 1;
        } else if (statusCode <= 599) {
          responseCodes['500-599'] += 1;
        } else {
          responseCodes['NULL'] += 1;
        }
      } else if ((element.currentmicroservice === props.service) && element.resstatus) {
        const statusCode = element.resstatus;
        if (statusCode <= 199) {
          responseCodes['100-199'] += 1;
        } else if (statusCode <= 299) {
          responseCodes['200-299'] += 1;
        } else if (statusCode <= 399) {
          responseCodes['300-399'] += 1;
        } else if (statusCode <= 499) {
          responseCodes['400-499'] += 1;
        } else if (statusCode <= 599) {
          responseCodes['500-599'] += 1;
        } else {
          responseCodes['NULL'] += 1;
        }
      }
    }

    return (
      <Plot
      data = {[{
        values: Object.values(responseCodes),
        labels: ['Informational 1xx', 'Successful 2xx', 'Redirection 3xx', 'Client Error 4xx', 'Server Error 5xx'],
        type: 'pie',
        domain: {y: [0 , 2]},
        marker: {
          'colors': [
            '#f38181',
            '#fce38a',
            '#fcbad3',
            '#95e1d3',
            '#a8d8ea',
            '#aa96da',
          ]
        }
      }]}
      layout = {{
        height: 500,
        width: 500,
        displaylogo: false,
        paper_bgcolor: '#fffbe0',
        legend: {
          orientation: 'h',
          xanchor: 'center',
          x: .5,
          y: 5
        }
      }}
    />)
  };
  
  return <div>{createChart()}</div>;
};

export default ResponseCodeChart;
