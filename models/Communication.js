const mongoose = require('mongoose');

mongoose.model('Communication', {
  microservice: {
    type: String,
  },
  endpoint: {
    type: String,
  },
  request: {
    type: String,
  },
  responsestatus: {
    type: Number,
  },
  responsemessage: {
    type: String,
  },
  time: {
    type: Date,
  },
  correlatingid: {
    type: String,
  },
});
