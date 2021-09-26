import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { User } from '../../models/user';

const sendGridTransport = require('nodemailer-sendgrid-transport');

const Router = express.Router();

Router.post('/api/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
    
        const transporter = nodemailer.createTransport(sendGridTransport({
            auth: {
                api_key: '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',
            }
        }));

        const existingUser = await User.findOne({ email });
    
        if (!existingUser) {
            throw new Error("No such user exists!");
        }
    
        const isValid = await bcrypt.compare(password, existingUser.password);
    
        if (!isValid) {
            throw new Error("Password not valid!");
        }
    
        const token = jwt.sign({ email, id: existingUser.id }, 'secret', {
            expiresIn: '24h',
        });

        const expiryDate = (Math.round(new Date().getTime() / 1000) + 24 * 3600) * 1000;

        transporter.sendMail({
            to: email,
            from: 'manaskumar2808@gmail.com',
            subject: 'Welcome to smurwafer!',
            html: `<h1>Good to see you ${existingUser.name}.</h1>`,
        });
    
        res.status(200).send({
            message: 'User logged in successfully',
            token,
            id: existingUser.id,
            expiryDate,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LoginRouter };