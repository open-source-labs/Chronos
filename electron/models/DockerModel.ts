import mongoose from 'mongoose';

const { Schema } = mongoose;

const DockerSchema = new Schema({
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

const DockerModelFunc = (serviceName: any) =>
  mongoose.model<any>(`${serviceName}`, DockerSchema);

export default DockerModelFunc;