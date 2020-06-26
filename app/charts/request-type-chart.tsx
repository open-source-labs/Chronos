import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { CommsContext } from '../context/CommsContext';

const RequestTypesChart: React.FC = () => {
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
    const requestTypes: { [key: string]: number } = {
      DELETE: 0,
      GET: 0,
      PATCH: 0,
      POST: 0,
      PUSH: 0,
      PUT: 0,
    };

    // Record each request type in the requestTypes object
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
