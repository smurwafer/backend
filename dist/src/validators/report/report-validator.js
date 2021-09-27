"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        .withMessage('Title should not be empty'),
];
exports.ReportValidator = validator;
