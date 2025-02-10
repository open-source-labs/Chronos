"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
const KubernetesModel = mongoose_1.default.model('KubernetesModel', KubernetesSchema);
// Export the model
exports.default = KubernetesModel;
//# sourceMappingURL=KubernetesModel.js.map