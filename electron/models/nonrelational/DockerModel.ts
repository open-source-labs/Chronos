import mongoose, { Schema, Document } from 'mongoose';

export interface IDock extends Document {
  containername: string;
  containerid: string;
  platform: string;
  starttime: string;
  memoryusage: number;
  memorylimit: number;
  memorypercent: number;
  cpupercent: number;
  networkreceived: number;
  networksent: number;
  processcount: number;
  restartcount: number;
}

const DockerSchema = new Schema({
  containername: {
    type: String,
    required: true,
  },
  containerid: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  starttime: {
    type: String,
    required: true,
  },
  memoryusage: {
    type: Number,
    required: true,
  },
  memorylimit: {
    type: Number,
    required: true,
  },
  memorypercent: {
    type: Number,
    required: true,
  },
  cpupercent: {
    type: Number,
    required: true,
  },
  networkreceived: {
    type: Number,
    required: true,
  },
  networksent: {
    type: Number,
    required: true,
  },
  processcount: {
    type: Number,
    required: true,
  },
  restartcount: {
    type: Number,
    required: true,
  },
});

// module.exports = service => mongoose.model(service, DockerSchema);

// const docker = (service: any) => mongoose.model<IDock>(service, DockerSchema);
// module.exports = (serviceName:any) => mongoose.model(serviceName, DockerSchema);
// export default docker;
export default mongoose.model<IDock>('docker', DockerSchema);