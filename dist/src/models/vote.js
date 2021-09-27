"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
var voteSchema = new mongoose_1.default.Schema({
    voter: {
        type: String,
        ref: 'User',
        required: true,
    },
    story: {
        type: String,
        ref: 'Story',
        required: true,
    },
    type: {
        type: String,
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
voteSchema.statics.build = function (attrs) {
    return new Vote(attrs);
};
var Vote = mongoose_1.default.model('Vote', voteSchema);
exports.Vote = Vote;
