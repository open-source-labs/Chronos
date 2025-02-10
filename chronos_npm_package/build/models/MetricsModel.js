"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
const MetricsModel = mongoose_1.default.model('MetricsModel', MetricsSchema);
// Export the model
exports.default = MetricsModel;
//# sourceMappingURL=MetricsModel.js.map