const mongoose = require('mongoose');

const { Schema } = mongoose;

const HealthSchema = new Schema({
  time: {
    type: Date,
    default: Date.now(),
  },
  metric: {
    type: String,
  },
  value: {
    type: Number,
  },
  category: {
    type: String,
    default: '',
  },
});
module.exports = MicroSrvName => mongoose.model(MicroSrvName, HealthSchema);
