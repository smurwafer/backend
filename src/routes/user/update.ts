import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { requireAuth } from '../../middlewares/require-auth';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';
import { PasswordValidator } from '../../validators/password/password-validator';
import { validateRequest } from '../../middlewares/validate-request';

const Router = express.Router();

Router.put('/api/user/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
    
        if (!user) {
            throw new Error('No such user exists!');
        }
    
        const { userName, name, email, age } = req.body;

        let imageUrl = user.imageUrl;

        if (req.files && req.files.length > 0) {
            imageUrl = (req.files as Express.Multer.File[])[0].path as string;
        }
    
        user.set({
            userName, name, email, imageUrl, age
        });
    
        await user.save();
    
        res.status(204).send({
            message: 'user updated successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});

Router.put('/api/update-password/:id', requireAuth, PasswordValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
    
        if (!user) {
            throw new Error('No such user exists!');
        }
    
        const { oldPassword, newPassword } = req.body;

        const isValid = await bcrypt.compare(oldPassword, user.password);

        if (!isValid) {
            throw new Error('Incorrect old password!');
        }

        const hash = await bcrypt.hash(newPassword, 12);

        user.set({
            password: hash,
        });
    
        await user.save();
    
        res.status(204).send({
            message: 'user password updated successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});


Router.put('/api/profile/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const profile = await Profile.findOne({ user: id });
    
        if (!profile) {
            throw new Error('No such profile exists!');
        }
    
        const { bio, dob } = req.body;

        let themeUrl = profile.themeUrl;

        if (req.files && req.files.length > 0) {
            themeUrl = (req.files as Express.Multer.File[])[0].path as string;
        }
    
        profile.set({
            bio, dob, themeUrl
        });
    
        await profile.save();
    
        res.status(204).send({
            message: 'profile updated successfully',
            profile,
        });
    } catch (err) {
        next(err);
    }
});

Router.put('/api/online-check', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { online } = req.body;
        const id = req.currentUser?.id as string;
        const user = await User.findById(id);

        
        if (!user) {
            throw new Error("User not found!");
        }
        
        console.log('online-check of ' + user.userName, online);

        // const contacts = await Contact.find({
        //     $or: [
        //         { userA: id },
        //         { userB: id }
        //     ]
        // });

        // const rooms = [];

        // for (let key in contacts) {
        //     rooms.push(contacts[key].id);
        // }

        // if (online) {
        //     socket.getIo().socketsJoin(rooms);
        //     socket.getIo().to(rooms).emit('join', {
        //         userName: user.userName,
        //     });
        // } else {
        //     socket.getIo().socketsLeave(rooms);
        //     socket.getIo().to(rooms).emit('leave', {
        //         userName: user.userName,
        //     });
        // }

        user.set({
            online
        });

        await user.save();

        res.status(204).send({
            message: 'Online check successful',
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserUpdateRouter };


// Hello, This is Manas Kumar from Gurugram, Haryana. Currently pursuing computer engineering from Delhi Technological University(DTU) in New Delhi.