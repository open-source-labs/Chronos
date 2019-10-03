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

const communicationModel = mongoose.model('communications', communicationSchema);

module.exports = communicationModel;
