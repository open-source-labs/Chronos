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

type responseCodes = {
  [key: string]: number
};

const ResponseCodesChart: React.FC = React.memo(() => {
  const { commsData } = useContext(CommsContext);

  const createChart = () => {
    // Counter for request types
    const responseCodes: responseCodes = {
      '100-199': 0,
      '200-299': 0,
      '300-399': 0,
      '400-499': 0,
      '500-599': 0,
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
    };

    // Record each status code frequencies
    commsData.forEach((obj: IObj) => {
      const status = obj.responsestatus;
      console.log(status);
      // if(status === 200) responseCodes['200-299'] += 1;
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
        responseCodes[status] += 1;
      }
    });

    console.log(responseCodes);

    return (
      <Plot
        data={[
          {
            values: Object.values(responseCodes),
            labels: [
              '0 - OK',
              '1 - CANCELLED',
              '2 - UNKNOWN',
              '3 - INVALID_ARGUMENT',
              '4 - DEADLINE_EXCEEDED',
              '5 - NOT_FOUND',
              '6 - ALREADY_EXISTS',
              '7 - PERMISSION_DENIED',
              '8 - RESOURCE_EXHAUSTED',
              '9 - FAILED_PRECONDITION',
              '10 - ABORTED',
              '11 - OUT_OF_RANGE',
              '12 - UNIMPLTEMENTED',
              '13 - INTERNAL',
              '14 - UNAVAILABLE',
              '15 - DATA_LOSS',
              '16 - UNAUTHENTICATED',
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
          showlegend: false,
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
