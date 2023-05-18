import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
const log = require('electron-log');
const AWS = require('aws-sdk');
const User = require('../models/UserModel');

// location to settings.json where guest data is saved momentarily
const settingsLocation = path.resolve(__dirname, '../../settings.json');

// v10 notes:  Has not been reconfigured to refer to User database yet, only works for guest. 
//  This channel was not tested by our team, could not get ec2 examples functioning.
/**
 * @event   ec2MetricsRequest
 * @desc    Connects user to Cloudwatch using aws-sdk and fetches data for EC2 instances
 *          with the passed in parameters
 * @params  username: current user from DashboardContext
 *          appIndex: clicked card's index in the application array from ApplicationContext
 */
ipcMain.on(
  'ec2MetricsRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    try {
      // find the clicked service in settings
      const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
      const userAwsService = fileContents[username]?.services[appIndex];

      // grab variables needed in the parameters for Cloudwatch
      const [region, typeOfService, instanceId, accessKey, secretAccessKey] = [
        userAwsService[2],
        userAwsService[4],
        userAwsService[6],
        userAwsService[7],
        userAwsService[8],
      ];

      // create a new Cloudwatch instance
      const cloudwatch = new AWS.CloudWatch({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      });

      // metrics being requested. Each metric will get its own graph in AwsGraphContainer. List of metrics available can be found in AWS Documentation
      const metricsNamesArray = ['CPUUtilization', 'NetworkIn', 'NetworkOut', 'DiskReadBytes'];

      const paramsArray = metricsNamesArray.map(metric => {
        // param needed for Cloudwatch to fetch data, highly opinionated boilerplate
        const params = {
          EndTime: new Date(),
          MetricName: metric,
          Namespace: typeOfService,
          Period: 60,
          StartTime: new Date(new Date().getTime() - 60 * 60 * 1000),
          Statistics: ['Average'],
          Dimensions: [
            {
              Name: 'InstanceId',
              Value: instanceId,
            },
          ],
        };

        return params;
      });

      const fetchData = async () => {
        const fetched = {};

        for (let i = 0; i < paramsArray.length; i++) {
          // getMetricsStatistics: the fetch method using the current params
          const data = await cloudwatch.getMetricStatistics(paramsArray[i]).promise();

          // transform data in format for frontend to render graphs
          const newData = data.Datapoints.map((el, index: number) => {
            let transformedData = {};

            (transformedData['time'] = data.Datapoints[index].Timestamp),
              (transformedData['metric'] = data.Label),
              (transformedData['value'] = data.Datapoints[index].Average),
              (transformedData['unit'] = data.Datapoints[index].Unit);

            return transformedData;
          });

          fetched[paramsArray[i].MetricName] = newData;
        }

        return fetched;
      };

      fetchData().then(data => {
        message.sender.send('ec2MetricsResponse', JSON.stringify(data)); // send data to frontend
      });
    } catch (err) {
      console.log('Error in "ec2MetricsRequest" event', message);
      message.sender.send('ec2MetricsResponse', {
        CPUUtilization: [],
        NetworkIn: [],
        NetworkOut: [],
        DiskReadBytes: [],
      });
    }
  }
);

// v10 notes:  Has not been reconfigured to refer to User database yet, only works for guest. 
// Not added into user database yet. Not tested by our team. Could not get ECS examples functioning.
/**
 * @event   ecsMetricsRequest
 * @desc    Connects user to Cloudwatch using aws-sdk and fetches data for ECS Clusters/Services
 *          with the passed in parameters
 * @params  username: current user from DashboardContext
 *          appIndex: clicked card's index in the application array from ApplicationContext
 */
ipcMain.on(
  'ecsMetricsRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    try {
      // similar function architecture as EC2 fetch request
      const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
      const userAwsService = fileContents[username]?.services[appIndex];

      const [region, typeOfService, accessKey, secretAccessKey] = [
        userAwsService[2],
        userAwsService[4],
        userAwsService[7],
        userAwsService[8],
      ];

      const cloudwatch = new AWS.CloudWatch({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      });

      const listMetricsParams = {
        Namespace: 'AWS/ECS',
      };

      let clusterName: string = '';
      const serviceNames: string[] = [];
      const ecsData = {};

      cloudwatch.listMetrics(listMetricsParams, (err, data) => {
        if (err) {
          console.log('Error', err);
        } else {
          for (let i = 0; i < data.Metrics.length; i++) {
            const dimensions: any[] = data.Metrics[i].Dimensions;

            for (let j = 0; j < dimensions.length; j++) {
              if (dimensions[j].Name === 'ClusterName') {
                clusterName = dimensions[j].Value;
              }

              if (dimensions[j].Name === 'ServiceName') {
                if (!serviceNames.includes(dimensions[j].Value)) {
                  serviceNames.push(dimensions[j].Value);
                }
              }
            }
          }
        }

        const fetchData = async () => {
          if (clusterName !== '' && serviceNames.length !== 0) {
            for (let i = 0; i < serviceNames.length; i++) {
              let currentService = serviceNames[i];

              // cluster may have multiple services, and each service needs its own parameter
              const params = {
                MetricDataQueries: [
                  {
                    Id: 'm1',
                    MetricStat: {
                      Metric: {
                        Namespace: 'AWS/ECS',
                        MetricName: 'CPUUtilization',
                        Dimensions: [
                          {
                            Name: 'ClusterName',
                            Value: clusterName,
                          },
                          {
                            Name: 'ServiceName',
                            Value: currentService,
                          },
                        ],
                      },
                      Period: 60,
                      Stat: 'Average',
                    },
                    ReturnData: true,
                  },
                  {
                    Id: 'm2',
                    MetricStat: {
                      Metric: {
                        Namespace: 'AWS/ECS',
                        MetricName: 'MemoryUtilization',
                        Dimensions: [
                          {
                            Name: 'ClusterName',
                            Value: clusterName,
                          },
                          {
                            Name: 'ServiceName',
                            Value: currentService,
                          },
                        ],
                      },
                      Period: 60,
                      Stat: 'Average',
                    },
                    ReturnData: true,
                  },
                ],
                StartTime: new Date(Date.now() - 60 * 60 * 1000),
                EndTime: new Date(),
                ScanBy: 'TimestampDescending',
              };

              const data = await cloudwatch.getMetricData(params).promise();

              ecsData[currentService] = {
                CPUUtilization: {
                  value: data.MetricDataResults[0].Values,
                  time: data.MetricDataResults[0].Timestamps,
                },
                MemoryUtilization: {
                  value: data.MetricDataResults[1].Values,
                  time: data.MetricDataResults[1].Timestamps,
                },
              };
            }
          }

          ecsData['clusterInfo'] = {
            clusterName: clusterName,
            region: region,
            typeOfService: typeOfService,
          };
          return ecsData;
        };

        fetchData().then(data => {
          message.sender.send('ecsMetricsResponse', JSON.stringify(data));
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
);

 // v10 notes:  Has not been reconfigured to refer to User database yet, only works for guest. 
   // We tried dynamically pulling the grafana dashboard with just the AWS cluster URL, but did not complete it in the allotted time...
  // If future teams could get it rendering dynamically that would be awesome :)
/**
 * @event   eksMetricsRequest
 * @desc    Connects user to Cloudwatch using aws-sdk and fetches data for ECS Clusters/Services
 *          with the passed in parameters
 * @params  username: current user from DashboardContext
 *          appIndex: clicked card's index in the application array from ApplicationContext
 */
ipcMain.on('eksMetricsRequest', async (message:Electron.IpcMainEvent, username: string, appIndex: number) => {
  const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
  const userAwsService = fileContents[username]?.services[appIndex];
  const [typeOfService, region, awsUrl, token] = [userAwsService[4], userAwsService[2], userAwsService[9], userAwsService[7]];
  // awsURL -> the input is actually the Grafana Dashboard URL you receive after exporting the external hostname 
  // of the Kubernetes Service in the Grafana Namespace (see step 3 of the AWS/EKS readme)
  // token -> is the Bearer Token which must be generated by the admin in Grafana to use the Grafana Dashboard API.

  // build the url for the GET request to the Grafana Dashboard with the Grafana URL. This will find the available dashboard
  // and return the dashboard data -> we want the completed dashboard URL which will be sent in the response to the front end
  // and pulled into the Grafana Iframe Component to render the graph.

  const url = `${awsUrl}/api/search?folderIds=0`

    fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((response) => response.json())
  .then((data)=> {
    console.log('received data:', data);
    const appendToUrl = data[0].url;
    console.log(appendToUrl);
    const dashboardURL = `${awsUrl}${appendToUrl}`;
    console.log(dashboardURL);
     message.sender.send('eksMetricsResponse', JSON.stringify(dashboardURL));
  })
  .catch((err) => {
    console.log({err: 'error in grafana GET ' + err})
  });

  // const response = await fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // log.info(response);
  // const data = await response.json();
  // console.log(data)
  // console.log(awsUrl)
  // message.sender.send('eksMetricsResponse', JSON.stringify(data));
});