import React, { useEffect, useState, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import { QueryContext } from '../context/QueryContext';
import HealthChart from '../charts/HealthChart';
import { getTime } from '../context/helpers';

interface HealthContainerProps {
  sizing: string;
  colourGenerator: Function;
  category: string;
  currentService: string;
}

const HealthContainer: React.FC<HealthContainerProps> = React.memo(props => {
  // const { timelist } = useContext(HealthContext);
  // const { datalist } = useContext(HealthContext);
  const {healthData} = useContext(HealthContext)
  const {selectedMetrics} = useContext(QueryContext);
  const [healthChartsArr, setHealthChartsArr] = useState<JSX.Element[]>([]);
  const { category } = props;


  // console.log("HC-healthData in HealthContainer:", JSON.stringify(healthData));
  // console.log("HC-datalist in HealthContainer:", JSON.stringify(healthData.healthDataList));
  // console.log("HC-timelist in HealthContainer:", JSON.stringify(healthData.healthTimeList));
  useEffect(() => {
    // console.log("datalist in HealthContainer:", JSON.stringify(datalist));
    // console.log("timelist in HealthContainer:", JSON.stringify(timelist));
    const temp: JSX.Element[] = [];
    let counter: number = 0;   
    const datalist : any[] = healthData.healthDataList;
    const timelist : any[] = healthData.healthTimeList;

    if (healthData &&  datalist && timelist && datalist.length > 0 &&  timelist.length > 0){
      console.log("HC-healthData in HealthContainer:", JSON.stringify(healthData));
      console.log("HC-datalist in HealthContainer:", JSON.stringify(datalist));
      console.log("HC-timelist in HealthContainer:", JSON.stringify(timelist));
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
            console.log("metricObj:", JSON.stringify(metricObj));
            const serviceName: string = Object.keys(metricObj)[0];
            const serviceValArr: any[] = Object.values(metricObj);
            const serviceVals : any[]  = serviceValArr[0]
            for (const serviceMetric of serviceVals) {
              const metric: string = Object.keys(serviceMetric)[0];
              const valueList = Object.values(serviceMetric)[0];
              // console.log("timelist", JSON.stringify(timelist));
              // console.log("serviceName", JSON.stringify(serviceName));
              // console.log("metric", metric);
              // console.log("categoryName", categoryName);
              console.log("indisde healthData.timeDataList:", timelist);
              const newTimeList: any = getTime(timelist, serviceName, metric, categoryName);
              // console.log("newTimeList", newTimeList);
              // console.log('servicename', serviceName);
              // console.log("metric:", metric);
              // console.log("chart valuelist",JSON.stringify(valueList));
              // console.log("chart timelist", JSON.stringify(newTimeList));
              if(selectedMetricsList.includes(metric)){
                console.log("count in healthcontainer:", counter);
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

 
  
  
  
  }, [healthData, category]); //add category here

  return <div>{healthChartsArr}</div>;
});

export default HealthContainer;
