const mongoose = require('mongoose');
const config = require('config');
const logger = require('./utils/logger');

module.exports = () => {
    mongoose.Promise = Promise;

    mongoose.connection.on('connected', () => {
        logger.info('mongoose connected succesfully');
    });

    mongoose.connection.on('error', () => {
        logger.info('mongoose failed to connect');
    });

    mongoose.connection.on('disconnected', () => {
        logger.info('mongoose connection closed');
    });

    process
        .on('SIGINT', () => mongoose.connection.close())
        .on('SIGTERM', () => mongoose.connection.close());

    return mongoose.connect(config.get('connectionString'), {useMongoClient: true});
};