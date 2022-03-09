const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContainerSchema = new Schema({
  // Added additional schema for Docker container stats (9).
  containerid: {
    type: String,
  },
  containername: {
    type: String,
  },
  platform: {
    type: String,
  },
  starttime: {
    type: Date,
  },
  memoryusage: {
    type: Number, // bytes
  },
  memorylimit: {
    type: Number,
  },
  memorypercent: {
    type: Number,
  },
  cpupercent: {
    type: Number,
  },
  networkreceived: {
    type: Number, // bytes
    default: 0,
  },
  networksent: {
    type: Number, // bytes
    default: 0,
  },
  processcount: {
    type: Number, // count
  },
  restartcount: {
    type: Number, // count
  },
});

module.exports = ContainerName => mongoose.model(ContainerName, ContainerSchema);
