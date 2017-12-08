class EventsError extends Error {
    constructor(message) {
        if (new.target == EventsError) {
            throw new TypeError('Cannot construct abstract `EventsError` instance directly.');
        }

        super(message);
    }
    get status() {
        throw new TypeError('Must override `status` getter.');
    }
}

class GeneralEventsError extends EventsError {
    constructor({
        status = GeneralEventsError.defaultStatus,
        message = GeneralEventsError.defaultMessage
    } = {}) {
        super(message);

        this._status = status;
    }
    static get defaultStatus() {
        return 500;
    }
    static get defaultMessage() {
        return 'Unspecified error occured.';
    }
    get status() {
        return this._status;
    }
}

class ResourceNotFoundEventsError extends EventsError {
    constructor(message = ResourceNotFoundEventsError.defaultMessage) {
        super(message);
    }
    static get defaultMessage() {
        return 'Resource not found.';
    }
    get status() {
        return 404;
    }
}

class BadRequestEventsError extends EventsError {
    constructor(message = BadRequestEventsError.defaultMessage) {
        super(message);
    }
    static get defaultMessage() {
        return 'Bad request.';
    }
    get status() {
        return 400;
    }
}

module.exports = {
    EventsError,
    GeneralEventsError,
    BadRequestEventsError,
    ResourceNotFoundEventsError
};