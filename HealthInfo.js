const mongoose = require('mongoose');

mongoose.model('HealthInfo', {
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
    type: Date
  }
})