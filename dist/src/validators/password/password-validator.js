"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('newPassword')
        .isLength({ min: 7 })
        .withMessage('Password length must be atleast 8'),
];
exports.PasswordValidator = validator;
