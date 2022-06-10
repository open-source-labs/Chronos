const mongoose = require('mongoose');

const { Schema } = mongoose;

const KafkaSchema = new Schema({
  time: {
    type: Date,
    default: Date.now(),
  },
  activecontrollercount: {
    type: Number,
  },
  offlinepartitionscount: {
    type: Number,
  },
  uncleanleaderelectionspersec: {
    type: Number,
  },
});

export default mongoose.model('kafkametrics', KafkaSchema);