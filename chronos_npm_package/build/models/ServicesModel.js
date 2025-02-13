"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ServicesSchema = new Schema({
    microservice: {
        type: String,
        unique: true,
    },
    interval: {
        type: String,
        required: true,
    },
});
// module.exports = mongoose.model('services', ServicesSchema); // invalid format when converted to TS
// Define the model
const ServicesModel = mongoose_1.default.model('services', ServicesSchema);
// Export the model
exports.default = ServicesModel;
//# sourceMappingURL=ServicesModel.js.map