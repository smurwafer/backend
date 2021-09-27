"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var casinoSchema = new mongoose_1.default.Schema({
    gambler: {
        type: String,
        ref: 'User',
        required: true,
    },
    gamble: {
        type: String,
        ref: 'Gamble',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    vote: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    profit: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
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
casinoSchema.statics.build = function (attrs) {
    return new Casino(attrs);
};
var Casino = mongoose_1.default.model('Casino', casinoSchema);
exports.Casino = Casino;
