"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var profileSchema = new mongoose_1.default.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    themeUrl: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    dob: {
        type: Date,
        required: false,
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
profileSchema.statics.build = function (attrs) {
    return new Profile(attrs);
};
var Profile = mongoose_1.default.model('Profile', profileSchema);
exports.Profile = Profile;
