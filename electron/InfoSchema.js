const mongoose = require('mongoose');
const { database } = require('../user/settings.json');

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  console.log('Connected to database!');
});

const HealthInfoSchema = mongoose.Schema({
  currentMicroservice: {
    type: String,
  },
  targetedEndpoint: {
    type: String,
  },
  reqType: {
    type: String,
  },
  timeSent: {
    type: Date,
  },
});

const HealthInfoModel = mongoose.model('healthinfo', HealthInfoSchema);

module.exports = HealthInfoModel;
