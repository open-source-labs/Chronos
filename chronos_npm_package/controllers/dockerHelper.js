const si = require('systeminformation');

async function getDockerContainer(microservice) {
  try {
      // dockerContainers() return an arr of active containers (ea. container = an obj).
      // Find the data pt with containerName that matches microservice.
      // Extract container ID, name, platform, and start time.
      const containers = await si.dockerContainers();
      const out = {};;
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
            return out
        } else {
            throw new Error(`Unable to find Docker container with name ${microservice}`)
        }

    } catch (e) {
        console.error(e);
        return e;
    }  

}


async function readDockerContainer(input) {
    // We are going to take the input object and add more data to it;
    const out = {...input};
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
        return new Error('Unable to identify active Docker containers');
    }
}

module.exports = { getDockerContainer, readDockerContainer};