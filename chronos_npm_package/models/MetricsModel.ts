import mongoose from 'mongoose';

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
    type: String,
  },
  category: {
    type: String,
  },
});

const MetricsModel = mongoose.model('MetricsModel', MetricsSchema);

// Export the model
export default MetricsModel;
