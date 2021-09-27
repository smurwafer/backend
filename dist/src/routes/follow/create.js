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
exports.FollowCreateRouter = void 0;
var express_1 = __importDefault(require("express"));
var require_auth_1 = require("../../middlewares/require-auth");
var contact_1 = require("../../models/contact");
var follow_1 = require("../../models/follow");
var Router = express_1.default.Router();
exports.FollowCreateRouter = Router;
Router.post('/api/follow', require_auth_1.requireAuth, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var followed, existingFollow, followText, contact, follow, err_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                followed = req.body.followed;
                return [4 /*yield*/, follow_1.Follow.findOne({
                        $or: [
                            {
                                follower: followed,
                                followed: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id
                            }
                        ]
                    })];
            case 1:
                existingFollow = _d.sent();
                followText = 'following';
                if (!existingFollow) return [3 /*break*/, 3];
                contact = contact_1.Contact.build({
                    userA: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
                    userB: followed,
                });
                followText = 'contact';
                return [4 /*yield*/, contact.save()];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3:
                follow = follow_1.Follow.build({
                    follower: (_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.id,
                    followed: followed,
                });
                return [4 /*yield*/, follow.save()];
            case 4:
                _d.sent();
                res.status(201).send({
                    message: 'follow created successfully',
                    followText: followText,
                });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _d.sent();
                next(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
