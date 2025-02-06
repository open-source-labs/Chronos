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

module.exports = ContainerName => {
  console.log('Inside Docker Schema ContainerInfo.js LN52', ContainerName)
  return mongoose.model(ContainerName, DockerSchema);
};
