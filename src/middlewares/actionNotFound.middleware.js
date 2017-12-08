const {ResourceNotFoundEventsError} = require('../utils/eventsErrors');

module.exports = (req, res, next) => {
    next(new ResourceNotFoundEventsError(`Action ${req.originalUrl} not found.`));
};