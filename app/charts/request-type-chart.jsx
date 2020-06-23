import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { CommsContext } from '../context/CommsContext';

const RequestTypesChart = ({ service }) => {
  const { commsData } = useContext(CommsContext);

  const createRequestChart = () => {
    const requestObj = {
      DELETE: 0,
      GET: 0,
      PATCH: 0,
      POST: 0,
      PUSH: 0,
      PUT: 0,
    };

    for (let i = 0; i < commsData.length; i += 1) {
      const element = commsData[i];
      // if Mongo
      if (element.currentMicroservice === service && element.reqType in requestObj)
        requestObj[element.reqType] += 1;
      // if SQL
      else if (element.currentmicroservice === service && element.reqtype in requestObj)
        requestObj[element.reqtype] += 1;
    }

    return (
      <Plot
        data={[
          {
            values: Object.values(requestObj),
            labels: ['DELETE', 'GET', 'PATCH', 'POST', 'PUSH', 'PUT'],
            type: 'pie',
            textposition: 'inside',
            marker: {
              colors: ['#fa1a58', '#4a4eee', '#00eda0', '#00d3f2', '#73605b', '#d09683'],
            },
          },
        ]}
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
          displaylogo: false,
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
