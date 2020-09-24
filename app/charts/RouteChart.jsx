import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { CommsContext } from '../context/CommsContext';
import Graph from 'react-graph-vis';

const RouteChart = React.memo(() => {
  const communicationsData = useContext(CommsContext).commsData;

  // gather all communicationsData and sort them using matching correlatingid.
  // resObj { key = correlatingid : value = array of objects{ microservice , time} }
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
      const element = communicationsData[i];
      if (resObj[element.correlatingid]) {
        resObj[element.correlatingid].push({
          microservice: element.microservice,
          time: element.time,
        });
      } else {
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
        resObj[element.correlatingid] = [
          {
            microservice,
            time,
          },
        ];
      }
    }
  }


  // Filter the array so that only subarrays w/ len > 1 are kept.
  // (len == 1 means there's only one point in the route. There's no meaningful data to be gained from those.)
  const tracePoints = Object.values(resObj).filter(subArray => subArray.length > 1);

  const useStyles = makeStyles(theme => ({
    paper: {
      height: 300,
      width: 300,
      textAlign: 'center',
      color: '#888888',
      whiteSpace: 'nowrap',
      backgroundColor: '#ffffff',
      borderRadius: 3,
      border: '0',
      boxShadow: '2px 2px 6px #bbbbbb',
    },
  }));
  const classes = useStyles({});

  // ======Graphs logic =======//
  const nodeListObj = {};
  const edgeListObj = {};
  for (let route of tracePoints) {
    for (let i = 0; i < route.length; i += 1) {
      // check if node exists if not then add node
      let id = route[i].microservice;
      if (nodeListObj[id] === undefined) {
        nodeListObj[id] = {
          id: id,
          label: id,
          color: {
            background: '#24d2f1',
            border: 'white',
            hover: { background: '#4d55ec', border: 'white' },
          },
          shape: 'circle',
        };
      }
      // add edge from node to node (repeat til end)
      if (i !== 0) {
        let from = route[i - 1].microservice
        let to = id;
        let edgeStr = JSON.stringify({ from, to })
        let duration = new Date(route[i].time) - new Date(route[i - 1].time);
        // only want one edge per route with the average duration
        if (edgeListObj[edgeStr]) {
          duration = (duration + edgeListObj[edgeStr]) / 2
        }
        edgeListObj[edgeStr] = duration
      }
    }
  }

  // turn objects into valid arrays to input into graph
  const nodeList = Object.values(nodeListObj);
  const edgeList = []
  for (let [e, duration] of Object.entries(edgeListObj)) {
    const edge = JSON.parse(e)
    edge.label = `${(duration * 10).toFixed(0)} ms`
    edgeList.push(edge)
  }

  const graph = {
    nodes: nodeList,
    edges: edgeList,
  };
  const options = {
    height: '300px',
    width: '300px',
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#000000',
      physics: true,
      smooth: {
        type: 'curvedCCW',
        forceDirection: 'none',
        roundness: 0.3,
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
    <div className="traceContainer">
      <span id="tracesTitle">Route Traces</span>
      <Graph
        className={classes.paper}
        graph={graph}
        options={options}
        events={events}
        style={{
          fontSize: '2px',
          color: '#555555',
          fontFamily: 'Open Sans',
          boxShadow: '3px 3px 6px 1px rgb(175, 175, 175)',
          backgroundColor: 'white',
          borderRadius: '3px',
        }}
      />
    </div>
  );
});

export default RouteChart;
