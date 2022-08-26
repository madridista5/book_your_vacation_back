import express from "express";

const app = express();

app.get('/', (req, res) => {
   res.send('działa');
});

app.listen(3001, '0.0.0.0',() => {
    console.log('Listening on http://localhost:3001');
});