"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const gRPC_CommunicationsSchema = new Schema({
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
module.exports = mongoose_1.default.model('grpc_communications', gRPC_CommunicationsSchema);
//# sourceMappingURL=gRPC_CommunicationModel.js.map