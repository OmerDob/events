const express = require('express');
const app = express();

app.use('/', (req, res) => {
    res.send('hello world!');
});

app.listen(process.env.PORT, () => console.log(`Service is running on port ${process.env.PORT}`));