const mongoose = require('mongoose');
const { services } = require('../user/settings.json');

const databaseType = services[0][1];
const URI = services[0][2];

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(err);
  console.log('Connected to database!');
});

const communicationSchema = mongoose.Schema({
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

const communicationModel = mongoose.model('communications', communicationSchema);

(databaseType === 'MongoDB') ? module.exports = communicationModel : module.exports = null;
