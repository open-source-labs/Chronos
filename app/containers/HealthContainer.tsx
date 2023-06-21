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
  const { healthData } = useContext(HealthContext);
  const { selectedMetrics } = useContext(QueryContext);
  const { service } = useParams<keyof Params>() as Params;
  const [healthChartsArr, setHealthChartsArr] = useState<JSX.Element[]>([]);
  const { category, sizing, colourGenerator } = props;
  /**
   * This function filters the selectedMetrics array down to only metrics that match the category of this instance of HealthContainer.
   * Once that has finished, it then filters the healthData down to the current category and the filteredMetrics.
  */
  const filterSelectedMetricsAndHealthData = (): DataObject => {
    // define a filtered health data object for output
    // define an array of filteredMetricNames for later use
    const filteredHealthData = {};
    const filteredMetricNames: string[] = [];
    // iterate over the selectedMetrics from QueryContext
    selectedMetrics.forEach(metricObj => {
      // due to the way the data is stored, each metricObj has a key of category, and an array of selected metrics as a value
      const metricCategory = Object.keys(metricObj)[0];
      const metricValuesArray = metricObj[metricCategory];
      // if the current metricObj's category matches our instance's current category, iterate through its array of values
      if (metricCategory === category) {
        metricValuesArray.forEach(metricName => {
          filteredMetricNames.push(metricName); // add the metricNames to the filteredMetricNames array
        });
      }
    });
    /* 
    Now that we've defined which of the user's selected metrics belong in this category, iterate over the healthData object
    and filter it down to the selected category and metrics.
    */
    for (const service in healthData) {
      filteredHealthData[service] = {};
      const categoryObjects = healthData[service];
      for (const categoryName in categoryObjects) {
        // if the category in healthData matches the category passed down to this HealthContainer, iterate over the related metrics
        if (categoryName === category) {
          const metricObjects = categoryObjects[categoryName];
          for (const metric in metricObjects) {
            // if the metric title matches any element in the filtered metrics array, add the metric serviceName to the filteredHealthData object, then add the metrics for that service
            if (filteredMetricNames.includes(metric)) {
              filteredHealthData[service][metric] = metricObjects[metric];
            }
          }
        }
      }
    }
    return filteredHealthData;
  };
  // function to create a version of the healthData based on the value type
  // current healthData value types: GHz, bytes, temperature, percent, ticks, processes, num, latency
  const defineDataValueType = (metricName: string): string => {
    /**
     * Define a dictionary of data types where the key is the expected chars to be found in the parameter
     * and the value is the desired data type label.
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
    // iterate through the dictionary and check if the key matches any part of the passed in metricName
    // if they match, update type variable to the value of the matching key and return
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

  // function to sort the filteredHealthData by data type to build graphs based on the same data label
  const healthDataGroupedByDataType = (filteredHealthData: object): DataObject => {
    const typeGroupedObject = {};
    // iterate over the services in the healthData object
    for (const serviceName in filteredHealthData) {
      // save the filtered metrics of the current service to a variable
      // define the types of each metric in the metrics object as an array
      const metrics: object = filteredHealthData[serviceName];
      const typesArray: string[] = Object.keys(metrics).map((metricName: string): string => {
        return defineDataValueType(metricName);
      });
      // iterate over the types array and assign the typeGroupedObject a key of type, with a value of an object
      // then assign that newly created object a key of the current service and a value of an object
      typesArray.forEach((metricType: string) => {
        if (!typeGroupedObject[metricType]) {
          // if the metric type doesn't exist, initalize it
          typeGroupedObject[metricType] = {};
        } // if it does exist alread, add the service name to it
        typeGroupedObject[metricType][serviceName] = {};
      });
      // iterate over the metrics object of the current service
      for (const metric in metrics) {
        // define the current metric's type
        const metricType: string = defineDataValueType(metric);
        // store the current metric and its value in the typeGrouped object at the appropriate type and serviceName
        typeGroupedObject[metricType][serviceName][metric] = metrics[metric];
      }
    }

    return typeGroupedObject;
  };

  // function to generate charts using the type-sorted data
  const generateHealthCharts = sortedData => {
    const chartsArray: JSX.Element[] = [];
    const keymaker = () => {
      return Math.floor(Math.random() * 1000);
    };
    // iterate over the sortedData and create a chart for each data type and each service of that data
    for (const dataType in sortedData) {
      const serviceObjects = sortedData[dataType];
      for (const serviceName in serviceObjects) {
        // pass down the value of the current data type and service
        const chartData = serviceObjects[serviceName];
        chartsArray.push(
          <HealthChart
            key={'H' + keymaker()}
            dataType={dataType}
            serviceName={serviceName}
            chartData={chartData}
            categoryName={category}
            sizing={sizing}
            colourGenerator={colourGenerator}
          />
        );
      }
    }
    setHealthChartsArr(chartsArray);
  };

  useEffect(() => {
    // returns an object containing only the healthData for the current category and the metrics the User selected
    const filteredHealthData = filterSelectedMetricsAndHealthData();
    // returns an object containing the filtered data sorted by data type
    const typeSortedHealthData = healthDataGroupedByDataType(filteredHealthData);
    // invoking generateCharts with the sorted data will update healthChartsArr in state with the list of charts to be rendered
    generateHealthCharts(typeSortedHealthData);
  }, [category]);

  // JJ-ADDITION
  return (
    <div>
      {service !== 'kafkametrics' && service !== 'kubernetesmetrics' ? healthChartsArr : []}
    </div>
  );
});

export default HealthContainer;
