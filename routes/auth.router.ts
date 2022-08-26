import {Router} from "express";

export const authRouter = Router();

authRouter
    .get('/', (req, res) => {
        res.send('Auth endpoint.');
    })
    .get('/register', (req, res) => {
       res.send('Auth / register');
    });