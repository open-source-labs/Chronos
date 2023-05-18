import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  microservice: string;
  interval: number;
}

const ServicesSchema = new Schema({
  microservice: {
    type: String,
    unique: true,
  },
  interval: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IService>('services', ServicesSchema);
// export default ServicesSchema;