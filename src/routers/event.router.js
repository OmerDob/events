const express = require('express');
const eventCrud = require('../cruds/event.crud');
const catchErrors = require('../utils/catchErrors');
const extractProps = require('../utils/extractProps');

const eventRouter = express.Router();

eventRouter.param('id', catchErrors((req, res, next, eventId) => {
    req.event = eventCrud.getById(req.organization, eventId);

    next();
}));

eventRouter.get('/', catchErrors.async(async ({organization}, res) => {
    res
        .status(200)
        .json(organization.events)
        .end();
}));

eventRouter.get('/:id', ({event}, res) => {
    res
        .status(200)
        .json(event)
        .end();
});

eventRouter.post('/', catchErrors.async(async ({organization, body}, res) => {
    let eventData = extractEventData(body.data);
    let event = await eventCrud.create(organization, eventData);

    res
        .status(200)
        .json(event)
        .end();
}));

eventRouter.patch('/:id', catchErrors.async(async ({event, body}, res) => {
    let eventData = extractEventData(body.data);

    await eventCrud.update(event, eventData);

    res
        .status(200)
        .json(event)
        .end();
}));

eventRouter.delete('/:id', catchErrors.async(async ({event}, res) => {
    await event.delete();

    res
        .status(204)
        .end();
}));

const extractEventData = data => extractProps(data, [
    'name',
    'description',
    'startDate',
    'endDate',
    'location'
]);

module.exports = eventRouter;