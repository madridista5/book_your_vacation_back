import express from "express";
import dotenv from "dotenv";
import {connect} from "./utils/db";
import {authRouter} from "./routes/auth.router";
import {hotelsRouter} from "./routes/hotels.router";
import {roomsRouter} from "./routes/rooms.router";
import {usersRouter} from "./routes/users.router";

const app = express();
dotenv.config();

//middlewares
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/users', usersRouter);

app.listen(3001, '0.0.0.0', async () => {
    await connect();
    console.log('Listening on http://localhost:3001');
});