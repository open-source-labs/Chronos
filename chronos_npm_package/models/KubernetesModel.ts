import mongoose from 'mongoose';

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



const KubernetesModel = mongoose.model('KubernetesModel', KubernetesSchema);

// Export the model
export default KubernetesModel;