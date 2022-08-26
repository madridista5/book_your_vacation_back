import express from "express";
import dotenv from "dotenv";
import {connect} from "./utils/db";

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send('działa');
});

app.listen(3001, '0.0.0.0', async () => {
    await connect();
    console.log('Listening on http://localhost:3001');
});