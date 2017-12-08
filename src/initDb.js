const mongoose = require('mongoose');
const config = require('config');
const logger = require('./utils/logger');
const {GeneralEventsError} = require('./utils/eventsErrors');

module.exports = () => {
    if (!config.has('connectionString')) {
        throw new GeneralEventsError({
            message: 'No connection string found.'
        });
    }
    
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