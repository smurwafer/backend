import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';
import { GalleryType } from '../../utility/gallery-type';

const Router = express.Router();

Router.post('/api/gallery', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { caption, type, url } = req.body;
    
        let modifiedType = GalleryType.Image;
        
        let imageUrl = "", videoUrl = "", isResourceUrl = false;

        if (url && url.trim().length > 0) {
            isResourceUrl = true;
            if (type == 'video') {
                videoUrl = url;
            } else {
                imageUrl = url;
            }
        }
    
        if (type === 'video') {
            modifiedType = GalleryType.Video;
            if (req.files && req.files.length > 0) {
                isResourceUrl = false;
                videoUrl = (req.files as Express.Multer.File[])[0].path as string;
            }
        } else {
            if (req.files && req.files.length > 0) {
                isResourceUrl = false;
                imageUrl = (req.files as Express.Multer.File[])[0].path as string;
            }
        }
    
        const gallery = Gallery.build({
            imageUrl, videoUrl, caption, type: modifiedType, isResourceUrl
        });
    
        await gallery.save();
    
        res.status(201).send({
            message: 'gallery created successfully',
            gallery,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as GalleryCreateRouter };