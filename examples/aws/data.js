const AWS = require('aws-sdk');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, './.env')
});


const awsHelpers = {};

awsHelpers.getAwsMetrics = async () => {
  
  const cloudwatch = new AWS.CloudWatch({
    region: 'us-west-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  });
  
  const metricsNamesArray = ['CPUUtilization', 'NetworkIn', 'NetworkOut', 'DiskReadBytes'];
  const awsData = {};
  
  metricsNamesArray.forEach(metric => {
    const params = {
      EndTime: new Date(),
      MetricName: metric,
      Namespace: 'AWS/EC2',
      Period: 60,
      StartTime: new Date(new Date().getTime() - 60*60*1000),
      Statistics: ['Average'],
      Dimensions: [{ 
        Name: 'InstanceId',
        Value: 'i-0c5656a0366bc6027'
      }]
    }
    
    const fetchData = async () => {
      try {
        const data = await cloudwatch.getMetricStatistics(params).promise();
        // console.log(data)
        
        const newData = data.Datapoints.map((el, i) => {
          let transformedData = {};
        
          transformedData['time'] = data.Datapoints[i].Timestamp,
          transformedData['metric'] = data.Label,
          transformedData['value'] = data.Datapoints[i].Average,
          transformedData['unit'] = data.Datapoints[i].Unit
          
          // console.log(transformedData);
          // arrayTest.push(transformedData);
          return transformedData;
        })

        awsData[metric] = newData;
        // console.log(awsData)
 
        return awsData; // final returned data
      } catch (err) {
        console.log(err);
      }
    }

    fetchData().then(data => {
      console.log(data)

      // send data to frontend
    })
  })
}



// awsHelpers.getAwsMetrics();
// console.log(Promise.resolve(final))
// console.log(final);




// const metricStatisticsObject = {};

// awsHelpers.getMetricStatistics = async () => {
//   try{
//     const data = await cloudwatch.getMetricStatistics(CPUUtilization).promise();
    
//     metricStatisticsObject[CPUUtilization.MetricName] = data;
//     return metricStatisticsObject;
//   }catch(err){
//     console.log(err);
//   }
// };
// getMetricStatistics().then(metricStatisticsObject =>{
//   console.log(metricStatisticsObject[CPUUtilization.MetricName].Datapoints.map(datapoint => datapoint.Average))
// })


module.exports = awsHelpers;