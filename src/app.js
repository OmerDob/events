const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const initDb = require('./initDb');

const app = express();

app.use(bodyParser.json({extended: true}));

app.use((req, res, next) => {
    console.log(`${Date.now()} - ${req.originalUrl} requested`);
    next();
});

app.get('/health', (req, res) => {
    res
        .status(200)
        .json({
            mongoose: mongoose.connection.readyState
        })
        .end();
});

app.use('/', (req, res) => {
    res.send('hello world!');
});

initDb()
    .then(() => {
        app.listen(process.env.PORT, () => console.log(`Service is running on port ${process.env.PORT}`));
    });