import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import CommunicationsContext from '../context/OverviewContext';

const MicroServiceTraffic = (props) => {
  const communicationsData = useContext(CommunicationsContext).overviewData;

  //initialize an empty object resObj. This object will store the microservice names as values and its corresponding correlatingId or correlatingid as keys. The microservice names will be stored in array within the order it was to the database.    
  const resObj = {};

  if(communicationsData.length>0 && communicationsData[0]["_id"]){
    //Sort the communication array from latest to earliest document
    communicationsData.sort((a,b)=>{
      if(new Date(a.timeSent) > new Date(b.timeSent)) return 1;
      if(new Date(a.timeSent) < new Date(b.timeSent)) return -1;
      return 0;
    });
    
    //Iterate over sorted communicationsData array from the end to the beginning
      for (let i = 0; i < communicationsData.length; i+=1) {
      //declare a constant element and initialize it as the object at index i of the communicationsData array
      const element = communicationsData[i];
      //Pushes the microservice name into the object  
      if (resObj[element.correlatingId]) {
        resObj[element.correlatingId].push(element.currentMicroservice);
      }
      else resObj[element.correlatingId] = [element.currentMicroservice];
    }
  }

  else {
  
    for (let i = communicationsData.length-1; i >= 0; i--) {
      const element = communicationsData[i];
      if (resObj[element.correlatingid]) resObj[element.correlatingid].push(element.currentmicroservice);
      else resObj[element.correlatingid] = [element.currentmicroservice];
      // initializing the object with the first microservice
    };
  }

  //use object values to destructure locations
  const tracePoints = Object.values(resObj);
  let position = communicationsData[0].correlatingid ? 0 : tracePoints.length-1;
 
  // Declare Micro-server-count dictinary to capture the amount of times a particular server is hit
  const microServiceCountdictionary  = {};

  // iterate over Trace Points
  for (let i = 0; i < tracePoints[position].length; i+=1) {
    
    // populate Micro-count dictionary
    if (!microServiceCountdictionary[tracePoints[position][i]]) {
      microServiceCountdictionary[tracePoints[position][i]] = 1;
    } else {
      microServiceCountdictionary[tracePoints[position][i]]+=1
    }
  };

  // capture values of microServiceCountdictionary to use as data to populate chart object
  const serverPingCount = Object.values(microServiceCountdictionary);

  
  // Create chart object data to feed into bar component 
  const myChart = {
    //spread dictionary keys inorder to properly label chart x axis 
    labels: [...Object.keys(microServiceCountdictionary)],
    datasets: [
        {
          label: 'Times server Pinged',
          backgroundColor: 'rgba(241, 207, 70,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 1,
          data: [...serverPingCount, 0] // spread ping count array into data array to have chart populate the Y axis
        }
      ]
  }

  
  // return div with Bar component and Trace Points data
  return (
      <div>
          <h1>THIS IS FROM MS TRAFFIC</h1>
        <Bar 
        data={myChart}
        width={100}
        height={50}
        options={{
            title:{
              display:true,
              text:'Microservices Overview',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
  )
};

export default MicroServiceTraffic;

