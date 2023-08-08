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

/* Interfaces: HealthDataObject's have an initial key determined by whichever service was selected by the user,
and then another array of MetricObjects as a value.
Contrastly, EventData is simply an array of MetricObjects. Since they all fall under the same category of 'Event',
previous groups decided to simply
*/
interface MetricObject {
  category: string;
  metric: string;
  rowNumber: number;
  time: string;
  value: number;
  __v: number;
  _id: string;
}
interface HealthDataObject {
  [key: string]: MetricObject[]
}

// Transforms health data into a nested object based on service name
export function healthTransformer(healthData: HealthDataObject[]) {
  // make an object for storing different services' metrics data
  const serviceMetricsObject = {}; //books:..., customers:..., orders:..., frontend:...
  // loop through the services in the healthData array
  healthData.forEach(serviceObj => { //books
    // grab the key string from the current service object
    const serviceName = Object.keys(serviceObj)[0]; //books-containerinfos
    // add the serviceName as a key on the serviceMetricsObject and assign it an empty object
    serviceMetricsObject[serviceName] = {}; //add key service Name to object
    const serviceElements = serviceObj[serviceName]; //array of metric objects IN heatlhdataObj @ serviceName
    console.log('serviceElements: ', serviceElements);
    // loop through the elements of the current service
    serviceElements.forEach((dataObject:any) => { //--v12 --make it an object typscript?
      console.log('raw dataOBJ LN 53', dataObject);
      // !containerName exist, generate a key for that object that matches the category value of the current dataObject
      let containerName = dataObject.containername;
      if (!serviceMetricsObject[serviceName][containerName]) {
        serviceMetricsObject[serviceName][containerName] = {};
        console.log('line 58  if category ', [containerName])
      }

      for (let metric in dataObject) { //loop the data object for metric names and values
        // in containerName nested object, assign a key using the current dataObject's metric value and assign its value an empty object
        if (!serviceMetricsObject[serviceName][containerName][metric]) {
          serviceMetricsObject[serviceName][containerName][metric] = {};
          console.log('line 60  if metric ', metric)
        }
        // if the 'value' key doesn't exist in the previous object assign a key of 'value' with the value of an array that includes the value of value
        if (!serviceMetricsObject[serviceName][containerName][metric].value) {
          serviceMetricsObject[serviceName][containerName][metric].value = [dataObject[metric]];
          console.log('line 65  if value ', dataObject[metric])
        } else { // if it does exist, push the value of the current dataObject's time key onto the array
          serviceMetricsObject[serviceName][containerName][metric].value.push(
            dataObject[metric]
            );
            console.log('line 68  else value ', dataObject[metric])
        }
        // in that same object, if the key 'time' doesn't exist yet, assign a key of 'time' with the value as an array that includes the time value
        if (!serviceMetricsObject[serviceName][containerName][metric].time) {
          serviceMetricsObject[serviceName][containerName][metric].time = [dataObject.time];
          console.log('line 75  if time ', [dataObject.time])
        } else { // if it does exist aready, push the current time value into the time array
          serviceMetricsObject[serviceName][containerName][metric].time.push(
            dataObject.time
            );
            console.log('line 78  else time ', [dataObject.time])
        }
        console.log('serviceMetricsOBJ LN83: ', serviceMetricsObject)
      }
    });
  })
  return serviceMetricsObject;
};

export function eventTransformer(eventData: MetricObject[]) {
  // make an object for storing the metrics data
  const eventMetricsObject = {};
  // loop through the services in the eventData array
  eventData.forEach((metricObj: MetricObject) => {
    // destructure the category, metric name, time stamp, and metric value from the metricObj
    const { category, metric, time, value } = metricObj
    // if the category doesn't exist on the output object yet, initialize it
    if (!eventMetricsObject[category]) eventMetricsObject[category] = {};
    // if it doesn't exist yet in that nested object, assign a key using the current dataObject's metric name and assign its value an empty object
    if (!eventMetricsObject[category][metric]) eventMetricsObject[category][metric] = {};
    // if a key of 'value' doesn't exist in the previously made object, assign it key of 'value' and an array as its value that includes the information stored in value
    // if it does exist, push the value of the current dataObject's time key onto the array
    if (!eventMetricsObject[category][metric].value) eventMetricsObject[category][metric].value = [value];
    eventMetricsObject[category][metric].value.push(value);
    // in that same object, if the key 'time' doesn't exist yet, assign it a key of 'time' with the value as an array that includes the time value
    // if it does exist aready, push the current time value into the time array
    if (!eventMetricsObject[category][metric].time) eventMetricsObject[category][metric].time = [time];
    eventMetricsObject[category][metric].time.push(time);
  });
  // return the eventMetricsObject
  return eventMetricsObject;
};