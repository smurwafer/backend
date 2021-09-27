"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
;
;
;
var settingSchema = new mongoose_1.default.Schema({
    language: {
        type: String,
        default: 'english',
        required: true,
    },
    emailOnLogin: {
        type: Boolean,
        default: false,
        required: true,
    },
    notification: {
        type: Boolean,
        default: true,
        required: true,
    },
    showNewContent: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
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
settingSchema.statics.build = function (attrs) {
    return new Setting(attrs);
};
var Setting = mongoose_1.default.model('Setting', settingSchema);
exports.Setting = Setting;
