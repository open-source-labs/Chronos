const mongoose = require('mongoose');

const HealthInfoSchema = mongoose.Schema({
  currentMicroservice: {
    type: String,
  },
  targetedEndpoint: {
    type: String,
  },
  reqType: {
    type: String,
  },
  timeSent: {
    type: Date,
  },
});

const HealthInfoModel = mongoose.model('healthinfo', HealthInfoSchema);

module.exports = HealthInfoModel;
