import mongoose from 'mongoose';
const { Schema } = mongoose;
const GrafanaAPIKeySchema = new Schema({
    token: {
        type: String,
        unique: true,
    }
});
// module.exports = mongoose.model('grafanaAPI', GrafanaAPIKeySchema);
const GrafanaAPIKeyModel = mongoose.model('GrafanaAPIKeyModel', GrafanaAPIKeySchema);
// Export the model
export default GrafanaAPIKeyModel;
//# sourceMappingURL=GrafanaAPIKeyModel.js.map