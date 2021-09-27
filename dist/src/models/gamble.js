"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gamble = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var gambleSchema = new mongoose_1.default.Schema({
    up: {
        type: Number,
        required: true,
        default: 0,
    },
    down: {
        type: Number,
        required: true,
        default: 0,
    },
    story: {
        type: String,
        ref: 'Story',
        required: true,
    },
    lastfetched: {
        type: String,
        required: true,
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});
gambleSchema.statics.build = function (attrs) {
    return new Gamble(attrs);
};
var Gamble = mongoose_1.default.model('Gamble', gambleSchema);
exports.Gamble = Gamble;
