"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_1 = require("./custom-error");
// Custom error for NotFound
class NotFoundError extends custom_error_1.CustomError {
    constructor() {
        // This message will be console logged in error handling middleware
        super('Not found error');
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    // Formats the error message to send back to the client
    formatError() {
        return { message: 'Not found error' };
    }
}
exports.NotFoundError = NotFoundError;
