// import React, { useState, useEffect, useContext } from 'react';

// import { HealthContext } from '../context/HealthContext';
// import { CommsContext } from '../context/CommsContext';
// import { DockerContext } from '../context/DockerContext';
// import { ApplicationContext } from '../context/ApplicationContext';
// import RequestTypesChart from '../charts/RequestTypesChart';
// import ResponseCodesChart from '../charts/ResponseCodesChart';
// import MicroServiceTraffic from '../charts/TrafficChart';
// import SpeedChart from '../charts/SpeedChart';
// import ProcessesChart from '../charts/ProcessesChart';
// import TemperatureChart from '../charts/TemperatureChart';
// import LatencyChart from '../charts/LatencyChart';
// import MemoryChart from '../charts/MemoryChart';
// import DockerChart from '../charts/DockerChart';

// interface IParams {
//   service: string;
// }

// interface IMatch {
//   match: {
//     path: string;
//     url: string;
//     isExact: boolean;
//     params: IParams;
//   };
// }

// /**
//  * Includes information on route tracing of HTTP Requests displayed in
//  * the RouteTrace and RouteChart components
//  */
// const GraphsContainer = ({ match }: IMatch) => {
//   const [live, setLive] = useState<boolean>(false);
//   const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

//   // Get current service name from params
//   const { service } = match.params;

//   const { fetchHealthData, setHealthData } = useContext(HealthContext);
//   const { fetchCommsData, setCommsData } = useContext(CommsContext);
//   const { fetchDockerData, setDockerData } = useContext(DockerContext);
//   const { app } = useContext(ApplicationContext);

//   // On Mount: fetch communication data and health data
//   useEffect(() => {
//     if (live) {
//       setIntervalID(
//         setInterval(() => {
//           fetchCommsData();
//           fetchHealthData(service);
//           fetchDockerData(service);
//         }, 3000)
//       );
//     } else {
//       if (intervalID) clearInterval(intervalID);
//       fetchCommsData();
//       fetchHealthData(service);
//       fetchDockerData(service);
//     }

//     // On unmount: clear data
//     return () => {
//       if (intervalID) clearInterval(intervalID);
//       setHealthData({});
//       setCommsData([]);
//       setDockerData({});
//     };
//   }, [service, live]);

//   return (
//     <>
//       <div>
//         <h3>Application: {app}</h3>
//         <h3>Microservice: {service}</h3>
//         <button onClick={() => setLive(!live)}>
//           {live ? (
//             <div>
//               <span className="dot" />
//               Live
//             </div>
//           ) : (
//             <div>Gather Live Data</div>
//           )}
//         </button>
//       </div>
//       <div>
//         <SpeedChart />
//         <TemperatureChart />
//         <RequestTypesChart />
//         <ResponseCodesChart />
//         <ProcessesChart />
//         <LatencyChart />
//         <MicroServiceTraffic />
//         <MemoryChart />
//         <DockerChart />
//       </div>
//     </>
//   );
// };

// export default GraphsContainer;
