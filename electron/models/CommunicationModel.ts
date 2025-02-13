import mongoose, { Schema, Document } from 'mongoose';

export interface IComms extends Document {
  microservice: string;
  endpoint: string;
  request: string;
  responsestatus: number;
  responsemessage: string;
  correlatingid: string;
  timestamps: Date;
}

const CommunicationsSchema = new Schema({
  microservice: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
  },
  request: {
    type: String,
    required: true,
  },
  responsestatus: {
    type: Number,
  },
  responsemessage: {
    type: String,
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

const CommunicationModel = mongoose.model<IComms>('communications', CommunicationsSchema);

export default CommunicationModel;
