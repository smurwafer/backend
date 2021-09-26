import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';

const Router = express.Router();

Router.get('/api/gallery', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const galleries = await Gallery.find();

    res.status(200).send({
        message: 'galleries fetched successfully',
        galleries,
    });
});

export { Router as GalleryIndexRouter };