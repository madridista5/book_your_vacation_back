import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            hashPwd: hash,
        });
        await newUser.save();
        res.status(200).json('Użytkownik został utworzony.');
    } catch (err) {
        next(err);
    }
};