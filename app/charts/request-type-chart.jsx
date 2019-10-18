import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import CommunicationsContext from '../context/OverviewContext';

const RequestTypesChart = (props) => {
  const communicationsData = useContext(CommunicationsContext).overviewData;

  const createRequestChart = () => {
    const requestObj = {
      DELETE: 0,
      GET: 0,
      PATCH: 0,
      POST: 0,
      PUSH: 0,
      PUT: 0,
    };

    for (let i = 0; i < communicationsData.length; i += 1) {
      const element = communicationsData[i];
      // if Mongo
      if ((element.currentMicroservice === props.service) && element.reqType in requestObj) requestObj[element.reqType] += 1;
      // if SQL
      else if ((element.currentmicroservice === props.service) && element.reqtype in requestObj) requestObj[element.reqtype] += 1;
    }

    const chartData = {
      datasets: [
        {
          data: Object.values(requestObj),
          backgroundColor: [
            'rgb(2, 210, 249)',
            'rgb(198, 42, 177)',
            'rgb(252, 170, 52)',
            'rgb(239, 91, 145)',
            'rgb(182, 219, 26)',
            'rgb(254, 255, 0)',
          ],
        },
      ],
      labels: ['DELETE', 'GET', 'PATCH', 'POST', 'PUSH', 'PUT'],
    };

    return <Doughnut data={chartData} />;
  };

  return <div>{createRequestChart()}</div>;
};

export default RequestTypesChart;
