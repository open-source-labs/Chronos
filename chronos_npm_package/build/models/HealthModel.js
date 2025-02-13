"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const HealthSchema = new Schema({
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
// module.exports = MicroSrvName => mongoose.model(MicroSrvName, HealthSchema); // invalid format of export for TS files
const MicroSrvName = mongoose_1.default.model('MicroSrvName', HealthSchema);
// Export the model
exports.default = MicroSrvName;
//# sourceMappingURL=HealthModel.js.map