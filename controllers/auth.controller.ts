import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import bcrypt from 'bcryptjs';
import {createError} from "../utils/error";

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

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404, "Użytkownik nie został znaleziony."));

        const isPassCorrect = await bcrypt.compare(req.body.password, user.hashPwd);
        if(!isPassCorrect) return next(createError(400, "Nieprawidłowe hasło lub login."));

        const userResponse = {
            _id: user.id,
            username: user.username,
            email: user.email,
        };

        res.status(200).json(userResponse);
    } catch (err) {
        next(err);
    }
};