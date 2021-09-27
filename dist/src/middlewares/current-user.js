"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
var currentUser = function (req, res, next) {
    try {
        var authHeader = req.get('Authorization');
        if (!authHeader) {
            return next();
        }
        var token = authHeader.split(' ')[1];
        var decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
        if (!decodedToken) {
            return next();
        }
        req.currentUser = decodedToken;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.currentUser = currentUser;
