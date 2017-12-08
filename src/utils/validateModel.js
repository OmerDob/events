const {BadRequestEventsError} = require('./eventsErrors');

module.exports = async (model, errorMessage) => {
    try {
        await model.validate();
    } catch (validationResult) {
        let errors = validationResult.errors;
        let reason = Object
            .keys(errors)
            .map(path => errors[path].message)
            .join(' ');
        let message = errorMessage ?
            `${errorMessage} ${reason}` :
            reason;

        throw new BadRequestEventsError(message);
    }
};