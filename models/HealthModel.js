const mongoose = require('mongoose');

const { Schema } = mongoose;

const HealthSchema = new Schema({
  cpuspeed: {
    type: Number,
    default: 0,
  },
  cputemp: {
    type: Number,
    default: 0,
  },
  cpuloadpercent: {
    type: Number,
    default: 0,
  },
  totalmemory: {
    type: Number,
    default: 0,
  },
  freememory: {
    type: Number,
    default: 0,
  },
  usedmemory: {
    type: Number,
    default: 0,
  },
  activememory: {
    type: Number,
    default: 0,
  },
  totalprocesses: {
    type: Number,
    default: 0,
  },
  runningprocesses: {
    type: Number,
    default: 0,
  },
  blockedprocesses: {
    type: Number,
    default: 0,
  },
  sleepingprocesses: {
    type: Number,
    default: 0,
  },
  latency: {
    type: Number,
    default: 0,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});
module.exports = MicroSrvName => mongoose.model(MicroSrvName, HealthSchema);
