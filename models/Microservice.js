const mongoose = require('mongoose');
const { Schema } = mongoose;

const MicroserviceScheme = new Schema({
  cpuspeed: {
    type: Number,
  },
  cputemp: {
    type: Number,
  },
  cpuloadpercent: {
    type: Number,
  },
  totalmemory: {
    type: Number,
  },
  freememory: {
    type: Number,
  },
  usedmemory: {
    type: Number,
  },
  activememory: {
    type: Number,
  },
  totalprocesses: {
    type: Number,
  },
  runningprocesses: {
    type: Number,
  },
  blockedprocesses: {
    type: Number,
  },
  sleepingprocesses: {
    type: Number,
  },
  latency: {
    type: Number,
  },
  time: {
    type: Date,
  },
});
module.exports = MicroSrvName => mongoose.model(MicroSrvName, MicroserviceScheme);
