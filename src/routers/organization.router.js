const express = require('express');
const eventRouter = require('./event.router');
const organizationCrud = require('../cruds/organization.crud');
const catchErrors = require('../utils/catchErrors');
const extractProps = require('../utils/extractProps');
const bodyExtractor = require('../middlewares/bodyExtractor.middleware');

const organizationRouter = express.Router();
const extractOrganizationData = bodyExtractor('organizationData', ['name', 'description']);

organizationRouter.param('id', catchErrors.async(async (req, res, next, organizationId) => {
    req.organization = await organizationCrud.getById(organizationId);

    next();
}));

organizationRouter.use('/:id/event', eventRouter);

organizationRouter.get('/', catchErrors.async(async (req, res) => {
    let organizations = await organizationCrud.getAll();

    res
        .status(200)
        .json(organizations)
        .end();
}));

organizationRouter.get('/:id', ({organization}, res) => {
    res
        .status(200)
        .json(organization)
        .end();
});

organizationRouter.post(
    '/',
    extractOrganizationData,
    catchErrors.async(async ({organizationData}, res) => {
        let newOrganization = await organizationCrud.create(organizationData);

        res
            .status(201)
            .json(newOrganization)
            .end();
    })
);

organizationRouter.patch(
    '/:id',
    extractOrganizationData,
    catchErrors.async(async ({organization, organizationData}, res) => {
        await organizationCrud.update(organization, organizationData);

        res
            .status(200)
            .json(organization)
            .end();
    })
);

organizationRouter.delete('/:id', catchErrors.async(async ({organization}, res) => {
    await organization.delete();

    res
        .status(204)
        .end();
}));

module.exports = organizationRouter;