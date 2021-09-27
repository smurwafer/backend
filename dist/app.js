"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var path_1 = __importDefault(require("path"));
var body_parser_1 = require("body-parser");
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var current_user_1 = require("./src/middlewares/current-user");
var login_1 = require("./src/routes/auth/login");
var signup_1 = require("./src/routes/auth/signup");
var gallery_1 = require("./src/routes/gallery");
var create_1 = require("./src/routes/gallery/create");
var delete_1 = require("./src/routes/gallery/delete");
var show_1 = require("./src/routes/gallery/show");
var update_1 = require("./src/routes/gallery/update");
var story_1 = require("./src/routes/story");
var create_2 = require("./src/routes/story/create");
var show_2 = require("./src/routes/story/show");
var update_2 = require("./src/routes/story/update");
var user_1 = require("./src/routes/user");
var delete_2 = require("./src/routes/user/delete");
var show_3 = require("./src/routes/user/show");
var update_3 = require("./src/routes/user/update");
var update_4 = require("./src/routes/dashboard/update");
var show_4 = require("./src/routes/dashboard/show");
var delete_3 = require("./src/routes/dashboard/delete");
var create_3 = require("./src/routes/vote/create");
var delete_4 = require("./src/routes/vote/delete");
var show_5 = require("./src/routes/vote/show");
var create_4 = require("./src/routes/comment/create");
var delete_5 = require("./src/routes/comment/delete");
var show_6 = require("./src/routes/comment/show");
var dashboard_1 = require("./src/routes/dashboard");
var create_5 = require("./src/routes/follow/create");
var follow_1 = require("./src/routes/follow");
var delete_6 = require("./src/routes/follow/delete");
var show_7 = require("./src/routes/follow/show");
var create_6 = require("./src/routes/bookmark/create");
var bookmark_1 = require("./src/routes/bookmark");
var show_8 = require("./src/routes/bookmark/show");
var update_5 = require("./src/routes/bookmark/update");
var delete_7 = require("./src/routes/bookmark/delete");
var create_7 = require("./src/routes/report/create");
var report_1 = require("./src/routes/report");
var show_9 = require("./src/routes/report/show");
var update_6 = require("./src/routes/report/update");
var delete_8 = require("./src/routes/report/delete");
var search_1 = require("./src/routes/search");
var create_8 = require("./src/routes/setting/create");
var show_10 = require("./src/routes/setting/show");
var update_7 = require("./src/routes/setting/update");
var delete_9 = require("./src/routes/setting/delete");
var app = (0, express_1.default)();
exports.app = app;
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        }
        else if (file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
            cb(null, 'videos');
        }
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use((0, multer_1.default)({ storage: storage, fileFilter: fileFilter }).any());
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
app.use('/videos', express_1.default.static(path_1.default.join(__dirname, 'videos')));
app.use((0, body_parser_1.json)());
app.set('trust proxy', true);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(current_user_1.currentUser);
app.use(login_1.LoginRouter);
app.use(signup_1.SignupRouter);
app.use(create_2.StoryCreateRouter);
app.use(update_2.StoryUpdateRouter);
app.use(story_1.StoryIndexRouter);
app.use(show_2.StoryShowRouter);
app.use(update_2.StoryUpdateRouter);
app.use(user_1.UserIndexRouter);
app.use(show_3.UserShowRouter);
app.use(update_3.UserUpdateRouter);
app.use(delete_2.UserDeleteRouter);
app.use(create_1.GalleryCreateRouter);
app.use(gallery_1.GalleryIndexRouter);
app.use(show_1.GalleryShowRouter);
app.use(update_1.GalleryUpdateRouter);
app.use(delete_1.GalleryDeleteRouter);
app.use(dashboard_1.DashboardIndexRouter);
app.use(update_4.DashboardUpdateRouter);
app.use(show_4.DashboardShowRouter);
app.use(delete_3.DashboardDeleteRouter);
app.use(create_3.VoteCreateRouter);
app.use(delete_4.VoteDeleteRouter);
app.use(show_5.VoteShowRouter);
app.use(create_4.CommentCreateRouter);
app.use(delete_5.CommentDeleteRouter);
app.use(show_6.CommentShowRouter);
app.use(create_5.FollowCreateRouter);
app.use(follow_1.FollowIndexRouter);
app.use(show_7.FollowShowRouter);
app.use(delete_6.FollowDeleteRouter);
app.use(create_6.BookmarkCreateRouter);
app.use(bookmark_1.BookmarkIndexRouter);
app.use(show_8.BookmarkShowRouter);
app.use(update_5.BookmarkUpdateRouter);
app.use(delete_7.BookmarkDeleteRouter);
app.use(create_7.ReportCreateRouter);
app.use(report_1.ReportIndexRouter);
app.use(show_9.ReportShowRouter);
app.use(update_6.ReportUpdateRouter);
app.use(delete_8.ReportDeleteRouter);
app.use(search_1.SearchIndexRouter);
app.use(create_8.SettingCreateRouter);
app.use(show_10.SettingShowRouter);
app.use(update_7.SettingUpdateRouter);
app.use(delete_9.SettingDeleteRouter);
app.all('*', function (req, res) {
    throw new Error('API route not found!');
});
app.use(function (err, req, res, next) {
    console.log('Something went wrong!');
    if (err) {
        console.log(err.message);
        return res.status(400).send({
            message: err.message,
        });
    }
    res.status(400).send({
        message: 'Something went wrong!',
    });
});
