// // importing systeminformation
// import * as si from 'systeminformation';

// /**
//  * Finds the data pt with containerName that matches microservice and extracts container ID, name, platform, and start time.
//  * @param {*} microservice
//  * @returns array of active containers (ea. container = an obj).
//  */
// async function getDockerContainer(microservice) {
//   try {

//       const containers = await si.dockerContainers();
//       const out = {};
//       let found = false;
//       for (let container of containers) {
//           if (container.name === microservice) {
//             found = true;
//             out.containername = microservice;
//             out.containerid = container.id;
//             out.platform = container.platform;
//             out.starttime = container.startedAt;
//             break;
//             }
//         }

//         if (found) {
//             return out
//         } else {
//             throw new Error(`Unable to find Docker container with name dockerHelper.js LN 28${microservice}`)
//         }

//     } catch (e) {
//         console.error(e);
//         return e;
//     }

// }


// async function readDockerContainer(input) {
//     const out = {...input};
//     try {
//       const data = await si.dockerContainerStats(input.containerid);
//       out.memoryusage = data[0].memUsage;
//       out.memorylimit = data[0].memLimit;
//       out.memorypercent = data[0].memPercent;
//       out.cpupercent = data[0].cpuPercent;
//       out.networkreceived = data[0].netIO.rx;
//       out.networksent = data[0].netIO.wx;
//       out.processcount = data[0].pids;
//       out.restartcount = data[0].restartCount;
//       out.time = Date.now();
//       return out;

//     } catch (e) {
//         console.error(`Unable to query container id ${input.containerid}`);
//         return new Error('Unable to identify active Docker containers');
//     }
// }

// export default { getDockerContainer, readDockerContainer};

// importing systeminformation
import * as si from 'systeminformation';
// Remove the file extension in your import:
import { createGrafanaPanelObject } from '../controllers/GrafanaPanel';

// Define your interfaces
interface DockerContainer {
  containername: string;
  containerid: string;
  platform: string;
  starttime: string;
}

interface DockerContainerStats extends DockerContainer {
  memoryusage?: number;
  memorylimit?: number;
  memorypercent?: number;
  cpupercent?: number;
  networkreceived?: number;
  networksent?: number;
  processcount?: number;
  restartcount?: number;
  time?: number;
}

/**
 * Finds the data point with containerName that matches microservice and extracts container ID, name, platform, and start time.
 * @param microservice - The name of the microservice.
 * @returns A Promise resolving to a DockerContainer object.
 */
async function getDockerContainer(microservice: string): Promise<DockerContainer> {
  try {
    const containers = await si.dockerContainers();
    const out = {} as DockerContainer;
    let found = false;
    for (let container of containers) {
      if (container.name === microservice) {
        found = true;
        out.containername = microservice;
        out.containerid = container.id;
        out.platform = container.platform;
        out.starttime = container.startedAt;
        break;
      }
    }

    if (found) {
      return out;
    } else {
      throw new Error(`Unable to find Docker container with name dockerHelper.js LN 28 ${microservice}`);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * Reads additional stats for a Docker container.
 * @param input - A DockerContainer object.
 * @returns A Promise resolving to a DockerContainerStats object.
 */
async function readDockerContainer(input: DockerContainer): Promise<DockerContainerStats> {
  const out = { ...input } as DockerContainerStats;
  try {
    const data = await si.dockerContainerStats(input.containerid);
    out.memoryusage = data[0].memUsage;
    out.memorylimit = data[0].memLimit;
    out.memorypercent = data[0].memPercent;
    out.cpupercent = data[0].cpuPercent;
    out.networkreceived = data[0].netIO.rx;
    out.networksent = data[0].netIO.wx;
    out.processcount = data[0].pids;
    out.restartcount = data[0].restartCount;
    out.time = Date.now();
    return out;
  } catch (e) {
    console.error(`Unable to query container id ${input.containerid}`);
    throw new Error('Unable to identify active Docker containers');
  }
}

export default { getDockerContainer, readDockerContainer };
