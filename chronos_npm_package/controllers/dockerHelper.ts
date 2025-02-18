import * as si from 'systeminformation';
import { createGrafanaPanelObject } from '../controllers/GrafanaPanel.js';

/**
 Interface for a Basic Docker Container

 */
interface DockerContainer {
  containername: string; //  Name of the container 
  containerid: string;   // Unique identifier 
  platform: string;      // Operating system running inside the container 
  starttime: string;     // Timestamp when the container started
}

/*
 Interface for Extended Docker Container Stats
  - Extends DockerContainer to add real-time performance metrics.
  - DockerContainerStats includes all properties of DockerContainer plus more.
 */
interface DockerContainerStats extends DockerContainer {
  memoryusage?: number;      //  RAM used by the container 
  memorylimit?: number;      //  Max allowed RAM for the container
  memorypercent?: number;    // Percentage of memory used
  cpupercent?: number;       // CPU usage as a percentage
  networkreceived?: number;  // Bytes received over the network
  networksent?: number;      //  Bytes sent over the network
  processcount?: number;     //  Number of active processes inside the container
  restartcount?: number;     //  Number of times the container has restarted
  time?: number;             //  Timestamp of when the data was collected
}

/*
Finds and Returns Basic Docker Container Information
 
  - Uses `systeminformation.dockerContainers()` to get a list of all running containers.
  - It **searches for a container matching microservice and extracts its core info.
  - If no matching container is found, it throws an error**.
  
  @param microservice - The **name of the microservice (container) to find.
  @returns A **Promise** resolving to a `DockerContainer` object.
 */
async function getDockerContainer(microservice: string): Promise<DockerContainer> {
  try {
    // Fetch all running Docker containers
    const containers = await si.dockerContainers();
    const out = {} as DockerContainer; //  Creating an empty object following the interface structure
    let found = false;

    //  Search for the container with the microservice name
    for (const container of containers) {
      if (container.name === microservice) {
        found = true;
        out.containername = microservice;
        out.containerid = container.id;
        out.platform = container.platform;
        out.starttime = container.startedAt;
        break; // Exit loop after finding the correct container
      }
    }

    if (found) {
      return out; // Return container info
    } else {
      throw new Error(`❌ Unable to find Docker container with name: ${microservice}`);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/*
 Fetches Real-Time Stats for a Docker Container
 
 - Uses `systeminformation.dockerContainerStats()` to get live data.
  - Extends the `DockerContainer` object  by adding CPU, Memory, and Network stats.
 * 
 * @param input - A `DockerContainer` object (must include `containerid`).
 * @returns A **Promise** resolving to an **extended `DockerContainerStats` object**.
 */
async function readDockerContainer(input: DockerContainer): Promise<DockerContainerStats> {
  // Create a new object based on the original container details
  const out = { ...input } as DockerContainerStats;

  try {
    // Fetch real-time stats for the given container ID
    const data = await si.dockerContainerStats(input.containerid);

    // Extract and map system data to our TypeScript interface
    out.memoryusage = data[0].memUsage;       // RAM used
    out.memorylimit = data[0].memLimit;       // Max RAM allowed
    out.memorypercent = data[0].memPercent;   // Memory usage percentage
    out.cpupercent = data[0].cpuPercent;      // CPU usage percentage
    out.networkreceived = data[0].netIO.rx;   // Bytes received
    out.networksent = data[0].netIO.wx;       // Bytes sent
    out.processcount = data[0].pids;          // Number of processes
    out.restartcount = data[0].restartCount;  // Number of restarts
    out.time = Date.now();                    // Timestamp of data retrieval

    return out; // Return the updated object
  } catch (e) {
    console.error(`❌ Unable to query container ID: ${input.containerid}`);
    throw new Error('Unable to identify active Docker containers');
  }
}


export default { getDockerContainer, readDockerContainer };
