const mongoose = require('mongoose');

const { Schema } = mongoose;

const servicesSchema = new Schema({
  microservice: {
    type: String,
    unique: true,
    required: [true, 'microservice required'],
  },
  interval: {
    type: Number,
    required: [true, 'interval required'],
  },
});

module.exports = mongoose.model('services', servicesSchema);
