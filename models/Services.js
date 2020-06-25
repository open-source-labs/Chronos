const mongoose = require('mongoose');

mongoose.model('services', {
  microservice: {
    type: String,
    unique: true,
  },
  interval: {
    type: String,
  },
});
