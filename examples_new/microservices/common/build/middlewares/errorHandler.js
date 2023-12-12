"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
    // log error for our use
    console.log(err.message);
    // check if incoming error extends the CustomError class
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).send(err.formatError);
    }
    // if not a custom error send default internal error message
    return res.status(500).send({ message: 'Something went wrong' });
};
exports.errorHandler = errorHandler;
