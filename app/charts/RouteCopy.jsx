import {
  IconButton,
  Modal,
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
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

  const useStyles = makeStyles(theme => ({
    paper: {
      height: 280,
      width: 280,
      textAlign: 'center',
      color: '#888888',
      whiteSpace: 'nowrap',
      backgroundColor: '#ffffff',
      borderRadius: 8,
      border: '0',
      boxShadow: '0 6px 6px 0 rgba(153, 153, 153, 0.14), 0 6px 6px -2px rgba(153, 153, 153, 0.2), 0 6px 8px 0 rgba(153, 153, 153, 0.12)',
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: `#ccd8e1`,
        color: '#ffffff',
      },
    },
    hover: {
      boxShadow: 'none',
      color: 'transparent'
    },
    btnStyle: {
      position: 'absolute',
      top: -10,
      left: -10,
      margin: '0',
      color: '#eeeeee',
      borderRadius: '0',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'none'
      }
    },
    icon: {
      width: '75px',
      height: '75px',
      boxShadow: 'none',
    },
  }));
  const classes = useStyles({});



  // ======Graphs logic =======//
  const nodeListObj = {};
  const edgeList = [];
  for (let route of tracePoints) {
    for (let i = 0; i < route.length; i += 1) {
      const colors = ['#75b6d7', '#cc000', '#fce356', '#888888', '#ccd8e1']
      // check if node exists if not then add node
      let id = route[i].microservice
      if (nodeListObj[id] === undefined) {
        nodeListObj[id] = { id: id, label: id, color: { background: '#24d2f1', border: 'white', hover: { background: '#4d55ec', border: 'white' } }, shape: 'circle' }
      }
      // add edge from node 1 to node 2 (repeat til end)
      if (i !== 0) {
        let duration = new Date(route[i].time) - new Date(route[i - 1].time);
        let edge = { from: route[i - 1].microservice, to: id, label: `${duration * 100} ms` }
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

    height: '400px',
    width: '400px',
    style: 'surface',
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000",
      physics: true,
      smooth: {
        type: "curvedCCW",
        forceDirection: "none",
        roundness: 0.3
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
    <div className='traceContainer'>
      <span id='trace'>Traces</span>
      <Graph className={classes.paper} graph={graph} options={options} events={events} style={{ fontSize: '8px', color: '#555555', fontFamily: 'Open Sans', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', backgroundColor: 'white' }} />
    </div>
  );
};

export default RouteLocations;
