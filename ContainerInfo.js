const mongoose = require("mongoose");

mongoose.model("containerInfo", {
// Added additional schema for Docker container stats (9).
  microserviceName: {
    type: String,
  },
  containerId: {
    type: String,
  },
  containerName: {
    type: String,
  },
  containerPlatform : {
    type: String,
  },
  containerStartTime: {
    type: Date,
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