"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Story = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
;
var storySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    gallery: [{
            type: String,
            ref: 'Gallery',
            required: false,
        }],
    hashtags: [{
            type: String,
            required: false,
        }],
    author: {
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
storySchema.statics.build = function (attrs) {
    return new Story(attrs);
};
var Story = mongoose_1.default.model('Story', storySchema);
exports.Story = Story;
