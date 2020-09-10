import React, { useContext } from 'react';
// import OverviewContext from '../context/OverviewContext';
import { CommsContext } from '../context/CommsContext';
// import { log } from 'console';
import Graph from 'react-graph-vis';

const RouteLocations = props => {
  const communicationsData = useContext(CommsContext).commsData;
  console.log('commdata=======>', communicationsData);
  console.log('try again');

  // initialize an empty object resObj.
  // This object will store the microservice names as values and its corresponding correlatingid or correlatingid as keys.
  // The microservice names will be stored in array within the order it was to the database.
  const resObj = {};

  if (communicationsData.length > 0 && communicationsData[0]._id) {
    // Sort the communication array from OLDEST to NEWEST documents.
    communicationsData.sort((a, b) => {
      // Note that a newer date obj IS GREATER THAN an older date obj.
      if (new Date(a.time) > new Date(b.time)) return 1;
      if (new Date(a.time) < new Date(b.time)) return -1;
      return 0;
    });

    // Iterate over sorted array to build up resObj.
    for (let i = 0; i < communicationsData.length; i += 1) {
      // declare a constant element and initialize it as the object at index i of the communicationsData array
      const element = communicationsData[i];
      // Pushes the microservice name & timeSent into the resObj.
      // Data objects w/ same corrId will be grouped in a same array.
      if (resObj[element.correlatingid]) {
        resObj[element.correlatingid].push({
          microservice: element.microservice,
          time: element.time,
        });
      } else {
        // The value that corresp. to the correlationId key is an array of obj containing name and time data.
        // Each obj is a data point.
        resObj[element.correlatingid] = [
          {
            microservice: element.microservice,
            time: element.time,
          },
        ];
      }
    }
  } else {
    for (let i = communicationsData.length - 1; i >= 0; i--) {
      const element = communicationsData[i];
      if (resObj[element.correlatingid]) {
        resObj[element.correlatingid].push({
          microservice,
          time,
        });
      } else {
        // The value that corresp. to the correlationId key is an array of obj containing name and time data.
        // Each obj is a data point.
        resObj[element.correlatingid] = [
          {
            microservice,
            time,
          },
        ];
      }
      // initializing the object with the first microservice
    }
    console.log('B', resObj);
  }
  console.log('+++RESOBJ+++');
  console.log(resObj);

  // use Object.values to destructure locations
  // Each elem in tracePoints is an array of arrays, which contain objects (each of which is a data point).
  // Filter the array so that only subarrays w/ len > 1 are kept.
  // (len == 1 means there's only one point in the route. There's no meaningful data to be gained from those.)
  const tracePoints = Object.values(resObj).filter(subArray => subArray.length > 1);
  console.log('tracepoints =======>', tracePoints);

  // // Construct an obj that stores data necessary for calculating avg speed of requests btw 2 pts.
  // const avgDataObj = {};
  // /****** Build the object here w/ nested loops ************/
  // /****** WARNING: tracePoints arr can be very long (100+) ************/
  // for (let i = 0; i < tracePoints.length; i += 1) {
  //   let subArr = tracePoints[i];
  //   for (let j = 0; j < subArr.length; j += 1) {
  //     let currDataObj = subArr[j];
  //     if (j < subArr.length - 1) {
  //       let nextDataObj = subArr[j + 1];
  //       let routeName = `${currDataObj.microservice}-${nextDataObj.microservice}`;
  //       // Key/value pair that keeps COUNT of two-point routes
  //       if (!avgDataObj[`${routeName}Count`]) avgDataObj[`${routeName}Count`] = 1;
  //       else avgDataObj[`${routeName}Count`] += 1;

  //       // Key/value that accumulates TOTAL TIME a req travels btw 2 certain points
  //       let timeDiff = new Date(nextDataObj.time) - new Date(currDataObj.time);
  //       if (!avgDataObj[`${routeName}TotalTime`]) {
  //         avgDataObj[`${routeName}TotalTime`] = timeDiff;
  //       } else avgDataObj[`${routeName}TotalTime`] += timeDiff;

  //       // Key/value that calculates AVG TIME of travel (dividing the 2 values above)
  //       let avgTime = avgDataObj[`${routeName}TotalTime`] / avgDataObj[`${routeName}Count`];
  //       avgDataObj[`${routeName}AvgTime`] = avgTime;
  //     }
  //   }
  // }

  // Array of <divs> to be rendered. Each <div> contains route name and time difference.
  // const resArray = []

  // // const position = communicationsData[0].correlatingid ? 0 : tracePoints.length - 1;
  // const position = 0;

  // // iterate over ONE elem in tracePoints, creating a <div> for every data obj.
  // for (let i = 0; i < tracePoints[position].length; i += 1) {
  //   if (i !== tracePoints[position].length - 1) {
  //     // Calc time difference (when not at the end of array):
  //     // Convert time str to Date obj w/ new Date(), then get the time difference.
  //     const timeDiff =
  //       new Date(tracePoints[position][i + 1].timeSent) -
  //       new Date(tracePoints[position][i].timeSent);
  //     resArray.push(
  //       <div className="RouteCircle" key={i}>
  //         {/* Altering this <p> so it displays only microsvc_name */}
  //         <p id="routeText">
  //           Point {i + 1}: {tracePoints[position][i].microservice_name}
  //         </p>
  //         {/* Adding another <p> that displays time difference btw curr obj and next obj */}
  //         <p id="routeTimeDiff">
  //           {/* Time: {tracePoints[position][i].timeSent} */}
  //           Time elapsed: {timeDiff} ms
  //         </p>
  //       </div>
  //     );
  //   } else {
  //     // If at the end of array, don't push the timeDiff <p> to resArray (only push a <p> w/ name).
  //     resArray.push(
  //       <div className="RouteCircle" key={i}>
  //         <p id="routeText">
  //           Point {i + 1}: {tracePoints[position][i].microservice_name}
  //         </p>
  //       </div>
  //     );
  //   }
  // }
  // // console.log('resArray: ', resArray);

  /**** Making a list of avg speed-related data. ********/
  // const avgData = [];
  // Object.entries(avgDataObj).forEach((el, i) => {
  //   avgData.push(
  //     <span className="avgDataDetails" key={`${i}+${el[0]}`}>
  //       {el[0]}: {el[1]}
  //     </span>
  //   )
  // })
  // console.log('avgData (array):', avgData);

  // /**** Making CATEGORIZED lists of avg speed-related data. ********/
  // const avgTime = [],
  //   totalTime = [],
  //   count = [];
  // let i = 0; // For unique keys for each <span> //

  // for (const key in avgDataObj) {
  //   i += 1;

  //   if (key.endsWith('AvgTime')) {
  //     avgTime.push(
  //       <span className="avgDataDetails" key={i}>
  //         {key.slice(0, -7)}: {avgDataObj[key]} ms
  //       </span>
  //     );
  //   }
  //   if (key.endsWith('TotalTime')) {
  //     totalTime.push(
  //       <span className="avgDataDetails" key={i}>
  //         {key.slice(0, -9)}: {avgDataObj[key]} ms
  //       </span>
  //     );
  //   }
  //   if (key.endsWith('Count')) {
  //     count.push(
  //       <span className="avgDataDetails" key={i}>
  //         {key.slice(0, -5)}: {avgDataObj[key]}
  //       </span>
  //     );
  //   }
  // }
  // console.log('avgTime:', avgTime);
  // console.log('totalTime:', totalTime);
  // console.log('count:', count);
  /****************/
  const nodeListObj = {};
  const edgeList = [];
  for (let route of tracePoints) {
    for (let i = 0; i < route.length; i += 1) {
      // check if node exists if not then add node
      let id = route[i].microservice;
      if (nodeListObj[id] === undefined) {
        nodeListObj[id] = { id: id, label: id, color: '#e04141' };
      }
      // add edge from node 1 to node 2 (repeat til end)
      if (i !== 0) {
        let duration = new Date(route[i].time) - new Date(route[i - 1].time);
        let edge = { from: route[i - 1].microservice, to: id, label: `${duration} ms` };
        edgeList.push(edge);
      }
    }
  }
  const nodeList = Object.values(nodeListObj);
  console.log(edgeList);
  console.log(nodeList);

  const graph = {
    nodes: nodeList,
    edges: edgeList,
  };
  // const graph = {
  //   nodes: [
  //     { id: 'one', label: "Node 1", color: "#e04141" },
  //     { id: 2, label: "Node 2", color: "#e09c41" },
  //     { id: 3, label: "Node 3", color: "#e0df41" },
  //     { id: 4, label: "Node 4", color: "#7be041" },
  //     { id: 5, label: "Node 5", color: "#41e0c9" }
  //   ],
  //   edges: [{ from: 4, to: 2, label: 'hello' }, { from: 'one', to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }]
  // };
  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
      physics: false,
      smooth: {
        type: 'curvedCCW',
        forceDirection: 'none',
      },
    },
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log('Selected nodes:');
      console.log(nodes);
      console.log('Selected edges:');
      console.log(edges);
    },
  };

  return (
    // <div id="routeDataArea">
    //   {/* Data on the lastest route */}
    //   {resArray}

    //   {/* Rendering avg-speed related data */}
    //   <div id="avgData">
    //     {/* {avgData} */}
    //     {/* <span className="avgData-titles">Average time between points:</span>
    //     {avgTime}
    //     <span className="avgData-titles">Total time between points:</span>
    //     {totalTime}
    //     <span className="avgData-titles">Number of trips between points:</span>
    //     {count} */}
    //   </div>
    // </div>
    // <h1>ROUTE COPY</h1>
    // <div className="chart">
    <Graph graph={graph} options={options} events={events} style={{ height: '640px' }} />
    // </div>
  );
};

export default RouteLocations;
