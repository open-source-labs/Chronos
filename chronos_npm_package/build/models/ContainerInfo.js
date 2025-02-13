"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const DockerSchema = new Schema({
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
// module.exports = ContainerName => {
//   console.log('Inside Docker Schema ContainerInfo.js LN52', ContainerName)
//   return mongoose.model(ContainerName, DockerSchema); 
// }; // invalid format for TS files
const ContainerName = mongoose_1.default.model('ContainerName', DockerSchema);
// Export the model
exports.default = ContainerName;
//# sourceMappingURL=ContainerInfo.js.map