const logger = require('./logger');
const {EventsError, GeneralEventsError} = require('./eventsErrors');

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
    
    next(error instanceof EventsError ? error : new GeneralEventsError());
};

module.exports = catchErrors;