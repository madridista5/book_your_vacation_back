import {NextFunction, Request, Response} from "express";
import User from "../models/User";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        await newUser.save();
        res.status(200).json('Użytkownik został utworzony.');
    } catch (err) {
        next(err);
    }
};