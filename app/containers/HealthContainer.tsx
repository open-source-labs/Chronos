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
    // dataList and timeList are the EXACT same thing. An array of 4 objects. [Memory, CPU, Processes, Latency]
    // Each element has all its metrics.
    console.log('healthData object in state: ', healthData);
    console.log('datalist in healthcontainer is:', datalist); //array of healthDataList
    console.log('timelist in healthcontainer is:', timelist);

    if (healthData && datalist && timelist && datalist.length > 0 && timelist.length > 0) {
      let selectedMetricsList: string[] = [];
      selectedMetrics.forEach(element => {
        if (Object.keys(element)[0] === category) {
          selectedMetricsList = element[category];
        }
      });

      datalist.forEach((element: {}) => {
        const categoryName: string = Object.keys(element)[0];
        /*
        'element' is the category found in the datalist response from the server query for metrics data.
        The above forEach method loops through the different categories.
        The 'category' variable is the specific category passed in to HealthContainer via prop drilling.
        The 'category' is the string Memory, CPU, or others that are in the Category column of the Query Selector interface.
        The 'categoryName' is the string that is Memory/CPU/other inside the metrics data response ('datalist' or 'timelist').
        When the 'element'/'categoryName' matches the 'category' selected in the Query Selection interface...
        ... it will dive into that Category object to pull out a chart for each metric selected in the selection interface.
        selectedMetricsList is derived from the selectedMetrics that were in the QueryContext.
        selectedMetricsList is how we know which metrics should be made into a chart.
        selectedMetricsList is the way we can give one chart the multiple metrics being requested.
        */
        if (category === categoryName) {
          const categoryObj: [] = element[categoryName];
          for (const metricObj of categoryObj) {
            const serviceName: string = Object.keys(metricObj)[0];
            const serviceMetricsArr: any[] = Object.values(metricObj).flat();
            console.log('serviceMetricsArr: ', serviceMetricsArr); // -> array of objects.
            for (const serviceMetric of serviceMetricsArr) {
              const metric: string = Object.keys(serviceMetric)[0];
              const valueList = Object.values(serviceMetric)[0];
              const newTimeList: any = getTime(timelist, serviceName, metric, categoryName);
              // console.log('valueList is', valueList); //-> 50 values in an array
              // console.log('newTimeList array is:', newTimeList); //-> 50 values in an array
              if (selectedMetricsList.includes(metric)) {
                const re = /_/g;
                const newHealthChart = (
                  <HealthChart
                    key={`Chart${counter}`}
                    renderService={serviceName}
                    metric={metric.replace(re, " ")}
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
