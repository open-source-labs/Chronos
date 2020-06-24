const mongoose = require('mongoose');

const { Schema } = mongoose;

const servicesSchema = new Schema({
  microservice: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('services', servicesSchema);
