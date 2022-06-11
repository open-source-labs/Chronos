import React, { useEffect, useState, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import HealthChart from '../charts/HealthChart';
import { getTime } from '../context/helpers';

interface HealthContainerProps {
  sizing: string;
  colourGenerator: Function;
  category: string;
}

const HealthContainer: React.FC<HealthContainerProps> = React.memo(props => {
  const { timelist } = useContext(HealthContext);
  const { datalist } = useContext(HealthContext);
  const [healthChartsArr, setHealthChartsArr] = useState<JSX.Element[]>([]);
  const { category } = props;

  useEffect(() => {
    const temp: JSX.Element[] = [];
    let counter: number;
    if (datalist.length > 0) {
      datalist.forEach((element: {}) => {
        const categoryName: string = Object.keys(element)[0];
        if (category === categoryName) {
          const categoryObj = element[categoryName];
          for (const metricObj of categoryObj) {
            const serviceName = Object.keys(metricObj)[0];
            for (const serviceMetric of Object.values(metricObj)[0]) {
              const metric: string = Object.keys(serviceMetric)[0];
              const valueList = Object.values(serviceMetric)[0];
              const timeList = getTime(timelist, serviceName, metric, categoryName);
              const newHealthChart = (
                <HealthChart
                  key={`Chart${counter}`}
                  service={serviceName}
                  metric={metric}
                  timeList={timeList}
                  valueList={valueList}
                  sizing={props.sizing}
                  colourGenerator={props.colourGenerator}
                />
              );
              counter++;
              temp.push(newHealthChart);
            }
          }
        }
      });
      setHealthChartsArr(temp);
    }
  }, [timelist, datalist]);

  return <div>{healthChartsArr}</div>;
});

export default HealthContainer;
