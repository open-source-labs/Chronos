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
});

const MicroSrvName = mongoose.model('MicroSrvName', HealthSchema);


export default MicroSrvName;