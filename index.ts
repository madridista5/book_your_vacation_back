import express from "express";
import dotenv from "dotenv";
import {connect} from "./utils/db";
import {authRouter} from "./routes/auth.router";
import {hotelsRouter} from "./routes/hotels.router";
import {roomsRouter} from "./routes/rooms.router";
import {usersRouter} from "./routes/users.router";
import {NextFunction, Request, Response} from "express";
import cookieParser from "cookie-parser";
import {myError} from "./utils/error";
import cors from "cors";

const app = express();
dotenv.config();

//middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/users', usersRouter);

app.use((err: myError, req: Request, res: Response, next: NextFunction) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack,
    });
});

app.listen(3001, '0.0.0.0', async () => {
    await connect();
    console.log('Listening on http://localhost:3001');
});