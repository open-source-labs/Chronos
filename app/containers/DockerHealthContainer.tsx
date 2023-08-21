import React, { useEffect, useState, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import { QueryContext } from '../context/QueryContext';
import GrafanaEventChart from '../charts/GrafanaEventChart';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';

interface HealthContainerProps {
  sizing: string;
  colourGenerator: Function;
  category: string;
  //currentService: string;
}

interface Params {
  service: string;
}

interface DataObject {
  [key: string]: {
    value: string[],
    time: string[],
    id: string,
    token: string
  };
}
interface DockerDataObject {
    [key: string]: DataObject
}

const DockerHealthContainer: React.FC<HealthContainerProps> = React.memo(props => {
  const { healthData } = useContext(HealthContext);
  const { selectedMetrics } = useContext(QueryContext);
  const { service } = useParams<keyof Params>() as Params;
  const [healthChartsArr, setHealthChartsArr] = useState<JSX.Element[]>([]);
  const { sizing, colourGenerator, category } = props;
  const [currIndex, setCurrIndex] = useState(0);
  const [currChunk, setCurrChunk] = useState<JSX.Element[]>([]);
  const chunkSize = 7;
  let [isGrafana, setIsGrafana] = useState(false);
  /**
   * This function filters the selectedMetrics array down to only metrics that match the category of this instance of HealthContainer.
   * Once that has finished, it then filters the healthData down to the current category and the filteredMetrics.
  */

  function nextChunk() {
    const nextChunk = healthChartsArr.slice(currIndex, currIndex + chunkSize);
    setCurrChunk(nextChunk);
    setCurrIndex(currIndex + chunkSize);
  }
  function prevChunk() {
    const prevChunk = healthChartsArr.slice(currIndex - 2 * chunkSize, currIndex - chunkSize);
    setCurrChunk(prevChunk);
    setCurrIndex(currIndex - chunkSize);
  }

  const filterSelectedMetricsAndHealthData = (): DockerDataObject => {
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

    // helper function for geting only the names of the metrics
    const getIndex = (str: string, substr: string, ind: number): number => {
        let Len = str.length,
          i = -1;
        while (ind-- && i++ < Len) {
          i = str.indexOf(substr, i);
          if (i < 0) break;
        }
        return i;
      }

  // function to generate charts using the type-sorted data
  const generateHealthCharts = (sortedData: DockerDataObject): void => {
    //onst chartsArray: JSX.Element[] = [];
    const grafanaChartsArray: JSX.Element[] = [];
    //let parsedName: string = '';
    const keymaker = () => {
      return Math.floor(Math.random() * 1000);
    };
    // iterate over the sortedData and create a chart for each data type and each service of that data
    for (const dataType in sortedData) {
      const metricObjects = sortedData[service];
      for (const metricName in metricObjects) {
        // pass down the value of the current data type and service
        const chartData = metricObjects[metricName];
        const token = chartData.token;
        // chartsArray.push(
        //   <HealthChart
        //     key={'H' + keymaker()}
        //     dataType={dataType}
        //     serviceName={serviceName}
        //     chartData={chartData}
        //     categoryName={category}
        //     sizing={sizing}
        //     colourGenerator={colourGenerator}
        //   />
        // );
        console.log("plotting grafana")
        grafanaChartsArray.push(
          <GrafanaEventChart metricName={metricName} token={token} />);

      }
    }
    console.log(grafanaChartsArray)
    setHealthChartsArr(grafanaChartsArray);
    setCurrChunk(grafanaChartsArray.slice(currIndex, currIndex + chunkSize));
    setCurrIndex(currIndex + chunkSize);
  };

  useEffect(() => {
    // returns an object containing only the healthData for the current category and the metrics the User selected
    const filteredHealthData = filterSelectedMetricsAndHealthData();
    // returns an object containing the filtered data sorted by data type
    //const typeSortedHealthData = healthDataGroupedByDataType(filteredHealthData);
    // invoking generateCharts with the sorted data will update healthChartsArr in state with the list of charts to be rendered
    generateHealthCharts(filteredHealthData);
  }, [category]);

  // JJ-ADDITION
  return (
    <div>
      {/* <div id="grafana" onClick={() => { setIsGrafana(!isGrafana) }}>Grafana</div> */}
      {service.includes('kafkametrics') || service.includes('kubernetesmetrics') || service.includes('books') || service.includes('customers') || service.includes('frontend') || service.includes('orders')? currChunk : []}
      {healthChartsArr.length > chunkSize && (
        <>
          <Button id="prevCharts" onClick={prevChunk} variant="contained" color="primary" disabled={currIndex <= chunkSize}>
            Prev
          </Button>
          <Button id="nextCharts" onClick={nextChunk} variant="contained" color="primary" disabled={currIndex >= healthChartsArr.length}>
            Next
          </Button>
        </>
      )}
    </div>
  );
});

export default DockerHealthContainer;
