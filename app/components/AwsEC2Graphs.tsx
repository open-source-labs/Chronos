import React, { useContext, useEffect, useState } from 'react';
import AwsChart from '../charts/AwsChart';
import { AwsContext } from '../context/AwsContext';
import { CircularProgress } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';

const AwsEC2Graphs: React.FC = React.memo(props => {
  const { awsData, setAwsData } = useContext(AwsContext);
  const [isLoading, setLoadingState] = useState<boolean>(true);

  useEffect(() => {
    console.log('is state loading? ', !!awsData);
    if(awsData) setLoadingState(false);
  }, []);

  useEffect(() => {
    return () => {
      setAwsData({ CPUUtilization: [], NetworkIn: [], NetworkOut: [], DiskReadBytes: [] })
    }
  }, [])

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

  return (
    <div className="charts">
      {isLoading &&
        <div style={{ display: 'flex', width: 100, height:100, justifyContent: 'center', position: 'absolute', alignItems: 'center', zIndex: 50}}>
          <CircularProgress />
        </div>
      }
      {Object.keys(awsData)?.map(metric => {
        return (
          <AwsChart 
            className='chart'
            // key={`Chart${counter}`}
            renderService={metric}
            metric={awsData[metric][0]?.unit}
            timeList={awsData[metric]?.map(el => el.time)}
            valueList={awsData[metric]?.map(el => el.value)}
            // sizing={props.sizing}
            colourGenerator={stringToColor}
          />
        )
      })}
      {/* <AwsChart 
        className='chart'
        // key={`Chart${counter}`}
        renderService="CPU Utilization"
        metric="Percent"
        timeList={awsData.CPUUtilization?.map(el => el.time)}
        valueList={awsData.CPUUtilization?.map(el => el.value)}
        // sizing={props.sizing}
        colourGenerator={stringToColor}
      />
      <AwsChart 
        className='chart'
        // key={`Chart${counter}`}
        renderService="Network In"
        metric="Percent"
        timeList={awsData.NetworkIn?.map(el => el.time)}
        valueList={awsData.NetworkIn?.map(el => el.value)}
        // sizing={props.sizing}
        colourGenerator={stringToColor}
      />
      <AwsChart 
        className='chart'
        // key={`Chart${counter}`}
        renderService="Network Out"
        metric="Percent"
        timeList={awsData.NetworkOut?.map(el => el.time)}
        valueList={awsData.NetworkOut?.map(el => el.value)}
        // sizing={props.sizing}
        colourGenerator={stringToColor}
      />
      <AwsChart 
        className='chart'
        // key={`Chart${counter}`}
        renderService="DiskReadBytes"
        metric="Percent"
        timeList={awsData.DiskReadBytes?.map(el => el.time)}
        valueList={awsData.DiskReadBytes?.map(el => el.value)}
        // sizing={props.sizing}
        colourGenerator={stringToColor}
      /> */}
    </div>
  )
});

export default AwsEC2Graphs;