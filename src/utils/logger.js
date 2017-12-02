const winston = require('winston');
const config = require('config');

const transportDefinistions = config.get('loggers');
const transports = Object
    .keys(transportDefinistions)
    .map(transportType => {
        let options = transportDefinistions[transportType];

        return new winston.transports[transportType](options);
    });

module.exports = new winston.Logger({
    transports
});