import jwt, {JwtPayload} from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
import {createError} from "./error";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "Nie zostałeś uwierzytelniony."));
    }

    jwt.verify(token, process.env.SECRET_KEY, (err: Error, user: JwtPayload) => {
        if (err) {
            return next(createError(403, 'token jest niewazny'));
        }
        // @ts-ignore
        req.user = user;
        next();
    })
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        try {
            // @ts-ignore
            if (req.user.id === req.params.id || req.user.isAdmin) {
                next();
            }
        } catch (err) {
            if (err) return next(createError(403, 'Nie zostałeś zautoryzowany.'));
        }
    });
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        try {
            // @ts-ignore
            if (req.user.isAdmin) {
                next();
            }
        } catch (err) {
            if (err) return next(createError(403, 'Nie zostałeś zautoryzowany.'));
        }
    });
};