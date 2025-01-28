import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * This model is used for storing alerts and communications to developers
 */

const CommunicationsSchema = new Schema({
  microservice: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  request: {
    type: String,
    required: true,
  },
  responsestatus: {
    type: Number,
    required: true,
  },
  responsemessage: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  correlatingid: {
    type: String,
    required: true,
  },
});

// module.exports = mongoose.model('communications', CommunicationsSchema); //invalid format for TS

// Define the model
const CommunicationModel = mongoose.model('communications', CommunicationsSchema);

// Export the model
export default CommunicationModel;