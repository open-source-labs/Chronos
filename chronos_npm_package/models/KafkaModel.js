const mongoose = require('mongoose');

const { Schema } = mongoose;

const KafkaSchema = new Schema({
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
    type: Number,
    default: '',
  },
});

module.exports = mongoose.model('kafkametrics', KafkaSchema);
