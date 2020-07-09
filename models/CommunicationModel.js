const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommunicationsSchema = new Schema({
  microservice: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  request: {
    type: String,
    required: true,
  },
  responsestatus: {
    type: Number,
    required: true,
  },
  responsemessage: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  correlatingid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('communications', CommunicationsSchema);
