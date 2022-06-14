/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import { useRef, useEffect } from 'react';

export function transformData(healthData) {
  const categoryList = getCategory(healthData[0]); //['Memory', 'CPU']
  const serviceList = getServices(healthData);  //['books', 'orders']
  const categoryList_time = [];
  const categoryList_data = [];
  categoryList.forEach((category) => {
    const categoryObj_time = {};
    const categoryObj_data = {};
    const value_time = []; //[{}, {}...]
    const value_data = [];
    serviceList.forEach(serviceName => {
      const newRowObj_time = {}; //  { books: [{ disk_usage: [1, 2] }, { clockSpeed: [1, 2] }] }
      const newRowObj_data = {}; // { books: [{ disk_usage: [10, 20] }, { clockSpeed: [8, 16] }] }
      const [valueInNewRowObj_data, valueInNewRowObj_time] = getValueInNewRowObj(healthData,serviceName,category);
      newRowObj_time[serviceName] = valueInNewRowObj_time;
      newRowObj_data[serviceName] = valueInNewRowObj_data;
      value_time.push(newRowObj_time);
      value_data.push(newRowObj_data);
      
    });


    categoryObj_time[category] = value_time;
    categoryObj_data[category] = value_data;
    categoryList_time.push(categoryObj_time)
    categoryList_data.push(categoryObj_data);
  });
  return [categoryList_data, categoryList_time];
}


function getCategory(serviceObj) {
  const set = new Set();
  const valueArr  = Object.values(serviceObj)[0];

  for(let i = 0; i < valueArr.length; i++){
    const row = valueArr[i];
    set.add(row.category);

  }
  return [...set];
}

function getServices(healthData){
  const res = [];
  healthData.forEach(element => {
    res.push(Object.keys(element)[0])
  });
  return res;
}

function getValueInNewRowObj(healthData, serviceName, categoryName) {
  const lst_data = [];
  const lst_time = [];
  healthData.forEach(serviceObj => {
    if (Object.keys(serviceObj)[0] === serviceName) {
      const dbRows = Object.values(serviceObj)[0];
      const metricSet = new Set();

      dbRows.forEach(row => {
        const { metric } = row;
        const { category } = row;
        const { time } = row;
        const { value } = row;
        if (category === categoryName) {
          if (!metricSet.has(metric)) {
            // first time see metric
            const metricObj_time = {}; // { disk_usage: [1, 2] }
            const metricObj_data = {}; // { disk_usage: [10, 20] }
            metricSet.add(metric);
            metricObj_time[metric] = [time]; // { disk_usage: [1] }
            metricObj_data[metric] = [value]; // { disk_usage: [10] }
            lst_time.push(metricObj_time); // [{ disk_usage: [1] }]
            lst_data.push(metricObj_data); // [{ disk_usage: [10] }]
          } else {
            // already see metric
            lst_data.forEach(el => {
              if (Object.keys(el)[0] === metric) {
                el[metric].push(value);
              }
            });
            lst_time.forEach(el => {
              if (Object.keys(el)[0] === metric) {
                el[metric].push(time);
              }
            });
          }
        }
      });
    }
  });
  return [lst_data, lst_time];
}

export function getTime(timeList, currService, metric, category) {
  let timelist;
  timeList.forEach(element => {
    const categoryName = Object.keys(element)[0];
    if (categoryName === category) {
      const categoryObj = element[categoryName];
      for (const metricObj of categoryObj) {
        const serviceName = Object.keys(metricObj)[0];
        if (serviceName === currService) {
          for (const serviceMetric of Object.values(metricObj)[0]) {
            if (serviceMetric[metric]) timelist = serviceMetric[metric];
          }
        }
      }
    }
  });
  return timelist;
}
export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};