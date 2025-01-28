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
// module.exports = MicroSrvName => mongoose.model(MicroSrvName, HealthSchema); // invalid format of export for TS files
const MicroSrvName = mongoose.model('MicroSrvName', HealthSchema);

// Export the model
export default MicroSrvName;