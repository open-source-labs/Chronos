const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommunicationsSchema = new Schema({
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

module.exports = mongoose.model('communications', CommunicationsSchema);
