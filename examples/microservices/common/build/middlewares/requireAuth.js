"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
// take in req, res and next as arguments - include their types from express package
const requireAuth = (req, res, next) => {
    // check if req.currentUser exists
    // if it does, move onto to the next middleware
    if (req.currentUser)
        return next();
    // if not throw a not authorized error
    throw new not_authorized_error_1.NotAuthorizedError();
};
exports.requireAuth = requireAuth;
