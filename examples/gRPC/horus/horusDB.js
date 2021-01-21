const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose
  .connect(myURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!!!********* Database is live!!!'))
  .catch((err) => console.log('Connection Error ', err));

const HorusSchema = new Schema({
  client: {
    type: String,
    required: true,
  },
  server: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    // default: moment(Date.now).format('MMMM Do YYYY, h:mm:ss a'),
  },
  flag: {
    type: Boolean,
  },
  methodName: {
    type: String,
    required: true,
  },
  error: {
    type: String,
  },
  responseTime: {
    type: Number,
    required: true,
  },
  trace: {
    type: Object,
    required: true,
  },
});

const HorusModel = mongoose.model('HorusModel', HorusSchema);
module.exports = HorusModel;
