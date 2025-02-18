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


const ContainerName = mongoose.model('ContainerName', DockerSchema);

// Export the model
export default ContainerName;