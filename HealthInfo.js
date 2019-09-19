const mongoose = require('mongoose');

mongoose.model('HealthInfo', {
  currentLocation: {
    type: String,
    // required: true
  },
  desiredEndpoint: {
    type: String,
    // required: true
  },
  reqType: {
    type: String,
    // required: false
  }
})