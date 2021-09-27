"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var contactSchema = new mongoose_1.default.Schema({
    userA: {
        type: String,
        ref: 'User',
        required: true,
    },
    userB: {
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
contactSchema.statics.build = function (attrs) {
    return new Contact(attrs);
};
var Contact = mongoose_1.default.model('Contact', contactSchema);
exports.Contact = Contact;
