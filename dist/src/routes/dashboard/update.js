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
exports.DashboardUpdateRouter = void 0;
var express_1 = __importDefault(require("express"));
var require_auth_1 = require("../../middlewares/require-auth");
var casino_1 = require("../../models/casino");
var dashboard_1 = require("../../models/dashboard");
var gamble_1 = require("../../models/gamble");
var hat_1 = require("../../utility/hat");
var Router = express_1.default.Router();
exports.DashboardUpdateRouter = Router;
var max = function (a, b) {
    return a > b ? a : b;
};
var min = function (a, b) {
    return a < b ? a : b;
};
Router.put('/api/dashboard/:id', require_auth_1.requireAuth, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, dashboard, casinos, r, rating, ranking, hat, profit, bestRating, bestRanking, bestProfit;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, dashboard_1.Dashboard.findOne({ user: id })];
            case 1:
                dashboard = _b.sent();
                if (!dashboard) {
                    throw new Error('No dashboard found');
                }
                return [4 /*yield*/, casino_1.Casino.find({
                        gambler: (_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id,
                    })];
            case 2:
                casinos = _b.sent();
                r = 0;
                casinos.map(function (c) { return __awaiter(void 0, void 0, void 0, function () {
                    var gamble, nextFetchTime;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, gamble_1.Gamble.findById(c.gamble)];
                            case 1:
                                gamble = _a.sent();
                                if (gamble) {
                                    nextFetchTime = new Date(gamble.lastfetched).getTime() + 24 * 3600;
                                    if (new Date().getTime() > nextFetchTime) {
                                        if (gamble.up > gamble.down) {
                                            if (c.type === 'author') {
                                                r += gamble.up / 20;
                                            }
                                            else {
                                                if (c.vote === 'up') {
                                                    r += gamble.up / 200;
                                                }
                                                else {
                                                    r -= gamble.up / 100;
                                                }
                                            }
                                        }
                                        else if (gamble.up < gamble.down) {
                                            if (c.type === 'author') {
                                                r -= gamble.down / 10;
                                            }
                                            else {
                                                if (c.vote === 'up') {
                                                    r -= gamble.down / 100;
                                                }
                                                else {
                                                    r += gamble.down / 100;
                                                }
                                            }
                                        }
                                    }
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                rating = dashboard.rating + r;
                return [4 /*yield*/, dashboard_1.Dashboard.find().where('rating').gt(rating).countDocuments()];
            case 3:
                ranking = _b.sent();
                hat = (0, hat_1.getHat)(rating);
                profit = (r / dashboard.rating) * 100;
                bestRating = max(dashboard.bestRating, rating);
                bestRanking = min(dashboard.bestRanking, ranking + 1);
                bestProfit = max(dashboard.bestProfit, profit);
                dashboard.set({
                    rating: rating,
                    ranking: ranking,
                    hat: hat,
                    profit: profit,
                    bestRating: bestRating,
                    bestRanking: bestRanking,
                    bestProfit: bestProfit,
                });
                return [4 /*yield*/, dashboard.save()];
            case 4:
                _b.sent();
                res.status(204).send({
                    message: 'dashboard updated successfully',
                });
                return [2 /*return*/];
        }
    });
}); });
