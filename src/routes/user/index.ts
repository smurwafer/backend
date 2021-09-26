import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { User, UserDoc } from '../../models/user';
import socket from '../../../socket';
import { Follow } from '../../models/follow';
import { Contact } from '../../models/contact';

const Router = express.Router();

Router.get('/api/user', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const page : number = parseInt(req.query.page as string);
    const perPage : number = 10;
    const offset : number = (page - 1) * perPage;

    const users = await User.find({ _id: { $ne: req.currentUser?.id } }).skip(offset).limit(perPage);

    res.status(200).send({
        message: 'users fetched successfully',
        users,
    });
});

Router.get('/api/online-users', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id as string;
        const contacts = await Contact.find({
            $or: [
                { userA: id },
                { userB: id },
            ]
        }).populate('userA').populate('userB');

        res.status(200).send({
            message: "Online users fetched successfully!",
            onlineUsers: contacts,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserIndexRouter };