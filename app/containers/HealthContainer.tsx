import React, { useEffect, useState, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import { QueryContext } from '../context/QueryContext';
import HealthChart from '../charts/HealthChart';
import { getTime } from '../context/helpers';
import { useParams } from 'react-router-dom';

interface HealthContainerProps {
  sizing: string;
  colourGenerator: Function;
  category: string;
  currentService: string;
}

interface Params {
  service: string;
}

const HealthContainer: React.FC<HealthContainerProps> = React.memo(props => {
  const { healthData } = useContext(HealthContext);
  const { selectedMetrics } = useContext(QueryContext);
  const [healthChartsArr, setHealthChartsArr] = useState<JSX.Element[]>([]);
  const { category } = props;
  const { service } = useParams<keyof Params>() as Params;

  useEffect(() => {
    const temp: JSX.Element[] = [];
    let counter: number = 0;
    const datalist: any[] = healthData.healthDataList;
    const timelist: any[] = healthData.healthTimeList;

    if (healthData && datalist && timelist && datalist.length > 0 && timelist.length > 0) {
      let selectedMetricsList: string[] = [];
      selectedMetrics.forEach(element => {
        if (Object.keys(element)[0] === category) {
          selectedMetricsList = element[category];
        }
      });

      datalist.forEach((element: {}) => {
        const categoryName: string = Object.keys(element)[0];
        if (category === categoryName) {
          const categoryObj: [] = element[categoryName];
          for (const metricObj of categoryObj) {
            const serviceName: string = Object.keys(metricObj)[0];
            const serviceValArr: any[] = Object.values(metricObj);
            const serviceVals: any[] = serviceValArr[0];
            for (const serviceMetric of serviceVals) {
              const metric: string = Object.keys(serviceMetric)[0];
              const valueList = Object.values(serviceMetric)[0];
              const newTimeList: any = getTime(timelist, serviceName, metric, categoryName);
              if (selectedMetricsList.includes(metric)) {
                const newHealthChart = (
                  <HealthChart
                    key={`Chart${counter}`}
                    renderService={serviceName}
                    metric={metric}
                    timeList={newTimeList}
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
        }
      });
      setHealthChartsArr(temp);
    }
  }, [healthData, category]);

  // return <div>{service !== 'kafkametrics' ? healthChartsArr : []}</div>;
  // JJ-ADDITION
  return (
    <div>
      {service !== 'kafkametrics' && service !== 'kubernetesmetrics' ? healthChartsArr : []}
    </div>
  );
});

export default HealthContainer;
