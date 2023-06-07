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

interface DataObject {
  [key: string]: object;
}

const HealthContainer: React.FC<HealthContainerProps> = React.memo(props => {
  /*
    Pull in all the health data via HealthContext
    Pull in the list of ALL user-selected metrics via QueryContext as strings, even if they don't pertain to this category.
    Destructure category from props. This category was passed down from the GraphsContainer and creates a new tab in Chronos to view charts pertaining only to the category.
    Think of each <HealthContainer /> as the new tab in Chronos. It will only create charts pertaining to that category.
    healthChartsArr is local state that gets updated here with an array of <HealthChart />'s that display user-selected data for the category.
    `service` is only used to determine if we should display our health charts (because kafka and kubernetes specifically don't use HealthChart to display data).
    */
  const { healthData } = useContext(HealthContext);
  const { selectedMetrics } = useContext(QueryContext);
  const { category } = props;
  const { service } = useParams<keyof Params>() as Params;
  const [healthChartsArr, setHealthChartsArr] = useState<JSX.Element[]>([]);

  /* 
  This function filters the selectedMetrics array down to only metrics that match the category of this instance of HealthContainer.
  Once that has finished, it then filters the healthData down to the current category and only the filteredMetrics.
  */
  const filterSelectedMetricsAndHealthData = (): DataObject => {
    // filtered health data for output
    const filteredHealthData = {};
    const filteredMetricNames: string[] = [];
    selectedMetrics.forEach(metricObj => {
      const metricCategory = Object.keys(metricObj)[0];
      // if the current metric's category matches our category, add its array content to the filteredHealthData array
      if (metricCategory === category) {
        metricObj[metricCategory].forEach(metricName => {
          filteredMetricNames.push(metricName);
        });
      }
    });
    // iterate over the healthData object
    for (const service in healthData) {
      const categoryObjects = healthData[service];
      for (const categoryName in categoryObjects) {
        // if the category in healthData matches the category passed down to this HealthContainer, iterate over the related metrics
        if (categoryName === category) {
          const metricObjects = categoryObjects[categoryName];
          for (const metric in metricObjects) {
            // if the metric title matches any element in the filtered metrics array, add the metric object to the filteredHealthData object
            if (filteredMetricNames.includes(metric)) {
              filteredHealthData[metric] = metricObjects[metric];
            }
          }
        }
      }
    }
    // console.log('filteredMetricNames: ', filteredMetricNames);
    // console.log('filteredHealthData: ', filteredHealthData);
    return filteredHealthData;
  };

  // function to create a version of the healthData based on the value type
  const defineDataValueType = (metricName: string): string => {
    // current healthData value types: GHz, bytes, temperature, percent, ticks, processes, num, latency
    /* 
    define a dictionary of data types where the key is the expected chars to be found in the parameter
    and the value is the desired data type label
    */
    const typeDictionary = {
      GHz: 'Speed in GHz',
      memory: 'Memory in Megabytes',
      temperature: 'Degrees in Celsius',
      percent: 'Percent',
      ticks: 'Total Ticks',
      processes: 'Number of Processes',
      num_of: 'Total Amount',
      cache: 'Cache in Megabytes',
      latency: 'Latency',
    };
    // iterate through the dictionary and check if the key matches any part of the metricName
    // if true assign type to the value of the matching key and return
    let type: string = ''; // type will store the result for returning
    for (const [key, value] of Object.entries(typeDictionary)) {
      if (metricName.includes(key)) {
        type = value;
        break;
      } else {
        type = 'Unknown Value';
      }
    }
    return type;
  };

  // function to sort the filtered healthData by data type to use for building graphs with same data label
  const healthDataGroupedByDataType = (filteredHealthData: object): DataObject => {
    const groupedObject: DataObject = {};
    // charts need to be separated first by service and then each metric needs to be separated by value type
    // iterate over the services in the healthData object
    for (const serviceName in filteredHealthData) {
      // save the metrics of the current service to a variable
      // note: 'category' allows direct access to the list of metrics since we've already filtered to the current category
      const metrics = healthData[serviceName][category];
      // iterate over the current service's metrics
      for (const metricName in metrics) {
        // define the data type of the current metric
        const type: string = defineDataValueType(metricName);
        // save the value type as a key on an object
        // save the value of that key as an empty object
        groupedObject[type] = {};
        // save the serviceName as a key and assign it an empty object as value
        groupedObject[type][serviceName] = {};
        // define the metric's value (an object containing two keys of `data` and `time`, whose values are arrays of data/timestamps)
        const metricValue: object = metrics[metricName];
        // assign the object at that type key a new entry with the key of our current metric object's name and its value as the values
        groupedObject[type][serviceName][metricName] = metricValue;
      }
    }

    return groupedObject;
  };

  // function to generate charts using the type-sorted data
  const generateCharts = sortedData => {
    const chartsArray: JSX.Element[] = [];
    let keymaker = 1;
    // iterate over the sortedData and create a chart for each data type
    for (const dataType in sortedData) {
      // pass down the value of the current data type object
      chartsArray.push(
        <HealthChart
          key={`Chart${keymaker}`}
          dataType={dataType}
          chartData={sortedData[dataType]}
          categoryName={`${category}`}
          sizing={props.sizing}
          colourGenerator={props.colourGenerator}
        />
      );
    }
    setHealthChartsArr(chartsArray);
  };

  useEffect(() => {
    // returns an object containing only the healthData for the current category and the metrics the User selected
    const filteredHealthData = filterSelectedMetricsAndHealthData();
    console.log('filtered health data: ', filteredHealthData);
    // returns an object containing the filtered data sorted by data type
    const typeSortedHealthData = healthDataGroupedByDataType(filteredHealthData);
    console.log('metrics sorted by data type: ', typeSortedHealthData);
    // invoking generateCharts with the sorted data will update healthChartsArr in state with the list of charts to be rendered
    generateCharts(typeSortedHealthData);
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
