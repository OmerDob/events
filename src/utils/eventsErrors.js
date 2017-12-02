class EventsErrorBase extends Error {
    constructor({
        status = EventsErrorBase.defaultStatus,
        message = EventsErrorBase.defaultMessage
    } = {}) {
        super(message);

        this.status = status;
    }
    static get defaultStatus() {
        return 500;
    }
    static get defaultMessage() {
        return 'Unspecified error occured.';
    }
}

class EventsErrorResourceNotFound extends EventsErrorBase {
    constructor({
        status = EventsErrorResourceNotFound.defaultStatus,
        message = EventsErrorResourceNotFound.defaultMessage
    } = {}) {
        super({status, message});
    }
    static get defaultStatus() {
        return 404;
    }
    static get defaultMessage() {
        return 'Resource not found.';
    }
}

module.exports = {
    EventsErrorBase,
    EventsErrorResourceNotFound
};