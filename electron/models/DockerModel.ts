import mongoose from 'mongoose';

const { Schema } = mongoose;

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

const DockerModelFunc = (serviceName: any) =>
  mongoose.model<any>(`${serviceName}-containerinfos`, DockerSchema);

export default DockerModelFunc;
