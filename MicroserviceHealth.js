const mongoose = require("mongoose");

mongoose.model("MicroserviceHealth", {
  currentMicroservice: {
    type: String,
    required: true
  },
  cpuCurrentSpeed: {
    type: Number,
    required: true
  },
  cpuTemperature: {
    type: Number,
    required: true
  },
  totalMemory: {
    type: Number,
    required: true
  },
  freeMemory: {
    type: Number,
    required: true
  },
  usedMemory: {
    type: Number,
    required: true
  },
  activeMemory: {
    type: Number,
    required: true
  },
  totalNumProcesses: {
    type: Number,
    required: true
  },
  numRunningProcesses: {
    type: Number,
    required: true
  },
  numBlockedProcesses: {
    type: Number,
    required: true
  },
  numSleepingProcesses: {
    type: Number,
    required: true
  },
  latency: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});
