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

module.exports = mongoose.model('services', ServicesSchema);
