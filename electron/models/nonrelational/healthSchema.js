const mongoose = require('mongoose');

const { Schema } = mongoose;

const healthSchema = new Schema({
  cpuspeed: {},
  
});

module.exports = serviceName => mongoose.model(serviceName, healthSchema);
