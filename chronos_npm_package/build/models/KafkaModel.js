"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const KafkaSchema = new Schema({
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
// module.exports = mongoose.model('kafkametrics', KafkaSchema); // invalid format for TS files
const KafkaModel = mongoose_1.default.model('KafkaModel', KafkaSchema);
// Export the model
exports.default = KafkaModel;
//# sourceMappingURL=KafkaModel.js.map