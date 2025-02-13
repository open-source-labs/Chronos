import mongoose from 'mongoose';
const { Schema } = mongoose;
const MetricsSchema = new Schema({
    metric: {
        type: String,
        unique: true,
    },
    selected: {
        type: Boolean,
        default: true,
    },
    mode: {
        type: String
    },
    category: {
        type: String
    }
});
// module.exports = mongoose.model('metrics', MetricsSchema);
const MetricsModel = mongoose.model('MetricsModel', MetricsSchema);
// Export the model
export default MetricsModel;
//# sourceMappingURL=MetricsModel.js.map