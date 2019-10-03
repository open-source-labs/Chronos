const mongoose = require('mongoose');

const { Schema } = mongoose;

const healthInfoSchema = new Schema({
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

const healthInfoModel = mongoose.model('microservicehealths', healthInfoSchema);

module.exports = healthInfoModel;
