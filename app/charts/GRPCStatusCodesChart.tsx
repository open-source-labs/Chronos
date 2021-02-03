import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { CommsContext } from '../context/CommsContext';

interface IObj {
  correlatingid: string;
  // endpoint: string | null;
  _id: string;
  microservice: string;
  request: string | null;
  // responsemessage: string;
  responsestatus: number;
  time: string;
}

type responseCodes = {
  [key: string]: number
};

// const commsData = [
//   {
//     "_id": "6019a1f57b3e601d3afa457e",
//     "microservice": "books",
//     "request": "getBookInfo",
//     "responsestatus": 0,
//     "correlatingid": "0500c04e-a005-4ccf-9a73-115c787263c9",
//     "time": "2021-02-02T19:03:17.433+00:00",
//     "__v": "0",
//   },
//   {
//     "_id":"6019a1f54ed38d1d36c0401d",
//     "microservice":"orders",
//     "request":"GetBookInfo",
//     "responsestatus": 0,
//     "correlatingid":"0500c04e-a005-4ccf-9a73-115c787263c9",
//     "time":"2021-02-02T19:03:17.455+00:00",
//     "__v":"0"
//   },
//   {
//     "_id":"6019a1f53b36691d328a0300",
//     "microservice":"reverse-proxy",
//     "request":"GetOrders",
//     "responsestatus": 0,
//     "correlatingid":"0500c04e-a005-4ccf-9a73-115c787263c9",
//     "time":"2021-02-02T19:03:17.487+00:00",
//     "__v":"0"
//   },
//   {
//     "_id":"6019a1f57b3e601d3afa457f",
//     "microservice":"books",
//     "request":"getBookInfo",
//     "responsestatus": 0,
//     "correlatingid":"0500c04e-a005-4ccf-9a73-115c787263c9",
//     "time":"2021-02-02T19:03:17.466+00:00",
//     "__v":"0"
//   },
//   {
//     "_id":"6019a1f54ed38d1d36c0401e",
//     "microservice":"orders",
//     "request":"GetBookInfo",
//     "responsestatus": 0,
//     "correlatingid":"0500c04e-a005-4ccf-9a73-115c787263c9",
//     "time":"2021-02-02T19:03:17.471+00:00",
//     "__v":"0"
//   },
//   {
//     "_id":"6019a1f54ed38d1d36c0401f",
//     "microservice":"orders",
//     "request":"GetOrders",
//     "responsestatus": 0,
//     "correlatingid":"0500c04e-a005-4ccf-9a73-115c787263c9",
//     "time":"2021-02-02T19:03:17.472+00:00",
//     "__v":"0"
//   },
//   // {
//   //   "_id": "6005e05d1aaf4f7d2d4b4fb3",
//   //   "microservice": "books",
//   //   "endpoint": null,
//   //   "request": null,
//   //   "functionname": "getBookInfo",
//   //   "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31be",
//   //   "responsestatus": 0,
//   //   "responsemessage": "OK",
//   //   "time": "2021-01-18T19:24:13.100Z",
//   //   "__v": 0
//   // },
//   // {
//   //   "_id": "6005e05d1aaf4f7d2d4b4fb4",
//   //   "microservice": "orders",
//   //   "endpoint": null,
//   //   "request": null,
//   //   "functionname": "getOrders",
//   //   "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31be",
//   //   "responsestatus": 0,
//   //   "responsemessage": "OK",
//   //   "time": "2021-01-18T19:24:13.200Z",
//   //   "__v": 0
//   // },
//   // {
//   //   "_id": "6005e05d1aaf4f7d2d4b4fb3",
//   //   "microservice": "books",
//   //   "endpoint": null,
//   //   "request": null,
//   //   "functionname": "getBookInfo",
//   //   "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31be",
//   //   "responsestatus": 0,
//   //   "responsemessage": "OK",
//   //   "time": "2021-01-18T19:24:13.100Z",
//   //   "__v": 0
//   // },
//   // {
//   //   "_id": "6005e05d1aaf4f7d2d4b4fb4",
//   //   "microservice": "orders",
//   //   "endpoint": null,
//   //   "request": null,
//   //   "functionname": "getOrders",
//   //   "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31be",
//   //   "responsestatus": 0,
//   //   "responsemessage": "OK",
//   //   "time": "2021-01-18T19:24:13.200Z",
//   //   "__v": 0
//   // },
// ];

const GRPCStatusCodesChart: React.FC = React.memo(() => {
  const { commsData } = useContext(CommsContext);
  // console.log(commsData)
  const createChart = () => {
    // Counter for request types
    const responseCodes: responseCodes = {
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
      NULL: 0,
    };

    //Record each status code frequencies
    commsData.forEach((obj: IObj) => {
      // console.log(obj)
      responseCodes[obj.responsestatus] += 1;
    });

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
            ],
            type: 'pie',
            textposition: 'inside',
            domain: { y: [0, 2] }, //Need to find out what this one is
            marker: {
              colors: ['#5CB270', '#AF1717', '#B52424', '#BA3131', '#C03E3E', '#C64B4B', '#CC5858', '#D16565', '#D77373', '#DD8080', '#E28D8D', '#E89A9A', '#EEA7A7', '#F4B4B4', '#F9C1C1', '#FFCECE'],
            }, 
          },
        ]}
        config = {{
          displaylogo: false,
        }}
        layout={{
          title: {
            text: 'gRPC Status Codes',
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
            },
          },
        }}
      />  
    );
  };      
  return <div className="chart">{createChart()}</div>;


  
})

export default GRPCStatusCodesChart;