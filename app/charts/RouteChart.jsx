/** From Version 5.2 Team:
 * This file does not seem to be showing any data.
 * Hope a future team figures it out.
 * Best of luck!
 */

import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import Graph from 'react-graph-vis';
import { CommsContext } from '../context/CommsContext';

const RouteChart = React.memo(() => {
  const communicationsData = useContext(CommsContext).commsData;

  const resObj = {};
  const dataId = '_id';

  if (communicationsData.length > 0 && communicationsData[0][dataId]) {
    /** From Version 5.2 Team:
     * @communicationsData comes back as an array with data in descending order.
     * The below sorts it back into ascending order.
     */

    communicationsData.sort((a, b) => {
      if (new Date(a.time) > new Date(b.time)) return 1;
      if (new Date(a.time) < new Date(b.time)) return -1;
      return 0;
    });

    for (let i = 0; i < communicationsData.length; i += 1) {
      const element = communicationsData[i];
      if (!resObj[element.correlatingid]) resObj[element.correlatingid] = [];
      resObj[element.correlatingid].push({
        microservice: element.microservice,
        time: element.time,
        request: element.request,
      });
    }
  } else {
    for (let i = communicationsData.length - 1; i >= 0; i--) {
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
  }

  const tracePoints = Object.values(resObj).filter(subArray => subArray.length > 1);

  const useStyles = makeStyles(theme => ({
    paper: {
      height: 300,
      width: 300,
      textAlign: 'center',
      color: '#444d56',
      whiteSpace: 'nowrap',
      backgroundColor: '#ffffff',
      borderRadius: 3,
      border: '0',
      boxShadow: '2px 2px 6px #bbbbbb',
    },
  }));
  const classes = useStyles({});

  /**
   * Graph Logic Below
   */

  const nodeListObj = {};
  const edgeListObj = {};
  for (const route of tracePoints) {
    for (let i = 0; i < route.length; i += 1) {
      const id = route[i].microservice;
      if (nodeListObj[id] === undefined) {
        nodeListObj[id] = {
          id,
          label: id,
        };
      }

      if (i !== 0) {
        const from = route[i - 1].microservice;
        const to = id;
        const { request } = route[i - 1];
        const edgeStr = JSON.stringify({ from, to, request });
        let duration = new Date(route[i].time) - new Date(route[i - 1].time);

        if (edgeListObj[edgeStr]) {
          duration = (duration + edgeListObj[edgeStr]) / 2;
        }
        edgeListObj[edgeStr] = duration;
      }
    }
  }

  const nodeList = Object.values(nodeListObj);
  const edgeList = [];
  for (const [edgeStr, duration] of Object.entries(edgeListObj)) {
    const edge = JSON.parse(edgeStr);
    edge.label = edge.request
      ? `${edge.request} - ${(duration * 10).toFixed(0)} ms`
      : `${(duration * 10).toFixed(0)} ms`;
    edgeList.push(edge);
  }

  const graph = {
    nodes: nodeList,
    edges: edgeList,
  };
  const options = {
    height: '600px',
    width: '600px',
    layout: {
      hierarchical: false,
    },
    edges: {
      color: '#444d56',
      physics: true,
      smooth: {
        type: 'curvedCCW',
        forceDirection: 'none',
        roundness: 0.3,
      },
      font: {
        color: '#444d56',
        size: 9,
      },
    },
    nodes: {
      borderWidth: 0,
      color: {
        background: '#3788fc',
        hover: {
          background: '#febc2c',
        },
        highlight: {
          background: '#fc4039',
        },
      },
      shape: 'circle',
      font: {
        color: '#ffffff',
        size: 10,
        face: 'roboto',
      },
    },
  };

  // const events = {
  //   select(event) {
  //     const { nodes, edges } = event;
  //   },
  // };

  if (communicationsData.length) {
    return (
      <div className="traceContainer">
        <span id="tracesTitle">Route Traces</span>
        <Graph
          className={classes.paper}
          graph={graph}
          options={options}
          // events={events}
          style={{
            fontFamily: 'Roboto',
            boxShadow: '3px 3px 6px 1px rgb(175, 175, 175)',
            backgroundColor: 'white',
            borderRadius: '3px',
          }}
        />
      </div>
    );
  }
  return null;
});

export default RouteChart;
