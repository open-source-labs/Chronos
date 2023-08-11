const mongoose = require('mongoose');

const { Schema } = mongoose;

const GrafanaAPIKeySchema = new Schema({
    token: {
        type: String,
        default: '',
    }
})

export default mongoose.model('kafgrafanaAPI', GrafanaAPIKeySchema);