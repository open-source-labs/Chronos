import mongoose from 'mongoose';
const { Schema } = mongoose;
const KubernetesSchema = new Schema({
    time: {
        type: Date,
        default: Date.now(),
    },
    metric: {
        type: String,
    },
    value: {
        type: Number,
    },
    category: {
        type: String,
        default: '',
    },
});
// module.exports = mongoose.model('kubernetesmetrics', KubernetesSchema);  // invalid format for TS files
const KubernetesModel = mongoose.model('KubernetesModel', KubernetesSchema);
// Export the model
export default KubernetesModel;
//# sourceMappingURL=KubernetesModel.js.map