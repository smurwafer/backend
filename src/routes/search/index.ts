import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Story } from '../../models/story';
import Fuse from 'fuse.js';
import { User } from '../../models/user';

const Router = express.Router();

Router.get('/api/search', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {

        // api/search/?type=story&input=text
        const type = req.query.type as string;
        const input = req.query.input as string;

        if (type === 'story') {
            const stories = await Story.find().populate('author').populate('gallery');
    
            const fuse = new Fuse(stories, {
                includeScore: true,
                keys: ['title'],
            });
    
            const results = fuse.search(input);
    
            res.status(200).send({
                message: 'Search results fetched succesfully',
                results,
            });
        } else {
            const users = await User.find();

            const fuse = new Fuse(users, {
                includeScore: true,
                keys: ['userName', 'name', 'email']
            });

            const results = fuse.search(input);
    
            res.status(200).send({
                message: 'Search results fetched succesfully',
                results,
            });
        }
    } catch (err) {
        next(err);
    }
});

export { Router as SearchIndexRouter };