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
      required: [true, 'responsestatus required'],
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
module.exports = (serviceName:any) => mongoose.model(serviceName, communicationSchema);
// export default mongoose.model<IComms>('communications', communicationSchema);
