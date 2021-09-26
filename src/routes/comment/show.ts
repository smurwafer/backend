import express, { Request, Response, NextFunction } from 'express';
import { Comment } from '../../models/comment';

const Router = express.Router();

Router.get('/api/comment/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const comments = await Comment.find({
            story: id,
        }).populate('commentor');

        res.status(200).send({
            message: 'comments fetched successfully',
            comments,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CommentShowRouter };