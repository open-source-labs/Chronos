import mongoose from 'mongoose';
const { Schema } = mongoose;


const EventSchema = new Schema({
  brokername: {
    type: String,
    required: true,
  },
  ActiveControllerCount: {
    type: Number,
    required: true,
  },
  OfflinePartitionsCount: {
    type: Number,
    required: true,
  },
  UncleanLeaderElectionsPerSec: {
    type: Number,
    required: true,
  },
  DiskUsage: {
    type: Number,
    required: true,
  },

});


const EventModelFunc = (serviceName: any) => mongoose.model<any>(`${serviceName}-eventinfos`, EventSchema);

export default EventModelFunc;
