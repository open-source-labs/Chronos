import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { CommsContext } from '../context/CommsContext';
import Graph from 'react-graph-vis';


// const communicationsData = [
  // {
  //   "_id": "60024826d6c7ffee730d38be",
  //   "microservice": "reverse-proxy",
  //   "endpoint": "/",
  //   "request": "GET",
  //   "functionname": null,
  //   "correlatingid": "c70a3865-f582-4d79-86d7-d7a2b5efab02",
  //   "responsestatus": 304,
  //   "responsemessage": "Not Modified",
  //   "time": "2021-01-16T01:57:58.925Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "60024826d6c7ffee730d38bf",
  //   "microservice": "reverse-proxy",
  //   "endpoint": "/index.js",
  //   "request": "GET",
  //   "functionname": null,
  //   "correlatingid": "fa79ec49-0d0c-4311-abf7-323e9d359502",
  //   "responsestatus": 304,
  //   "responsemessage": "Not Modified",
  //   "time": "2021-01-16T01:57:58.948Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "60024848404367ee70545be1",
  //   "microservice": "books",
  //   "endpoint": "/books/createbook",
  //   "request": "POST",
  //   "functionname": null,
  //   "correlatingid": "3ef918b7-c9df-473e-8dad-c1b4fc3f10c6",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-16T01:58:32.404Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "60024848d6c7ffee730d38d1",
  //   "microservice": "reverse-proxy",
  //   "endpoint": "/books/createbook",
  //   "request": "POST",
  //   "functionname": null,
  //   "correlatingid": "3ef918b7-c9df-473e-8dad-c1b4fc3f10c6",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-16T01:58:32.405Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "6005dfd480cd7f7d2e003983",
  //   "microservice": "reverse-proxy",
  //   "endpoint": "/",
  //   "request": "GET",
  //   "functionname": null,
  //   "correlatingid": "45b86d4e-d8b9-4bef-8eab-2112adce6a4f",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-18T19:21:56.035Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "6005dfd480cd7f7d2e003984",
  //   "microservice": "reverse-proxy",
  //   "endpoint": "/index.js",
  //   "request": "GET",
  //   "functionname": null,
  //   "correlatingid": "1b822a84-5ede-4d37-9595-545b9329c7c1",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-18T19:21:56.082Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "6005e0174fb7ac7d2fc76208",
  //   "microservice": "customers",
  //   "endpoint": "/customers/createcustomer",
  //   "request": "POST",
  //   "functionname": null,
  //   "correlatingid": "374e4f4d-2bd2-4b20-a5e7-1d9e42c4e417",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-18T19:23:03.933Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "6005e01780cd7f7d2e0039a7",
  //   "microservice": "reverse-proxy",
  //   "endpoint": "/customers/createcustomer",
  //   "request": "POST",
  //   "functionname": null,
  //   "correlatingid": "374e4f4d-2bd2-4b20-a5e7-1d9e42c4e417",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-18T19:23:03.934Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "6005e04180cd7f7d2e0039bd",
  //   "microservice": "reverse-proxy",
  //   "endpoint": "/orders/createorder",
  //   "request": "POST",
  //   "functionname": null,
  //   "correlatingid": "06ff2f4e-ad57-49a8-baee-9eedea843a9b",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-18T19:23:45.816Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "6005e041cbe0867d3036a149",
  //   "microservice": "orders",
  //   "endpoint": "/orders/createorder",
  //   "request": "POST",
  //   "functionname": null,
  //   "correlatingid": "06ff2f4e-ad57-49a8-baee-9eedea843a9b",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-18T19:23:45.816Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "6005e05dcbe0867d3036a157",
  //   "microservice": "orders",
  //   "endpoint": "/orders/getorders",
  //   "request": "GET",
  //   "functionname": null,
  //   "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31bd",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-18T19:24:13.297Z",
  //   "__v": 0
  // },
  // {
  //   "_id": "6005e05d80cd7f7d2e0039cb",
  //   "microservice": "reverse-proxy",
  //   "endpoint": "/books/getordersinfo",
  //   "request": "GET",
  //   "functionname": null,
  //   "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31bd",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-18T19:24:13.303Z",
  //   "__v": 0
  // },
  // REST communication data
  // {
  //   "_id": "6005e05d1aaf4f7d2d4b4fb2",
  //   "microservice": "books",
  //   "endpoint": "/books/getordersinfo",
  //   "request": "GET",
  //   "functionname": null,
  //   "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31bd",
  //   "responsestatus": 200,
  //   "responsemessage": "OK",
  //   "time": "2021-01-18T19:24:13.303Z",
  //   "__v": 0
  // },
  // gRPC communication data
//   {
//     "_id": "6005e05d1aaf4f7d2d4b4fb3",
//     "microservice": "books",
//     "endpoint": null,
//     "request": null,
//     "functionname": "getBookInfo",
//     "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31be",
//     "responsestatus": 0,
//     "responsemessage": "OK",
//     "time": "2021-01-18T19:24:13.100Z",
//     "__v": 0
//   },
//   {
//     "_id": "6005e05d1aaf4f7d2d4b4fb4",
//     "microservice": "orders",
//     "endpoint": null,
//     "request": null,
//     "functionname": "getOrders",
//     "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31be",
//     "responsestatus": 0,
//     "responsemessage": "OK",
//     "time": "2021-01-18T19:24:13.200Z",
//     "__v": 0
//   },
//   {
//     "_id": "6005e05d1aaf4f7d2d4b4fb3",
//     "microservice": "books",
//     "endpoint": null,
//     "request": null,
//     "functionname": "getBookInfo",
//     "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31be",
//     "responsestatus": 0,
//     "responsemessage": "OK",
//     "time": "2021-01-18T19:24:13.100Z",
//     "__v": 0
//   },
//   {
//     "_id": "6005e05d1aaf4f7d2d4b4fb4",
//     "microservice": "orders",
//     "endpoint": null,
//     "request": null,
//     "functionname": "getOrders",
//     "correlatingid": "7c711d71-e6a3-4714-a027-a8716c2f31be",
//     "responsestatus": 0,
//     "responsemessage": "OK",
//     "time": "2021-01-18T19:24:13.200Z",
//     "__v": 0
//   }
// ]

const RouteChart = React.memo(() => {
  const communicationsData = useContext(CommsContext).commsData;
  console.log(communicationsData);
  // gather all communicationsData and sort them using matching correlatingid.
  // resObj { key = correlatingid : value = array of objects{ microservice , time} }
  // resObj { key = correlatingid : value = array of objects{ microservice , time, functionName} }
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
      if (!resObj[element.correlatingid]) resObj[element.correlatingid] = [];
      resObj[element.correlatingid].push({
        microservice: element.microservice,
        time: element.time,
        request: element.request, //here
      });
    }
    //? What does this else block do?
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
      color: '#444d56',
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
          label: id
        }
      }
      // add edge from node to node (repeat til end)
      if (i !== 0) {
        let from = route[i - 1].microservice;
        let to = id;
        let request = route[i - 1].request; //here
        let edgeStr = JSON.stringify({ from, to, request })
        let duration = new Date(route[i].time) - new Date(route[i - 1].time);
        // only want one edge per route with the average duration
        if (edgeListObj[edgeStr]) {
          //? wrong math
          duration = (duration + edgeListObj[edgeStr]) / 2
        }
        edgeListObj[edgeStr] = duration
      }
    }
  }

  // turn objects into valid arrays to input into graph
  const nodeList = Object.values(nodeListObj);
  const edgeList = []
  for (let [edgeStr, duration] of Object.entries(edgeListObj)) {
    const edge = JSON.parse(edgeStr);
    console.log(edge.request)
    edge.label = edge.request ? `${edge.request} - ${(duration * 10).toFixed(0)} ms` : `${(duration * 10).toFixed(0)} ms` 
    edgeList.push(edge)
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
      color: "#444d56",
      physics: true,
      smooth: {
        type: "curvedCCW",
        forceDirection: "none",
        roundness: 0.3
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
        }
      },
      shape: 'circle',
      font: {
        color: '#ffffff',
        size: 10,
        face: 'roboto'
      },
    }
  }

  const events = {
    select: function (event) {
      let { nodes, edges } = event;
    },
  };

  return (
    <div className='traceContainer'>
      <span id='tracesTitle'>Route Traces</span>
      <Graph className={classes.paper} graph={graph} options={options} events={events} style={{ fontFamily: 'Roboto', boxShadow: '3px 3px 6px 1px rgb(175, 175, 175)', backgroundColor: 'white', borderRadius: '3px' }} />
    </div>
  );
});

export default RouteChart;
