import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
};

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

const currentUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.get('Authorization');
    
        if (!authHeader) {
            return next();
        }
    
        const token = authHeader.split(' ')[1];
    
        const decodedToken = jwt.verify(token, 'secret') as UserPayload;
    
        if (!decodedToken) {
            return next();
        }
    
        req.currentUser = decodedToken;
        next();
    } catch (err) {
        next(err);
    }
}

export { currentUser };