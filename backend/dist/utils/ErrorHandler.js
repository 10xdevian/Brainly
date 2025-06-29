"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fails" : "Error";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorHandler = ErrorHandler;
