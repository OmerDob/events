const express = require('express');
const eventCrud = require('../cruds/event.crud');
const catchErrors = require('../utils/catchErrors');
const bodyExtractor = require('../middlewares/bodyExtractor.middleware');

const eventRouter = express.Router();
const extractEventData = bodyExtractor('eventData', [
    'name',
    'description',
    'startDate',
    'endDate',
    'location'
]);

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

eventRouter.post(
    '/',
    extractEventData,
    catchErrors.async(async ({organization, eventData}, res) => {
        let event = await eventCrud.create(organization, eventData);

        res
            .status(200)
            .json(event)
            .end();
    })
);

eventRouter.patch(
    '/:id',
    extractEventData,
    catchErrors.async(async ({event, eventData}, res) => {
        await eventCrud.update(event, eventData);

        res
            .status(200)
            .json(event)
            .end();
    })
);

eventRouter.delete('/:id', catchErrors.async(async ({event}, res) => {
    await event.delete();

    res
        .status(204)
        .end();
}));

module.exports = eventRouter;