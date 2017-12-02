const {EventsErrorBase} = require('./eventsErrors');

module.exports = (asyncAction) => {
    return async (req, res, next) => {
        try {
            await asyncAction(req, res, next);
        } catch (e) {
            next(e instanceof EventsErrorBase ? e : new EventsErrorBase());
        }
    }
};