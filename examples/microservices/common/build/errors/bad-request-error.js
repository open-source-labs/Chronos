"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const custom_error_1 = require("./custom-error");
class BadRequestError extends custom_error_1.CustomError {
    constructor(message) {
        // This message will be console logged in error handling middleware
        super(`Bad request error: ${message}`);
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    // Formats the error message to send back to the client
    formatError() {
        return { message: this.message };
    }
}
exports.BadRequestError = BadRequestError;
// const err = new BadRequestError('Please provide valid inputs')
// err.formatError() -> to the client
// throw new NotFoundError()
