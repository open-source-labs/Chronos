import React, { useContext, useEffect } from 'react';
// import OverviewContext from '../context/OverviewContext';
import { CommsContext } from '../context/CommsContext';
// import { log } from 'console';
import Graph from 'react-graph-vis';

const RouteLocations = props => {
  const communicationsData = useContext(CommsContext).commsData;
  
  useEffect(() => {
    const parentNode = document.querySelector('div.chart');
    const childNode = document.querySelectorAll('canvas')[0];
    if (parentNode && childNode) {
      parentNode.append(childNode);
      childNode.id = `canvasGraph`
    }
    return childNode;
  })

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
          time: element.time
        });
      } else {
        // The value that corresp. to the correlationId key is an array of obj containing name and time data.
        // Each obj is a data point.
        resObj[element.correlatingid] = [
          {
            microservice: element.microservice,
            time: element.time
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
          time
        });
      } else {
        // The value that corresp. to the correlationId key is an array of obj containing name and time data.
        // Each obj is a data point.
        resObj[element.correlatingid] = [
          {
            microservice,
            time
          },
        ];
      }
      // initializing the object with the first microservice
    }
    console.log('B', resObj)
  }
  console.log('+++RESOBJ+++');
  console.log(resObj);

  // use Object.values to destructure locations
  // Each elem in tracePoints is an array of arrays, which contain objects (each of which is a data point).
  // Filter the array so that only subarrays w/ len > 1 are kept.
  // (len == 1 means there's only one point in the route. There's no meaningful data to be gained from those.)
  const tracePoints = Object.values(resObj).filter(subArray => subArray.length > 1);
  console.log('tracepoints =======>', tracePoints);

  const nodeListObj = {};
  const edgeList = [];
  for (let route of tracePoints) {
    for (let i = 0; i < route.length; i += 1) {
      // check if node exists if not then add node
      let id = route[i].microservice
      if (nodeListObj[id] === undefined) {
        nodeListObj[id] = { id: id, label: id, color: '#e04141' }
      }
      // add edge from node 1 to node 2 (repeat til end)
      if (i !== 0) {
        let duration = new Date(route[i].time) - new Date(route[i-1].time);
        let edge = { from: route[i - 1].microservice, to: id, label: `${duration} ms`}
        edgeList.push(edge)
      }
    }
  }
  const nodeList = Object.values(nodeListObj);
  console.log(edgeList);
  console.log(nodeList);

  const graph = {
    nodes: nodeList,
    edges: edgeList
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
      hierarchical: false
    },
    edges: {
      color: "#000000",
      physics: false,
      smooth: {
        type: "curvedCCW",
        forceDirection: "none"
      }
    },
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      console.log(edges);
    }
  };

  
  return (
    <div className="chart">
      <Graph id="visGraph" graph={graph} options={options} events={events} style={{ height: "640px" }} />
    </div>
  );
};

export default RouteLocations;
