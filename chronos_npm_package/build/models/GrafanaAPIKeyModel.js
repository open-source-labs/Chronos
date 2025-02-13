"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const GrafanaAPIKeySchema = new Schema({
    token: {
        type: String,
        unique: true,
    }
});
// module.exports = mongoose.model('grafanaAPI', GrafanaAPIKeySchema);
const GrafanaAPIKeyModel = mongoose_1.default.model('GrafanaAPIKeyModel', GrafanaAPIKeySchema);
// Export the model
exports.default = GrafanaAPIKeyModel;
//# sourceMappingURL=GrafanaAPIKeyModel.js.map