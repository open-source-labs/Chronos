import React, { useEffect, useState, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import { QueryContext } from '../context/QueryContext';
import HealthChart from '../charts/HealthChart';
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
  /*
    Pull in all the health data via HealthContext (an object with data and timestamps).
    Pull in the list of ALL user-selected metrics via QueryContext as strings, even if they don't pertain to this category.
    Destructure category from props. This category was passed down from the GraphsContainer and creates a new tab in Chronos to view charts pertaining only to the category.
    Think of each <HealthContainer /> as the new tab in Chronos. It will only create charts pertaining to that category.
    healthChartsArr is local state that gets updated here with an array of <HealthChart />'s that display user-selected data for the category.
    `service` is used to determine if we should display our health charts (because kafka and kubernetes specifically don't use HealthChart to display data).
    */
  const { healthData } = useContext(HealthContext);
  const { selectedMetrics } = useContext(QueryContext);
  const { category } = props;
  const { service } = useParams<keyof Params>() as Params;
  const [healthChartsArr, setHealthChartsArr] = useState<JSX.Element[]>([]);

  const filteredHealthDataList: any[] = [];
  const filteredHealthTimeList: any[] = [];

  // function that filters healthData's list of metric data down to only the data pertaining to the passed in category
  function filterHealthDataAndTimeByCategory() {
    const originalHealthDataList = healthData.healthDataList;
    const originalHealthTimeList = healthData.healthTimeList;

    originalHealthDataList.forEach(categoryObject => {
      // categoryObject is an object with a key of "Memory", "CPU", "Processes", or "Latency" and a value of an array with one element in it.
      // each value is another object with a key of whichever services the user has selected to monitor (ex: "books", "customers", "reverse proxy")
      const dataCategory = Object.keys(categoryObject)[0];
      if (dataCategory === category) {
        // if the categories match, iterate over the categoryObject's values which will be an array of services that have metric data for that category
        // push the services in the matched category to the filteredHealthDataList for use in graph construction
        const services = categoryObject[dataCategory];
        services.forEach((service: object) => {
          filteredHealthDataList.push(service);
        })
      }
    });

    originalHealthTimeList.forEach(categoryObject => {
      const dataCategory: string = Object.keys(categoryObject)[0];
      if (dataCategory === category) {
        const services = Object.values(categoryObject);
        services.forEach((service) => {
          filteredHealthTimeList.push(service);
        })
      }
    })
  };

  // function that filters ALL user-selected metric titles down to ones that pertain to this category

  // function that filters all the healthData (health and timestamp data) pertaining to this category down to only the data matching the metric titles selected by the user

  useEffect(() => {
    const temp: JSX.Element[] = [];
    let counter: number = 0;
    const dataList: any[] = healthData.healthDataList;
    const timeList: any[] = healthData.healthTimeList;
    // dataList and timeList are structured the same, but timeList holds timestamps. An array of 4 objects: [Memory, CPU, Processes, Latency]
    // console.log('dataList in healthcontainer is:', dataList);
    // console.log('timelist in healthcontainer is:', timeList);

    // conditional that verifies data exists before any charts are created
    if (healthData && dataList && timeList && dataList.length > 0 && timeList.length > 0) {
      // initalize an array to store user-selected metrics
      // iterates through ALL user-selected metrics and filters it down to metrics that pertain to this category
      let selectedMetricsList: string[] = [];
      selectedMetrics.forEach(element => {
        if (Object.keys(element)[0] === category) {
          selectedMetricsList = element[category];
        }
      });
      // ***ALERT*** temporary solution to getting the list of times for our single chart
      const times: string[] = timeList[0].Memory[0].books[0].activememory_in_bytes;

      dataList.forEach((element: {}) => {
        const categoryName: string = Object.keys(element)[0];
        /*
        'element' is the category found in the dataList response from the server query for metrics data.
        The above forEach method loops through the different categories.
        The 'category' variable is the specific category passed in to HealthContainer via prop drilling.
        The 'category' is the string Memory, CPU, or others that are in the Category column of the Query Selector interface.
        The 'categoryName' is the string that is Memory/CPU/other inside the metrics data response ('dataList' or 'timelist').
        */
        if (category === categoryName) {
          const categoryObj: [] = element[categoryName];
          const filteredMetrics: any[] = [];
          for (const metricObj of categoryObj) {
            // serviceName = category (ex. books)
            const serviceName: string = Object.keys(metricObj)[0];
            console.log('metricObj: ', metricObj);
            const serviceMetricsArr: any[] = Object.values(metricObj).flat();
            console.log('serviceMetricsArr: ', serviceMetricsArr); // -> array of arrays containing numerical data.
            /* serviceMetricsArr = array of all metric objects
            [0: {
              total-availle-memory-in-bytes: [numbers, more numbers, nums, woo]
            }]
            */

            // filters through the desired metrics and pass them down to HealthChart
            selectedMetricsList.forEach(selected => {
              serviceMetricsArr.forEach(metric => {
                if (metric[selected]) filteredMetrics.push(metric);
              });
            });
            console.log('filteredMetrics: ', filteredMetrics);

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
