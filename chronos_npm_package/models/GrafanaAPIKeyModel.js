const mongoose = require('mongoose');

const { Schema } = mongoose;

const GrafanaAPIKeySchema = new Schema({
    token: {
        type: String,
        unique: true,
    }
});

module.exports = mongoose.model('grafanaAPI', GrafanaAPIKeySchema);