import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  microservice: string;
  interval: number;
}

const servicesSchema = new Schema({
  microservice: {
    type: String,
    unique: true,
    required: [true, 'microservice required'],
  },
  interval: {
    type: Number,
    required: [true, 'interval required'],
  },
});

export default mongoose.model<IService>('services', servicesSchema);
