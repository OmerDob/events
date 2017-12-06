const logger = require('./logger');
const {EventsErrorBase} = require('./eventsErrors');

const catchErrors = (action) => {
    return function (req, res, next) {
        try {
            action.apply(null, arguments);
        } catch (e) {
            handleError(e, next);
        }
    }
};

catchErrors.async = (asyncAction) => {
    return async function (req, res, next) {
        try {
            await asyncAction.apply(null, arguments);
        } catch (e) {
            handleError(e, next);
        }
    }
};

const handleError = (error, next) => {
    logger.error(error);
    
    next(error instanceof EventsErrorBase ? error : new EventsErrorBase());
};

module.exports = catchErrors;