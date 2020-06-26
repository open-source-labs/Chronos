import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { CommsContext } from '../context/CommsContext';

interface IObj {
    correlatingid:string;
    endpoint: string;
    id: number;
    microservice: string;
    request: string;
    responsemessage: string;
    responsestatus: number;
    time: string;
}

interface IComms {
  commsData: IObj
}


const ResponseCodeChart: React.FC = () => {
  const { commsData } = useContext(CommsContext);
  console.log('what are comms---------?>',commsData)

  const createChart = () => {
    const responseCodes = {
      '100-199': 0,
      '200-299': 0,
      '300-399': 0,
      '400-499': 0,
      '500-599': 0,
      NULL: 0,
    };

    // Record each status code in the responseCodes object
    commsData.forEach((obj: IObj) => {
      console.log('where is responsestatus------>',obj.responsestatus)
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
              'Informational 1xx',
              'Successful 2xx',
              'Redirectional 3xx',
              'Client Error 4xx',
              'Server Error 5xx',
            ],
            type: 'pie',
            textposition: 'inside',
            domain: { y: [0, 2] },
            marker: {
              colors: ['#fa1a58', '#f3f5fe', '#00eda0', '#00fff2', '#73605b'],
            },
          },
        ]}
        config={{
          displaylogo: false,
        }}
        layout={{
          title: {
            text: 'Response Status Codes',
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

  return <div className="responseCodeChart">{createChart()}</div>;
};

export default ResponseCodeChart;
