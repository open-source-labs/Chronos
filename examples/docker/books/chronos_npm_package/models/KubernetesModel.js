const mongoose = require('mongoose');

const { Schema } = mongoose;

const KubernetesSchema = new Schema({
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

module.exports = mongoose.model('kubernetesmetrics', KubernetesSchema);
