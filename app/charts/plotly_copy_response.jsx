import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
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

    const chartData = {
      datasets: [
        {
          data: Object.values(responseCodes),
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
      labels: ['100-199', '200-299', '300-399', '400-499', '500-599', 'Null'],
    };
    return <Doughnut data={chartData} />;
  };
  return <div>{createChart()}</div>;
};

export default ResponseCodeChart;
