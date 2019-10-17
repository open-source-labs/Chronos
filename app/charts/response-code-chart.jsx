import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import CommunicationsContext from '../context/OverviewContext';

const ResponseCodeChart = (props) => {
  console.log(' => ', props)
  const communicationsData = useContext(CommunicationsContext);
  const communications = communicationsData.overviewData;

  const createChart = () => {
    const responseCodes = {
      '100-199': 0,
      '200-299': 0,
      '300-399': 0,
      '400-499': 0,
      '500-599': 0,
      NULL: 0,
    };

    for (let i = 0; i < communications.length; i += 1) {
      const element = communications[i];
      // if Mongo
      if (element.resStatus && element.currentMicroservice === props.service) {
        const statusCode = element.resStatus;
        let key;

        if (statusCode <= 199) {
          key = '100-199';
          responseCodes[key] += 1;
        } else if (statusCode <= 299) {
          key = '200-299';
          responseCodes[key] += 1;
        } else if (statusCode <= 399) {
          key = '300-399';
          responseCodes[key] += 1;
        } else if (statusCode <= 499) {
          key = '400-499';
          responseCodes[key] += 1;
        } else if (statusCode <= 599) {
          key = '500-599';
          responseCodes[key] += 1;
        } else {
          key = 'NULL';
          responseCodes[key] += 1;
        }
      } else if (element.resstatus && element.currentmicroservice === props.service) {
        const statusCode = element.resstatus;
        let key;

        if (statusCode <= 199) {
          key = '100-199';
          responseCodes[key] += 1;
        } else if (statusCode <= 299) {
          key = '200-299';
          responseCodes[key] += 1;
        } else if (statusCode <= 399) {
          key = '300-399';
          responseCodes[key] += 1;
        } else if (statusCode <= 499) {
          key = '400-499';
          responseCodes[key] += 1;
        } else if (statusCode <= 599) {
          key = '500-599';
          responseCodes[key] += 1;
        } else {
          key = 'NULL';
          responseCodes[key] += 1;
        }
      }
    }

    const chartData = {
      datasets: [
        {
          label: 'Breakdown of Response Status Codes',
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
