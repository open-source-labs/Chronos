const mongoose = require('mongoose');
const { services, setupRequired } = require('../user/settings.json');

if (setupRequired) module.exports = null;

if (services[0][1] === 'MongoDB') {
  const URI = services[0][2];
  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(err);
    console.log('Connected to Mongo database!');
  });

  const healthInfoSchema = mongoose.Schema({
    currentMicroservice: {
      type: String,
    },
    targetedEndpoint: {
      type: String,
    },
    reqType: {
      type: String,
    },
    resStatus: {
      type: Number,
    },
    resMessage: {
      type: String,
    },
    timeSent: {
      type: Date,
    },
  });

  const healthInfoModel = mongoose.model('microservicehealths', healthInfoSchema);
  module.exports = healthInfoModel;
}
