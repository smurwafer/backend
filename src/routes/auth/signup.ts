import fs from 'fs';
import util from 'util';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { User } from '../../models/user';
import { AuthValidator } from '../../validators/auth/auth-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { Profile } from '../../models/profile';
import { Dashboard } from '../../models/dashboard';
import { uploadFile } from '../../../s3';

const sendGridTransport = require('nodemailer-sendgrid-transport');

const Router = express.Router();

const unlink = util.promisify(fs.unlink);

Router.post('/api/auth/signup', AuthValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, name, email, age, password } = req.body;

        const transporter = nodemailer.createTransport(sendGridTransport({
            auth: {
                api_key: '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',
            }
        }));

        const existingUser1 = await User.findOne({ email });
    
        if (existingUser1) {
            throw new Error("Email address already exists!");
        }

        const existingUser2 = await User.findOne({ userName });
    
        if (existingUser2) {
            throw new Error("Username already exists!");
        }
    
        const passwordHash = await bcrypt.hash(password, 12);

        let imageUrl = "";

        if (req.files && req.files.length > 0) {
            const file = (req.files as Express.Multer.File[])[0];
            console.log('aws result awaited',file);
            imageUrl = file.path as string;
            try {
                const result = await uploadFile(file);
                console.log('aws result',result);
                imageUrl = 'images/' + result.Key;
                await unlink(file.path);
            } catch (err) {
                console.log('aws error', err);
                throw err;
            }
        }
    
        const user = User.build({
            userName, name, email, imageUrl, age, password: passwordHash, online: false,
        });
    
        await user.save();
    
        const token = jwt.sign({ email, id: user.id }, 'secret', {
            expiresIn: '24h',
        });
    
        const expiryDate = Math.round(new Date().getTime() / 1000) + 24 * 3600;

        const profile = Profile.build({
            user: user.id,
            themeUrl: '',
            bio: '',
            dob: '',
        });

        await profile.save();

        await transporter.sendMail({
            to: email,
            from: 'manaskumar2808@gmail.com',
            subject: 'Welcome to smurwafer!',
            html: '<h1>You have successfully signed up on smurwafer.</h1>',
        });

        const dashboard = Dashboard.build({
            user: user.id,
            rating: 0,
            ranking: 0,
            profit: 0,
            hat: 'blue',
            bestRating: 0,
            bestRanking: 0,
            bestProfit: 0,
        });

        await dashboard.save();

        res.status(201).send({
            message: 'User signed up successfully',
            token,
            id: user.id,
            expiryDate,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SignupRouter };