import mongoose from 'mongoose';

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
  token: {
    type: String,
    default: '',
  },
});

const HealthModelFunc = (serviceName: string) => mongoose.model<any>(serviceName, HealthSchema);

export default HealthModelFunc;
