import mongoose from'mongoose';

const { Schema } = mongoose;

const ServicesSchema = new Schema({
  microservice: {
    type: String,
    unique: true,
  },
  interval: {
    type: String,
    required: true,
  },
});

// module.exports = mongoose.model('services', ServicesSchema); // invalid format when converted to TS

// Define the model
const ServicesModel = mongoose.model('services', ServicesSchema);

// Export the model
export default ServicesModel;
