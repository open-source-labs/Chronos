"use strict";
// Custom Error class to reinforce error class structure
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// abstract - cannot instantiate CustomError, only inherit from it (extend it)
class CustomError extends Error {
    constructor(message) {
        // Serves as the message for the Error class that CustomError is extending
        super(message);
        // Make sure properties we are setting end up on CustomError's prototype?
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
