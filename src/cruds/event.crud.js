const organizationCrud = require('./organization.crud');
const validateModel = require('../utils/validateModel');
const {EventsErrorResourceNotFound} = require('../utils/eventsErrors');

const getById = (organization, eventId) => {
    let event = organization.events.id(eventId);

    if (!event) {
        throw new EventsErrorResourceNotFound({
            message: `Event with id ${eventId} not found for organization with id ${organization.id}.`
        });
    }

    return event;
};

const create = async (organization, eventData) => {
    let organizationEvents = organization.events;
    
    organizationEvents.push(eventData);

    let event = organizationEvents[organizationEvents.length - 1];

    await validateModel(event, `Could not create event ${JSON.stringify(eventData)}.`);
    await organization.save();

    return event;
};

const update = async (event, eventData) => {
    let organization = event.parent();
    
    Object.assign(event, eventData);

    await organizationCrud.update(organization);
};

module.exports = {
    getById,
    create,
    update
};