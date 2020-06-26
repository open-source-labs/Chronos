import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { CommsContext } from '../context/CommsContext';

interface IObj {
  correlatingid: string;
  endpoint: string;
  id: number;
  microservice: string;
  request: string;
  responsemessage: string;
  responsestatus: number;
  time: string;
}

interface IReq {
  [key: string]: number;
}

const RequestTypesChart: React.FC = () => {
  const { commsData } = useContext(CommsContext);

  const createRequestChart = () => {
    const requestTypes: IReq = {
      DELETE: 0,
      GET: 0,
      PATCH: 0,
      POST: 0,
      PUSH: 0,
      PUT: 0,
    };

    // Record each request type in the requestTypes object
    commsData.forEach((obj: IObj) => {
      const request = obj.request;
      if (request in requestTypes) {
        requestTypes[request] += 1;
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
              colors: ['#fa1a58', '#4a4eee', '#00eda0', '#00d3f2', '#73605b', '#d09683'],
            },
          },
        ]}
        config={{
          displaylogo: false,
        }}
        layout={{
          title: {
            text: 'Request Types',
            font: { size: 22 },
          },
          height: 400,
          width: 400,
          font: {
            color: 'black',
            size: 15,
            family: 'Nunito, san serif',
          },
          paper_bgcolor: 'white',
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
          },
        }}
      />
    );
  };

  return <div className="requestChart">{createRequestChart()}</div>;
};

export default RequestTypesChart;
