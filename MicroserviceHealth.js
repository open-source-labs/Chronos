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
  }
});
