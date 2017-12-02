const mongoose = require('mongoose');

module.exports = (req, res) => {
    res
        .status(200)
        .json({
            mongoose: mongoose.connection.readyState
        })
        .end();
};