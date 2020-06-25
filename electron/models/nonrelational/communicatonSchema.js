const mongoose = require('mongoose');

const { Schema } = mongoose;

const communicationSchema = new Schema(
  {
    microservice: {
      type: String,
      unique: true,
      required: [true, 'microservice required'],
    },
    endpoint: {
      type: String,
      required: [true, 'endpoint required'],
    },
    request: {
      type: String,
      required: [true, 'request required'],
    },
    responsestatus: {
      type: Number,
      required: [true, 'responsestatus required']
    },
    responsemessage: {
      type: String,
      required: [true, 'responsemessage required'],
    },
    correlatingid: {
      type: String,
      required: [true, 'correlatingid required'],
    },
  },
  { timestamps: { createdAt: 'time', updatedAt: 'time' } }
);

module.exports = mongoose.model('communications', communicationSchema);
