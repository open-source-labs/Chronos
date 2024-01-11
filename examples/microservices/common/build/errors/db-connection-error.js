"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionError = void 0;
const custom_error_1 = require("./custom-error");
class DbConnectionError extends custom_error_1.CustomError {
    constructor() {
        super('Database connection error');
        this.statusCode = 502;
        Object.setPrototypeOf(this, DbConnectionError.prototype);
    }
    formatError() {
        return { message: 'Database connection error' };
    }
}
exports.DbConnectionError = DbConnectionError;
