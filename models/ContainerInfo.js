const mongoose = require('mongoose');

mongoose.model('ContainerInfo', {
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
