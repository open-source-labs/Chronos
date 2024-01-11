"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
const custom_error_1 = require("./custom-error");
class NotAuthorizedError extends custom_error_1.CustomError {
    constructor() {
        // This message will be console logged in error handling middleware
        super(`Not Authorized`);
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    // Formats the error message to send back to the client
    formatError() {
        return { message: `Not Authorized` };
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
