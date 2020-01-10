const mongoose = require('mongoose');

mongoose.model('Communication', {
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
    type: Date
  },
  correlatingId:{
    type: String,
  },
})