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

const ResponseCodesChart: React.FC = React.memo(() => {
  const { commsData } = useContext(CommsContext);

  const createChart = () => {
    // Counter for request types
    const responseCodes = {
      '100-199': 0,
      '200-299': 0,
      '300-399': 0,
      '400-499': 0,
      '500-599': 0,
      NULL: 0,
    };

    // Record each status code frequencies
    commsData.forEach((obj: IObj) => {
      const status = obj.responsestatus;
      if (status >= 500) {
        responseCodes['500-599'] += 1;
      } else if (status >= 400) {
        responseCodes['400-499'] += 1;
      } else if (status >= 300) {
        responseCodes['300-399'] += 1;
      } else if (status >= 200) {
        responseCodes['200-299'] += 1;
      } else if (status >= 100) {
        responseCodes['100-199'] += 1;
      } else {
        responseCodes.NULL += 1;
      }
    });

    return (
      <Plot
        data={[
          {
            values: Object.values(responseCodes),
            labels: [
              'Informational (100-199)',
              'Success (200-299)',
              'Redirects (300-399)',
              'Client errors (400-499)',
              'Server errors (500-599)',
            ],
            type: 'pie',
            textposition: 'inside',
            domain: { y: [0, 2] },
            marker: {
              colors: ['#fc4039', '#4b54ea', '#3788fc', '#32b44f', '#9c27b0'],
            },
          },
        ]}
        config={{
          displaylogo: false,
        }}
        layout={{
          title: {
            text: 'Response Status Codes',
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

  return <div className="chart">{createChart()}</div>;
});

export default ResponseCodesChart;
