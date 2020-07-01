// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const { Schema } = mongoose;

const healthSchema = new Schema(
  {
    cpuspeed: {
      type: Number,
      required: [true, 'cpuspeed required'],
    },
    cputemp: {
      type: Number,
      required: [true, 'cputemp required'],
    },
    activememory: {
      type: Number,
      required: [true, 'activememory required'],
    },
    freememory: {
      type: Number,
      required: [true, 'freememory required'],
    },
    totalmemory: {
      type: Number,
      required: [true, 'totalmemory required'],
    },
    usedmemory: {
      type: Number,
      required: [true, 'usedmemory required'],
    },
    latency: {
      type: Number,
      required: [true, 'latency required'],
    },
    blockedprocesses: {
      type: Number,
      required: [true, 'blockedprocesses required'],
    },
    sleepingprocesses: {
      type: Number,
      required: [true, 'sleepingprocesses required'],
    },
    runningprocesses: {
      type: Number,
      required: [true, 'runningprocesses required'],
    },
    totalprocesses: {
      type: Number,
      required: [true, 'totalprocesses required'],
    },
    cpuloadpercent: {
      type: Number,
      required: [true, 'cpuloadpercent required'],
    },
  },
  { timestamps: { createdAt: 'time', updatedAt: 'time' } }
);

const healthModel = (serviceName: any) => mongoose.model<any>(serviceName, healthSchema);
// export default serviceName
module.exports = (serviceName:any) => mongoose.model(serviceName, healthSchema);

export default healthModel;
