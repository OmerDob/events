const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
    mongoose.connection.on('connected', () => {
        console.log('mongoose connected succesfully');
    });

    mongoose.connection.on('error', () => {
        console.error('mongoose failed to connect');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('mongoose connection closed');
    });

    process
        .on('SIGINT', mongoose.connection.close)
        .on('SIGTERM', mongoose.connection.close);

    return mongoose.connect(config.get('connectionString'));
};