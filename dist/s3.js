"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileStream = exports.uploadFile = void 0;
require('dotenv').config();
var fs_1 = __importDefault(require("fs"));
var s3_1 = __importDefault(require("aws-sdk/clients/s3"));
var bucketName = process.env.AWS_BUCKET_NAME;
var region = process.env.AWS_BUCKET_REGION;
var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;
var s3 = new s3_1.default({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});
// uploading file to s3
var uploadFile = function (file) {
    var fileStream = fs_1.default.createReadStream(file.path);
    var uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
};
exports.uploadFile = uploadFile;
// downloading file from s3
var getFileStream = function (fileKey) {
    var downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    };
    return s3.getObject(downloadParams).createReadStream();
};
exports.getFileStream = getFileStream;
