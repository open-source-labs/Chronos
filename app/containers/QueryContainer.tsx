import React, { useEffect, useState, useContext } from 'react';
import { QueryContext } from '../context/QueryContext';
import {HealthContext} from '../context/HealthContext';
import {EventContext} from '../context/EventContext';

interface QueryContainerProps {

}

const QueryContainer: React.FC<QueryContainerProps> = React.memo(props => {
 
  const { setSelectedMetrics } = useContext(QueryContext); 
  const {category_service_datalist} = useContext(HealthContext); 
  const {datalist} = useContext(EventContext); 
  const [allMetrics, setAllMetrics] = useState([]);

  useEffect(()=>{
    const temp : any[] = [];
    //get allMetrics from health data
    if(category_service_datalist){
      const tempObj = {};
      category_service_datalist.forEach(element => {
        const category: string = Object.keys(element)[0];
        const metricList : string[] = [];
        const sampleService: {} = Object.values(element)[0][0];
        const sampleServiceMetricList : any[] =sampleService[0];
        sampleServiceMetricList.forEach(el => {
          metricList.push(Object.keys(el)[0]);
        });
        tempObj[category] = metricList;
      });
      temp.push(tempObj);
    }
    //get allMetrics from event data
    if(datalist){
      const tempObj = {};
      const category: string = "Event";
      const metricList : string[] = [];
      datalist.forEach(element => {
        metricList.push(Object.keys(element)[0])
      });
      tempObj[category] = metricList;
      temp.push(tempObj);
    }
    //setAllMetrics
    setAllMetrics(temp);
    
  },[])

  return
   <div>
     <AllMetricsCard value = {allMetrics}/>
     <SelectButton/>
     <DeSelectButton/>
     <SelectedMetricsCard/>
     <GenerateChartButton/>

   </div>
});

export default QueryContainer;
