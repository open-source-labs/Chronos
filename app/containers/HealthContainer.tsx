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
    const dataList: any[] = healthData.healthdataList;
    const timeList: any[] = healthData.healthTimeList;
    // dataList and timeList are structured the same, but time holds timestamps. An array of 4 objects. [Memory, CPU, Processes, Latency]
    // Each element has all its metrics.
    console.log('healthData object in state: ', healthData);
    console.log('dataList in healthcontainer is:', dataList); //array of healthdataList
    console.log('timelist in healthcontainer is:', timeList);

    if (healthData && dataList && timeList && dataList.length > 0 && timeList.length > 0) {
      let selectedMetricsList: string[] = [];
      selectedMetrics.forEach(element => {
        if (Object.keys(element)[0] === category) {
          selectedMetricsList = element[category];
        }
      });
      // temporary solution to getting the list of times for our single chart
      const times: string[] = timeList[0].Memory[0].books[0].activememory_in_bytes;

      dataList.forEach((element: {}) => {
        const categoryName: string = Object.keys(element)[0];
        /*
        'element' is the category found in the dataList response from the server query for metrics data.
        The above forEach method loops through the different categories.
        The 'category' variable is the specific category passed in to HealthContainer via prop drilling.
        The 'category' is the string Memory, CPU, or others that are in the Category column of the Query Selector interface.
        The 'categoryName' is the string that is Memory/CPU/other inside the metrics data response ('dataList' or 'timelist').
        When the 'element'/'categoryName' matches the 'category' selected in the Query Selection interface...
        ... it will dive into that Category object to pull out a chart for each metric selected in the selection interface.
        selectedMetricsList is derived from the selectedMetrics that were in the QueryContext.
        selectedMetricsList is how we know which metrics should be made into a chart.
        selectedMetricsList is the way we can give one chart the multiple metrics being requested.
        */
        if (category === categoryName) {
          const categoryObj: [] = element[categoryName];
          let filteredMetrics;
          for (const metricObj of categoryObj) {
            // serviceName = category (ex. books)
            const serviceName: string = Object.keys(metricObj)[0];
            /* serviceMetricsArr = array of ALL objects
            [0: {
              total-availle-memory-in-bytes: [numbers, more numbers, nums, woo]
            }]
            */
            const serviceMetricsArr: any[] = Object.values(metricObj).flat();
            // const serviceTimesArr: any[] = Object.values();
            console.log('serviceMetricsArr: ', serviceMetricsArr); // -> array of objects.
            // filter through the desired metrics and pass them down to HealthChart
            selectedMetricsList.forEach(selected => {
              filteredMetrics = serviceMetricsArr.filter(metric => {
                metric[selected];
              });
            });

            // serviceMetricsArr.filter(...selectedMetricsList)

            // for (const serviceMetric of serviceMetricsArr) {
            // const metric: string = Object.keys(serviceMetric)[0];
            // const valueList = Object.values(serviceMetric)[0];
            // const newTimeList: any = getTime(timelist, serviceName, metric, categoryName);
            // console.log('valueList is', valueList); //-> 50 values in an array
            // console.log('newTimeList array is:', newTimeList); //-> 50 values in an array
            // if (selectedMetricsList.includes(metric)) {
            const re = /_/g;
            const newHealthChart = (
              <HealthChart
                key={`Chart${counter}`}
                categoryName={categoryName}
                serviceName={serviceName}
                // metric={metric.replace(re, " ")}
                metrics={filteredMetrics}
                timeList={times}
                // valueList={valueList}
                sizing={props.sizing}
                colourGenerator={props.colourGenerator}
              />
            );
            counter++;
            temp.push(newHealthChart);
            // }
            // }
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
