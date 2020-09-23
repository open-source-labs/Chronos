import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { CommsContext } from '../context/CommsContext';
import '../stylesheets/constants.scss';

const RequestTypesChart: React.FC = React.memo(() => {
  const { commsData } = useContext(CommsContext);

  interface IObject {
    correlatingid: string;
    endpoint: string;
    id: number;
    microservice: string;
    request: string;
    responsemessage: string;
    responsestatus: string;
    time: string;
  }
  const createRequestChart = () => {
    // Counter for request types
    const requestTypes: { [key: string]: number } = {
      DELETE: 0,
      GET: 0,
      PATCH: 0,
      POST: 0,
      PUSH: 0,
      PUT: 0,
    };

    // Record each request type frequencies
    let type;
    commsData.forEach((obj: IObject) => {
      type = obj.request;
      if (type in requestTypes) {
        requestTypes[type] += 1;
      }
    });

    return (
      <Plot
        data={[
          {
            values: Object.values(requestTypes),
            labels: ['DELETE', 'GET', 'PATCH', 'POST', 'PUSH', 'PUT'],
            type: 'pie',
            textposition: 'inside',
            marker: {
              colors: ['#fa1a58', '#4a4eee', '#00eda0', '#00d3f2', '#9c27b0', '#ff9800'],
            },
            
          },
        ]}
        config={{
          displaylogo: false,
        }}
        layout={{
          title: {
            text: 'Request Types',
          },
          height: 300,
          width: 300,
          font: {
            color: '#444d56',
            size: 11.5,
            family: 'Roboto',
          },
          paper_bgcolor: 'white',
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            font: {
              size: 7,
            }
          },
        }}
      />
    );
  };

  return <div className="chart">{createRequestChart()}</div>;
});

export default RequestTypesChart;
