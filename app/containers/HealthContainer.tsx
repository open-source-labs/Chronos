import React, { useEffect, useState, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import { QueryContext } from '../context/QueryContext';
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
  const {selectedMetrics} = useContext(QueryContext);
  const [healthChartsArr, setHealthChartsArr] = useState<JSX.Element[]>([]);
  const { category } = props;

  useEffect(() => {
    // console.log("datalist in HealthContainer:", JSON.stringify(datalist));
    // console.log("timelist in HealthContainer:", JSON.stringify(timelist));
    const temp: JSX.Element[] = [];
    let counter: number = 0;   
    if (datalist.length > 0) {
      let selectedMetricsList : string[] = [];
      selectedMetrics.forEach(element => {
        if(Object.keys(element)[0]===category){
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
            const serviceVals : any[]  = serviceValArr[0]
            for (const serviceMetric of serviceVals) {
              const metric: string = Object.keys(serviceMetric)[0];
              const valueList = Object.values(serviceMetric)[0];
              console.log("timelist", JSON.stringify(timelist));
              console.log("serviceName", JSON.stringify(serviceName));
              console.log("metric", metric);
              console.log("categoryName", categoryName);
              const newTimeList: any = getTime(timelist, serviceName, metric, categoryName);
              console.log("newTimeList", newTimeList);
              // console.log('servicename', serviceName);
              // console.log("metric:", metric);
              // console.log("chart valuelist",JSON.stringify(valueList));
              // console.log("chart timelist", JSON.stringify(newTimeList));
              if(selectedMetricsList.includes(metric)){
                console.log("count in healthcontainer:", counter);
                const newHealthChart = (
                  <HealthChart
                    key={`Chart${counter}`}
                    service={serviceName}
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
  }, [timelist, datalist, category]); //add category here

  return <div>{healthChartsArr}</div>;
});

export default HealthContainer;
