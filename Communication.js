const mongoose = require('mongoose');

mongoose.model('Communication', {
  currentMicroservice: {
    type: String,
    required: true
  },
  targetedEndpoint: {
    type: String,
    required: true
  },
  reqType: {
    type: String,
    required: true
  },
  timeSent: {
    type: Date,
    required: true
  }
})