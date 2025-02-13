"use strict";
// // importing systeminformation
// import * as si from 'systeminformation';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
const si = __importStar(require("systeminformation"));
/**
 * Finds the data point with containerName that matches microservice and extracts container ID, name, platform, and start time.
 * @param microservice - The name of the microservice.
 * @returns A Promise resolving to a DockerContainer object.
 */
async function getDockerContainer(microservice) {
    try {
        const containers = await si.dockerContainers();
        const out = {};
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
        }
        else {
            throw new Error(`Unable to find Docker container with name dockerHelper.js LN 28 ${microservice}`);
        }
    }
    catch (e) {
        console.error(e);
        throw e;
    }
}
/**
 * Reads additional stats for a Docker container.
 * @param input - A DockerContainer object.
 * @returns A Promise resolving to a DockerContainerStats object.
 */
async function readDockerContainer(input) {
    const out = { ...input };
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
    }
    catch (e) {
        console.error(`Unable to query container id ${input.containerid}`);
        throw new Error('Unable to identify active Docker containers');
    }
}
exports.default = { getDockerContainer, readDockerContainer };
//# sourceMappingURL=dockerHelper.js.map