const mongoose = require('mongoose');

const { Schema } = mongoose;

const MetricsSchema = new Schema({
    metric: {
      type: String,
      unique: true,
    },
    selected: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: String
    }
  });
  
export default mongoose.model('metrics', MetricsSchema);
