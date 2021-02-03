import mongoose, { Schema, Document } from 'mongoose';

export interface IComms extends Document {
  microservice: string;
  request: string;
  responsestatus: number;
  correlatingid: string;
  timestamps: Date;
}

const CommunicationsSchema = new Schema({
  microservice: {
    type: String,
    required: true,
  },
  request: {
    type: String,
    required: true,
  },
  responsestatus: {
    type: Number,
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

const GRPCCommunicationsModel = mongoose.model<IComms>('grpc_communications', CommunicationsSchema);

export default GRPCCommunicationsModel;
