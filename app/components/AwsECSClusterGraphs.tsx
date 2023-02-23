import React, { useContext, useEffect } from 'react';
import AwsChart from '../charts/AwsChart';
import { AwsContext } from '../context/AwsContext';

const AwsECSClusterGraphs: React.FC = React.memo(props => {
  const { awsEcsData, setAwsEcsData } = useContext(AwsContext);

  useEffect(() => {
    return () => {
      setAwsEcsData({});
    };
  }, []);

  const stringToColor = (string: string, recurses = 0) => {
    if (recurses > 20) return string;
    function hashString(str: string) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      let colour = '#';
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += `00${value.toString(16)}`.substring(-2);
      }

      console.log(colour);
      return colour;
    }
  };

  const activeServices = Object.keys(awsEcsData)
    .slice(1)
    .filter(el => awsEcsData[el].CPUUtilization?.value.length > 0);
  const serviceGraphs = activeServices.map(service => {
    return (
      <div className="ecsCharts-container">
        <div id="service-name">
          <p>Service Name:</p>
          <strong>{service}</strong>
        </div>
        <div className="ecsCharts">
          <AwsChart
            className="chart"
            renderService="CPU Utilization"
            metric="Percent"
            timeList={awsEcsData[service]?.CPUUtilization.time}
            valueList={awsEcsData[service]?.CPUUtilization.value}
            colourGenerator={stringToColor}
          />
          <AwsChart
            className="chart"
            renderService="Memory Utilization"
            metric="Percent"
            timeList={awsEcsData[service]?.MemoryUtilization.time}
            valueList={awsEcsData[service]?.MemoryUtilization.value}
            colourGenerator={stringToColor}
          />
        </div>
      </div>
    );
  });

  return <div>{serviceGraphs}</div>;
});

export default AwsECSClusterGraphs;
