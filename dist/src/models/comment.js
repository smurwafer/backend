"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
;
var commentSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        ref: 'Story',
        required: true,
    },
    commentor: {
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
commentSchema.statics.build = function (attrs) {
    return new Comment(attrs);
};
var Comment = mongoose_1.default.model('Comment', commentSchema);
exports.Comment = Comment;
