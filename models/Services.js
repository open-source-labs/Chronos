const mongoose = require('mongoose');

const { Schema } = mongoose;

const ServicesSchema = new Schema({
  microservice: {
    type: String,
    unique: true,
  },
  interval: {
    type: String,
  },
});

module.exports = service => mongoose.model(service, ServicesSchema);
