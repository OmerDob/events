const mongoose = require('mongoose');
const validateModel = require('../utils/validateModel');
const {ResourceNotFoundEventsError} = require('../utils/eventsErrors');

const Organization = mongoose.model('Organization');

const getAll = () => Organization.find().exec();

const getById = async organizationId => {
    let organization = await Organization.findById(organizationId);
    
    if (!organization) {
        throw new ResourceNotFoundEventsError(`Organization with id ${organizationId} not found.`);
    }

    return organization;
};

const create = async (organizationData) => {
    let organization = new Organization(organizationData);

    await validateModel(organization, `Could not create organization ${JSON.stringify(organizationData)}.`);

    return await organization.save();
};

const update = async (organization, organizationData) => {
    Object.assign(organization, organizationData);

    await validateModel(organization, `Could not update organization ${organization.id}.`);
    await organization.save();
};

module.exports = {
    getAll,
    getById,
    create,
    update
};