"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupRouter = void 0;
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var user_1 = require("../../models/user");
var auth_validator_1 = require("../../validators/auth/auth-validator");
var validate_request_1 = require("../../middlewares/validate-request");
var profile_1 = require("../../models/profile");
var dashboard_1 = require("../../models/dashboard");
var sendGridTransport = require('nodemailer-sendgrid-transport');
var Router = express_1.default.Router();
exports.SignupRouter = Router;
Router.post('/api/auth/signup', auth_validator_1.AuthValidator, validate_request_1.validateRequest, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, name_1, email, age, password, transporter, existingUser1, existingUser2, passwordHash, imageUrl, user, token, expiryDate, profile, dashboard, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                _a = req.body, userName = _a.userName, name_1 = _a.name, email = _a.email, age = _a.age, password = _a.password;
                transporter = nodemailer_1.default.createTransport(sendGridTransport({
                    auth: {
                        api_key: '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',
                    }
                }));
                return [4 /*yield*/, user_1.User.findOne({ email: email })];
            case 1:
                existingUser1 = _b.sent();
                if (existingUser1) {
                    throw new Error("Email address already exists!");
                }
                return [4 /*yield*/, user_1.User.findOne({ userName: userName })];
            case 2:
                existingUser2 = _b.sent();
                if (existingUser2) {
                    throw new Error("Username already exists!");
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 12)];
            case 3:
                passwordHash = _b.sent();
                imageUrl = "";
                if (req.files && req.files.length > 0) {
                    imageUrl = req.files[0].path;
                }
                user = user_1.User.build({
                    userName: userName,
                    name: name_1,
                    email: email,
                    imageUrl: imageUrl,
                    age: age,
                    password: passwordHash, online: false,
                });
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                token = jsonwebtoken_1.default.sign({ email: email, id: user.id }, 'secret', {
                    expiresIn: '24h',
                });
                expiryDate = Math.round(new Date().getTime() / 1000) + 24 * 3600;
                profile = profile_1.Profile.build({
                    user: user.id,
                    themeUrl: '',
                    bio: '',
                    dob: '',
                });
                return [4 /*yield*/, profile.save()];
            case 5:
                _b.sent();
                return [4 /*yield*/, transporter.sendMail({
                        to: email,
                        from: 'manaskumar2808@gmail.com',
                        subject: 'Welcome to smurwafer!',
                        html: '<h1>You have successfully signed up on smurwafer.</h1>',
                    })];
            case 6:
                _b.sent();
                dashboard = dashboard_1.Dashboard.build({
                    user: user.id,
                    rating: 0,
                    ranking: 0,
                    profit: 0,
                    hat: 'blue',
                    bestRating: 0,
                    bestRanking: 0,
                    bestProfit: 0,
                });
                return [4 /*yield*/, dashboard.save()];
            case 7:
                _b.sent();
                res.status(201).send({
                    message: 'User signed up successfully',
                    token: token,
                    id: user.id,
                    expiryDate: expiryDate,
                });
                return [3 /*break*/, 9];
            case 8:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
