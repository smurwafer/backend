"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var followSchema = new mongoose_1.default.Schema({
    follower: {
        type: String,
        ref: 'User',
        required: true,
    },
    followed: {
        type: String,
        ref: 'User',
        required: true,
    },
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
followSchema.statics.build = function (attrs) {
    return new Follow(attrs);
};
var Follow = mongoose_1.default.model('Follow', followSchema);
exports.Follow = Follow;
