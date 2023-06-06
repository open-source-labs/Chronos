/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import { useRef, useEffect } from 'react';

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

// Keep this in sync with the format in the users.json file for guests
export const guestUser = {
  username: 'guest',
  services: [],
  mode: 'light',
};

// Transforms health data into a nested object based on service name
export function transformer(healthData) {
  // make an object for storing different services' metrics data
  const serviceMetricsObject = {};
  // loop through the services in the healthData array
  healthData.forEach(serviceObj => {
    // grab the key string from the current service object
    const serviceName = Object.keys(serviceObj)[0];
    const serviceElements = serviceObj[serviceName];
    // add the serviceName as a key on the serviceMetricsObject and assign it an empty object
    serviceMetricsObject[serviceName] = {};
    // loop through the elements of the current service
    serviceElements.forEach(dataObject => {
      // if it doesn't exist, generate a key for that object that matches the category value of the current dataObject
      if (!serviceMetricsObject[serviceName][dataObject.category]) {
        serviceMetricsObject[serviceName][dataObject.category] = {};
      }
      // in that nested object, assign a key using the current dataObject's metric value and assign its value an empty object
      if (!serviceMetricsObject[serviceName][dataObject.category][dataObject.metric]) {
        serviceMetricsObject[serviceName][dataObject.category][dataObject.metric] = {};
      }
      // if the 'value' key doesn't exist in the previous object assign a key of 'value' with the value of an array that includes the value of value
      if (!serviceMetricsObject[serviceName][dataObject.category][dataObject.metric].value) {
        serviceMetricsObject[serviceName][dataObject.category][dataObject.metric].value = [dataObject.value];
      } else { // if it does exist, push the value of the current dataObject's time key onto the array
        serviceMetricsObject[serviceName][dataObject.category][dataObject.metric].value.push(
          dataObject.value
        );
      }
      // in that same object, if the key 'time' doesn't exist yet, assign a key of 'time' with the value as an array that includes the time value
      if (!serviceMetricsObject[serviceName][dataObject.category][dataObject.metric].time) {
        serviceMetricsObject[serviceName][dataObject.category][dataObject.metric].time = [dataObject.time];
      } else { // if it does exist aready, push the current time value into the time array
        serviceMetricsObject[serviceName][dataObject.category][dataObject.metric].time.push(
          dataObject.time
        );
      }
    });
  })
  return serviceMetricsObject;
};