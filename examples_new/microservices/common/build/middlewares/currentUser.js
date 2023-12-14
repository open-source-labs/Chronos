"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//middleware to check if there is a cookie
// if there is a cookie, we decode jwt and attach the current user id
const currentUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return next();
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.currentUser = payload.userId;
        return next();
    }
    catch (err) {
        throw new Error('🎃Internal Error');
    }
};
exports.currentUser = currentUser;
