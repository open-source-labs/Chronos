"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
/**
 * This model is used for storing alerts and communications to developers
 */
const CommunicationsSchema = new Schema({
    microservice: {
        type: String,
        required: true,
    },
    endpoint: {
        type: String,
        required: true,
    },
    request: {
        type: String,
        required: true,
    },
    responsestatus: {
        type: Number,
        required: true,
    },
    responsemessage: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    correlatingid: {
        type: String,
        required: true,
    },
});
// module.exports = mongoose.model('communications', CommunicationsSchema); //invalid format for TS
// Define the model
const CommunicationModel = mongoose_1.default.model('communications', CommunicationsSchema);
// Export the model
exports.default = CommunicationModel;
//# sourceMappingURL=CommunicationModel.js.map