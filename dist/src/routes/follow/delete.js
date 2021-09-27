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
exports.FollowDeleteRouter = void 0;
var express_1 = __importDefault(require("express"));
var require_auth_1 = require("../../middlewares/require-auth");
var contact_1 = require("../../models/contact");
var follow_1 = require("../../models/follow");
var Router = express_1.default.Router();
exports.FollowDeleteRouter = Router;
Router.delete('/api/follow/:followed', require_auth_1.requireAuth, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var followed, existingFollow, followText, contact, follow, err_1;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 7, , 8]);
                followed = req.params.followed;
                return [4 /*yield*/, follow_1.Follow.findOne({
                        $or: [
                            {
                                follower: followed,
                                followed: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id
                            }
                        ]
                    })];
            case 1:
                existingFollow = _f.sent();
                followText = 'follow';
                if (!existingFollow) return [3 /*break*/, 4];
                return [4 /*yield*/, contact_1.Contact.findOne({
                        userA: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
                        userB: followed,
                    })];
            case 2:
                contact = _f.sent();
                followText = 'follow back';
                if (!!contact) return [3 /*break*/, 4];
                return [4 /*yield*/, contact_1.Contact.findOneAndDelete({
                        userA: (_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.id,
                        userB: followed,
                    })];
            case 3:
                _f.sent();
                _f.label = 4;
            case 4: return [4 /*yield*/, follow_1.Follow.findOne({
                    follower: (_d = req.currentUser) === null || _d === void 0 ? void 0 : _d.id,
                    followed: followed,
                })];
            case 5:
                follow = _f.sent();
                if (!follow) {
                    throw new Error('No such follow exists!');
                }
                return [4 /*yield*/, follow_1.Follow.findOneAndDelete({
                        follower: (_e = req.currentUser) === null || _e === void 0 ? void 0 : _e.id,
                        followed: followed,
                    })];
            case 6:
                _f.sent();
                res.status(202).send({
                    message: 'follow deleted successfully',
                    follow: follow,
                    followText: followText,
                });
                return [3 /*break*/, 8];
            case 7:
                err_1 = _f.sent();
                next(err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
