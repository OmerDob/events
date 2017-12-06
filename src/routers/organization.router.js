const express = require('express');
const eventRouter = require('./event.router');
const organizationCrud = require('../cruds/organization.crud');
const catchErrors = require('../utils/catchErrors');
const extractProps = require('../utils/extractProps');

const organizationRouter = express.Router();

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

organizationRouter.post('/', catchErrors.async(async ({body}, res) => {
    let organizationData = extractOrganizationData(body.data);
    let newOrganization = await organizationCrud.create(organizationData);

    res
        .status(201)
        .json(newOrganization)
        .end();
}));

organizationRouter.patch('/:id', catchErrors.async(async ({organization, body}, res) => {
    let organizationData = extractOrganizationData(body.data);

    await organizationCrud.update(organization, organizationData);

    res
        .status(200)
        .json(organization)
        .end();
}));

organizationRouter.delete('/:id', catchErrors.async(async ({organization}, res) => {
    await organization.delete();

    res
        .status(204)
        .end();
}));

const extractOrganizationData = data => extractProps(data, ['name', 'description']);

module.exports = organizationRouter;