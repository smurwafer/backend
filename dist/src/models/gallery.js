"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var gallery_type_1 = require("../utility/gallery-type");
;
;
var gallerySchema = new mongoose_1.default.Schema({
    imageUrl: {
        type: String,
        required: false,
    },
    videoUrl: {
        type: String,
        required: false,
    },
    caption: {
        type: String,
        required: false,
    },
    type: {
        type: gallery_type_1.GalleryType,
        default: gallery_type_1.GalleryType.Image,
        required: true,
    },
    isResourceUrl: {
        type: Boolean,
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
gallerySchema.statics.build = function (attrs) {
    return new Gallery(attrs);
};
var Gallery = mongoose_1.default.model('Gallery', gallerySchema);
exports.Gallery = Gallery;
