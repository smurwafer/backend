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
exports.StoryCreateRouter = void 0;
var express_1 = __importDefault(require("express"));
var require_auth_1 = require("../../middlewares/require-auth");
var validate_request_1 = require("../../middlewares/validate-request");
var casino_1 = require("../../models/casino");
var dashboard_1 = require("../../models/dashboard");
var gamble_1 = require("../../models/gamble");
var story_1 = require("../../models/story");
var hat_1 = require("../../utility/hat");
var story_validator_1 = require("../../validators/story/story-validator");
var Router = express_1.default.Router();
exports.StoryCreateRouter = Router;
var max = function (a, b) {
    return a > b ? a : b;
};
var min = function (a, b) {
    return a < b ? a : b;
};
var updateAllDashboards = function (id, title) { return __awaiter(void 0, void 0, void 0, function () {
    var gamble_2, casinos, rank_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, gamble_1.Gamble.findOne({
                        story: id,
                    })];
            case 1:
                gamble_2 = _a.sent();
                if (!gamble_2) {
                    throw new Error('No such gamble exists');
                }
                return [4 /*yield*/, casino_1.Casino.find({
                        gamble: gamble_2.id,
                    })];
            case 2:
                casinos = _a.sent();
                casinos.map(function (c) { return __awaiter(void 0, void 0, void 0, function () {
                    var r, dashboard, rating, hat, profit, bestRating, bestProfit;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                r = 0;
                                // const nextFetchTime = new Date(gamble.lastfetched).getTime();
                                // if (new Date().getTime() > nextFetchTime) {
                                if (gamble_2.up > gamble_2.down) {
                                    if (c.type === 'author') {
                                        // r += gamble.up / 20;
                                        r += gamble_2.up * 10;
                                    }
                                    else {
                                        if (c.vote === 'up') {
                                            // r += gamble.up / 200;
                                            r += gamble_2.up * 2;
                                        }
                                        else {
                                            // r -= gamble.up / 100;
                                            r -= gamble_2.up;
                                        }
                                    }
                                }
                                else if (gamble_2.up < gamble_2.down) {
                                    if (c.type === 'author') {
                                        // r -= gamble.down / 10;
                                        r -= gamble_2.down * 10;
                                    }
                                    else {
                                        if (c.vote === 'up') {
                                            // r -= gamble.down / 100;
                                            r -= gamble_2.down * 2;
                                        }
                                        else {
                                            // r += gamble.down / 100;
                                            r += gamble_2.down * 2;
                                        }
                                    }
                                }
                                return [4 /*yield*/, dashboard_1.Dashboard.findOne({ user: c.gambler })];
                            case 1:
                                dashboard = _a.sent();
                                if (!dashboard) return [3 /*break*/, 4];
                                rating = Math.round(dashboard.rating + r);
                                hat = (0, hat_1.getHat)(rating);
                                profit = rating - dashboard.rating;
                                bestRating = max(dashboard.bestRating, rating);
                                bestProfit = max(dashboard.bestProfit, profit);
                                dashboard.set({
                                    rating: rating,
                                    hat: hat,
                                    profit: profit,
                                    bestRating: bestRating,
                                    bestProfit: bestProfit,
                                    user: c.gambler,
                                });
                                return [4 /*yield*/, dashboard.save()];
                            case 2:
                                _a.sent();
                                c.set({
                                    rating: rating,
                                    profit: profit,
                                    active: false,
                                });
                                return [4 /*yield*/, c.save()];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                rank_1 = 0;
                return [4 /*yield*/, dashboard_1.Dashboard.find().sort({ 'rating': -1 })];
            case 3: return [4 /*yield*/, (_a.sent()).forEach(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                rank_1++;
                                doc.set({
                                    ranking: rank_1,
                                    bestRanking: doc.bestRanking === 0 ? rank_1 : min(doc.bestRanking, rank_1),
                                });
                                return [4 /*yield*/, doc.save()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                throw err_1;
            case 6: return [2 /*return*/];
        }
    });
}); };
Router.post('/api/story', require_auth_1.requireAuth, story_validator_1.StoryValidator, validate_request_1.validateRequest, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title_1, text, gallery, hashtags, story, id_1, gamble, casino, err_2;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                _a = req.body, title_1 = _a.title, text = _a.text, gallery = _a.gallery, hashtags = _a.hashtags;
                story = story_1.Story.build({
                    title: title_1,
                    text: text,
                    gallery: gallery,
                    hashtags: hashtags,
                    author: (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id,
                });
                return [4 /*yield*/, story.save()];
            case 1:
                id_1 = (_d.sent()).id;
                gamble = gamble_1.Gamble.build({
                    story: id_1,
                    up: 0,
                    down: 0,
                    lastfetched: (Math.round(new Date().getTime() / 1000) - 24 * 3600).toString(),
                });
                return [4 /*yield*/, gamble.save()];
            case 2:
                _d.sent();
                casino = casino_1.Casino.build({
                    gambler: (_c = req.currentUser) === null || _c === void 0 ? void 0 : _c.id,
                    gamble: gamble.id,
                    type: 'author',
                    vote: 'up',
                    rating: 0,
                    profit: 0,
                    active: true,
                });
                return [4 /*yield*/, casino.save()];
            case 3:
                _d.sent();
                try {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, updateAllDashboards(id_1, title_1)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); }, 1000 * 60 * 10);
                }
                catch (err) {
                    throw err;
                }
                res.status(201).send({
                    message: 'story created successfully',
                    story: story,
                });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _d.sent();
                next(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
