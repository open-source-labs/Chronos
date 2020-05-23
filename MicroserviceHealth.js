const mongoose = require("mongoose");

mongoose.model("MicroserviceHealth", {
  currentMicroservice: {
    type: String,
  },
  cpuCurrentSpeed: {
    type: Number,
  },
  cpuTemperature: {
    type: Number,
  },
  cpuCurrentLoadMemoryPercentage: {
    type: Number,
  },
  totalMemory: {
    type: Number,
  },
  freeMemory: {
    type: Number,
  },
  usedMemory: {
    type: Number,
  },
  activeMemory: {
    type: Number,
  },
  totalNumProcesses: {
    type: Number,
  },
  numRunningProcesses: {
    type: Number,
  },
  numBlockedProcesses: {
    type: Number,
  },
  numSleepingProcesses: {
    type: Number,
  },
  latency: {
    type: Number,
  },
  timestamp: {
    type: Date,
  },
  // Alan: Aded schema for Docker container stats (9).
  containerId: {
    type: String,
  },
  containerMemUsage: {
    type: Number, // bytes
  },
  containerMemLimit: {
    type: Number,
  },
  containerMemPercent: {
    type: Number,
  },
  containerCpuPercent: {
    type: Number,
  },
  networkReceived: {
    type: Number, // bytes
    default: 0,
  },
  networkSent: {
    type: Number, // bytes
    default: 0,
  },
  containerProcessCount: {
    type: Number, // count
  },
  containerRestartCount: {
    type: Number, // count
  },
});
