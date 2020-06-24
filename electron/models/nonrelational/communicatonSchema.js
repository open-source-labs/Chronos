const mongoose = require('mongoose');

const { Schema } = mongoose;

const communicationSchema = new Schema({
  currentMicroservice: {
    type: String,
  },
  targetedEndpoint: {
    type: String,
  },
  reqType: {
    type: String,
  },
  resStatus: {
    type: Number,
  },
  resMessage: {
    type: String,
  },
  timeSent: {
    type: Date,
  },
});

module.exports = mongoose.model('communications', communicationSchema);
